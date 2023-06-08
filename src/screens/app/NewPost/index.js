import React, { useState } from "react";
import { ScrollView, TextInput, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import Button from "../../../components/Button";

import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';


const NewPost = ( { navigation } ) => {
    
    const onBack = () => {
        navigation.goBack();
    };
    
    const [postInfo, setPostInfo] = useState({});
    // Adds to the value object
    const onChange = (key, value) => {
        setPostInfo(v => ({...v, [key]: value}))
    } 

    //console.log({postInfo});

    //Drop Down Picker:
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([{label: 'Money Saving Tips', value: 'MoneySavingTips'}, {label: 'Life', value: 'Life'}]);

    
    //Image Picker:
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        //console.log(result);

        if (result.assets) {
            setImage(result.assets[0].uri);
        }
    }
    const deleteImage = () => {
        setImage(null);
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader style={styles.appHeader} title={"Create Post"} showCross onBack={onBack}/>
            <ScrollView style={styles.container}> 

            <Text style={styles.label}>Title</Text>
            <View style={styles.inputContainer}>
                <TextInput placeholder="Title" style={styles.input} value={postInfo.title} 
                    onChangeText={(v) => onChange('title', v)} />
            </View>

            <Text style={styles.label}>Body Text</Text>
            <View style={[styles.inputContainer, styles.bodyInputContainer]}>
                <TextInput placeholder="Type away..." style={styles.input} value={postInfo.body} multiline
                    onChangeText={(v) => onChange('body', v)} />
            </View>

            <Text style={styles.label}>Category</Text>
            <DropDownPicker open={open} value={postInfo.category} items={items} listMode="SCROLLVIEW"
                placeholder="Select a Category" style={styles.pickerContainer}
                setOpen={setOpen} onSelectItem={(v) => onChange('category', v.value)} setItems={setItems}
            />

            {image && 
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                    </View>
            }

            {/* Buttons Row */}
            <View style={styles.buttonsRow}>
                {image ? 
                    <TouchableOpacity activeOpacity={0.6} onPress={deleteImage} style={styles.deleteImage} >
                        <Text style={styles.deleteImageText}>Delete Image</Text>
                        <Image style={styles.deleteIcon} source={require('../../../assets/icons/delete.png')}/>
                    </TouchableOpacity>
                :   <TouchableOpacity activeOpacity={0.6} onPress={pickImage} style={styles.addImage}>
                        <Text style={styles.addImageText}>Add Image</Text>
                        <Image style={styles.deleteIcon} source={require('../../../assets/icons/addImage.png')}/>
                    </TouchableOpacity> 
                }

                <TouchableOpacity activeOpacity={0.6} onPress={null} style={styles.post}>
                        <Text style={styles.deleteImageText}>Post</Text>
                </TouchableOpacity> 

            </View>

            {/* // Preview of postInfo */}
            <Text>{postInfo.title}</Text>
            <Text>{postInfo.body}</Text>
            <Text>{postInfo.category}</Text>

            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(NewPost);