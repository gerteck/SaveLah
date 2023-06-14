import React from "react";
import { Text, View, FlatList } from "react-native";
import { styles } from './styles';
import { useState } from "react";
import { colors } from "../../utils/colors";
import Box from "../Box";

const TransactionList = ({transactions}) => {

    // For no transactions
    const noTransactionsYet = (<> 
        <Text>No transactions yet, </Text>
        <Text>click + to add transactions</Text>
    </>);

    const numOfTransactions = transactions.length;

    if (numOfTransactions <= 0) {
        return <Box content={noTransactionsYet} />
    }
    
    // sort by date
    let sortedTransactions = transactions.sort((a,b) => b.date - a.date);
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
                <Text>{item.category}</Text>                
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

