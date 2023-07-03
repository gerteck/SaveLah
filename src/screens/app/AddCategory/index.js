import React, { createRef, useState } from "react";
import { Text, View, Alert, TouchableOpacity, TextInput, Keyboard, Image, Modal, Pressable } from "react-native";

import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../components/AppHeader";
import Button from "../../../components/Button";
import { useFirestore } from "../../../hooks/useFirestore";
import { useAuthContext } from "../../../hooks/useAuthContext";

import { useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useIsFocused } from "@react-navigation/native";
import { getApp } from "firebase/app";

import { collection, doc, getFirestore, onSnapshot, query, setDoc, where, getDoc } from "firebase/firestore";
import { FlatList, ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { getCategoryIcon } from "../../../utils/getCategoryIcon";
import { defaultCategories } from "../../../utils/defaultCategories";
import { categoryGroupsAddCategory } from "../../../utils/categoryGroupsAddCategory";
import { Icon } from '@rneui/themed';

const AddCategory = ( {navigation} ) => {
    const app = getApp;
    const db = getFirestore(app);

    const { user } = useAuthContext();
    const [values, setValues] = useState({index: 129});

    // Drop Down Picker:
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(categoryGroupsAddCategory);

    // Icon Modal picker:
    const [modalVisible, setModalVisible] = useState(false);

    // Array for icon indices
    let iconIndexArray = [];
    for (let i = 20; i <= 128; i++) {
        iconIndexArray.push({index: i});
    }

    const goBack = () => {
        navigation.goBack();
    }

    const onChangeValue = (key, value) => {
        setValues(v => ({...v, [key]: value}))
    } 

    // set dummy icon
    const iconStyle = { height: 50, width: 50 };

    const docRef = doc(db, "categories", user?.uid);

    const onSend = async () => {
        try {

            if (!values?.name || !values?.parent ) {
                Alert.alert('Please pick a name and group!');
                return;
            }

            if (values.index == 129) {
                Alert.alert('Please pick an icon!');
                return;
            }


            const docSnap = await getDoc(docRef);

            const cats = docSnap.data().categories;
            const newCats = [{ index: values.index, label: values.name, parent: values.parent, value: values.name }, ...cats];


            await setDoc(docRef, {
                categories: newCats
            }, { merge: true });

            console.log('success adding category');
            navigation.goBack();

        } catch (error) {
            console.log('error adding transaction :>> ', error);
        }
    }

    // For rendering icons in icon picker
    const renderIcon = ({item}) => {
        const currIndex = item.index;
        const changeIndex = () => {
            onChangeValue('index', currIndex);
            setModalVisible(!modalVisible);
        }

        return (
        <Pressable key={item.index} onPress={changeIndex} style={{margin: 10}}>
            <View style={styles.iconContainer} key={item.index}>
                {getCategoryIcon(currIndex, iconStyle)}    
            </View>
        </Pressable>) 
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}>
                <AppHeader title="Add Category" showCross onBack={goBack} />

                <Modal visible={modalVisible} animationType="slide" transparent={false} onRequestClose={() => {
                    setModalVisible(!modalVisible);}}>

                    <View style={styles.modalHeader}>
                        <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.crossContainer}> 
                            <Icon name='times' type='font-awesome' size={40}/> 
                        </Pressable>
                        <View style={styles.titleContainer}>
                            <Text style={styles.modalTitle}>Pick an icon</Text>
                        </View>
                    </View>

                    <View style={styles.flatlistContainer}>
                        <FlatList data={iconIndexArray} renderItem={renderIcon} keyExtractor={item => item.index} numColumns={5} 
                            contentContainerStyle={styles.iconList}/>
                    </View>
                </Modal>

                <View style={styles.iconNameContainer}>
                    <Pressable onPress={() => setModalVisible(true)} style={styles.dummyIcon}>
                        {getCategoryIcon(values.index, iconStyle)}
                    </Pressable>
                    <View style={styles.nameContainer}>
                        <Text style={styles.label}>Category name</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Category Name" style={styles.input} value={values.name} 
                                onChangeText={(v) => onChangeValue('name', v)} />
                        </View>
                    </View>
                </View>

                <Text style={styles.label}>Category group</Text>               
                <DropDownPicker open={open} value={values.parent} items={items} listMode="MODAL" modalProps={{ animationType: 'slide'}} searchable={false}
                    modalContentContainerStyle={styles.modalContainer}
                    placeholder="Select a Category Group" style={styles.pickerContainer}
                    setOpen={setOpen} onSelectItem={(v) => {
                            onChangeValue('parent', v.value)                           
                    }} setItems={setItems} zIndex={1000}
                    categorySelectable={true}
                />

                <Button style={styles.AddTransactionButton} onPress={onSend} title="Add Category"  />
            </TouchableOpacity>

        </SafeAreaView> );

}

export default React.memo(AddCategory);