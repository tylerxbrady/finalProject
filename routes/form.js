const express = require("express");


module.exports = function() {

    const router = express.Router();

    router.get("/", (request, response) => { 
        response.render("form");
       });
      
    return router;
};