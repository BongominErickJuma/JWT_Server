import users from "../users/users.js";
import jwt from "jsonwebtoken";

// Secret key for signing JWT
const SECRET_KEY = "your_secret_key"; // Replace with an environment variable for security

const login_get = (req, res) => {
  res.status(200).send("This is a Login Form");
};

const signup_get = (req, res) => {
  res.status(200).send("This is a Sign Up Form");
};

const login_post = (req, res) => {
  const { name, password } = req.body;
  const loggedInUser = users.find((user) => user.name === name);

  if (loggedInUser) {
    if (password === loggedInUser.password) {
      // Generate a JWT
      const token = jwt.sign(
        { id: loggedInUser.id, name: loggedInUser.name },
        SECRET_KEY,
        {
          expiresIn: "1h", // Token expires in 1 hour
        }
      );

      res.status(200).send({
        message: `Login Successful, Welcome ${name}`,
        token: token, // Return the token
        user: loggedInUser,
      });
    } else {
      res.status(401).send({
        message: `Wrong password`,
      });
    }
  } else {
    res.status(400).send({
      message: `User not Found`,
    });
  }
};

const signup_post = (req, res) => {
  const { name, password, cardDetails } = req.body;
  const id = users.length + 1;
  const newUser = {
    id: id,
    name: name,
    password: password,
    cardDetails: { ...cardDetails }, // In production, hash this password using bcrypt
  };
  users.push(newUser);
  console.log(users);
  res.status(200).send({
    message: "Signup successful",
  });
};

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .send({ message: "Unauthorized: Token Expired" });
        }
        return res.status(403).send({ message: "Forbidden: Invalid Token" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send({ message: "Unauthorized: No Token Provided" });
  }
};

export { login_get, signup_post, login_post, signup_get, authenticateJWT };
