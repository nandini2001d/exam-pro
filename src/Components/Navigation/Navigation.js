import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Navigation/Navigation.css";
import { Link, NavLink } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

export default function Navigation() {
  const [state, setState] = useState("light-theme");

  useEffect(() => {
    const savethem = localStorage.getItem("theme");
    if (savethem) {
      setState(savethem);
      document.body.className = savethem;
    }
  }, []);

  const toogleTheme = () => {
    const newTheme = state === "light-theme" ? "dark-theme" : "light-theme";
    setState(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  const navi = [
    { to: "/", name: "Add", icone: <BiPlus /> },
    { to: "/view", name: "View", icone: <BsEye /> },
  ];

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          borderBottom: "1px solid var(--text-color)",
          backgroundColor: "var(--background-color)",
          boxShadow: "20px 20px 400px gray",
          position: "fixed",
          top: "0",
          right: "0",
          left: "0",
          zIndex: "1000",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <img
              src="/img/logo1.jpg"
              alt="logo"
              style={{ height: "65px", width: "100%" }}
            />
          </Link>

          <div className="d-flex" id="navbarSupportedContent">
            <form className="d-flex">
              {navi.map((value, id) => {
                return (
                  <NavLink className="nav-link mx-3" key={id} to={value.to}>
                    {value.icone} {value.name}
                  </NavLink>
                );
              })}

              {localStorage.getItem("theme") === "light-theme" ? (
                <CiLight
                  className="n"
                  style={{
                    fontSize: "25px",
                    marginTop: "3px",
                    fontWeight: "bold",
                    color: "var(--text-color)",
                  }}
                  onClick={toogleTheme}
                />
              ) : (
                <MdDarkMode
                  className=" n"
                  style={{
                    fontSize: "25px",
                    marginTop: "3px",
                    fontWeight: "bold",
                    color: "var(--text-color)",
                  }}
                  onClick={toogleTheme}
                />
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
