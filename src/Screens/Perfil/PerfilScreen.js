import React, { useRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import usePreference from "../../Hooks/usePreferences";
import PerfilUSer from "./PerfilUSer";
import PerfilCompany from "./PerfilCompany";
import Toast from "react-native-easy-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PerfilScreen(props) {
	const toastRef = useRef();
	const { userFbData } = usePreference();

	if (userFbData) {
		return (
			<KeyboardAwareScrollView>
				{userFbData.tipo === "User" ? (
					<PerfilUSer toastRef={toastRef} />
				) : (
					<PerfilCompany toastRef={toastRef} />
				)}

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
	} else {
		return null;
	}
}
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({});
