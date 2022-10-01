import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import FormButton from "../form-button/form-button.component";
import './signin-form.component.scss'

import {useEffect} from 'react';

import { auth, 
    signInWithGooglePopup, 
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import { getRedirectResult } from "firebase/auth";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};




const SigninForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    useEffect( () => {
        (async () => {
        const response = await getRedirectResult(auth); //singleton for redirect
        console.log("redirect");
        console.log(response);
        if (response) {
        const {user} = response;
        const userDocRef = await createUserDocumentFromAuth(user);
        }
    })();
 }, []);

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const {user} = response;
        console.log(response); // contains ACCESS TOKEN
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const logGoogleRedirectUser = async () => {
        const response = await signInWithGoogleRedirect();
        const {user} = response;
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const onFormSubmit = async (event) => {
        event.preventDefault();
        
        if (!email || !password) return;
        if (password.length < 6) return;
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            const {user} = response;
            console.log(response);
            const userDocRef = await createUserDocumentFromAuth(user);

        }
        catch(Error) {
            switch(Error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('user ' + email +' not found')
                    break;
            }
            console.error(Error);
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
        
    }

    return (
        // html form
        <div className='sign-in-container'>
            <h2>Alread have an account</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={onFormSubmit}>
                <FormInput labelName="Email" type="email" name="email" value={email} required onChange={handleChange} />
                <FormInput labelName="Password" type="password" name="password" value={password} required onChange={handleChange}/>
                <div className='buttons-container'>
                    <FormButton children='Sign in' />
                    <FormButton type="Button" children='Google SignIn' style='google' onClick={logGoogleUser} />            
                </div>
            
            </form>
            
            <FormButton children='Sign In using googe redirect' style='google' onClick={logGoogleRedirectUser} />

        </div>
    )
}

export default SigninForm;
