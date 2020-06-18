import React, { useState } from 'react';
import { TextInput, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { validateEmail } from './validation';
import firebase from '../../../Firebase/Firebase';

const RegisterForm = (props) => {
    const { changeForm } = props;
    const [formData, setFormData] = useState(defaultValue);
    const [formError, setFormError] = useState({});

    const register = () => {
        let errors = {};
        if (!formData.nombre || !formData.apellido || !formData.email || !formData.password || !formData.repeatPassword) {
            if (!formData.nombre) errors.nombre = true;
            if (!formData.apellido) errors.apellido = true;
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
            if (!formData.repeatPassword) errors.repeatPassword = true;
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
        } else if (formData.password !== formData.repeatPassword) {
            errors.password = true;
            errors.repeatPassword = true;
        } else if (formData.password.length < 6) {
            errors.password = true;
            errors.repeatPassword = true;
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then((user) => {
                    console.log(user)
                    let uid = user.user.uid;
                    firebase.database().ref().child('Users/' + uid).set({
                        uid: uid,
                        type: 'admin',
                        nombre: formData.nombre,
                        apellido: formData.apellido,
                        email: formData.email,
                        password: formData.password,
                    })
                }).catch(() => {
                    setFormError({
                        nombre: true,
                        apellido: true,
                        email: true,
                        password: true,
                        repeatPassword: true,
                    });
                });
        }

        setFormError(errors);
    };

    return (
        <>
            <TextInput
                style={[styles.input, formError.nombre && styles.error]}
                placeholder="Nombre(s)"
                placeholderTextColor="#969696"
                onChange={(e) => setFormData({ ...formData, nombre: e.nativeEvent.text })}
            />
            <TextInput
                style={[styles.input, formError.apellido && styles.error]}
                placeholder="Apellido(s)"
                placeholderTextColor="#969696"
                onChange={(e) => setFormData({ ...formData, apellido: e.nativeEvent.text })}
            />
            <TextInput
                style={[styles.input, formError.email && styles.error]}
                placeholder="Correo Electronico"
                placeholderTextColor="#969696"
                onChange={(e) => setFormData({ ...formData, email: e.nativeEvent.text })}
            />
            <TextInput
                style={[styles.input, formError.password && styles.error]}
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={(e) => setFormData({ ...formData, password: e.nativeEvent.text })}
            />
            <TextInput
                style={[styles.input, formError.repeatPassword && styles.error]}
                placeholder="Repetir Contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={(e) => setFormData({ ...formData, repeatPassword: e.nativeEvent.text })}
            />
            <TouchableOpacity onPress={register} style={styles.button}><Text style={styles.text}>Registrarse</Text></TouchableOpacity>
            <View style={styles.login}>
                <TouchableOpacity onPress={changeForm} style={styles.button}><Text style={styles.text}>LogIn</Text></TouchableOpacity>
            </View>
        </>
    )
}

function defaultValue() {
    return {
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        repeatPassword: '',
    }
}

export default RegisterForm

const styles = StyleSheet.create({
    input: {
        height: 50,
        color: '#fff',
        width: 300,
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040',
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#F5C300',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
    text: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
    error: {
        borderColor: '#940c0c',
    },
    login: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
});