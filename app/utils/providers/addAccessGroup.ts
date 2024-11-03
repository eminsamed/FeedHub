"use client";

import { COLLECTIONS } from '@/app/constants/database';
import { QUERIES } from '@/app/constants/query';
import { db } from '@/app/firebase/firebaseConfig';
import { AccessGroup } from '@/app/model/AccessGroup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, addDoc } from 'firebase/firestore';

export const addAccessGroup = async (accessGroup: AccessGroup) => {
  const docRef = await addDoc(collection(db, COLLECTIONS.ACCESSGROUPS), {
      ...accessGroup
    });
    alert("Document successfully written! ID" + docRef.id);
    return docRef.id;
};

export function useAddAccessGroup() {
  const queryClient = useQueryClient(); // Access the query client to invalidate queries

  return useMutation({
    mutationFn: (accessGroup: AccessGroup) => {
      return addAccessGroup(accessGroup);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.ACCESSGROUPS]})
    }
  });
}

