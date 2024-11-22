"use client";

import Link from "next/link";
import { useApplications } from "../utils/providers/fetchApplications";
import ApplicationOverview from "./applicationOverview";

export default function Page() {
  const { data: applications } = useApplications();
  console.log(applications);

  return (
    <div>
      <h1>Hello, This is the Page for Application Overview!</h1>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <Link href="/applications/edit">
          <a className="rounded-full border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm text-base h-10 sm:h-12 px-4 sm:px-5">Edit</a>
        </Link>
        <Link href="/applications/add">
          <a className="rounded-full border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm text-base h-10 sm:h-12 px-4 sm:px-5">Add</a>
        </Link>
      </div>
      <ApplicationOverview applications={applications}></ApplicationOverview>
    </div>
  );
}
