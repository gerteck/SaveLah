import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { projectAuth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);
        
        // sign user out
        signOut(projectAuth)
        .then(() => {
            // dispatch logout action
            dispatch({ type: 'LOGOUT' });

            if(!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        })
        .catch((err) => {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        });
    }

    // cleaner function
    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { logout, error, isPending };
}