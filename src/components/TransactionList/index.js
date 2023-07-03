import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Pressable } from "react-native";
import { styles } from './styles';
import { colors } from "../../utils/colors";
import Box from "../Box";
import { groupBy } from "underscore";
import { getCategoryIcon } from "../../utils/getCategoryIcon";

const TransactionList = ({transactions, navigation}) => {

    const totalInflow = 0;
    const totalOutflow = transactions.reduce((total, currentDoc) => total + currentDoc.amount, 0);
    const totalNet = totalInflow - totalOutflow;

    // For no transactions
    const noTransactionsYet = (<> 
        <Text>No transactions yet, </Text>
        <Text>click + to add transactions</Text>
    </>);

    const onSpendingReport = () => {
        navigation.navigate('Home', {screen: 'SpendingReport'});
    }

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
                    
                    {item.map((doc) => {
                       
                        const goEditTransaction = () => {
                            navigation.navigate('EditTransaction', {transaction: doc});
                        }

                        return (
                        
                        <Pressable key={doc.id} onPress={goEditTransaction}>
                            <View style={styles.transactionDetailsContainer} key={doc.id} >
                                <View style={{flexDirection: 'row'}}>
                                    <View style={styles.categoryIcon}>
                                        {getCategoryIcon(doc.index, styles.icon)}
                                    </View>
                                    <View style={styles.transactionTextContainer}>
                                        <View style={styles.row1}>
                                            <Text style={{alignSelf: 'center'}}>{doc.category}</Text>
                                            <Text style={{alignSelf: 'center'}}>${doc.amount}</Text>
                                        </View>
                                        <View style={styles.row1}>
                                            <Text style={{alignSelf: 'center'}}>{doc.description}</Text>
                                        </View>
                                    </ View>
                                </View>        
                            </View>
                        </Pressable>
                        
                        )}
                    )} 

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
                    <TouchableOpacity activeOpacity={0.6} onPress={onSpendingReport} style={styles.addComment}>
                            <Text style={styles.addCommentText}>See Spending Report</Text>
                    </TouchableOpacity>
                    <Text style={styles.flowText}>{totalNet}</Text>
                </View>
                
            </View>


            <FlatList contentContainerStyle={{paddingBottom: 150}} data={(sortedTransactions)} showsVerticalScrollIndicator={false} 
                keyExtractor={item => item[0].id} renderItem={renderTransactions}/>         
        </View>
    )
}

export default React.memo(TransactionList);

