import React, { useContext} from "react";
import {Navbar as HeroUiNavbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/authContext";

export default function NavBar(){
  const{isLoggedIn,setIsLoggedIn,setUserData}=useContext(authContext)
  console.log('nav'+ isLoggedIn)
const navigate=useNavigate()
  function logout(){
    localStorage.removeItem('token')
    setIsLoggedIn(false)
   navigate('/login')
  }

  function login(){
    navigate('/login')
  }
  function signUp(){
    navigate('/register')
  }
  console.log('nav'+ isLoggedIn)
    return(

            <HeroUiNavbar position="static">
              <NavbarBrand >
                <Link to={'/'} className="font-bold text-inherit" >CIRCLE</Link>
              </NavbarBrand>
              <NavbarContent className="hidden sm:flex gap-4" justify="center">
                
              </NavbarContent>
              <NavbarContent justify="end">
              {!isLoggedIn && <> <NavbarItem className="flex">
               <Button color="default" href="#" variant="flat" onPress={login}>
                    Login
                  </Button>
                </NavbarItem>
              
                <NavbarItem>
                  <Button color="primary" href="#" variant="flat" onPress={signUp}>
                    Sign Up
                  </Button>
                </NavbarItem></>
}
                {isLoggedIn&&<NavbarItem>
                  <Button color="danger" href="#" variant="flat" onPress={logout}>
                    Signout
                  </Button>
                </NavbarItem>}
              </NavbarContent>
            </HeroUiNavbar>
        
    )
}

