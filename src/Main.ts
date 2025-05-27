import { Console } from 'console';
import express, { Request, Response } from 'express';
import { Usuario } from './Models/Usuario';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


import {usuarioRoutes} from './Routes/usuarios';
import cors from 'cors';


/*{
    "nombre": "b",
    "salario": 2,
    "tiempoCompleto": 0,
    "usuario": "a",
    "contraseña": "a"
}*/

const app = express();
const port = 3000;

//let a = new Usuario(); forzamos la creacion de la tabla

app.use(cors());

app.use('/usuario', cors());

app.use(express.json()); 

//////////////////////////USE//////////////////////////

app.use('/usuario', usuarioRoutes) //routes

//////////////////////////LISTEN//////////////////////////

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/*
1. Creación:
Un servidor crea un JWT después de que un usuario se autentica correctamente. El JWT contiene información sobre el usuario, como su ID, roles y permisos.
2. Firma:
El JWT es firmado digitalmente por el servidor utilizando una clave secreta o un par de claves (pública y privada).
3. Envío al cliente:
El JWT se envía al cliente, generalmente como parte de una respuesta HTTP.
4. Almacenamiento en el cliente:
El cliente almacena el JWT, por ejemplo, en localStorage o en una cookie.
5. Inclusión en solicitudes:
En cada solicitud posterior, el cliente incluye el JWT en el encabezado de la solicitud, generalmente en la cabecera Authorization con el valor Bearer <token>.
6. Verificación en el servidor:
El servidor recibe la solicitud con el JWT y verifica la firma del token para confirmar que es válido y que el usuario que lo envió está autenticado.
7. Autorización:
Si la firma es válida, el servidor utiliza la información del JWT para autorizar al usuario a acceder a los recursos protegidos. 
*/