import React, { useRef } from "react";
import usePreference from "../../Hooks/usePreferences";
import HomeUser from "./HomeUser";
import HomeCompany from "./HomeCompany";
import Toast from "react-native-easy-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const HomeScreen = () => {
	const { userFbData } = usePreference();
	const toastRef=useRef();

	if (userFbData) {
		switch (userFbData.tipo) {
			case "User":
				return (
					<KeyboardAwareScrollView>
						<HomeUser toastRef={toastRef}/>
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

			case "Company":
				return (
					<KeyboardAwareScrollView>
						<HomeCompany toastRef={toastRef} />
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
			default:
				return null;
		}
	} else {
		return null;
	}
};
export default HomeScreen;
