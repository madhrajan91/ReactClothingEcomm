



import { useState } from "react";
import { createAuthUserWithEmailAndPassword,  createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import FormButton from "../form-button/form-button.component";
import './signup-form.component.scss'


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};



const SignupForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const onFormSubmit = async (event) => {
        event.preventDefault();
        console.log(displayName + " " + email + " " + password +" " + confirmPassword);
        
        if (!displayName || !email || !password || !confirmPassword) return;
        if (password != confirmPassword) return;
        if (password.length < 6) return;
        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);
            let {user} = response;
            user['displayName'] = displayName;
            const userDocRef = createUserDocumentFromAuth(user);

            console.log(userDocRef);
        }
        catch(Error) {
            console.error(Error);
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
        
    }

    return (
        // html form
        <div className='sign-up-container'>
            <h2>Don't have an account</h2>
            <span>Sign up with your email</span>
            <form onSubmit={onFormSubmit}>
                <FormInput labelName="Display Name" type="text" name="displayName" value={displayName} required onChange={handleChange}/>
                <FormInput labelName="Email" type="email" name="email" value={email} required onChange={handleChange} />
                <FormInput labelName="Password" type="password" name="password" value={password} required onChange={handleChange}/>
                <FormInput labelName="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} required onChange={handleChange}/> <br />
                <FormButton children='Sign up' />
            </form>
        </div>
    )
}

export default SignupForm;