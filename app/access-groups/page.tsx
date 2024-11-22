"use client";

import AccessGroupCard from "../components/AccessGroupCard";
import Link from "next/link";
import { useAccessGroups } from "../utils/providers/fetchApplicationGroups";

export default function AccessGroupPage() {
  const { data: accessGroups } = useAccessGroups();
  console.log(accessGroups);

  return (
    <div>
      <h1>Hello, This is the Page for Access Groups Overview!</h1>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <Link href="/access-groups/edit">
          <a className="rounded-full border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm text-base h-10 sm:h-12 px-4 sm:px-5">Edit</a>
        </Link>
        <Link href="/access-groups/add">
          <a className="rounded-full border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm text-base h-10 sm:h-12 px-4 sm:px-5">Add</a>
        </Link>
        {accessGroups?.map((accessGroup) => (
          <AccessGroupCard accessGroup={accessGroup} key={accessGroup.id} onSettingsClick={() => alert("not implemented yet")} />
        ))}
      </div>
    </div>
  );
}
