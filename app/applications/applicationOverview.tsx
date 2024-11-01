"use client";

import React from 'react';
import { Application } from '../model/Application';
import dayjs from 'dayjs';

interface ApplicationListProps {
  applications: Application[]; // The array of applications to display
}

export default function ApplicationList({ applications }: ApplicationListProps) {
  return (
    <div>
      <h1>Applications List</h1>
      {/* Display a message if the array is empty */}
      {!applications || applications.length === 0 ? (
        <p>No applications available</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app.id}>
              <h2>{app.name}</h2>
              <p>{app.description}</p>
              <p>
                <strong>Created At:</strong>{' '}
                {dayjs(app.createdAt).format()}
              </p>
              <p>
                <strong>Updated At:</strong>{' '}
                {dayjs(app.createdAt).format()}
              </p>
              <p>
                <strong>Access Groups:</strong>{' '}
                {app.accessGroupIds.length > 0 ? app.accessGroupIds.join(', ') : 'None'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}