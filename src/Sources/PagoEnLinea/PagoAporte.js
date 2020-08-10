import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import HeaderView from "../../components/Layouts/Header";

export default function PagoAporte(props) {
	const navigation = useNavigation();
	const transbank = props.route.params.transbank;

	const handleWebViewNavigationStateChange = (newNavState) => {
		const { url } = newNavState;
		if (!url) return;

		if (url.includes("404")) {
            alert('Tiempo de espera agotado.')

        }
	};

	if (transbank === null) {
		return (
			<>
				<HeaderView props={props} />
				<WebView
					source={{ uri: "https://appjornadasmagallanicas.cl/api/api/retorno" }}
					onNavigationStateChange={handleWebViewNavigationStateChange}
				/>
			</>
		);
	} else {
		return (
			<SafeAreaView style={styles.mainView}>
				<View style={styles.HeaderContainer}>
					<HeaderView props={props} />
				</View>
				<View style={styles.webviewContainer}>
					<WebView
						source={{ uri: `${transbank.url}?token_ws=${transbank.token_ws}` }}
						onNavigationStateChange={handleWebViewNavigationStateChange}
					/>
				</View>
				<View style={styles.backContainer}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.comeBack}
					>
						<Icon
							raised
							name="arrow-left"
							type="font-awesome"
                            color="#03255F"
                            size={15}
						/>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 12,
	},
	HeaderContainer: {
		flex: 1,
	},
	webviewContainer: {
		flex: 10,
    },
    backContainer:{
        flex:1,
        backgroundColor: '#03255f'
    },
	comeBack: {
		alignSelf: "center",
	},
});