import { Console } from 'console';
import express, { Request, Response } from 'express';
import {methods} from '../Controllers/usuariosController';
import { Usuario } from '../Models/Usuario';
import { verificacion } from '../Controllers/middleware';


export let usuarioRoutes = express.Router()

////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////

//////////////////////////GET//////////////////////////

  /*usuarioRoutes.get('/empleado/:id', verificacion, async(req: Request, res: Response) => {
      res.json(await methods.getEmpleadoId(parseInt(req.params.id)));
  });


  empleadoRoutes.get('/empleado', verificacion, async (req: Request, res: Response) => {
        await methods.getTodosEmpleados(req, res);
  
  });*/
  
  //////////////////////////POST//////////////////////////
  usuarioRoutes.post('/registro', async(req: Request, res: Response) => {
    const {usuario, mail, contraseña} = req.body;
   
    const array : [typeof Usuario] = await methods.crearUsuario(usuario, mail, contraseña);
    res.status(201).json({ mensaje: 'se creó correctamente', empleado: array[0]});
  });


  usuarioRoutes.post('/login', async (req: Request, res: Response) => {
    const { usuario, contraseña } = req.body;
    const loginToken = await methods.login(usuario, contraseña);
    if (loginToken == "error1") {
       res.status(401).json({ mensaje: 'Usuario incorrectos' });
       return;
    }else if (loginToken == "error2") {
       res.status(401).json({ mensaje: 'Contraseña incorrectos' });
       return;
    }
    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token: loginToken }); //para hacer autenticacion mientras no tenga hecho el front copio y pego la respuesta del token
  });
  
  //////////////////////////PUT//////////////////////////
  
  /*empleadoRoutes.put('/empleado/:id', verificacion, async(req: Request, res: Response) => {
    console.log(req.body);
    const {nombre, salario, tiempoCompleto} = req.body;
    const empleadoModificar = await methods.actualizarEmpleado(parseInt(req.params.id), nombre, salario, tiempoCompleto);
    if (empleadoModificar) {
        console.log(empleadoModificar);
        res.status(200).json({ mensaje: 'Empleado actualizada correctamente', empleado: empleadoModificar });
    } else {
        res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
  });
  
  
  //////////////////////////DELETE//////////////////////////
  
  empleadoRoutes.delete('/empleado/:id', verificacion, (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const empleadoEliminar = methods.eliminarEmpleado(id);
    if (empleadoEliminar) {
        res.status(200).json({ mensaje: 'Empleado eliminada correctamente', empleado: empleadoEliminar });
    } else {
        res.status(404).json({ mensaje: 'Empleado no encontrada' });
    }
  });*/