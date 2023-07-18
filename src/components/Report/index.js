import React, { useContext } from "react";
import { Text, View, FlatList, Image} from "react-native";
import { styles } from './styles';
import { useState } from "react";
import { colors } from "../../utils/colors";
import Box from "../Box";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemeContext } from "../../context/ThemeContext";
import themeColors from "../../utils/themeColors";
import { getCategoryIcon } from "../../utils/getCategoryIcon";

const Report = ({ transactions }) => {
    let expense = 0;
    let categories = [];
    let dict = {};
    let iconIndexDict = {};

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
        });
    
        // format the expense to 2 decimal places and have commas for thousand places
        categories = Object.entries(dict).map(([k, v]) => [k, parseFloat(v.toFixed(2)).toLocaleString('en-US'), (parseFloat((v / expense).toFixed(2)) * 100).toLocaleString('en-US')]).
            map(([k, v, p]) => ({ category: k, value: v, percentage: p })).sort((a,b) => b.percentage - a.percentage);
        
    }

    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode];
    
    const renderTransactions = ({item}) => {
        return (<View style={styles.transactionContainer}>
            <View style={styles.categoryBox}>
                {getCategoryIcon(iconIndexDict[item.category], styles.icon)} 
                {/* <Image style={styles.icon} source={require('../../assets/DummyIcon.png')}/> */}
                <View style={styles.categoryContaineer}> 
                    <View>
                        <Text style={styles.transactionCaption}>{item.category}</Text>
                        <Text style={styles.transactionCaption}>${item.value}</Text>  
                    </View>     
                    <Text>{item.percentage}%</Text> 
                </View>
            </View>
        </View>)
    }

    const getHeader = () => {
        return (<>
            <View>
                <Text style={[styles.caption, {color: activeColors.text}]}>Categories by Percentage</Text>
                <Text style={[styles.money, {color: activeColors.text}]}>${expense = parseFloat(expense.toFixed(2)).toLocaleString('en-US')}</Text>
            </View>
        </>)
    }
          

    return (
        <SafeAreaView style={{marginHorizontal: 16, marginTop: 8}}>
            <FlatList data={categories} keyExtractor={item => item.category} renderItem={renderTransactions} 
            ListHeaderComponent={getHeader}/>
        </SafeAreaView>
    )
}

export default React.memo(Report);