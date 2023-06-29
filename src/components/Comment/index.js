import React, { useEffect, useState, useContext } from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { styles } from './styles';

import { getApp } from "@firebase/app";
import { doc, getDoc, setDoc, getFirestore, deleteDoc } from "@firebase/firestore";
import { UserProfileContext } from "../../context/UserProfileContext";

const app = getApp;
const db = getFirestore(app); 

const NOVOTE = 0;
const UPVOTE = 1;
const DOWNVOTE = 2;

const Comment = ({commentDetails, navigation}) => { 

    const posterUid = commentDetails.posterId;
    const [userProfile, setUserProfile] = useContext(UserProfileContext); 
    const [posterProfile, setPosterProfile] = useState({}); 
    const userIsAuthor = commentDetails.posterId == userProfile.uid;

    // Get Poster Profile and Set comment Vote
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
        if (commentDetails.upvoters.includes(userProfile.uid)) {
            setCommentVote(UPVOTE);
        }
        if (commentDetails.downvoters.includes(userProfile.uid)) {
            if (commentVote == UPVOTE) {throw new Error("upvote & downvote at same time")}
            setCommentVote(DOWNVOTE);
        }
    }, [commentDetails]);

    // fields: text, posterId, postId, id, votes, upvoters, downvoters, createdAt

    const onUserPress = () => {
        navigation.navigate('ProfileOtherUser', { item: posterProfile });
    };

    const [commentVote, setCommentVote] = useState(NOVOTE);

    // remove item from array
    function removeItemAll(arr, value) {
        var i = 0;
        while (i < arr.length) {
            if (arr[i] === value) {
            arr.splice(i, 1);
            } else {
            ++i;
            }
        }
        return arr;
    }

    // Comment Voting
    const onVote = (num) => {
        const downvoteArray = commentDetails.downvoters;
        const upvoteArray = commentDetails.upvoters;

        if (num == UPVOTE) {
            if (commentVote == DOWNVOTE) {
                removeItemAll(downvoteArray, userProfile.uid);
            }
            upvoteArray.push(userProfile.uid);
            setCommentVote(UPVOTE);
        }
        if (num == DOWNVOTE) {
            if (commentVote == UPVOTE) {
                removeItemAll(upvoteArray, userProfile.uid);
            }
            downvoteArray.push(userProfile.uid);
            setCommentVote(DOWNVOTE);
        }
        const sendComment = async () => {
            await setDoc( doc(db, 'comments', commentDetails.postId, "comments", commentDetails.id), {
                upvoters: upvoteArray,
                downvoters: downvoteArray,
                votes: upvoteArray.length - downvoteArray.length,
            }, { merge: true });
        }
        sendComment();
    } 
    
    const onDeleteComment = () => {
        Alert.alert('', 'Delete this comment?', [
            {
                text: 'NO',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'YES',
                onPress: () => onConfirmDeleteComment(),
            }
        ], { cancelable: true });
    }

    const onConfirmDeleteComment = async () => {
        try {
            await deleteDoc(doc(db, 'comments', commentDetails.postId, "comments", commentDetails.id));
            console.log('Comment deleted');
        } catch (error) {
            console.log('error deleting comment :>> ', error);
        }
    }


    return ( <>
        <View style={styles.commentContainer}>
            
            {/* User Info and Comment Text */}
            <View style={styles.commentDetails}>

                <View style={styles.posterRow}>
                    <View style={styles.iconBubble}>
                        <TouchableOpacity onPress={onUserPress}>
                            <Image style={styles.displayPicture} source={{uri: posterProfile?.url}} />
                        </TouchableOpacity>
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

            {/* Vote Container and Delete */}
            <View style={styles.voteDeleteRow}>
                {userIsAuthor ?
                <TouchableOpacity onPress={onDeleteComment} style={styles.commentDeleteContainer}>
                    <Image source={require('../../assets/icons/redDelete.png')} style={styles.deleteImage}/>
                </TouchableOpacity>
                    :
                <View/>
                } 
                <View style={styles.voteContainer}>
                    <TouchableOpacity disabled={commentVote == UPVOTE} onPress={() => onVote(UPVOTE)}>
                        <Image source={commentVote == UPVOTE ? require('../../assets/appIcons/upFilled.png') 
                            : require('../../assets/appIcons/up.png')} style={styles.arrowIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.votes}>{commentDetails.votes}</Text>
                    <TouchableOpacity disabled={commentVote == DOWNVOTE}  onPress={() => onVote(DOWNVOTE)}>
                        <Image source={commentVote == DOWNVOTE ? require('../../assets/appIcons/downFilled.png') 
                            : require('../../assets/appIcons/down.png')} style={styles.arrowIcon}/>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
        <View style={styles.divider} />
    </>)

}

export default React.memo(Comment);
