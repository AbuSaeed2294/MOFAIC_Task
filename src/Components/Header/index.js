import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { setAdminRole, setRegistrarRole } from "../../Redux/Action/roleAction";
import "./Header.module.css";

const Header = ({ userType, setUserType }) => {
  const dispatch = useDispatch();

  const role = useSelector((state) => state.role.role);

  useEffect(() => {
    setUserType(role);
  }, [role]);

  return (
    <Navbar expand="lg" className=" navbarColor">
      <Container>
        <Navbar.Brand href="/">MOFAIC</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="">
            <NavDropdown title={userType} id="basic-nav-dropdown">
              <NavDropdown.Item
                // href="/"
                onClick={() => dispatch(setAdminRole())}
              >
                Admin
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                // href="/"
                onClick={() => dispatch(setRegistrarRole())}
              >
                Registrar
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
