type TagListProps = {
  items: string[];
  label?: string;
};

export function TagList({ items, label }: TagListProps) {
  if (items.length === 0) return null;
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-xs text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}
