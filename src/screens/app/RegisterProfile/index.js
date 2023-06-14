import React, { useState } from "react";
import { ScrollView, TextInput, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";

import * as ImagePicker from 'expo-image-picker';
import { useUploadImage } from "../../../hooks/useUploadImage";
import { useFirestore } from "../../../hooks/useFirestore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Separator from "../../../components/Separator";


const RegisterProfile = ( { navigation } ) => {
    
    const onBack = () => {
        navigation.goBack();
    };
    
    const [post, setPost] = useState({url: ""});
    // Adds to post object given a key and value
    // post Fields: title, body, category, url, comments, votes
    const onChange = (key, value) => {
        setPost(v => ({...v, [key]: value}))
    } 

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
        onChange('url', "");
    }
    const uploadImage = async () => {
        const uploadedURL = await useUploadImage(imageURI);
        onChange('url', uploadedURL);
    }

    //FireStore Linking:
    const { user } = useAuthContext();
    const { addDocument, response } = useFirestore('users/' + user.uid);

    const onRegister = async () => {
        try {
            if (!post?.title || !post?.body || !post?.category) {
                Alert.alert('Please fill up all fields!');
                return;
            }

            if (imageURI) {
                await uploadImage();
            }    

            await addDocument({
                uid: user.uid,
                title: post.title,
                body: post.body,
                category: post.category,
                url: post.url,

                comments: 0,
                votes: 0,

            });
            // console.log("Uploaded Post");
            // console.log(response);

        } catch (error) {
            console.log('error adding transaction :>> ', error);
        }
    }



    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader style={styles.appHeader} title={"Register Profile"} showCross onBack={onBack}/>
            <ScrollView style={styles.container}> 

                <Text style={styles.label}>Username</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="choose a username!" style={styles.input} value={post.title} 
                        onChangeText={(v) => onChange('username', v)} />
                </View>

                <Text style={styles.label}>Add a bio!</Text>
                <View style={[styles.inputContainer, styles.bodyInputContainer]}>
                    <TextInput placeholder="I love Savelah!" style={styles.input} value={post.body} multiline
                        onChangeText={(v) => onChange('bio', v)} />
                </View>

                {/* Add the picture row here */}
                { !imageURI ?
                    <>
                        <Separator style={styles.separator} title="Choose a starter profile picture" />
                        <View style={styles.starterPicturesRow}>
                            <Image style={styles.displayPictures} source={require("../../../assets/DummyProfile.jpg")}/>
                            <Image style={styles.displayPictures} source={require("../../../assets/DummyProfile.jpg")}/>
                            <Image style={styles.displayPictures} source={require("../../../assets/DummyProfile.jpg")}/>
                        </View>
                    </>

                    : null
                }

                {imageURI && 
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: imageURI }} style={styles.image} />
                        </View>
                }
                
                {imageURI ? 
                    <View>
                        <TouchableOpacity activeOpacity={0.6} onPress={deleteImage} style={styles.deleteImage} >
                            <Text style={styles.deleteImageText}>Delete Image</Text>
                            <Image style={styles.deleteIcon} source={require('../../../assets/icons/delete.png')}/>
                        </TouchableOpacity>
                    </View>
                :   <View> 
                        <Text style={styles.label}>Or Add your own Profile Picture</Text>
                        <TouchableOpacity activeOpacity={0.6} onPress={pickImage} style={styles.addImage}>
                            <Text style={styles.addImageText}>Add Image</Text>
                            <Image style={styles.deleteIcon} source={require('../../../assets/icons/addImage.png')}/>
                        </TouchableOpacity> 
                    </View>
                }

                <TouchableOpacity activeOpacity={0.6} onPress={onRegister} style={styles.register}>
                        <Text style={styles.deleteImageText}>Register</Text>
                </TouchableOpacity> 

            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(RegisterProfile);