import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Auth from './src/components/Auth/Auth';
import firebase from './Firebase/Firebase';
import Navigation from './src/components/Navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;

  const NavigationMyTheme = {
    colors: {
      primary: '#3498db',
      background: 'white',
      card: '#03255F',
      text: '#03255F',
    },
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
      text: '#3498db'
    },
  };


  return (
    <>
      {user ?
        <PaperProvider theme={theme}  >
          <NavigationContainer theme={NavigationMyTheme}>
            <StatusBar />
            <Navigation />
          </NavigationContainer>
        </PaperProvider>
        :
        <>
          <StatusBar />
          <SafeAreaView style={styles.background}>
            <ScrollView>
              <Auth />
              <Text style={styles.smartApps}>
                ©2020 Powered by Smartapps
            </Text>
            </ScrollView>
          </SafeAreaView>
        </>
      }
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#03255F',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  smartApps: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 50,
  },
});
