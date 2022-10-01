// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword} from 'firebase/auth'
// there is also a facebookauth provider
import {getFirestore,
        doc,
        getDoc,
        setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqMBzSTanB6CypyIncFEvHSlZpFbVtRfo",
    authDomain: "clothingecommercedb.firebaseapp.com",
    projectId: "clothingecommercedb",
    storageBucket: "clothingecommercedb.appspot.com",
    messagingSenderId: "275036041154",
    appId: "1:275036041154:web:252e5a3fa2cdaaae40305b"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider(); //class
  provider.setCustomParameters({
    prompt: "select_account"
  })


  export const auth = getAuth(); // auth is a singleton
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
  



  // Firestore 

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const {uid, accessToken, displayName, email} = userAuth;
    const userDocRef = doc(db , 'users', uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // if userdata does not exist
    // create/set the document with the snapshot
    if (!userSnapshot.exists()) {
        const createdAt = new Date();
        try {
            setDoc(userDocRef, {
                displayName,
                email,
                accessToken,
                createdAt
            })
        }
        catch(error) {

        }
    }

    return userDocRef;
}

  // No need for provider
  export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  }