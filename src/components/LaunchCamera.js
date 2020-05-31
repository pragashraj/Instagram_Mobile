import ImagePicker from 'react-native-image-picker'

    const options={
        storageOptions:{
            skipBackup:true,
            path:'images'
        }
    }

    export  const launchCamera= ()=>{
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
                return source
            } 
        })
    }
