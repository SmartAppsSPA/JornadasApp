import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
    SafeAreaView,
    Dimensions,
    ImageBackground,
    ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Layouts/Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import { numberFormat } from "../../Sources/PagoEnLinea/FormatPrice";

export default function InfoDonaciones(props) {
	const navigation = useNavigation();
	const content = props.route.params.content;

	if (content) {
		return (
			<SafeAreaView>
				<Header />
                <ScrollView>
				<Text style={styles.infoTitle}>Información De Su Donación</Text>
				<View style={styles.infoView}>
					<View style={styles.textBox}>
						<Text style={styles.textKey}>A Nombre De:</Text>
						<Text style={styles.textValue}>
							{" "}
							{content.nombre} {content.apellido}
						</Text>
					</View>
					<View style={styles.textBox}>
						<Text style={styles.textKey}>Donación:</Text>
						<Text style={styles.textValue}>{numberFormat(content.aporte)}</Text>
					</View>
					<View style={styles.textBox}>
						<Text style={styles.textKey}>Fecha:</Text>
						<Text style={styles.textValue}>{content.fecha}</Text>
					</View>
					<View style={styles.textBox}>
						<Text style={styles.textKey}>Estado De La Transacción:</Text>
						<Text style={styles.textValue}>{content.estado_de_pago}</Text>
					</View>
                    <View style={styles.textBox}>
						<Text style={styles.textKey}>Orden De Pago:</Text>
						<Text style={styles.textValue}>Nº{content.numero_orden}</Text>
					</View>
				</View>
                <View style={styles.infoView}>
                <View style={styles.textBox}>
					<ImageBackground
						source={require("../../../assets/Cruz_de_malta.png")}
                        style={styles.imageBackground}
                        imageStyle={{resizeMode: 'contain', opacity: 0.25,}}
					>
                        <Text style={styles.subTitle2}> Gracias por colaborar con</Text>
                        <Text style={styles.subTitle2}>  esta noble causa.</Text>
					</ImageBackground>
				</View>
				</View>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.backButton}
				>
					<Icon
						type="FontAwesome5"
						name="arrow-circle-left"
						size={40}
						color="#34495E"
					/>
				</TouchableOpacity>
                </ScrollView>
			</SafeAreaView>
		);
	} else {
		return null;
	}
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	infoTitle: {
		marginVertical: 10,
		marginHorizontal: 10,
		fontWeight: "bold",
		color: "#fff",
		fontSize: 20,
		textAlign: "center",
		justifyContent: "center",
		backgroundColor: "#34495E",
		height: 30,
		borderRadius: 15,
		overflow: "hidden",
	},
	infoView: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginVertical: 10,
		marginHorizontal: 10,
		backgroundColor: "#fff",
		borderWidth: 0.5,
		borderRadius: 20,
		borderColor: "#34495E",

	},
	textBox: {
        flexDirection: "column",
	},
	textKey: {
		marginVertical: 3,
		fontSize: 20,
		fontWeight: "bold",
		color: "#03255f",
		alignSelf: "center",
	},
	textValue: {
		fontSize: 15,
		alignSelf: "center",
		fontWeight: "700",
		color: "#696969",
	},
	backButton: {
		flexDirection: "row",
		width: 55,
		height: 55,
		alignSelf:'flex-start',
        justifyContent: "center",
        marginTop:200,
        marginLeft: 10,
        borderRadius: 25,
        position: 'absolute',
    },
	subTitle2: {
		fontSize: 25,
		color: "#03255F",
		fontWeight: "bold",
		width: width * 0.95,
		textAlign: "center",
        alignSelf: "center",
	},
	imageBackground: {
		alignSelf: "center",
		justifyContent: "center",
        width: width *0.75,
        height: height * 0.25,
	},
});
