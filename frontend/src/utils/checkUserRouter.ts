import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/appStore'; 

interface CheckUserRouterProps {
  children: ReactNode;
}

const CheckUserRouter: React.FC<CheckUserRouterProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.user) {
      navigate("/");
    }
  }, [user.user, navigate]);

  if (!user.user) {
    return null;
  }

  return children
};

export default CheckUserRouter;
