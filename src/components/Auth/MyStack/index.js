import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Auth2 from "../Auth2";
import styles from "../Style";

const Tab = createBottomTabNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Auth" component={Auth2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
