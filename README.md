# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project 
[The Image Filtering Microservice](https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code), the final project for the course. It is a Node-Express application which runs a simple script to process images. [My assignment]

I  associated 2 postman collections for this project to Try out the beanstalk and Local NodeJs 

1. cloud-cdnd-c2-final.postman_collection (local Host )
2. cloud-cdnd-c2-final.postman_collection-beanstalk-hostname (beanstalk App)




### Setup Node Environment (locally )

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`
3. open postman collection  cloud-cdnd-c2-final.postman_collection.json
4. create jwt token from jwt api .
5. verify this token by adding it to the path ex :  
http://{{HOST}}/verifyToken/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNTkwODM0NTUxLCJleHAiOjE1OTA4MzgxNTF9.nVtzqt_pQHHFxRLWsdpvQkfb75M3ESsiu7a-GRfgVn0

6 . Add bearer token authentication to the filteredimage API and the image url to the query .



### Create a new endpoint in the server.ts file

The starter code has a task for you to complete an endpoint in `./src/server.ts` which uses query parameter to download an image from a public URL, filter the image, and return the result.

We've included a few helper functions to handle some of these concepts and we're importing it for you at the top of the `./src/server.ts`  file.

```typescript
import {filterImageFromURL, deleteLocalFiles} from './util/util';
```

### Deploying your system

Follow the process described in the course to `eb init` a new application and `eb create` a new environment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.

## Stand Out (Optional)

### Refactor the course RESTapi

If you're feeling up to it, refactor the course RESTapi to make a request to your newly provisioned image server.

### Authentication

Prevent requests without valid authentication headers.
> !!NOTE if you choose to submit this, make sure to add the token to the postman collection and export the postman collection file to your submission so we can review!

### Custom Domain Name

Add your own domain name and have it point to the running services (try adding a subdomain name to point to the processing server)
> !NOTE: Domain names are not included in AWS’ free tier and will incur a cost.
