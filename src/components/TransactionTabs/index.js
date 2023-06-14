import React from "react";
import { Text, View } from "react-native";
import { styles } from './styles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TransactionList from "../TransactionList";
import Box from "../Box";

const Tab = createMaterialTopTabNavigator();

const noTransactionsYet = (<> 
    <Text >No transactions yet</Text>
</>);

const TransactionTabs = ({ docs }) => {

    var curr = new Date();
    var y = curr.getFullYear();
    var m = curr.getMonth();

    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    const future = docs.filter(({ date }) => date.toDate() > lastDay);
    let monthDocs = [];

    for (let i = 0; i < 6; i++) {
        monthDocs[i] = docs.filter(({ date }) => date.toDate() >= firstDay && date.toDate() <= lastDay);
        m--;
        firstDay = new Date(y, m, 1);
        lastDay = new Date(y, m + 1, 0);
    }



    // const thisMonth = docs.filter(({ date }) => date.toDate() >= firstDay && date.toDate() <= lastDay);

    // var firstDay = new Date(y, m - 1, 1);
    // var lastDay = new Date(y, m, 0);
    // const lastMonth = docs.filter(({ date }) => date.toDate() >= firstDay && date.toDate() <= lastDay);


    return (
        <Tab.Navigator initialRouteName={"This Month"} screenOptions={{ tabBarScrollEnabled: true, tabBarItemStyle: { width: 100 }, tabBarLabelStyle: { fontSize: 12 }, tabBarBounces: true }} >
            <Tab.Screen name="02/2023"  children={() => <TransactionList transactions={monthDocs[4]}/>} />
            <Tab.Screen name="03/2023"  children={() => <TransactionList transactions={monthDocs[3]}/>} />
            <Tab.Screen name="04/2023"  children={() => <TransactionList transactions={monthDocs[2]}/>} />
            <Tab.Screen name="Last Month" children={() => <TransactionList transactions={monthDocs[1]}/>} />
            <Tab.Screen name="This Month"  children={() => <TransactionList transactions={monthDocs[0]}/>} />
            <Tab.Screen name="Future"  children={() => <TransactionList transactions={future}/>} />
          
        </Tab.Navigator>
      );
}

export default React.memo(TransactionTabs);