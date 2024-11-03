"use client";

import React from "react";
import { Application } from "../model/Application";
import dayjs from "dayjs";
import ApplicationCard from "../components/ApplicationCard";

interface ApplicationListProps {
  applications: Application[] | undefined; // The array of applications to display
}

export default function ApplicationList({
  applications,
}: ApplicationListProps) {
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Applications</h1>
        {/* Display a message if the array is empty */}
        {!applications || applications.length === 0 ? (
          <p>No applications available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {applications.map((app) => (
              <ApplicationCard
                key={app.id}
                title={app.name}
                description={app.description}
                onSettingsClick={() => alert('does not work yet')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
