"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <>
      <div className="bg-gray-100 text-black">
        {/* Sidebar */}
        FINAL LINKS COME HERE:
        <aside className="w-64 p-4">
          <nav>
            <ul>
              <li className="mb-2">
                <Link
                  href="/applications"
                  className="text-gray-700 hover:underline"
                >
                  Applications
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/access-groups"
                  className="text-gray-700 hover:underline"
                >
                  Access groups
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        STUCTURE (for development)
        <aside className="w-64 bg-gray-100 p-4">
          <nav>
            <ul>
              {/* Applications section */}
              <li className="mb-2">
                <Link
                  href="/applications"
                  className="text-gray-700 hover:underline"
                >
                  Applications
                </Link>
                <ul className="pl-4 mt-2">
                  <li className="mb-1">
                    <Link
                      href="/applications/add"
                      className="text-gray-600 hover:underline"
                    >
                      Add
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/applications/edit"
                      className="text-gray-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Feedbacks section */}
              <li className="mb-2">
                <Link
                  href="/feedbacks"
                  className="text-gray-700 hover:underline"
                >
                  Feedbacks
                </Link>
                <ul className="pl-4 mt-2">
                  <li className="mb-1">
                    <Link
                      href="/feedbacks/add"
                      className="text-gray-600 hover:underline"
                    >
                      Add
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/feedbacks/edit"
                      className="text-gray-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/feedbacks/dashboard"
                      className="text-gray-600 hover:underline"
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Access Groups section */}
              <li className="mb-2">
                <Link
                  href="/access-groups"
                  className="text-gray-700 hover:underline"
                >
                  Access Groups
                </Link>
                <ul className="pl-4 mt-2">
                  <li className="mb-1">
                    <Link
                      href="/access-groups/edit"
                      className="text-gray-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/access-groups/add"
                      className="text-gray-600 hover:underline"
                    >
                      Add
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
        OTHER TEST LINKS
        <aside className="w-64 bg-gray-100 p-4">
          <nav>
            <ul>
              <li className="mb-2">
                <Link href="/login" className="text-gray-700 hover:underline">
                  Login
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/experimental-page"
                  className="text-gray-700 hover:underline"
                >
                  Experimental Page
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/404notfoundpagethatdoesntexist"
                  className="text-gray-700 hover:underline"
                >
                  404 not found
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
