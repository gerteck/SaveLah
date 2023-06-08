import { useSignup } from '../../../hooks/useSignup';

import React, { useContext, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

import AuthHeader from '../../../components/AuthHeader';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import Separator from '../../../components/Separator';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { UserContext } from '../../../../App';
// import { signup } from '../../../utils/backendCalls';

const Signup = ({ navigation }) => {
    const [checked, setChecked] = useState(false);
    const [values, setValues] = useState({});

//     const {user, setUser} = useContext(UserContext); Used in past
//     const [loading, setLoading] = useState(false);

    // const {user, setUser} = useContext(UserContext);
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
                Alert.alert('Please agree to the terms');
                return;
            }
            

//             setLoading(true);
//             console.log("Attempt Sign up")
//             const token = await signup(values);

//             if (token) {
//                 console.log('success'); 
//                 setUser({token});
//                 return;                
//             } else {
//                 Alert.alert('Sign up failed :( ');
//                 setLoading(false);
//             }

            // const token = await 
            console.log('here')
            signup(values.name, values.email, values.password);
            // console.log(token);
            // setUser({token});
            
        } catch(error) {
            console.log('Signup error :>> ', error);
        }
    } 

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <AuthHeader title="Sign Up" onBackPress={onBack}/>

                <Input value={values.name} onChangeText={(v) => onChange('name', v)} label="Name"  placeholder="John Doe" />
                <Input value={values.email}  onChangeText={(v) => onChange('email', v)} label="E-mail" placeholder="example@gmail.com" />
                <Input isPassword value={values.password} onChangeText={(v) => onChange('password', v)} label="Password" placeholder="*******" />

                <View style={styles.agreeRow}>
                    <Checkbox checked={checked} onCheck={setChecked} />
                    <Text style={styles.agreeText}>I agree with <Text style={styles.agreeTextBold}>Terms</Text> & <Text style={styles.agreeTextBold}>Privacy</Text></Text>
                </View>

                {!isPending && <Button onPress={onSubmit} style={styles.button} title="Sign Up"  />}
                {isPending && <Button style={styles.button} disabled={true} title="loading" />}

                <Separator title="Aesthetic Purposes" />

                <Text style={styles.footerText}>
                    Already have an account?
                    <Text onPress={onSignIn} style={styles.footerLink}> Sign In</Text>
                </Text>
                {error && <Text>{error}</Text>}
            </View>
        </View>
    )
}

export default React.memo(Signup);