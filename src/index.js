const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors= require('cors')

app.set('port',process.env.PORT || 3000);
app.set("json spaces",2)
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'));
app.use(express.json());
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions)) ; // <---- use cors middleware
 app.use("/",require("./routes/index")); 
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})
