import React from 'react'
import { View, Text ,StyleSheet } from 'react-native'

const ActivityScreen = () => {
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Activity</Text>
            </View>

            <View style={styles.newActivity}>
                <Text style={styles.Text}>Today</Text>
            </View>

            <View style={styles.oldActivity}>
                <Text style={styles.Text}>This Month</Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    header:{
        width:'100%',
        height:'10%',
        justifyContent:'center',
    },

    headerText:{
        fontSize:24,
        marginLeft:'3%'
    },

    newActivity:{
        width:'100%',
        height:'30%',
        backgroundColor:'white'
    },

    Text:{
        fontSize:20,
        marginLeft:'3%',
        marginTop:'2%'
    },

    oldActivity:{
        width:'100%',
        height:'60%',
        backgroundColor:'white'
    },

})
export default ActivityScreen
