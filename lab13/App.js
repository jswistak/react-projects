import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet,
  Text,
  View,
  Button, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  RefreshControl,
  TextInput,
  SafeAreaView,
  Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

function CountriesScreen({navigation}) {
  const [isLoading, setLoading]  = useState(false)
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('');

  const getCountries = async () => {
    setLoading(true)
    var url;
    if(search.length >= 3){
      url = 'https://restcountries.com/v3.1/name/' + search
    }
    else{
      url = 'https://restcountries.com/v3.1/all'
    }
    const response = await fetch(url)
    const data = await response.json()
    //console.log(data)
    setCountries(data)
    setLoading(false)
  }

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions : { onChangeText: (search) => setSearch(search.nativeEvent.text)}
    })
    getCountries()
    console.log(countries)
  },[search])

  const navigateToCountryDetails = (country) => {
    navigation.navigate('CountryDetailsScreen', country)
  }

  const renderCountry = ({item}) => {
    return <TouchableOpacity onPress={() => navigateToCountryDetails(item)}>
              <Text>{item.name.common}</Text>
            </TouchableOpacity>
  }
  return (
    <SafeAreaView style={styles.container}>
      
        
      {isLoading ? <ActivityIndicator/> : <>
      <FlatList data={countries} 
        ListHeaderComponent={<Text>Found: {countries.length}</Text>}
        renderItem={renderCountry} 
        keyExtractor={item => item.name.common}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={getCountries}
          />}
        /></>}
      
    </SafeAreaView>
  );
}

function CountryDetailsScreen({route}) {
  const country = route.params;
  console.log(country)

  const flag = 'https://flagcdn.com/48x36/' + country.cca2.toLowerCase() + '.png';

  return (
    <View style={styles.countryDetails}>
      <Text>Name: {country.name.common}</Text>
      <Text>Capital: {country.capital}</Text>
      <Text>Region: {country.region}</Text>
      <Text>Subregion: {country.subregion}</Text>
      <Text>Population: {country.population}</Text>
      <Image source={{uri: flag}} style={{width: 48, height: 36}} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CountriesScreen" component={CountriesScreen} options={{ title: 'Countries' }} />
        <Stack.Screen name="CountryDetailsScreen" component={CountryDetailsScreen} options={{ title: 'Country Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 0
  },
  countryDetails: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0
  },
  content: {
    margin: 20,
    fontSize: 18,
  }
});
