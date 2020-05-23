import React ,{useState} from 'react'
import { View,Button } from 'react-native'
import ImagePicker from 'react-native-image-picker'

const AddPostScreen = () => {
    const [Imagefile,setFile]=useState({})

    const options={
        storageOptions:{
            skipBackup:true,
            path:'images'
        }
    }

    const launchCamera=()=>{
        ImagePicker.launchCamera(options,(response)=>{
            if (response.didCancel) {
                console.warn('User cancelled image picker');
            } else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            }else{
                const source={uri:response.uri}
                setFile(
                    {
                        filePath: response,
                        fileData: response.data,
                        fileUri: response.uri
                    }
                )
            } 
        })
    }


    const launchImageGallery=()=>{
        ImagePicker.launchImageLibrary(options,(response)=>{
            if (response.didCancel) {
                console.warn('User cancelled image picker');
            } else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            }else{
                const source={uri:response.uri}
                setFile(
                    {
                        filePath: response,
                        fileData: response.data,
                        fileUri: response.uri
                    }
                )
            } 
        })
    }

    return (
        <View>
            <Button title="open camera" onPress={()=>launchCamera()}/>
            <Button title="open gallery" onPress={()=>launchImageGallery()}/>
        </View>
    )
}

export default AddPostScreen
