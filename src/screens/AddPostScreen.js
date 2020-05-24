import React ,{useState,useEffect} from 'react'
import { View,Button } from 'react-native'
import ImagePicker from 'react-native-image-picker'

import LaunchCamera from '../components/LaunchCamera'
import LaunchGallery from '../components/LaunchGallery'

const AddPostScreen = () => {
    const [ImageFile,setImageFile]=useState({})
    const [cameraBtnClicked,setcameraBtnClicked]=useState(false)
    const [galleryBtnClicked,setGalleryBtnClicked]=useState(false)

    useEffect(()=>{
        setcameraBtnClicked(false)
        setGalleryBtnClicked(false)
    },[])

    const setState=(data)=>{
        setImageFile(data)
        console.warn(data)
    }
    
    return (
        <View>
            <Button title="open camera" onPress={()=>setcameraBtnClicked(true)}/>        
            <Button title="open gallery" onPress={()=>setGalleryBtnClicked(true)}/>
            <LaunchCamera setState={setState} launch={cameraBtnClicked}/>
        </View>
    )
}

export default AddPostScreen
