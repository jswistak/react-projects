import { useEffect, useCallback, useContext } from "react";
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { ImageContext } from "../data/store";

const PhotoView = () => {
    const { image, setImage } = useContext(ImageContext);
    return (

        <View style={styles.container}>
            <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
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

export default PhotoView;