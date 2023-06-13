import React from "react";
import { Text, View, FlatList } from "react-native";
import { styles } from './styles';
import { useState } from "react";
import { colors } from "../../utils/colors";

const TransactionList = ({transactions}) => {

    const numOfTransactions = transactions.length;

    if (numOfTransactions <= 0) {
        return <></>
    }
    
    // sort by date
    let sortedTransactions = transactions.sort( (a,b) => a.date -b.date );
    const earliestDate = sortedTransactions[0].date;
    const latestDate = sortedTransactions[numOfTransactions-1].date;

    

    const renderTransactions = ({item}) => {
        //console.log(item.date.toDate());
        return (
            <>
            <View style={styles.header}>
                <Text>{item.date.toDate().toDateString()}</Text>
            </View>            
            <View style={styles.container}>
                <Text>{item.title}</Text>                
                <Text>${item.amount}</Text>
            </View>
            </>
        )
    }

    return (
        <View>
            <FlatList data={(sortedTransactions)} keyExtractor={item => item.id} renderItem={renderTransactions}/>
        </View>
    )
}

export default React.memo(TransactionList);

