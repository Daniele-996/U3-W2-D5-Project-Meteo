import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyMeteo
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/details">
            Details
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
