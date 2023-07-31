import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Alert, ToastAndroid, StatusBar, TouchableOpacity, Image } from 'react-native';
import AuthHeader from '../../../components/AuthHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Separator from '../../../components/Separator';

import { colors } from "../../../utils/colors";
import { styles } from './styles';

import { useLogin } from '../../../hooks/useLogin';
import { ThemeContext } from '../../../context/ThemeContext';
import themeColors from '../../../utils/themeColors';
import { useGoogleSignIn } from '../../../hooks/useGoogleSignIn';
import { Icon } from '@rneui/themed';

const Signin = ({ navigation }) => {
    // const {user, setUser} = useContext(UserContext);
    const [values, setValues] = useState({});

    //const [loading, setLoading] = useState(false); used in past
    const { login, error, isPending } = useLogin();
    const { googleSignIn, isPendingG, errorG } = useGoogleSignIn();

    const onSignUp = () => {
        navigation.navigate("Signup");
    }

    const onForget = () => {
        navigation.navigate("ForgetPassword");
    }

    function onBack() {
        navigation.goBack();
    }

    // Adds to the value object
    const onChange = (key, value) => {
        setValues(v => ({...v, [key]: value}))
    } 

    const onLogin = async () => {
        try {
            //Guard Clause
            if (!values?.email || !values?.password ) {
                Alert.alert('Please fill up all fields!');
                return;
            }
            
            login(values.email, values.password);

        } catch (error) {
            console.log('error logging in :>> ', error);
        }
    }

    useEffect(() => {
        if (error) {
            ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
    },[error])

    // Google sign in
    const onGoogle = async () => {
        try {
            googleSignIn();
        } catch(error) {
            console.log('Google sign in :>> ', error);
        }
    } 

    useEffect(() => {
        if (errorG) {
            ToastAndroid.showWithGravity(errorG, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
    },[errorG])

    const { theme } = useContext(ThemeContext);
    let activeColors = themeColors[theme.mode];
    const barColor = theme.mode == 'light' ? 'dark-content' : 'light-content';

    return (
        <View style={[styles.mainContainer, { backgroundColor: activeColors.background }]}>
            <StatusBar hidden={false} backgroundColor={activeColors.background} barStyle={barColor}/>
            <AuthHeader onBackPress={onBack} title="Sign In" titleColorStyle={{ color: activeColors.title }}/>
            <View style={styles.gap}/>
            <Input label="E-mail" placeholder="example@gmail.com" 
                onChangeText={(v) => onChange('email', v)} labelStyle={{ color: activeColors.inputLabel }} 
                inputContainerStyle={{ backgroundColor: activeColors.inputBackground, borderColor: activeColors.inputBorder }} 
                inputStyle={{ color: activeColors.text }}
                placeholderColor={activeColors.inputPlaceholder} keyboardType={'email-address'}/>
            <View style={styles.gap}/>
            <Input label="Password" placeholder="********" isPassword 
                onChangeText={(v) => onChange('password', v)} labelStyle={{ color: activeColors.inputLabel }} 
                inputContainerStyle={{ backgroundColor: activeColors.inputBackground, borderColor: activeColors.inputBorder }} 
                inputStyle={{ color: activeColors.text }}
                placeholderColor={activeColors.inputPlaceholder}/>
        
            {!isPending && <Button onPress={onLogin} style={styles.button} title="Sign In"  />}
            {isPending && <Button style={styles.button} disabled={true} title="loading" />}

            <Separator style={styles.separator} title="Or sign in with" textStyle={{ color: activeColors.footer }}/>

            {!isPendingG && 
                <TouchableOpacity onPress={onGoogle} style={[{ backgroundColor: activeColors.googleBackground }, styles.gButtonContainer]}>
                        <Icon name='google' type='font-awesome' size={28} color={activeColors.white}/>
                </TouchableOpacity>}
            {isPendingG && <Button style={styles.gButtonContainer} disabled={true} title="loading..." />}

            <Text style={[styles.footerText, { color: activeColors.footer }]}>
                Forgotten Password?
                <Text onPress={onForget} style={styles.footerLink}> Reset Password</Text>
            </Text>

            <Text style={[styles.footerText, { color: activeColors.footer }]}>
                Don't have an account?
                <Text onPress={onSignUp} style={styles.footerLink}> Sign Up</Text>
            </Text>
            {/* { error && <Text>{ error }</Text> } */}

        </View>
    )
}

export default React.memo(Signin);