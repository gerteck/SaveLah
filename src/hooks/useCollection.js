import { useEffect, useState } from "react"
import { projectFireStore } from "../firebase/firebase"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useRef } from "react";
import { useAuthContext } from "./useAuthContext";

export const useCollection = (collectionName, _appQuery, _appOrderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useAuthContext(); 

    // use this to avoid infinite loop of useEffect on a reference type
    const appQuery = useRef(_appQuery).current;
    const appOrderBy = useRef(_appOrderBy).current;

    useEffect(() => {
        let ref = collection(projectFireStore, collectionName);
        
        if(appQuery) {
            if(appOrderBy) {
                ref =  query(ref, where(...appQuery), orderBy(...appOrderBy));
            } else {
                ref = query(ref, where(...appQuery));
            }
        }

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = [];
            snapshot.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })

            //update state
            setDocuments(results);
            setError(null);
        }, (error) => {
            console.log(error);
            setError('could not fetch data');
        }) 

        // unsubscribe on unmount
        return () => unsubscribe();

    }, [collectionName, appQuery, appOrderBy,]);

    return { documents, error };
    
}
