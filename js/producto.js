const Productos = [
  {
    id: 1,
    nombre: "Aparador Uspallata",
    categoria: "Guardado",
    precio: 150000,
    imagen: "img/Aparador Uspallata.png",
    descripcion:
      "Un aparador que suma calidez y guardado inteligente al living o comedor. La puerta de rejilla de caña deja pasar la luz y suaviza el volumen de madera maciza, mientras las patas de bronce elevan la pieza con una silueta liviana típica de los años 60.",
    materiales: "Madera de nogal maciza, rejilla de caña natural, tapa en mármol reconstituido, patas y herrajes de bronce macizo.",
    medidas: "160 cm (ancho) × 45 cm (profundidad) × 80 cm (alto)."
  },
  {
    id: 2,
    nombre: "Biblioteca Recoleta",
    categoria: "Estanterías",
    precio: 200000,
    imagen: "img/Biblioteca Recoleta.png",
    descripcion:
      "Sistema modular de estantes abiertos pensado para libros, objetos y plantas. La estructura de bronce fino contrasta con los tablones de madera maciza, logrando una pieza que ordena sin cargar visualmente el espacio.",
    materiales: "Madera de cedro maciza, estructura y remates en bronce macizo.",
    medidas: "220 cm (ancho) × 35 cm (profundidad) × 180 cm (alto)."
  },
  {
    id: 3,
    nombre: "Butaca Mendoza",
    categoria: "Sillones",
    precio: 80000,
    imagen: "img/Butaca Mendoza.png",
    descripcion:
      "Butaca de lectura con líneas escandinavas y un tapizado en terciopelo que invita a quedarse. Los apoyabrazos de madera torneada y las patas finas en ángulo son un gesto directo a los sillones de los años 60.",
    materiales: "Terciopelo de algodón, estructura y patas de roble macizo.",
    medidas: "75 cm (ancho) × 80 cm (profundidad) × 78 cm (alto)."
  },
  {
    id: 4,
    nombre: "Escritorio Costa",
    categoria: "Escritorios",
    precio: 120000,
    imagen: "img/Escritorio Costa.png",
    descripcion:
      "Escritorio compacto para el home office, con superficie en cuero y detalles en latón que suman un aire de estudio de arquitecto. Las patas en compás y el cajonero lateral resuelven guardado sin restar liviandad.",
    materiales: "Madera de nogal americano, cubierta en cuero vegetal, herrajes de latón.",
    medidas: "140 cm (ancho) × 65 cm (profundidad) × 75 cm (alto)."
  },
  {
    id: 5,
    nombre: "Mesa Comedor Pampa",
    categoria: "Mesas",
    precio: 250000,
    imagen: "img/Mesa Comedor Pampa.png",
    descripcion:
      "Mesa de comedor familiar con tapa maciza y patas en V que reparten el peso visual sin perder estabilidad. Su veta a la vista es distinta en cada unidad, así que cada mesa es, literalmente, única.",
    materiales: "Madera de nogal maciza, terminación en aceite natural.",
    medidas: "200 cm (largo) × 100 cm (ancho) × 75 cm (alto)."
  },
  {
    id: 6,
    nombre: "Mesa de Centro Araucaria",
    categoria: "Mesas",
    precio: 90000,
    imagen: "img/Mesa de Centro Araucaria.png",
    descripcion:
      "Mesa de centro escultórica, con una base de madera curva que sostiene una tapa de vidrio templado. Funciona como pieza de diseño incluso cuando está vacía.",
    materiales: "Madera de guayubira maciza, tapa de vidrio templado de 12 mm.",
    medidas: "120 cm (largo) × 75 cm (ancho) × 40 cm (alto)."
  },
  {
    id: 7,
    nombre: "Mesa de Noche Aconcagua",
    categoria: "Dormitorio",
    precio: 95000,
    imagen: "img/Mesa de Noche Aconcagua.png",
    descripcion:
      "Mesa de luz flotante con cajón silencioso y un estante abierto para lo que se usa todos los días. Ideal para dormitorios donde cada centímetro de piso importa.",
    materiales: "Madera de nogal maciza, interior lacado, guías de cajón de cierre suave.",
    medidas: "50 cm (ancho) × 40 cm (profundidad) × 25 cm (alto)."
  },
  {
    id: 8,
    nombre: "Silla de Trabajo Belgrano",
    categoria: "Sillas",
    precio: 60000,
    imagen: "img/Silla de Trabajo Belgrano.png",
    descripcion:
      "Silla de escritorio con estructura de madera curvada y malla técnica transpirable, para que el confort de oficina no signifique renunciar a la calidez de la madera en el resto del ambiente.",
    materiales: "Estructura de fresno curvado, malla técnica, tapizado de asiento en lino, mecanismo regulable en altura.",
    medidas: "65 cm (ancho) × 65 cm (profundidad) × 110–120 cm (alto regulable)."
  },
  {
    id: 9,
    nombre: "Sillas Córdoba",
    categoria: "Sillas",
    precio: 180000,
    imagen: "img/Sillas Córdoba.png",
    descripcion:
      "Set de dos sillas de comedor con respaldo de varillas torneadas, inspiradas en las clásicas sillas Windsor y reinterpretadas con un asiento tapizado en lino verde salvia.",
    materiales: "Madera de fresno maciza, tapizado de asiento en lino.",
    medidas: "45 cm (ancho) × 50 cm (profundidad) × 90 cm (alto). Se vende el par."
  },
  {
    id: 10,
    nombre: "Sillón Copacabana",
    categoria: "Sillones",
    precio: 220000,
    imagen: "img/Sillón Copacabana.png",
    descripcion:
      "Sillón de un cuerpo en cuero curtido vegetal, con una estructura de madera a la vista que envejece con carácter. Una pieza pensada para durar generaciones, no temporadas.",
    materiales: "Cuero curtido vegetal, estructura de roble macizo.",
    medidas: "80 cm (ancho) × 85 cm (profundidad) × 85 cm (alto)."
  },
  {
    id: 11,
    nombre: "Sofá Patagonia",
    categoria: "Sofás",
    precio: 300000,
    imagen: "img/Sofá Patagonia.png",
    descripcion:
      "Sofá de tres cuerpos con tapizado bouclé y base de madera flotante, pensado como protagonista del living. Los almohadones sueltos suman color y una textura cálida al conjunto.",
    materiales: "Tela bouclé, relleno en espuma de alta densidad, base de madera de guatambú.",
    medidas: "210 cm (ancho) × 90 cm (profundidad) × 85 cm (alto)."
  }
];
 
