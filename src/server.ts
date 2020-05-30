import express from 'express';
import bodyParser from 'body-parser';
import {
  filterImageFromURL,
  deleteLocalFiles
} from './util/util';
var jwt = require('jsonwebtoken');
const isImage = require('is-image');
const request = require('request');


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query  --> done
  //    2. call filterImageFromURL(image_url) to filter the image --> done 
  //    3. send the resulting file in the response --> done 
  //    4. deletes any files on the server on finish of the response --> done
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });
  // App JWT token generator 
  app.get("/jwt", async (req, res) => {
    const jwt_token = jwt.sign({
      data: 'foobar'
    }, 'secret', {
      expiresIn: 60 * 60
    });
    res.send({
      jwt: jwt_token
    });
  });

  // App JWT Token verifier 
  app.get("/verifyToken/:jwt", async (req, res) => {
console.log(req.params.jwt)
    var decoded = jwt.decode(req.params.jwt);

    // get the decoded payload and header

    
    var decoded = jwt.decode(req.params.jwt, {
      complete: true
    });
    res.send({
      status: decoded
    })

  });

  // getting Image Url with Filter
  
  app.get("/filteredimage",async (req, res) => {
// Authentication validation 

    // Authentication validation\
    console.log(req.headers.authorization)
    var token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    await jwt.verify(token, 'secret', function(err: any, decoded: any) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    });
//checking for errors in URL reponse 
var err ;
const options = {
  url: req.query.image_url
};
function callback(error: any, response: { statusCode: number; }, body: any) {
  if (!error && response.statusCode == 200) {

  }else 
  {
    var err=true;
   res.status(422).send({message: "url response isnt valid or corrupted"})
  }
}
request(options, callback)

if (!err){
    var isImageflag =  await isImage(req.query.image_url)
    if (isImageflag) {
      var filteredImage = await filterImageFromURL(req.query.image_url.toString())
      res.status(200).sendFile(filteredImage);
      console.log(filteredImage)
      res.on('finish', function(){
        deleteLocalFiles([filteredImage]);
   });
      } else {
      res.status(422).send({
        message: "url sent isnt an Image"
      })

    }}
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${ port }`);
    console.log(`press CTRL+C to stop server`);
  });
})();