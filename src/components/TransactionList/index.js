import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { styles } from './styles';
import { colors } from "../../utils/colors";
import Box from "../Box";
import { groupBy } from "underscore";

const TransactionList = ({transactions}) => {

    const totalInflow = 0;
    const totalOutflow = transactions.reduce((total, currentDoc) => total + currentDoc.amount, 0);
    const totalNet = totalInflow - totalOutflow;

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
    sortedTransactions = groupBy(sortedTransactions, item => item.date.toDate().toDateString());
    sortedTransactions = Object.values(sortedTransactions);
    sortedTransactions.forEach(arr => {
        arr.sort((a, b) => b.amount - a.amount);
    });

    // const earliestDate = sortedTransactions[0].date;
    // const latestDate = sortedTransactions[numOfTransactions-1].date;

    // "amount": 123,
    // "category": "22",
    // "createdAt": [Object],
    // "date": [Object],
    // "description": "22",
    // "id": "uIQ34jG36X6kDH8dkyE9",
    // "uid": "C1YvixKMjbdClFTnNbwLVs9sbXD2"

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    const renderTransactions = ({item}) => {
        //console.log(item.date.toDate());

        const dateObj = item[0].date.toDate();
        const transDate = {
            date: dateObj.getDate(),
            day: dayNames[dateObj.getDay()],
            month: monthNames[dateObj.getMonth()],
            year: dateObj.getFullYear(),
        }

        const total = item.reduce((acc, cur) => acc + cur.amount, 0).toLocaleString('en-US');

        return (
            <View style={styles.transactionWhiteBox}>

                {/* Date Time and price */}
                <View style={styles.header}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>{transDate.date}</Text>
                        <View style={styles.dateDetailsContainer}>
                            <Text style={styles.day}>{transDate.day}</Text>
                            <Text style={styles.month}>{transDate.month} {transDate.year}</Text>
                        </View>
                    </View>
                    <Text style={styles.transAmount}>-${total}</Text>
                </View>       

                <View style={styles.divider} />
                {item.map((doc) => 
                <View style={styles.transactionDetailsContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.categoryIcon} />
                        <View style={styles.transactionTextContainer}>
                            <Text style={{alignSelf: 'center'}}>{doc.category}: {doc.description}</Text>
                            <Text style={{alignSelf: 'center'}}>${doc.amount}</Text>
                        </ View>
                    </View>        
                </View>)} 
                
            </View>
        )
    }

    return (
        
        <View>
            {/* Top View containing Details */}
            <View style={styles.overviewContainer}> 
                <View style={styles.flows}>
                    <Text style={styles.flowText}>Inflow</Text>
                    <Text style={styles.inflowText}>{totalInflow}</Text>
                </View>
                <View style={styles.flows}>
                    <Text style={styles.flowText}>Outflow</Text>
                    <Text style={styles.outflowText}>{totalOutflow}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.totalContainer}>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => setAddingComment(b => !b)} style={styles.addComment}>
                            <Text style={styles.addCommentText}>See Spending Report</Text>
                    </TouchableOpacity>
                    <Text style={styles.flowText}>{totalNet}</Text>
                </View>
                
            </View>


            <FlatList data={(sortedTransactions)} showsVerticalScrollIndicator={false} 
                keyExtractor={item => item.id} renderItem={renderTransactions}/>         
        </View>
    )
}

export default React.memo(TransactionList);

