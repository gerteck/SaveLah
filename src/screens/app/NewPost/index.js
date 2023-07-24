import React, { useContext, useState } from "react";
import { ScrollView, TextInput, Text, View, Image, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { useUploadPostImage } from "../../../hooks/useUploadImage";
import { useFirestore } from "../../../hooks/useFirestore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { doc, getFirestore, setDoc } from "@firebase/firestore";
import { getApp } from "@firebase/app";

import { Icon } from '@rneui/themed';
import { ThemeContext } from "../../../context/ThemeContext";
import themeColors from "../../../utils/themeColors";
import { ToastAndroid } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const app = getApp;
const db = getFirestore(app);


const NewPost = ( { navigation } ) => {
    
    const onBack = () => {
        navigation.goBack();
    };
    
    const [post, setPost] = useState({});
    // Adds to post object given a key and value
    // post Fields: title, body, category, url, comments, votes
    const onChange = (key, value) => {
        setPost(v => ({...v, [key]: value}))
    } 

    // Loading spinner
    const [loading, setLoading] = useState(false);

    //Drop Down Picker:
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([ 
                                        {label: 'Budgeting Tips', value: 'BudgetingTips'},
                                        {label: 'Money Saving Deals', value: 'MoneySavingDeals'}, 
                                        {label: 'Savings Strategies', value: 'SavingsStrategies'}, 
                                        {label: 'Personal Finance Education', value: 'PersonalFinanceEducation'},
                                        {label: 'Q&A and Help', value: 'Q&AandHelp'},
                                        {label: 'Lifestyle', value: 'Lifestyle'},
                                    ]);

    //Image Picker:
    const [imageURI, setImageURI] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library (Android)
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          //aspect: [1, 1],
          quality: 0.2,
        });

        if (result.assets) {
            setImageURI(result.assets[0].uri);
        }
    }
    const deleteImage = () => {
        setImageURI(null);
    }

    const uploadImage = async (postId) => {
        const uploadedURL = await useUploadPostImage(postId, imageURI); 
        return uploadedURL;
    }

    //FireStore Linking:
    const { user } = useAuthContext();
    const { addDocument, response } = useFirestore('posts');

    const onSend = async () => {
        try {
            if (!post?.title || !post?.body || !post?.category) {
                ToastAndroid.showWithGravity('Please fill up all fields!', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                return;
            } 

            setLoading(true);
            setTimeout(() => {
                if (loading) {
                    ToastAndroid.showWithGravity('Something went wrong', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                    setLoading(false);
                    return;
                }     
            }, 1000);

            const postDoc = await addDocument({
                uid: user.uid,
                title: post.title,
                body: post.body,
                category: post.category,
                upvoters: [],
                downvoters: [],
                comments: 0,
                votes: 0,
            }); 
            
            let url = "";
            if (imageURI) {
                url = await uploadImage(postDoc.id);
            }   

            await setDoc(doc(db, 'posts', postDoc.id), {
                id: postDoc.id,
                url: url,
            }, { merge: true }).then(() => { setLoading(false) });
            
            console.log("Uploaded Post");
            
            navigation.goBack();

        } catch (error) {
            console.log('error adding post :>> ', error);
        }
    }

    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode]; 
    let themeMode = theme.mode == "dark" ? "DARK" : "LIGHT";

    return (
        <SafeAreaView style={styles.mainContainer}>

            <Spinner visible={loading}
                textContent={'Posting...'}
                textStyle={{ color: activeColors.loadingText }} overlayColor={activeColors.loadingOverlay}/>

            <AppHeader style={[styles.appHeader, {backgroundColor: activeColors.containerBackground}]}
                title={"Create Post"} showCross onBack={onBack}/>
            <ScrollView style={styles.container} nestedScrollEnabled={true}> 

            <Text style={[styles.label, {color: activeColors.blue}]}>Category</Text>
            <DropDownPicker open={open} value={post.category} items={items} 
                listMode='SCROLLVIEW'
                dropDownContainerStyle={{
                        position: 'absolute', // to fix scroll issue can put relative but it pushes stuff down.
                        maxHeight: 500,
                        // top: 0, //to fix gap between label box and container
                    }}
                scrollEnabled={true}
                style={[styles.pickerContainer, {backgroundColor: activeColors.containerBackground}]}
                theme={themeMode} zIndex={1000} 
                placeholder="Select a Category"
                setOpen={setOpen} onSelectItem={(v) => onChange('category', v.value)} setItems={setItems}
            />

            <Text style={[styles.label, {color: activeColors.blue}]}>Title</Text>
            <TextInput placeholder="Title" 
                style={[styles.input, {color: activeColors.text,
                    backgroundColor: activeColors.inputBackground, 
                    borderColor: activeColors.inputBorder}]} 
                
                placeholderTextColor={activeColors.text}
                value={post.title} multiline
                onChangeText={(v) => onChange('title', v)} 
            />

            <Text style={[styles.label, {color: activeColors.blue}]}>Body Text</Text>
            <TextInput placeholder="Type away..." 
                style={[styles.input, styles.bodyInputContainer, 
                    {color: activeColors.text,
                    backgroundColor: activeColors.inputBackground, 
                    borderColor: activeColors.inputBorder}]} 
                placeholderTextColor={activeColors.text}
                value={post.body} multiline
                onChangeText={(v) => onChange('body', v)} 
            />

            {imageURI && 
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: imageURI }} style={styles.image} />
                    </View>
            }

            {/* Buttons Row */}
            <View style={styles.buttonsRow}>
                {imageURI ? 
                    <TouchableOpacity activeOpacity={0.6} onPress={deleteImage} style={styles.deleteImage} >
                        <Text style={styles.deleteImageText}>Delete Image</Text>
                        <Icon name='trash-alt' style={styles.deleteIcon} size={20} type='font-awesome-5' color={activeColors.iconColor}/>

                    </TouchableOpacity>
                :   <TouchableOpacity activeOpacity={0.6} onPress={pickImage} 
                        style={[styles.addImage, {backgroundColor: activeColors.containerBackground}]}>

                        <Text style={[styles.addImageText, {color: activeColors.blue}]}>Add Image</Text>
                        <Icon name='image' style={styles.deleteIcon} size={22} type='font-awesome' color={activeColors.iconColor}/>
                        {/* <Image  source={require('../../../assets/icons/addImage.png')}/> */}

                    </TouchableOpacity> 
                }

                {/* Post Button */}
                <TouchableOpacity activeOpacity={0.6} onPress={onSend} style={styles.post}>
                        <Text style={styles.deleteImageText}>Upload Post</Text>
                </TouchableOpacity> 

            </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(NewPost);