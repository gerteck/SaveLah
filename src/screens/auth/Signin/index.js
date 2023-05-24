import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import AuthHeader from '../../../components/AuthHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Separator from '../../../components/Separator';
import { styles } from './styles';

const Signin = () => {
    const onSignUp = () => {
        console.log('HOLA');
    }

    function onBack() {
        console.log('onBack Pressed 1');
    }

    return (
        <ScrollView style={styles.container}>
            <AuthHeader onBackPress={onBack} title="Sign In" />
            <Input label="E-mail" placeholder="example@gmail.com"/>
            <Input label="Password" placeholder="********" isPassword/>
        
            <Button style={styles.button} title="Sign In"  />

            <Separator title="Separator" />

            <Text style={styles.footerText}>
                Don't have an account?
                <Text onPress={onSignUp} style={styles.footerLink}> Sign Up</Text>
            </Text>
        </ScrollView>
    )
}

export default React.memo(Signin);