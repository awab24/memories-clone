
// const mongoose = require('mongoose');
// const uri = "mongodb+srv://mern-js-mastry:mern-js-masty524@cluster0.8kkzll3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);



























// const { MongoClient, ServerApiVersion } = require("mongodb");

// // Replace the placeholder with your Atlas connection string
// const uri = "mongodb+srv://mern-js-mastry:mern-js-masty524@cluster0.8kkzll3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri,  {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     }
// );

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);






















 import express from 'express'
 import mongoose from 'mongoose'
 import cors from 'cors'
 import bodyParser from 'body-parser'
//  import postsRoutes from './routes/posts.js'
import { UUID } from 'mongodb'
import {v4 as uuid4} from 'uuid'
import { title } from 'process'
import jwt from 'jsonwebtoken'
import auth from './middleware/auth.js'
import router from './routes/posts.js'

 const app = express()
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: true}))
 app.use(cors())

import { DataModel } from './models/DataModel.js'



// //mongodb+srv://mern-js-mastry:mern-js-mastry524@cluster0.8kkzll3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
                      // mongodb+srv://mern-js-mastry:mern-js-mastry524@cluster0.8kkzll3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
                     // mongodb+srv://mern-js-mastry:mern-js-mastry524@cluster0.8kkzll3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
                      // mongodb+srv://mern-js-mastry:mern-js-mastry524@cluster0.8kkzll3.mongodb.net/
 const PORT =process.env.PORT || 5000
const connectMongooseAndInsert = async() => { ///connect and insert
//connect to mongooose
await  mongoose.connect("mongodb+srv://mongoose_check:mongoose_check524@cluster0.vgrghzd.mongodb.net/", {useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => app.listen(PORT,() => console.log`connected to mongodb sucessfully`))
 .catch((error) => console.log(error.message));

 //schema ssssssssss


let token;

//just for token
// // // // // // app.post('/api/endpoints',cors(),  (req,res) => {
// // // // // //     try{
// // // // // //      //seperate the req.body components
// // // // // //     const {_id, creator, title, message, tags, img, likesCounter} = req.body
// // // // // //     // console.log(req.body._id)


 

 //set the token
// // // // // // token = jwt.sign({_id: req.body._id}, 'tt')
// // // // // //   console.log(token)
// // // // // //  res.header('auth_token', token).send(token)

// // // // // //     } catch(error){
// // // // // // console.log(error.message)
// // // // // //     }
 
// // // // // //  }
// // // // // // )





 //schema eeeeeeeeeeeeeeee
// //  app.post('/api/endpoints/posts/:id',  (req,res) => {
// //     try{
// //      //seperate the req.body components
// //     const {_id, creator, title, message, tags, img, likesCounter} = req.body
// //     // console.log(req.body._id)
// // res.send(req.body)
// // console.log(req.body)
// //  DataModel.insertMany(req.body)

// //  //set the token

// //     } catch(error){
// // console.log(error.message)
// //     }
 
// //  }
// // )

}

connectMongooseAndInsert();
app.use( router)
app.patch('/api/endpoints/:id', cors(), async(req, res) => {
   let  {id: _id} = req.params
    
// const id = req.params
 _id = _id.replace(/"/g, '')
console.log((`req.params id is ya awab : ${_id}`))

 

// const post = req.body
    console.log(req.body)
//   if(!uuidValidate(_id)) return res.status(404).json('there is no post with that id')
    try{ 
   const updatedPost = await DataModel.findByIdAndUpdate( _id,req.body, {new: true, runValidators: true} )
   .then(console.log('updated sucessfully'))
    res.status(200).json({
        status: "success",  
        data: {
            DataModel: updatedPost
        }
    })
    }
    catch(error){
        console.log(error.message)
       res.status(404).json({
        status: "fail",
        message: error.message
       })
    }
    
})


   






export const createPost = async(req, res) => {


    const newPost = new DataModel(post)

try{
     
    await newPost.save();
    res.status(201).json(newPost)

} catch (error){
res.status(409).json({message: error.message})
}




}




//  app.use('/posts', postsRoutes)
//   app.get('/',(req, res) => {
//       res.send('hello from the / page')
//   })
//    app.post('/api/endpoints', async (req, res) => {
//       try {
//          const items = req.body.items;  // Assume the list is sent in the "items" field of the request body
//          const savedItems = await ListItem.insertMany(items.map(item => ({ name: item })));
//          res.status(201).json(savedItems);
//       } catch (error) {
//           res.status(500).json({ message: 'Error saving list', error });
//       }
 // });



//inserting start


// const insertData = async() => {
// await DataModel.insertMany(req.body)
// }

// insertData();
// //inserting end

//   //make the schema
//
 

//  app.post('/api/data', (req, res) => {
//     const newData = new DataModel(req.body);

//     newData.save()
//         .then(() => res.status(201).json({ message: 'Data saved successfully' }))
//         .catch(error => res.status(400).json({ error: error.message }));
// });
//  mongoose.set('useFindAndModify', false)

//we wanna make update for the post(req.body) with that certain id(req.params)


//make and save the new post



//lets make the route:


// export const updatedPost = async(req, res) => {
// const {id : _id} = req.params;
// const post = req.body;    
    
// if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with that id');

// const updatedPost = await postMessage.findByIdAndUpdate(_id, post, {new: true})

// res.json(updatedPost)

// }
  