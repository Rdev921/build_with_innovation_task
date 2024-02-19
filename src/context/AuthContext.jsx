import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
export const AuthContext = createContext();

const AuthCotextProvider = ({ children }) => {
        const [isAuth, setIsAuth] = useState(
                JSON.parse(localStorage.getItem('user')) || false
        );
        const [token, setToken] = useState(null);

        const loginUser = (token) => {
                setIsAuth(true);
                setToken(token)
        }

        const logoutUser = () => {
                setIsAuth(false);
                setToken(null)
                return <Navigate to={'/login'} />
        }

        useEffect(() => {
                if (isAuth) {
                        localStorage.setItem('user', JSON.stringify(isAuth));
                } else {
                        localStorage.removeItem('user');
                }
        }, [isAuth]);
        return <AuthContext.Provider value={{ isAuth, token, loginUser, logoutUser }}>
                {children}
        </AuthContext.Provider>
}
export default AuthCotextProvider;