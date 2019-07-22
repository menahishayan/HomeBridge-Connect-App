import React from 'react';
import { TouchableOpacity, ScrollView, Alert, AsyncStorage, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';

import { ColorUIProp } from './ColorUI';
import { colorUIPropStyles } from './colorUIStyles';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: '',
			port: '',
			auth: '',
			accessories: [],
			refreshing: false
		}
		this.loadItems(props.navigation);
		const navigation = props.navigation;
	}

	static navigationOptions = ({navigation}) => ({
		title: 'HomeBridge',
		headerRight: (
			<TouchableOpacity onPress={() => navigation.push('Settings')}>
				<Icon name="settings" color="black" containerStyle={{marginRight: 15}}/>
			</TouchableOpacity>
		)
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
			this.getAccessories.bind(this);
        }
    }

	refreshHandler() {
		// this.setState({refreshing: true});
		setTimeout(this.getAccessories.bind(this), this.state.url!==''?5:700);
		// this.setState({refreshing: false});
	}

    getAccessories() {
		let accURL = this.state.url + ':' + this.state.port + '/accessories';
		fetch(accURL, {
	        method: 'GET',
	        headers: {
	            'Content-Type': 'application/json',
				'authorization': this.state.auth
	        }
	    })
	    .then(async(response) => {
			let responseJSON = await response.json();
			let accessories =[];
			responseJSON.accessories.forEach(i => {
				accessories.push({
					name: i.services[1].characteristics[0].value || i.services[0].characteristics[2].value,
					aid: i.aid,
					iid: i.services[1].characteristics[1].iid,
					type: i.services[0].characteristics[2].value,
					value: i.services[1].characteristics[1].value,
				});
			})
			this.setState({accessories: accessories})
		})
		.catch(e => {
			console.log(e);
			Alert.alert("Error", "Could not get HomeBridge data",
			[{text: 'Reload', onPress: () => this.getAccessories()},
		    {text: 'Settings', onPress: () => {this.props.navigation.push('Settings')}},
		  ],
		  {cancelable: false},
		  );
			// if(e) AsyncStorage.clear();
		});

    }

	toggleAccessory(accessory) {
		let charURL = this.state.url + ':' + this.state.port + '/characteristics';
		// console.log(accURL)
		fetch(charURL, {
	        method: 'PUT',
	        headers: {
	            'Content-Type': 'application/json',
				'authorization': this.state.auth
	        },
			body: JSON.stringify({
				characteristics: [
					{
						aid: accessory.aid,
						iid: accessory.iid,
						value: !accessory.value
					}
				]
			})
	    })
	    .then(async(response) => {
			let responseJSON = await response.json();
			if (responseJSON.characteristics[0].status == 0) {
				return !accessory.value
			}

		}).catch(e => {
			console.log(e)
			// if(e) AsyncStorage.clear();
		});

		return accessory.value
	}

    render() {
        return(
			<ScrollView contentContainerStyle={{ width:'100%', flexDirection: 'row', flexWrap:'wrap', justifyContent: 'center', marginLeft: '3%', marginRight: '3%'}} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refreshHandler()}
          />
        }>
                {
					this.state.accessories.length>0 && this.state.accessories.map((accessory, i) =>(
						<TouchableOpacity key={i} style={{width:'50%', height:135}} activeOpacity={0.4} onPress={() => {
							this.toggleAccessory(accessory) ? this.setState(({accessories}) => ({ accessories: [ ...accessories.slice(0,i), { ...accessories[i], value: false, }, ...accessories.slice(i+1) ] }))
                                        : this.setState(({accessories}) => ({ accessories: [ ...accessories.slice(0,i), { ...accessories[i], value: true, }, ...accessories.slice(i+1) ] }))
						}}>

	                  <ColorUIProp enforce color={accessory.value ? "Purple" : "Grey"} containerStyle={{marginTop: 10, height:125, width: '90%', borderRadius:10, marginLeft: '-1%', marginRight: '-1%'}} wrapperStyle={{padding:5, justifyContent:'center', paddingTop: 5}} borderRadius={10}>
	                         <View style={{width:'100%', alignItems:'flex-start', justifyContent:'center'}}>
							 		<Icon name={accessory.type == "Lightbulb" ? "lightbulb" : (accessory.type == "Fan" ? "fan" : "cube-outline")} type="material-community" color="white" />
	                              <Text style={[colorUIPropStyles.itemHead, {fontSize:22, marginTop:22, textAlign: 'center'}]}>{accessory.name}</Text>
	                              <Text style={{fontSize:12, color:'white', marginTop:0}}>{accessory.type}</Text>
	                         </View>
	                       </ColorUIProp>
	                     </TouchableOpacity>
					))
				}
            </ScrollView>
        );
    }
}
