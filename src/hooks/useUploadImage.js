import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const storageRef = ref(storage);

// see https://firebase.google.com/docs/storage/web/start for Documentation

//Hook takes in userID ui, Uri (for local images)
export const useUploadProfileImage = async (uid, uri) => {
    let uploaded = false;
    let filename = uid;

    const response = await fetch(uri);
    const blob = await response.blob();

    const imageRef = ref(storage, `profilePictures/${filename}`);
    await uploadBytes(imageRef, blob).then((snapshot) => {
        uploaded = true;
    });
    if (uploaded) {
        const downloadURL = await getDownloadURL(imageRef);
        //console.log("Image URL: ", downloadURL);
        console.log("Image uploaded to Firestore");
        return downloadURL;
    } else {
        console.log("Image not uploaded // Error in hooks/useUploadImage.js")
        return null;
    }
}

export const useUploadPostImage = async (uid, uri) => {
    let uploaded = false;
    let filename = uid;

    const response = await fetch(uri);
    const blob = await response.blob();

    const imageRef = ref(storage, `postPictures/${filename}`);
    await uploadBytes(imageRef, blob).then((snapshot) => {
        uploaded = true;
    });
    if (uploaded) {
        const downloadURL = await getDownloadURL(imageRef);
        //console.log("Image URL: ", downloadURL);
        console.log("Image uploaded to Firestore");
        return downloadURL;
    } else {
        console.log("Image not uploaded // Error in hooks/useUploadImage.js")
        return null;
    }
}