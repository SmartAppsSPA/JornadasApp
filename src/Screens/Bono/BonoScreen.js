import React from "react";
import usePreference from "../../Hooks/usePreferences";
import BonoUser from "./BonoUser";
import BonoCompany from "./BonoCompany";


export default function BonoScreen(){
	const { userFbData } = usePreference();
		
  switch (userFbData.tipo) {
    case "User": {
      return (
       <BonoUser/>
      );
    }
    case "Company": {
      return (
        <BonoCompany/>
      );
    }
    default: {
      return null;
    }
  }

};
