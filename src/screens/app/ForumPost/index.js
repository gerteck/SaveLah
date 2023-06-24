import React, { useContext, useEffect, useState } from "react";
import {Text, View, Image, TouchableOpacityBase, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import DropDownPicker from 'react-native-dropdown-picker';

import { getApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, onSnapshot, QuerySnapshot, query } from "firebase/firestore";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useFirestore } from "../../../hooks/useFirestore";
import { UserProfileContext } from "../../../context/UserProfileContext";
import { render } from "react-dom";
import Comment from "../../../components/Comment";
const app = getApp;
const db = getFirestore(app);

const NOVOTE = 0;
const UPVOTE = 1;
const DOWNVOTE = 2;

const ForumPost = ( {navigation, route} ) => {

    const [userProfile, setUserProfile] = useContext(UserProfileContext);

    const [posterProfile, setPosterProfile] = useState({}); 
    const [postDetails, setPostDetails] = useState(route.params?.post);
    // fields: body, category, comments, createdAt, id, title, uid, url, votes
    // console.log(postDetails);
    //console.log("refresh");

    const [allComments, setAllComments] = useState([]);
    const [addingComment, setAddingComment] = useState(false);
    const [commentText, setCommentText] = useState(""); 
    const [postVote, setPostVote] = useState(0);

    // Set up Listener
    useEffect(() => {
        const unsubPost = onSnapshot(doc(db, "posts", postDetails.id), (doc) => {
            setPostDetails(doc.data());
        });
        if (postDetails.upvoters.includes(userProfile.uid)) {
            setPostVote(UPVOTE);
        }
        if (postDetails.downvoters.includes(userProfile.uid)) {
            if (postVote == UPVOTE) {throw new Error("upvote & downvote at same time")}
            setPostVote(DOWNVOTE);
        }
    }, [route]);

    const collectionRoute = 'comments/' + postDetails?.id + '/comments';
    const { addDocument, response } = useFirestore(collectionRoute);

    const postComment = () => {
        if (!commentText) { 
            Alert.alert('Comment can\'t be empty!');
            return;
        }
        const uploadComment = async () => {
            const comment = await addDocument({
                postId: postDetails.id,
                posterId: userProfile.uid,
                text: commentText,
                votes: 0,
                upvoters: [],
                downvoters: [],
                id: 1,
            }); 
            await setDoc(doc(db, collectionRoute, comment.id), {
                id: comment.id,
            }, { merge: true });
        }
        uploadComment(); 
        const increaseCommentCount = async () => {
            await setDoc( doc(db, 'posts', postDetails.id), {
                comments: postDetails.comments + 1,
            }, { merge: true });
        }
        increaseCommentCount();
        setAddingComment(false);
        setCommentText("");
    }

    const getAllComments = () => { 
        const commentCollectionRef = collection(db, 'comments/' + postDetails?.id + '/comments');
        const unSubComments = onSnapshot(commentCollectionRef, (querySnapshot) => {
            const comments = [];
            querySnapshot.forEach((doc) => {
                comments.push(doc.data());
            })
            //console.log(comments);
            setAllComments(comments);
        })
    }
    
    // Get Poster Profile
    useEffect( () => {
        const getProfile = async () => {
            const userRef = doc(db, "users", postDetails?.uid);
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
        getAllComments();
    }, [route]);
    
    //Drop Down Picker for Comments:
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([{label: 'Recent', value: 'recent'}, {label: 'Most upvoted', value: 'mostUpvote'}]);
    const [sort, setSort] = useState('recent');

    const onBack = () => {
        navigation.goBack();
    }

    const onUserPress = () => {
        navigation.navigate('ProfileOtherUser', { item: posterProfile });
    };

    const posterURL = posterProfile?.url;
    const title = posterProfile.username ? "Posted by " + posterProfile.username : "Posted by Anonymous";

    // Post Voting
    const onVote = (num) => {
        const downvoteArray = postDetails.downvoters;
        const upvoteArray = postDetails.upvoters;

        if (num == UPVOTE) {
            if (postVote == DOWNVOTE) {
                removeItemOnce(downvoteArray, userProfile.uid);
            }
            upvoteArray.push(userProfile.uid);
            setPostVote(UPVOTE);
        }
        if (num == DOWNVOTE) {
            if (postVote == UPVOTE) {
                removeItemOnce(upvoteArray, userProfile.uid);
            }
            downvoteArray.push(userProfile.uid);
            setPostVote(DOWNVOTE);
        }
        const sendVote = async () => {
            await setDoc( doc(db, 'posts', postDetails.id), {
                upvoters: upvoteArray,
                downvoters: downvoteArray,
                votes: upvoteArray.length - downvoteArray.length,
            }, { merge: true });
        }
        sendVote();

    } 

    // remove item from array
    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
    }
    
    return (
        <SafeAreaView style={styles.safeContainer}>
        <ScrollView>
            <AppHeader showBack onBack={onBack} style={styles.appHeader} userPictureURL={posterURL} title={title} onUserPicture={onUserPress}/>
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

                    {postDetails?.url && 
                        <View style={styles.imageContainer}>
                            <Image source={{uri: postDetails.url}} style={styles.postImage} />
                        </View>
                    }

                    <Text style={styles.body} >{postDetails.body}</Text>

                    {/* Votes and Comments */}
                    <View style={styles.footer}>
                        <TouchableOpacity disabled={postVote == UPVOTE} onPress={() => onVote(UPVOTE)}>
                            <Image source={postVote == UPVOTE ? require('../../../assets/appIcons/upFilled.png') 
                                : require('../../../assets/appIcons/up.png')} style={styles.arrowIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.votes}>{postDetails.votes}</Text>
                        <TouchableOpacity disabled={postVote == DOWNVOTE}  onPress={() => onVote(DOWNVOTE)}>
                            <Image source={postVote == DOWNVOTE ? require('../../../assets/appIcons/downFilled.png') 
                                : require('../../../assets/appIcons/down.png')} style={styles.arrowIcon}/>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                
                <View style={styles.addCommentRow}>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => setAddingComment(b => !b)} style={styles.addComment}>
                            <Text style={styles.addCommentText}>Add Comment</Text>
                    </TouchableOpacity> 

                    <View style={styles.dropDownPickerContainer}>
                    <DropDownPicker open={open} value={sort} items={items} listMode="SCROLLVIEW"
                            style={styles.pickerContainer}
                            setOpen={setOpen} onSelectItem={(v) => setSort(v.value)} setItems={setItems}/>
                    </View>
                </View> 

                { addingComment && <>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="What are your thoughts?" style={styles.input} value={commentText} multiline
                            onChangeText={(v) => setCommentText(v)} />
                    </View>
                    <View style={{paddingVertical: 12}}>
                        <TouchableOpacity activeOpacity={0.6} onPress={postComment} style={styles.postComment}>
                                <Text style={styles.postCommentText}>Post Comment</Text>
                        </TouchableOpacity> 
                    </View>
                </>}

                {/* Comments: */} 
                <View style={styles.commentsList}>
                { allComments.map((commentDetails) => <Comment commentDetails={commentDetails} navigation={navigation} key={commentDetails.id} />)}
                </View>



            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(ForumPost);