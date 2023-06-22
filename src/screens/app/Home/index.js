import React, { useState, useContext } from "react";
import {Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import Box from "../../../components/Box";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { UserProfileContext } from "../../../context/UserProfileContext";
import { projectFireStore } from "../../../firebase/firebase";
import { getFirestore, getDoc, doc, collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useEffect } from "react";

import { getApp } from "firebase/app";
import TopSpendingTabs from "../../../components/TopSpendingTabs";
import { BarChart } from "react-native-chart-kit";
import { colors } from "../../../utils/colors";


const Home = ( { navigation } ) => {
    
    const [ userProfile, setUserProfile ] = useContext(UserProfileContext);
    const { user } = useAuthContext();

    // logout quickfix can fix later

    const [ expense, setExpense ] = useState('0');
    const [ categories, setCategories ] = useState([]);
    const [ expenseLastMonth, setExpenseLastMonth ] = useState('0');
    const [ error, setError ] = useState(null);

    const [ expenseWeek, setExpenseWeek ] = useState('0');
    const [ categoriesWeek, setCategoriesWeek ] = useState([]);
    const [ expenseLastWeek, setExpenseLastWeek ] = useState('0');

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
    var lastDay = new Date(y, m + 1, 0);
    var lastMonthFirstDay = new Date(y, m - 1, 1);
    var lastMonthLastDay = new Date(y, m, 0);

    // setting up date range for week
    var weekFirstDay
    var weekLastDay;

    if (curr.getDay() == 0) {
        weekFirstDay = new Date(curr.setDate(curr.getDate() - 6));
    } else {
        weekFirstDay = new Date(curr.setDate(curr.getDate() - curr.getDay()))
    }

    weekLastDay = new Date(curr.setDate(weekFirstDay.getDate() + 6));
    var lastWeekFirstDay = new Date(curr.setDate(weekFirstDay.getDate() - 7));
    var lastWeekLastDay = new Date(curr.setDate(weekLastDay.getDate() - 7));


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
                        dict[cat] = dict[cat] + doc.data().amount;
                    } else {
                        dict[cat] = doc.data().amount;
                    }
                })

                // format the result to 2 decimal places and have commas for thousand places
                result = parseFloat(result.toFixed(2)).toLocaleString('en-US');
                let cats = Object.entries(dict).map(([k, v]) => [k, parseFloat(v.toFixed(2)).toLocaleString('en-US'), (parseFloat((v / result).toFixed(2)) * 100).toLocaleString('en-US')]).
                    map(([k, v, p]) => ({ category: k, value: v, percentage: p })).sort((a,b) => b.percentage - a.percentage).slice(0, 3);

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

                // format the result to 2 decimal places and have commas for thousand places
                result = parseFloat(result.toFixed(2)).toLocaleString('en-US');

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
                        dict[cat] = dict[cat] + doc.data().amount;
                    } else {
                        dict[cat] = doc.data().amount;
                    }
                })

                // format the result to 2 decimal places and have commas for thousand places
                result = parseFloat(result.toFixed(2)).toLocaleString('en-US');
                let cats = Object.entries(dict).map(([k, v]) => [k, parseFloat(v.toFixed(2)).toLocaleString('en-US'), (parseFloat((v / result).toFixed(2)) * 100).toLocaleString('en-US')]).
                    map(([k, v, p]) => ({ category: k, value: v, percentage: p })).sort((a,b) => b.percentage - a.percentage).slice(0, 3);

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

                // format the result to 2 decimal places and have commas for thousand places
                result = parseFloat(result.toFixed(2)).toLocaleString('en-US');

                // update state
                setExpenseLastWeek(result);
        }, (error) => {
                console.log(error);
                setError('could not fetch data');
        });

        return () => unsubscribe();
    },[]);

    // Change in spending calculation
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

    
    

    const onBell = () => {
        navigation.navigate('Notifications');
    };

    const onReport = () => {
        navigation.navigate('SpendingReport');
    }

    const Welcome = (<> 
        <Text style={styles.welcome}>Welcome Back,</Text>
        <Text style={styles.name}>{userProfile.username}</Text>
        <View style={styles.budgetOverview}>
            <View> 
                <Text style={styles.money}>{changeInSpending}%</Text>
                <Text style={styles.caption}>Change in spending</Text>
            </View>
            <View> 
                <Text style={styles.money} >${expense}</Text>
                <Text style={styles.caption} >Amount Spent</Text>
            </View>
        </View>
    </>);

    const onRegister = () => {
        navigation.navigate("RegisterProfile");
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

    const PieChart = (<View style={{alignItems: "center",}}>
        <View style={styles.weekMonthBar}>
            <TouchableOpacity disabled={weekSelected} onPress={() => setWeekSelected(true)} 
                style={[styles.weekMonth, weekSelected ? styles.selected : {}]}><Text>week</Text></TouchableOpacity>

            <TouchableOpacity disabled={!weekSelected} onPress={() => setWeekSelected(false)} 
                style={[styles.weekMonth, !weekSelected ? styles.selected : {}]}><Text>month</Text></TouchableOpacity>
        </View>
        <View style={{marginTop: 16}}>
            {/* <Image source={require('../../../assets/DummyChart.png')} style={{height: 200, width: 232, alignSelf: 'center'}}/> */}
            { weekSelected && <BarChart data={weekData} height={220} width={300} chartConfig={chartConfig} showValuesOnTopOfBars={true} fromZero={true}  withCustomBarColorFromData={true} 
            flatColor={true} />}
            
            { !weekSelected && <BarChart data={monthData} height={220} width={300} chartConfig={chartConfig} showValuesOnTopOfBars={true} fromZero={true} withCustomBarColorFromData={true} 
            flatColor={true} />}
        </View>

    </View>);

    // Note: Needs to be declared in an earlier line
    const SampleTransaction = (<View style={styles.transactionContainer}>
        <Image style={styles.icon} source={require('../../../assets/DummyIcon.png')}/>
        <View> 
            <Text style={styles.transactionCaption}>Food and Drinks</Text>
            <Text style={styles.transactionCaption}>$50.00</Text>
        </View>
    </View>);

    // Depreciated
    // const TopSpendings = (<>
    //     <Text style={styles.transactionTitle}>Top Spendings</Text>
    //     {/* {SampleTransaction}
    //     {SampleTransaction}
    //     {SampleTransaction} */}
    //     <TopSpendingTabs transactions={categories} />
    // </>);

    // When there have not been any expeneses 
    const noTransactionsYet = (<> 
        <Text>No transactions yet</Text>
    </>);

    // To render category boxes for top spending categories
    const renderTransactions = ({item}) => {
        return (<View style={styles.transactionContainer}>
            <View style={styles.categoryBox}>
                <Image style={styles.icon} source={require('../../../assets/DummyIcon.png')}/>
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
            <Box content={Welcome}/>
            <TouchableOpacity onPress={onReport}><Text style={styles.report}>See full report</Text></TouchableOpacity>
            <Box content={PieChart}/>
            { !weekSelected && <Text style={styles.transactionTitle}>Top Spendings for the month</Text> }
            { weekSelected && <Text style={styles.transactionTitle}>Top Spendings for the week</Text> }
        </>)
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="SaveLah" showBell onBell={onBell}/>

            {categories.length != 0 && !weekSelected && <FlatList data={categories} keyExtractor={item => item.category} renderItem={renderTransactions} 
            ListHeaderComponent={getHeader} />}

            {categories.length != 0 && weekSelected && <FlatList data={categoriesWeek} keyExtractor={item => item.category} renderItem={renderTransactions} 
            ListHeaderComponent={getHeader} />}

            {categories.length == 0 && <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
                <Box content={Welcome}/>
                <TouchableOpacity onPress={onReport}><Text style={styles.report}>See full report</Text></TouchableOpacity>
                <Box content={PieChart}/> 
                <Box content={noTransactionsYet} />
            </ScrollView> }
        </SafeAreaView>
    )
}

export default React.memo(Home);