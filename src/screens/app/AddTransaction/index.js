import React, {useState} from "react";
import {Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { styles }  from './styles';

import AppHeader from "../../../components/AppHeader";
import { ScrollView } from "react-native-gesture-handler";
import Box from "../../../components/Box";
import Input from "../../../components/Input";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const AddTransaction = ( ) => {

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



        </ScrollView>
    )
}

export default React.memo(AddTransaction);