import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function ProtectedRoutes(Props) {
    const {Component} = Props;
    const navigate = useNavigate();
    useEffect(()=> 
    {
        let login = localStorage.getItem('isLoggedIn');
        if(!login){
            navigate('/signin');
        }
    });
    return <div>
        <Component/>
    </div>
}

export default ProtectedRoutes;