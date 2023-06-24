import React from "react";
import { Text, View, FlatList, Image, Pressable, TouchableOpacity } from "react-native";
import { styles } from './styles';
import { colors } from "../../utils/colors";

const PostList = ({posts, navigation, onRefresh, refreshing, mapList}) => {


    const renderPosts = ({item}) => {
        // console.log(postDetails);
        // fields: body, category, comments, createdAt, id, title, uid, url, votes, upvoters, downvoters
        
        const goPost = () => {
            navigation.navigate('ForumPost', {post: item});
        };

        return (

            <Pressable key={item.id} style={styles.mainContainer} onPress={goPost}>

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
                    <View>
                        <Image source={require('../../assets/appIcons/up.png')} style={styles.arrowIcon}/>
                    </View>
                    <Text style={styles.votes}>{item.votes}</Text>
                    {/* <TouchableOpacity onPress={() => {}}>
                        <Image source={require('../../assets/appIcons/down.png')} style={styles.arrowIcon}/>
                    </TouchableOpacity> */}


                    <View style={{width: '15%'}} />
                    <Text style={styles.commentNum}>{item.comments}</Text>
                    <Image source={require('../../assets/appIcons/comments.png')} style={styles.arrowIcon}/>

                </View>
            

            </Pressable>

        )
    }

    if (mapList) {
        return posts.map((item) => renderPosts({item}));
        // { allComments.map((commentDetails) => <Comment commentDetails={commentDetails} navigation={navigation} key={commentDetails.id} />)}
    }

    return (
        <FlatList contentContainerStyle={styles.flatList} data={posts} 
            showsVerticalScrollIndicator={false}
            keyExtractor={ item => item.id } 
            renderItem={renderPosts}
            onRefresh={onRefresh} refreshing={refreshing}/>
    )
}

export default React.memo(PostList);

