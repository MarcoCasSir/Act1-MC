
export default class Carrito {
    constructor() {
         this.carrito = []; // -------------------ARRAY PARA ALMACENAR PRODUCTOS EN EL CARRITO ---------------------------------------//
    
}

//---------------------------------- AÑADE O QUITA  PRODUCTOS EN EL CARRITO  EN FUNCION DE LAS CANTIDADES------------------------// 

actualizarUnidades(sku, unidades, price, title) {
    
    const prodEnCarrito = this.carrito.find(function(producto) {
        return producto.sku === sku         
    })

    // si es true--> añade todos ls datos 
            
    if (unidades > 0) {

        if (prodEnCarrito) {                
            prodEnCarrito.unidades = unidades;                                       
            prodEnCarrito.subtotal = unidades*price;

        } else {
            
            this.carrito.push({ sku: sku, unidades: unidades, price: price, title: title, subtotal: unidades * price });
        }

    // si es false elimina el producto del carrito

    } else if (prodEnCarrito) {
        
        this.carrito = this.carrito.filter(function(producto) {            
            return producto.sku !== sku
        });
    }
}

//------------------------------------------- CALCULA EL TOTAL DEL CARRITO Y LO ACTUALIZA------------------------------------------------------------// 

obtenerCarrito(Total) {
    let total = 0;
    const prodEnCarrito = this.carrito.map(function(producto){
        total += producto.subtotal; 
        return {                
            title: producto.title,
            unidades: producto.unidades,
            subtotal: producto.subtotal
        };
    });

    // Actuakuza el total en el DOM
    
    Total(total.toFixed(2));

    return prodEnCarrito;
}
}