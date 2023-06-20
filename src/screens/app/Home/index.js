import React, { useState, useContext } from "react";
import {Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import Box from "../../../components/Box";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { UserProfileContext } from "../../../context/UserProfileContext";
import { projectFireStore } from "../../../firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useEffect } from "react";
import TopSpendingTabs from "../../../components/TopSpendingTabs";

const Home = ( { navigation } ) => {
    
    const [ userProfile, setUserProfile ] = useContext(UserProfileContext);
    const { user } = useAuthContext();

    // logout quickfix can fix later

    const [ expense, setExpense ] = useState('0');
    const [ error, setError ] = useState(null);
    const [ categories, setCategories ] = useState([]);
    
    // setting date range
    var curr = new Date();
    var y = curr.getFullYear();
    var m = curr.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

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
                    map(([k, v, p]) => ({ category: k, value: v, percentage: p })).sort((a,b) => b.percentage - a.percentage);

                // update state
                setExpense(result);
                setCategories(cats);
        }, (error) => {
                console.log(error);
                setError('could not fetch data');
        });

        return () => unsubscribe();
    },[]);
    

    const onBell = () => {
        navigation.navigate('Notifications');
    };

    const Welcome = (<> 
        <Text style={styles.welcome}>Welcome Back,</Text>
        <Text style={styles.name}>{userProfile.username}</Text>
        <View style={styles.budgetOverview}>
            <View> 
                <Text style={styles.money}>$90,000</Text>
                <Text style={styles.caption}>Budget left</Text>
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
    const PieChart = (<>
        <View style={styles.weekMonthBar}>
            <TouchableOpacity disabled={weekSelected} onPress={() => setWeekSelected(true)} 
                style={[styles.weekMonth, weekSelected ? styles.selected : {}]}><Text>week</Text></TouchableOpacity>

            <TouchableOpacity disabled={!weekSelected} onPress={() => setWeekSelected(false)} 
                style={[styles.weekMonth, !weekSelected ? styles.selected : {}]}><Text>month</Text></TouchableOpacity>
        </View>

        <Image source={require('../../../assets/DummyChart.png')} style={{height: 200, width: 232, alignSelf: 'center'}}/>


    </>);

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
            <TouchableOpacity><Text style={styles.report}>See full report</Text></TouchableOpacity>
            <Box content={PieChart}/>
            <Text style={styles.transactionTitle}>Top Spendings for the month</Text>
        </>)
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="SaveLah" showBell onBell={onBell}/>

            {categories.length != 0 && <FlatList data={categories} keyExtractor={item => item.category} renderItem={renderTransactions} 
            ListHeaderComponent={getHeader} />}
            
            {categories.length == 0 && <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
                <Box content={Welcome}/>
                <TouchableOpacity><Text style={styles.report}>See full report</Text></TouchableOpacity>
                <Box content={PieChart}/> 
                <Box content={noTransactionsYet} />
            </ScrollView> }
        </SafeAreaView>
    )
}

export default React.memo(Home);