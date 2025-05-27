import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Usuario } from '../Models/Usuario';
import { error } from 'console';

const JWT_SECRET = 'clave_secreta_super_segura'; //secret key

export class methods {

    static async crearUsuario(usuario: string, mail: string, contraseña: string): Promise<any> {
      try {
        console.log(usuario, mail, contraseña);
        const nuevoUsuario = await Usuario.create({ username: usuario, email: mail, password: bcrypt.hashSync(contraseña, 10)});
        const array: [typeof nuevoUsuario] = [nuevoUsuario];
        return array;
      } catch (error) {
        console.error('Error al crear el empleado:', error);
        throw error;
      }
    }



  static async login(usuario: string, contraseña: string): Promise<any> {
    const user = await Usuario.findOne({where: { username: usuario }});
    if (!user) {
      return "error1";
    }else if(!bcrypt.compareSync(contraseña, String(user.get('password')))){ //compareSync hashea la contraseña en texto plano
      return "error2";
    }
    
  
    const token = jwt.sign(
      { empleadoId: user.get('empleadoId'),
        username: user.get('username'),
      }, 
      JWT_SECRET, // clave secreta
    );
  
    return { token };
  }


  /*static async getTodosEmpleados(req: Request, res: Response): Promise<Response> {
    try {
      const empleado = await Empleado.findAll();
      if (!empleado) {
        return res.send({ mensaje: 'No se encontraron empleados' });
      }
      console.log(empleado);
      return res.send(empleado);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      return res.send({ mensaje: 'Error interno del servidor'});
    }
  }

  static async getEmpleadoId(id:number) {
    try {
      const empleado = await Empleado.findByPk(id);
      if (!empleado) {
        console.log('Empleado no encontrado');
        return null;
      }
      console.log(empleado);
      return empleado;
    } catch (error) {
      throw error;
    }
  }

  static async actualizarEmpleado(id: number, nombre: string, salario: number, tiempoCompleto: boolean) {
    try {
      const [filasActualizadas] = await Empleado.update(
        { nombre, salario, tiempoCompleto },
        {
          where: { id },
          returning: true, 
        }
      );
  
      if (filasActualizadas === 0) {
        console.log('Empleado no encontrado :(');
        return null;
      }
      const empleadoActualizado = await Empleado.findByPk(id);
      console.log('Empleado actualizado:', empleadoActualizado);
      return empleadoActualizado;
    } catch (error) {
      console.error('Error actualizando empleado:', error);
      throw error;
    }
  }
  
  static async eliminarEmpleado(id: number) {
    try {
      const filasEliminadas = await Empleado.destroy({
        where: { id }
      });
  
      if (filasEliminadas === 0) {
        console.log('Empleado no encontrado :(');
        return null;
      }
  
      console.log(`Empleado con ID ${id} eliminado.`);
      return { mensaje: 'Empleado eliminado exitosamente' };
    } catch (error) {
      console.error('Error eliminando empleado:', error);
      throw error;
    }
  }*/

}