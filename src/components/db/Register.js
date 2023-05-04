import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [favorites, setFavorites] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    // Encryption that is useless because we are saving checksums to the server but ok :/
    const encryptedPassword = encryptPassword(password);

    const data = {
      email: email,
      username: username,
      password: encryptedPassword,
      favorites: "{[]}"
    };

    try {
      const response = await fetch('http://localhost:3050/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Registration successful");
        // registration successful, redirect to login page
        window.location.href = "/login";
      } else {
        console.error("Error registering user:", responseData.message);
        // registration failed so it displays error message
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      // registration failed so it displays error message
      alert("Registration failed. Please try again.", error);
    }
  };

  return (
    <Form onSubmit={handleRegister}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

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

      <Form.Group controlId="formBasicFavorites">
        <Form.Label>Favorites</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter favorites as JSON object"
          value={JSON.stringify(favorites)}
          onChange={(e) => setFavorites(JSON.parse(e.target.value))}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
}

function encryptPassword(password) {
  // add encryption logic here
  return password;
}

export default RegistrationForm;
