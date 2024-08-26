import jwtDecode from "jwt-decode";

// Assuming the token is stored in localStorage or a state
const token = localStorage.getItem("access_token"); // Or get from context or props

if (token) {
  try {
    const decodedToken = jwtDecode(token);

    // Now you can access the username or any other information from the token payload
    const username =
      decodedToken.username || decodedToken.sub || decodedToken.email;

    console.log("Username:", username);
  } catch (error) {
    console.error("Invalid token:", error);
  }
} else {
  console.error("No token found");
}
