"use client";
import Link from "next/link";
import CustomLink from "../components/CustomLink";

export default function Page() {
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
    </div>
  );
}
