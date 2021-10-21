const API = 'https://cafeyplacer.herokuapp.com';

async function agregarRegistro(usuario) {
    registros.push(usuario);
    let resultado;
    await fetch(`${API}/personas`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(usuario), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(res => res.json()).then(data => {
        resultado = {
            res: true,
            user: {
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

let registros = [];

/* -- Funciones del Reto 3 -- */

function ordenarArreglo(arreglo) {
    let ordenar = arreglo.sort(function (a, b) {
        if (a.nombre > b.nombre) {
            return 1;
        }
        if (a.nombre < b.nombre) {
            return -1;
        }
        return 0;
    });
    console.log(ordenar);
    return ordenar;
}

function filtrarCorreo(arreglo) {
    const correofiltrado = arreglo.filter(element => {
        if (/^[a-zA-Z0-9_.+-]+@gmail.com/.test(element.correo)) {
            return true;
        } else {
            return false;
        }
    });
    console.log(correofiltrado);
    return correofiltrado;
}

async function registrar() {
    let nombre = checkNombre(document.getElementById("nombre"));
    let genero = checkGenero('genero');
    let telefono = checkTelefono(document.getElementById("telefono"));
    let direccion = checkDir(document.getElementById("direccion"));
    let correo = checkCorreo(document.getElementById("correo"));
    let contrasena = checkContrasena(document.getElementById("contrasena"));

    if (nombre != null && genero != null && telefono != null && direccion != null && correo != null && contrasena != null) {
        let usuario = {
            nombre: nombre,
            genero: genero,
            telefono: telefono,
            direccion: direccion,
            correo: correo,
            contrasena: contrasena
        };

        let result = await agregarRegistro(usuario);
        if (result.res) {
            alert("Registro exitoso :D");
            window.location.href = "";
        } else {
            alert(`${nombre} ocurrio un error, ${result.msg}`);
        }
    }
}

function checkNombre(elemento) {
    if (/^[a-zA-ZÀ-ÿ\s]{4,30}$/.test(elemento.value)) {

        elemento.classList.remove('error');
        return elemento.value;
    } else {
        elemento.classList.add('error');
        return null;
    }
}
function checkGenero(name) {
    let radio = document.body.querySelector('input[name="' + name + '"][type="radio"]:checked');
    if (radio != null) {

        radio.parentElement.classList.remove('error');
        return radio.value;
    } else {
        let radio = document.body.querySelector('input[name="' + name + '"][type="radio"]');
        radio.parentElement.classList.add('error');
        return null;
    }
}
function checkTelefono(elemento) {
    if (/^[0-9]{7,7}$/.test(telefono.value)) {

        elemento.classList.remove('error');
        return elemento.value;
    } else {
        elemento.classList.add('error');
        return null;
    }
}

function checkContrasena(elemento) {
    let valor = elemento.value;
    const minusculas = new RegExp("[a-z]", "g");
    const mayusculas = new RegExp("[A-Z]", "g");
    const numeros = new RegExp("[0-9]", "g");

    if (valor.length >= 8 && valor.match(minusculas) != null && valor.match(mayusculas) != null && valor.match(numeros)) {

        elemento.classList.remove('error');
        return elemento.value;
    } else {
        elemento.classList.add('error');
        return null;
    }
}

function checkDir(elemento) {
    let direccion = elemento.value;
    if (direccion != '' && direccion.length <= 50 && /[a-zA-Z0-9\s_.+-]+#[a-zA-Z0-9\s_.+-]/.test(direccion)) {

        elemento.classList.remove('error');
        return elemento.value;
    } else {
        elemento.classList.add('error');
        return null;
    }
}

function checkCorreo(elemento) {
    if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(elemento.value)) {

        elemento.classList.remove('error');
        return elemento.value;
    } else {
        elemento.classList.add('error');
        return null;
    }
}