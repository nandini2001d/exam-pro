import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Navigation/Navigation.css'
import { Link, NavLink } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';
import { BiPlus } from 'react-icons/bi';

export default function Navigation() {

    const navi=[
        {to:"/",name:'Add',icone:<BiPlus/>},
        {to:"/view",name:'View',icone:<BsEye/>}
    ]

  return (
  <>
<nav class="navbar navbar-expand-lg navbar-light bg-light"
style={{borderBottom:"1px solid black",boxShadow:"20px 20px 400px gray",position:"fixed",top:"0",right:"0",left:"0",zIndex:"1000"}}>
  <div class="container-fluid">
    <Link class="navbar-brand" to="#"><img src='/img/logo1.jpg' alt='logo' style={{height:"65px",width:"100%"}}/></Link>

    <div class="d-flex" id="navbarSupportedContent">
    <form class="d-flex">
      {navi.map((value,id) => {
              return (
               
                  <NavLink className="nav-link mx-3" key={id} to={value.to}>
                  {value.icone} {value.name}
                  </NavLink>
             
              );
            })}
        
      </form>
    </div>
  </div>
</nav>
  </>
  )
}
