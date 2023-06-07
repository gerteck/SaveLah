import React from "react";
import {ScrollView, Text, View, Image, Pressable } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../components/AppHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import Box from "../../../components/Box";


const Profile = ( {navigation} ) => {

    const goSettings = () => {
        navigation.navigate('Settings');
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Profile" />

            <ScrollView showsVerticalScrollIndicator={false}> 
                <View style={styles.whiteBox}>
                    <View style={styles.profile}>
                        <View style={styles.displayWrapper}>
                            <Image style={styles.displayPicture} source={require('../../../assets/DummyProfile.jpg')}/>
                        </View>
                        <View style={styles.nameBioContainer}>
                            <Text style={styles.name}>John Doe</Text>
                            <View style={styles.bioContainer}>
                                <Text style={styles.bio}>Bio Goes Here</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.followContainer}>
                        <TouchableOpacity style={styles.followerContainer}>
                            <Text style={styles.followText}>5</Text>
                            <Text style={styles.followText}>Followers</Text>
                        </TouchableOpacity>
                        <View style={styles.line}/>
                        <TouchableOpacity style={styles.followerContainer}>
                            <Text style={styles.followText}>20</Text>
                            <Text style={styles.followText}>Following</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Will be dynamic to show either findfriends/Settings or Message/Follow */}
                    <View style={styles.settingsContainer}>
                        <View style={styles.settingsBox}>
                            <Text style={styles.followText}>Find Friends</Text>
                        </View>
                        <View style={{width: '5%'}}/>
                        <Pressable onPress={goSettings} style={styles.settingsBox}>
                            <Text style={styles.followText}>Settings</Text>
                            <Image style={styles.icon} source={require('../../../assets/icons/edit.png')}/>
                        </Pressable>
                    </View>
                </View>

                <Text style={styles.postTitle}> Top posts </Text>
                <Box style={{height: 500}} />
                {/* Add posts FlatList here! */}


            </ScrollView>

        </SafeAreaView>
    )
}

export default React.memo(Profile);