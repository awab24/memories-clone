import express from 'express'
import cors from 'cors'
import auth from '../middleware/auth.js';
import { getUser, deletePost, jwtSign, jwtVerify, logData, signIn, signup, getPostId, sendUserToTheFrontEnd, comparePostIDPostIDs, fetchDB, insertPostData} from '../controllers/posts.js'

const router = express.Router();






//make the router for every function with the url here and in the frontend



//insertData
router.post('/api/endpoints/postData/:id', cors(),insertPostData, ()=>{

} )



router.delete('/api/endpoints/delete/:id', cors(),auth, deletePost,() => {
    // const {id, _id} = req.params
    // _id = _id.replace(/"/g, '')


 
})


router.post('/api/endpoints/signUp/:id',cors(),auth, getUser ,()=>{
    
})



//get the user and insert the post id on it
router.post('/api/endpoints/:id', cors(), auth,getPostId, () => {

})

//send the user to the frontend


//////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/api/endpoints/comparePostIDPostIDs', cors(), auth,comparePostIDPostIDs, () => {

})


// router.get('/', getposts);
router.post('/api/endpoints/token/signIn/:id',cors(),signIn, ()=> {
    // console.log(req.params)
    //  const sendToken = jwt.sign({_id: req.params}, 'tt')
    //  console.log(sendToken)
    //  res.status(200).json ('auth_token',sendToken).send(sendToken)
     console.log('token is working')
    
})
router.post('/api/endpoints/signUp',cors(), () => {
    console.log('problem is from the signUp controller and also the psition of the url')
  
})





router.get('/api/endpoints/fetchAll', cors(), fetchDB,() => {
    
})




// // try{
// //     router.post('/posts', async( req, res) => {
// //         try{
// //          console.log(req.header('auth_token')) 
            
// //         // console.log('req.header token from the single unit => '+reqToken)
// //         }
// //         catch(error){
// //             console.log(error.message)
// //         }



// //     //  const idAndIat = jwt.verify(reqToken, 'tt')
// //     //  console.log('idAndIat => '+String(idAndIat))
// // })
// // }
// // catch(error){
// //     console.log(error.message)
// // }


export default router;




// function safeStringify(obj, space) {
//     const cache = new Set();
//     return JSON.stringify(obj, (key, value) => {
//         if (typeof value === 'object' && value !== null) {
//             if (cache.has(value)) {
//                 return; // Circular reference found, discard key
//             }
//             cache.add(value);
//         }
//         return value;
//     }, space);
// }







//  import express from 'express'
//  const router = express.Router()
//   import { getPosts, updatedPost} from '../controllers/posts.js'

//  router.get('/', getPosts)
// router.patch('api/endpoints/:id', updatedPost)
//  export default router;