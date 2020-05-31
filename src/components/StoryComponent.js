import React from 'react'
import { View, Image , StyleSheet,TouchableOpacity} from 'react-native'

const StoryComponent = ({pic}) => {
    return (
        <View>
            <View style={styles.storyBlock}>
                {
                    pic ==='' ? (
                        <TouchableOpacity>
                            <Image source={require('../assets/icons/nonStory.png')} style={styles.story}/>
                        </TouchableOpacity>
                    ) :(
                        <TouchableOpacity>
                            <Image source={{uri:pic}} style={styles.story}/>
                        </TouchableOpacity>
                    )
                }              
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    storyBlock:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    story:{
        width:70,
        height:70,
        borderRadius:35,
        opacity:0.5
    }
})



export default StoryComponent
