import React, {useContext, useEffect, useState} from "react";
import {ScrollView, Text, View, Image, Pressable } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../components/AppHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import Box from "../../../components/Box";

import { getApp } from "firebase/app";
import { getFirestore, getDoc, setDoc, doc, collection, where, orderBy, limit, query, getDocs, deleteDoc } from 'firebase/firestore';
import { useAuthContext } from "../../../hooks/useAuthContext";
import { UserProfileContext } from "../../../context/UserProfileContext";
import PostList from "../../../components/PostList";

import { Icon } from '@rneui/themed';
import { ThemeContext } from "../../../context/ThemeContext";
import themeColors from "../../../utils/themeColors";

const app = getApp;
const db = getFirestore(app);

const ProfileOtherUser = ( {navigation, route} ) => {

    // console.log("Route.params:", route.params.item );
    // otherUser is the inital passed param, while otherProfile is used for holding values
    const otherUser = route.params.item;
    const { user } = useAuthContext();

    // Navigate out if own Profile and initalize other user Profile
    useEffect(() => {
        if (otherUser.uid == user.uid) {
            navigation.navigate('Tabs', {screen: 'ProfileSettings', params: {screen: 'Profile'}});
        }
        setOtherProfile(otherUser);
    }, [otherUser])

    const [userProfile, setUserProfile] = useContext(UserProfileContext);
    const [otherProfile, setOtherProfile] = useState(route.params.item);
    const [otherUserPost, setOtherUserPost] = useState([]);
    
    // Refresh following status on navigation
    const [followingUser, setFollowingUser] = useState(false);
    useEffect(() => {
        if (userProfile.following.includes(otherUser.uid)) {
            setFollowingUser(true);
        }
    },[otherProfile]);
    
    
    // Get User Top Posts. 
    useEffect(()=> {
        if (otherProfile) {
            const postsRef = collection(db, "posts")
            const q = query(postsRef, where("uid", '==', otherProfile.uid), orderBy("votes", "desc"), limit(3));    
            const getPosts = async () => {
                const querySnapshot = await getDocs(q);
                const posts = [];
                querySnapshot.forEach((doc) => {
                    posts.push(doc.data());
                });
                setOtherUserPost(posts);
                console.log("Loaded otherUserPost");
            }
            getPosts();
        }
    }, [otherProfile]); 


    const onBack = () => {
        navigation.goBack();
    }

    const onFollow = async () => {
        // Need to update following of user, and update followed of otherUser
        followingArray = userProfile.following;     // Change following to user
        followedArray = otherProfile.followers;        // Change followed of other user
        sendFollowNotification = !followingUser;

        // Unfollow the user.
        if (followingUser) {
            followingArray = followingArray.filter(id => id != otherProfile.uid);
            followedArray = followedArray.filter(id => id != userProfile.uid);
            setUserProfile(v => ( {...v, following: followingArray} ));
            setOtherProfile(v => ( {...v, followers: followedArray} ));
            setFollowingUser(false);

        } else { // Follow the user.
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

        // send notification to user:
        //message = "@" + userProfile?.username.replace(/\s/g, "") + " just followed you!"
        if (sendFollowNotification) {
            //onsole.log("Send follow notification");
            await setDoc( doc(db, 'notifications', otherProfile.uid, 'notifications', userProfile.uid), {
                details: "Depreciated Field",
                isRead: false,
                notificationType: "follow",
                uid: userProfile.uid,
                 id: userProfile.uid,
                createdAt: new Date(),
            }, { merge: true });
        } else {
            //console.log("delete follow notification");
            await deleteDoc(doc(db, 'notifications', otherProfile.uid, 'notifications', userProfile.uid));
        }

    }

    const onFollowerInfo = (followerSelected) => {
        const item = otherUser;
        navigation.navigate('ProfileFollowInfo', { item, followerSelected });
    };

    const onMessageUser = () => {
        navigation.navigate('ForumChat', {profile: otherProfile});

    };

    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode];

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader showBack onBack={onBack} title="Profile"/>

            <ScrollView showsVerticalScrollIndicator={false}> 

                {/* Profile, Bio, following and setting Buttons */}
                <View style={[styles.containerBox, {backgroundColor: activeColors.inputBackground}]}>
                    <View style={styles.profile}>
                        <View style={styles.displayPictureWrapper}>
                            <Image style={styles.displayPicture} source={{uri: otherProfile.url}}/>
                        </View>
                        <View style={styles.nameBioContainer}>
                            <Text style={[styles.name, {color: activeColors.text}]}>{otherProfile.username}</Text>
                            <View style={[styles.bioContainer, {backgroundColor: activeColors.secondaryContainerBackground}]}>
                                <Text style={[styles.bio, {color: activeColors.text}]}>{otherProfile.bio}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.followContainer}>
                        <TouchableOpacity style={styles.followerContainer} onPress={() => onFollowerInfo(true)} >
                            <Text style={[styles.followText, {color: activeColors.text}]}>{otherProfile?.followers.length} Followers </Text>
                        </TouchableOpacity>
                        <View style={[styles.line, {backgroundColor: activeColors.text}]}/>
                        <TouchableOpacity style={styles.followerContainer} onPress={() => onFollowerInfo(false)}>
                            <Text style={[styles.followText, {color: activeColors.text}]}>{otherProfile?.following.length} Following </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Follow/UnFollow and Message */}
                    <View style={styles.settingsContainer}>
                        <TouchableOpacity onPress={onFollow} style={[styles.settingsBox, {backgroundColor: activeColors.secondaryContainerBackground}]}>
                            <View style={styles.opacityBox}>
                                { !followingUser &&  <Text style={[styles.followText, {color: activeColors.text}]}>Follow</Text>}
                                { followingUser &&  <Text style={[styles.followText, {color: activeColors.text}]}> Unfollow</Text>}
                            </View>
                        </TouchableOpacity>
                        <View style={{width: '5%'}}/>
                        <TouchableOpacity onPress={onMessageUser} style={[styles.settingsBox, {backgroundColor: activeColors.secondaryContainerBackground}]}>
                            <View style={styles.opacityBox}>
                                <Text style={[styles.followText, {color: activeColors.text}]}>Message</Text>
                                <Icon name='comment-dots' size={20} style={{marginLeft: 16}} type='font-awesome-5' color={activeColors.iconColor}/> 
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <Text style={[styles.postTitle, {color: activeColors.text}]}> Top posts </Text>
                {otherUserPost && <PostList posts={otherUserPost} navigation={navigation} mapList />} 
                { otherUserPost.length == 0 && 
                    <View style={[styles.emptyPostBox, {backgroundColor: activeColors.containerBackground}]}>
                        <Text style={styles.emoticon}>ಥ‿ಥ</Text>
                        <Text style={styles.noPostText}>Looks like {otherProfile.username} has no posts</Text>
                    </View>
                }
                {/* Add posts FlatList here! */}


            </ScrollView>

        </SafeAreaView>
    )
}

export default React.memo(ProfileOtherUser);