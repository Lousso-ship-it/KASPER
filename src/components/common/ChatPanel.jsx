import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendChatMessage } from '@/api/chat';
import { createPageUrl } from '@/utils';

export default function ChatPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCommand = (command) => {
    switch (command) {
      case '/monitor':
        navigate(createPageUrl('Monitor'));
        return true;
      case '/task':
        navigate(createPageUrl('Tasks'));
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');

    if (text.startsWith('/')) {
      if (handleCommand(text)) return;
    }

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const reply = await sendChatMessage(newMessages);
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: `Erreur: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="mb-2 w-80 h-96 flex flex-col bg-[var(--sidebar-bg)]/95 backdrop-blur-sm border border-[var(--border-color)] rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-2 border-b border-[var(--border-color)]">
            <span className="font-medium text-sm text-[var(--text-primary)]">Chat</span>
            <button onClick={() => setOpen(false)} className="text-[var(--text-secondary)] hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 text-sm">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`px-2 py-1 rounded max-w-[75%] ${
                    m.role === 'user'
                      ? 'bg-[var(--orange-primary)] text-white'
                      : 'bg-[var(--hover-bg)] text-[var(--text-primary)]'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-[var(--text-secondary)]">…</div>}
          </div>
          <form onSubmit={handleSubmit} className="p-2 border-t border-[var(--border-color)] flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message"
              className="flex-1 h-8 bg-transparent"
              disabled={loading}
            />
            <Button type="submit" size="icon" className="h-8 w-8" disabled={loading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      ) : (
        <Button size="icon" onClick={() => setOpen(true)} className="rounded-full">
          <MessageCircle className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
