import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import AuthHeader from '../../../components/AuthHeader';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import Separator from '../../../components/Separator';
import { styles } from './styles';


const Signup = ({ navigation }) => {
    const [checked, setChecked] = useState(false);

    const onSignIn = () => {
        navigation.navigate("Signin");
    }

    const onBack = () => {
        navigation.goBack();
    }

    return (
        <ScrollView style={styles.container}>
            <AuthHeader title="Sign Up" onBackPress={onBack}/>

            <Input label="Name" placeholder="John Doe" />
            <Input label="E-mail" placeholder="example@gmail.com" />
            <Input isPassword label="Password" placeholder="*******" />

            <View style={styles.agreeRow}>
                <Checkbox checked={checked} onCheck={setChecked} />
                <Text style={styles.agreeText}>I agree with <Text style={styles.agreeTextBold}>Terms</Text> & <Text style={styles.agreeTextBold}>Privacy</Text></Text>
            </View>

            <Button style={styles.button} title="Sign Up"  />

            <Separator title="Separator" />

            <Text style={styles.footerText}>
                Already have an account?
                <Text onPress={onSignIn} style={styles.footerLink}> Sign In</Text>
            </Text>
        </ScrollView>
    )
}

export default React.memo(Signup);