import jwt from 'jsonwebtoken'


const auth = async(req, res, next) => {
   const ID = req.body._id? req.body._id : req.params;
        const token = jwt.sign({_id: ID}, 'tt')
        console.log('req.header from auth => '+ token +'if yes then it is all about the router')
        //  const isCustomAuth = token.length < 500;

         let decodedData;

    try{
        decodedData = jwt.verify(token, 'tt')
        console.log(decodedData)
        req.userId = decodedData?.id
      next();
    }catch(error){      
console.log(error)
    }

            // decodedData = jwt.decode(token);   
            // req.userId = decodedData?.sub;

}

export default auth;