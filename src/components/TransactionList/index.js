import React, { useContext } from "react";
import { Text, View, FlatList, TouchableOpacity, Pressable } from "react-native";
import { styles } from './styles';
import { colors } from "../../utils/colors";
import Box from "../Box";
import { groupBy } from "underscore";
import { getCategoryIcon } from "../../utils/getCategoryIcon";

import { ThemeContext } from "../../context/ThemeContext";
import themeColors from "../../utils/themeColors";

const TransactionList = ({transactions, navigation, screenName}) => {

    const totalInflow = parseFloat(transactions.filter(doc => doc.inflow).reduce((total, currentDoc) => total + currentDoc.amount, 0).toFixed(2));
    const totalOutflow = parseFloat(transactions.filter((doc) => !doc.inflow).reduce((total, currentDoc) => total + currentDoc.amount, 0).toFixed(2));
    const totalNet = parseFloat((totalInflow - totalOutflow).toFixed(2));

    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode]; 

    // For no transactions
    const noTransactionsYet = (
        <View style={{backgroundColor: activeColors.inputBackground}}> 
            <Text style={{color: activeColors.text}}>No transactions yet, </Text>
            <Text style={{color: activeColors.text}}>click + to add transactions</Text>
        </View>
    );

    const onSpendingReport = () => {
        navigation.navigate('SpendingReport', {screen: screenName});
    }

    const numOfTransactions = transactions.length;

    if (numOfTransactions <= 0) {
        return <Box style={{backgroundColor: activeColors.inputBackground}} content={noTransactionsYet} />
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

        const totalIn = item.filter(doc => doc.inflow).reduce((acc, cur) => acc + cur.amount, 0);
        const totalOut = item.filter(doc => !doc.inflow).reduce((acc, cur) => acc + cur.amount, 0);
        let total = totalIn - totalOut;

        if (total < 0) {
            total = '-$' + Math.abs(total).toLocaleString('en-US');
        } else {
            total = '$' + total.toLocaleString('en-US');
        }

        return (
            <View style={[styles.transactionViewBox, {backgroundColor: activeColors.inputBackground}]}>

                {/* Date Time and price */}
                <View style={styles.header}>
                    <View style={styles.dateContainer}>
                        <Text style={[styles.date, {color: activeColors.text}]}>{transDate.date}</Text>
                        <View style={styles.dateDetailsContainer}>
                            <Text style={[styles.day, {color: activeColors.text}]}>{transDate.day}</Text>
                            <Text style={[styles.month, {color: activeColors.text}]}>{transDate.month} {transDate.year}</Text>
                        </View>
                    </View>
                    <Text style={[styles.transAmount, {color: activeColors.text}]}>{total}</Text>
                </View>       

                <View style={styles.divider} />
                
                {item.map((doc) => {
                    const goEditTransaction = () => {
                        navigation.navigate('EditTransaction', {transaction: doc});
                    }
                    return (
                    <Pressable style={styles.individualTransactionContainer} key={doc.id} onPress={goEditTransaction}>
                        <View style={styles.transactionDetailsContainer} key={doc.id} >
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.categoryIcon}>
                                    {getCategoryIcon(doc.index, styles.icon)}
                                </View>
                                <View style={styles.transactionTextContainer}>
                                    <View style={styles.row1}>
                                        <Text style={[styles.categoryText, {color: activeColors.text}]}>{doc.category}</Text>
                                        <Text style={doc.inflow ? {color: activeColors.blue} : {color: activeColors.red}}>${doc.amount}</Text>
                                    </View>
                                    <View style={styles.descriptionTextContainer}>
                                        <Text style={{color: activeColors.secondaryText}} numberOfLines={1}>{doc.description}</Text>
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
            <View style={[styles.overviewContainer, {backgroundColor: activeColors.inputBackground}]}> 
                <View style={styles.flows}>
                    <Text style={[styles.flowText, {color: activeColors.text}]}>Inflow</Text>
                    <Text style={[styles.inflowText, {color: activeColors.blue}]}>{totalInflow}</Text>
                </View>
                <View style={styles.flows}>
                    <Text style={[styles.flowText, {color: activeColors.text}]}>Outflow</Text>
                    <Text style={[styles.outflowText, {color: activeColors.red}]}>{totalOutflow}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.totalContainer}>
                    <TouchableOpacity activeOpacity={0.6} onPress={onSpendingReport} style={styles.addComment}>
                            <Text style={styles.addCommentText}>See Spending Report</Text>
                    </TouchableOpacity>
                    <Text style={[styles.flowText, {color: activeColors.text}]}>{totalNet}</Text>
                </View>
                
            </View>

            <FlatList contentContainerStyle={{paddingBottom: 150}} data={(sortedTransactions)} showsVerticalScrollIndicator={false} 
                keyExtractor={item => item[0].id} renderItem={renderTransactions}/>         
        </View>
    )
}

export default React.memo(TransactionList);

