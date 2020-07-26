import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "../../Utils/Style";
import HeaderView from "../../components/Layouts/Header";
import firebase from "../../../Firebase/Firebase";
import usePreference from "../../Hooks/usePreferences";
import CarouselHome from "../../components/Layouts/Carousel";

export default function HomeScreen(props) {
  const navigation = useNavigation();
  const { userFbData } = usePreference();
  console.log(navigation)

if(userFbData){
  return (
		<View style={styles.mainView}>
			<HeaderView props={props} />
			<CarouselHome />
			<View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
				<View style={styles.bodyHome}>
					<View style={styles.buttonsHome}>
						<TouchableOpacity
							onPress={() => navigation.navigate("Donar")}
							style={styles.buttonYellow}
						>
							<Text style={styles.textCompany}>Alcancia Digital</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate("Bingo")}
							style={styles.buttonBlue}
						>
							<Text style={styles.textUsers}>Bingo</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate("Bono")}
							style={styles.buttonYellow}
						>
							<Text style={styles.textCompany}>Bono Rifa</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.buttonsHome}>
						<TouchableOpacity
							onPress={() => navigation.navigate("Mis Donaciones")}
							style={styles.buttonBlue}
						>
							<Text style={styles.textUsers}>Mis Donaciones</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								width: 110,
								height: 110,
								alignItems: "center",
								justifyContent: "center",
								marginLeft: 5,
								marginRight: 5,
							}}
						>
							<Image
								source={require("../../../assets/Cruz_de_malta.png")}
								style={{
									resizeMode: "stretch",
									height: 100,
									width: 100,
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate("Mis Bonos")}
							style={styles.buttonBlue}
						>
							<Text style={styles.textUsers}>Mis Bonos</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.buttonsHome}>
						<TouchableOpacity style={styles.buttonYellow}>
							<Text style={styles.textCompany}>
								<Icon name="users" size={25} color="#03255F" />
								{`\nPerfil`}
							</Text>
						</TouchableOpacity>
						{userFbData.subtipo ? (
							<TouchableOpacity
								onPress={() => navigation.navigate("Panel De Control")}
								style={styles.buttonBlue}
							>
								<Text style={styles.textUsers}>
									<Icon name="tools" size={25} color="#F5C300" />
									{`\nPanel De Control`}
								</Text>
							</TouchableOpacity>
						) : (
							<TouchableOpacity style={styles.buttonBlue}>
								<Text></Text>
							</TouchableOpacity>
						)}
						<TouchableOpacity onPress={Logout} style={styles.buttonYellow}>
							<Text style={styles.textCompany}>
								<Icon name="door-open" size={25} color="#03255F" />
								{`\nCerrar Sesión`}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}else{
  return null
}
	
}

const Logout = () => {
	firebase.auth().signOut();
};
