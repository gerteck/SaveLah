import React, { useEffect, useState, useContext } from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { styles } from './styles';

import { getApp } from "@firebase/app";
import { doc, getDoc, setDoc, getFirestore, deleteDoc } from "@firebase/firestore";
import { UserProfileContext } from "../../context/UserProfileContext";

import { Icon } from '@rneui/themed';
import { ThemeContext } from "../../context/ThemeContext";
import themeColors from "../../utils/themeColors";


const app = getApp;
const db = getFirestore(app); 

const NOVOTE = 0;
const UPVOTE = 1;
const DOWNVOTE = 2;

const Comment = ({commentDetails, postDetails, navigation}) => { 

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
            // delete comment
            await deleteDoc(doc(db, 'comments', commentDetails.postId, "comments", commentDetails.id));
            // delete notification
            await deleteDoc(doc(db, 'notifications', postDetails.uid, 'notifications', commentDetails.id));
            // decrease comment count
            await setDoc( doc(db, 'posts', postDetails.id), {comments: postDetails.comments - 1,}, { merge: true });
            

            console.log('Comment deleted');
        } catch (error) {
            console.log('error deleting comment / Notification :>> ', error);
        }
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const commentDate = commentDetails?.createdAt.toDate();
    let min = commentDate.getMinutes()
    if (commentDate.getMinutes() < 10) {
        min = "0" + commentDate.getMinutes()
    } 

    const commentTimestamp = commentDate.getDate() + " " + monthNames[commentDate.getMonth()] + " " 
        + commentDate.getHours() + ":" + min;

    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode];

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
                        <Text style={[styles.username, {color: activeColors.text}]}>@{posterProfile?.username ? posterProfile?.username.replace(/\s/g, "") : ""}</Text>
                        <Text style={[styles.time, {color: activeColors.text}]}>{commentTimestamp}</Text>
                    </View>
                </View>

                <View style={styles.textRow}>
                    <Text style={[styles.commentText, {color: activeColors.secondaryText}]}>{commentDetails.text}</Text>
                </View>
            </View>

            {/* Vote Container and Delete */}
            <View style={styles.voteDeleteRow}>
                {userIsAuthor &&
                    <TouchableOpacity onPress={onDeleteComment} style={styles.commentDeleteContainer}>
                        <Icon name='trash-alt' size={15} type='font-awesome-5' color={activeColors.red}/>
                    </TouchableOpacity>
                } 
                <View style={styles.voteContainer}>
                    <TouchableOpacity disabled={commentVote == UPVOTE} onPress={() => onVote(UPVOTE)}>
                        { commentVote == UPVOTE 
                            ? <Icon name='chevron-up' size={10} type='font-awesome' color={activeColors.blue}/>
                            : <Icon name='chevron-up' size={10} type='font-awesome' color={activeColors.voteContainer}/>
                        }
                    </TouchableOpacity>
                    <Text style={[styles.votes, {color: activeColors.text}]}>{commentDetails.votes}</Text>
                    <TouchableOpacity disabled={commentVote == DOWNVOTE}  onPress={() => onVote(DOWNVOTE)}>
                        { commentVote == DOWNVOTE 
                            ? <Icon name='chevron-down' size={10} type='font-awesome' color={activeColors.red}/>
                            : <Icon name='chevron-down' size={10} type='font-awesome' color={activeColors.voteContainer}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>

        </View>
        <View style={[styles.divider, {backgroundColor: activeColors.divider}]} />
    </>)

}

export default React.memo(Comment);
