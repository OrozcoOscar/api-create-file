# api-create-file
Crea archivos de texto plano 

# API
https://api-create-file.herokuapp.com

## Tipos 
### csv 
use /csv/ para archivos tipo csv
### txt
use /txt/ pata texto plano
## Parametros:
text=true
json=true
ext; por defecto es .txt(solo para /txt/)
header=string separado por delimeter si no se espesifica debe ser por ';'
delimeter=/*el separador en csv*/
data;puede ser un json en string,un string y para csv un string separado por ';'

# Ejemplo csv con json
Ejemplo de una peticion:
```
csv/?json=true&data=[{"nombre":"andres","apellido":"ortega"},{"nombre":"camilo","apellido":"hernandez"}]
```
<a target="_blanc" href='https://api-create-file.herokuapp.com/csv/?json=true&data=[{"nombre":"andres","apellido":"ortega"},{"nombre":"camilo","apellido":"hernandez"}]
'>Click aquí para ver<a/>


# Ejemplo csv con json agregandole un header personalizado
Ejemplo de una peticion:
```
csv/?json=true&header=Nombre Cliente;Apellido Cliente&data=[{"nombre":"andres","apellido":"ortega"},{"nombre":"camilo","apellido":"hernandez"}]
```
<a target="_blanc" href='https://api-create-file.herokuapp.com/csv/?json=true&header=Nombre Cliente;Apellido Cliente&data=[{"nombre":"andres","apellido":"ortega"},{"nombre":"camilo","apellido":"hernandez"}]'>Click aquí para ver<a/>

# Ejemplo csv con text agregandole un header personalizado
Ejemplo de una peticion:
```
/csv/?text=true&header=Nombre Cliente;Apellido Cliente&data=["andres;ortega","camilo;hernandez"]
```

<a target="_blanc" href='https://api-create-file.herokuapp.com/csv/?text=true&header=Nombre Cliente;Apellido Cliente&data=["andres;ortega","camilo;hernandez"]'>Click aquí para ver<a/>


