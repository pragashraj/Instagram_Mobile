import firebase from 'firebase'

const config={
    apiKey: "AIzaSyC0D2wPpX5zFDqwWMbpfnRUC6-OaylC-ro",
    authDomain: "react-native-example-22024.firebaseapp.com",
    databaseURL: "https://react-native-example-22024.firebaseio.com",
    projectId: "react-native-example-22024",
    storageBucket: "react-native-example-22024.appspot.com",
    messagingSenderId: "954092383711",
    appId: "1:954092383711:web:c95881522cb76c9b91686a",
    measurementId: "G-WTL0XTVFRZ"
}

firebase.initializeApp(config)

export const firebase=firebase
export const database=firebase.database()
export const auth=firebase.auth()
export const storage=firebase.storage()