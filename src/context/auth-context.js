import React from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    loggout: () => { },
});

export const AuthContextProvider = (props) => {

    const userToken = localStorage.getItem('token');

    const [isLoggedIn, setIsLoggedIn] = React.useState(!!userToken);

    React.useEffect(() => {

        if (userToken) {
            setIsLoggedIn(true);
        }
        console.log(isLoggedIn);
    }, [isLoggedIn, userToken]);

    const getUserCredentials = () => {
        const userId = localStorage.getItem('userId');
        const userEmail = localStorage.getItem('userEmail');

        return {
            userToken,
            userId,
            userEmail,
        };
    };


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