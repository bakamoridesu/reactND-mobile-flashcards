import * as React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DeckList" component={DeckList}/>
      <Tab.Screen name="AddDeck" component={AddDeck}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="DeckList" component={DeckList} />
            <Tab.Screen name="AddDeck" component={AddDeck} />
          </Tab.Navigator>
        </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
