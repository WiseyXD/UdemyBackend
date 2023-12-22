const {User} = require("../db/index");

async function userMiddleware(req, res, next) {
    try {
        const username = req.headers.username;
        const password = req.headers.password;

        // Find the user in the database
        const user = await User.findOne({ username: username });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({
                msg: "User Not Found",
            });
        }

        // Check if the provided password matches the stored password
        if (password !== user.password) {
            return res.status(401).json({
                msg: "Invalid Password",
            });
        }

        // If the username and password are valid, proceed to the next middleware
        next();
    } catch (error) {
        console.error("Error in userMiddleware:", error);
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
}

module.exports = userMiddleware;
