import React from 'react';
import { Text, Image, View, Pressable } from 'react-native';

import { colors } from "../../../utils/colors";
import { styles } from './styles';

import Button from '../../../components/Button';
import { StatusBar } from 'react-native';

const Splash = ({ navigation }) => {

    const onSignup = () => {
        navigation.navigate('Signup');
    };

    const onSignin = () => {
        navigation.navigate('Signin');
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} backgroundColor={colors.white} barStyle={"dark-content"}/> 
            <Image resizeMode='contain' style={styles.image} source={require('../../../assets/authPages/splash_image.jpg')} />

            <View style={styles.titleContainer}>
                <Text style={styles.title}>All your</Text>
                <Text style={[styles.title, styles.innerTitle]}>Budgeting Needs,</Text>
                <Text style={styles.title}>Here.</Text>
            </View>

            <Button onPress={onSignup} title="Sign Up" />

            <Pressable style={styles.footerContainer} hitSlop={2} onPress={onSignin}> 
                <Text style={styles.footerText}>Sign In</Text>
            </Pressable>
        </View>
    )
}

export default React.memo(Splash);