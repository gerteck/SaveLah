import React, {useEffect, useState} from "react";
import {ScrollView, Text, View, Image, Pressable } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../components/AppHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import Box from "../../../components/Box";

import { getApp } from "firebase/app";
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { useAuthContext } from "../../../hooks/useAuthContext";
const app = getApp;
const db = getFirestore(app);

const Profile = ( {navigation} ) => {

    const { user } = useAuthContext();
    const [userProfile, setUserProfile] = useState({});
    const getUserProfile = async () => {
        const userProfileRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userProfileRef);
        return docSnap.data();
    }
    useEffect(() => {
      if (user) {
        getUserProfile().then(data => setUserProfile(data))
        //console.log(userProfile);
      }
    },[user]);

    const goSettings = () => {
        navigation.navigate('Settings');
    }

    const onBell = () => {
        navigation.navigate('Notifications');
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Profile" showBell onBell={onBell} />

            <ScrollView showsVerticalScrollIndicator={false}> 

                {/* Profile, Bio, following and setting Buttons */}
                <View style={styles.whiteBox}>
                    <View style={styles.profile}>
                        <View style={styles.displayWrapper}>
                            <Image style={styles.displayPicture} source={{uri: userProfile.url}}/>
                        </View>
                        <View style={styles.nameBioContainer}>
                            <Text style={styles.name}>{userProfile.username}</Text>
                            <View style={styles.bioContainer}>
                                <Text style={styles.bio}>{userProfile.bio}</Text>
                            </View>
                        </View>

                    </View>


                    <View style={styles.followContainer}>
                        <TouchableOpacity style={styles.followerContainer}>
                            <Text style={styles.followText}>5 Followers </Text>
                        </TouchableOpacity>
                        <View style={styles.line}/>
                        <TouchableOpacity style={styles.followerContainer}>
                            <Text style={styles.followText}>20 Following</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Will be dynamic to show either findfriends/Settings or Message/Follow */}
                    <View style={styles.settingsContainer}>
                        <View style={styles.settingsBox}>
                            <TouchableOpacity style={styles.opacityBox}>
                                <Text style={styles.followText}>Find Friends</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '5%'}}/>
                        <View style={styles.settingsBox}>
                            <TouchableOpacity onPress={goSettings} style={styles.opacityBox}>
                                <Text style={styles.followText}>Settings</Text>
                                <Image style={styles.icon} source={require('../../../assets/icons/edit.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Text style={styles.postTitle}> Top posts </Text>
                <Box style={{height: 500}} />
                {/* Add posts FlatList here! */}


            </ScrollView>

        </SafeAreaView>
    )
}

export default React.memo(Profile);