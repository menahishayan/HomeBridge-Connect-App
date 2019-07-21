import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './Home.js'
import InitScreen from './Init.js'

export class InitLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.loadItems(props.navigation);
    }

    loadItems = async(navigation) => {
        let urlLoad = await AsyncStorage.getItem('homeBridgeURL');
        let portLoad = await AsyncStorage.getItem('homeBridgePort');
        let authLoad = await AsyncStorage.getItem('homeBridgeAuth');

        // console.log(urlLoad);

        if(urlLoad == null || portLoad == null || authLoad == null) {
            navigation.navigate('Init');
        } else {
            navigation.navigate('App', {URL: urlLoad, PORT: portLoad, AUTH: authLoad});
        }
    }

    render() {
        return(
            <View style={{height:'100%', width:'100%', alignItems: 'center', justifyContent:'center'}}>
                <Text>HomeBridge Connect</Text>
            </View>
        );
    }
}

const AppStack = createStackNavigator({ Home: HomeScreen });
const InitStack = createStackNavigator({ Init: InitScreen });

export default createAppContainer(createSwitchNavigator(
  {
    InitLoading: InitLoadingScreen,
    App: AppStack,
    Init: InitStack,
  },
  {
    initialRouteName: 'InitLoading',
  }
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
