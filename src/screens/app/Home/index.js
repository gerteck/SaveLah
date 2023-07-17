import React, { useState, useContext } from "react";
import {Text, TouchableOpacity, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import Box from "../../../components/Box";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { UserProfileContext } from "../../../context/UserProfileContext";
import { projectFireStore } from "../../../firebase/firebase";
import { getFirestore, getDoc, doc, collection, onSnapshot, query, where, orderBy, limit } from "firebase/firestore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useEffect } from "react";

import { getApp } from "firebase/app";
import TopSpendingTabs from "../../../components/TopSpendingTabs";
import { BarChart } from "react-native-chart-kit";
import { colors } from "../../../utils/colors";
import { StatusBar } from "react-native";
import { getCategoryIcon } from "../../../utils/getCategoryIcon";

import themeColors from "../../../utils/themeColors";
import { ThemeContext } from "../../../context/ThemeContext";


const Home = ( { navigation } ) => {
    
    const [ userProfile, setUserProfile ] = useContext(UserProfileContext);
    const { user } = useAuthContext();

    const { theme } = useContext(ThemeContext);
    let activeColors = themeColors[theme.mode];
    const barColor = theme.mode == 'light' ? 'dark-content' : 'light-content';

    // logout quickfix can fix later

    const [ expense, setExpense ] = useState(0);
    const [ categories, setCategories ] = useState([]);
    const [ expenseLastMonth, setExpenseLastMonth ] = useState(0);
    const [ error, setError ] = useState(null);

    const [ expenseWeek, setExpenseWeek ] = useState(0);
    const [ categoriesWeek, setCategoriesWeek ] = useState([]);
    const [ expenseLastWeek, setExpenseLastWeek ] = useState(0);

    const [ recent, setRecent ] = useState([]);

    // // Refresh on User Change
    useEffect(() => {
      if (user) {
        getUserProfile().then(data => setUserProfile(data))
        console.log("Refresh Home Page");
      }
    },[user]);

    const getUserProfile = async () => {
        const app = getApp;
        const db = getFirestore(app);
        const userProfileRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userProfileRef);
        return docSnap.data();
    }
    
    // setting date range
    var curr = new Date();
    var y = curr.getFullYear();
    var m = curr.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0, 23, 59, 59);
    var lastMonthFirstDay = new Date(y, m - 1, 1);
    var lastMonthLastDay = new Date(y, m, 0, 23, 59, 59);

    // setting up date range for week
    var weekFirstDay;
    var weekLastDay;

    if (curr.getDay() == 0) {
        weekFirstDay = new Date(y, m, curr.getDate() - 6);
    } else {
        weekFirstDay = new Date(y, m, curr.getDate() - curr.getDay() + 1);
    }

    var weekY = weekFirstDay.getFullYear();
    var weekM = weekFirstDay.getMonth();

    weekLastDay = new Date(weekY, weekM, weekFirstDay.getDate() + 6, 23, 59, 59);
    var lastWeekFirstDay = new Date(weekY, weekM, weekFirstDay.getDate() - 7);
    var lastWeekLastDay = new Date(weekY, weekM, weekFirstDay.getDate() - 1, 23, 59, 59);

    // console.log(firstDay)
    // console.log(lastDay)

    // setting up listener for budget changes
    const q = query(collection(projectFireStore, 'transactions/' + user?.uid + '/userTransactions'), 
        where('date', '>=', firstDay), 
            where('date', '<=', lastDay));

    useEffect(() => {
        const unsubscribe = onSnapshot(q, (snapshot) => {
                const dict = {};
                let result = 0;
                snapshot.forEach(doc => {
                    result = result + doc.data().amount;
                    let cat = doc.data().category;

                    // separating amounts based on category
                    if(Object.hasOwn(dict, cat)) {
                        dict[cat].amount = dict[cat].amount + doc.data().amount;
                    } else {
                        dict[cat] = {
                            category: cat,
                            index: doc.data().index,
                            amount: doc.data().amount,
                        };
                    }
                })
                
                // Set percentages
                let cats = Object.entries(dict).map(([k, v]) => [k, parseFloat(v.amount.toFixed(2)).toLocaleString('en-US'), 
                    (parseFloat((v.amount / result).toFixed(2)) * 100).toLocaleString('en-US'), v.index])
                    .map(([k, v, p, i]) => ({ category: k, value: v, percentage: p, index: i })).sort((a,b) => b.percentage - a.percentage).slice(0, 3);

                // update state
                setExpense(result);
                setCategories(cats);
        }, (error) => {
                console.log(error);
                setError('could not fetch data');
        });

        return () => unsubscribe();
    },[]);

    const qLastMonth = query(collection(projectFireStore, 'transactions/' + user?.uid + '/userTransactions'), 
    where('date', '>=', lastMonthFirstDay), 
        where('date', '<=', lastMonthLastDay));

    useEffect(() => {
        const unsubscribe = onSnapshot(qLastMonth, (snapshot) => {
                let result = 0;
                snapshot.forEach(doc => {
                    result = result + doc.data().amount;
                })

                // update state
                setExpenseLastMonth(result);
        }, (error) => {
                console.log(error);
                setError('could not fetch data');
        });

        return () => unsubscribe();
    },[]);

    const qW = query(collection(projectFireStore, 'transactions/' + user?.uid + '/userTransactions'), 
        where('date', '>=', weekFirstDay), 
            where('date', '<=', weekLastDay));

    useEffect(() => {
        const unsubscribe = onSnapshot(qW, (snapshot) => {
                const dict = {};
                let result = 0;
                snapshot.forEach(doc => {
                    result = result + doc.data().amount;
                    let cat = doc.data().category;

                    // separating amounts based on category
                    if(Object.hasOwn(dict, cat)) {
                        dict[cat]["amount"] = dict[cat]["amount"] + doc.data().amount;
                    } else {
                        dict[cat] = {
                            category: cat,
                            index: doc.data().index,
                            amount: doc.data().amount,
                        };
                    }
                })

                
                let cats = Object.entries(dict).map(([k, v]) => [k, parseFloat(v.amount.toFixed(2)).toLocaleString('en-US'), (parseFloat((v.amount / result).toFixed(2)) * 100)
                    .toLocaleString('en-US'), v.index]).
                    map(([k, v, p, i]) => ({ category: k, value: v, percentage: p, index: i })).sort((a,b) => b.percentage - a.percentage).slice(0, 3);
                
                // update state
                setExpenseWeek(result);
                setCategoriesWeek(cats);
        }, (error) => {
                console.log(error);
                setError('could not fetch data');
        });

        return () => unsubscribe();
    },[]);

    const qLastWeek = query(collection(projectFireStore, 'transactions/' + user?.uid + '/userTransactions'), 
    where('date', '>=', lastWeekFirstDay), 
        where('date', '<=', lastWeekLastDay));

    useEffect(() => {
        const unsubscribe = onSnapshot(qLastWeek, (snapshot) => {
                let result = 0;
                snapshot.forEach(doc => {
                    result = result + doc.data().amount;
                })

                // update state
                setExpenseLastWeek(result);
        }, (error) => {
                console.log(error);
                setError('could not fetch data');
        });

        return () => unsubscribe();
    },[]);

    // Change in spending calculation month
    let changeInSpending;
    if (expense == 0 && expenseLastMonth == 0) {
        changeInSpending = '0';
    } else if (expense == 0 && expenseLastMonth != 0) {
        changeInSpending = '-100';
    } else if (expenseLastMonth == 0 && expense != 0) {
        changeInSpending = '+100';
    } else {
        var change = expense - expenseLastMonth;
        changeInSpending = (change / expenseLastMonth) * 100;
        changeInSpending = parseFloat(changeInSpending.toFixed(2)).toLocaleString('en-US');
        if (change > 0) {
            changeInSpending = '+' + changeInSpending;
        }
    }

    // Change in spending calculation week
    let changeInSpendingWeek;
    if (expenseWeek == 0 && expenseLastWeek == 0) {
        changeInSpendingWeek = '0';
    } else if (expenseWeek == 0 && expenseLastWeek != 0) {
        changeInSpendingWeek = '-100';
    } else if (expenseLastWeek == 0 && expenseWeek != 0) {
        changeInSpendingWeek = '+100';
    } else {
        var change = expenseWeek - expenseLastWeek;
        changeInSpendingWeek = (change / expenseLastWeek) * 100;
        changeInSpendingWeek = parseFloat(changeInSpendingWeek.toFixed(2)).toLocaleString('en-US');
        if (change > 0) {
            changeInSpendingWeek = '+' + changeInSpendingWeek;
        }
    }


    // Setting up listener for recent transactions
    const qR = query(collection(projectFireStore, 'transactions/' + user?.uid + '/userTransactions'), orderBy("date", "desc"), limit(3));
    useEffect(() => {
        const unsubscribe = onSnapshot(qR, (snapshot) => {
                let results = [];
                snapshot.forEach(doc => {
                    results.push({...doc.data()});
                })

                // update state
                setRecent(results);
        }, (error) => {
                console.log(error);
                setError('could not fetch data');
        });
        return () => unsubscribe();
    },[]);

    const onBell = () => {
        navigation.navigate('Notifications');
    };

    const onReport = () => {
        navigation.navigate('SpendingReport');
    }

    const onRegister = () => {
        navigation.navigate("RegisterProfile");
    }

    const onTransactions = () => {
        navigation.navigate("TransactionHistory");
    }

    const [weekSelected, setWeekSelected] = useState(true);
    const monthData = {
        labels: ['Last month', 'This month'],
        datasets: [
            {
                data: [expenseLastMonth, expense],
                colors: [
                    (opacity = 1) => `#c9c9c9`,
                    (opacity = 1) => `#78A9FF`,
                ]
            }
        ]   
    }

    const weekData = {
        labels: ['Last week', 'This week'],
        datasets: [
            {
                data: [expenseLastWeek, expenseWeek],
                colors: [
                    (opacity = 1) => `#c9c9c9`,
                    (opacity = 1) => `#78A9FF`,
                ]
            }
        ]    
    }

    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#fff',
        backgroundGradientToOpacity: 0.5,

        color: (opacity = 1) => `#023047`,
        labelColor: (opacity = 1) => `#333`,

        barPercentage: 2,
        decimalPlaces: 2,
        strokeWidth: 2,

        propsForBackgroundLines: {
            strokeDasharray: "",
            strokeWidth: 0,
          },
    }

    const Welcome = (<> 
        <Text style={[styles.welcome, {color: activeColors.text}]}>Welcome Back,</Text>
        <Text style={[styles.name, {color: activeColors.text}]}>{userProfile.username}</Text>
        <View style={styles.budgetOverview}>
            <View> 
                {!weekSelected && <Text style={[styles.money, {color: activeColors.text}]}>{changeInSpending}%</Text>}
                {weekSelected && <Text style={[styles.money, {color: activeColors.text}]}>{changeInSpendingWeek}%</Text>}
                <Text style={[styles.caption, {color: activeColors.text}]}>Change in spending</Text>
            </View>
            <View> 
                {!weekSelected && <Text style={[styles.money, {color: activeColors.text}]} >${parseFloat(expense.toFixed(2)).toLocaleString('en-US')}</Text>}
                {weekSelected && <Text style={[styles.money, {color: activeColors.text}]} >${parseFloat(expenseWeek.toFixed(2)).toLocaleString('en-US')}</Text>}
                <Text style={[styles.caption, {color: activeColors.text}]} >Amount Spent</Text>
            </View>
        </View>
    </>);

    const barChart = (
    <View style={{alignItems: "center",}}>
        <View style={[styles.weekMonthBar, {backgroundColor: activeColors.secondaryContainerBackground}]}>
            <TouchableOpacity disabled={weekSelected} onPress={() => setWeekSelected(true)} 
                style={[styles.weekMonth, weekSelected ? {backgroundColor: activeColors.containerBackground} : {}]}>
                    <Text style={{color: activeColors.text}}>Week</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={!weekSelected} onPress={() => setWeekSelected(false)} 
                style={[styles.weekMonth, !weekSelected ?{backgroundColor: activeColors.containerBackground} : {}]}>
                    <Text style={{color: activeColors.text}}>Month</Text>
            </TouchableOpacity>
        </View>

        <View style={{marginTop: 16}}>
            { weekSelected && <BarChart data={weekData} height={220} width={300} 
                chartConfig={chartConfig} showValuesOnTopOfBars={true} fromZero={true}  
                withCustomBarColorFromData={true}
                flatColor={true} 
            />}
            
            { !weekSelected && <BarChart data={monthData} height={220} width={300} 
                chartConfig={chartConfig} showValuesOnTopOfBars={true} fromZero={true} 
                withCustomBarColorFromData={true} 
                flatColor={true}
            />}

        </View>

    </View>);

    // When there have not been any expeneses 
    const noTransactionsYet = (<> 
        <Text>No transactions yet</Text>
    </>);

    const getHeader = () => {
        return (<>
            <Box style={{backgroundColor: activeColors.containerBackground}} content={Welcome}/>
            <TouchableOpacity onPress={onReport}><Text style={[styles.report, {color: activeColors.green}]}>See full report</Text></TouchableOpacity>
            <Box style={{backgroundColor: activeColors.containerBackground, zIndex: -1}} content={barChart}/>
            { !weekSelected && <Text style={[styles.transactionTitle, {color: activeColors.text}]}>Top Categories for the month</Text> }
            { weekSelected && <Text style={[styles.transactionTitle, {color: activeColors.text}]}>Top Categories for the week</Text> }
        </>)
    }

    const getRecentHeader = () => {
        return (<>
            <TouchableOpacity onPress={onTransactions}><Text style={styles.report}>See all transactions</Text></TouchableOpacity>
            <Text style={[styles.transactionTitle, {color: activeColors.text}]}>Recent Transactions</Text>
        </>)
    }

    // To render category boxes for top spending categories
    const renderTransactions = ({item}) => {
        return (
        <View style={styles.transactionContainer} key={item.id}>
            <View style={[styles.categoryBox, {backgroundColor: activeColors.containerBackground}]}>
                {getCategoryIcon(item.index, styles.icon)}
                <View style={styles.categoryContainer}> 
                    <View>
                        <Text style={[styles.transactionCaption, {color: activeColors.text}]}>{item.category}</Text>
                        <Text style={[styles.transactionCaption, {color: activeColors.text}]}>${item.value}</Text>  
                    </View>     
                    <Text style={{color: activeColors.text}}>{item.percentage}%</Text> 
                </View>
            </View>
        </View>)
    }

    const renderRecentTransactions = ({item}) => {
        const goEditTransaction = () => {
            navigation.navigate('EditTransaction', {transaction: item});
        }
        return (
        <Pressable onPress={goEditTransaction}>
            <View style={styles.transactionContainer}>
                <View style={[styles.categoryBox, {backgroundColor: activeColors.containerBackground}]}>
                    {getCategoryIcon(item.index, styles.icon)}
                    <View style={styles.categoryContainer}> 
                        <View>
                            <Text style={[styles.transactionCaption, {color: activeColors.text}]}>{item.category}</Text>
                            <Text style={[styles.transactionMinorCaption, {color: activeColors.text}]}>
                                {item.date.toDate().toLocaleDateString('en-GB', {
                                day: 'numeric', month: 'short', year: 'numeric'
                                }).replace(/-/g, ' ')}
                            </Text>  
                        </View>     
                        <Text style={{color: activeColors.text}}>${item.amount}</Text> 
                    </View>
                </View>
            </View>
        </Pressable>)
    }

    const getFooter = () => {
        return (<>
            {recent.length != 0 && <FlatList data={recent} keyExtractor={(item, index) => index} renderItem={renderRecentTransactions} 
            ListHeaderComponent={getRecentHeader}/>}
        </>)
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar hidden={false} backgroundColor={activeColors.appBackground} barStyle={barColor}/> 
            <AppHeader title="SaveLah" showBell onBell={onBell}/>

            {!weekSelected && 
            
                <FlatList showsVerticalScrollIndicator={false} data={categories} 
                keyExtractor={item => item.category} renderItem={renderTransactions} 
                ListHeaderComponent={getHeader} ListFooterComponent={getFooter} 
                ListEmptyComponent={<Box content={noTransactionsYet} />} />}

            {weekSelected && 
            
                <FlatList data={categoriesWeek} keyExtractor={item => item.category} 
                renderItem={renderTransactions} ListHeaderComponent={getHeader} 
                ListFooterComponent={getFooter}
                showsVerticalScrollIndicator={false} 
                ListEmptyComponent={<Box content={noTransactionsYet} />} />}
            
        </SafeAreaView>
    )
}

export default React.memo(Home);