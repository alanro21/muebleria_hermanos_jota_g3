const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const router = express.Router();

router.post('/register', async (req, res) => {
   try{
    const {nombre, email, password }  = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({
            error: 'Todos los campos son obligatorios'
        });
    }

    const usuarioExistente = await Usuario.findOne({ 
        email: email.toLowerCase() 
    });

    if (usuarioExistente){
        return res.status(409).json({
            error: 'El email ya esta registrado'
        });

   } 
   const passwordHash = await bcrypt.hash(password, 10);

   const nuevoUsuario = new Usuario({
     nombre,
     email,
     password: passwordHash
   });

   await nuevoUsuario.save();
   return res.status(201).json({
       mensaje: 'Usuario registrado correctamente',
       usuario: {
           id: nuevoUsuario._id,
           nombre: nuevoUsuario.nombre,
           email: nuevoUsuario.email
       }
   });
   } catch (error) {
       return res.status(500).json({ 
        error: 'Error al registrar el usuario' 
    });
   }
});

router.post('/login', async(req, res) => {
 try{
    const { email, password } = req.body;

if(!email || !password) {
    return res.status(400).json({
     error: 'Email y contraseña son obligatorios'
 });
}

const usuario = await Usuario.findOne({
    email: email.toLowerCase()
});
 
if(!usuario){
    return res.status(401).json({
        error: 'Credenciales incorrectas'
    });
 }

 const passwordValida = await bcrypt.compare(
    password,
    usuario.password
 );

 if(!passwordValida){
    return res.status(401).json({
       error: 'Credenciales incorrectas'
    });
 }

 const token = jwt.sign(
      {
        id: usuario._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    return res.status(200).json({
      token,
      user: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Error al iniciar sesión'
    });
  }

});

module.exports = { router };