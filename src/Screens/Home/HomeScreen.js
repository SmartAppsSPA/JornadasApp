import React from "react";
import {Text} from 'react-native'
import usePreference from "../../Hooks/usePreferences";
import HomeUser from "./HomeUser";
import HomeCompany from "./HomeCompany";

const HomeScreen = () => {
	const { userFbData } = usePreference();

	
		switch (userFbData.tipo) {
			case "User": {
			  return (
			   <HomeUser/>
			  );
			}
			case "Company": {
			  return (
			<HomeCompany/>
			  );
			}
			default: {
			  return null;
			}
		  }
	
};

export default HomeScreen;