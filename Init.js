import React from 'react';
import { Image, TextInput, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import { globalStyles } from './styles';

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
		AsyncStorage.setItem('homeBridgeURL', 'http://' + this.state.url);
        AsyncStorage.setItem('homeBridgePort', this.state.port);
        AsyncStorage.setItem('homeBridgeAuth', this.state.auth);
		// console.log(this.state);
		navigation.navigate('App');
	}

	static navigationOptions = ({navigation}) => ({
		header: null,
		cardStyle: {
			backgroundColor:'white'
		}
	});

    render() {
        return(
			<View style={{height:'100%', width:'100%', alignItems: 'center', justifyContent:'center', backgroundColor: 'white'}}>
			<Image source={require('./img/logo.png')} resizeMode="contain" style={{width: '60%'}}/>
			<View style={{ width:'82%', alignItems: 'flex-start', justifyContent:'center', marginBottom: '5%'}}>
			<Text style={globalStyles.textinputheader}>HOMEBRIDGE IP</Text>
			<View style={{ width:'100%', flexDirection: 'row'}}>
				<View style={{ width:'15%', flexDirection: 'row'}}>
				<TextInput
					defaultValue="http://"
					style={[globalStyles.textinput, {color:'black'}]}
					editable={false}
				  />
				</View>
				<View style={{ width:'50%', flexDirection: 'row'}}>
					<TextInput
						onChangeText={(text) => this.setState({url: text})}
						placeholder="192.168.0.1"
						returnKeyType="next"
						onSubmitEditing={() => this.portInput.focus()}
						blurOnSubmit={false}
						style={globalStyles.textinput}
						keyboardType="numeric"
					  />
				</View>
			  </View>
			  <Text style={globalStyles.textinputheader}>HOMEBRIDGE PORT</Text>
			  <TextInput
  				onChangeText={(text) => this.setState({port: text})}
  				placeholder="54349"
				returnKeyType="next"
				ref={(input) => { this.portInput = input; }}
				onSubmitEditing={() => this.authInput.focus()}
				blurOnSubmit={false}
				keyboardType="numeric"
				style={globalStyles.textinput}
  			  />
			  <Text style={globalStyles.textinputheader}>AUTHORIZATION</Text>
			  <TextInput
  				onChangeText={(text) => this.setState({auth: text})}
  				placeholder="123-45-678"
				returnKeyType="done"
				ref={(input) => { this.authInput = input; }}
				style={globalStyles.textinput}
				keyboardType="phone-pad"
  			  />
			  </View>
			  <Button title="Connect" onPress={() => this.submit(this.props.navigation)}
			  	buttonStyle={[globalStyles.button]}
				containerStyle={{width: '90%', marginBottom: '3%'}} />

				<Button
				  title="Help"
				  type="clear"
				  containerStyle={{marginBottom: '4%'}}
				  onPress={() => this.props.navigation.push('Help')}
				/>
			  </View>
        );
    }
}
