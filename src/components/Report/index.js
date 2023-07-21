import React, { useContext, useEffect } from "react";
import { Text, View, FlatList, Image, Pressable} from "react-native";
import { styles } from './styles';
import { useState } from "react";
import { colors } from "../../utils/colors";
import Box from "../Box";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemeContext } from "../../context/ThemeContext";
import themeColors from "../../utils/themeColors";
import { getCategoryIcon } from "../../utils/getCategoryIcon";
import { VictoryChart, VictoryPie, VictoryTheme } from "victory-native";
import { Icon } from '@rneui/themed';

const Report = ({ transactions, averagePoint, point, monthName }) => {
    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode];

    let expense = 0;
    let categories = [];
    let dict = {};
    let iconIndexDict = {};
    let catDocs = {};
    
    // Placed these here for the case of no transactions
    let avg = parseFloat(averagePoint?.toFixed(2)).toLocaleString('en-US');
    let pt = parseFloat(point?.toFixed(2)).toLocaleString('en-US');
    let ptColor = point > averagePoint ? activeColors.red : activeColors.blue;

    const noTransactionsYet = (<> 
        <Text style={{color: activeColors.text}}>No transactions yet, </Text>
        <Text style={{color: activeColors.text}}>click + to add transactions</Text>
    </>);

    if (transactions.length <= 0) {
        return (
        <>
            <View style={styles.pointBox}>
                    <View style={styles.pointValue}>
                        <Text style={[styles.pointMoney, {color: activeColors.text}]}>${avg}</Text>
                        <Text style={[styles.pointCaption, {color: activeColors.text}]}>Avg. spending up to this point</Text>
                    </View>
                    <View style={styles.pointValue}>
                        <Text style={[styles.pointMoney, {color: ptColor}]}>${pt}</Text>
                        <Text style={[styles.pointCaption, {color: activeColors.text}]}>{monthName} spending up to this point</Text>
                    </View> 
            </View>
            <Box style={{backgroundColor: activeColors.inputBackground}} content={noTransactionsYet} />
        </>)
        
    }
    
    if (transactions.length > 0) {
        transactions.forEach(doc => {
            expense = expense + doc.amount;
            let cat = doc.category;
    
            // separating amounts based on category
            if(Object.hasOwn(dict, cat)) {
                dict[cat] = dict[cat] + doc.amount;
            } else {
                dict[cat] = doc.amount;
                iconIndexDict[cat] = doc.index;
            }

            if(Object.hasOwn(catDocs, cat)) {
                catDocs[cat] = [...catDocs[cat], doc];
            } else {
                catDocs[cat] = [doc];
            }
        });
    
        // format the expense to 2 decimal places and have commas for thousand places
        categories = Object.entries(dict).map(([k, v]) => [k, parseFloat(v.toFixed(2)).toLocaleString('en-US'), (parseFloat((v / expense).toFixed(2)) * 100).toLocaleString('en-US')]).
            map(([k, v, p]) => ({ category: k, value: v, percentage: p })).sort((a,b) => b.percentage - a.percentage);    
    }   

    // To do formatting outside of the getHeader as it can cause getHeader to be undefined
    let exp = parseFloat(expense?.toFixed(2)).toLocaleString('en-US')

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const renderTransactions = ({item}) => {
        
        const dateObj = item.date.toDate();
        const transDate = {
            date: dateObj.getDate(),
            month: monthNames[dateObj.getMonth()],
            year: dateObj.getFullYear(),
        }

        return (<View style={styles.transactionContainer}>
            <View style={styles.categoryBox}>
                {getCategoryIcon(iconIndexDict[item.category], styles.icon)} 
                {/* <Image style={styles.icon} source={require('../../assets/DummyIcon.png')}/> */}
                <View style={styles.categoryContaineer}> 
                    <View>
                        <Text style={styles.transactionCaption}>{transDate.date} {transDate.month}</Text>
                        <Text style={styles.transactionCaption}>{item.description}</Text>  
                    </View>     
                    <Text>${item.amount}</Text> 
                </View>
            </View>
        </View>)
    }

    const data = [
        {category: 'food', expense: 100},
        {category: 'gift', expense: 30},
        {category: 'education', expense: 30},
    ]

    const [pieSelect, setPieSelect] = useState(categories[0].category)
    const [counter, setCounter] = useState(0);
    let catLength = categories.length;

    // Our own mod function because of JS buggy modulo
    function mod(n, m) {
        return (n % m) < 0 ? (n % m) + m : n % m;
    }

    const onRight = () => {
        setCounter(mod(counter + 1, catLength));
    }

    const onLeft = () => {
        setCounter(mod(counter - 1, catLength));
    }

    useEffect(() => {
        setPieSelect(categories[counter].category);
        catDocs[pieSelect].sort((a,b) => b.date - a.date)
    }, [counter]);

    const getHeader = () => {
        return (
            <View>
                <View style={styles.pointBox}>
                    <View style={styles.pointValue}>
                        <Text style={[styles.pointMoney, {color: activeColors.text}]}>${avg}</Text>
                        <Text style={[styles.pointCaption, {color: activeColors.text}]}>Avg. spending up to this point</Text>
                    </View>
                    <View style={styles.pointValue}>
                        <Text style={[styles.pointMoney, {color: ptColor}]}>${pt}</Text>
                        <Text style={[styles.pointCaption, {color: activeColors.text}]}>{monthName} spending up to this point</Text>
                    </View> 
                </View>
                <View style={styles.totalSpent}>
                    <Text style={[styles.caption, {color: activeColors.text}]}>Total spent</Text>
                    <Text style={[styles.money, {color: activeColors.text}]}>${exp}</Text>
                </View>

                <VictoryPie data={categories} width={350} theme={VictoryTheme.grayscale} height={240}
                    style={{ labels: { fill: activeColors.text, fontSize: ({datum}) => datum.category == pieSelect ? 12 : 0}, 
                        data: { fill: ({ datum }) => datum.category == pieSelect ? activeColors.blue : activeColors.pieChartBackground}}} 
                    x='category' y='value' innerRadius={50} radius={({ datum }) => 70 + (datum.category == pieSelect) * 10}
                    labelRadius={({datum}) => 100 } padding={{ top: 0, bottom: 0 }}/>

                <View style={styles.scrollBox}>
                    <Pressable onPress={onLeft} style={styles.left}> 
                        <Icon name='angle-left' type='font-awesome' style={styles.icon} color={activeColors.iconColor}/> 
                    </Pressable>
                    <View style={styles.scrollCaption}>
                        <Text style={{color: activeColors.text, fontWeight: '400', fontSize: 16}}>{pieSelect}</Text>
                        <Text style={{color: activeColors.text, fontSize: 20, fontWeight: 'bold'}}>${categories[counter].value}</Text>
                    </View>
                    <Pressable onPress={onRight} style={styles.right}> 
                        <Icon name='angle-right' type='font-awesome' style={styles.icon} color={activeColors.iconColor}/> 
                    </Pressable>
                </View>

            </View>
            )
    }
          

    return (
        <SafeAreaView style={{marginHorizontal: 16, marginTop: 8}}>
                <FlatList data={catDocs[pieSelect]} keyExtractor={item => item.id} renderItem={renderTransactions} 
                ListHeaderComponent={getHeader}/>
        </SafeAreaView>
    )
}

export default React.memo(Report);