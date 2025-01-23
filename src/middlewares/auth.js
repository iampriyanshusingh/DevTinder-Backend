const authAdmin = (req,res,next) => {
    const token = "xyz";
    const verifyAuthentication = token === "xyz";
    if(!verifyAuthentication){
        res.status(401).send("Authentication Failed");
    }else{
       next();
    }
}

const authUser = (req,res,next) =>{
    const token = "xyz";
    const verifyAuthentication = token === "xyz";
    if(!verifyAuthentication){
        res.status(401).send("Authentication Failed");
    }else{
        next();
    }
} 

module.exports={
    authAdmin,
    authUser,
};