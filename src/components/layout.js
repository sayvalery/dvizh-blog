import * as React from "react"
import { Link } from "gatsby"
import { Container, Navbar, Nav } from 'react-bootstrap'

const Layout = ({ children }) => {
  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">My Site</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/page-2">Page 2</Nav.Link>
            <Nav.Link as={Link} to="/page-3">Page 3</Nav.Link>
            {/* Add more Nav.Links as needed */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main>{children}</main>
    </Container>
  )
}

export default Layout