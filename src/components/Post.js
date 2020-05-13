import React, { Component } from 'react'
import { Text, View , StyleSheet , Image , TouchableOpacity} from 'react-native'

class Post extends Component {
    render() {
        return (
            <View>
                <View style={styles.postHeader}>
                    <View style={styles.proImageBlock}>
                        <Image source={require('../assets/icons/proImage.png')} style={styles.proImage}/>
                    </View>

                    <View style={styles.postHolderBlock}>
                        <Text style={styles.postHolder}>PostHolder</Text>
                    </View>

                    <View style={styles.moreBlock}>
                        <TouchableOpacity>
                            <Image source={require('../assets/icons/more.png')} style={styles.moreImage}/>
                        </TouchableOpacity>
                    </View>
                       
                </View>

                <View style={styles.post}>
                    <Image source={require('../assets/icons/post.jpg')} style={styles.postContent}/>
                </View>

                <View style={styles.userAction}>
                    <TouchableOpacity>
                        <Image source={require('../assets/icons/like.png')} style={styles.actions}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image source={require('../assets/icons/comments.png')} style={styles.actions}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image source={require('../assets/icons/message.png')} style={styles.actions}/>
                    </TouchableOpacity>
    
                </View>

                <View style={styles.likesCountBlock}>
                    <Text style={styles.likesCount}>Liked by 123</Text>
                </View>

                <View style={styles.commentsBlock}>
                    <Text style={styles.comments}>view comments .....</Text>
                </View>

            </View>
        )
    }
}

const styles=StyleSheet.create({

    postHeader:{
        width:'100%',
        height:'10%',
        flexDirection:'row',
        alignItems:'center',
        borderTopWidth:0.2,
        backgroundColor:'white',
    },

    proImageBlock:{
        width:'15%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },

    proImage:{
        width:'65%',
        height:'90%',
    },

    postHolderBlock:{
        width:'65%',
        height:'100%',
        justifyContent:'center',
    },

    postHolder:{
        fontSize:17,
    },

    moreBlock:{
        width:'20%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },

    post:{
        width:'100%',
        height:'60%',
    },

    postContent:{
        width:'100%',
        height:'100%',
    },

    userAction:{
        width:'100%',
        height:'10%',
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:'2%'
    },

    actions:{
        marginLeft:'5%'
    },

    likesCountBlock:{
        width:'100%',
        height:'10%',
        justifyContent:'center',
        backgroundColor:'white'
    },

    likesCount:{
        marginLeft:'4%',
        fontSize:16,
    },


    commentsBlock:{
        width:'100%',
        height:'10%',
        justifyContent:'center',
        backgroundColor:'white',
        borderBottomWidth:0.2
    },

    comments:{
        marginLeft:'4%',
        fontSize:16,
    }
})

export default Post