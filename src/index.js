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
app.use(cors()); // <---- use cors middleware
 app.use("/",require("./routes/index")); 
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})