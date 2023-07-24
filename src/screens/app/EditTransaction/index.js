import React, { useContext, useEffect, useState } from "react";
import { TextInput, Text, View, TouchableOpacity, Alert, Keyboard, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import DropDownPicker from 'react-native-dropdown-picker';

import { useAuthContext } from "../../../hooks/useAuthContext";
import { doc, getFirestore, updateDoc, deleteDoc, onSnapshot } from "@firebase/firestore";
import { getApp } from "@firebase/app";
import Button from "../../../components/Button";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { getCategoryIcon } from "../../../utils/getCategoryIcon";
import { categoryGroups } from "../../../utils/categoryGroups";

import { ThemeContext } from "../../../context/ThemeContext";
import themeColors from "../../../utils/themeColors";
import { ToastAndroid } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

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
    const [items, setItems] = useState([]);

    // Loading Spinner
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    //FireStore Linking:
    const { user } = useAuthContext();
    const collectionRef = 'transactions/' + user?.uid + '/userTransactions';
    const transactionRef = doc(db, collectionRef, transactionDetails.id);

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

    const onSave = async () => {
        try {
            if (!transactionDetails?.category || !transactionDetails?.amount) {
                ToastAndroid.showWithGravity('Please fill up the amount and category!', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                return;
            } 
            if (isNaN(transactionDetails.amount) || transactionDetails.amount < 0) {
                ToastAndroid.showWithGravity('Please input a valid amount', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                return;
            }

            setLoading(true);
            setTimeout(() => {
                if (loading) {
                    ToastAndroid.showWithGravity('Something went wrong', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                    setLoading(false);
                    return;
                }     
            }, 1000);

            await updateDoc(transactionRef, {
                amount: parseFloat(parseFloat(transactionDetails.amount).toFixed(2)), // to limit to 2 decimal places
                date: date,
                description: transactionDetails.description,
                category: transactionDetails.category,
                index: transactionDetails.index,
            }).then(() => { setLoading(false) }); 

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
            setDeleting(true);
            setTimeout(() => {
                if (deleting) {
                    ToastAndroid.showWithGravity('Something went wrong', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                    setDeleting(false);
                    return;
                }     
            }, 1000);

            await deleteDoc(transactionRef).then(() => { setDeleting(false) });
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

    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode];
    let themeMode = theme.mode == "dark" ? "DARK" : "LIGHT";
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <Spinner visible={loading}
                    textContent={'Saving changes...'}
                    textStyle={{ color: activeColors.loadingText }} overlayColor={activeColors.loadingOverlay} />
                <Spinner visible={deleting}
                    textContent={'Deleting...'}
                    textStyle={{ color: activeColors.loadingText }} overlayColor={activeColors.loadingOverlay} />
                    
                <AppHeader style={[styles.appHeader, {backgroundColor: activeColors.containerBackground}]} 
                    title={"Edit Transaction"} showCross onBack={onBack} showSave onSave={onSave} showDelete onDelete={onDelete}/>
                <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1} style={styles.container}>
                
                    <Text style={[styles.label, {color: activeColors.blue}]}>Price</Text>
                    <TextInput placeholder="$0.00" 
                        style={[styles.input, {color: activeColors.text,
                            backgroundColor: activeColors.inputBackground, 
                            borderColor: activeColors.inputBorder}]} 
                        placeholderTextColor={activeColors.secondaryText}
                        keyboardType='numeric' value={transactionDetails.amount.toString()} 
                        onChangeText={(v) => onChange('amount', v)} />

                    <Text style={[styles.label, {color: activeColors.blue}]}>Category</Text>
                    
                    <DropDownPicker open={open} value={transactionDetails.category} items={items} listMode="MODAL" 
                        modalProps={{ animationType: 'slide'}} searchable={true}
                        modalContentContainerStyle={[styles.modalContainer, {backgroundColor: activeColors.containerBackground}]}
                        style={[styles.pickerContainer, {backgroundColor: activeColors.containerBackground}]}
                        theme={themeMode}
                        placeholder="Select a Category"
                        setOpen={setOpen} onSelectItem={(v) => {
                            if (v.value == 'Add') {
                                navigation.navigate('AddCategory')
                            }

                            else {
                                onChange('category', v.value)
                                onChange('index', v.index)
                            }     
                        }} setItems={setItems} zIndex={1000}
                    />

                    <Text style={[styles.label, {color: activeColors.blue}]}>Transaction Description</Text>
                    <TextInput placeholder="Meal at YIH..." 
                        style={[styles.input, {color: activeColors.text,
                            backgroundColor: activeColors.inputBackground, 
                            borderColor: activeColors.inputBorder,},
                            {minHeight: 70, textAlignVertical: 'top'}
                        ]}
                        placeholderTextColor={activeColors.secondaryText}
                        multiline
                        value={transactionDetails.description} 
                        onChangeText={(v) => onChange('description', v)} />

                    <View>
                        <Button style={styles.DatePickerButton} onPress={showDatepicker} title={`Date: ${date.toLocaleDateString()}`} />
                    </View>

                    <Button style={styles.SaveTransactionButton} onPress={onSave} title="Save changes"  />

                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(EditTransaction);