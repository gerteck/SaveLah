import React from "react";
import {Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";

import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { getApp } from "firebase/app";
import { UserProfileContext } from "../../../context/UserProfileContext";


const ScreenTemplate = ( { navigation } ) => {
    
    const [ userProfile, setUserProfile ] = useContext(UserProfileContext);
    const { user } = useAuthContext();
    const getUserProfile = async () => {
        const app = getApp;
        const db = getFirestore(app);
        const userProfileRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userProfileRef);
        return docSnap.data();
    }
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader style={styles.appHeader} title={"Screen Template"}/>
            <Text> ScreenTemplate </Text>
        </SafeAreaView>
    )
}

export default React.memo(ScreenTemplate);