import React, { useContext, useState } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import AuthHeader from '../../../components/AuthHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Separator from '../../../components/Separator';
import { styles } from './styles';
import { signin } from '../../../utils/backendCalls';
import { UserContext } from '../../../../AppContext';


const Signin = ({ navigation }) => {
    const {user, setUser} = useContext(UserContext);
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);

    const onSignUp = () => {
        navigation.navigate("Signup");
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
            if (!values?.email || !values?.password ) {
                Alert.alert('Please fill up all fields!');
                return;
            }
            
            setLoading(true);
            console.log("Attempt Sign in")
            const token = await signin(values);

            if (token) {
                console.log('success'); 
                setUser({token});
                return;                
            } else {
                Alert.alert('Log in failed :( Please check username or password');
                setLoading(false);
            }

        } catch (error) {
            console.log('error logging in :>> ', error);
        }
    }


    return (
        <ScrollView style={styles.container}>
            <AuthHeader onBackPress={onBack} title="Sign In" />
            <Input label="E-mail" placeholder="example@gmail.com" onChangeText={(v) => onChange('email', v)}/>
            <Input label="Password" placeholder="********" isPassword onChangeText={(v) => onChange('password', v)} />
        
            <Button disabled={loading} onPress={onLogin} style={styles.button} title="Sign In"  />

            <Separator title="For Aesthetics" />

            <Text style={styles.footerText}>
                Don't have an account?
                <Text onPress={onSignUp} style={styles.footerLink}> Sign Up</Text>
            </Text>
        </ScrollView>
    )
}

export default React.memo(Signin);