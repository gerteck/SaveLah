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
    return (
        <Tab.Navigator initialRouteName={"This Month"} screenOptions={{ tabBarScrollEnabled: true, tabBarItemStyle: { width: 100 }, tabBarLabelStyle: { fontSize: 12 }, tabBarBounces: true }} >
            <Tab.Screen name="02/2023"  children={() => <TransactionList transactions={docs}/>} />
            <Tab.Screen name="03/2023"  children={() => <TransactionList transactions={docs}/>} />
            <Tab.Screen name="04/2023"  children={() => <TransactionList transactions={docs}/>} />
            <Tab.Screen name="Last Month" children={() => <TransactionList transactions={docs}/>} />
            <Tab.Screen name="This Month"  children={() => <TransactionList transactions={docs}/>} />
            <Tab.Screen name="Future"  children={() => <Box content={noTransactionsYet}/>} />
          
        </Tab.Navigator>
      );
}

export default React.memo(TransactionTabs);