/* Formatea precios en pesos argentinos */
function formatearPrecio(valor) {
  return valor.toLocaleString("es-AR");
}
 
/* Renderizado de tarjetas de producto (clickeables) */
function crearTarjetaProducto(producto) {
  const tarjeta = document.createElement("a");
  tarjeta.href = `producto.html?id=${producto.id}`;
  tarjeta.classList.add("producto-card", `producto-card--${producto.id}`);
  tarjeta.setAttribute("aria-label", `Ver detalle de ${producto.nombre}`);
 
  tarjeta.innerHTML = `
    <div class="producto-card__image">
      <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" />
    </div>
    <div class="producto-card__body">
      <span class="producto-card__categoria">${producto.categoria}</span>
      <h3 class="producto-card__title">${producto.nombre}</h3>
      <p class="producto-card__price">$${formatearPrecio(producto.precio)}</p>
    </div>
  `;
 
  return tarjeta;
}
 
function renderizarProductos(lista, contenedor) {
  contenedor.innerHTML = "";
  lista.forEach((producto) => {
    contenedor.appendChild(crearTarjetaProducto(producto));
  });
}
 
/* catálogo completo + buscador */
const productosContainer = document.getElementById("productos-container");
const buscadorInput = document.getElementById("buscador");
const resultadosInfo = document.getElementById("resultados-info");
 
