import React ,{Component} from 'react'
import {View,Text,StyleSheet} from 'react-native'

import CustomSearchBox from '../components/CustomSearchBox'
import MessageBox from '../components/MessageBox'

class MessagesScreen extends Component{
    state={
        searchInput:''
    }

    handleSearchInput=(e)=>{
        this.setState({
            searchInput:e
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.searchBlock}>
                    <View style={styles.searchBox}>
                        <CustomSearchBox handleSearchInput={this.handleSearchInput}/>
                    </View>
                </View>

                <View style={styles.messagesBlock}>
                    <Text style={styles.messTxt}>Messages</Text>
                    <View style={styles.messBx}>
                        <MessageBox name="Mr.John" navigation={this.props.navigation} newIndicator={true}/>
                        <MessageBox name="Spr_Raj" navigation={this.props.navigation} newIndicator={false}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({

    container:{
        flex:1
    },

    searchBlock:{
        width:'100%',
        height:80,
        justifyContent:'center',
        alignItems:'center',
    },

    searchBox:{
        width:'90%',
        height:'55%',
    },

    messagesBlock:{
        width:'100%',
        height:350,
    },

    messTxt:{
        fontSize:20,
        marginLeft:'6%',
        paddingTop:'2%',
        fontWeight:'bold'
    },

    messBx:{
        padding:'5%',
        marginBottom:'3%'
    },
})

export default MessagesScreen