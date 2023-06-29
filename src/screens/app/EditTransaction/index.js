import React, { useState } from "react";
import { ScrollView, TextInput, Text, View, Image, TouchableOpacity, Alert, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import DropDownPicker from 'react-native-dropdown-picker';
import { useFirestore } from "../../../hooks/useFirestore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { doc, getFirestore, setDoc, updateDoc, deleteDoc } from "@firebase/firestore";
import { getApp } from "@firebase/app";
import Button from "../../../components/Button";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const app = getApp;
const db = getFirestore(app);

const EditTransaction = ( { navigation, route } ) => {
    
    const onBack = () => {
        navigation.goBack();
    };
    
    const [transactionDetails, setTransactionDetails] = useState(route.params?.transaction);
    // Updates transaction fields
    // transaction fields to be changed: amount, description, category, date
    const onChange = (key, value) => {
        setTransactionDetails(v => ({...v, [key]: value}))
    } 

    // Date picker
    const [date, setDate] = useState(route.params?.transaction.date.toDate());
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    //Drop Down Picker:
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([{label: 'Food & Beverage', value: 'Food & Beverage'},
                                        {label: 'Transportation', value: 'Transportation'},
                                        {label: 'Rentals', value: 'Rentals'},
                                        {label: 'Utility bills', value: 'Utility bills'},
                                        {label: 'Education', value: 'Education'},
                                        {label: 'Pets', value: 'Pets'},
                                        {label: 'Home maintenance', value: 'Home maintenance'},
                                        {label: 'Fun Money', value: 'Fun Money'},
                                        {label: 'Hobbies', value: 'Hobbies'}]);


    //FireStore Linking:
    const { user } = useAuthContext();
    const collectionRef = 'transactions/' + user?.uid + '/userTransactions';
    const transactionRef = doc(db, collectionRef, transactionDetails.id);

    const onSave = async () => {
        try {
            if (!transactionDetails?.category || !transactionDetails?.amount) {
                Alert.alert('Please fill up amount and category!');
                return;
            } 

            if (!transactionDetails?.description) {
                onChangeValue('description', "");
            }

            await updateDoc(transactionRef, {
                amount: parseFloat(parseFloat(transactionDetails.amount).toFixed(2)), // to limit to 2 decimal places
                date: date,
                description: transactionDetails.description,
                category: transactionDetails.category,
            }); 

            console.log("Edited Transaction");
            navigation.goBack();

        } catch (error) {
            console.log('error editing transaction :>> ', error);
        }
    }

    const onDelete = () => {
        Alert.alert('', 'Delete this transaction?', [
            {
                text: 'NO',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'YES',
                onPress: () => onConfirmDelete(),
            }
        ], { cancelable: true });
    }

    const onConfirmDelete = async () => {
        try {
            await deleteDoc(transactionRef);
            console.log('Transaction deleted');
            navigation.goBack();
        } catch (error) {
            console.log('error deleting transaction :>> ', error);
        }
    }

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
            <AppHeader style={styles.appHeader} title={"Edit Transaction"} showCross onBack={onBack} showSave onSave={onSave} showDelete onDelete={onDelete}/>
            <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1} style={styles.container}>
            
                <Text style={styles.label}>Price</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="$0.00" style={styles.input}  keyboardType='numeric' value={transactionDetails.amount.toString()} 
                        onChangeText={(v) => onChange('amount', v)} />
                </View>

                <Text style={styles.label}>Category</Text>
                
                <DropDownPicker open={open} value={transactionDetails.category} items={items} listMode="MODAL" modalProps={{ animationType: 'slide'}} searchable={true}
                    modalContentContainerStyle={styles.modalContainer}
                    placeholder="Select a Category" style={styles.pickerContainer}
                    setOpen={setOpen} onSelectItem={(v) => onChange('category', v.value)} setItems={setItems} zIndex={1000}
                />

                <Text style={styles.label}>Transaction Description</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Meal at YIH..." style={styles.input} value={transactionDetails.description} 
                        onChangeText={(v) => onChange('description', v)} />
                </View>

                <View>
                    <Button style={styles.DatePickerButton} onPress={showDatepicker} title={`Date: ${date.toLocaleDateString()}`} />
                </View>

            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default React.memo(EditTransaction);