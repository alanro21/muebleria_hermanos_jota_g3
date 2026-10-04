# Mueblería Hermanos Jota

<p align="center">
  <img src="img/logo.svg" width="300">
</p>

## Sitios Web
### Entrega 1:
- **Sitio Web Entrega 1:** [Visitar Mueblería Hermanos Jota](https://alanro21.github.io/muebleria_hermanos_jota_g3/)

### Entrega 2:
- **Sitio Web Entrega 1:** [Visitar Mueblería Hermanos Jota](https://muebleria-hermanos-jota-g3-six.vercel.app/)
- **API:** [Ver API](https://muebleria-hermanos-jota-g3.onrender.com/)

# Entrega 1

## Descripción de Funcionalidades
La página tiene una navegación adaptable a celulares, tablets y computadoras, con un menú hamburguesa para pantallas pequeñas. Además, cuenta con un catálogo dinámico, buscador de productos, páginas de detalle, carrito persistente y formulario de contacto validado. También incluye información sobre la identidad artesanal y la sustentabilidad de Hermanos Jota, junto con un footer que reúne las categorías, los datos de ubicación del taller y los medios de contacto.
El sitio utiliza HTML semántico, recursos accesibles, diseño responsive y una identidad visual basada en colores y tipografías definidas. 

## Tecnologías Utilizadas
- **HTML:** Estructura semántica de las páginas.
- **CSS:** Estilo avanzado y enfoque Mobile First con media queries.
- **JavaScript:** Lógica del cliente, manejos de eventos y renderizado de catálogo.
- **Git y Github:** Control de versiones del proyecto, colaboración del equipo y despliegue del sitio web.

# Entrega 2

## Instalación y ejecución
La entrega tiene dos proyectos separados: client (frontend) y backend, cada uno con su propio package.json y package-lock.json. Por eso, hay que instalar las dependencias en cada carpeta por separado. Para ejecutar el proyecto se necesita Node.js y Express para el backend, y React junto con Vite para el frontend.

1. Servidor Backend - API Express:
Una vez instalado Node.js en la computadora, se instala Express desde la terminal utilizando el comando **npm install express**, ubicándonos previamente en la carpeta del backend.
Luego se crea un archivo server.js, que funciona como archivo principal del backend y se encarga de configurar y levantar el servidor, los middlewares y las rutas de la API.

2. Servidor frontend - React y Vite:
Para desarrollar el frontend se utiliza React junto con Vite. El proyecto se puede crear mediante Vite desde la terminal utilizando el comando **npm create vite@latest carpeta -- --template react**. Se visualizará una serie de opciones, donde se deberá elegir React, JavaScript y ESLint.
Luego, se podrá proceder con el armado de la interfaz, utilizando componentes (Components) para organizar y estructurar la aplicación. 

## Arquitectura:
- **Separación cliente-servidor:** React se encarga de renderizar la interfaz y Express de exponer la API. Ambos se ejecutan como procesos independientes, en puertos diferentes, y cuentan con sus propias carpetas y dependencias.

- **API REST:** Express organiza las rutas de productos mediante un router montado bajo **/api/productos**. Además, incorpora registro de solicitudes, CORS, lectura de datos JSON y manejadores para rutas inexistentes y errores.

- **Catálogo en memoria:** Los productos se obtienen desde una lista JavaScript estática ubicada en **backend/data/productosLista.js**.

## Decisiones tomadas
- **Continuidad de la interfaz:** Se decidió mantener la misma interfaz visual desarrollada en la Entrega 1, reutilizando su estructura y diseño y adaptándola a los nuevos requerimientos funcionales.

- **Estado local del carrito:** Se decidió almacenar el carrito en el localStorage del navegador, mediante las funciones definidas en **client/src/utils/cart.js**

- **Formulario demostrativo:** Se decidió implementar la validación de los campos directamente en el cliente. El formulario no envía datos al backend, ya que su función dentro del proyecto es únicamente demostrativa.

- **Despliegue separado:** Se decidió utilizar Vercel para el frontend desarrollado con React y Vite, y Render para el backend desarrollado con Node.js y Express.

## Integrantes 
- Rinaudo Marco Eneas 
- Castillo Santiago Ezequiel
- Jerez Luca 
- Segura Matheo 
- Rodriguez Agostini Alan Hernan
