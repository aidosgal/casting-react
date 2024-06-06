import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { BiCameraMovie } from "react-icons/bi";
import { useLocation } from 'react-router-dom';

export default function Layout() {

  const ThisRoute = useLocation();

  const isAuth = localStorage.getItem('isAuth');

  useEffect(() => {
    if (isAuth == true || ThisRoute.pathname === '/login') {
      console.log('Авторизован');
    }else{
      //location.href = '/login';
    }
  }, [isAuth]);

  return (
    <div className="roboto-regular px-60 py-10">
      <Outlet/>   
    </div>
  );
}
