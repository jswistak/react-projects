import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraView from './components/CameraView';
import GalleryView from './components/GalleryView';
import PhotoView from './components/PhotoView';
import { ImageContext } from './data/store';

const Tab = createBottomTabNavigator();

export default function App() {
  const [image, setImage] = useState("https://reactjs.org/logo-og.png");
  const value = { image, setImage };

  const getOptions = (icon: string) => ({
    tabBarIcon: ({ focused }: { focused: boolean }) => <Text
      style={focused ? { backgroundColor: 'lightblue' } : {}}>{icon}</Text>,
  })
  return (
    <ImageContext.Provider value={value}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Photo'>
          <Tab.Screen name="Camera" component={CameraView} options={getOptions('📷')} />
          <Tab.Screen name="Photo" component={PhotoView} options={getOptions('🏠')} />
          <Tab.Screen name="Gallery" component={GalleryView} options={getOptions('🖼️')} />
        </Tab.Navigator>
      </NavigationContainer>
    </ImageContext.Provider>
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
