import React, { useContext } from "react";
import { Text, View } from "react-native";
import { styles } from './styles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TransactionList from "../TransactionList";
import Box from "../Box";
import Report from "../Report";

import { ThemeContext } from "../../context/ThemeContext";
import themeColors from "../../utils/themeColors";
import { filter } from "underscore";

const Tab = createMaterialTopTabNavigator();

const noTransactionsYet = (<> 
    <Text >No transactions yet</Text>
</>);

const SpendingReportTabs = ({ documents, navigation }) => {

    var curr = new Date();
    var y = curr.getFullYear();
    var m = curr.getMonth();
    var d = curr.getDate();

    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0, 23, 59, 59);
    var pointDay = new Date(y, m, d, 23, 59, 59);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let monthDocs = [];
    let monthSpendingToThisPoint = [];
    let monthNames = [];

    for (let i = 0; i < 6; i++) {
        monthDocs[i] = documents.filter(({ date }) => date.toDate() >= firstDay && date.toDate() <= lastDay);
        monthSpendingToThisPoint[i] = documents.filter(({ date }) => date.toDate() >= firstDay && date.toDate() <= pointDay).reduce((acc, curr) => acc + curr.amount, 0);
        monthNames[i] = months[firstDay.getMonth()];

        m--;
        firstDay = new Date(y, m, 1);
        lastDay = new Date(y, m + 1, 0, 23, 59, 59);
        pointDay = new Date(y, m, d, 23, 59, 59);

        // If month ends before say the 31st
        if (pointDay.getMonth() != lastDay.getMonth()) {
            pointDay = lastDay;
        }
    }

    // Calculating average amount spent up to this point in the month
    let filteredValues = monthSpendingToThisPoint.filter(amt => amt != 0);
    let sum = filteredValues.reduce((acc, curr) => acc + curr, 0);
    let average = sum / filteredValues.length; 

    if (isNaN(average)) {
        average = 0;
    }

    let names = [];
    var currN = new Date();
    var yN = currN.getFullYear();
    var mN = currN.getMonth();

    for (let i = 0; i < 3; i++) {
        var currDate = new Date(yN, mN - 2 - i, 1);
        var currName = (currDate.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + "/" + String(currDate.getFullYear());
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
        <>
            <Tab.Navigator initialRouteName={"This Month"} screenOptions={tabScreenOptions} backBehavior="initial route">
                <Tab.Screen name={names[2]} children={() => <Report transactions={monthDocs[4]} averagePoint={average} point={monthSpendingToThisPoint[4]} monthName={monthNames[4]}
                                                                navigation={navigation} />} />

                <Tab.Screen name={names[1]}  children={() => <Report transactions={monthDocs[3]} averagePoint={average} point={monthSpendingToThisPoint[3]} monthName={monthNames[3]}
                                                                navigation={navigation}/>} />

                <Tab.Screen name={names[0]} children={() => <Report transactions={monthDocs[2]} averagePoint={average} point={monthSpendingToThisPoint[2]} monthName={monthNames[2]}
                                                                navigation={navigation}/>} />

                <Tab.Screen name="Last Month" children={() => <Report transactions={monthDocs[1]} averagePoint={average} point={monthSpendingToThisPoint[1]} monthName={monthNames[1]}
                                                                navigation={navigation}/>} />
                                                                
                <Tab.Screen name="This Month"  children={() => <Report transactions={monthDocs[0]} averagePoint={average} point={monthSpendingToThisPoint[0]} monthName={monthNames[0]}
                                                                    navigation={navigation}/>} />
            </Tab.Navigator>
        </>
    )
 
}

export default React.memo(SpendingReportTabs);