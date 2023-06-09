import React, { createRef, useState } from "react";
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


const AddTransaction = ( {navigation} ) => {
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

            await addDocument({
                uid: user.uid,
                title: values.title,
                amount: values.amount,
            });

            navigation.goBack();

        } catch (error) {
            console.log('error adding transaction :>> ', error);
        }
    }

    //Reset Transaction after Adding
    useEffect(() => {
        if(response.success) {
            console.log('success');

            onChangeStuff('title', "");
            onChangeStuff('amount', "");
            //navigation.navigate('TransactionHistory');
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
        <Button onPress={showDatepicker} title="Show date picker" />
        <Text>Date selected: {date.toLocaleDateString()}</Text> 

    </>);


    return (
        <ScrollView style={styles.mainContainer}>
            <AppHeader title="Add Transaction" showCross showSave />
            <Box content={TransactionRecord}/>

            <AppHeader title="Add Transaction" />
            <Input label="Transaction title" placeholder="example" value={values.title} onChangeText={(x) => onChangeStuff('title', x)}/>
            <Input label="Amount ($)" placeholder="100" value={values.amount} onChangeText={(x) => onChangeStuff('amount', x)}/>
            <Button onPress={onSend} style={styles.button} title="Add transaction"  />
            {/* {isPending && <Button style={styles.button} disabled={true} title="loading" />} */}


        </ScrollView> );


}

export default React.memo(AddTransaction);