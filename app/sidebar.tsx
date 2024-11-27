"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <>
      <div className="bg-gray-100 text-black">
        {/* Feedbacks Section */}
        <aside className="w-64 p-4">
          <nav>
            <ul>
              <li className="mb-2">
                <Link href="/feedbacks" className="text-gray-700 hover:underline">
                  Feedbacks
                </Link>
                <ul className="pl-4 mt-2">
                  <li className="mb-1">
                    <Link href="/feedbacks/add" className="text-gray-600 hover:underline">
                      Add
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link href="/feedbacks/dashboard" className="text-gray-600 hover:underline">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Other Test Links */}
        <aside className="w-64 bg-gray-100 p-4">
          <nav>
            <ul>
              <li className="mb-2">
                <Link href="/login" className="text-gray-700 hover:underline">
                  Login
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/404notfoundpagethatdoesntexist" className="text-gray-700 hover:underline">
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
