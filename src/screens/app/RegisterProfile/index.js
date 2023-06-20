import React, { useEffect, useState, useContext } from "react";
import { ScrollView, TextInput, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";

import * as ImagePicker from 'expo-image-picker';
import { useUploadImage } from "../../../hooks/useUploadImage";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Separator from "../../../components/Separator";

import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import { UserProfileContext } from "../../../context/UserProfileContext";
const app = getApp;
const db = getFirestore(app);
let customImageUploaded = false;

const RegisterProfile = ( { navigation } ) => {

    const [ userProfile, setUserProfile ] = useContext(UserProfileContext);
    useEffect(() => {
        setUserProfile(v => ({...v, ["registered"]: false}))
    }, []);
   
    //Get Array of Default Profile Pictures
    const [defaultProfilePictures, setDefaultProfilePictures] = useState({});
    const getDefaultDisplayPictures = async () => {
        const ref = doc(db, "assets", "defaultProfilePictures");
        const docSnap = await getDoc(ref);
        return docSnap.data();
    }
    useEffect(() => {
        getDefaultDisplayPictures().then(data => {
            const allPictures = Object.values(data);
            const shuffled = [...allPictures].sort(() => 0.5 - Math.random());
            setDefaultProfilePictures(shuffled.slice(0,3));
        })
    }, []);
    
    const [profile, setProfile] = useState({url: "", bio: ""});
    const onChange = (key, value) => {
        setProfile(v => ({...v, [key]: value}))
    } 

    //Image Picker:
    const [imageURI, setImageURI] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library (Android)
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.2,
        });
        if (result.assets) {
            setImageURI(result.assets[0].uri);
            customImageUploaded = true;
        }
    }
    const deleteImage = () => {
        setImageURI(null);
        onChange('url', "");
        customImageUploaded = false;
    }
    const setDefaultPicture = (num) => {
        setImageURI(defaultProfilePictures[num]);
        onChange('url', defaultProfilePictures[num]);
    }
    const uploadImage = async () => {
        const uploadedURL = await useUploadImage(user.uid, imageURI);
        onChange('url', uploadedURL);
        customImageUploaded = false;
    }

    //FireStore Linking:
    const { user } = useAuthContext();

    const onRegister = async () => {
        try {
            if (!profile?.username) {
                Alert.alert('Please choose a username!');
                return;
            }

            if (!imageURI) {
                Alert.alert('Please choose a profile picture!');
                return;
            }
            if (customImageUploaded) {
                await uploadImage();
            }    

            await setDoc( doc(db, 'users', user.uid), {
                username: profile.username,
                bio: profile.bio,
                url: profile.url,
                registered: true,
                following: [],
                followers: [],
            }, { merge: true });
            setUserProfile({registered: true});
            console.log("Uploaded Registration");

        } catch (error) {
            console.log('error Registering Profile', error);
        }
        
    }


    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader style={styles.appHeader} title={"Register Profile"} />
            <ScrollView contentContainerStyle={styles.scrollContainer}> 

                <Text style={styles.label}>Username</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="choose a username!" style={styles.input} value={profile.username} 
                        onChangeText={(v) => onChange('username', v)} />
                </View>

                <Text style={styles.label}>Add a bio!</Text>
                <View style={[styles.inputContainer, styles.bodyInputContainer]}>
                    <TextInput placeholder="I love Savelah!" style={styles.input} value={profile.bio} multiline
                        onChangeText={(v) => onChange('bio', v)} />
                </View>

                {/* Default Picture Row */}
                { !imageURI ?
                    <>
                        <Separator style={styles.separator} title="Choose a starter profile picture" />
                        <View style={styles.starterPicturesRow}>
                            <TouchableOpacity style={styles.displayTouchable} onPress={() => setDefaultPicture(0)}>
                                <Image style={styles.displayPictures} source={{uri: defaultProfilePictures[0]}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.displayTouchable} onPress={() => setDefaultPicture(1)}>
                                <Image style={styles.displayPictures} source={{uri: defaultProfilePictures[1]}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.displayTouchable} onPress={() => setDefaultPicture(2)}>
                                <Image style={styles.displayPictures} source={{uri: defaultProfilePictures[2]}}/>
                            </TouchableOpacity>
                        </View>
                    </>

                    : null
                }

                {imageURI && 
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: imageURI }} style={styles.profileImage} />
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