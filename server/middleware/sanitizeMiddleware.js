const asyncHandler = require("express-async-handler");
const xss = require("xss")

const cleanObject = (obj) =>{
    console.log("asdfa___asf",obj);
    for(let key in obj){
        if(obj.key && typeof obj[key] === 'object' && !Array.isArray(obj[key])){
            cleanObject(obj[key])
        }else if(typeof obj[key]=== 'string'){
            obj[key] = xss(obj[key])
        }
    }
    return obj;
}

const sanitizeMiddleware = asyncHandler(async(req,res,next)=>{
    const skipRoutes = ['/api/users/upload-profile']
    if(skipRoutes.includes(req.path)){
        return next();
    }
    //prevent XSS attacks
    req.body = cleanObject(req.body || {})
    req.query = cleanObject(req.query || {})
    req.params = cleanObject(req.params || {})

    next();
})
module.exports= sanitizeMiddleware;