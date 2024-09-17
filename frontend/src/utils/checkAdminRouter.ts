import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/appStore'; 

interface CheckUserRouterProps {
  children: ReactNode;
}

const CheckAdminRouter: React.FC<CheckUserRouterProps> = ({ children }) => {
  const admin = useSelector((state: RootState) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin.admin) {
      navigate("/admin");
    }
  }, [admin.admin, navigate]);

  if (!admin.admin) {
    return null;
  }

  return children
};

export default CheckAdminRouter;