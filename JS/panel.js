const API = 'https://cafeyplacer.herokuapp.com';
var listaDeProductos;

class rowProducto {

    constructor(id, nombre, descripcion, imgLink, precio) {

        this.row = document.createElement("tr");
        this.row.id = id;

        this.row.dataset.bsToggle = "modal";
        this.row.dataset.bsTarget = "#staticBackdrop";

        let colId = document.createElement("th");
        colId.classList.add("col-1.5");
        colId.scope = "row";
        colId.textContent = id;

        let colImg = document.createElement("td");
        colImg.classList.add("col-1.5");

        let img = document.createElement("img");
        img.src = imgLink;
        img.classList.add("img-thumbnail");

        let colNombre = document.createElement("td");
        colNombre.classList.add("col-3");
        colNombre.textContent = nombre;

        let colDescripcion = document.createElement("td");
        colDescripcion.classList.add("col-3");
        colDescripcion.textContent = descripcion;

        let colPrecio = document.createElement("td");
        colPrecio.classList.add("col-3");
        colPrecio.textContent = precio;

        colImg.appendChild(img);

        this.row.appendChild(colId);
        this.row.appendChild(colImg);
        this.row.appendChild(colNombre);
        this.row.appendChild(colDescripcion);
        this.row.appendChild(colPrecio);

        this.row.addEventListener(
            "click",
            (ev) => {
                let tituloCuadroDeDialogo = document.getElementById('staticBackdropLabel');
                tituloCuadroDeDialogo.textContent = "Producto " + id;
                let nombreCuadroDeDialogo = document.getElementById('staticBackdropName');
                nombreCuadroDeDialogo.value = nombre;
                let imagenCuadroDeDialogo = document.getElementById('staticBackdropImage');
                imagenCuadroDeDialogo.value = imgLink;
                let descripcionCuadroDeDialogo = document.getElementById('staticBackdropDescription');
                descripcionCuadroDeDialogo.value = descripcion;
                let precioCuadroDeDialogo = document.getElementById('staticBackdropPrice');
                precioCuadroDeDialogo.value = precio;

                document.getElementById('labelForStaticBackdropImage').classList.remove('error');
                document.getElementById("labelForStaticBackdropName").classList.remove('error');
                document.getElementById("labelForStaticBackdropDescription").classList.remove('error');
                document.getElementById("labelForStaticBackdropPrice").classList.remove('error');

                let botonEliminar = document.getElementById("botonEliminar");
                botonEliminar.classList.remove("desaparecer");
                botonEliminar.addEventListener(
                    "click",
                    (ev) => {
                        borrarProductoExistente(id);
                    }
                );

                let botonDelModal = document.getElementById("botonActuador");
                botonDelModal.textContent = "Actualizar";
                botonDelModal.addEventListener(
                    "click",
                    (ev) => {
                        cambiarProductoExistente(id);
                    }
                );
            }
        );

    }

}

