# api-create-file
Crea archivos de texto plano 

# API
https://api-create-file.herokuapp.com

## Tipos 
### csv 
use `/csv/` para archivos tipo csv
### txt
use `/txt/` pata texto plano
## Parametros:
`text=true`
`json=true`
`ext`;por defecto es .txt(solo para /txt/)
`header=Mi header` separado por delimeter si no se espesifica debe ser por ';'
`delimeter=;` el separador en csv 
`data=[]` puede ser un json,un string,un array y para csv un string separado por ';'

# Ejemplo csv con json
Ejemplo de una peticion:

```js
let url='https://api-create-file.herokuapp.com/csv/?json=true&data=[{"nombre":"andres","apellido":"ortega"},{"nombre":"camilo","apellido":"hernandez"}]'

```

# Ejemplo csv con json agregandole un header personalizado
Ejemplo de una peticion:
```js
let url='https://api-create-file.herokuapp.com/csv/?json=true&header=Nombre Cliente;Apellido Cliente&data=[{"nombre":"andres","apellido":"ortega"},{"nombre":"camilo","apellido":"hernandez"}]'

```


# Ejemplo csv con text agregandole un header personalizado
Ejemplo de una peticion:
```js
let url='https://api-create-file.herokuapp.com//csv/?text=true&header=Nombre Cliente;Apellido Cliente&data=["andres;ortega","camilo;hernandez"]'

```
```js
  fetch(url,{
        method:"post",
        body:JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(e=>e.json()).then(({msg,url})=>{
        if(url){
            window.open(url)
        }else if(msg){
            alert(msg)
        }
    })
```
