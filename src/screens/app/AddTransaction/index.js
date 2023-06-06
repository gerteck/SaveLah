import React, { useState } from "react";
import {Text, View, Alert} from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../components/AppHeader";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useFirestore } from "../../../hooks/useFirestore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { addDoc, collection } from "firebase/firestore";
import { projectFireStore } from "../../../firebase/firebase";
import { useEffect } from "react";
import { useRef } from "react";

const AddTransaction = ( ) => {
    const titleInput = useRef();
    const amountInput = useRef();

    const { user } = useAuthContext();

    const [values, setValues] = useState({});

    const { addDocument, response } = useFirestore('transactions');

    const onChange = (key, value) => {
        setValues(v => ({...v, [key]: value}))
    } 

    const onSend = async () => {
        try {
            if (!values?.title || !values?.amount ) {
                Alert.alert('Please fill up all fields!');
                return;
            }

            addDocument({
                uid: user.uid,
                title: values.title,
                amount: values.amount,
            });

            // const colRef = collection(projectFireStore, 'transactions');
            // const addedDocument = addDoc(colRef, {
            //     title: values.title,
            //     amount: values.amount,
            // })
        } catch (error) {
            console.log('error adding transaction :>> ', error);
        }
    }

    useEffect(() => {
        if(response.success) {
            console.log('success');
        }
    }, [response.success]);

    return (
        <SafeAreaView>
            <AppHeader title="Add Transaction" />
            <Input label="Transaction title" placeholder="example" onChangeText={(v) => onChange('title', v)}/>
            <Input label="Amount ($)" placeholder="100" onChangeText={(v) => onChange('amount', v)}/>
            <Button onPress={onSend} style={styles.button} title="Add transaction"  />
            {/* {isPending && <Button style={styles.button} disabled={true} title="loading" />} */}
        </SafeAreaView>
    )
}

export default React.memo(AddTransaction);