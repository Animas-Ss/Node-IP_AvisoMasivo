import fetch from 'node-fetch';

export const obtenerIp = async () => { 
    try {
        const respuesta = await fetch("https://api.ipify.org?format=json");
        const data = await respuesta.json();
        const ip = await data.ip;
        return ip 
    } catch (error) {
        console.log(error.message);
    }
   
}