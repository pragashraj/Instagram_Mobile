import React, { Component } from 'react'
import { Text, View } from 'react-native'
import ImagePicker from 'react-native-image-picker'

class LaunchCamera extends Component {

    state={
        Imagefile:{}
    }

    options={
        storageOptions:{
            skipBackup:true,
            path:'images'
        }
    }

    launchCamera=()=>{
        ImagePicker.launchCamera(this.options,(response)=>{
            if (response.didCancel) {
                console.warn('User cancelled image picker');
            } else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            }else{
                const source={uri:response.uri}
                this.props.setState(source)
                this.setState({
                    Imagefile:{
                        filePath: response,
                        fileData: response.data,
                        fileUri: response.uri
                    }
                })
            } 
        })
    }

    
    render() {
        return (
            <View>
                {
                    this.props.launch ?  this.launchCamera() :null
                }
            </View>
        )
    }
}

export default LaunchCamera