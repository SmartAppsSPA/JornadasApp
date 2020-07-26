import React from "react";
import usePreference from "../../Hooks/usePreferences";
import BingoUser from './BingoUser';
import BingoCompany from './BingoCompany';

export default function BingoScreen(){
	const { userFbData } = usePreference();
		
  switch (userFbData.tipo) {
    case "User": {
      return (
       <BingoUser/>
      );
    }
    case "Company": {
      return (
        <BingoCompany/>
      );
    }
    default: {
      return null;
    }
  }

};