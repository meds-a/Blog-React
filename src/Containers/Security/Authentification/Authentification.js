// Librairies
import React, { useState, useEffect } from 'react';
import { checkValidity } from '../../../shared/utility'
import classes from './Authentification.module.css';
import fire  from '../../../config/firebase';

// Composants
import Input from '../../../Components/UI/Input/Input';
import routes from '../../../config/routes';
import { toast } from 'react-toastify';



function Authentification(props) {

    // State
    const [inputs, setInputs] = useState({
        
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: "Email"
            },
            value:  '',
            label: 'Adresse email',
            valid: false,
            validation: {
                required: true,
                email:    true
            },
            touched: false,
            errorMessage: "L'adesse email n'est pas valide."
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: "Password"
            },
            value:  '',
            label: 'Le mot de passe',
            valid: false,
            validation: {
                required: true,
                minLength: 6
                
            },
            touched: false,
            errorMessage: "Le mot de passe doit faire au moins 6 caractères."
        }
    });

    const [valid, setValid] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [loginError,setLoginError] = useState(false);

    // ComponentDidUpdate
    useEffect(()=> {
        document.title = 'Authentification';
    });

    // Fonctions

     const inputChangedHandler = (event, id) => {

        // Change la valeur
        const nouveauxInputs = {...inputs};
        nouveauxInputs[id].value = event.target.value;
        nouveauxInputs[id].touched = true;

        // Vérification de la valeur
        nouveauxInputs[id].valid = checkValidity(event.target.value, nouveauxInputs[id].validation);

        setInputs(nouveauxInputs);

        // Vérification du formulaire
        let formIsValid = true;
        for (let input in nouveauxInputs) {
            formIsValid = nouveauxInputs[input].valid && formIsValid;
        }
        setValid(formIsValid);
    };

    const registerClikedHandler    =   ()  =>  {
        // console.log('Inscriptio,');
        const user  = {
            email: inputs.email.value,
            password: inputs.password.value
        }

        // console.log(user);
        fire
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(response => {
                toast.success('Bienvennue');
                props.history.push(routes.HOME);
            })
            .catch(error => {
                //Adresse email doublons
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setEmailError(true)
                        break;
                
                    default:
                        break;
                }

            });

    }
    
    const loginClikedHandler    =   ()  =>  {
        // console.log('Connexion');
        const user  = {
            email: inputs.email.value,
            password: inputs.password.value
        }
        // console.log(user);
        fire
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(response => {
                toast.success('vous revoici !')
                props.history.push(routes.HOME);
            })
            .catch(error => {
                // console.log(error);
                switch (error.code) {
                    case "auth/invalide-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setLoginError(true);                       
                        break;
                
                    default:
                        break;
                }
            });

    }

    const formHandler = event  => {
        event.preventDefault();
    }

    // Variables
    const formElementsArray = [];
    for (let key in inputs) {
        formElementsArray.push({
            id: key,
            config: inputs[key]
        });
    }

    let form = (
        <form onSubmit={(e) => formHandler(e)}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    id={formElement.id}
                    value={formElement.config.value}
                    label={formElement.config.label}
                    type={formElement.config.elementType}
                    config={formElement.config.elementConfig}
                    valid={formElement.config.valid}
                    touched={formElement.config.touched}
                    errorMessage={formElement.config.errorMessage}
                    changed={(e) => inputChangedHandler(e, formElement.id)} />
            ))}
            <div className={classes.buttons}>
                <button onClick={registerClikedHandler} disabled={!valid} className={classes.button}>Inscription</button>
                <button onClick={loginClikedHandler} disabled={!valid} className={classes.button}>Connexion</button>
            </div>
        </form>
    );

    return (
        <>
            <h1>Authentification</h1>
            <div className={classes.form}>
            {loginError ? <div className={classes.alert}>Impossible de vous identifier</div> : null }
            {emailError ? <div className={classes.alert}>Cette adresse email est déja utilisée.</div> : null }
                {form}
            </div>
        </>
    );
}

export default Authentification;