const express = require('express')
const port = process.env.PORT || 8080;
const app = express();
const path = require('path');
const router = express.Router();


app.use(express.static(path.join(__dirname+'/public')))

router.get('/',function(req,res){

    res.sendFile(path.join(__dirname+'/home.html'));
    
    //__dirname : It will resolve to your project folder.
  });
  
  
  //add the router
  app.use('/', router);
  app.listen(process.env.PORT || 8080);
  
  console.log('Running at Port 8080');