function actualizarResultadosInfo(cantidad, termino) {
  if (!resultadosInfo) return;
  if (termino) {
    resultadosInfo.textContent =
      cantidad > 0
        ? `${cantidad} producto${cantidad === 1 ? "" : "s"} encontrado${cantidad === 1 ? "" : "s"} para "${termino}"`
        : `No encontramos productos para "${termino}"`;
  } else {
    resultadosInfo.textContent = `Mostrando ${cantidad} de ${Productos.length} productos`;
  }
}
 
if (productosContainer) {
  renderizarProductos(Productos, productosContainer);
  actualizarResultadosInfo(Productos.length, "");
 
  if (buscadorInput) {
    buscadorInput.addEventListener("input", (evento) => {
      const termino = evento.target.value.trim().toLowerCase();
      const filtrados = Productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(termino) ||
        producto.categoria.toLowerCase().includes(termino)
      );
      renderizarProductos(filtrados, productosContainer);
      actualizarResultadosInfo(filtrados.length, termino);
    });
  }
}
 
/* grilla de productos destacados */
const productGrid = document.getElementById("productGrid");
 
if (productGrid) {
  const destacados = Productos.slice(0, 4);
  destacados.forEach((producto) => {
    productGrid.appendChild(crearTarjetaProducto(producto));
  });
}
 
/* PDP (Product Detail Page) */
const productoDetalle = document.getElementById("productoDetalle");
 
if (productoDetalle) {
  const params = new URLSearchParams(window.location.search);
  const idProducto = Number(params.get("id"));
  const producto = Productos.find((p) => p.id === idProducto);
 
  if (producto) {
    document.title = `${producto.nombre} | Mueblería Hermanos Jota`;
 
    const imagenEl = document.getElementById("producto-imagen");
    const categoriaEl = document.getElementById("producto-categoria");
    const nombreEl = document.getElementById("producto-nombre");
    const precioEl = document.getElementById("producto-precio");
    const descripcionEl = document.getElementById("producto-descripcion");
    const materialesEl = document.getElementById("producto-materiales");
    const medidasEl = document.getElementById("producto-medidas");
    const breadcrumbEl = document.getElementById("breadcrumb-actual");
 
    if (imagenEl) {
      imagenEl.src = producto.imagen;
      imagenEl.alt = producto.nombre;
    }
    if (categoriaEl) categoriaEl.textContent = producto.categoria;
    if (nombreEl) nombreEl.textContent = producto.nombre;
    if (precioEl) precioEl.textContent = `$${formatearPrecio(producto.precio)}`;
    if (descripcionEl) descripcionEl.textContent = producto.descripcion;
    if (materialesEl) materialesEl.textContent = producto.materiales;
    if (medidasEl) medidasEl.textContent = producto.medidas;
    if (breadcrumbEl) breadcrumbEl.textContent = producto.nombre;
 
    const relacionadosGrid = document.getElementById("relacionadosGrid");
    if (relacionadosGrid) {
      const relacionados = Productos.filter(
        (p) => p.categoria === producto.categoria && p.id !== producto.id
      ).slice(0, 3);
 
      const listaFinal =
        relacionados.length > 0
          ? relacionados
          : Productos.filter((p) => p.id !== producto.id).slice(0, 3);
 
      renderizarProductos(listaFinal, relacionadosGrid);
    }
  } else {
    productoDetalle.innerHTML = `
      <div class="producto-no-encontrado">
        <h2>No encontramos ese producto</h2>
        <p>Puede que el enlace esté roto o el producto ya no esté disponible.</p>
        <a href="productos.html" class="btn btn-primary">Volver al catálogo</a>
      </div>
    `;
    const relacionadosSection = document.getElementById("relacionadosSection");
    if (relacionadosSection) relacionadosSection.style.display = "none";
  }
}