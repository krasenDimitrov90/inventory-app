import React from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    loggout: () => { },
});

export const AuthContextProvider = (props) => {

    const token = localStorage.getItem('token');

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const getUserCredentials = () => {
        const userToken = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const userEmail = localStorage.getItem('userEmail');

        return {
            userToken,
            userId,
            userEmail,
        };
    }


    const loginHandler = (token, userId, email) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userEmail', email);
        setIsLoggedIn(true);
    };

    const loggoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
    };

    const contextValue = {
        token: token,
        isLoggedIn,
        login: loginHandler,
        loggout: loggoutHandler,
        getUserCredentials,
    };

    return (
        <AuthContext.Provider value={contextValue} >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;