"use client";
import CustomLink from "@/app/components/CustomLink";

export default function Page() {
  return (
    <div>
      <h1>
        Hello, This is the Page for the Overview of all active and inactive
        Feedbacks for the previously selected Application!
      </h1>
      <CustomLink
          text="Edit"
          href="/feedback/edit"
        />
        <CustomLink
          text="Add"
          href="/feedback/add"
        />
    </div>
  );
}
