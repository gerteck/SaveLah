import React from "react";
import { Text, View, FlatList, Image, Pressable, Touchable } from "react-native";
import { styles } from './styles';
import { useState } from "react";
import { colors } from "../../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const PostList = ({posts, navigation}) => {


    const renderPosts = ({item}) => {
        //console.log(item);
        // fields: body, category, comments, createdAt, id, title, uid, url, votes

        const goPost = () => {
            navigation.navigate('ForumPost', {post: item});
        };

        // const onMessageUser = (otherProfile) => {
        //     navigation.navigate('ForumChat', {profile: otherProfile});
        // };

        return (

            <Pressable style={styles.mainContainer} onPress={goPost}>

                {/* Category and Date Time */}
                <View style={styles.header}>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                    </View>
                    <Text style={styles.time}>{item.createdAt.toDate().toDateString()}</Text>
                </View>

                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail" >{item.title}</Text>
                <Text style={styles.body} numberOfLines={3} ellipsizeMode="tail" >{item.body}</Text>


                {/* Votes and Comments */}
                <View style={styles.footer}>
                    <Image source={require('../../assets/appIcons/up.png')} style={styles.arrowIcon}/>
                    <Text style={styles.votes}>{item.votes}</Text>
                    <Image source={require('../../assets/appIcons/down.png')} style={styles.arrowIcon}/>


                    <View style={{width: '15%'}} />
                    <Text style={styles.commentNum}>0</Text>
                    <Image source={require('../../assets/appIcons/comments.png')} style={styles.arrowIcon}/>

                </View>
            

            </Pressable>

        )
    }

    return (
        <FlatList contentContainerStyle={styles.flatList} data={posts} 
            showsVerticalScrollIndicator={false}
            keyExtractor={ item => item.id } 
            renderItem={renderPosts}/>
    )
}

export default React.memo(PostList);

