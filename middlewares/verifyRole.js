const verifyRole=(allowedRoles)=>{
    return (req,res,next)=>{
        if(!req?.role) return res.status(401).json({msg:"unauthorized no request"});
        const result = allowedRoles.includes(req.role);
        if(!result) return res.status(401).json({msg:"unauthorized"});
        next();
    }
}

module.exports = verifyRole;