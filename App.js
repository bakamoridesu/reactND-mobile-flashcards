import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import {NavigationContainer} from "@react-navigation/native";
import { createStore } from "redux";
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import { createStackNavigator } from "@react-navigation/stack";
import DeckView from "./components/DeckView";
import AddCard from "./components/AddCard";
import QuizView from "./components/QuizView";
import {HeaderBackButton} from '@react-navigation/stack';
import { dark, light } from "./utils/colors";
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { setLocalNotification } from "./utils/helpers";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: dark,
      showIcon: true,
      style: {
        height: 65,
        backgroundColor: light,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        }
      }
    }}
       navigationOptions={{
         header: null
       }}>
      <Tab.Screen
        name="DeckList"
        component={DeckList}
        options={{
          tabBarIcon: ({color}) => (<Ionicons name='ios-bookmarks' size={30} color={color}/>),
        }}/>
      <Tab.Screen
        name="AddDeck"
        component={AddDeck}
        options={{
          tabBarIcon: ({color}) => <FontAwesome name='plus-square' size={30} color={color}/>,
        }}
      />
    </Tab.Navigator>
  );
}

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render () {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' screenOptions={{
              headerStyle: {
                backgroundColor: light
              }
            }}>
              <Stack.Screen name='Home' component={MyTabs} options={{headerShown: false}}/>
              <Stack.Screen
                name='DeckView'
                component={DeckView}
                options={({navigation}) => ({
                  headerLeft: () => <HeaderBackButton
                    onPress={() => navigation.navigate('Home', {screen: 'DeckList'})}/>
                })}/>
              <Stack.Screen
                name='AddCard'
                component={AddCard}
                options={({navigation}) => ({
                  headerTitle: 'Add new question card',
                  headerLeft: () => <HeaderBackButton onPress={() => navigation.navigate('DeckView')}/>
                })}/>
              <Stack.Screen
                name='QuizView'
                component={QuizView}
                options={({navigation}) => ({
                  headerLeft: () => <HeaderBackButton onPress={() => navigation.navigate('DeckView')}/>
                })}/>
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


