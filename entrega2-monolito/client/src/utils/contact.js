export function validateContact(values) {
  const errors = {}
  if (values.nombre.trim().length < 3) errors.nombre = 'Ingresá un nombre de al menos 3 caracteres.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Ingresá un correo electrónico válido.'
  if (values.mensaje.trim().length < 10) errors.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
  return errors
}
