import { getStorage, ref, uploadBytes } from "firebase/storage";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const storageRef = ref(storage);

const metadata = {
    contentType: 'image/jpeg',
};

export const useUploadImage = async (uri) => {
    // fetch content from arbitary URL
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    const imageRef = ref(storage, filename);
    uploadBytes(imageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob (Image)!');
    });
}