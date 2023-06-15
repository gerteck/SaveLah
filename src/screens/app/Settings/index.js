import React, { useContext, useState, useEffect } from "react";
import {Linking, ScrollView, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import { useLogout } from "../../../hooks/useLogout";
import Button from "../../../components/Button";
import ListItem from "../../../components/ListItem";
import EditableBox from "../../../components/EditableBox";


import { UserProfileContext } from "../../../context/UserProfileContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { getApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';
import { getAuth, reauthenticateWithCredential, signInWithEmailAndPassword, updateEmail, updatePassword } from "firebase/auth";
import { projectAuth } from "../../../firebase/firebase";
import { TextInput } from "react-native-gesture-handler";
import Input from "../../../components/Input";

import * as ImagePicker from 'expo-image-picker';
import { useUploadImage } from "../../../hooks/useUploadImage";

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

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailUpdateSuccess, setEmailUpdateSuccess] = useState(false);
    const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);

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
    const deleteImage = () => {
        setImageURI(null);
    }
    const uploadImage = async () => {
        const uploadedURL = await useUploadImage(user.uid, imageURI);
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
            //console.log("Refresh Settings Page")
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
        setPasswordError("");
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
                    setEmailUpdateSuccess(true);
                    console.log("Email Updated!");
                }).catch((error) => {
                    console.log("Error updating email", error);
                    setEmailError("Error updating email: " + error);
                });
            })
            .catch((err) => {
                console.log("Error Signing in: " + err);
                setEmailError("Error Signing in: " + err); 
        });
    };
    
    const onSavePassword = async () => {
        setPasswordError("");
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
                    console.log("Password Updated!");
                    setPasswordUpdateSuccess(true);
                }).catch((error) => {
                    console.log("Error updating password", error);
                    setPasswordError("Error updating password: " + error);
                });
            })
            .catch((err) => {
                console.log("Error Signing in: ", err);
                setPasswordError("Error Signing in: " + err); 
        });
    };

    const onChangeTempProfile = (key, value) => {
        setTempProfile(v => ( {...v, [key]: value} ));
    }
    const onChangeTempSettings = (key, value) => {
        setTempSettings(v => ( {...v, [key]: value} ));
    }

    const onItemPress = () => {
        Linking.openURL('https://google.com');
        //getServices();
    };
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Settings" showBack onBack={onBack}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Public Information */}
                <View style={styles.sectionHeader}> 
                    <Text style={styles.sectionTitle}>Edit Public Information</Text>
                    <TouchableOpacity onPress={onEditPublicPress} style={styles.touchable}>
                        <Image style={styles.icon} source={require('../../../assets/icons/edit.png')}/>
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
                <EditableBox label="Bio" value={tempProfile.bio} onChangeText={(v) => onChangeTempProfile('bio', v)} editable={editingPublic} style={styles.EditableBox} />
                {editingPublic ? ( <Button style={styles.button} onPress={onSavePublicInformation} title="Save"/> ) : null }

                {/* Private Information: Email */}
                <View style={styles.sectionHeader}> 
                    <Text style={styles.sectionTitle}>Update Email Address</Text>
                    <TouchableOpacity onPress={onEditEmailPress} style={styles.touchable}>
                        <Image style={styles.icon} source={require('../../../assets/icons/edit.png')}/>
                    </TouchableOpacity>
                </View>
                <EditableBox label="Email" value={tempSettings.email} onChangeText={(v) => onChangeTempSettings('email', v)} editable={editingEmail} style={styles.EditableBox} />
                {/* <EditableBox label="Bio" value={tempProfile.bio} onChangeText={(v) => onChangeTempProfile('bio', v)} editable={editingEmail} style={styles.EditableBox} /> */}
                {editingEmail ? ( <Input value={tempSettings.password} onChangeText={(v) => onChangeTempSettings('password', v)} label="Current Password" placeholder="*******" isPassword/> ) : null }
                {editingEmail && emailError && <Text>{emailError}</Text>}
                {editingEmail ? ( <Button style={styles.button} onPress={onSaveEmail} title="Update Email"/> ) : null }
                {emailUpdateSuccess && <Text>Email Updated Successfully!</Text>}

                {/* Private Information: Password */}
                <View style={[styles.sectionHeader, {paddingBottom: 12}]}> 
                    <Text style={styles.sectionTitle}>Update Password</Text>
                    <TouchableOpacity onPress={onEditPasswordPress} style={styles.touchable}>
                        <Image style={styles.icon} source={require('../../../assets/icons/edit.png')}/>
                    </TouchableOpacity>
                </View>
                {editingPassword ?   <Input value={tempSettings.newPassword} onChangeText={(v) => onChangeTempSettings('newPassword', v)} label="New Password" placeholder="*******" isPassword/> : null }
                {editingPassword ? ( <Input value={tempSettings.password} onChangeText={(v) => onChangeTempSettings('password', v)} label="Current Password" placeholder="*******" isPassword/> ) : null }
                {editingPassword && passwordError && <Text>{passwordError}</Text>}
                {editingPassword ? ( <Button style={styles.button} onPress={onSavePassword} title="Update Password"/> ) : null }
                {passwordUpdateSuccess && <Text>Password Updated Successfully!</Text>}
                

                {/* Help Centre */}
                <Text style={styles.sectionTitle}>Help Center</Text>
                <ListItem onPress={onItemPress} style={styles.item} title="FAQ"/>
                <ListItem onPress={onItemPress} style={styles.item} title="Contact us"/>
                <ListItem onPress={onItemPress} style={styles.item} title="Privacy & Terms"/>

                {!isPending && <Button onPress={onLogout} style={styles.logoutButton} title="Log out"  />}
                {isPending && <Button onPress={onLogout} style={styles.logoutButton} disabled={true} title="loading"  />}
                { error && <p>{ error }</p> }
            
            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(Settings);