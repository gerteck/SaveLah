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

const ForgetPassword = ({ navigation }) => {
    const [checked, setChecked] = useState(false);
    const [values, setValues] = useState({});
    const [email, setEmail] = useState("");

    const { signup, isPending, error} = useSignup();

    const onBack = () => {
        navigation.goBack();
    }

    // Adds to the object

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


            {!isPending && <Button onPress={onSubmit} style={styles.button} title="Sign Up"  />}
            {isPending && <Button style={styles.button} disabled={true} title="loading..." />}

            <Separator title="Or sign up with" textStyle={{ color: activeColors.footer }}/>

            {/* {error && <Text>{error}</Text>} */}
        </View>
    )
}

export default React.memo(ForgetPassword);