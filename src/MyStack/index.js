import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PrincipalScreen from "../MyStackScreen/PrincipalScreen";
import SplashScreen from "../MyStackScreen/SplashScreen";
import LoginForm from "../../src/MyStackScreen/LoginForm";
import Register from "../MyStackScreen/Register";
import RegisterUser from "../MyStackScreen/RegisterUser";
import RegisterCompany from "../MyStackScreen/RegisterCompany";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Principal" component={PrincipalScreen} />
        <Stack.Screen name="LoginForm" component={LoginForm} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterUser" component={RegisterUser} />
        <Stack.Screen name="RegisterCompany" component={RegisterCompany} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
