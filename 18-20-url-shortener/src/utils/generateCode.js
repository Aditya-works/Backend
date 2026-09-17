import crypto from "crypto"

const generateCode=()=>{
    //this console.log(crypto.randomBytes(6).toString("base64").slice(0,6))
//or
      const mainString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      let shortCode = ""
      for (let i =0;i<6;i++){
        shortCode +=mainString.charAt(Math.floor(Math.random()*62))
      }
      return shortCode
}

export default generateCode;