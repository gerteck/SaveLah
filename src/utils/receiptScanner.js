import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ToastAndroid } from 'react-native';

export async function receiptScanner(launchCamera) {
    let base64;

    if (launchCamera) {
        // const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        await ImagePicker.requestCameraPermissionsAsync();
        let permissionResult = await ImagePicker.getCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            ToastAndroid.showWithGravity("Application does not have permission to access your camera", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            return;
        } else {
            const response = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            base64: true,
            quality: 0.7,
            })
            .then((response) => {
                if (!response.canceled) {
                    base64 = response.assets[0].base64;
                }
                // console.log(response);
                return response;})
            .catch((error) => console.log(error));
            if (response.canceled) {
                return;
            }
        } 
    } 
    
    // Launch Image Library
    else { 
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
    }

    // Send to API
    var myHeaders = new Headers();
    myHeaders.append("apikey", "K87435773488957");
    // can use "helloworld" as key as well (default);

    var formdata = new FormData();
    formdata.append("language", "eng");
    formdata.append("isOverlayRequired", "false");
    formdata.append("iscreatesearchablepdf", "false");
    formdata.append("issearchablepdfhidetextlayer", "false");
    formdata.append("OCREngine", "2");
    // Can choose to use OCREngine 1, 2 or 3

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
            console.log("Parsed Results: ", parsedResults);
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
        totalIndex = receiptContent.findIndex(v => {
            return !v.includes("sub") && v.includes("total");
        });
        if (totalIndex != -1) {
            //remove all characters before "Total:"
            total = receiptContent[totalIndex].slice(receiptContent[totalIndex].indexOf("total"));
            // remove all characters:
            total = total.replace(/[^0-9.]/g, '');
        }
        
        function containsNumbers(str) {
            return /\d/.test(str);
        }

        // Assuming the stuff has a price next to it: We add line with numbers to the description
        for (i = 1; i < totalIndex; i++) {
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

        return details;
    }

    return fetch("https://api.ocr.space/parse/image", requestOptions)
    .then(response => response.json())
    .then(result => parseReceipt(result))
    .catch(error => console.log('error', error));

};