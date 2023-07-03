import React, {useState, useEffect } from 'react';
import { Alert, Text, ToastAndroid, View, StatusBar } from 'react-native';

import AuthHeader from '../../../components/AuthHeader';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import Separator from '../../../components/Separator';

import { useSignup } from '../../../hooks/useSignup';
import { colors } from "../../../utils/colors";
import { styles } from './styles';
import { Linking } from 'react-native';

// import { UserContext } from '../../../../App';
// import { signup } from '../../../utils/backendCalls';

const Signup = ({ navigation }) => {
    const [checked, setChecked] = useState(false);
    const [values, setValues] = useState({});

    const { signup, isPending, error} = useSignup();

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
            if (!values?.name || !values?.email || !values?.password ) {
                Alert.alert('All fields are required');
                return;
            }

            if (!checked) {
                Alert.alert('Please read and agree to the Terms & Privacy');
                return;
            }

            signup(values.name, values.email, values.password);
            
        } catch(error) {
            console.log('Signup error :>> ', error);
        }
    } 

    useEffect(() => {
        if (error) {
            ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
    },[error])

    const RickRoll = () => {
        Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); 
    }

    return (
        <View style={styles.mainContainer}>
            <StatusBar hidden={false} backgroundColor={colors.white} barStyle={"dark-content"}/>
            <AuthHeader title="Sign Up" onBackPress={onBack}/>

            <Input value={values.name} onChangeText={(v) => onChange('name', v)} label="Name"  placeholder="John Doe" />
            <Input value={values.email}  onChangeText={(v) => onChange('email', v)} label="E-mail" placeholder="example@gmail.com" />
            <Input isPassword value={values.password} onChangeText={(v) => onChange('password', v)} label="Password" placeholder="*******" />

            <View style={styles.agreeRow}>
                <Checkbox checked={checked} onCheck={setChecked} />
                <Text style={styles.agreeText}>
                    I agree with 
                    <Text style={styles.agreeTextBold} onPress={RickRoll}> Terms </Text> 
                    & 
                    <Text style={styles.agreeTextBold} onPress={RickRoll}> Privacy </Text>
                </Text>
            </View>

            {!isPending && <Button onPress={onSubmit} style={styles.button} title="Sign Up"  />}
            {isPending && <Button style={styles.button} disabled={true} title="loading" />}

            <Separator title="Aesthetic Purposes" />

            <Text style={styles.footerText}>
                Already have an account?
                <Text onPress={onSignIn} style={styles.footerLink}> Sign In</Text>
            </Text>
            {/* {error && <Text>{error}</Text>} */}
        </View>
    )
}

export default React.memo(Signup);