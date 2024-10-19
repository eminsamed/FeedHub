"use client";
import CustomLink from "../components/CustomLink";

export default function AccessGroupPage() {
  return (
    <div>
      <h1>Hello, This is the Page for Access Groups Overview!</h1>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <CustomLink
          text="Edit"
          href="/access-groups/edit"
        />
        <CustomLink
          text="Add"
          href="/access-groups/add"
        />
      </div>
    </div>
  );
}
