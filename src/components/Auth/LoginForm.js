import React, { useState } from 'react';
import { TextInput, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { validateEmail } from './validation';
import firebase from '../../../Firebase/Firebase';

const LoginForm = (props) => {
    const { changeForm } = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});
    const [userLog, setUserLog] = useState(null)

    const login = () => {
        let errors = {};
        if (!formData.email || !formData.password) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
            console.log('ERROR 1');
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
            console.log('ERROR 2');
        } else {
            firebase.auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    console.log('OK')
                })
                .catch(() => {
                    setFormError({
                        email: true,
                        password: true,
                    });
                });
        }
        setFormError(errors);
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    };

    return (
        <>
            {
                userLog === 'Personas' ?
                    <>
                        <TextInput
                            style={[styles.input, formError.email && styles.error]}
                            placeholder="Correo Electronico"
                            placeholderTextColor="#969696"
                            onChange={(e) => onChange(e, 'email')}
                        />
                        <TextInput
                            style={[styles.input, formError.password && styles.error]}
                            placeholder="Contraseña"
                            placeholderTextColor="#969696"
                            secureTextEntry={true}
                            onChange={(e) => onChange(e, 'password')}
                        />
                        <TouchableOpacity onPress={login} style={styles.button}><Text style={styles.text}>Iniciar Sesión</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setUserLog(null)} style={styles.button}><Text style={styles.text}>Volver</Text></TouchableOpacity>
                    </>
                    :
                    null
            }
            {
                userLog === null ?
                    <View style={styles.login}>
                        <TouchableOpacity onPress={() => setUserLog('Personas')} style={styles.button}><Text style={styles.text}>Iniciar Sesión</Text></TouchableOpacity>
                        <TouchableOpacity onPress={changeForm} style={styles.button}><Text style={styles.text}>Registrarse</Text></TouchableOpacity>
                    </View>
                    :
                    null
            }
        </>
    )
}

export default LoginForm

function defaultValue() {
    return {
        email: '',
        password: '',
    }
}

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
    register: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    text: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
    error: {
        borderColor: '#940c0c',
    },
});