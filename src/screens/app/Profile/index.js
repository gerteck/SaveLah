import React, {useContext, useEffect, useState} from "react";
import {ScrollView, Text, View, Image, Pressable } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../components/AppHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import Box from "../../../components/Box";

import { getApp } from "firebase/app";
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useIsFocused } from '@react-navigation/native';
import { UserProfileContext } from "../../../context/UserProfileContext";

const Profile = ( {navigation} ) => {

    const { user } = useAuthContext();
    const [userProfile, setUserProfile] = useContext(UserProfileContext);
    const getUserProfile = async () => {
        const app = getApp;
        const db = getFirestore(app);
        const userProfileRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userProfileRef);
        return docSnap.data();
    }

    // Refresh page on navigation
    const isFocused = useIsFocused();
    useEffect(() => {
      if (user) {
        getUserProfile().then(data => setUserProfile(data))
        //console.log("Refresh Profile Page");
        //console.log(userProfile);
      }
    },[isFocused]);

    const goSettings = () => {
        navigation.navigate('Settings');
    }

    const onBell = () => {
        navigation.navigate('Notifications');
    };

    const onProfileSearchUser = () => {
        navigation.navigate('ProfileSearchUser');
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Profile" showBell onBell={onBell} />

            <ScrollView showsVerticalScrollIndicator={false}> 

                {/* Profile, Bio, following and setting Buttons */}
                <View style={styles.whiteBox}>
                    <View style={styles.profile}>
                        <View style={styles.displayPictureWrapper}>
                            <Image style={styles.displayPicture} source={{uri: userProfile.url}}/>
                        </View>
                        <View style={styles.nameBioContainer}>
                            <Text style={styles.name}>{userProfile.username}</Text>
                            {/* For testing purpose */}
                            {/* <Text style={styles.name}>{userProfile.uid}</Text> */}
                            <View style={styles.bioContainer}>
                                <Text style={styles.bio}>{userProfile.bio}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.followContainer}>
                        <TouchableOpacity style={styles.followerContainer}>
                            <Text style={styles.followText}>{userProfile?.followers.length} Followers </Text>
                        </TouchableOpacity>
                        <View style={styles.line}/>
                        <TouchableOpacity style={styles.followerContainer}>
                            <Text style={styles.followText}>{userProfile?.following.length} Following</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Findfriends /Settings */}
                    <View style={styles.settingsContainer}>
                        <TouchableOpacity onPress={onProfileSearchUser} style={styles.settingsBox}>
                            <View style={styles.opacityBox}>
                                <Text style={styles.followText}>Find Friends</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{width: '5%'}}/>
                        <TouchableOpacity onPress={goSettings} style={styles.settingsBox}>
                            <View style={styles.opacityBox}>
                                <Text style={styles.followText}>Settings</Text>
                                <Image style={styles.icon} source={require('../../../assets/icons/edit.png')}/>
                            </View>
                        </TouchableOpacity>
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