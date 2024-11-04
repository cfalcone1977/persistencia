import fs from 'fs';
import path from 'path';
import * as readlinesync from 'readline-sync';
//file sistem

//chea existencia archivo
export function check(path){
   if (fs.existsSync(path)){
                            console.log("El archivo existe.");
                            return true;
                           }else {
                             console.log("El archivo no existe");
                             return false; 
                           }

}

//permite buscar un ID en un archivo y devuelve su indice
export function checkID(path,posicionID){
    if (check(path)){
                     const elementos=leer(path);
                     for (let indice = 0; indice < elementos.length; indice=indice+1) {
                        if ((elementos[indice].ID)==posicionID) {
                                                                return indice;
                                                               }   
                    }
                     if (indice==elementos.length-1) {
                                return -1;
                               }
                    }


}

//funcion que permite leer un archivo
export function leer(path) {
    if (check(path)) {
                       //Accedemos con fs al archivo y lo transformamos de objeto JSON a objeto JAVA (parse)
                      const result=JSON.parse(fs.readFileSync(path,"utf-8"));
                      console.log('Datos Leidos: ');
                      console.table(result)
                      return result;
                     } else {
                            console.log('Archivo no encontrado.');
                            return [];
                     }
    
}

export function escribirArch(data,path) {
          fs.writeFileSync(path,JSON.stringify(data,null,2));
          console.log("Datos escritos correctamente en",path);
}

function obtenerId(inventario){
  if (inventario.length===0){
                            ID==1;
                            return ID;
                           } else {
                                    let mayorID=0;
                                    //busco el mayor ID iterando el arreglo y lo guardo en mayorID
                                    for (let indice = 0; indice <= inventario.length-1; indice=indice+1) {
                                        console.log(inventario[indice].ID);
                                        if (inventario[indice].ID>mayorID){
                                                                           mayorID=inventario[indice].ID;
                                                                          }
                                    }
                                    //retorno el mayor valor de ID + 1, que seria el ID del siguiente producto.
                                    return mayorID+1;
                                  }
}

//encuetra el ID buscado y devuelve su indice en el arreglo o -1 si no existe
function encontrarID(inventario,elemento){   
let indice=0;    
for (indice = 0; indice < inventario.length; indice=indice+1) {
     console.log(indice,inventario[indice].ID,elemento);
     if ((inventario[indice].ID)===elemento) {
                                             console.log("INDICE",indice);
                                             return indice;
                                            }   
}
if (indice===inventario.length-1) {
             return -1;
            }

}

//encuetra el nombre buscado y devuelve su indice en el arreglo o -1 si no existe
function encontrarPropiedad(inventario,propiedad){   
    let indice=0; 
    for (indice = 0; indice < inventario.length; indice=indice+1) {
         if ((inventario[indice].producto)===propiedad) {
                                                 return indice;
                                                }   
    }
    if (indice===inventario.length-1) {
                 return -1;
                }
    
    }



export function guardar(path,data){
    if (check(path)){
        const nuevoId=(obtenerId(leer(path))); //obtengo un nuevo ID
        const inventario=leer(path); //obtengo el arreglo 
        const productoNuevo={ID:nuevoId,...data};//armo el nuevo elemento a ingresar en el arreglo y luego en el archivo.
        inventario.push(productoNuevo); //agrego en arreglo inventario el nuevo elemento.
        escribirArch(inventario,path);
                    } else {
                            [];
                           } 

}
export function reemplazarProducto(path,IndElement){
      if (check(path)){
                       let arreglo=leer(path);
                       //let indice=encontrarID(arreglo,elemento);
                       //if (indice!=-1){
                       console.warn("---DATOS de PRODUCTO a reemplazar---");
                       console.warn(`Producto: ${arreglo[IndElement].producto} Medida: ${arreglo[IndElement].medida} Cantidad: ${arreglo[IndElement].cantidad}`);
                       let pregunta=readlinesync.question("Modifica s/n: ");
                       if (pregunta==="s"){
                                                            const producto=readlinesync.question("Producto: ");
                                                            const medida=readlinesync.question("Medida:   ");
                                                            const cantidad=readlinesync.questionInt("Cantidad: ");
                                                            arreglo[IndElement].producto=producto;
                                                            arreglo[IndElement].medida=medida;
                                                            arreglo[IndElement].cantidad=cantidad;
                                                            escribirArch(arreglo,path);
                                                           } else {
                                                                 const pausa=readlinesync.question("!!Producto NO MODIFICADO!!");
                                                                  } 
                                        
                                      //} else {
                                        //      const pausa=readlinesync.question("!!ID INEXISTENTE!!");
                                          //   }
 
                      }
}

