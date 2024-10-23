"use client";

import { db } from '@/app/firebase/firebaseConfig';
import { Application } from '@/app/model/Application';
import { useQuery } from '@tanstack/react-query';
import { getDocs, collection } from 'firebase/firestore';

// Fetch function for Firestore data
const fetchApplications = async () => {
  const snapshot = await getDocs(collection(db, 'applications'));
  console.log('snapshot.docs data', snapshot.docs);
  console.log('snapshot data()', snapshot.docs.map(doc => doc.data()));

  return snapshot.docs.map((doc) => ({
    id: doc.id, // Include the document ID
    ...doc.data(), // Spread the document data
  })) as Application[];
};

// React Query hook to fetch Firestore data
export function useApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}