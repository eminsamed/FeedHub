"use client";
import AccessGroupCard from "../components/AccessGroupCard";
import CustomLink from "../components/CustomLink";
import { useAccessGroups } from "../utils/providers/fetchApplicationGroups";

export default function AccessGroupPage() {
  const { data: accessGroups } = useAccessGroups();
  console.log(accessGroups);

  return (
    <div>
      <h1>Hello, This is the Page for Access Groups Overview!</h1>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <CustomLink text="Edit" href="/access-groups/edit" />
        <CustomLink text="Add" href="/access-groups/add" />
        {accessGroups?.map((accessGroup) => (
          <AccessGroupCard
            accessGroup={accessGroup}
            key={accessGroup.id}
            onSettingsClick={() => alert("not implemented yet")}
          />
        ))}
      </div>
    </div>
  );
}
