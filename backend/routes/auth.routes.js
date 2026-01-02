import express from "express"
import { googleAuth, resetPassword, sendOtp, signIn, signOut, signUp, verifyOtp } from "../controllers/auth.controllers.js"

const authRouter=express.Router()


authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn)
authRouter.get("/signout",signOut)
authRouter.post("/send-otp",sendOtp)
authRouter.post("/verify-otp",verifyOtp)
authRouter.post("/reset-password",resetPassword)
authRouter.post("/google-auth",googleAuth)

export default authRouter


// POST is used to send data to the server to create or modify something.
// Example:

// /signup → sends user registration data.
// /signin → sends login credentials.
// /send-otp, /verify-otp, /reset-password, /google-auth → all send data to perform actions.
// GET is used to retrieve data from the server without modifying anything.
// Example:

// /signout → just triggers a logout action (no data sent in body).
