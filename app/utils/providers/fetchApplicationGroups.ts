"use client";

import { COLLECTIONS } from '@/app/constants/database';
import { QUERIES } from '@/app/constants/query';
import { db } from '@/app/firebase/firebaseConfig';
import { AccessGroup } from '@/app/model/AccessGroup';
import { useQuery } from '@tanstack/react-query';
import { getDocs, collection } from 'firebase/firestore';

const fetchAccessGroups = async () => {
  const snapshot = await getDocs(collection(db, COLLECTIONS.ACCESSGROUPS));
  console.log('snapshot.docs data', snapshot.docs);
  console.log('snapshot data()', snapshot.docs.map(doc => doc.data()));

  return snapshot.docs.map((doc) => ({
    id: doc.id, // Include the document ID
    ...doc.data(), // Spread the document data
  })) as AccessGroup[];
};

// React Query hook to fetch Firestore data
export function useAccessGroups() {
  return useQuery({
    queryKey: [QUERIES.ACCESSGROUPS],
    queryFn: fetchAccessGroups,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}