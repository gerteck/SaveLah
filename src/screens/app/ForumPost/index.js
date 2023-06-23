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

const ForumPost = ( {navigation, route} ) => {

    const postDetails = route.params?.post;
    // fields: body, category, comments, createdAt, id, title, uid, url, votes
    // console.log(postDetails);

    const posterUid = postDetails.uid; 
    const [userProfile, setUserProfile] = useContext(UserProfileContext);
    const [posterProfile, setPosterProfile] = useState({}); 
    const [allComments, setAllComments] = useState([]);
    const [addingComment, setAddingComment] = useState(false);
    const [commentText, setCommentText] = useState(""); 

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
            }); 
            await setDoc(doc(db, collectionRoute, comment.id), {
                id: comment.id,
            }, { merge: true });
        }
        uploadComment(); 
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
        getAllComments();
    }, [route]);

    //Drop Down Picker for Comments:
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([{label: 'Recent', value: 'recent'}, {label: 'Most upvoted', value: 'mostUpvote'}]);
    const [sort, setSort] = useState('recent');

    const onBack = () => {
        navigation.goBack();
    }

    const posterURL = posterProfile?.url;
    const title = posterProfile.username ? "Posted by " + posterProfile.username : "Posted by Anonymous";

    
    return (
        <SafeAreaView style={styles.safeContainer}>
        <ScrollView>
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
                { allComments.map((commentDetails) => <Comment commentDetails={commentDetails} navigation={navigation} />)}
                </View>



            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(ForumPost);