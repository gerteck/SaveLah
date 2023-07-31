import React, {useState, useEffect, useContext } from 'react';
import { Alert, Text, ToastAndroid, View, StatusBar } from 'react-native';

import AuthHeader from '../../../components/AuthHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import { useSignup } from '../../../hooks/useSignup';
import { colors } from "../../../utils/colors";
import { styles } from './styles';
import themeColors from '../../../utils/themeColors';
import { ThemeContext } from '../../../context/ThemeContext';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

import { sendPasswordResetEmail } from '@firebase/auth';
import { projectAuth } from '../../../firebase/firebase';

const ForgetPassword = ({ navigation }) => {

    
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [sentEmail, setSentEmail] = useState(false);

    const onBack = () => {
        navigation.goBack();
    }

    const sendPasswordReset = async () => {
        setIsPending(true);
        return sendPasswordResetEmail(projectAuth, email)
            .then((a) => {
                ToastAndroid.showWithGravity("Password reset email sent", ToastAndroid.LONG, ToastAndroid.BOTTOM);
                setSentEmail(true);
                setIsPending(false);
            })
            .catch((err) => {
                setError(err.code);
                setIsPending(false);
            })
    }

    // Adds to the object

    const onSubmit = async () => {
        try {
            if (!email ) {
                ToastAndroid.showWithGravity('Fill in your Email!', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                return;
            }
            sendPasswordReset();
        } catch(error) {
            console.log('Reset Password error :>> ', error);
        }
    } 

    useEffect(() => {
        if (error) {
            ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
    },[error])


    const { theme } = useContext(ThemeContext);
    let activeColors = themeColors[theme.mode];
    const barColor = theme.mode == 'light' ? 'dark-content' : 'light-content';

    return (
        <View style={[styles.mainContainer, { backgroundColor: activeColors.background }]}>
            <StatusBar hidden={false} backgroundColor={activeColors.background} barStyle={barColor}/>
            <AuthHeader title="Reset Password" onBackPress={onBack} titleColorStyle={{ color: activeColors.title }}/>

            <Input value={email}  onChangeText={v => setEmail(v)} label="E-mail" placeholder="example@gmail.com" 
                labelStyle={{ color: activeColors.inputLabel }} 
                inputContainerStyle={{ backgroundColor: activeColors.inputBackground, borderColor: activeColors.inputBorder }} 
                inputStyle={{ color: activeColors.text }}
                placeholderColor={activeColors.inputPlaceholder} keyboardType={'email-address'}/>


            {!isPending && <Button onPress={onSubmit} style={styles.button} title="Reset Password"  />}
            {isPending && <Button style={styles.button} disabled={true} title="loading..." />}

            { sentEmail && <Text style={[ styles.infoText, {color: activeColors.text}]}>Email to reset your password has been sent, follow 
                the link in your email to reset your password. Check your spam folder if email does not appear in inbox.</Text>}
            {/* {error && <Text>{error}</Text>} */}

        </View>
    )
}

export default React.memo(ForgetPassword);