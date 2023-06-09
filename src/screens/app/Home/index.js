import React, { useState } from "react";
import {Text, TouchableOpacity, Pressable, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";

import Box from "../../../components/Box";
import { ScrollView } from "react-native-gesture-handler";

const Home = ( { navigation } ) => {

    const onBell = () => {
        navigation.navigate('Notifications');
    };

    const Welcome = (<> 
        <Text style={styles.welcome}>Welcome Back,</Text>
        <Text style={styles.name}>John Doe</Text>
        <View style={styles.budgetOverview}>
            <View> 
                <Text style={styles.money}>$90,000</Text>
                <Text style={styles.caption}>Budget left</Text>
            </View>
            <View> 
                <Text style={styles.money} >$800.45</Text>
                <Text style={styles.caption} >Amount Spent</Text>
            </View>
        </View>
    </>);

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

    const TopSpendings = (<>
        <Text style={styles.transactionTitle}>Top Spendings</Text>
        {SampleTransaction}
        {SampleTransaction}
        {SampleTransaction}
    </>);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="SaveLah" showBell onBell={onBell}/>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Box content={Welcome}/>
                <TouchableOpacity><Text style={styles.report}>See full report</Text></TouchableOpacity>
                <Box content={PieChart}/>
                <Box content={TopSpendings}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(Home);