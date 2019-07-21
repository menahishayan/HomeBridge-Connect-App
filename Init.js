import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

export default class InitScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: '',
			port: '',
			auth: ''
		}
	}

	submit = (navigation)  => {
		AsyncStorage.setItem('homeBridgeURL', this.state.url);
        AsyncStorage.setItem('homeBridgePort', this.state.port);
        AsyncStorage.setItem('homeBridgeAuth', this.state.auth);
		console.log(this.state);
		navigation.navigate('App', {URL: this.state.url, PORT: this.state.port, AUTH: this.state.auth});
	}

    render() {
        return(
			<View style={{height:'100%', width:'100%', alignItems: 'center', justifyContent:'center'}}>
			<Input
				title="HomeBridge URL"
				onChangeText={(text) => this.setState({url: text})}
				placeholder="http://homebridge.local"
			  />

			  <Input
			  	title="Port"
  				onChangeText={(text) => this.setState({port: text})}
  				placeholder="54349"
  			  />

			  <Input
			  	title="Authorization"
  				onChangeText={(text) => this.setState({auth: text})}
  				placeholder="123-45-678"
  			  />

			  <Button title="Next" onPress={() => this.submit(this.props.navigation)}/>
			  </View>


        );
    }
}
