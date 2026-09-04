// Catálogo central: cada objeto reúne toda la información que necesitan las vistas.
const Productos = [
  {
    id: 1,
    nombre: "Aparador Uspallata",
    categoria: "Guardado",
    precio: 150000,
    imagen: "img/Aparador Uspallata.png",
    descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    materiales: "Nogal macizo FSC®, herrajes de latón.",
    medidas: "180 × 45 × 75 cm",
    acabado: "Aceite natural ecológico",
    peso: "68 kg",
    capacidad: "6 compartimentos interiores"
  },
  {
    id: 2,
    nombre: "Biblioteca Recoleta",
    categoria: "Estanterías",
    precio: 200000,
    imagen: "img/Biblioteca Recoleta.png",
    descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
    materiales: "Estructura de acero, estantes de roble",
    medidas: "100 × 35 × 200 cm",
    acabado: "Laca mate ecológica",
    capacidad: "45 kg por estante",
    modulares: "5 estantes ajustables"
  },
  {
    id: 3,
    nombre: "Butaca Mendoza",
    categoria: "Sillones",
    precio: 80000,
    imagen: "img/Butaca Mendoza.png",
    descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
    materiales: "Guatambú macizo, tela bouclé",
    medidas: "80 × 75 × 85 cm",
    acabado: "Cera vegetal, tapizado premium",
    tapizado: "Repelente al agua y manchas",
    confort: "Espuma alta densidad"
  },
  {
    id: 4,
    nombre: "Sillón Copacabana",
    categoria: "Sillones",
    precio: 120000,
    imagen: "img/Sillón Copacabana.png",
    descripcion: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
    materiales: "Cuero curtido vegetal, acero pintado",
    medidas: "90 × 85 × 95 cm",
    acabado: "Cuero anilina premium",
    rotacion: "360° silenciosa y suave",
    garantia: "10 años en estructura"
  },
  {
    id: 5,
    nombre: "Mesa de Centro Araucaria",
    categoria: "Mesas",
    precio: 250000,
    imagen: "img/Mesa de Centro Araucaria.png",
    descripcion: "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
    materiales: "Sobre de mármol Patagonia, patas de nogal",
    medidas: "90 × 90 × 45 cm",
    acabado: "Mármol pulido, aceite natural en madera",
    peso: "42 kg",
    cargaMaxima: "25 kg distribuidos"
  },
  {
    id: 6,
    nombre: "Mesa de Noche Aconcagua",
    categoria: "Mesas",
    precio: 90000,
    imagen: "img/Mesa de Noche Aconcagua.png",
    descripcion: "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.",
    materiales: "Roble macizo FSC®, herrajes soft-close",
    medidas: "45 × 35 × 60 cm",
    acabado: "Barniz mate de poliuretano",
    almacenamiento: "1 cajón + repisa inferior",
    caracteristicas: "Cajón con cierre suave"
  },
  {
    id: 7,
    nombre: "Sofá Patagonia",
    categoria: "Sofás",
    precio: 95000,
    imagen: "img/Sofá Patagonia.png",
    descripcion: "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible para el hogar moderno.",
    materiales: "Madera de eucalipto certificada FSC®",
    medidas: "220 × 90 × 80 cm",
    estructura: "Madera de eucalipto certificada FSC®",
    tapizado: "Lino 100% natural premium",
    relleno: "Espuma HR + plumón reciclado",
    sostenibilidad: "Materiales 100% reciclables"
  },
  {
    id: 8,
    nombre: "Mesa Comedor Pampa",
    categoria: "Mesas",
    precio: 60000,
    imagen: "img/Mesa Comedor Pampa.png",
    descripcion: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.",
    materiales: "Roble macizo FSC®, mecanismo alemán",
    medidas: "160-240 × 90 × 75 cm",
    acabado: "Aceite-cera natural",
    capacidad: "6-10 comensales",
    extension: "Sistema de mariposa central"
  },
  {
    id: 9,
    nombre: "Sillas Córdoba",
    categoria: "Sillas",
    precio: 180000,
    imagen: "img/Sillas Córdoba.png",
    descripcion: "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.",
    materiales: "Contrachapado nogal, tubo de acero",
    medidas: "45 × 52 × 80 cm (cada una)",
    acabado: "Laca mate, pintura epoxi",
    apilables: "Hasta 6 sillas",
    incluye: "Set de 4 sillas"
  },
  {
    id: 10,
    nombre: "Escritorio Costa",
    categoria: "Escritorios",
    precio: 220000,
    imagen: "img/Escritorio Costa.png",
    descripcion: "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
    materiales: "Bambú laminado, herrajes ocultos",
    medidas: "120 × 60 × 75 cm",
    acabado: "Laca mate resistente",
    almacenamiento: "1 cajón con organizador",
    cables: "Pasacables integrado"
  },
  {
    id: 11,
    nombre: "Silla de Trabajo Belgrano",
    categoria: "Sillas",
    precio: 300000,
    imagen: "img/Silla de Trabajo Belgrano.png",
    descripcion: "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
    materiales: "Malla técnica, tejido reciclado",
    medidas: "60 × 60 × 90-100 cm",
    acabado: "Base cromada, tapizado premium",
    regulacion: "Altura + inclinación respaldo",
    certificacion: "Ergonomía europea EN 1335"
  }
];
 
