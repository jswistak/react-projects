import { useEffect, useCallback, useContext } from "react";
import { StyleSheet, Image, View, Platform, Button } from 'react-native';
import { ImageContext } from "../data/store";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";

const GalleryView = () => {
    const { image, setImage } = useContext(ImageContext);
    const pickImage = async () => {
        const navigation = useNavigation();
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            //navigation.navigate('Photo');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an image from gallery" onPress={pickImage} />
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

export default GalleryView;