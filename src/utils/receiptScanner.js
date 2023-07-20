import { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';


export async function receiptScanner(launchCamera) {
    let base64;
    // Launch Camera Does not work??

    // if (launchCamera) {
    //     // const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    //     await ImagePicker.requestCameraPermissionsAsync();
    //     let permissionResult = await ImagePicker.getCameraPermissionsAsync();
    //     if (permissionResult.granted === false) {
    //       Alert.alert("You've refused to allow this app to access your camera!");
    //       return;
    //     } else {
    //         console.log("Granted");
    //         await ImagePicker.launchCameraAsync({
    //         allowsEditing: true,
    //         base64: true,
    //         // mediaTypes: ImagePicker.MediaTypeOptions,
    //         // quality: 1,
    //         }).catch((error) => console.log(error));
    //         return;
    //         // .then((response) => {
    //         //     // if (!response.cancelled) {
    //         //     // }
    //         //     console.log(response);
    //         //     return response;
    //         // })
    //     } 
        
    // } 

    // Launch Image Library
    let uri
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        //aspect: [1, 1],
        quality: 0.2,
        });

    if (result.assets) {
        uri = result.assets[0].uri;
    } else {
        return;
    }
    base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });   


    // Send to API
    var myHeaders = new Headers();
    myHeaders.append("apikey", "helloworld");

    var formdata = new FormData();
    formdata.append("language", "eng");
    formdata.append("isOverlayRequired", "false");
    formdata.append("iscreatesearchablepdf", "false");
    formdata.append("issearchablepdfhidetextlayer", "false");
    formdata.append("OCREngine", "2");


    formdata.append("base64image", 'data:image/jpeg;base64,' + base64);
    formdata.append("filetype", "jpg");

    // For Receipt Scanning:
    formdata.append("isTable", "true");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    // Note: /t represents tab, /r return, /n newline.

    function parseReceipt(receiptObject) {
        if (typeof (receiptObject) === 'object') {
            const parsedResults = receiptObject.ParsedResults[0];
            // console.log("Parsed Results: ", parsedResults);
            return parseReceiptText(parsedResults.ParsedText);
        }
        else if (typeof (receiptObject) == 'string') {
            window.alert(receiptObject)
        }
    }

    function parseReceiptText(receiptText) {
        // extremely reliant on this one receipt
        let receiptContent = receiptText.split("\t\r\n").map(element => {
            return element.toLowerCase().replace('\t', ' ');
        });

        console.log("Receipt Content:", receiptContent);
        let date, total, store, transactionDescription = "";
    
        // Replace all characters except for numbers and decimal: //old: replace(/\D/g, '')
        // Assuming first thing is Shop name:
        store = receiptContent[0];
        date = receiptContent[receiptContent.findIndex(v => v.includes("date"))];
        totalIndex = receiptContent.findIndex(v => v.includes("total"));
        total = receiptContent[totalIndex].replace(/[^0-9.]/g, '');
        
    
        function containsNumbers(str) {
            return /\d/.test(str);
        }

        // Assuming the stuff has a price next to it: We add line with numbers to the description
        for (i = 0; i < totalIndex; i++) {
            if (containsNumbers(receiptContent[i])) {
                transactionDescription = transactionDescription + "\n" + receiptContent[i];
            }
        }

        const details = {
            date: date,
            total: total,
            store: store,
            transactionDescription: transactionDescription,
        };

        // console.log(details);
        return details;
    }

    return fetch("https://api.ocr.space/parse/image", requestOptions)
    .then(response => response.json())
    .then(result => parseReceipt(result))
    .catch(error => console.log('error', error));

};



    // const VAT = receiptContent[20].replace(/\D/g, '');
    // const receipt = {
    //     store: receiptContent[0].split('\t')[1],
    //     date: receiptContent[6].split(" ")[0],
    //     subtotal: subTotal.substring(0, subTotal.length - 2) + "." + subTotal.substring(subTotal.length - 2),
    //     total: receiptTotal.substring(0, receiptTotal.length - 2) + "." + receiptTotal.substring(receiptTotal.length - 2),
    //     vat: VAT.substring(0, VAT.length - 2) + "." + VAT.substring(VAT.length - 2),
    // }