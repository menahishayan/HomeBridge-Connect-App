import React from 'react';
import { Image, TextInput, TouchableOpacity, ScrollView, Alert, AsyncStorage, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Button, Icon } from 'react-native-elements';

import { ColorUIProp } from './ColorUI';
import { colorUIPropStyles } from './colorUIStyles';
import { globalStyles } from './styles';

export default class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: '',
			port: '',
			auth: '',
			updateEnabled: false
		}
		this.loadItems(props.navigation);
		const navigation = props.navigation;
	}

	static navigationOptions = ({navigation}) => ({
		title: 'Settings',
	});

	loadItems = async(navigation) => {
        let urlLoad = await AsyncStorage.getItem('homeBridgeURL');
        let portLoad = await AsyncStorage.getItem('homeBridgePort');
        let authLoad = await AsyncStorage.getItem('homeBridgeAuth');

        // console.log(urlLoad);

        if(urlLoad == null || portLoad == null || authLoad == null) {
            navigation.navigate('Init');
        } else {
            await this.setState({url: urlLoad, port: portLoad, auth: authLoad});
        }
    }

	submit = (navigation)  => {
		AsyncStorage.setItem('homeBridgeURL', 'http://' + this.state.url);
        AsyncStorage.setItem('homeBridgePort', this.state.port);
        AsyncStorage.setItem('homeBridgeAuth', this.state.auth);
		// console.log(this.state);
		navigation.navigate('App');
	}

    render() {
        return(
			<ScrollView contentContainerStyle={{ width:'100%', alignItems:'center', justifyContent: 'center', marginLeft: '1%', marginRight: '1%'}}>
				<Text style={{textAlign: 'center', fontSize: 28, fontWeight: 'bold', width: '60%', marginTop: '10%'}}>HomeBridge Connect</Text>
				<Text style={{textAlign: 'center', fontSize: 14, width: '60%'}}>The Android App For HomeBridge</Text>
				<Button
				  title="About HomeBridge Connect"
				  type="clear"
				  containerStyle={{marginBottom: '10%'}}
				  onPress={() => {this.props.navigation.push('Help')}}
				/>
				<View style={{width: '98%', marginBottom: '10%', alignItems: 'center'}}>
				<View style={{ width:'82%', alignItems: 'flex-start', justifyContent:'center', marginBottom: '5%'}}>
				<Text style={globalStyles.textinputheader}>HOMEBRIDGE IP</Text>
				<View style={{ width:'100%', flexDirection: 'row'}}>
						<TextInput
							onChangeText={(text) => this.setState({url: text})}
							defaultValue={this.state.url}
							placeholder="192.168.0.1"
							returnKeyType="next"
							onSubmitEditing={() => {this.portInput.focus(); this.setState({updateEnabled: true});}}
							blurOnSubmit={false}
							style={globalStyles.textinput}
							keyboardType="numeric"
						  />
				  </View>
				  <Text style={globalStyles.textinputheader}>HOMEBRIDGE PORT</Text>
				  <TextInput
	  				onChangeText={(text) => this.setState({port: text})}
					defaultValue={this.state.port}
	  				placeholder="54349"
					returnKeyType="next"
					ref={(input) => { this.portInput = input; }}
					onSubmitEditing={() => {this.authInput.focus(); this.setState({updateEnabled: true});}}
					blurOnSubmit={false}
					keyboardType="numeric"
					style={globalStyles.textinput}
	  			  />
				  <Text style={globalStyles.textinputheader}>AUTHORIZATION</Text>
				  <TextInput
	  				onChangeText={(text) => this.setState({auth: text})}
					defaultValue={this.state.auth}
	  				placeholder="123-45-678"
					returnKeyType="done"
					ref={(input) => { this.authInput = input; }}
					onSubmitEditing={() => { this.setState({updateEnabled: true});}}
					style={globalStyles.textinput}
					keyboardType="phone-pad"
	  			  />
				  </View>
				 { this.state.updateEnabled && <Button title="Update" onPress={() => this.submit(this.props.navigation)}
				  	buttonStyle={[globalStyles.button]}
					containerStyle={{width: '90%', marginBottom: '3%'}} />}


				<Button
				  title="Reset Data"
				  type="clear"
				  containerStyle={{marginBottom: '4%'}}
				  onPress={() => {AsyncStorage.clear();this.props.navigation.navigate('Init')}}
				/>
				</View>
				<View style={{width: '100%', 'alignItems': 'center', marginVertical: '10%',}}>
				<Image source={require('./img/logo.png')} resizeMode="contain" style={{width: '25%', marginVertical: '-30%' }}/>
				<Text style={{fontSize: 11, color:'grey', textAlign: 'center'}}>HomeBridge Connect v1.0{'\n'}Created by Menahi Shayan. 2019.</Text>
				</View>
            </ScrollView>
        );
    }
}
