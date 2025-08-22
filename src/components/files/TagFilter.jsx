import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function TagFilter({ tags, selectedTags, onChange }) {
  if (!tags || tags.length === 0) return null;

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter(t => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Badge
          key={tag}
          variant="outline"
          className={`cursor-pointer border-[#3a3a3a] ${selectedTags.includes(tag) ? 'bg-[#ff6b35] text-white' : 'bg-[#2a2a2a] text-[#a0a0a0]'}`}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
