import React, { createRef, useState } from "react";
import {Text, View, Alert, TouchableOpacity, TextInput} from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../components/AppHeader";
import Button from "../../../components/Button";
import { useFirestore } from "../../../hooks/useFirestore";
import { useAuthContext } from "../../../hooks/useAuthContext";

import { useEffect } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { useIsFocused } from "@react-navigation/native";


const AddTransaction = ( {navigation} ) => {
    const { user } = useAuthContext();
    const [values, setValues] = useState({});

    const [date, setDate] = useState(new Date());
    const { addDocument, response } = useFirestore('transactions/' + user.uid + '/userTransactions');

    // Drop Down Picker:
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([{label: 'Food & Beverage', value: 'Food & Beverage'},
                                        {label: 'Transportation', value: 'Transportation'},
                                        {label: 'Fun Money', value: 'Fun Money'}]);

    const goBack = () => {
        navigation.goBack();
    }

    const onChangeValue = (key, value) => {
        setValues(v => ({...v, [key]: value}))
    } 
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    // to clear data when navigating away
    const isFocused = useIsFocused();
    useEffect(() => {
        setValues({});
    },[isFocused])

    

    const onSend = async () => {
        try {
            if (!values?.category || !values?.amount ) {
                Alert.alert('Please fill up the amount and category!');
                return;
            }

            if (!values?.description) {
                onChangeValue('description', "");
            }
            
            console.log("submit");
            console.log(values);

            await addDocument({
                uid: user.uid,
                amount: parseFloat(parseFloat(values.amount).toFixed(2)), // to limit to 2 decimal places
                date: date,
                description: values.description,
                category: values.category,
            });

            console.log(response);

        } catch (error) {
            console.log('error adding transaction :>> ', error);
        }
    }

    //Reset Transaction Fields and Navigate Out after Adding Transaction
    useEffect(() => {
        if(response.success) {
            console.log('success adding Transaction');
            onChangeValue('category', "");
            onChangeValue('amount', "");
            onChangeValue('description', "");
            setDate(new Date());
            navigation.goBack();
        }
    }, [response.success]);

    // Show Date Picker Modal
    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
        value: date,
        onChange: onChangeDate,
        mode: currentMode,
        is24Hour: true,
        });
    };
    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Add Transaction" showCross onBack={goBack} />
            
            <Text style={styles.label}>Price</Text>
            <View style={styles.inputContainer}>
                <TextInput placeholder="$0.00" style={styles.input}  keyboardType='numeric' value={values.amount} 
                    onChangeText={(v) => onChangeValue('amount', v)} />
            </View>

            <Text style={styles.label}>Category (will Change to dropdown)</Text>
            {/* <View style={styles.inputContainer}>
                <TextInput placeholder="Food & Drinks" style={styles.input} value={values.category} 
                    onChangeText={(v) => onChangeValue('category', v)} />
            </View> */}
            
            <DropDownPicker open={open} value={values.category} items={items} listMode="SCROLLVIEW" 
                placeholder="Select a Category" style={styles.pickerContainer}
                setOpen={setOpen} onSelectItem={(v) => onChangeValue('category', v.value)} setItems={setItems} zIndex={1000}
            />

            <Text style={styles.label}>Transaction Description</Text>
            <View style={styles.inputContainer}>
                <TextInput placeholder="Meal at YIH..." style={styles.input} value={values.description} 
                    onChangeText={(v) => onChangeValue('description', v)} />
            </View>

            <View>
                <Button onPress={showDatepicker} title={`Date: ${date.toLocaleDateString()}`} />
            </View>


            <Button style={styles.AddTransactionButton} onPress={onSend} title="Add transaction"  />


        </SafeAreaView> );


}

export default React.memo(AddTransaction);