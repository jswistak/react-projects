import React from 'react';
import { useEffect, useState } from "react";
import { NavLink, Outlet } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';


const Layout = () => {
    return (
        <div>
            <NavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                };
              }}
            to={`/`}>
                Home
            </NavLink>
            <br />
            <NavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                };
              }}
            to={`/about`}>
                About
            </NavLink>
            <NavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                };
              }}
            to={`/cars`}>
                Cars
            </NavLink>
            
            

            <Outlet />

        </div>
    )
}
export default Layout;