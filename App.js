import 'react-native-gesture-handler';
import React from 'react'
import {Image} from 'react-native'

import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import HomeScreen from './src/screens/HomeScreen'
import SearchScreen from './src/screens/SearchScreen'
import AddPostScreen from './src/screens/AddPostScreen'
import ActivityScreen from './src/screens/ActivityScreen'

import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import home from './src/assets/icons/home.png'
import search from './src/assets/icons/search.png'
import addPost from './src/assets/icons/addPost.png'
import activity from './src/assets/icons/activity.png'
import profile from './src/assets/icons/profile.png'


import {Provider} from 'react-redux'
import store from './src/redux/store'

const stack=createStackNavigator()
const bottomTab=createBottomTabNavigator()

const authFlow=()=>{
  return(
    <stack.Navigator>
      <stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={ {  headerShown:false } }
        />
      <stack.Screen 
        name="SignUp" 
        component={SignUpScreen}
        options={ { headerShown:false } }
        />
  </stack.Navigator>
  )
}


const mainFlow=()=>{
  return(
    <bottomTab.Navigator>
      <bottomTab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => {
              return <Image source={home} />
            },
            title:""
          }}
      />
      <bottomTab.Screen
          name="search"
          component={SearchScreen}
          options={{
            tabBarIcon: () => {
              return <Image source={search} />
            },
            title:""
          }}
      />
      <bottomTab.Screen
          name="add"
          component={AddPostScreen}
          options={{
            tabBarIcon: () => {
              return <Image source={addPost}/>
            },
            title:""
          }}
      />
      <bottomTab.Screen
          name="activity"
          component={ActivityScreen}
          options={{
            tabBarIcon: () => {
              return <Image source={activity}/>
            },
            title:""
          }}
      />
      <bottomTab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: () => {
              return <Image source={profile} />
            },
            title:""
          }}
      />
    </bottomTab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
          <stack.Screen
          name="authFlow"
          component={authFlow}
          options={ { headerShown:false } }
          />

          <stack.Screen
            name="mainFlow"
            component={mainFlow}
            options={ { headerShown:false } }
          />
      </stack.Navigator>
    </NavigationContainer>
  )
}

export default ()=>{
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  )
}
