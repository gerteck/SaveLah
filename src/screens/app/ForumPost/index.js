import React, { useContext, useEffect, useState } from "react";
import {Text, View, Image, TouchableOpacityBase, Alert, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import DropDownPicker from 'react-native-dropdown-picker';

import { getApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, onSnapshot, QuerySnapshot, query, deleteDoc } from "firebase/firestore";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useFirestore } from "../../../hooks/useFirestore";
import { UserProfileContext } from "../../../context/UserProfileContext";
import Comment from "../../../components/Comment";

import { Icon } from '@rneui/themed';
import { ThemeContext } from "../../../context/ThemeContext";
import themeColors from "../../../utils/themeColors";
import ImageModal from "react-native-image-modal";


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
    const [allComments, setAllComments] = useState([]);
    const [addingComment, setAddingComment] = useState(false);
    const [commentText, setCommentText] = useState(""); 
    const [postVote, setPostVote] = useState(NOVOTE);
    const userIsAuthor = route.params?.post.uid == userProfile.uid;

    const postRef = doc(db, "posts", postDetails?.id);
    const commentRef = doc(db, "comments", postDetails?.id);
    const [postUnsub, setPostUnsub] = useState(() => () => {console.log("Default")});
    const [commentUnsub, setCommentUnsub] = useState(() => () => {console.log("Default")});

    //Drop Down Picker for Comments:
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([{label: 'Recent', value: 'recent'}, {label: 'Most upvoted', value: 'mostUpvote'}]);
    const [sort, setSort] = useState('recent');
    
    // Sort Posts
    useEffect(()=>{
        sortComments();
    }, [sort])
    
    // Set up Listener for Post
    useEffect(() => {
        const unsubPost = onSnapshot(postRef, (doc) => {
            setPostDetails(doc.data());
        });
        setPostUnsub(() => unsubPost);
        if (postDetails.upvoters.includes(userProfile.uid)) {
            setPostVote(UPVOTE);
        }
        if (postDetails.downvoters.includes(userProfile.uid)) {
            if (postVote == UPVOTE) {throw new Error("upvote & downvote at same time")}
            setPostVote(DOWNVOTE);
        }
    }, [route]);

    // Set up Listener for Comments
    // Bug is caused by variable capture of sort as 'recent'... (Stale values..)
    const getAllComments = () => { 
        const commentCollectionRef = collection(db, 'comments/' + postDetails?.id + '/comments');
        const unSubComments = onSnapshot(commentCollectionRef, (querySnapshot) => {
            const sortByDate = (a, b) => {
                return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
            }
            const sortByVotes = (a, b) => {
                return b.votes - a.votes;
            }
            const comments = [];
            querySnapshot.forEach((doc) => {
                comments.push(doc.data());
            })
            if (sort == 'recent') {
                comments.sort(sortByDate);
            }
            if (sort == 'mostUpvote') {
                comments.sort(sortByVotes);
            }
            setSort(sort); // As evidenced here sort becomes recent
            setAllComments(comments);
        })
        setCommentUnsub(() => unSubComments);
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

    const collectionRoute = 'comments/' + postDetails?.id + '/comments';
    const { addDocument, response } = useFirestore(collectionRoute);

    const postComment = () => {
        let commentId;
        if (!commentText) { 
            ToastAndroid.showWithGravity('Comment can\'t be empty!', ToastAndroid.LONG, ToastAndroid.BOTTOM);
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

            // Update with comment Id
            await setDoc(doc(db, collectionRoute, comment.id), {
                id: comment.id,
            }, { merge: true });

            // Send Notification:
            if (posterProfile.uid != userProfile?.uid) {
                message = "@" + userProfile?.username.replace(/\s/g, "") + " commented on your post!";
                await setDoc( doc(db, 'notifications', posterProfile.uid, 'notifications', comment.id), {
                    details: message,
                    isRead: false,
                    notificationType: "comment",
                    id: comment.id,
                    postId: postDetails.id,
                    uid: userProfile.uid,
                    createdAt: new Date(),
                });
            }
        }
        const increaseCommentCount = async () => {
            await setDoc( doc(db, 'posts', postDetails.id), {
                comments: postDetails.comments + 1,
            }, { merge: true });
        }
        uploadComment(); 
        increaseCommentCount();
        setAddingComment(false);
        setCommentText("");
    }
    
    const onBack = () => {
        postUnsub();
        commentUnsub();
        navigation.goBack();
    }

    const onUserPress = () => {
        postUnsub();
        commentUnsub();
        navigation.navigate('ProfileOtherUser', { item: posterProfile });
    };

    // Post Voting
    const onVote = (num) => {
        const downvoteArray = postDetails.downvoters;
        const upvoteArray = postDetails.upvoters;

        if (num == UPVOTE) {
            if (postVote == DOWNVOTE) {
                removeItemAll(downvoteArray, userProfile.uid);
            }
            upvoteArray.push(userProfile.uid);
            setPostVote(UPVOTE);
        }
        if (num == DOWNVOTE) {
            if (postVote == UPVOTE) {
                removeItemAll(upvoteArray, userProfile.uid);
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

    const onDeletePost = () => {
        Alert.alert('', 'Delete this post?', [
            {
                text: 'NO',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'YES',
                onPress: () => onConfirmDeletePost(),
            }
        ], { cancelable: true });
    }

    const onConfirmDeletePost = async () => {
        try {
            postUnsub();
            commentUnsub();
            deleteAllComments();
            await deleteDoc(commentRef);
            await deleteDoc(postRef);
            console.log('Post deleted');
            navigation.goBack();
            deleteAllComments();
        } catch (error) {
            console.log('error deleting Post :>> ', error);
        }
    }    
    
    const deleteAllComments = () => { 
        allComments.forEach((comment) => {
            // delete comments
            const docRef = doc(db, "comments", postDetails.id, "comments", comment.id);
            deleteDoc(docRef);
            // delete notifications
            deleteDoc(doc(db, 'notifications', postDetails.uid, 'notifications', comment.id));
        })
    }

    const sortComments = () => {
        const sortByDate = (a, b) => {
            return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        const sortByVotes = (a, b) => {
            return b.votes - a.votes;
        }
        if (sort == 'recent') {
            const sortedAllPosts = [... allComments].sort(sortByDate);
            setAllComments(sortedAllPosts);
        }
        if (sort == 'mostUpvote') {
            const sortedAllPosts = [... allComments].sort(sortByVotes);
            setAllComments(sortedAllPosts);
        }
    }
   
    const posterURL = posterProfile?.url;
    const headerTitle = posterProfile.username ? "Posted by " + posterProfile.username : "Posted by Anonymous";

    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode];
    let themeMode = theme.mode == "dark" ? "DARK" : "LIGHT";

    let categoryColor = {};
    if (postDetails.category == 'Lifestyle') {
        categoryColor = {backgroundColor: '#FF8000'}
    } else if (postDetails.category == 'MoneySavingDeals') {
        categoryColor = {backgroundColor: '#668CFF'}
    } else if (postDetails.category == 'BudgetingTips') {
        categoryColor = {backgroundColor: '#80b3ff'}
    } else if (postDetails.category == 'SavingsStrategies') {
        categoryColor = {backgroundColor: '#ff80aa'}
    } else if (postDetails.category == 'PersonalFinanceEducation') {
        categoryColor = {backgroundColor: '#8cd98c'}
    } else if (postDetails.category == 'Q&AandHelp') {
        categoryColor = {backgroundColor: '#c2c2a3'}
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
        <ScrollView>
            <AppHeader showBack onBack={onBack} style={[styles.appHeader, {backgroundColor: activeColors.containerBackground}]}  
                userPictureURL={posterURL} title={headerTitle} onUserPicture={onUserPress}/>
            <View style={[styles.mainView, {backgroundColor: activeColors.inputBackground}]}>
                
                <View style={[styles.postContainer, {backgroundColor: activeColors.containerBackground}]}>
                    
                    {/* Category and Date Time */}
                    <View style={styles.header}>
                        <View style={[styles.categoryContainer, categoryColor]}>
                            <Text style={styles.categoryText}>{postDetails.category}</Text>
                        </View>
                        <Text style={[styles.time, {color: activeColors.text}]}>{postDetails.createdAt.toDate().toDateString()}</Text>
                    </View>

                    <Text style={[styles.title, {color: activeColors.text}]} >{postDetails.title}</Text>

                    {postDetails?.url && 
                        <ImageModal
                        resizeMode="contain"
                        imageBackgroundColor={activeColors.containerBackground}
                        style={styles.modalImage}
                        source={{uri: postDetails.url,}}
                        />
                    }

                    <Text style={[styles.body, {color: activeColors.secondaryText}]} >{postDetails.body}</Text>

                    {/* Votes and Comments */}
                    <View style={styles.footer}>
                        <View style={styles.voteContainer}>
                            <TouchableOpacity disabled={postVote == UPVOTE} onPress={() => onVote(UPVOTE)}>
                                { postVote == UPVOTE
                                    ? <Icon name='chevron-up' size={20} type='font-awesome' color={activeColors.blue}/>
                                    : <Icon name='chevron-up' size={20} type='font-awesome' color={activeColors.voteContainer}/>
                                }

                            </TouchableOpacity>
                            <Text style={[styles.votes, {color: activeColors.text}]}>{postDetails.votes}</Text>
                            <TouchableOpacity disabled={postVote == DOWNVOTE}  onPress={() => onVote(DOWNVOTE)}>
                                { postVote == DOWNVOTE
                                    ? <Icon name='chevron-down' size={20} type='font-awesome' color={activeColors.red}/>
                                    : <Icon name='chevron-down' size={20} type='font-awesome' color={activeColors.voteContainer}/>
                                }
                                {/* <Image source={postVote == DOWNVOTE ? require('../../../assets/appIcons/downFilled.png') 
                                    : require('../../../assets/appIcons/down.png')} style={styles.arrowIcon}/> */}
                            </TouchableOpacity>
                        </View>
                        {userIsAuthor ? 
                            <TouchableOpacity onPress={onDeletePost}>
                                <Icon name='trash-alt' size={18} type='font-awesome-5' color={activeColors.red}/>
                                {/* <Image source={require('../../../assets/icons/redDelete.png')} style={styles.deleteImage}/> */}
                            </TouchableOpacity>
                        : 
                            <View></View>
                        }
                    </View>
                </View>
                
                <View style={styles.addCommentRow}>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => setAddingComment(b => !b)} style={styles.addComment}>
                            {!addingComment && <Text style={styles.addCommentText}>Add Comment</Text>}
                            {addingComment && <Text style={styles.addCommentText}>Close Comment</Text>}
                    </TouchableOpacity> 

                    <View style={styles.dropDownPickerContainer}>
                    <DropDownPicker open={open} value={sort} items={items} listMode="SCROLLVIEW"
                            style={[styles.pickerContainer, {backgroundColor: activeColors.containerBackground}]}
                            theme={themeMode}
                            setOpen={setOpen} onSelectItem={(v) => setSort(v.value)} setItems={setItems}/>
                    </View>
                </View> 

                { addingComment && <>
                    <TextInput placeholder="What are your thoughts?" 
                        style={[styles.input, {color: activeColors.text,
                            backgroundColor: activeColors.inputBackground, 
                            borderColor: activeColors.inputBorder}]} 
                        value={commentText} multiline
                        placeholderTextColor={activeColors.text}
                        onChangeText={(v) => setCommentText(v)} />
                    <View style={{paddingVertical: 12}}>
                        <TouchableOpacity activeOpacity={0.6} onPress={postComment} 
                            style={[styles.postComment, {backgroundColor: activeColors.secondaryContainerBackground} ]}>
                                <Text style={[styles.postCommentText, {color: activeColors.text}]}>Post Comment</Text>
                        </TouchableOpacity> 
                    </View>
                </>}

                {/* Comments: */} 
                <View style={styles.commentsList}>
                { allComments.map((commentDetails) => <Comment postDetails={postDetails} commentDetails={commentDetails} navigation={navigation} key={commentDetails.id} />)}
                </View>



            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(ForumPost);