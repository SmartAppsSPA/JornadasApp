import React, {useState} from "react";
import { WebView } from "react-native-webview";
import axios from 'axios';

export default function PagoAporte() {

    const [transbank, setTransbank] = useState(null)
    const generarPeticion = ()=>{
        axios({
            method: 'post', 
            url: 'https://appjornadasmagallanicas.cl/api/api/transactions',
            data: {
                "orden_compra": 11,
                "sessionID": "uid",
                "monto": 7500,
                "cantidad": 15,
                "nombre": "Javier",
                "apellido": "Moraga",
                "email": "javier.moragarojas@gmail.com"
            }
          }).then(response => setTransbank(response.data));
    }

    const web =()=>{}
    console.log(transbank)
	return (
		<WebView
			originWhitelist={["*"]}
			source={{
				uri: {transbank},
			}}
		/>
	);
}
