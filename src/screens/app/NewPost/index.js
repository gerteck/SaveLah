import React, { useState } from "react";
import { ScrollView, TextInput, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import Button from "../../../components/Button";

import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { useUploadImage } from "../../../hooks/useUploadImage";
import { useFirestore } from "../../../hooks/useFirestore";
import { useAuthContext } from "../../../hooks/useAuthContext";


const NewPost = ( { navigation } ) => {
    
    const onBack = () => {
        navigation.goBack();
    };
    
    const [post, setPost] = useState({});
    // Adds to post object given a key and value
    // post Fields: title, body, category, url
    const onChange = (key, value) => {
        setPost(v => ({...v, [key]: value}))
    } 
    
    //console.log(post);

    //Drop Down Picker:
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([{label: 'Money Saving Tips', value: 'MoneySavingTips'}, {label: 'Life', value: 'Life'}]);

    //Image Picker:
    const [imageURI, setImageURI] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          //aspect: [1, 1],
          quality: 0.2,
        });

        //console.log(result.assets[0].uri);

        if (result.assets) {
            setImageURI(result.assets[0].uri);
        }
    }
    const deleteImage = () => {
        setImageURI(null);
        onChange('url', null);
    }
    const uploadImage = async () => {
        const uploadedURL = await useUploadImage(imageURI);
        onChange('url', uploadedURL);
        //console.log(post.url);
    }

    //FireStore Linking:
    const { user } = useAuthContext();
    const { addDocument, response } = useFirestore('posts');
    const onSend = async () => {
        if (imageURI) {
            await uploadImage();
        }

        try {
            if (!post?.title || !post?.body || !post?.category) {
                Alert.alert('Please fill up all fields!');
                return;
            }

            addDocument({
                uid: user.uid,
                title: post.title,
                body: post.body,
                category: post.category,
                url: post.url,
            });

            console.log("Uploaded Post");

        } catch (error) {
            console.log('error adding transaction :>> ', error);
        }
    }



    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader style={styles.appHeader} title={"Create Post"} showCross onBack={onBack}/>
            <ScrollView style={styles.container}> 

            <Text style={styles.label}>Title</Text>
            <View style={styles.inputContainer}>
                <TextInput placeholder="Title" style={styles.input} value={post.title} 
                    onChangeText={(v) => onChange('title', v)} />
            </View>

            <Text style={styles.label}>Body Text</Text>
            <View style={[styles.inputContainer, styles.bodyInputContainer]}>
                <TextInput placeholder="Type away..." style={styles.input} value={post.body} multiline
                    onChangeText={(v) => onChange('body', v)} />
            </View>

            <Text style={styles.label}>Category</Text>
            <DropDownPicker open={open} value={post.category} items={items} listMode="SCROLLVIEW"
                placeholder="Select a Category" style={styles.pickerContainer}
                setOpen={setOpen} onSelectItem={(v) => onChange('category', v.value)} setItems={setItems}
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
                        <Image style={styles.deleteIcon} source={require('../../../assets/icons/delete.png')}/>
                    </TouchableOpacity>
                :   <TouchableOpacity activeOpacity={0.6} onPress={pickImage} style={styles.addImage}>
                        <Text style={styles.addImageText}>Add Image</Text>
                        <Image style={styles.deleteIcon} source={require('../../../assets/icons/addImage.png')}/>
                    </TouchableOpacity> 
                }

                {/* Post Button */}
                <TouchableOpacity activeOpacity={0.6} onPress={onSend} style={styles.post}>
                        <Text style={styles.deleteImageText}>Upload Post</Text>
                </TouchableOpacity> 

            </View>

            {/* // Preview of post */}
            {/* <Text style={styles.label}>Developer Mode: Preview of post</Text>
            <Text>{post.title}</Text>
            <Text>{post.body}</Text>
            <Text>{post.category}</Text>
            <Text>{post.url}</Text> */}

            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(NewPost);