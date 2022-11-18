const express = require('express');
const router=express.Router()
const path = require('path');
const fs = require('fs').promises
console.clear()
async function unlink(url) {
    console.log("del",url)
   await  fs.unlink(url).then(() => {
        console.log('File removed')
      }).catch(err => {
        console.error('Something wrong happened removing the file', err)
      })

}
async function Makefile(res,namef,body){
    await fs.writeFile(path.join(__dirname,'../files/'+namef),body).then(async()=>{
        console.log("A new file is created")
        res.send({"url":"https://api-create-file.herokuapp.com/download/"+namef})
        setTimeout(()=>{
            unlink(path.join(__dirname,'../files/'+namef))
        },120000);
    })
}
router.get("/",(req,res)=>{
    res.redirect('https://github.com/OrozcoOscar/api-create-file');
})
router.post("/csv",async (req,res)=>{
    let {name,text,json,delimiter,header}=req.query
    let data =req.body
    
    if(text){
        if(!header)header=""
        else header+="\n"
        let body=(header)
        try{
            console.log(data)
            data=eval(data)
            data.map(e=>body+=e+"\n")
            if(!name)name="";
            let namef=name+"_"+Date.now()+".csv"
            Makefile(res,namef,body);
        }catch(e){
            res.send({"err":"Data is Not correct;format : ['valor1;valor2','valor1;valor2'...]"})
        }
    }else if(json){
        let body=""
        let myjson;
        try{
            
            myjson=JSON.parse(JSON.stringify(data))
            
            if(header){
              body=header+"\n";
            }else{
                for(let i in myjson[0]){
                    body+=i+(delimiter || ";")
                }
                body=body.substr(0,body.length-1)
                body+="\n";
            }
            
            myjson.map(e=>{
                for(let i in e){
                    body+=e[i]+(delimiter || ";")
                }
                body=body.substr(0,body.length-1)
                body+="\n";
            })
            if(!name)name="";
            let namef=name+"_"+Date.now()+".csv"
            Makefile(res,namef,body);
        }catch(e){
            res.send({"err":"Data JSON is Not correct;format : [{\"atrr\":\"value\"}]"})
        }
        
    }else{
        res.send({"msg":"validate the JSON or TEXT data must be equal to true"})
    }
    
})
router.post("/txt",async (req,res)=>{
    let {text,json,ext,name}=req.query
    let data =req.body
    if(!ext)ext=".txt"
    if(text){
        let body=data
        if(!name)name="";
        let namef=name+"_"+Date.now()+ext
        Makefile(res,namef,body);
    }else if(json){
        let body=""
        let myjson;
        try{
            myjson=myjson=JSON.parse(JSON.stringify(data))
            myjson.map(e=>{
                for(let i in e){
                    body+=i+":"+e[i]+"\n";
                }
                body+="------------------------\n";
            })
            if(!name)name="";
            let namef=name+"_"+Date.now()+ext
            Makefile(res,namef,body);
        }catch(e){
            res.send({"err":"Data JSON is Not correct;format : [{\"atrr\":\"value\"}]"})
        }
        
    }else{
        res.send({"msg":"validate the JSON or TEXT data must be equal to true"})
    }
    
    
})
router.get("/download/:file",async (req,res)=>{
    res.download(path.join(__dirname,'../files/'+req.params.file))
})
module.exports=router
