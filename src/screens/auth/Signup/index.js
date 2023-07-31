import React, {useState, useEffect, useContext } from 'react';
import { Alert, Text, ToastAndroid, View, StatusBar } from 'react-native';

import AuthHeader from '../../../components/AuthHeader';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import Separator from '../../../components/Separator';

import { useSignup } from '../../../hooks/useSignup';
import { colors } from "../../../utils/colors";
import { styles } from './styles';
import { Linking, Image } from 'react-native';
import themeColors from '../../../utils/themeColors';
import { ThemeContext } from '../../../context/ThemeContext';
import { useGoogleSignIn } from '../../../hooks/useGoogleSignIn';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

const Signup = ({ navigation }) => {
    const [checked, setChecked] = useState(false);
    const [values, setValues] = useState({});

    const { signup, isPending, error} = useSignup();
    const { googleSignIn, isPendingG, errorG } = useGoogleSignIn();

    const onSignIn = () => {
        navigation.navigate("Signin");
    }

    const onBack = () => {
        navigation.goBack();
    }

    // Adds to the object
    const onChange = (key, value) => {
        setValues(v => ({...v, [key]: value}))
    } 

    const onSubmit = async () => {
        try {
            if (!values?.confirmPassword || !values?.email || !values?.password ) {
                ToastAndroid.showWithGravity('All fields are required', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                return;
            }

            if (!checked) {
                ToastAndroid.showWithGravity('Please read and agree to the Terms & Privacy', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                return;
            }

            if (values.password != values.confirmPassword) {
                ToastAndroid.showWithGravity('Passwords do not match', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                return;
            }

            signup(values.email, values.password);
            
        } catch(error) {
            console.log('Signup error :>> ', error);
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

    const RickRoll = () => {
        Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); 
    }

    const { theme } = useContext(ThemeContext);
    let activeColors = themeColors[theme.mode];
    const barColor = theme.mode == 'light' ? 'dark-content' : 'light-content';

    return (
        <View style={[styles.mainContainer, { backgroundColor: activeColors.background }]}>
            <StatusBar hidden={false} backgroundColor={activeColors.background} barStyle={barColor}/>
            <AuthHeader title="Sign Up" onBackPress={onBack} titleColorStyle={{ color: activeColors.title }}/>

            <Input value={values.email}  onChangeText={(v) => onChange('email', v)} label="E-mail" placeholder="example@gmail.com" 
                labelStyle={{ color: activeColors.inputLabel }} 
                inputContainerStyle={{ backgroundColor: activeColors.inputBackground, borderColor: activeColors.inputBorder }} 
                inputStyle={{ color: activeColors.text }}
                placeholderColor={activeColors.inputPlaceholder} keyboardType={'email-address'}/>

            <Input isPassword value={values.password} onChangeText={(v) => onChange('password', v)} label="Password" placeholder="*******" 
                labelStyle={{ color: activeColors.inputLabel }} 
                inputContainerStyle={{ backgroundColor: activeColors.inputBackground, borderColor: activeColors.inputBorder }} 
                inputStyle={{ color: activeColors.text }}
                placeholderColor={activeColors.inputPlaceholder}/>

            <Input isPassword value={values.confirmPassword} onChangeText={(v) => onChange('confirmPassword', v)} label="Confirm password" placeholder="*******" 
                labelStyle={{ color: activeColors.inputLabel }} 
                inputContainerStyle={{ backgroundColor: activeColors.inputBackground, borderColor: activeColors.inputBorder }} 
                inputStyle={{ color: activeColors.text }}
                placeholderColor={activeColors.inputPlaceholder}/>

            <View style={styles.agreeRow}>
                <Checkbox checked={checked} onCheck={setChecked} />
                <Text style={[styles.agreeText, { color: activeColors.footer }]}>
                    I agree with 
                    <Text style={styles.agreeTextBold} onPress={RickRoll}> Terms </Text> 
                    & 
                    <Text style={styles.agreeTextBold} onPress={RickRoll}> Privacy </Text>
                </Text>
            </View>

            {!isPending && <Button onPress={onSubmit} style={styles.button} title="Sign Up"  />}
            {isPending && <Button style={styles.button} disabled={true} title="loading..." />}

            <Separator title="Or sign up with" textStyle={{ color: activeColors.footer }}/>

            {!isPendingG && 
                <TouchableOpacity onPress={onGoogle} style={[{ backgroundColor: activeColors.googleBackground }, styles.gButtonContainer]}>
                        <Icon name='google' type='font-awesome' size={28} color={activeColors.white}/>
                </TouchableOpacity>}
            {isPendingG && <Button style={styles.gButtonContainer} disabled={true} title="loading..." />}

            <Text style={[styles.footerText, { color: activeColors.footer }]}>
                Already have an account?
                <Text onPress={onSignIn} style={styles.footerLink}> Sign In</Text>
            </Text>
            {/* {error && <Text>{error}</Text>} */}
        </View>
    )
}

export default React.memo(Signup);