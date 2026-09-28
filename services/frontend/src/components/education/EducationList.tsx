import type { Education } from "@/types/content";

type EducationListProps = {
  items: Education[];
};

export function EducationList({ items }: EducationListProps) {
  return (
    <ul className="space-y-6">
      {items.map((item) => (
        <li key={item.course} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <p>
            <span className="font-semibold">{item.course}</span> <span className="text-muted">· {item.institution}</span>
          </p>
          <p className="shrink-0 font-mono text-xs text-muted">{item.period}</p>
        </li>
      ))}
    </ul>
  );
}
