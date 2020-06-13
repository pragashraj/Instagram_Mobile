import React ,{Component} from 'react'
import {View,Text,StyleSheet,FlatList} from 'react-native'

import CustomSearchBox from '../components/CustomSearchBox'
import MessageBox from '../components/MessageBox'

import {database,fbase} from '../config/config'


class MessagesScreen extends Component{
    state={
        searchInput:'',
        message:[
            {messId:1,name:"Mr.John",newIndicator:true},
            {messId:2,name:"Spr_Raj",newIndicator:false},
            {messId:3,name:"Mr.Kamal",newIndicator:false},
        ],
        data:[]
    }

    handleSearchInput=(e)=>{
        this.setState({
            searchInput:e
        })
    }

    fetchDatas=()=>{
        const myId=fbase.auth().currentUser.uid
        var data=[]
        // database.ref('chats').child(myId).once('value').then(snapshot=>{
        //     snapshot.forEach(item => {
        //         var temp = item.val()
        //         // data.push(temp);
        //         console.warn(item)
        //     })
        //     // console.warn(data.length)
        //     // this.setState({
        //     //     data:data
        //     // })
        // })

        database.ref('chats').child(myId).on('value',function(snapshot){
            console.warn(snapshot.val())
        })
    }

    componentDidMount(){
        this.fetchDatas()
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
                        <FlatList
                            data={this.state.message}
                            keyExtractor={item=>item.messId}
                            renderItem={({item})=>{
                                return(
                                    <MessageBox name={item.name} navigation={this.props.navigation} newIndicator={item.newIndicator}/>
                                )
                            }}
                        />
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