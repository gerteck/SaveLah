import React, {useContext, useEffect, useState} from "react";
import {ScrollView, Text, View, Image, Pressable, StatusBar } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../components/AppHeader";
import { TouchableOpacity } from "react-native-gesture-handler";

import { getApp } from "firebase/app";
import { getFirestore, getDoc, doc, collection, query, where, orderBy, getDocs, onSnapshot, limit } from 'firebase/firestore';
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useIsFocused } from '@react-navigation/native';
import { UserProfileContext } from "../../../context/UserProfileContext";
import PostList from "../../../components/PostList";

import { Icon } from '@rneui/themed';
import { ThemeContext } from "../../../context/ThemeContext";
import themeColors from "../../../utils/themeColors";
import { Modal } from "react-native";

const app = getApp;
const db = getFirestore(app);


const Profile = ( {navigation} ) => {

    const { user } = useAuthContext();
    const [userProfile, setUserProfile] = useContext(UserProfileContext);
    const getUserProfile = async () => {
        const userProfileRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(userProfileRef);
        return docSnap.data();
    }

    // Get Posts:
    const [userPosts, setUserPosts] = useState([]);
    const [postUnsub, setPostUnsub] = useState(() => () => {console.log("Default")});

    useEffect(()=> {
        if (user) {
            console.log("Subscribe to Posts");
            const postsRef = collection(db, "posts")
            const q = query(postsRef, where("uid", '==', user?.uid), orderBy("votes", "desc"));
            const unsubscribePosts = onSnapshot(q, (querySnapshot) => {
                const posts = [];
                querySnapshot.forEach((doc) => {
                    posts.push(doc.data());
                });
                setUserPosts(posts);
            });
            setPostUnsub(() => unsubscribePosts);
        }
        // postUnsub();
    }, [user]); 

    // Refresh page on navigation
    const isFocused = useIsFocused();
    useEffect(() => {
      if (user) {
        getUserProfile().then(data => setUserProfile(data))
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

    const onFollowerInfo = (followerSelected) => {
        const item = userProfile;
        navigation.navigate('ProfileFollowInfo', { item, followerSelected });
    };
    
    
    const { theme } = useContext(ThemeContext);
    let activeColors = themeColors[theme.mode];
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Profile" showBell onBell={onBell} />

            {/* View all user posts: in Modal */}
            <Modal visible={modalVisible} 
                    animationType="slide" 
                    transparent={false} 
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);}}>

                <View style={{backgroundColor: activeColors.appBackground}}>
                    <AppHeader title="All your Posts" showCross onBack={() => setModalVisible(!modalVisible)} />
                </View>
                <View style={[styles.flatlistContainer, {backgroundColor: activeColors.appBackground}]}>
                    <PostList posts={userPosts} navigation={navigation}/>
                </View>
            </Modal>

            <ScrollView showsVerticalScrollIndicator={false}> 

                {/* Profile, Bio, following and setting Buttons */}
                <View style={[styles.containerBox, {backgroundColor: activeColors.inputBackground}]}>
                    <View style={styles.profile}>
                        <View style={styles.displayPictureWrapper}>
                            <Image style={styles.displayPicture} source={{uri: userProfile.url}}/>
                        </View>
                        <View style={styles.nameBioContainer}>
                            <Text style={[styles.name, {color: activeColors.text}]}>{userProfile.username}</Text>
                            <View style={[styles.bioContainer, {backgroundColor: activeColors.secondaryContainerBackground}]}>
                                <Text style={[styles.bio, {color: activeColors.text}]}>{userProfile.bio}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.followContainer}>
                        <TouchableOpacity style={styles.followerContainer} onPress={() => onFollowerInfo(true)}>
                            <Text style={[styles.followText, {color: activeColors.text}]}>{userProfile?.followers.length} Followers </Text>
                        </TouchableOpacity>
                        <View style={[styles.line, {backgroundColor: activeColors.text}]}/>
                        <TouchableOpacity style={styles.followerContainer} onPress={() => onFollowerInfo(false)}>
                            <Text style={[styles.followText, {color: activeColors.text}]}>{userProfile?.following.length} Following</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Findfriends /Settings */}
                    <View style={styles.settingsContainer}>
                        <TouchableOpacity onPress={onProfileSearchUser} style={[styles.settingsBox, {backgroundColor: activeColors.secondaryContainerBackground}]}>
                            <View style={styles.opacityBox}>
                                <Text style={[styles.followText, {color: activeColors.text}]}>Find Friends</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{width: '5%'}}/>
                        <TouchableOpacity onPress={goSettings} style={[styles.settingsBox, {backgroundColor: activeColors.secondaryContainerBackground}]}>
                            <View style={styles.opacityBox}>
                                <Text style={[styles.followText, {color: activeColors.text}]}>Settings</Text>
                                {/* <Image style={styles.icon} source={require('../../../assets/icons/edit.png')}/> */}
                                <Icon name='edit' style={styles.icon} type='font-awesome' color={activeColors.iconColor}/> 
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.postsRow}>
                    <Text style={[styles.postTitle, {color: activeColors.text}]}> Top 3 Posts </Text>
                    <TouchableOpacity style={styles.viewPostsTouchable} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={[styles.viewAllPosts, {color: activeColors.secondaryText}]}> View all posts</Text>
                    </TouchableOpacity>
                </View>


                { userPosts && <PostList posts={userPosts.slice(0,3)} navigation={navigation} mapList />}
                { userPosts.length == 0 && 
                    <View style={[styles.emptyPostBox, {backgroundColor: activeColors.inputBackground}]}>
                        <Text style={styles.emoticon}>٩(⌯꒦ິ̆ᵔ꒦ິ)۶ ᵒᵐᵍᵎᵎᵎ</Text>
                        <Text style={styles.noPostText}>Start a new post, {userProfile.username}!</Text>
                    </View>
                }

            </ScrollView>

        </SafeAreaView>
    )
}

export default React.memo(Profile);