// Convierte un número en un precio legible usando el formato habitual de Argentina.
function formatearPrecio(valor) {
  return valor.toLocaleString("es-AR");
}

// Crea una espera reutilizable para simular una respuesta lenta del servidor.
function esperar(milisegundos) {
  return new Promise((resolve) => setTimeout(resolve, milisegundos));
}

// Lee el carrito guardado y refleja su cantidad en el contador del encabezado.
function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    contador.textContent =
      Number(localStorage.getItem("cantidadCarrito")) || 0;
  }
}
 
// Construye una tarjeta completa y la convierte en un enlace hacia el detalle.
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
 
// Vacía un contenedor y dibuja en él todas las tarjetas recibidas.
function renderizarProductos(lista, contenedor) {
  contenedor.innerHTML = "";
  lista.forEach((producto) => {
    contenedor.appendChild(crearTarjetaProducto(producto));
  });
}

// Traduce las claves técnicas del objeto a títulos claros para la ficha del producto.
function obtenerEtiquetaDetalle(clave) {
  const etiquetas = {
    acabado: "Acabado",
    peso: "Peso",
    capacidad: "Capacidad",
    modulares: "Configuración modular",
    tapizado: "Tapizado",
    confort: "Confort",
    rotacion: "Rotación",
    garantia: "Garantía",
    cargaMaxima: "Carga máxima",
    almacenamiento: "Almacenamiento",
    caracteristicas: "Características",
    estructura: "Estructura",
    relleno: "Relleno",
    sostenibilidad: "Sostenibilidad",
    extension: "Extensión",
    apilables: "Apilables",
    incluye: "Incluye",
    cables: "Cables",
    regulacion: "Regulación",
    certificacion: "Certificación",
  };

  return etiquetas[clave] || clave;
}

// Agrega a la ficha todos los detalles específicos disponibles para ese producto.
function renderizarDetallesAdicionales(producto, contenedor) {
  const camposBase = new Set([
    "id",
    "nombre",
    "categoria",
    "precio",
    "imagen",
    "descripcion",
    "materiales",
    "medidas",
  ]);
  const botonAgregar = contenedor.querySelector("#btn-agregar");

  Object.entries(producto).forEach(([clave, valor]) => {
    if (camposBase.has(clave) || valor === undefined || valor === "") return;

    const item = document.createElement("div");
    item.className = "spec-item";
    item.innerHTML = `
      <dt>${obtenerEtiquetaDetalle(clave)}</dt>
      <dd>${valor}</dd>
    `;

    if (botonAgregar) {
      contenedor.insertBefore(item, botonAgregar);
    } else {
      contenedor.appendChild(item);
    }
  });
}
 
// Estos elementos solo existen en la página del catálogo.
const productosContainer = document.getElementById("productos-container");
const buscadorInput = document.getElementById("buscador");
const resultadosInfo = document.getElementById("resultados-info");
 
// Actualiza el texto que informa cuántos productos se están mostrando.
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

// Simula la carga asíncrona y devuelve el catálogo cuando finaliza la espera.
async function cargarCatalogo() {
 await esperar(1000);
 return Productos;
}

// Inicializa el catálogo, sus destacados y el filtro de búsqueda.
async function iniciarCatalogo() {
 const productos = await cargarCatalogo();

 if (productosContainer) {
   renderizarProductos(productos, productosContainer);
   actualizarResultadosInfo(productos.length, "");

   if (buscadorInput) {
     buscadorInput.addEventListener("input", (evento) => {
       const termino = evento.target.value.trim().toLowerCase();
       const filtrados = productos.filter(
         (producto) =>
           producto.nombre.toLowerCase().includes(termino) ||
           producto.categoria.toLowerCase().includes(termino)
       );
       renderizarProductos(filtrados, productosContainer);
       actualizarResultadosInfo(filtrados.length, termino);
     });
   }
 }

 if (productGrid) {
   renderizarProductos(productos.slice(0, 4), productGrid);
 }
}

const productGrid = document.getElementById("productGrid");

actualizarContadorCarrito();

if (productosContainer || productGrid) {
 if (resultadosInfo) {
   resultadosInfo.textContent = "Cargando productos...";
 }
 iniciarCatalogo();
}
 
// En la página de detalle, toma el id de la URL y completa la información del producto.
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

    const detallesSpecs = document.querySelector(".producto-detalle__specs");
    if (detallesSpecs) {
      renderizarDetallesAdicionales(producto, detallesSpecs);
    }

    // El botón agrega una unidad, actualiza el almacenamiento y confirma la acción.
    const botonAgregar = document.getElementById("btn-agregar");
    if (botonAgregar) {
      botonAgregar.addEventListener("click", async (evento) => {
        evento.preventDefault();
        botonAgregar.disabled = true;
        botonAgregar.textContent = "Agregando...";

        await esperar(1000);

        const cantidadActual =
          Number(localStorage.getItem("cantidadCarrito")) || 0;
        const nuevaCantidad = cantidadActual + 1;
        localStorage.setItem("cantidadCarrito", nuevaCantidad);
        actualizarContadorCarrito();

        alert(`Se ha agregado ${producto.nombre} al carrito.`);
        botonAgregar.textContent = "Agregado al Carrito";
        botonAgregar.disabled = false;
      });
    }
 
    // Busca productos de la misma categoría para mostrar recomendaciones.
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