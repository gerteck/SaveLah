import React from "react";
import { Text, View, FlatList } from "react-native";
import { styles } from './styles';
import { useState } from "react";
import { colors } from "../../utils/colors";

const TransactionList = ({transactions}) => {

    const renderTransactions = ({item}) => {
        return (
            <>
            <View style={styles.header}>
                <Text>{item.createdAt.toDate().toDateString()}</Text>
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
            <FlatList data={(transactions)} keyExtractor={ item => item.id } renderItem={renderTransactions}/>
        </View>
    )
}

export default React.memo(TransactionList);

