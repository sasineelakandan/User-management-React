import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";
import axios from "axios"; // Assuming you're using axios for making the POST request

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1z6B26tRRuK4ECvPgk4MN11hBqdS-M_g",
  authDomain: "user-management-2ba93.firebaseapp.com",
  projectId: "user-management-2ba93",
  storageBucket: "user-management-2ba93.appspot.com",
  messagingSenderId: "269381049812",
  appId: "1:269381049812:web:16784dffb89c1fa48d4a41",
  measurementId: "G-5F0FCTT7RJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize storage
const storage = getStorage(app);

// Function to upload images to Firebase Storage and Firestore
export async function uploadImagesToFireStore(image, userid) {
  try {
    // Create a reference to the file in storage
    const storageRef = ref(storage, `images/${image.name}`);

    // Upload the image
    await uploadBytes(storageRef, image);
    console.log('Uploaded a blob or file!');

    // Get the download URL
    const url = await getDownloadURL(storageRef);

    // Post the URL to your API
    const response = await axios.patch('http://localhost:8000/Images', { url, userid }, { withCredentials: true });
    
    // Return the response
    return response.data.url;
  } catch (error) {
    throw new Error(error.message);
  }
}