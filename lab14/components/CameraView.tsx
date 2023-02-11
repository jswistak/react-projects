import { useEffect, useCallback, useContext } from "react";
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import { ImageContext } from '../data/store';
import * as ImagePicker from 'expo-image-picker';

const CameraView = () => {
    const { image, setImage } = useContext(ImageContext);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        ///TODO: obsluga braku permisji do kamery 
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CameraView;