import { obtenerIp } from './FetchApi.js';
import fs from 'fs';

export const validacion = async () => {
    const data = await obtenerIp()
    if(fs.existsSync("./datos/datoIP.txt")){
        console.log("existe archivo con ip")
    }else{
        console.log("no existe creando archivo")
        const guardarIP = fs.writeFileSync('./datos/datoIp.txt', data.toString());
    }
}



