document.addEventListener('DOMContentLoaded', () => {

    //Carrito en el header
    const contadorCarrito = document.getElementById('contador-carrito');
    //Busca la variable en el navegador
    let cantidadProductos = localStorage.getItem('cantidadCarrito') || 0;
    
    if (contadorCarrito) {
        contadorCarrito.textContent = cantidadProductos;
    }

    //Validacion y dom
    const formulario = document.getElementById('form-contacto');
    const contenedorMensaje = document.getElementById('mensaje-exito');

    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();

            // Captura los valores eliminando espacios en blanco al inicio y final
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            //Longitud minima del nombre
            if (nombre.length < 3) {
                alert('El nombre debe tener al menos 3 caracteres.');
                return; 
            }

            //Formato valido del email
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                alert('Por favor, ingresá un correo electrónico válido.');
                return;
            }

            //Longitud del mensaje
            if (mensaje.length < 10) {
                alert('El mensaje es muy corto. Contanos un poco más sobre tu consulta.');
                return;
            }

            //Mensaje de exito
            formulario.style.display = 'none';

            //HTML de respuesta
            contenedorMensaje.innerHTML = `
                <div style="background: rgba(135, 169, 107, 0.08); border: 1px solid #87A96B; padding: 32px; border-radius: 12px; margin-top: 20px;">
                    <h3 style="color: #A0522D; margin-top: 0;">¡Gracias por tu mensaje, ${nombre}!</h3>
                    <p style="color: #1f1f1f; margin-bottom: 0;">Hemos recibido tu consulta y te responderemos a <strong>${email}</strong> a la brevedad.</p>
                </div>
            `;

            contenedorMensaje.style.display = 'block';
            contenedorMensaje.scrollIntoView({ behavior: 'smooth' });
        });
    }
});