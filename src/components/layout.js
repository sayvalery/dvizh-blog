import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Движ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Главная</Nav.Link>
            <Nav.Link href="/blog">Блог</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container>
        {children}
      </Container>

      <div className="footer text-center">
        © 2022 Your Website
      </div>
    </>
  );
};

export default Layout;