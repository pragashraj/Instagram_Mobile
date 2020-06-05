import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet,FlatList,TextInput,TouchableOpacity} from 'react-native'

class PostComments extends Component {
    render() {
        return (
            <View>
                <View style={styles.postBlock}>
                    <View style={styles.head}>

                    </View>

                    <View style={styles.Image}>
                        <Image source={{uri:this.props.route.params.post.url}} style={styles.image} />
                    </View>

                    <View style={styles.likes}>
                        <Text style={styles.likesTxt}>Liked By {this.props.route.params.postLikes}</Text>
                        <Text >Comments.....</Text>
                    </View>

                    <View style={styles.comments}>
                        <FlatList
                                data={this.props.route.params.postComments}
                                keyExtractor={item=>item.commentor}
                                renderItem={({item})=>{
                                    return <View style={styles.eachBlock}>
                                        <Text style={styles.commentor}>{item.commentor} : </Text>
                                        <Text style={styles.comTxt}> {item.comment}</Text>
                                    </View>
                                }}
                        />
                    </View>

                    <View style={styles.chatInputBlock}>
                        <TextInput
                            style={styles.chatInputField}
                            onChangeText={(e)=>this.handleInput(e)}
                            placeholder="Your comment Here"
                        />
                        <TouchableOpacity style={styles.sendImgBlock}>
                            <Image 
                                source={require('../assets/icons/sendChat.png')} 
                                style={styles.sendImg}
                            />
                        </TouchableOpacity>
               </View>

                        
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({

    postBlock:{
        width:'96%',
        backgroundColor:'white',
        height:'96%',
        marginVertical:'2%',
        marginHorizontal:'2%',
        elevation:4
    },

    head:{
        width:'100%',
        height:10,
        backgroundColor:'silver'
    },

    Image:{
        width:'100%',
        height:280
    },

    image:{
        width:'100%',
        height:'100%',
    },

    likes:{
        width:'100%',
        height:50,
        backgroundColor:'lightgray',
        justifyContent:'center',
        paddingHorizontal:'3%',
    },

    likesTxt:{
        fontSize:15,
        fontWeight:'bold'
    },

    comments:{
        height:300,
        width:'100%',
        padding:'2%'
    },

    eachBlock:{
        marginBottom:'3%',
        flexDirection:'row',
    },

    commentor:{
        fontWeight:'bold'
    },

    comTxt:{
        fontSize:15
    },

    chatInputBlock:{
        width:'90%',
        height:50,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute', 
        bottom: '2%',
        borderWidth:0.3,
        borderRadius:20,
        marginHorizontal:'5%',
        backgroundColor:'white',
        elevation:3
    },

    chatInputField:{
        marginLeft:'5%',
        width:'80%',
        fontSize:18,
    },

    sendImgBlock:{
        width:'15%',
    },


    sendImg:{
        width:'100%',
        height:'80%'
    }


})

export default PostComments