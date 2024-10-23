"use client";

import CustomLink from "../components/CustomLink";
import { useApplications } from "../utils/providers/fetchApplications";
import ApplicationOverview from "./applicationOverview";

export default function Page() {

  const { data: applications } = useApplications(); // Use `refetch` to trigger data fetching
  console.log(applications);

  return (
    <div>
      <h1>Hello, This is the Page for Application Overview!</h1>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <CustomLink
          text="Edit"
          href="/applications/edit"
        />
        <CustomLink
          text="Add"
          href="/applications/add"
        />
      </div>
      <ApplicationOverview applications={applications}></ApplicationOverview>
    </div>
  );
}
