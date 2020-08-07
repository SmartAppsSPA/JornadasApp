import React, {useRef} from "react";
import usePreference from "../../Hooks/usePreferences";
import BonoUser from "./BonoUser";
import BonoCompany from "./BonoCompany";
import Toast from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function BonoScreen(){
  const toastRef = useRef();
	const { userFbData } = usePreference();
		
  switch (userFbData.tipo) {
    case "User": {
      return (
        <KeyboardAwareScrollView>
       <BonoUser toastRef={toastRef}/>
       <Toast
					ref={toastRef}
					position="center"
					style={{
						backgroundColor: "#696969",
						opacity: 0.9,
						borderRadius: 20,
					}}
					fadeInduration={1000}
					fadeOutDuration={1000}
					textStyle={{
						fontWeight: "bold",
						color: "#FFF",
						textAlign: "center",
					}}
				/>
        </KeyboardAwareScrollView>
      );
    }
    case "Company": {
      return (
        <KeyboardAwareScrollView>
        <BonoCompany toastRef={toastRef}/>
        <Toast
					ref={toastRef}
					position="center"
					style={{
						backgroundColor: "#696969",
						opacity: 0.9,
						borderRadius: 20,
					}}
					fadeInduration={1000}
					fadeOutDuration={1000}
					textStyle={{
						fontWeight: "bold",
						color: "#FFF",
						textAlign: "center",
					}}
				/>
      </KeyboardAwareScrollView>
      );
    }
    default: {
      return null;
    }
  }

};
