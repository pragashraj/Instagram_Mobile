import React from 'react'
import { View, Image , StyleSheet,TouchableOpacity} from 'react-native'

const StoryComponent = () => {
    return (
        <View>
            <View style={styles.storyBlock}>
                <TouchableOpacity>
                    <Image source={require('../assets/icons/nonStory.png')} style={styles.story}/>
                </TouchableOpacity>
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
        width:90,
        height:90,
        borderRadius:45
    }
})

export default StoryComponent
