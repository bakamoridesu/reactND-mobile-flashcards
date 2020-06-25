import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import {NavigationContainer} from "@react-navigation/native";
import {createStore} from "redux";
import {Provider} from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import { createStackNavigator } from "@react-navigation/stack";
import DeckView from "./components/DeckView";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

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
    <Provider store={createStore(reducer, middleware)}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={MyTabs} options={{headerShown: false}}/>
            <Stack.Screen name='DeckDetails' component={DeckView}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


