import React, {useContext, useEffect, useState} from "react";
import {ScrollView, Text, View, Image, Pressable } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../components/AppHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import Box from "../../../components/Box";

import { getApp } from "firebase/app";
import { getFirestore, getDoc, setDoc, doc } from 'firebase/firestore';
import { useAuthContext } from "../../../hooks/useAuthContext";
import { UserProfileContext } from "../../../context/UserProfileContext";


const ProfileOtherUser = ( {navigation, route} ) => {

    // console.log("Route.params:", route.params.item );
    const otherUser = route.params.item;

    const [userProfile, setUserProfile] = useContext(UserProfileContext);
    const [otherProfile, setOtherProfile] = useState(route.params.item);
    
    // Refresh page on navigation
    const [followingUser, setFollowingUser] = useState(false);
    useEffect(() => {
        if (userProfile.following.includes(otherUser.uid)) {
            setFollowingUser(true);
        }
    },[otherProfile]);


    const onBack = () => {
        navigation.goBack();
    }

    const onFollow = async () => {
        // Need to update following of user, and update followed of otherUser
        followingArray = userProfile.following;     // Change following to user
        followedArray = otherProfile.followers;        // Change followed of other user

        if (followingUser) {
            followingArray = followingArray.filter(id => id != otherProfile.uid);
            followedArray = followedArray.filter(id => id != userProfile.uid);
            setUserProfile(v => ( {...v, following: followingArray} ));
            setOtherProfile(v => ( {...v, followers: followedArray} ));
            setFollowingUser(false);

        } else { // Not following
            followingArray.push(otherProfile.uid);
            followedArray.push(userProfile.uid)
            setUserProfile(v => ( {...v, following: followingArray} ));
            setOtherProfile(v => ( {...v, followers: followedArray} ));
            setFollowingUser(true);
        }


        const app = getApp; 
        const db = getFirestore(app);
        
        // update following of logged in user
        await setDoc( doc(db, 'users', userProfile.uid), {
            following: followingArray,
        }, { merge: true });

        // update followers of followed user (may cause bug if multiple people follow at same time
        // as we are using local context of otherProfile followers. )
        await setDoc( doc(db, 'users', otherProfile.uid), {
            followers: followedArray,
        }, { merge: true });

    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader showBack onBack={onBack} title="Profile"/>

            <ScrollView showsVerticalScrollIndicator={false}> 

                {/* Profile, Bio, following and setting Buttons */}
                <View style={styles.whiteBox}>
                    <View style={styles.profile}>
                        <View style={styles.displayPictureWrapper}>
                            <Image style={styles.displayPicture} source={{uri: otherProfile.url}}/>
                        </View>
                        <View style={styles.nameBioContainer}>
                            <Text style={styles.name}>{otherProfile.username}</Text>
                            <View style={styles.bioContainer}>
                                <Text style={styles.bio}>{otherProfile.bio}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.followContainer}>
                        <TouchableOpacity style={styles.followerContainer}>
                            <Text style={styles.followText}>{otherProfile?.followers.length} Followers </Text>
                        </TouchableOpacity>
                        <View style={styles.line}/>
                        <TouchableOpacity style={styles.followerContainer}>
                            <Text style={styles.followText}>{otherProfile?.following.length} Following </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Follow/UnFollow and Message */}
                    <View style={styles.settingsContainer}>
                        <TouchableOpacity onPress={onFollow} style={styles.settingsBox}>
                            <View style={styles.opacityBox}>
                                { !followingUser &&  <Text style={styles.followText}>Follow</Text>}
                                { followingUser &&  <Text style={styles.followText}> UnFollow</Text>}
                            </View>
                        </TouchableOpacity>
                        <View style={{width: '5%'}}/>
                        <TouchableOpacity onPress={() => {}} style={styles.settingsBox}>
                            <View style={styles.opacityBox}>
                                <Text style={styles.followText}>Message</Text>
                                <Image style={styles.icon} source={require('../../../assets/icons/chat.png')}/>
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

export default React.memo(ProfileOtherUser);