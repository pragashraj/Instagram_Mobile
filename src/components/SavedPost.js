import React, { Component } from 'react'
import { Text, View ,StyleSheet} from 'react-native'

class SavedPost extends Component {

    state={
        emptiness:true,
        posts:[],
        loading:false
    }

    renderMessage=()=>{
        return(
            <View>
                <Text style={styles.contentTitle}>Saved Posts</Text>
                <Text style={styles.message}>When you saved photos & videos , they'll be here</Text>
            </View>
        )
    }

    render() {
        return (
            <View>
                <View>
                    {
                        this.state.emptiness ? this.renderMessage() : null
                    }
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({

    
    contentTitle:{
        fontSize:30,
        alignSelf:'center',
        marginTop:'1%'
    },

    message:{
        alignSelf:'center',
        opacity:0.5
    },


})

export default SavedPost