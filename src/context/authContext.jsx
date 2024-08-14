import { createContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
    sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthState({ children }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Check authentication state on component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setIsAuth(true);
                navigate('/profile');  // Redirect to /profile if user is logged in
            } else {
                setUser(null);
                setIsAuth(false);
            }
        });
        return () => unsubscribe();  // Cleanup subscription on unmount
    }, [navigate]);

    // Handle input changes dynamically
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    // utils/validation.js
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
    // Handle Registration
    async function handleRegister(e) {
        e.preventDefault();
        const { email, password, name } = formData;
        if (email === '' || password === '' || name === '') {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Successfully registered
            if (userCredential.user) {
                await updateProfile(userCredential.user, {
                    displayName: name
                });
                setUser(userCredential.user);
                setIsAuth(true);
                setError(null);
                setFormData({ name: '', email: '', password: '' });  // Clear input fields
                navigate('/profile');  // Redirect to /profile
            }
        } catch (err) {
            setError(err.message);
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    // Handle Login
    async function handleLogin(e) {
        e.preventDefault();
        const { email, password } = formData;
        if (email === '' || password === '') {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Successfully logged in
            if (userCredential.user) {
                setUser(userCredential.user);
                setIsAuth(true);
                setError(null);
                navigate('/profile');  // Redirect to /profile
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

   // Handle Sign-Out
   async function handleSignOut() {
    setLoading(true);
    try {
        await signOut(auth);
        setUser(null);
        setIsAuth(false);
        navigate('/login');  // Redirect to /login after signing out
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
}
//handleResetSubmit
async function handlePasswordReset(email) {
    if (!email) {
        setError('Please provide an email address');
        return;
    }

    // Optional: Basic email format validation
    if (!isValidEmail(email)) {
        setError('Invalid email format');
        return;
    }

    setLoading(true);
    try {
        await sendPasswordResetEmail(auth, email);
        return 'Password reset email sent!';
    } catch (err) {
        // Handle specific Firebase Auth errors
        if (err.code === 'auth/invalid-email') {
            setError('The email address is badly formatted.');
        } else if (err.code === 'auth/user-not-found') {
            setError('No user found with this email address.');
        } else {
            setError('An error occurred. Please try again.');
        }
        return null;
    } finally {
        setLoading(false);
    }
}

    return (
        <AuthContext.Provider value={{
            formData,
            setFormData,
            handleChange, // Provide handleChange to be used in both forms
            handleRegister,
            handleLogin,
            handleSignOut,
            handlePasswordReset,
            isAuth,
            user,
            error,
            loading,
            setIsAuth,
            setUser,
            setError,
            setLoading,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

