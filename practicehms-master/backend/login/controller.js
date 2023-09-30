// authController.js

const patient = require("../PatientAuth/model");

const login = async (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@gmail.com" && password === "admin") {
        res.status(200).json({
            user: {
                _id: "admin",
                name: "admin",
                email: "admin@gmail.com",
            },
            role: 'admin',
            message: "Login successful"
        });
    } else {
        try {
            const patients = await patient.find({ email: email });

            if (patients.length === 0) {
                res.status(401).json({
                    message: "User not found"
                });
            } else {
                if (patients[0].password === password) {
                    res.status(200).json({
                        user: patients[0],
                        role: 'user',
                        message: "Login successful"
                    });
                } else {
                    res.status(401).json({
                        message: "Password incorrect"
                    });
                }
            }
        } catch (error) {
            console.error(error);
            res.status(401).json({
                message: "Email and password incorrect"
            });
        }
    }
};

module.exports = {
    login,
};
