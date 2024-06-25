import jwt from 'jsonwebtoken';
import { signUpModel } from '../models/SignUp.js';
import bcryptjs from 'bcryptjs';
import { DataModel } from '../models/DataModel.js';
import { json } from 'express';

// Initialize variables
let postID;
let user;
let userEmail;
let findUser;
let findUserPostsIDs =[];
let showEditAndDelete = false;

//insert postData
export const insertPostData = async(req, res) => {
  await DataModel.insertMany(req.body)
}

// Create post
export const getUser = async (req, res) => {
  try {
    user = req.body;
    userEmail = req.body.email;



    await signUpModel.insertMany(req.body);


    findUser = await signUpModel.findOne({ email: userEmail });
    console.log('findUser.postsIDs from the getUser controller =>', findUser.postsIDs + 'for userEmail' + userEmail);
    console.log('User itself =>', user);
    console.log('User email is =>', userEmail);


    // You can add additional logic here if needed
    findUserPostsIDs = findUser.postsIDs;
    console.log('findUserPostsIDs from getUser => => => '+ findUserPostsIDs)
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error in createPost:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
///////////////////////////////////////////////////////////////////////////////////
// Get post ID and update user posts
export const getPostId = async (req, res) => {
  try {
    if (user) {
      
      postID = req.params.id;
      console.log('req.params from postID which i am suspected => =>'+postID+'<= <= <=')
console.log('to check if the url is from handle submit or not'+JSON.stringify(req.params))
      console.log('Post ID is =>', postID);
      console.log('User email from getPostID  is =>', userEmail);


      console.log('User from the DB =>', findUser);

console.log('postID in compare logic => => =>'+postID);
     
      // (!findUser.postsIDs.includes(postsIDsPostID))? 

      // // // //case one if it is a new id
      //  await signUpModel.findOneAndUpdate(    
      //        {email: userEmail},
      //          {$push: {postsIDs: postID}},
      //        {new: true}
      //        ):
      // // //       // case two if it is already exists
      // // //        null
      
    
  if (!findUser.postsIDs.includes(postID)){
    await signUpModel.findOneAndUpdate(
      {email: userEmail},
      {$push: {postsIDs: postID}},
     {new: true}
    )
  }


      // await signUpModel.findOneAndUpdate(
      //   { email: userEmail },
      //   { $push: { postsIDs: postID } },
      //   { new: true }
      // );

      console.log('findUSer from the getPostID controller => => => => '+findUser)
      findUserPostsIDs = findUser.postsIDs;

      res.json(findUser);
    } else {
    console.log( 'Please sign up to share your memories' );
    }
  } catch (error) {
    console.error('Error in getPostId:', error);

  }
};
/////////////////////////////////////////////////////////////////////////////////////////////
// Compare post ID with user's post IDs
///////////////////////////////////////////////////////////////////////////////////xxxx////////////////////////////////xxxxx//////////
export const comparePostIDPostIDs = async (req, res) => {

    // // if (!findUserPostsIDs) {
    // //   return res.status(400).json({ message: 'Posts IDs not found' });
    // // }

    // // // Ensure findUserPostsIDs is an array
    // // if (!Array.isArray(findUserPostsIDs)) {
    // //   findUserPostsIDs = JSON.parse(findUserPostsIDs);
    // // }

 

  res.json(findUserPostsIDs)
    console.log( 'postIDs which will be sent to the front => => => '+findUserPostsIDs);

};
///////////////////////////////////////////xx///////////////xxx////////////////////xx///////////////////////////////xx///////////////////
// Send the findUser to the frontend
export const sendUserToTheFrontEnd = async (req, res) => {
  console.log('awab');
  res.json(findUser);
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    let _id = req.params.id;

    console.log('This is the ID from the deletePost backend', _id);
    console.log('This is the body from the deletePost backend', req.body);

    await DataModel.findOneAndDelete({ _id });

  } catch (error) {
    console.error('Error in deletePost:', error);

  }
};


export const fetchDB = async (req, res) => {
  try {
    const allData = await DataModel.find();
 
   res.json(allData)
   
  } catch (err) {
    console.log('fetchingdb err => => => => =>' + err);
    res.status(500).send('Error fetching data');
  }
};



// // export const fetchDB = async(req, res)=>{
// //   DataModel.find((err, val)=>{

// //     if(err){
// //       console.log('fetchingdb err => => => => =>'+err)
// //     }else{
// //       res.json(val)
// //     }
// //   })
// // }





















export const logData = async(req, res) => {
  console.log(req.body); 

}
let token;

export const jwtSign = async(req,res, next) => {

 token = jwt.sign({_id: req.params}, 'tt', {expiresIn: "1h"})
await signUpModel.insertMany({
  _id: '242',
  name: 'awab',
  lastName: 'hassan',
  email: 'ahmed',
  password: 'abdalla',
  confirmPassword:'abdalla',
})
  console.log(token);

  next();

}
export const jwtVerify = async(req, res, next) => {

  const decodedData = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0IiwiaWF0IjoxNzE4MDMxMDQ0fQ.-Bbd7cEPf0E8MzWC7PjTBhB94KDmTui0ElfBmyIiEVg', 'tt')

  console.log(decodedData)
  next();
}

//sign in controller

export const signIn = (req, res) =>{
//get email & password  
const {email, password} = req.body
 email = req.body.email
password = req.body.password
//check if they are in the db~
const user = signUpModel.findOne(email)
if(!user) return res.status(404).json({message: 'user doesnt exist'})
//if exist make the token with the id 
/////////////////////////////////////////token related step => => => make a new token when sign in
if (user){
  try{
    const token = jwt.sign({_id: user._id}, 'tt')
    res.status(200).json({result: user, token})
  }

  catch(error){
    res.status(500).json({message: 'user does not exist'})
  }
}

}

//sign up
export const signup = async(req, res) => {
const {email, password, confirmPassword, firstName, lastName} = req.body;

try{
  //check if the the req.body is already exist
  const existingUser = await signUpModel.findOne({email});
  if(existingUser) return res.status(400).json({message: "user already exists"})
   // check if the passwords are not the same
    if(password !== confirmPassword) return res.status(400).json({message: "passwords don't match"})

    //hash the password //dont forgot //dont forgot //dont forgot //dont forgot //dont forgot //dont forgot
    const result =  await signUpModel.insertMany({email, password, confirmPassword, firstName, lastName})
    const token = jwt.sign({_id: req.body._id}, 'tt')
    res.status(200).json({ token})//i didn't do the result part beacause i dont now what is the user.create

      
}catch(error){
  res.status(500).json({message: 'something went wrong'})
}
}


//1718030989


// export const makeToken = (req, res) => {

// }

// //  export const getPosts =async (req, res) => {
// //     const DataModel = await DataModel.find()
// //    try{
// //    res.status(200).json(DataModel)    }
// //    catch(error){
// //      res.status(404).json({message: error.message})
// //     }
// //  }
 
// // export const createPost = async (req, res) => {
// //  const post = req.body
// //     const newPost = new DataModel(post)
// //     try{       await newPost.save()
// //         res.send(201).json(newPost)
// //     }
// //     catch(error){
// //         res.send(409).json({message: error.message})
// //     }

// // }

// // export const updatedPost = async (req, res) => {
// //     const {id: _id} = req.params
// //     const post  = req.body

// //     if(mongoose.types.objectId.isValid(_id)) return res.status(404).send('No post with that id')

// //       const updatedPost =  DataModel.findByIdAndUpdate(_id, post, {new: true});
// //       res.json(updatedPost)
// // }


//lets create the update function



    // try{
    //     //seperate the req.body components
    //   //   const {_id, creator, title, message, tags, img, likesCounter} = req.body
    //     // console.log(req.body._id)
    //   //    res.send(req.body)
    //   //   console.log(req.body)
    //   //    DataModel.insertMany(req.body)
    
    //   //set the token
    //   const token = req.header('auth_token')
    //   console.log('token from req.header => '+token)
    // console.log('AWBssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
    //     } catch(error){
    //  console.log(error.message)
    //     }

   