import jwt from "jsonwebtoken"

const genToken=async (userId) => {
    try {
        const token= jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"}) // kitne din baad ye cookie expire hojyga mtlb khud se logout after 7 days
        return token
    } catch (error) {
        console.log(error)
    }
}

export default genToken