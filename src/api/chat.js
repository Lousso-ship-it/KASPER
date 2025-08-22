export async function sendChatMessage(messages, options = {}) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const endpoint = import.meta.env.VITE_LLM_ENDPOINT || 'https://api.openai.com/v1/chat/completions';
  const model = options.model || import.meta.env.VITE_LLM_MODEL || 'gpt-4o-mini';

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify({
      model,
      messages,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || 'LLM request failed');
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}
