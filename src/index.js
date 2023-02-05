
import fetch from 'node-fetch';
import { validacion } from "./validacionesIp.js";
import fs from 'fs';
import { enviarMail } from './envioMail.js';

function control(){
  validacion()
}
control()

// const controlDeConsulta = (tiempo) => {
//   setInterval(()=> {
//     fetch("https://api.ipify.org?format=json")
//     .then((res)=>{ 
//       return res.json()
//     })
//     .then((dato) => {
//       comparacion(dato.ip)
//     })
//   }, tiempo);
// }
 //controlDeConsulta(25000);

const consultarIP = async () => { 
  try {
    const respuesta = await fetch("https://api.ipify.org?format=json");
    const data = await respuesta.json();
    const ip = await data.ip;
    comparacion(ip)
  } catch (error) {
    console.log(`No se completo la peticion ${error.message}`);
  }
}

setInterval(consultarIP, 1000);

const comparacion = (ip) => {
  const almacenadaIp = fs.readFileSync('./datos/datoIp.txt')
  if(ip === almacenadaIp.toString()){
    console.log(`La IP sigue  igual : ${ip}`)
  }else{
    const guardarIP = fs.writeFileSync('./datos/datoIp.txt', ip.toString());
    console.log(`la IP cambio ${ip}`)
    enviarMail(ip).catch(console.error);
  }
}