import React, { ReactNode ,useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from "./appStore";
import { useNavigate } from "react-router-dom";

interface RedirectOnAuthProps {
    children: ReactNode;
}

const RedirectOnAuth: React.FC<RedirectOnAuthProps> = ({ children }) => {
    const user = useSelector((store: RootState) => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.user) {
            console.log(user);
            navigate("/home");
        }
    }, [user, navigate]);


    return children
}

export default RedirectOnAuth;
