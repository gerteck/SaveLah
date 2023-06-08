import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const storageRef = ref(storage);

// see https://firebase.google.com/docs/storage/web/start for Documentation

export const useUploadImage = async (uri) => {
    let uploaded = false;
    const metadata = {
        contentType: 'image/jpeg',
    };

    // fetch content from arbitary URL
    const response = await fetch(uri);
    const blob = await response.blob();
    let filename = uri.substring(uri.lastIndexOf('/') + 1);

    // add timestamp to file name.
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + "-time-" + Date.now() + '-.' + extension;

    const imageRef = ref(storage, `images/${filename}`);
    await uploadBytes(imageRef, blob).then((snapshot) => {
        uploaded = true;
        //console.log("Uploaded: ",uploaded)
        //console.log('Uploaded a blob (Image)!');
    });
    if (uploaded) {
        const downloadURL = await getDownloadURL(imageRef);
        console.log("Image URL: ", downloadURL);
        return downloadURL;
    } else {
        console.log("Image not uploaded // Error in hooks/useUploadImage.js")
        return null;
    }
    


}