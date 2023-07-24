import React from "react";
import { Text, View, FlatList, Image } from "react-native";
import { styles } from './styles';
import { useState } from "react";
import { colors } from "../../utils/colors";
import Box from "../Box";

const TopSpendingTabs = ({transactions}) => {

    // For no transactions
    const noTransactionsYet = (<> 
        <Text>No transactions yet</Text>
    </>);

    const numOfTransactions = transactions.length;

    if (numOfTransactions <= 0) {
        return <Box content={noTransactionsYet} />
    }
    
    // sort by date
    let sortedTransactions = transactions.sort((a,b) => b.percentage - a.percentage);
    const earliestDate = sortedTransactions[0].date;
    const latestDate = sortedTransactions[numOfTransactions-1].date;

    

    const renderTransactions = ({item}) => {
        return (<View style={styles.transactionContainer}>
            <Image style={styles.icon} source={require('../../assets/icons/DummyIcon.png')}/>
            <View> 
                <Text style={styles.transactionCaption}>{item.category}</Text>
                <Text style={styles.transactionCaption}>{item.value}</Text>
                <Text>{item.percentage}%</Text> 
            </View>
        </View>)
    }

    return (       
        <View>
            <Text style={styles.transactionTitle}>Top Spendings</Text>
            <FlatList data={(sortedTransactions)} keyExtractor={item => item.category} renderItem={renderTransactions}/>         
        </View>
    )
}

export default React.memo(TopSpendingTabs);