export function eliminarElemento(path,elemento){
      if (check(path)){
                       const inventario=leer(path);
                       console.log(encontrarPropiedad(inventario,elemento),"<----");
                       let indice=encontrarPropiedad(inventario,elemento);
                       if (indice!=undefined){
                                            console.log("DATOS del producto a ELIMINAR");
                                            console.log(`Nombre ${inventario[indice].producto}`);
                                            console.log(`Medida ${inventario[indice].medida}`);
                                            console.log(`Cantidad ${inventario[indice].cantidad}`);
                                            let pregunta = readlinesync.question("ELIMINA s/n: ");
                                            if (pregunta==="s") {
                                                    inventario.splice(indice,1);
                                                    escribirArch(inventario,path);
                                                            }
                                             } else {
                                                    const pausa=readlinesync.question("!!Elemento INEXISTENTE!!");
                                                    }
                      /* for (let indice = 0; indice < inventario.length; indice=indice+1) {
                               let auxElemento=inventario[indice].producto;
                               console.log(auxElemento);
                               if (auxElemento===elemento) {
                                                                            console.log("DATOS del producto a ELIMINAR");
                                                                            console.log(`Nombre ${inventario[indice].producto}`);
                                                                            console.log(`Medida ${inventario[indice].medida}`);
                                                                            console.log(`Cantidad ${inventario[indice].cantidad}`);
                                                                            let pregunta = readlinesync.question("ELIMINA s/n: ");
                                                                            if (pregunta==="s") {
                                                                                      inventario.splice(indice,1);
                                                                                      escribirArch(inventario,path);
                                                                                             }
                                                                            
                                                                            }
                         
                         }*/             
                    
                                     }
}



/*export function guardar(path,data){
   if (check(path)){
                    console.log(path);
                    console.log(obtenerId(leer(path)));    
                    //obtengo ID nuevo para poder ingresar un nuevo objeto al archivo
                    const inventario=leer(path);
                    const nuevoId=obtenerId(leer(path));
                    const nuevoProd = {ID:nuevoId, ...data };
                    inventario.push(nuevoProd);
                    fs.writeFileSync(path,JSON.stringify(inventario));
                   } else {
                           return [];
                          }


}*/

export function DibujarGuiones(cantidad,mensaje) 
{
  let cantOrig, cantletras, indice;
  let guiones;
  cantOrig = cantidad;
  /*
  agregue la posibilidad de enviar un mensaje adaptativo entre los guiones!!. si envio mensaje a la funcion, 
  esta centra entre los guiones el mensaje (cantidades pares de guiones).
  */
  if (mensaje!="") {
                    cantletras = mensaje.length;  
                    cantidad=(cantidad - cantletras) / 2;
                    guiones = "";
                    for (indice = 1; indice <=cantidad; indice=indice +1) 
                      {
                      guiones = guiones + "-";
                      }
                    if (cantletras % 2 != 0) {
                                             console.log(`${guiones}${mensaje}${guiones}-`);
                                             } else {
                                                     console.log(`${guiones}${mensaje}${guiones}`); 
                                                    }
                  } else {
                          guiones = ""  ;
                          for (indice = 1; indice <=cantidad; indice=indice +1) 
                                              {
                                              guiones = guiones + "-";
                                              } 
                                            console.log(guiones);
                         }
}