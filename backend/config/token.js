import jwt from "jsonwebtoken";

const tokenGen = async (userId) => {
    try {
        let token = jwt.sign({ id: userId }, process.env.JWT_Secret, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.log("Error in token generation.");
    }
}


export default tokenGen;