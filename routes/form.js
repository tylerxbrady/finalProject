const express = require("express");


module.exports = function(port) {

    const router = express.Router();

    router.get("/", (request, response) => { 
        response.render("form", {port: port});
       });
      
    return router;
};