import React from 'react';
import { Linking, Image, TouchableOpacity, ScrollView, Alert, AsyncStorage, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Button, Icon } from 'react-native-elements';

import { ColorUIProp } from './ColorUI';
import { colorUIPropStyles } from './colorUIStyles';

import * as aboutSrc from './about.json';

export default class HelpScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			items:[]
		}
	}

	static navigationOptions = ({navigation}) => ({
		title: 'Help',
	});

	componentDidMount() {
		this.reParser();
	}

	reParser = () => {
		let list=[];
		for(let a in aboutSrc) {
				list.push(aboutSrc[a]);
		}
		list.pop();
		// console.log(list);
		this.setState({items:list});
	}

    render() {
        return(
			<ScrollView contentContainerStyle={{ width:'100%', alignItems: 'center', justifyContent: 'center', marginHorizontal: '3%'}}>
				<Text style={{textAlign: 'center', fontSize: 28, fontWeight: 'bold', width: '60%', marginTop: '10%'}}>HomeBridge Connect</Text>
				<Text style={{textAlign: 'center', fontSize: 14, width: '60%'}}>The Android App For HomeBridge</Text>
				<View style={{width: '100%', marginVertical: '10%', marginHorizontal: '2%'}}>
				{
					this.state.items.length>0 && this.state.items.map((i,key) =>
						<View key={key} style={{width: '92%', marginVertical: '3%'}}>
							<Text style={{fontWeight: 'bold', fontSize: 18}}>{i.title}</Text>
							{
								i.value.map((v,vKey) =>
									<Text style={{textAlign: 'justify', marginBottom: '2%'}} key={vKey}>{v}</Text>
								)
							}{
								<View style={{width: '100%', flexDirection: 'row'}}>
								{
									i.links.map((l,lKey) =>
										<View  key={lKey} style={{width: '50%', flexDirection: 'row'}}>
											<Button title={l.title} type="clear" onPress={() => Linking.openURL(l.value)}/>
										</View>
									)
								}
								</View>
							}
						</View>
					)

				}
				</View>
				<View style={{width: '100%', 'alignItems': 'center', marginVertical: '10%'}}>
				<Image source={require('./img/logo.png')} resizeMode="contain" style={{width: '25%', marginVertical: '-30%' }}/>
				<Text style={{fontSize: 11, color:'grey', textAlign: 'center'}}>HomeBridge Connect v1.0{'\n'}Created by Menahi Shayan. 2019.</Text>
				</View>
            </ScrollView>
        );
    }
}
