import React, { Component } from 'react'
import { View } from 'react-native'
import ImagePicker from 'react-native-image-picker'

class LaunchGallery extends Component {
    state={
        Imagefile:{}
    }

    options={
        storageOptions:{
            skipBackup:true,
            path:'images'
        }
    }

    launchImageGallery=()=>{
        ImagePicker.launchImageLibrary(this.options,(response)=>{
            if (response.didCancel) {
                console.warn('User cancelled image picker');
            } else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            }else{
                const source={uri:response.uri}
                this.setState({
                    Imagefile: {
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
                    this.launchImageGallery()
                }
            </View>
        )
    }
}

export default LaunchGallery