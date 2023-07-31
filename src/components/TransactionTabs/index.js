import React, { useContext } from "react";
import { Text, View } from "react-native";
import { styles } from './styles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TransactionList from "../TransactionList";
import Box from "../Box";

import { ThemeContext } from "../../context/ThemeContext";
import themeColors from "../../utils/themeColors";

const Tab = createMaterialTopTabNavigator();

const TransactionTabs = ({ docs, navigation }) => {

    var curr = new Date();
    var y = curr.getFullYear();
    var m = curr.getMonth();

    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0, 23, 59, 59);
    const future = docs.filter(({ date }) =>  date.toDate() > lastDay);
    let monthDocs = [];

    for (let i = 0; i < 6; i++) {
        monthDocs[i] = docs.filter(({ date }) => {
            return date.toDate() >= firstDay && date.toDate() <= lastDay});
        m--;
        firstDay = new Date(y, m, 1);
        lastDay = new Date(y, m + 1, 0, 23, 59, 59);
    }

    let names = [];
    var currN = new Date();
    var yN = currN.getFullYear();
    var mN = currN.getMonth();

    for (let i = 0; i < 3; i++) {
        var currDate = new Date(yN, mN - 2 - i, 1);
        var currName = (currDate.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) 
                            + "/" + String(currDate.getFullYear());
        names[i] = currName;
    }

    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode];

    const tabScreenOptions = ({ route }) => ({ 
        tabBarScrollEnabled: true, 
        tabBarItemStyle: { width: 100 }, 
        tabBarLabelStyle: { fontSize: 12 }, 
        tabBarBounces: true,
        tabBarStyle: {
            backgroundColor: activeColors.inputBackground,
        },
    })


    return (
        <Tab.Navigator initialRouteName={"This Month"} screenOptions={tabScreenOptions} backBehavior="initial route">
            <Tab.Screen name={names[2]} children={() => <TransactionList transactions={monthDocs[4]} navigation={navigation} screenName={names[2]}/>} />
            <Tab.Screen name={names[1]}  children={() => <TransactionList transactions={monthDocs[3]} navigation={navigation} screenName={names[1]}/>} />
            <Tab.Screen name={names[0]} children={() => <TransactionList transactions={monthDocs[2]} navigation={navigation} screenName={names[0]}/>} />
            <Tab.Screen name="Last Month" children={() => <TransactionList transactions={monthDocs[1]} navigation={navigation} screenName={"Last Month"}/>} />
            <Tab.Screen name="This Month"  children={() => <TransactionList transactions={monthDocs[0]} navigation={navigation} screenName={"This Month"}/>} />
            <Tab.Screen name="Future"  children={() => <TransactionList transactions={future} navigation={navigation} screenName={"This Month"}/>} />
        </Tab.Navigator>
      );
}

export default React.memo(TransactionTabs);