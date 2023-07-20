import React, { useEffect, useState, useContext } from "react";
import {Text, View, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils/colors";

import AppHeader from "../../../components/AppHeader";
import PostList from "../../../components/PostList";
import { useCollection } from "../../../hooks/useCollection";
import { useIsFocused } from "@react-navigation/core";
import { collection, getDocs, getFirestore, limit, query } from "firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";
import { getApp } from "firebase/app";

import { Icon } from '@rneui/themed';
import { ThemeContext } from "../../../context/ThemeContext";
import themeColors from "../../../utils/themeColors";

const app = getApp;
const db = getFirestore(app);

const ForumHome = ({ navigation, routes }) => {
    
    //navigations
    const onChat = () => {
        navigation.navigate('ForumAllChats');
    }
    const onBell = () => {
        navigation.navigate('Notifications');
    }
    const onNewPost = () => {
        navigation.navigate('NewPost');
    }

    //Reset the search bar
    const isFocused = useIsFocused();
    useEffect(() => {
        setKeyword("");
        getPosts();
    },[isFocused]);    

    const [allPosts, setallPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getPosts = () => {
        setRefreshing(true);
        const sortByDate = (a, b) => {
            return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        const sortByVotes = (a, b) => {
            return b.votes - a.votes;
        }
        const downloadPosts = async () => {
            const postsRef = collection(db, "posts");
            const querySnapshot = await getDocs(postsRef);
            const postArray = [];
            querySnapshot.forEach((doc) => { 
                postArray.push(doc.data());
            });
            if (sort == 'recent') {
                postArray.sort(sortByDate);
            }
            if (sort == 'mostUpvote') {
                postArray.sort(sortByVotes);
            }
            setallPosts(postArray);
        }
        downloadPosts();
        setRefreshing(false);
    }

    const [keyword, setKeyword] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect( () => {
        if (!keyword) {
            setFilteredPosts([]);
        } else if (keyword) {
            const updatedPosts = allPosts.filter((post) => 
                post?.title.toLowerCase().includes(keyword?.toLowerCase()));
            setFilteredPosts(updatedPosts);
        }
    }, [keyword]);

    //Drop Down Picker for Comments:
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([{label: 'Recent', value: 'recent'}, {label: 'Most upvoted', value: 'mostUpvote'}]);
    const [sort, setSort] = useState('recent');

    // Sort Posts
    useEffect(()=>{
        sortPosts();
    }, [sort])

    const sortPosts = () => {
        // console.log("All Posts", allPosts);
        const sortByDate = (a, b) => {
            return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        const sortByVotes = (a, b) => {
            return b.votes - a.votes;
        }
        if (sort == 'recent') {
            const sortedAllPosts = [... allPosts].sort(sortByDate);
            setallPosts(sortedAllPosts);
        }
        if (sort == 'mostUpvote') {
            const sortedAllPosts = [... allPosts].sort(sortByVotes);
            setallPosts(sortedAllPosts);
        }
    }

    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode];
    let themeMode = theme.mode == "dark" ? "DARK" : "LIGHT";

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Forum" showChat showBell onBell={onBell} onChat={onChat}/>

            {/* Search Bar */}
            <View style={[styles.inputContainer, { backgroundColor: activeColors.containerBackground}]}>
                <TextInput placeholder="Search post by title..." 
                    style={[styles.input, { backgroundColor: activeColors.containerBackground, color: activeColors.text}]}
                    placeholderTextColor={activeColors.text}
                    value={keyword} onChangeText={setKeyword} />
                <Icon name='search' size={18} style={styles.searchIcon} type='font-awesome' color={activeColors.iconColor}/> 
            </View>
            
            {/* SortBar */}
            <View style={styles.sortContainer}>
                { sort == 'recent' 
                    ? <Icon name='history' style={styles.sortIcon} type='font-awesome' color={activeColors.iconColor}/> 
                    : <Icon name='users' style={styles.sortIcon} type='font-awesome' color={activeColors.iconColor}/> 
                }
                <View style={styles.dropDownPickerContainer}>
                    <DropDownPicker open={open} value={sort} items={items} listMode="SCROLLVIEW"
                            style={[styles.pickerContainer, {backgroundColor: activeColors.appBackground}]}
                            theme={themeMode}
                            setOpen={setOpen} onSelectItem={(v) => setSort(v.value)} setItems={setItems}/>
                </View>
            </View>

            {filteredPosts.length == 0 && <PostList onRefresh={getPosts} refreshing={refreshing} posts={allPosts} navigation={navigation} />}
            {filteredPosts.length > 0 && <PostList posts={filteredPosts} navigation={navigation} />}

            <TouchableOpacity style={[styles.newPost, {backgroundColor: activeColors.containerBackground}]} onPress={onNewPost}>
                <Icon name='edit' size={28} type='font-awesome' color={activeColors.iconColor}/> 
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default React.memo(ForumHome);