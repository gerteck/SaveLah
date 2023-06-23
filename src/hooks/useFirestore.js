import { useEffect, useReducer, useState } from "react";
import { projectFireStore, timestamp } from "../firebase/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch(action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null };
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null };
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload };
        default:
            return state
    }
}

export const useFirestore = (collectionName) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    // collection ref
    const ref = collection(projectFireStore, collectionName); 

    // only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action);
        }
    }

    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' });
        
        try {
            const createdAt = Timestamp.fromDate(new Date());
            const addedDocument = await addDoc(ref, { ...doc, createdAt });
            console.log('Document written with ID: ', addedDocument.id);
            dispatch({ type: 'ADDED_DOCUMENT', payload: addedDocument});
            return addedDocument;
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
        }
    }
    
    const deleteDocument = async (id) => {

    }

    // cleanup function
    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { addDocument, deleteDocument, response }
}


