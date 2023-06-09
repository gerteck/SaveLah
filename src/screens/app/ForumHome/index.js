import React, { useEffect, useState } from "react";
import {Text, View, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils/colors";

import AppHeader from "../../../components/AppHeader";
import PostList from "../../../components/PostList";
import { useCollection } from "../../../hooks/useCollection";

const PostData = [
    {id: '1'}, {id: '2'}, {id: '3'}, 
    {id: '4'}, {id: '5'}, {id: '6'}, 
]

const ForumHome = ({ navigation }) => {
    
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

    //Reset the search bar?
    // useEffect(() => {
    //     onChange('search', "");
    // }, []);

    // Adds to the value object
    const [values, setValues] = useState({});
    const onChange = (key, value) => {
        setValues(v => ({...v, [key]: value}))
    } 

    const SearchBar = () => {
        return (
            <View style={styles.inputContainer}>
                <TextInput placeholder="Search post by title..." style={styles.input}
                    value={values.search} onChangeText={(v) => onChange('search', v)} />
                <Image style={styles.searchIcon} source={require('../../../assets/icons/search.png')}/>
            </View>
        )
    }

    const SortBar = () => {
        return (
            <View style={styles.sortContainer}>
                <Image style={styles.sortIcon} source={require('../../../assets/icons/team.png')}/>
                <Text style={{fontWeight: 500}}> New Posts </Text>
            </View>
        )
    }

    const { documents, error } = useCollection(
        'posts'
    );

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Forum" showChat showBell onBell={onBell} onChat={onChat}/>
            {SearchBar()}
            {SortBar()}

            {error && <Text>{error}</Text>}
            {documents && <PostList posts={documents} />}


            <TouchableOpacity style={styles.newPost} onPress={onNewPost}>
                <Image style={styles.postIcon} source={require('../../../assets/icons/post.png')}/>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default React.memo(ForumHome);