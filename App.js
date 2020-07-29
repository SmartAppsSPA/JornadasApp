import "react-native-gesture-handler";
import React, { useState, useEffect, useMemo } from "react";
import firebase from "./Firebase/Firebase";
import MyDrawer from "./src/Navigation/MyDrawer/MyDrawer";
import MyStack from "./src/Navigation/MyStack/MyStack";
import PreferencesContext from "./src/Context/PreferencesContext";

const App = () => {
	const [user, setUser] = useState(undefined);
	const [userFbData, setUserFbData] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((response) => {
			setUser(response);
			if (response) {
				firebase
					.database()
					.ref(`Users/${response.uid}`)
					.once("value", (snapshot) => {
						setUserFbData(snapshot.val());
					});
			} else {
				console.log("No hay usuario logeado");
			}
		});
	}, []);

	const preferences = useMemo(
		() => ({
			setUserFbData,
			userFbData,
		}),
		[userFbData]
	);

	if (user === undefined) return null;

	if (user !== null && userFbData !== null) {
		return (
			<PreferencesContext.Provider value={preferences}>
				<MyDrawer />
			</PreferencesContext.Provider>
		);
	} else if (user === null && userFbData !== null) {
		return (
			<PreferencesContext.Provider value={preferences}>
				<MyDrawer />
			</PreferencesContext.Provider>
		);
	} else {
		return <MyStack />;
	}
};

export default App;

