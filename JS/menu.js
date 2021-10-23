const API = 'https://cafeyplacer.herokuapp.com';
var listaDeProductos;

class cardProducto {

    constructor(id, nombre, descripcion, imgLink, precio) {

        this.card = document.createElement("div");
        this.card.id = id;
        this.card.classList.add("card");

        this.card.dataset.bsToggle = "modal";
        this.card.dataset.bsTarget = "#staticBackdrop";

        this.card.style = "width: 18rem";

        let img = document.createElement("img");
        img.src = imgLink;
        img.classList.add("card-img-top");

        let cuerpo = document.createElement("div");
        cuerpo.classList.add("card-body");

        let titulo = document.createElement("h5");
        titulo.classList.add("card-title");
        titulo.textContent = nombre;

        let texto = document.createElement("p");
        texto.classList.add("card-text");
        texto.textContent = descripcion;

        let etiqueta = document.createElement("span");
        etiqueta.classList.add("etiqueta");
        etiqueta.textContent = precio + " $";

        cuerpo.appendChild(titulo);
        cuerpo.appendChild(texto);
        cuerpo.appendChild(etiqueta);

        this.card.appendChild(img);
        this.card.appendChild(cuerpo);
        this.card.addEventListener(
            "click",
            (ev) => {
                let tituloCuadroDeDialogo = document.getElementById('staticBackdropLabel');
                tituloCuadroDeDialogo.textContent = nombre;
                let imagenCuadroDeDialogo = document.getElementById('staticBackdropImage');
                imagenCuadroDeDialogo.src = imgLink;
                let descripcionCuadroDeDialogo = document.getElementById('staticBackdropDescription');
                descripcionCuadroDeDialogo.textContent = descripcion;
                let precioCuadroDeDialogo = document.getElementById('staticBackdropPrice');
                precioCuadroDeDialogo.textContent = precio + " $";
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

async function visualizarProductos() {

    const peticion = await getProductos();
    let elementoCuadricula = document.getElementById('cuadricula');

    console.log(cuadricula);

    if (peticion.res) {
        console.log(peticion.users);
        listaDeProductos = peticion.users;

        listaDeProductos.forEach(element => {

            let producto = new cardProducto(element.Id,
                element.Nombre,
                element.Descripcion,
                element.Img,
                element.Precio
            );
            elementoCuadricula.appendChild(producto.card);

        });

    } else {
        console.log("Error: " + peticion.msg);
    }

    /*
    const personajes = await peticion.json();
    console.log(personajes);

    let i = 0;

    personajes.forEach(element => {

        let card = "<div class='card' style='width: 18rem'>";
        card += "<img id='" + i + "' src='" + element.PicUrl + "' class='card-img-top' alt='' />";
        card += "<div class='card-body'>";
        card += "<h5 class='card-title'>" + element.Name + "</h5>";
        card += "<p class='card-text'>" + element.Profession + "</p>";
        card += "</div></div>";

        let contendor = document.getElementById("contenedorPersonajes");

        contendor.innerHTML += card;

        i++;

    });
    */
}