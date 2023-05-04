import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // encrypt password before sending to server
    const encryptedPassword = encryptPassword(password);
  
    // send login data to server via API
    const data = {
      username: username,
      password: encryptedPassword
    };
  
    try {
      const response = await fetch('http://localhost:3050/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log("Login successful");
  
        // save username and token to localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("token", responseData.token);
  
        // redirect to home page
        window.location.href = "/";
      } else {
        console.error("Error logging in user:", responseData.message);
        // login failed, display error message
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      // login failed, display error message
      alert("Login failed. Please try again.");
    }  
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

function encryptPassword(password) {
  // add encryption logic here
  return password;
}

export default LoginForm;
