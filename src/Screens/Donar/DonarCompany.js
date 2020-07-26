import React, { useState } from "react";
import { View, Text,ScrollView, TouchableOpacity, TextInput } from "react-native";
import styles from "../../Utils/Style";
import HeaderView from "../../components/Layouts/Header";
import MainImage from "../../components/Layouts/MainImage";
import usePreference from "../../Hooks/usePreferences";
import firebase from "../../../Firebase/Firebase";
import moment from "moment";
import {useNavigation} from '@react-navigation/native'
import {validateEmail} from '../../Utils/validation'

export default function DonarCompany(props) {
  const navigation = useNavigation();
	const { userFbData } = usePreference();
	const [formError, setFormError] = useState({});
	const [nombre, setNombre] = useState(userFbData.nombre);
  const [rutEmpresa, setRutEmpresa] = useState(userFbData.rutEmpresa);
  const [email, setEmail] = useState(userFbData.email);
  const [telefono, setTelefono] = useState(userFbData.telefono);
  const [representante, setRepresentante] = useState(userFbData.representante)
  const [aporte, setAporte] = useState();
  

  const submit = () => {
		let errors = [];
		if (!nombre || !rutEmpresa || !aporte || !email || !telefono || !representante) {
			if (!nombre) errors.nombre = true;
			if (!rutEmpresa) errors.rutEmpresa = true;
      if (!aporte) errors.aporte = true;
      if (!validateEmail(email)) errors.email = true;
      if (!telefono) errors.telefono = true;
      if (!representante) errors.representante = true;
		} else {
			const key = firebase.database().ref().push().key;
			firebase
				.database()
				.ref()
				.child(`Users/${userFbData.uid}/aportes/${key}/`)
				.set({
					aporte: aporte,
					nombre: nombre,
          rutEmpresa: rutEmpresa,
          email: email,
          telefono: telefono,
          representante: representante,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					id: key,
					estado_de_pago: "",
					forma_de_pago: "",
					uid: userFbData.uid,
				});
			firebase
				.database()
				.ref()
				.child(`Donaciones/${key}/`)
				.set({
					aporte: aporte,
					nombre: nombre,
          rutEmpresa: rutEmpresa,
          email: email,
          telefono: telefono,
          representante: representante,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					id: key,
					estado_de_pago: "",
					forma_de_pago: "",
					uid: userFbData.uid,
				});
			alert("su donacion a sido exitosa");
			handleReset();
		}
		setFormError(errors);
  };
  
  const handleReset = () => {
		setNombre(userFbData.nombre);
    setRutEmpresa(userFbData.rutEmpresa);
    setEmail(userFbData.email);
    setTelefono(userFbData.telefono);
    setRepresentante(userFbData.representante)
		setAporte("");
	};



    return (
        <View style={styles.mainView}>
          <HeaderView props={props} />
          <MainImage />
          <ScrollView>
            <View>
              <Text style={styles.titles}>Aporte Empresa</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.form}>Nombre(s)</Text>
              <TextInput
               name="nombre"
               style={[styles.input, formError.nombre && styles.error]}
               textContentType="username"
               placeholder="Ingrese nombre..."
               defaultValue={nombre}
               onChange={(e) => setNombre(e.nativeEvent.text)}
               editable={false}
              />
              <Text style={styles.form}>Rut De La Empresa</Text>
              <TextInput
                name="rutEmpresa"
                style={[styles.input, formError.rutEmpresa && styles.error]}
                placeholder="Ingrese Rut Empresa..."
                defaultValue={rutEmpresa}
               onChange={(e) => setRutEmpresa(e.nativeEvent.text)}
               editable={false}
              />
              <Text style={styles.form}>Email</Text>
              <TextInput
                name="email"
                textContentType="emailAddress"
                style={[styles.input, formError.email && styles.error]}
                placeholder="Ingrese email ..."
                defaultValue={email}
                onChange={(e) => setEmail(e.nativeEvent.text)}              
              />
              <Text style={styles.form}>Telefono De Contacto</Text>
              <TextInput
                name="telefono"
                textContentType="telephoneNumber"
                style={[styles.input, formError.telefono && styles.error]}
                placeholder="+56 9 ..."
                defaultValue={telefono}
                keyboardType="phone-pad"
                keyboardAppearance="dark"
                onChange={(e) => setTelefono(e.nativeEvent.text)}
              />
              <Text style={styles.form}>Nombre De Contacto</Text>
              <TextInput
                name="representante"
                style={[styles.input, formError.representante && styles.error]}
                textContentType='nickname'
                placeholder="Ingrese representante..."
                defaultValue={representante}
                onChange={(e) => setRepresentante(e.nativeEvent.text)}
              />
              <Text style={styles.form}>Aporte</Text>
              <TextInput
                name="aporte"
                style={[styles.input, formError.aporte && styles.error]}
                placeholder="Ingrese Aporte..."
                keyboardType='numeric'
                defaultValue={aporte}
                onChange={(e) => setAporte(e.nativeEvent.text)}
              />
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={submit}
                style={styles.buttonPagar}
              >
                <Text style={styles.textSubmit}>Donar</Text>
              </TouchableOpacity>
              <TouchableOpacity
						onPress={() => navigation.navigate('Home')}
						style={styles.buttonPagar}
						>
							<Text style={styles.bonoSubmit} >Volver</Text>
						</TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
}
