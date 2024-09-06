import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { useSelector } from "react-redux";

function Header(props) {
  let CartP = useSelector((state) => state.cart.cart);
  let totalQ = CartP.reduce((total, item) => {
    return total + item.amount;
  }, 0);
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className={classes.header}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Little Things
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/info">
              Know Us
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/wish">
              Your Wish
            </Nav.Link>
          </Nav>
          <Button
            variant="dark"
            className="justify-content-end"
            onClick={props.onShow}
          >
            Cart <Badge bg="secondary">{totalQ}</Badge>
          </Button>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
