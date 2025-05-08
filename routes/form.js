const express = require("express");


module.exports = function(portNumber) {

    const router = express.Router();

    router.get("/", (request, response) => { 
        response.render("form", {port: portNumber});
       });
      
    return router;
};