"use client";

import { db } from '@/app/firebase/firebaseConfig';
import { Application } from '@/app/model/Application';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, addDoc } from 'firebase/firestore';

export const addApplication = async (application: Application) => {
  const docRef = await addDoc(collection(db, 'applications'), {
      ...application
    });
    alert("Document successfully written! ID" + docRef.id);
    return docRef.id;
};


// React Query hook to fetch Firestore data
export function useAddApplications() {
  const queryClient = useQueryClient(); // Access the query client to invalidate queries

  return useMutation({
    mutationFn: (application: Application) => {
      return addApplication(application);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications']})
    }
  });
}

