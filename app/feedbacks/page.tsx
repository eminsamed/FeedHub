"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Hello, This is the Page for the Overview of all active and inactive Feedbacks for the previously selected Application!</h1>
      <Link href="/feedback/edit">
        <a className="rounded-full border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm text-base h-10 sm:h-12 px-4 sm:px-5">Edit</a>
      </Link>
      <Link href="/feedback/add">
        <a className="rounded-full border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm text-base h-10 sm:h-12 px-4 sm:px-5">Add</a>
      </Link>
    </div>
  );
}
