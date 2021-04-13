import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const handleGoogleSignIn = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            const {displayName, email} = result.user;
            const signedInUser = {name:displayName,email};
            setLoggedInUser(signedInUser);
            history.replace(from);

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }
    return (
        <div className="text-center">
            <button className="btn btn-outline-info" onClick={handleGoogleSignIn}>Continue With Google</button>
        </div>
    );
};

export default Login;