async function getProductos() {
    let resultado;
    await fetch(`${API}/productos`, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then(res => res.json()).then(data => {
        resultado = {
            res: true,
            users: data
        }
    }).catch((error) => {
        resultado = {
            res: false,
            msg: error
        }
    });
    return resultado;
}

async function agregarProducto(producto) {
    let resultado;
    await fetch(`${API}/productos`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(producto), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(res => res.json()).then(data => {
        resultado = {
            res: true,
            product: {
                id: data.id,
                nombre: data.nombre
            }
        }
    }).catch((error) => {
        resultado = {
            res: false,
            msg: error
        }
    });
    console.log(resultado);
    return resultado;
}

async function actualizarProducto(producto) {
    let resultado;
    await fetch(`${API}/productos`, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(producto), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(res => res.json()).then(data => {
        resultado = {
            res: true,
            product: {
                id: data.id,
                nombre: data.nombre
            }
        }
    }).catch((error) => {
        resultado = {
            res: false,
            msg: error
        }
    });
    console.log(resultado);
    return resultado;
}

async function eliminarProducto(producto) {
    let resultado;
    await fetch(`${API}/productos`, {
        method: 'DELETE', // or 'PUT'
        body: JSON.stringify(producto), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(res => res.json()).then(data => {
        resultado = {
            res: true
        }
    }).catch((error) => {
        resultado = {
            res: false,
            msg: error
        }
    });
    console.log(resultado);
    return resultado;
}

function cambiarPanel() {
    let tituloCuadroDeDialogo = document.getElementById('staticBackdropLabel');
    tituloCuadroDeDialogo.textContent = "Nuevo Producto";
    let nombreCuadroDeDialogo = document.getElementById('staticBackdropName');
    nombreCuadroDeDialogo.value = null;
    let imagenCuadroDeDialogo = document.getElementById('staticBackdropImage');
    imagenCuadroDeDialogo.value = null;
    let descripcionCuadroDeDialogo = document.getElementById('staticBackdropDescription');
    descripcionCuadroDeDialogo.value = null;
    let precioCuadroDeDialogo = document.getElementById('staticBackdropPrice');
    precioCuadroDeDialogo.value = null;

    document.getElementById('labelForStaticBackdropImage').classList.remove('error');
    document.getElementById("labelForStaticBackdropName").classList.remove('error');
    document.getElementById("labelForStaticBackdropDescription").classList.remove('error');
    document.getElementById("labelForStaticBackdropPrice").classList.remove('error');

    document.getElementById("botonEliminar").classList.add("desaparecer");
    let botonDelModal = document.getElementById("botonActuador");
    botonDelModal.textContent = "Crear";
    botonDelModal.addEventListener(
        "click",
        (ev) => {
            crearNuevoProducto();
        });
}

async function borrarProductoExistente(id) {

    let producto = { id: id };
    let result = await eliminarProducto(producto);

    if (result.res) {
        alert("Producto eliminado correctamente");
        document.getElementById('tablaGeneral').innerHTML = "";

        let cuerpoGeneral = document.getElementById("cuerpoGeneral");
        cuerpoGeneral.style = "";
        cuerpoGeneral.classList.remove("model-open");

        let modal = document.getElementById("staticBackdrop");
        modal.style = "display: none"
        modal.classList.remove("show");

        cuerpoGeneral.removeChild(cuerpoGeneral.lastChild);

        visualizarProductos();

    } else {
        alert(`Ha ocurrido un error, ${result.msg}`);
    }

}

async function crearNuevoProducto() {

    let nombre = checkNombre(document.getElementById('staticBackdropName'));
    let imgLink = document.getElementById('staticBackdropImage').value;
    let descripcion = checkDescripcion(document.getElementById('staticBackdropDescription'));
    let precio = checkPrecio(document.getElementById('staticBackdropPrice'));

    console.log((nombre !== null));
    console.log((imgLink.length !== 0));
    console.log((descripcion !== null));
    console.log((precio !== null));

    if ((nombre !== null) && (imgLink.length !== 0) && (descripcion !== null) && (precio !== null)) {
        document.getElementById('labelForStaticBackdropImage').classList.remove('error');

        let producto = {
            nombre: nombre,
            img: imgLink,
            descripcion: descripcion,
            precio: precio
        };

        let result = await agregarProducto(producto);
        if (result.res) {
            alert("Producto creado :D");
            document.getElementById('tablaGeneral').innerHTML = "";

            let cuerpoGeneral = document.getElementById("cuerpoGeneral");
            cuerpoGeneral.style = "";
            cuerpoGeneral.classList.remove("model-open");

            let modal = document.getElementById("staticBackdrop");
            modal.style = "display: none"
            modal.classList.remove("show");

            cuerpoGeneral.removeChild(cuerpoGeneral.lastChild);

            visualizarProductos();

        } else {
            alert(`Ha ocurrido un error, ${result.msg}`);
        }
    } else if (imgLink.length === 0) {
        document.getElementById('labelForStaticBackdropImage').classList.add('error');
    }
}

async function cambiarProductoExistente(id) {

    let nombre = checkNombre(document.getElementById('staticBackdropName'));
    let imgLink = document.getElementById('staticBackdropImage').value;
    let descripcion = checkDescripcion(document.getElementById('staticBackdropDescription'));
    let precio = checkPrecio(document.getElementById('staticBackdropPrice'));

    console.log((nombre !== null));
    console.log((imgLink.length !== 0));
    console.log((descripcion !== null));
    console.log((precio !== null));

    if ((nombre !== null) && (imgLink.length !== 0) && (descripcion !== null) && (precio !== null)) {
        document.getElementById('labelForStaticBackdropImage').classList.remove('error');

        let producto = {
            id: id,
            nombre: nombre,
            img: imgLink,
            descripcion: descripcion,
            precio: precio
        };

        let result = await actualizarProducto(producto);
        if (result.res) {
            alert("Producto actualizado :D");
            document.getElementById('tablaGeneral').innerHTML = "";

            let cuerpoGeneral = document.getElementById("cuerpoGeneral");
            cuerpoGeneral.style = "";
            cuerpoGeneral.classList.remove("model-open");

            let modal = document.getElementById("staticBackdrop");
            modal.style = "display: none"
            modal.classList.remove("show");

            cuerpoGeneral.removeChild(cuerpoGeneral.lastChild);

            visualizarProductos();

        } else {
            alert(`Ha ocurrido un error, ${result.msg}`);
        }
    } else if (imgLink.length === 0) {
        document.getElementById('labelForStaticBackdropImage').classList.add('error');
    }
}

function checkNombre(elemento) {

    let respuesta = elemento.value;

    if (respuesta.length != 0 && /^[a-zA-Z0-9À-ÿ\s,-\.]+$/.test(respuesta)) {
        document.getElementById("labelForStaticBackdropName").classList.remove('error');
        return respuesta;
    } else {
        document.getElementById("labelForStaticBackdropName").classList.add('error');
        return null;
    }

}

function checkDescripcion(elemento) {

    let respuesta = elemento.value;

    if (respuesta.length != 0 && /^[a-zA-Z0-9À-ÿ\s,-\.]+$/.test(respuesta)) {
        document.getElementById("labelForStaticBackdropDescription").classList.remove('error');
        return respuesta;
    } else {
        document.getElementById("labelForStaticBackdropDescription").classList.add('error');
        return null;
    }

}

function checkPrecio(elemento) {

    let respuesta = elemento.value;

    if (respuesta.length <= 9 && respuesta.length != 0 && /^[0-9]+$/.test(respuesta)) {
        document.getElementById("labelForStaticBackdropPrice").classList.remove('error');
        return respuesta;
    } else {
        document.getElementById("labelForStaticBackdropPrice").classList.add('error');
        return null;
    }

}

async function visualizarProductos() {

    const peticion = await getProductos();
    let elementoTabla = document.getElementById('tablaGeneral');

    console.log(elementoTabla);

    if (peticion.res) {
        document.getElementById('tablaGeneral').innerHTML = "";
        console.log(peticion.users);
        listaDeProductos = peticion.users;

        let comboBox = document.getElementById("floatingSelectGrid");
        let criterio = comboBox.options[comboBox.selectedIndex].text;

        let datos = document.getElementById("floatingInputGrid").value;

        if (criterio.length != 0) {

            console.log(criterio);

            if (datos.length != 0) {

                console.log(datos);

                let resultadoDeBusqueda = [];

                if (criterio === "Id") {
                    resultadoDeBusqueda = listaDeProductos.filter(element => element.Id == datos);
                } else if (criterio === "Nombre") {
                    resultadoDeBusqueda = listaDeProductos.filter(element => element.Nombre == datos);
                } else if (criterio === "Precio") {
                    resultadoDeBusqueda = listaDeProductos.filter(element => element.Precio == datos);
                }

                console.log(resultadoDeBusqueda);

                if (resultadoDeBusqueda.length != 0) {
                    resultadoDeBusqueda.forEach(element => {

                        let producto = new rowProducto(element.Id,
                            element.Nombre,
                            element.Descripcion,
                            element.Img,
                            element.Precio
                        );
                        elementoTabla.appendChild(producto.row);
                    });
                } else {
                    listaDeProductos.forEach(element => {

                        let producto = new rowProducto(element.Id,
                            element.Nombre,
                            element.Descripcion,
                            element.Img,
                            element.Precio
                        );
                        elementoTabla.appendChild(producto.row);
                    })
                }

            } else {
                listaDeProductos.forEach(element => {

                    let producto = new rowProducto(element.Id,
                        element.Nombre,
                        element.Descripcion,
                        element.Img,
                        element.Precio
                    );
                    elementoTabla.appendChild(producto.row);

                });
            }

        } else {

            listaDeProductos.forEach(element => {

                let producto = new rowProducto(element.Id,
                    element.Nombre,
                    element.Descripcion,
                    element.Img,
                    element.Precio
                );
                elementoTabla.appendChild(producto.row);

            });

        }


    } else {
        console.log("Error: " + peticion.msg);
    }

}