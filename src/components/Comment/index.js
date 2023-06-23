import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { styles } from './styles';

import { getApp } from "@firebase/app";
import { doc, getDoc, getFirestore } from "@firebase/firestore";

const app = getApp;
const db = getFirestore(app);

const Comment = ({commentDetails, navigation}) => {

    const posterUid = commentDetails.posterId;
    const [posterProfile, setPosterProfile] = useState({}); 

    useEffect( () => {
        const getProfile = async () => {
            const userRef = doc(db, "users", posterUid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                setPosterProfile(docSnap.data());
                // console.log("Poster: ", posterProfile);
            } else {
                setPosterProfile({uid: posterUid});
                console.log("No such document! Error Finding User");
            } 
        }
        getProfile(); 
    }, [commentDetails]);

    //console.log(commentDetails);
    // fields: text, posterId, postId, id, votes, upvoters, downvoters, createdAt

    const onUserPress = () => {
        navigation.navigate('ProfileOtherUser', { item: posterProfile });
    };

    new Date().toLocaleDateString

    return ( <>
        <View style={styles.commentContainer}>
            <View style={styles.commentDetails}>
                <View style={styles.posterRow}>
                    <View style={styles.iconBubble}>
                        <Image style={styles.displayPicture} source={{uri: posterProfile?.url}} />
                    </View>
                    <View style={styles.posterDetails}>
                        <Text style={styles.username}>@{posterProfile?.username ? posterProfile?.username.replace(/\s/g, "") : ""}</Text>
                        <Text style={styles.time}>{commentDetails?.createdAt.toDate().toLocaleDateString()}</Text>
                    </View>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.commentText}>{commentDetails.text}</Text>
                </View>
            </View>

            <View style={styles.voteContainer}>
                    <Image source={require('../../assets/icons/upvote.png')} style={styles.arrowIcon}/>
                    <Text style={styles.vote}>{commentDetails.votes}</Text>
                    <Image source={require('../../assets/icons/downvote.png')} style={styles.arrowIcon}/>
            </View>

        </View>
        <View style={styles.divider} />
    </>)

}

export default React.memo(Comment);
