import logo from './logo.png';
import { Button,Nav,Navbar,NavDropdown,Container } from 'react-bootstrap';

const head =  () => {
    return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">
        <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            style={{ borderRadius: 400/ 2}}
        />
      </Navbar.Brand>
      <Navbar.Brand href="/">Numerical</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Root Equation" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/">
                Bisection Methods
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/FalsePosition">
                Flase-Position Methods
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/OnePoint">
                One-Point Iteration Methods
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/TaylorSeries">
                Taylor Series
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/NewtonRapshon">
                Newton-Rapson Methods
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/Secant">
                Secant Methods
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Linear Equation" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/CramerRule">
                Cramer's Rule
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/Gauss">
                Gauss Elimination Methods
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/GaussJordan">
                Gauss Jordan Methods
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/MatrixInversion">
                Matrix Inversion Methods
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/LU">
                LU Decomposition Methods
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/Cholesky">
                Cholesky Decomposition Methods
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/Jacobi">
                Jacobi Iteration Methods
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/GaussSeidel">
                Gauss-Seidel Iteration Methods
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/Conjugate">
                Conjugate Gradient Methods
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default head;