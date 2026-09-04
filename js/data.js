// Catálogo anterior conservado como referencia; la aplicación utiliza producto.js.
const Productos = [
    {
        id: 1,
        nombre: "Aparador Uspallata",
        precio: 150000,
        imagen: "img/Aparador Uspallata.png"
    },
    {
        id: 2,
        nombre: "Biblioteca Recoleta",
        precio: 200000,
        imagen: "img/Biblioteca Recoleta.png"
    },
    {
        id: 3,
        nombre: "Butaca Mendoza",
        precio: 80000,
        imagen: "img/Butaca Mendoza.png"
    },
    {
        id: 4,
        nombre: "Escritorio Costa",
        precio: 120000,
        imagen: "img/Escritorio Costa.png"
    },
    {
        id: 5,
        nombre: "Mesa Comedor Pampa",
        precio: 250000,
        imagen: "img/Mesa Comedor Pampa.png"
    },
    {
        id: 6,
        nombre: "Mesa de Centro Araucaria",
        precio: 90000,
        imagen: "img/Mesa de Centro Araucaria.png"
    },
    {
        id: 7,
        nombre: "Silla de Trabajo Belgrano",
        precio: 60000,
        imagen: "img/Silla de Trabajo Belgrano.png"
    },
    {
        id: 8,
        nombre: "Sillas Córdoba",
        precio: 180000,
        imagen: "img/Sillas Córdoba.png"

    },
    {
        id: 9,
        nombre: "Sillón Copacabana",
        precio: 220000,
        imagen: "img/Sillón Copacabana.png"
    },

    {
        id: 10,
        nombre: "Sofá Patagonia",
        precio: 300000,
        imagen: "img/Sofá Patagonia.png"
    }
];

// Busca el contenedor del catálogo cuando este archivo se carga en una página.
const productosContainer = document.getElementById("productos-container");

// Genera tarjetas sencillas para cada producto disponible.
if (productosContainer) {
    Productos.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto-card", `producto-card--${producto.id}`);

        productoDiv.innerHTML = `
      <div class="producto-card__image">
        <img src="${producto.imagen}" alt="${producto.nombre}">
      </div>
      <div class="producto-card__body">
    
        <h3 class="producto-card__title">${producto.nombre}</h3>
        <p class="producto-card__price">Precio:$${producto.precio}</p>
      </div>
    `;

        productosContainer.appendChild(productoDiv);
    });
}

// Busca la grilla de destacados de la página de inicio.
const productGrid = document.getElementById("productGrid");

// Muestra los primeros cuatro productos como destacados.
if (productGrid) {
    for (let i = 0; i < 4; i++) {
        const productGridItem = document.createElement("div");
        productGridItem.classList.add("product-grid-item");
        productGridItem.innerHTML = `
      <div class="producto-card__image">
        <img src="${Productos[i].imagen}" alt="${Productos[i].nombre}">
      </div>
      <div class="producto-card__body">
    
        <h3 class="producto-card__title">${Productos[i].nombre}</h3>
        <p class="producto-card__price">Precio:$${Productos[i].precio}</p>
      </div>
    `;
        productGrid.appendChild(productGridItem)
    }



    ;
};
