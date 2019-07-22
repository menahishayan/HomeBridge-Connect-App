import React from 'react';
import { Image, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './Home.js'
import SettingsScreen from './Settings.js'
import HelpScreen from './Help.js'
import InitScreen from './Init.js'

export class InitLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.loadItems(props.navigation);
    }

    static navigationOptions = ({navigation}) => ({
		backgroundColor:'white'
	});

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
            <View style={{height:'100%', width:'100%', alignItems: 'center', justifyContent:'center', backgroundColor: 'white'}}>
                <Image source={require('./img/logo.png')} resizeMode="contain" style={{width: '60%'}}/>
            </View>
        );
    }
}

const AppStack = createStackNavigator({ Home: HomeScreen, Settings: SettingsScreen, Help: HelpScreen});
const InitStack = createStackNavigator({ Main: InitScreen, Help: HelpScreen });

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
