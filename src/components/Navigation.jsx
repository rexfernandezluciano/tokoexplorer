/** @format */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { HouseDoor, InfoCircle } from "react-bootstrap-icons";
import {
  Navbar,
  Nav,
  Container,
  Image,
} from "react-bootstrap";

export default function Navigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => {
    setIsNavOpen(false);
  };

  // Close dropdown when clicking outside or navigating
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    closeNav(); // Close mobile menu on route change
  }, [location]);

  // Check if current route is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky-top">
      <Navbar bg="white" expand="lg" className="border-bottom shadow-sm">
        <Container>
          {/* Brand Logo */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center"
            onClick={closeNav}
          >
            <Image
              src={require("../contents/images/toko.png")}
              alt="Toko Logo"
              className="me-2"
              style={{ width: 40, height: 40 }}
            />
            <span className="fw-bold text-primary">Block Explorer</span>
          </Navbar.Brand>

          {/* Mobile Toggle Button */}
          <Navbar.Toggle onClick={toggleNav} aria-controls="basic-navbar-nav" className="border-0 shadow-none" />

          {/* Navigation Links */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-lg-center">
              {/* Home Link */}
              <Nav.Link
                as={Link}
                to="/"
                className={`d-flex align-items-center mx-2 ${
                  isActive("/") ? "active fw-bold" : ""
                }`}
                onClick={closeNav}
              >
                <HouseDoor className="me-1" size={18} />
                Home
              </Nav.Link>

              {/* About Link */}
              <Nav.Link
                as={Link}
                to="/about"
                className={`d-flex align-items-center mx-2 ${
                  isActive("/about") ? "active fw-bold" : ""
                }`}
                onClick={closeNav}
              >
                <InfoCircle className="me-1" size={18} />
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}