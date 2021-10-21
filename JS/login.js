const API = 'https://cafeyplacer.herokuapp.com';

async function login() {

    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;
    let contrasena = document.getElementById("contrasena").value;
    let captcha = document.getElementById("captcha").value;

    if (validarCAPTCHA(captcha)) {

        let result = await buscarUsuarios();
        if (result.res) {

            let usuario = result.users.filter(element => (element.Correo == correo));

            if (usuario.length !== 0) {

                document.getElementById("correo").classList.remove('error');

                if (usuario[0].Telefono == telefono) {

                    document.getElementById("telefono").classList.remove('error');

                    if (usuario[0].Contrasena == contrasena) {
                        document.getElementById("contrasena").classList.remove('error');

                        alert("Login exitoso :D");
                        window.location.href = "";

                    } else {
                        document.getElementById("contrasena").classList.add('error');
                    }

                } else {

                    document.getElementById("telefono").classList.add('error');

                }

            } else {
                document.getElementById("correo").classList.add('error');

                usuario = result.users.filter(element => (element.Telefono == telefono));
                if (usuario.length !== 0) {
                    document.getElementById("telefono").classList.remove('error');
                } else {
                    document.getElementById("telefono").classList.add('error');
                }
            }

        } else {
            alert(`Ha ocurrio un error, ${result.msg}`);
        }

    } else {
        document.getElementById("captcha").classList.add('error');

        document.getElementById("correo").value = "";
        document.getElementById("telefono").value = "";
        document.getElementById("contrasena").value = "";

        document.getElementById("telefono").classList.remove('error');
        document.getElementById("correo").classList.remove('error');
        document.getElementById("contrasena").classList.remove('error');
    }

}

async function buscarUsuarios() {
    let resultado;
    await fetch(`${API}/personas`, {
        method: 'GET', // data can be `string` or {object}!
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



function validarCAPTCHA(captcha) {

    captcha = captcha.replace(/[^a-zA-Z]/g, "");
    captcha = captcha.toLowerCase()

    if (captcha == "ocaso") {
        return true;
    } else {
        return false;
    }
}