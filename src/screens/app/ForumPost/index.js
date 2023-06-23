import React, { useEffect, useState } from "react";
import {Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";

import { getApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const app = getApp;
const db = getFirestore(app);

const ForumPost = ( {navigation, route} ) => {

    const postDetails = route.params?.post;
    // fields: body, category, comments, createdAt, id, title, uid, url, votes

    const posterUid = postDetails.uid;
    const [posterProfile, setPosterProfile] = useState({}); 
    
    useEffect( () => {
        const getProfile = async () => {
            const userRef = doc(db, "users", posterUid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                setPosterProfile(docSnap.data());
                //console.log("Poster: ", posterProfile)
            } else {
                setPosterProfile({});
                console.log("No such document! Error Finding User");
            } 
        }
        getProfile(); 
    }, [route]);

    const onBack = () => {
        navigation.goBack();
    }

    const posterURL = posterProfile?.url;
    const title = posterProfile.username ? "Posted by " + posterProfile.username : "Posted by Anonymous";

    return (
        <SafeAreaView style={styles.safeContainer}>
            <AppHeader showBack onBack={onBack} style={styles.appHeader} userPictureURL={posterURL} title={title}/>
            <View style={styles.whiteView}>
                
                <View style={styles.postContainer}>
                    {/* Category and Date Time */}
                    <View style={styles.header}>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.categoryText}>{postDetails.category}</Text>
                        </View>
                        <Text style={styles.time}>{postDetails.createdAt.toDate().toDateString()}</Text>
                    </View>

                    <Text style={styles.title} >{postDetails.title}</Text>
                    <Text style={styles.body} >{postDetails.body}</Text>


                    {/* Votes and Comments */}
                    <View style={styles.footer}>
                        <Image source={require('../../../assets/appIcons/up.png')} style={styles.arrowIcon}/>
                        <Text style={styles.votes}>{postDetails.votes}</Text>
                        <Image source={require('../../../assets/appIcons/down.png')} style={styles.arrowIcon}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default React.memo(ForumPost);