import type { SkillGroup } from "@/types/content";
import { TagList } from "./TagList";

type TagGroupsProps = {
  groups: SkillGroup[];
};

// Labeled tag lists: the Skills section and the stack by layer in the project details drawer.
// The label column follows the space the list has (container query), not the screen: in the drawer the list is
// narrow even on desktop, so it stacks like on phones.
export function TagGroups({ groups }: TagGroupsProps) {
  return (
    <dl className="@container space-y-6">
      {groups.map((group) => (
        <div key={group.label} className="grid gap-3 @xl:grid-cols-[11rem_1fr] @xl:gap-8">
          <dt className="text-sm font-medium sm:pt-1">{group.label}</dt>
          <dd>
            <TagList items={group.items} label={group.label} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
