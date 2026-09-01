document.addEventListener('DOMContentLoaded', () => {

    //Carrito en header
    const contadorCarrito = document.getElementById('contador-carrito');
    let cantidadProductos = localStorage.getItem('cantidadCarrito') || 0;
    
    if (contadorCarrito) {
        contadorCarrito.textContent = cantidadProductos;
    }

    //Formulario, dom y validaciones
    const formulario = document.getElementById('form-contacto');
    const contenedorMensaje = document.getElementById('mensaje-exito');

    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            if (nombre.length < 3) {
                alert('El nombre debe tener al menos 3 caracteres.');
                return; 
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                alert('Por favor, ingresá un correo electrónico válido.');
                return;
            }

            if (mensaje.length < 10) {
                alert('El mensaje es muy corto. Contanos un poco más sobre tu consulta.');
                return;
            }

            //SetTimeout
            const botonSubmit = formulario.querySelector('button[type="submit"]');
            
            //Cambio de texto
            botonSubmit.textContent = 'Enviando...';
            botonSubmit.style.opacity = '0.7';
            botonSubmit.disabled = true;

            //simulacion de demora de red
            setTimeout(() => {
                
                formulario.style.display = 'none';

                //mensaje
                contenedorMensaje.innerHTML = `
                    <div style="background: rgba(135, 169, 107, 0.08); border: 1px solid #87A96B; padding: 32px; border-radius: 12px; margin-top: 20px;">
                        <h3 style="color: #A0522D; margin-top: 0;">¡Gracias por tu mensaje, ${nombre}!</h3>
                        <p style="color: #1f1f1f; margin-bottom: 0;">Hemos recibido tu consulta y te responderemos a <strong>${email}</strong> a la brevedad.</p>
                    </div>
                `;

                //mensaje final
                contenedorMensaje.style.display = 'block';
                contenedorMensaje.scrollIntoView({ behavior: 'smooth' });
                
            }, 1500); //fin setTimeout
        });
    }
});