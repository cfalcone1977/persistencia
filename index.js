import readlinesync from "readline-sync";
import { leer,guardar, eliminarElemento, checkID, reemplazarProducto, DibujarGuiones } from "./utils.js";

// lugar ruta/directorio donde se encuentra inventario.json
const inventarioPath = "./DATA/inventario.json";


function verInventario() {
    console.log('Inventario actual: ');
    leer(inventarioPath);

}

function cargarProducto(){
    DibujarGuiones(40,"Ingrese DATOS PRODUCTO");
    const producto=readlinesync.question("Ingrese nombre:   ");
    const medida=readlinesync.question("Ingrese medida:   ");
    const cantidad=readlinesync.questionInt("Ingrese cantidad: ");
    guardar(inventarioPath,{producto,medida,cantidad}); 
}
function modificarProducto(){
    DibujarGuiones(40,"Modificar Producto");
    const IDproducto=readlinesync.questionInt("Ingrese el ID del producto a modificar: ");
    let IndiceElementReemp=checkID(inventarioPath,IDproducto);
    if (IndiceElementReemp!=-1){
                                 console.log(IndiceElementReemp);
                                 reemplazarProducto(inventarioPath,IndiceElementReemp);
                                  } else {
                               
                                         }
    


}

function eliminarProducto(){
    DibujarGuiones(40,"Eliminar Producto");
    const producto=readlinesync.question("Ingrese el nombre del producto a eliminar: ");
    eliminarElemento(inventarioPath,producto);
}


function menu() {
      let opcion=0;
      while (opcion=5){
      DibujarGuiones(40,"");
      DibujarGuiones(40,"Sistema de Inventario");
      DibujarGuiones(40,"");
      console.log("1. Ver Inventario ");
      console.log("2. Crear Articulo");
      console.log("3. Modificar Articulo");
      console.log("4. Eliminar Articulo");
      console.log("5. Salir");
      DibujarGuiones(40,"");
      const opcion=readlinesync.questionInt("Seleccione una opcion: ");
      switch (opcion) {
        case 1:
            verInventario();
            break;
        case 2:
            cargarProducto();
            break;
        case 3:
            modificarProducto();
            break;
        case 4:
            eliminarProducto();
        break;
        case 5:
            console.warn('Saliendo del Sistema...');
            process.exit();
        default:
            console.log("!!!OPCION INEXISTENTE!!!");
            break;
      }
      }
}


menu();


