import React, {useState, useEffect} from "react";
import usePreference from "../../Hooks/usePreferences";
import firebase from '../../../Firebase/Firebase';
import HomeUser from "./HomeUser";
import HomeCompany from "./HomeCompany";

const HomeScreen = () => {
	const { userFbData } = usePreference();
	const userData = userFbData;
	const uid = userData.uid;
	const [userInfo, setUserInfo] = useState([]);

	useEffect(() => {
		firebase
			.database()
			.ref(`Users/${uid}`)
			.on("value", (snapshot) => {
				setUserInfo(snapshot.val());
			});
	}, [userFbData])
	

	if (userFbData && userInfo) {
		console.log(userInfo.tipo)
		switch (userInfo.tipo) {
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
