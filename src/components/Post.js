import React, {Component } from 'react'
import { Text, View , StyleSheet , Image , TouchableOpacity} from 'react-native'
import {database} from '../config/config'

import {connect} from 'react-redux'

import {setPostStatistics} from '../redux/actions/firebaseActions'

class Post extends Component {

    state={
        liked:false,
        likes:1,
        comments:null,
        stat:[],
        profilePicUrl:''
    }

    handleFetch=()=>{
        const id=this.props.post.id
        var commentsTmp=[]
        var likesTmp=0
        database.ref('PostStatistics').child(id).once('value').then(snapshot=>{
            snapshot.child('comments').forEach(item => {
                var temp = item.val()
                commentsTmp.push(temp);
            })
            this.setState({
                comments:commentsTmp
            })
        })

        database.ref('PostStatistics').child(id).once('value').then(snapshot=>{
            const exist=(snapshot.val()!==null)
            if(exist) likesTmp=snapshot.child('likes').child('count').val()
            this.setState({
                likes:likesTmp
            }) 
        })

    }

    fetchProfilePic=()=>{
        const authorId=this.props.post.authorId
        var url=''
        database.ref('ProfilePics').child(authorId).child('Pic').on('value',function(snapshot){
            const exist=(snapshot.val()!==null)
            if(exist) url=snapshot.val()
        })

        this.setState.apply({
            profilePicUrl:url
        })
    }

    componentDidMount(){
        this.handleFetch()
    }

    handleLike=()=>{
        this.setState({
            liked:!this.state.liked
        })
        const id=this.props.post.id
        var counts
        if(!this.state.liked){
            counts=this.state.likes + 1 ;
            database.ref('PostStatistics').child(id).child('likes').update({count:counts})
            this.handleFetch()
        }else{
            counts=this.state.likes + - 1;
            database.ref('PostStatistics').child(id).child('likes').update({count:counts})
            this.handleFetch()
        }
        this.props.setPostStatistics({postId:id,liked:this.state.liked})
    }

    render(){
        return (
            <View>
                <View style={styles.postHeader}>
                    <View style={styles.proImageBlock}>
                        <Image source={require('../assets/icons/proImage.png')} style={styles.proImage}/>
                    </View>

                    <View style={styles.postHolderBlock}>
                        <Text style={styles.postHolder}>{this.props.post.author}</Text>
                    </View>

                    <View style={styles.moreBlock}>
                        <TouchableOpacity onPress={()=>console.warn("more")}>
                            <Image source={require('../assets/icons/more.png')} style={styles.moreImage}/>
                        </TouchableOpacity>
                    </View>
                       
                </View>

                <View style={styles.post}>
                    <Image source={{uri:this.props.post.url}} style={styles.postContent}/>
                </View>

                <View style={styles.userAction}>
                    <TouchableOpacity onPress={this.handleLike}>
                        <Image source={this.props.postsStat.postsStat.liked ? require('../assets/icons/like.png'):  require('../assets/icons/afterLiked.png')} style={styles.actions}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                        const post=this.props.post
                        const postLikes=this.state.likes
                        const postComments=this.state.comments
                        this.props.navigation.navigate('Comments',{post})
                    }}>
                        <Image source={require('../assets/icons/comments.png')} style={styles.actions}/>
                    </TouchableOpacity>

                </View>

                <View style={styles.likesCountBlock}>
                    <Text style={styles.likesCount}>Liked by  {this.state.likes} </Text>
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
        height:50,
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
        height:300,
    },

    postContent:{
        width:'100%',
        height:'100%',
    },

    userAction:{
        width:'100%',
        height:50,
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
        height:30,
        justifyContent:'center',
        backgroundColor:'white'
    },

    likesCount:{
        marginLeft:'4%',
        fontSize:16,
    },


    commentsBlock:{
        width:'100%',
        height:40,
        justifyContent:'center',
        backgroundColor:'white',
        borderBottomWidth:0.2
    },

    comments:{
        marginLeft:'4%',
        fontSize:16,
    }
})

const mapStateToProps=({postStat:postsStat})=>{
    return{
        postsStat
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        setPostStatistics:postData=>dispatch(setPostStatistics(postData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post)