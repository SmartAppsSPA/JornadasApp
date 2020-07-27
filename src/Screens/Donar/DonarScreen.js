import React from "react";
import usePreference from "../../Hooks/usePreferences";
import DonarUser from "./DonarUSer";
import DonarCompany from "./DonarCompany";

const Donar = () => {
	const { userFbData } = usePreference();

	switch (userFbData.tipo) {
		case "User": {
			return <DonarUser />;
		}
		case "Company": {
			return <DonarCompany />;
		}
		default: {
			return null;
		}
	}
};

export default Donar;
