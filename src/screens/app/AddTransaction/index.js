
import React, { createRef, useContext, useState } from "react";
import {Text, View, TouchableOpacity, TextInput, Keyboard, Image} from "react-native";

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
import { getApp } from "firebase/app";

import { collection, doc, getFirestore, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { categoryGroups } from "../../../utils/categoryGroups";
import { getCategoryIcon } from "../../../utils/getCategoryIcon";
import { defaultCategories } from "../../../utils/defaultCategories";

import { Icon } from '@rneui/themed';
import { ThemeContext } from "../../../context/ThemeContext";
import themeColors from "../../../utils/themeColors";
import { ToastAndroid } from "react-native";

const AddTransaction = ( {navigation} ) => {
    const app = getApp;
    const db = getFirestore(app);

    const { user } = useAuthContext();
    const [values, setValues] = useState({description: ""});

    const [date, setDate] = useState(new Date());
    const { addDocument, response } = useFirestore('transactions/' + user?.uid + '/userTransactions');
  
    // Drop Down Picker:
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

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

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'categories', user?.uid), (snapshot) => {
                let result = snapshot.data().categories;

                let cats = result.map((cat) => {
                    let image = getCategoryIcon(cat.index, {height: 30, width: 30})
                    cat.icon = () => image;
                    return cat;
                })

                result = categoryGroups.concat(cats);
                
                // update state
                setItems(result);
        }, (error) => {
                console.log(error);
                setError('could not fetch data');
        });

        return () => unsubscribe();
    },[]);

    const onSend = async () => {
        try {
            if (!values?.category || !values?.amount ) {
                ToastAndroid.showWithGravity('Please fill up the amount and category!', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                return;
            }

            let transactionDoc;
            
            // To fix problem with adding transaction with no description
            if (!values.description) {
                transactionDoc = await addDocument({
                    uid: user.uid,
                    amount: parseFloat(parseFloat(values.amount).toFixed(2)), // to limit to 2 decimal places
                    date: date,
                    description: '',
                    category: values.category,
                    index: values.index,
                    inflow: values.inflow,
                });

                await setDoc(transactionDoc, {
                    id: transactionDoc.id,
                }, { merge: true });
            } else {
                transactionDoc = await addDocument({
                    uid: user.uid,
                    amount: parseFloat(parseFloat(values.amount).toFixed(2)), // to limit to 2 decimal places
                    date: date,
                    description: values.description,
                    category: values.category,
                    index: values.index,
                    inflow: values.inflow,
                });

                await setDoc(transactionDoc, {
                    id: transactionDoc.id,
                }, { merge: true });
            }

            // console.log(response);

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

    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode];
    let themeMode = theme.mode == "dark" ? "DARK" : "LIGHT";

    return (
        <SafeAreaView style={styles.mainContainer}>
            <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}>
                <AppHeader title="Add Transaction" showCross onBack={goBack} />
            
                <Text style={[styles.label, {color: activeColors.blue}]}>Price / Amount</Text>
                <TextInput placeholder="$0.00" 
                    style={[styles.input, {color: activeColors.text,
                        backgroundColor: activeColors.inputBackground, 
                        borderColor: activeColors.inputBorder}]} 
                    placeholderTextColor={activeColors.secondaryText}
                    keyboardType='numeric' value={values.amount} 
                    onChangeText={(v) => onChangeValue('amount', v)} />

                <Text style={[styles.label, {color: activeColors.blue}]}>Category</Text>
                
                <DropDownPicker open={open} value={values.category} items={items} listMode="MODAL" modalProps={{ animationType: 'slide'}} searchable={true}
                    modalContentContainerStyle={[styles.modalContainer, {backgroundColor: activeColors.containerBackground}]}
                    style={[styles.pickerContainer, {backgroundColor: activeColors.containerBackground}]}
                    theme={themeMode}
                    placeholder="Select a Category"
                    setOpen={setOpen} onSelectItem={(v) => {
                        if (v.value == 'Add') {
                            navigation.navigate('AddCategory')
                        }

                        else {
                            onChangeValue('category', v.value)
                            onChangeValue('index', v.index)
                            onChangeValue('inflow', v.parent == 'Income')
                        }     
                    }} setItems={setItems} zIndex={1000}
                    categorySelectable={false}
                />

                <Text style={[styles.label, {color: activeColors.blue}]}>Transaction Description</Text>
                <TextInput placeholder="Meal at Food Court... (Optional)" 
                    style={[styles.input, {color: activeColors.text,
                        backgroundColor: activeColors.inputBackground, 
                        borderColor: activeColors.inputBorder,},
                        {minHeight: 70, textAlignVertical: 'top'}
                    ]}
                    placeholderTextColor={activeColors.secondaryText}
                    multiline
                    value={values.description} 
                    onChangeText={(v) => onChangeValue('description', v)} />

                <View>
                    <Button style={styles.DatePickerButton} onPress={showDatepicker} title={`Date: ${date.toLocaleDateString()}`} />
                </View>

                <Button style={styles.AddTransactionButton} onPress={onSend} title="Add transaction"  />
            </TouchableOpacity>

        </SafeAreaView> );


}

export default React.memo(AddTransaction);