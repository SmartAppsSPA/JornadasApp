import React from "react";
import usePreference from "../../Hooks/usePreferences";
import HomeUser from "./HomeUser";
import HomeCompany from "./HomeCompany";

const HomeScreen = () => {
	const { userFbData } = usePreference();

	if (userFbData) {
		switch (userFbData.tipo) {
			case "User":
				return <HomeUser />;

			case "Company":
				return <HomeCompany />;
			default:
				return null;
		}
	} else {
		return null;
	}
};
export default HomeScreen;
