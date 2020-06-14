import React ,{Component} from 'react'
import {View,Text,StyleSheet,FlatList} from 'react-native'

import CustomSearchBox from '../components/CustomSearchBox'
import MessageBox from '../components/MessageBox'

import {database,fbase} from '../config/config'


class MessagesScreen extends Component{
    state={
        searchInput:'',
        data:[],
    }

    handleSearchInput=(e)=>{
        this.setState({
            searchInput:e
        })
    }

    fetchMessagers=()=>{
        const myId=fbase.auth().currentUser.uid
        var data=[]
        var messages=[]
        var messagerId
        var temp
        var name
        database.ref('chats').child(myId).once('value').then(snapshot=>{
            snapshot.forEach(item => {
                item.forEach(msg=>{
                    temp = msg.val()
                    messagerId=temp.authorId
                    const message=temp.message
                    const type =temp.type
                    messages.push({message,type})
                    console.warn(messagerId)
                })
                database.ref('ProfileDetails').child(messagerId).on('value',function(snapshot){
                    const exist=(snapshot.val()!==null)
                    if(exist) temp=snapshot.val()
                    name=temp.Username
                })
                const dataContents={messagerId,name,messages}
                data.push(dataContents)
                console.warn("next")
            })

            this.setState({
                data:data
            })
           
            // console.warn(this.state.data)
        })
    }

    componentDidMount(){
        this.fetchMessagers()
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
                            data={this.state.data}
                            keyExtractor={item=>item.messagerId}
                            renderItem={({item})=>{
                                return(
                                    <MessageBox navigation={this.props.navigation} item={item}/>
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