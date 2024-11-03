import   Carrito from "./carrito.js"  

// ---------------------------------------------------------------VARIABLEs ------------------------------------------------------------//

    const carrito = new Carrito(); // Inicializa el carrito
    var articulos = [];            // Array de productos

// ---------------------------------  EVENTO DOMContentLoaded --------------------------------------------------------------------------//

document.addEventListener('DOMContentLoaded', function(event) {
    
// ----------------------------------------------------------------SUMAR Y RESTAR CANTIDAD  (EVENTO )-----------------------------------//

    function sumarCantidad(celda) {
        let cantidadActual = parseInt(celda.textContent);
        cantidadActual += 1;
        celda.textContent = cantidadActual;
        return cantidadActual;
    }

    function restarCantidad(celda) {
        let cantidadActual = parseInt(celda.textContent);
        if (cantidadActual > 0) {
            cantidadActual -= 1;
        }
        celda.textContent = cantidadActual;
        return cantidadActual;
    }

// --------------------------------------------------------HACER TOTALES EN LA LISTA ------------------------------------------------------//

    function calcularSubTotal(precio, cantidadActual, total) {
        const subTotal = precio * cantidadActual;
        total.textContent = subTotal.toFixed(2);
        return subTotal;
    }

//---------------------------------------------------------------------ACTUALIZAR EL CARRITO -----------------------------------------------//

    function actualizarCarritoEnDOM(productos) {
        const carritoDOM = document.getElementById("productosCarrito");
        carritoDOM.innerHTML = ''; 

        productos.forEach(producto => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.title}</td>
                <td>${producto.unidades} x</td>
                <td>${producto.subtotal.toFixed(2)} €</td>
            `;
            carritoDOM.appendChild(fila);
        });
    }

//-----------------------------------------------------------------CARGAR FILAS A LA TABLA PRINCIPAL-----------------------------------------//

    function cargarTabla(articulos) {
        const tablaArticulos = document.getElementById("cuerpoTabla");

        articulos.forEach(tipo => {

            // -----------CONSTRUCION  PRODUCTO + ID ( SKU) ----------------------//

            const producto = document.createElement('td');
            producto.innerText = tipo.title;
            producto.id = 'oscuro';
            const cod = document.createElement('p');
            cod.textContent = "REF " + tipo.SKU;
            cod.id='size';
            producto.appendChild(cod);

             // -----------CONSTRUCION CANTIDAD -----------------------------------//

            const cantidad = document.createElement('td');
            const nDiv = document.createElement('div');

            const but1 = document.createElement('button');
            but1.textContent = "-";
            const celda = document.createElement('span');
            celda.id = "cel-Q";
            celda.textContent = "0";

            const but2 = document.createElement('button');
            but2.textContent = "+";

            const total = document.createElement('td');
            total.textContent = "0";

            but1.addEventListener('click', function() {
                const nuevaCantidad = restarCantidad(celda);
                calcularSubTotal(tipo.price, nuevaCantidad, total);
                carrito.actualizarUnidades(tipo.SKU, nuevaCantidad,tipo.price, tipo.title);

                actualizarCarritoEnDOM(carrito.obtenerCarrito((totalCarrito) => {
                    document.getElementById("totalCarrito").textContent = `${totalCarrito} €`;
                }));
            });

            but2.addEventListener('click', function() {
                const nuevaCantidad = sumarCantidad(celda);
                calcularSubTotal(tipo.price, nuevaCantidad, total);
                carrito.actualizarUnidades(tipo.SKU, nuevaCantidad,tipo.price, tipo.title);

                actualizarCarritoEnDOM(carrito.obtenerCarrito((totalCarrito) => {
                    document.getElementById("totalCarrito").textContent = `${totalCarrito} €`;
                }));
            });

            nDiv.append(but1, celda, but2);
            cantidad.append(nDiv);

             //-------------------------- CONSTURCION PRECIO -------------------------- //

            const precio = document.createElement('td');
            precio.innerText = tipo.price;

            //------------------------- CONSTRUCION TOTAL------------------------------//

            const tr = document.createElement('tr');
            tr.append(producto, cantidad, precio, total);
            tablaArticulos.append(tr);
        });
    }

    fetch('https://jsonblob.com/api/1299018633341427712')
        .then(response => response.json())
        .then(products => {
            articulos = products.products;
            cargarTabla(articulos);      
        
        });
});


