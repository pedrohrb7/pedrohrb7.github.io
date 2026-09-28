import type { SkillGroup } from "@/types/content";
import { TagList } from "@/ui/TagList";

type SkillGroupsProps = {
  groups: SkillGroup[];
};

export function SkillGroups({ groups }: SkillGroupsProps) {
  return (
    <dl className="space-y-6">
      {groups.map((group) => (
        <div key={group.label} className="grid gap-3 sm:grid-cols-[11rem_1fr] sm:gap-8">
          <dt className="text-sm font-medium sm:pt-1">{group.label}</dt>
          <dd>
            <TagList items={group.items} label={group.label} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
