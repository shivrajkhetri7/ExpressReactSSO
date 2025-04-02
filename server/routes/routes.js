const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require('axios')
const { createUser, validateUser } = require("../controller/userController");
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const generateToken = (req, res, next) => {
    console.log(req?.body)
    try {
        /**
         *  @param body {name, firstName, lastName, dob, contact, password, confirmPassword}
         */
        const body = req?.body || {}
        const token = jwt.sign(body, SECRET_KEY, { expiresIn: "1h" });

        req.token = token;
        next();
    } catch (error) {
        res.status(500).json({ message: "Error generating token", error: error.message });
    }
};

const verifyToken = (req, res, next) => {

    const token = req.headers["authorization"];
    console.log('token', token)

    if (!token) {
        return res.status(403).json({ message: "Token required" });
    }

    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

router.get("/", (req, res) => {
    res.json({ status: "successful" });
});

router.post("/signin", async (req, res) => {
    try {
        const response = await validateUser(req?.body)
        const token = jwt.sign({ userId: response.userId, username: response.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: "Sign-in successful", token });
    } catch (error) {
        res.status(500).json({ error: error?.message || "server error" });
    }

});

router.post("/signup", generateToken, async (req, res) => {
    try {
        res.cookie("token", req.token, {
            httpOnly: true,
            secure: "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        });
        const response = await createUser(req?.body)
        res.json({ message: "Token generated successfully", token: req.token });
    } catch (error) {
        res.status(500).json({ error: 'something went wrong' })
    }

});

router.post("/protected", verifyToken, (req, res) => {
    res.json({ message: "Protected data accessed", user: req.user });
});

router.post("/refresh-token", (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(403).json({ message: "Refresh token required" });

    jwt.verify(refreshToken, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });

        const newAccessToken = jwt.sign({ userId: decoded.userId }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ accessToken: newAccessToken });
    });
});

// var options = {
//   method: 'PATCH',
//   url: 'https://dev-cleotwwixnrp37lv.us.auth0.com/api/v2/clients/5h37UGT9hnSp3vNejqUsZNaNdiHahb5r',
//   headers: {
//     'content-type': 'application/json',
//     authorization: 'Bearer API2_ACCESS_TOKEN',
//     'cache-control': 'no-cache'
//   },
//   data: {initiate_login_uri: 'https://express-react-sso.vercel.app/'}
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });

module.exports = router;
