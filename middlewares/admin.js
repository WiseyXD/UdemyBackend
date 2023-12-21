const Admin = require("../db/index");

async function adminMiddleware(req, res, next) {
    try {
        const username = req.headers.username;
        const password = req.headers.password;

        // Find the admin in the database
        const admin = await Admin.findOne({ username: username });

        // Check if the admin exists
        if (!admin) {
            return res.status(401).json({
                msg: "Admin Not Found",
            });
        }

        // Check if the provided password matches the stored password
        if (password !== admin.password) {
            return res.status(401).json({
                msg: "Invalid Password",
            });
        }

        // If the username and password are valid, proceed to the next middleware
        next();
    } catch (error) {
        console.error("Error in adminMiddleware:", error);
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
}

module.exports = adminMiddleware;
