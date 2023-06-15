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
import { getAuth, reauthenticateWithCredential, signInWithEmailAndPassword, updateEmail } from "firebase/auth";
import { projectAuth } from "../../../firebase/firebase";
import { TextInput } from "react-native-gesture-handler";
import Input from "../../../components/Input";

const app = getApp;
const db = getFirestore(app);


// Profile refers to public information, aka Username & Bio
// Settings refers to private information, aka email (And password maybe)

const Settings = ( { navigation } ) => {
    
    const { user, authIsReady } = useAuthContext();
    const { logout, error, isPending } = useLogout();
    const [editingPublic, setEditingPublic] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [emailError, setEmailError] = useState("");

    const [userProfile, setUserProfile] = useContext(UserProfileContext);
    const [tempProfile, setTempProfile] = useState({});
    const [tempSettings, setTempSettings] = useState({});

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
        if (!tempSettings?.email) {
            Alert.alert('Please input an email!');
            return;
        }
        if (!tempSettings?.password) {
            Alert.alert('Please input your password!');
            return;
        } 
        await reAuthenticateUser();
        const auth = getAuth();
        updateEmail(auth.currentUser, tempSettings.email).then(() => {
            setEditingEmail(false);
            console.log("Email Updated!");
        }).catch((error) => {
            console.log("Error updating email", error);
            setEmailError("Error updating email: " + error);
        });
    };
    

    //ReAuthenticate User (Sign in again) (to update email or password)
    const reAuthenticateUser = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        signInWithEmailAndPassword(projectAuth, user.email, tempSettings.password)
            .then((userCredential) => {
                //Supposed to reauthenticate with credential but apparently ig no need
            })
            .catch((err) => {
                console.log("Error Signing in: ", err);
        });
    }


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
            <ScrollView>
                {/* Public Information */}
                <View style={styles.sectionHeader}> 
                    <Text style={styles.sectionTitle}>Edit Public Information</Text>
                    <TouchableOpacity onPress={onEditPublicPress} style={styles.touchable}>
                        <Image style={styles.icon} source={require('../../../assets/icons/edit.png')}/>
                    </TouchableOpacity>
                </View>
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
                {editingEmail ? ( <Button style={styles.button} onPress={onSaveEmail} title="Save"/> ) : null }

                {/* Help Centre */}
                <Text style={styles.sectionTitle}>Help Center</Text>
                <ListItem onPress={onItemPress} style={styles.item} title="FAQ"/>
                <ListItem onPress={onItemPress} style={styles.item} title="Contact us"/>
                <ListItem onPress={onItemPress} style={styles.item} title="Privacy & Terms"/>

                {!isPending && <Button onPress={onLogout} style={styles.button} title="Log out"  />}
                {isPending && <Button onPress={onLogout} style={styles.button} disabled={true} title="loading"  />}
                { error && <p>{ error }</p> }
            
            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(Settings);