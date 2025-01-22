import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify";

function Header() {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };

  const isDashboard = location.pathname === "/dashboard";
  const isHome = location.pathname === "/";
  const isLogin = location.pathname === "/login";

  // Define the page title dynamically
  const pageTitle = isDashboard
    ? "Welcome to Dashboard"
    : isLogin
    ? "Login Page"
    : "Homepage";

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>{pageTitle}</Navbar.Brand>
        <Nav className="ml-auto">
          {isDashboard && (
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => navigate("/")}
              style={{
                backgroundColor: "#6a11cb",
              }}
            >
              Go to Homepage
            </Button>
          )}
          {isHome && authUser && (
            <Button
              variant="primary"
              className="me-2"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          )}
          {isLogin && !authUser && (
            <Button
              variant="primary"
              className="me-2"
              onClick={() => navigate("/")}
            >
              Go to Homepage
            </Button>
          )}
          {authUser ? (
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            // Show Login button only if not logged in and not on the Login page
            !isLogin && (
              <Button
                variant="success"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
