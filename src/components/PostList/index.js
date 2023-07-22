import React, { useContext } from "react";
import { Text, View, FlatList, Image, Pressable, TouchableOpacity } from "react-native";
import { styles } from './styles';
import { colors } from "../../utils/colors";

import { Icon } from '@rneui/themed';
import { ThemeContext } from "../../context/ThemeContext";
import themeColors from "../../utils/themeColors";


const PostList = ({posts, navigation, onRefresh, refreshing, mapList}) => {

    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode];
    
    const renderPosts = ({item}) => {
        // console.log(postDetails);
        // fields: body, category, comments, createdAt, id, title, uid, url, votes, upvoters, downvoters
        
        const goPost = () => {
            navigation.navigate('ForumPost', {post: item});
        };
        
        let categoryColor = {};
        if (item.category == 'Lifestyle') {
            categoryColor = {backgroundColor: '#FF8000'}
        } else if (item.category == 'MoneySavingDeals') {
            categoryColor = {backgroundColor: '#668CFF'}
        } else if (item.category == 'BudgetingTips') {
            categoryColor = {backgroundColor: '#80b3ff'}
        } else if (item.category == 'SavingsStrategies') {
            categoryColor = {backgroundColor: '#ff80aa'}
        } else if (item.category == 'PersonalFinanceEducation') {
            categoryColor = {backgroundColor: '#8cd98c'}
        } else if (item.category == 'Q&AandHelp') {
            categoryColor = {backgroundColor: '#c2c2a3'}
        }

        return (

            <Pressable key={item.id} style={[styles.mainContainer, {backgroundColor: activeColors.inputBackground}]} onPress={goPost}>

                {/* Category and Date Time */}
                <View style={styles.header}>
                    <View style={[styles.categoryContainer, categoryColor]}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                    </View>
                    <Text style={[styles.time, {color: activeColors.text}]}>{item.createdAt.toDate().toDateString()}</Text>
                </View>

                <Text style={[styles.title, {color: activeColors.text}]} numberOfLines={1} ellipsizeMode="tail" >{item.title}</Text>
                
                {/* Image if there is */}
                {item.url && <View style={styles.imageContainer}>
                    <Image source={{uri: item.url}} style={styles.postImage}/>
                </View> }

                <Text style={[styles.body, {color: activeColors.secondaryText}]} numberOfLines={3} ellipsizeMode="tail" >{item.body}</Text>


                {/* Votes and Comments */}
                <View style={styles.footer}>
                    <View> 
                        <Icon name='chevron-up' size={18} type='font-awesome' color={activeColors.voteContainer}/> 
                    </View>
                    <Text style={[styles.votes, {color: activeColors.text}]}>{item.votes}</Text>

                    <View style={{width: '15%'}} />
                    <Text style={[styles.commentNum, {color: activeColors.text}]}>{item.comments}</Text>
                    <Icon name='comment-alt' size={18} type='font-awesome-5' color={activeColors.iconColor}/> 

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

