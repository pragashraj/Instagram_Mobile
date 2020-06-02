import ImagePicker from 'react-native-image-picker'

    const options={
        storageOptions:{
            skipBackup:true,
            path:'images'
        }
    }

     const launchCamera= ()=>{
        ImagePicker.launchCamera(options,(response)=>{
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            }else{
                const source={uri:response.uri}
            } 
        })
    }

    export default launchCamera