import React, { ReactNode ,useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from "./appStore";
import { useNavigate } from "react-router-dom";

interface RedirectOnAuthProps {
    children: ReactNode;
}

const AdminRedirectOnAuth: React.FC<RedirectOnAuthProps> = ({ children }) => {
    const admin = useSelector((store: RootState) => store.admin);
    const navigate = useNavigate();

    useEffect(() => {
        if (admin.admin) {
            console.log(admin);
            navigate("/adminHome");
        }
    }, [admin, navigate]);


    return children
}

export default AdminRedirectOnAuth;
