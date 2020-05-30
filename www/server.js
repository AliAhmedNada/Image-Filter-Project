"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("./util/util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const is_image_1 = __importDefault(require("is-image"));
const request_1 = __importDefault(require("request"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Init the Express application
    const app = express_1.default();
    // Set the network port
    const port = process.env.PORT || 8082;
    // Use the body parser middleware for post requests
    app.use(body_parser_1.default.json());
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
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send("try GET /filteredimage?image_url={{}}");
    }));
    // App JWT token generator 
    app.get("/jwt", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const jwt_token = jsonwebtoken_1.default.sign({
            data: 'foobar'
        }, 'secret', {
            expiresIn: 60 * 60
        });
        res.send({
            jwt: jwt_token
        });
    }));
    // App JWT Token verifier 
    app.get("/verifyToken/:jwt", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.params.jwt);
        var decoded = jsonwebtoken_1.default.decode(req.params.jwt);
        // get the decoded payload and header
        var decoded = jsonwebtoken_1.default.decode(req.params.jwt, {
            complete: true
        });
        res.send({
            status: decoded
        });
    }));
    // getting Image Url with Filter
    app.get("/filteredimage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Authentication validation 
        // Authentication validation\
        console.log(req.headers.authorization);
        var token = req.headers.authorization.split(' ')[1];
        if (!token)
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        yield jsonwebtoken_1.default.verify(token, 'secret', function (err, decoded) {
            if (err)
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        });
        //checking for errors in URL reponse 
        var err;
        const options = {
            url: req.query.image_url
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
            }
            else {
                var err = true;
                res.status(422).send({ message: "url response isnt valid or corrupted" });
            }
        }
        request_1.default(options, callback);
        if (!err) {
            var isImageflag = yield is_image_1.default(req.query.image_url.toString());
            if (isImageflag) {
                var filteredImage = yield util_1.filterImageFromURL(req.query.image_url.toString());
                res.status(200).sendFile(filteredImage);
                console.log(filteredImage);
                res.on('finish', function () {
                    util_1.deleteLocalFiles([filteredImage]);
                });
            }
            else {
                res.status(422).send({
                    message: "url sent isnt an Image"
                });
            }
        }
    }));
    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map