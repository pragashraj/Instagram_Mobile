import 'react-native-gesture-handler';
import React from 'react'
import { View, Text } from 'react-native'

import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import ProfileScreen from './src/screens/ProfileScreen'

import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'

const stack=createStackNavigator()


const authFlow=()=>{
  return(
    <stack.Navigator>
      <stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={
          {
            headerShown:false
          }
        }
        />
      <stack.Screen 
        name="SignUp" 
        component={SignUpScreen}
        options={
          {
            headerShown:false
          }
        }
        />
  </stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
          <stack.Screen
            name="authFlow"
            component={authFlow}
            options={
              {
                headerShown:false
              }
            }
        />
      </stack.Navigator>
    </NavigationContainer>
  )
}

export default App
