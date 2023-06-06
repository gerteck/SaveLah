import React, { useState } from "react";
import {Text, View, Alert, TouchableOpacity} from "react-native";
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

import Box from "../../../components/Box";
import { ScrollView } from "react-native-gesture-handler";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";


const AddTransaction = ( ) => {
    const titleInput = useRef();
    const amountInput = useRef();

    const { user } = useAuthContext();

    const [values, setValues] = useState({});

    const { addDocument, response } = useFirestore('transactions');

    const onChangeStuff = (key, value) => {
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

        } catch (error) {
            console.log('error adding transaction :>> ', error);
        }
    }

    useEffect(() => {
        if(response.success) {
            console.log('success');
        }
    }, [response.success]);

    // Date Stuff
    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
      };

    const TransactionRecord = (<>
        <TouchableOpacity>
            <Text style={styles.cost}>S$0.00</Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text style={styles.cost}>Select Category</Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text style={styles.cost}>Description</Text>
        </TouchableOpacity>

        <Button onPress={showDatepicker} title="Show date picker" />
        <Text>Date selected: {date.toLocaleDateString()}</Text> 

    </>);


    return (
        <ScrollView style={styles.mainContainer}>
            <AppHeader title="Add Transaction" showCross showSave />
            <Box content={TransactionRecord}/>

            <AppHeader title="Add Transaction" />
            <Input label="Transaction title" placeholder="example" onChangeText={(v) => onChangeStuff('title', v)}/>
            <Input label="Amount ($)" placeholder="100" onChangeText={(v) => onChangeStuff('amount', v)}/>
            <Button onPress={onSend} style={styles.button} title="Add transaction"  />
            {/* {isPending && <Button style={styles.button} disabled={true} title="loading" />} */}


        </ScrollView> );


}

export default React.memo(AddTransaction);