import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { createPageUrl } from "@/utils";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      const q = query.trim();
      if (q.startsWith("file:")) {
        const path = q.slice(5).trim();
        navigate(`${createPageUrl("Files")}?q=${encodeURIComponent(path)}`);
      } else if (q.startsWith("$")) {
        const ticker = q.slice(1).trim();
        navigate(`${createPageUrl("Terminal")}?ticker=${encodeURIComponent(ticker)}`);
      } else {
        navigate(`${createPageUrl("Explorer")}?q=${encodeURIComponent(q)}`);
      }
      setQuery("");
    }
  };

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search... (file: path, $ticker)"
      className="mb-4 bg-[var(--sidebar-bg)] border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
    />
  );
}
