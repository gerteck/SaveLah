import React, { useContext, useState, useEffect } from "react";
import {Linking, ScrollView, Text, View, TouchableOpacity, Image, Alert, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import { useLogout } from "../../../hooks/useLogout";
import Button from "../../../components/Button";
import ListItem from "../../../components/ListItem";
import EditableBox from "../../../components/EditableBox";


import { UserProfileContext } from "../../../context/UserProfileContext";
import { getApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';
import { getAuth, reauthenticateWithCredential, signInWithEmailAndPassword, updateEmail, updatePassword } from "firebase/auth";
import { projectAuth } from "../../../firebase/firebase";
import Input from "../../../components/Input";

import * as ImagePicker from 'expo-image-picker';
import { useUploadProfileImage } from "../../../hooks/useUploadImage";

import { Icon } from '@rneui/themed';
import { ThemeContext } from "../../../context/ThemeContext";
import themeColors from "../../../utils/themeColors";
const app = getApp;
const db = getFirestore(app);


// Profile refers to public information, aka Username & Bio
// Settings refers to private information, aka email (And password maybe)

const Settings = ( { navigation } ) => {
    const auth = getAuth();
    const user = auth.currentUser;
    // getting user through auth seems to update better.
    // const { user, authIsReady } = useAuthContext();

    const { logout, error, isPending } = useLogout();
    
    const [editingPublic, setEditingPublic] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);

    const [userProfile, setUserProfile] = useContext(UserProfileContext);
    const [tempProfile, setTempProfile] = useState({});
    const [tempSettings, setTempSettings] = useState({});
    //console.log(userProfile);

    //Image Picker:
    const [imageURI, setImageURI] = useState(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.2,
        });
        if (result.assets) {
            setImageURI(result.assets[0].uri);
        }
    }

    const uploadImage = async () => {
        const uploadedURL = await useUploadProfileImage(user.uid, imageURI);
        setUserProfile(v => ({...v, ['url']: uploadedURL}));
        
        await setDoc( doc(db, 'users', user.uid), {
            url: uploadedURL,
        }, { merge: true });
        setImageURI(null);
    }

    const isFocused = useIsFocused();
    useEffect(() => {
        if (user) {
            setTempSettings({email: user.email});
            setTempProfile({username: userProfile?.username, bio: userProfile?.bio});
            console.log("Refresh Settings Page")
        }
      },[isFocused]);

    const onBack = () => {
        navigation.goBack();
    }
    const onLogout = async () => {
        logout();     
    }
    const onEditPublicPress = () => {
        setEditingPublic(b => !b);
    }
    const onEditEmailPress = () => {
        setEditingEmail(b => !b);
    }
    const onEditPasswordPress = () => {
        setEditingPassword(b => !b);
    }

    const onSavePublicInformation = async () => {
        try {
            if (!tempProfile?.username) {
                Alert.alert('Please input a username!');
                return;
            }
            if (!tempProfile?.bio) {
                Alert.alert('Please input a bio!');
                return;
            } 

            await setDoc( doc(db, 'users', user.uid), {
                username: tempProfile.username,
                bio: tempProfile.bio,
            }, { merge: true });
            
            setUserProfile(v => ( {...v, username: tempProfile.username, bio: tempProfile.bio} ));
            setEditingPublic(false);
            console.log("Updated User Profile");

        } catch (error) {
            console.log('error updating User Profile ', error);
        }
    };

    const onSaveEmail = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!tempSettings?.email) {
            Alert.alert('Please input an email!');
            return;
        };
        if (!tempSettings?.password) {
            Alert.alert('Please input your password!');
            return;
        };
        await signInWithEmailAndPassword(projectAuth, user.email, tempSettings.password)
            .then((userCredential) => {
                //Supposed to call reauthenticate function with credential but ig no need, just sign in
                updateEmail(auth.currentUser, tempSettings.email).then(() => {
                    setEditingEmail(false);
                    onToast("Email Updated Successfully!");
                    console.log("Email Updated!");
                }).catch((error) => {
                    errorMessage = "Error updating email: " + error;
                    onToast(errorMessage);
                });
            })
            .catch((err) => {
                onToast(String(err));
        });
    };
    
    const onSavePassword = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!tempSettings?.newPassword) {
            Alert.alert('Please input a new Password!');
            return;
        };
        if (!tempSettings?.password) {
            Alert.alert('Please input your password!');
            return;
        };
        await signInWithEmailAndPassword(projectAuth, user.email, tempSettings.password)
            .then((userCredential) => {
                updatePassword(auth.currentUser, tempSettings.newPassword).then(() => {
                    setEditingPassword(false);
                    onToast("Password Updated Successfully!");
                    console.log("Password Updated!");
                }).catch((error) => {
                    console.log("Error updating password", error);
                    errorMessage = "Error updating password: " + error;
                    onToast(errorMessage);
                });
            })
            .catch((err) => {
                errorMessage = "Error Signing in: " + err;
                    onToast(errorMessage);
        });
    };

    const onToast = (errorMessage) => {
        console.log("Toast");
        ToastAndroid.showWithGravity(errorMessage, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }

    const onChangeTempProfile = (key, value) => {
        setTempProfile(v => ( {...v, [key]: value} ));
    }
    const onChangeTempSettings = (key, value) => {
        setTempSettings(v => ( {...v, [key]: value} ));
    }

    const onFAQ = () => {
        // will link to poster or github readme.
        Linking.openURL('https://google.com');
        //getServices();
    };

    const onContactUs = () => {
        // or link to orbital page idk
        Linking.openURL('https://github.com/gerteck');
    };

    const RickRoll = () => {
        Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); 
    }

    const { theme } = useContext(ThemeContext);
    let activeColors = themeColors[theme.mode];

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Settings" showBack onBack={onBack}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Public Information */}
                <View style={styles.sectionHeader}> 
                    <Text style={[styles.sectionTitle, {color: activeColors.text}]}>Edit Public Information</Text>
                    <TouchableOpacity onPress={onEditPublicPress} style={styles.touchable}>
                        <Icon name='edit' style={styles.icon} type='font-awesome' color={activeColors.iconColor}/> 
                    </TouchableOpacity>
                </View>

                {/* Update Profile Picture */}
                <View style={styles.profilePictureContainer}>
                    <TouchableOpacity style={styles.displayTouchable} onPress={pickImage}>
                        { !imageURI ? <Image style={styles.displayPicture} source={{uri: userProfile.url}}/> : null }
                        { imageURI ? <Image style={styles.displayPicture} source={{uri: imageURI}}/> : null }
                        <Image style={styles.editCircle} source={require('../../../assets/icons/editCircle.png')}/>
                    </TouchableOpacity>
                    {imageURI ? ( <Button style={styles.button} onPress={uploadImage} title="Upload Profile Picture"/> ) : null }
                </View>


                {/* Public Information: Username & Bio */}
                <EditableBox label="Username" value={tempProfile.username} onChangeText={(v) => onChangeTempProfile('username', v)} editable={editingPublic} style={styles.EditableBox} />
                <EditableBox label="Bio" value={tempProfile.bio} onChangeText={(v) => onChangeTempProfile('bio', v)} editable={editingPublic} style={styles.EditableBox} multiline />
                {editingPublic ? ( <Button style={styles.button} onPress={onSavePublicInformation} title="Save"/> ) : null }

                {/* Private Information: Email */}
                <View style={styles.sectionHeader}> 
                    <Text style={[styles.sectionTitle, {color: activeColors.text}]}>Update Email Address</Text>
                    <TouchableOpacity onPress={onEditEmailPress} style={styles.touchable}>
                        <Icon name='edit' style={styles.icon} type='font-awesome' color={activeColors.iconColor}/> 
                    </TouchableOpacity>
                </View>
                <EditableBox label="Email" value={tempSettings.email} onChangeText={(v) => onChangeTempSettings('email', v)} editable={editingEmail} style={styles.EditableBox} />
                
                {editingEmail ? 
                ( <Input value={tempSettings.password} onChangeText={(v) => onChangeTempSettings('password', v)} 
                    labelStyle={{ color: activeColors.inputLabel }} 
                    inputContainerStyle={{ backgroundColor: activeColors.inputBackground, borderColor: activeColors.inputBorder }} 
                    inputStyle={{ color: activeColors.text }}
                    label="Current Password" placeholder="*******" isPassword/> ) : null }
                {editingEmail ? ( <Button style={styles.button} onPress={onSaveEmail} title="Update Email"/> ) : null }

                {/* Private Information: Password */}
                <View style={[styles.sectionHeader, {paddingBottom: 12}]}> 
                    <Text style={[styles.sectionTitle, {color: activeColors.text}]}>Update Password</Text>
                    <TouchableOpacity onPress={onEditPasswordPress} style={styles.touchable}>
                        <Icon name='edit' style={styles.icon} type='font-awesome' color={activeColors.iconColor}/> 
                    </TouchableOpacity>
                </View>
                {editingPassword ?   
                    (<Input value={tempSettings.newPassword} onChangeText={(v) => onChangeTempSettings('newPassword', v)} 
                    labelStyle={{ color: activeColors.inputLabel }} 
                    inputContainerStyle={{ backgroundColor: activeColors.inputBackground, borderColor: activeColors.inputBorder }} 
                    inputStyle={{ color: activeColors.text }}
                    label="New Password" placeholder="*******" isPassword/>) : null }
                {editingPassword ? 
                    ( <Input value={tempSettings.password} onChangeText={(v) => onChangeTempSettings('password', v)} 
                    labelStyle={{ color: activeColors.inputLabel }} 
                    inputContainerStyle={{ backgroundColor: activeColors.inputBackground, borderColor: activeColors.inputBorder }} 
                    inputStyle={{ color: activeColors.text }}
                    label="Current Password" placeholder="*******" isPassword/> ) : null }
                {editingPassword ? ( <Button style={styles.button} onPress={onSavePassword} title="Update Password"/> ) : null }
                

                {/* Help Centre */}
                <Text style={[styles.sectionTitle, {color: activeColors.text}]}>Help Center</Text>
                <ListItem onPress={onFAQ} style={styles.item} title="FAQ"/>
                <ListItem onPress={onContactUs} style={styles.item} title="Contact us"/>
                <ListItem onPress={RickRoll} style={styles.item} title="Privacy & Terms"/>

                {!isPending && <Button onPress={onLogout} style={styles.logoutButton} title="Log out"  />}
                {isPending && <Button onPress={onLogout} style={styles.logoutButton} disabled={true} title="loading"  />}
                { error && <p>{ error }</p> }
            
            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(Settings);