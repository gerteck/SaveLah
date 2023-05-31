import React, { useState } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import AuthHeader from '../../../components/AuthHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Separator from '../../../components/Separator';
import { styles } from './styles';

import { useLogin } from '../../../hooks/useLogin';

const Signin = ({ navigation }) => {
    // const {user, setUser} = useContext(UserContext);
    const [values, setValues] = useState({});

    //const [loading, setLoading] = useState(false); used in past
    const { login, error, isPending } = useLogin();


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
        
            login(values.email, values.password);
            // setUser({token});


        } catch (error) {
            console.log('error logging in :>> ', error);
        }
    }


    return (
        <ScrollView style={styles.container}>
            <AuthHeader onBackPress={onBack} title="Sign In" />
            <Input label="E-mail" placeholder="example@gmail.com" onChangeText={(v) => onChange('email', v)}/>
            <Input label="Password" placeholder="********" isPassword onChangeText={(v) => onChange('password', v)} />
        
            {!isPending && <Button onPress={onLogin} style={styles.button} title="Sign In"  />}
            {isPending && <Button style={styles.button} disabled={true} title="loading" />}

            <Separator title="For Aesthetics" />

            <Text style={styles.footerText}>
                Don't have an account?
                <Text onPress={onSignUp} style={styles.footerLink}> Sign Up</Text>
            </Text>
            { error && <Text>{ error }</Text> }
        </ScrollView>
    )
}

export default React.memo(Signin);