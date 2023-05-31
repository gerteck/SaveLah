import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/firebase";
import {
    browserLocalPersistence,
    setPersistence,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        // login user
        signInWithEmailAndPassword(projectAuth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                // dispatch logout action
                dispatch({ type: "LOGIN", payload: user });

                if (!isCancelled) {
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
    };

    // cleaner function
    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { login, error, isPending };
};
