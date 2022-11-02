const express = require('express');
const router=express.Router()
const path = require('path');
const fs = require('fs').promises
async function unlink(url) {
    console.log("del",url)
   await  fs.unlink(url).then(() => {
        console.log('File removed')
      }).catch(err => {
        console.error('Something wrong happened removing the file', err)
      })

}
router.get("/",(req,res)=>{
    res.send(`
    use /csv/ para archivos tipo csv y /txt/ pata texto plano <br>
  [<br>
    Parametros: <br>
    text=true,<br>
    json=true,<br>
    ext; por defecto es .txt(solo para /txt/)<br>
    header=string separado por delimeter si no se espesifica debe ser  por ';',<br>
    delimeter=/*el separador en csv*/,<br>
    data;puede ser un json en string,un string y para csv un string separado por ';'<br>
    ]
    <br>
    Ejemplo <b>csv</b> con json 
    <br> 
    <a href='/csv/?json=true&data=[{"nombre":"andres","apellido":"ortega"},{"nombre":"camilo","apellido":"hernandez"}]'>/csv/?json=true&data=[{"nombre":"andres","apellido":"ortega"},{"nombre":"camilo","apellido":"hernandez"}]</a>
    <br> <br>
    Ejemplo <b>csv</b> con json agregandole un header personalizado
    <br> 
    <a href='/csv/?json=true&header=Nombre Cliente;Apellido Cliente&data=[{"nombre":"andres","apellido":"ortega"},{"nombre":"camilo","apellido":"hernandez"}]'>/csv/?json=true&header=Nombre Cliente;Apellido Cliente&data=[{"nombre":"andres","apellido":"ortega"},{"nombre":"camilo","apellido":"hernandez"}]</a>
    <br> <br> 
    Ejemplo <b>csv</b> con text
    <br> 
    <a href='csv/?text=true&header=Nombre Cliente;Apellido Cliente&data=["andres;ortega","camilo;hernandez"]'>/csv/?text=true&header=Nombre Cliente;Apellido Cliente&data=["andres;ortega","camilo;hernandez"]</a>
    
    `)
})
router.get("/csv",async (req,res)=>{
    let {text,data,json,delimiter,header}=req.query
    if(text){
        if(!header)header=""
        else header+="\n"
        let body=(header)
        try{
            data=eval(data)
            data.map(e=>body+=e+"\n")
        }catch(e){
            res.send({"err":"Data is Not correct;format : ['valor1;valor2','valor1;valor2'...]"})
        }
        
        let name=Date.now()+".csv"
        await fs.writeFile(path.join(__dirname,'../files/'+name),body).then(async()=>{
            console.log("se Creo un nuevo arcihvo")
            res.download(path.join(__dirname,'../files/'+name))
            setTimeout(()=>{
                unlink(path.join(__dirname,'../files/'+name))
            },60000)
        });
    }else if(json){
        let body=""
        let myjson;
        try{
            myjson=JSON.parse(data)
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
        }catch(e){
            res.send({"err":"Data JSON is Not correct;format : [{\"atrr\":\"value\"}]"})
        }
        
        let name=Date.now()+".csv"
        await fs.writeFile(path.join(__dirname,'../files/'+name),body).then(async()=>{
            console.log("se Creo un nuevo arcihvo")
            res.download(path.join(__dirname,'../files/'+name))
            setTimeout(()=>{
                unlink(path.join(__dirname,'../files/'+name))
            },60000)
        });
    }else{
        res.send({"msg":"validate the JSON or TEXT data must be equal to true"})
    }
    
})
router.get("/txt",async (req,res)=>{
    let {text,data,json,ext}=req.query
    if(!ext)ext=".txt"
    if(text){
        let body=data
        let name=Date.now()+ext
        await fs.writeFile(path.join(__dirname,'../files/'+name),body).then(async()=>{
            console.log("se Creo un nuevo arcihvo")
            res.download(path.join(__dirname,'../files/'+name))
            setTimeout(()=>{
                unlink(path.join(__dirname,'../files/'+name))
            },60000)
        });
    }else if(json){
        let body=""
        let myjson;
        try{
            myjson=JSON.parse(data)
        }catch(e){
            res.send({"err":"Data JSON is Not correct;format : [{\"atrr\":\"value\"}]"})
        }
        myjson.map(e=>{
            for(let i in e){
                body+=i+":"+e[i]+"\n";
            }
            body+="------------------------\n";
        })
        let name=Date.now()+ext
        await fs.writeFile(path.join(__dirname,'../files/'+name),body).then(async()=>{
            console.log("se Creo un nuevo arcihvo")
            res.download(path.join(__dirname,'../files/'+name))
            setTimeout(()=>{
                unlink(path.join(__dirname,'../files/'+name))
            },60000)
        });
    }else{
        res.send({"msg":"validate the JSON or TEXT data must be equal to true"})
    }
    
    
})
module.exports=router