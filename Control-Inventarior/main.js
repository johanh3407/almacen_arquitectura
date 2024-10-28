var btnAgregar = document.querySelector('#btnAgregar');
var btnEliminar = document.querySelector('#btnEliminar');
var btnBuscar = document.querySelector('#btnBuscar');
var btnLimpiar = document.querySelector('#btnLimpiar');
var cboxInsertar = document.querySelector('#cboxInsertar');
var table = document.getElementById('lista');
var lista = [];

class Articulo {
    constructor(codigo, nombre, descripcion, cantidad, costo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.costo = costo;
        this.total = (cantidad * costo);
    }
    añadir(elemento) {
        lista.push(elemento);
    }
    insertar(elemento) {
        let casilla = document.querySelector('#casilla');
        lista.splice((casilla.value - 1), 0, elemento);
    }
}

cboxInsertar.addEventListener('click', () => {
    let divinsertar = document.getElementById('divinsertar');
    if (cboxInsertar.checked) {
        divinsertar.innerHTML = '<input name="casilla" type="number" placeholder="Casilla" id="casilla" />';
    } else {
        let casilla = document.querySelector('#casilla');
        if (casilla) casilla.remove();
    }
});

btnAgregar.addEventListener('click', () => {
    console.clear();
    if (lista.length < 20) {
        let codigo = document.querySelector('#codigo');
        let nombre = document.querySelector('#nombre');
        let descripcion = document.querySelector('#descripcion');
        let cantidad = document.querySelector('#cantidad');
        let costo = document.querySelector('#costo');
        let casilla = document.querySelector('#casilla');
        let check = true;

        for (let i = 0; i < lista.length; i++) {
            if (lista[i].codigo == codigo.value) {
                check = false;
                return alert(' No puedes añadir varios productos con el mismo código ');
            }
        }

        if (check) {
            let articulo = new Articulo(codigo.value, nombre.value, descripcion.value, cantidad.value, costo.value);
            if (articulo.codigo && articulo.nombre && articulo.descripcion && articulo.cantidad && articulo.costo) {
                table.innerHTML = '<tr><td>Código</td><td>Nombre</td></tr>'; 

                if (casilla && casilla.value.length > 0) {
                    if ((casilla.value - 1) < lista.length) {
                        articulo.insertar(articulo);
                    } else {
                        alert(' No puedes insertar en el último artículo o si la lista está vacía ');
                    }
                } else {
                    articulo.añadir(articulo);
                }

                for (let i = 0; i < lista.length; i++) {
                    let fila = table.insertRow(-1);
                    let celda1 = fila.insertCell(0);
                    let celda2 = fila.insertCell(1);
                    celda1.textContent = lista[i].codigo;
                    celda2.textContent = lista[i].nombre;
                }
            } else {
                alert(' Llena todos los espacios ');
            }
        }
    } else {
        alert(' Se ha llegado al límite de registros | 20 máximo ');
    }
});

btnEliminar.addEventListener('click', () => {
    console.clear();
    let codigo = document.querySelector('#codigo');
    if (codigo.value) {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].codigo == codigo.value) {
                lista.splice(i, 1);
                alert('🗑 Artículo eliminado 🗑');
                table.innerHTML = '<tr><td>Código</td><td>Nombre</td></tr>'; 
                for (let j = 0; j < lista.length; j++) {
                    let fila = table.insertRow(-1);
                    let celda1 = fila.insertCell(0);
                    let celda2 = fila.insertCell(1);
                    celda1.textContent = lista[j].codigo;
                    celda2.textContent = lista[j].nombre;
                }
                return;
            }
        }
        alert(' Artículo no encontrado ');
    } else {
        alert(' Ingresa el código del artículo a eliminar ');
    }
});

btnBuscar.addEventListener('click', () => {
    console.clear();
    let codigo = document.querySelector('#codigo');
    if (codigo.value) {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].codigo == codigo.value) {
                let tablecodigo = document.getElementById('tablecodigo');
                let tablenombre = document.getElementById('tablenombre');
                let tabledescripcion = document.getElementById('tabledescripcion');
                let tablecantidad = document.getElementById('tablecantidad');
                let tablecosto = document.getElementById('tablecosto');
                let tabletotal = document.getElementById('tabletotal');

                tablecodigo.innerText = lista[i].codigo;
                tablenombre.innerText = lista[i].nombre;
                tabledescripcion.innerText = lista[i].descripcion;
                tablecantidad.innerText = lista[i].cantidad;
                tablecosto.innerText = lista[i].costo;
                tabletotal.innerText = lista[i].total;

                return;
            }
        }
        alert('❔ Artículo no encontrado ❔');
    } else {
        alert('🔎 Ingresa el código del artículo a buscar 🔎');
    }
});

btnLimpiar.addEventListener('click', () => {
    let codigo = document.querySelector('#codigo');
    let nombre = document.querySelector('#nombre');
    let descripcion = document.querySelector('#descripcion');
    let cantidad = document.querySelector('#cantidad');
    let costo = document.querySelector('#costo');
    codigo.value = '';
    nombre.value = '';
    descripcion.value = '';
    cantidad.value = '';
    costo.value = '';
    cboxInsertar.checked = false;
    let casilla = document.querySelector('#casilla');
    if (casilla) {
        casilla.remove();
    }
});
