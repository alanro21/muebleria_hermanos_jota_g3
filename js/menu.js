// Referencias al botón y al panel que forman el menú responsive.
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu-principal");

// Solo se conectan los eventos cuando la página contiene ambos elementos.
if (menuToggle && menu) {
  // Abre o cierra el menú y mantiene actualizados sus atributos de accesibilidad.
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.querySelector(".sr-only").textContent = isOpen
      ? "Abrir menú"
      : "Cerrar menú";
    menu.classList.toggle("is-open", !isOpen);
  });

  // Al elegir una opción, el menú se cierra para no tapar el contenido en mobile.
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.querySelector(".sr-only").textContent = "Abrir menú";
      menu.classList.remove("is-open");
    }
  });
}
