import React from 'react';
import { ImageBackground, View, Text, StyleSheet, Platform, Dimensions, Image, SafeAreaView, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { DrawerActions, navigationOptions } from 'react-navigation';
import { Icon, Avatar, Button } from 'react-native-elements';


import { gradients } from './gradient.js';
import { appColor, globalStyles } from './styles.js';
import { colorUIPropStyles, colorUIContainerStyles, colorUIButtonStyles } from './colorUIStyles.js';

var windowWidth = Dimensions.get('window').width;
var windowHeight = 812;

// adding the 'enforce' prop switches it to the rounded gradient style for both android and iOS
// else flat for android and rounded gradient for iOS

export class Header extends React.Component {
	constructor(props) {
		super();
	}
	render() {
		return(
			Platform.select({
		      ios:
				  <View style={{ alignItems: 'center', backgroundColor:'white' }} >
	  	          <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', width: "90%", backgroundColor:'white'}}>
	  	            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
	  	              <Icon name='menu' size={30} color='black'/>
	  	            </TouchableOpacity>
	  	            <View style={{flexDirection: "row"}}>
	  	              <Text style={[globalStyles.title]}>{this.props.title}</Text>
	  	            </View>
					{
						this.props.buttonRight && <TouchableOpacity onPress={() => {this.props.onPress()}} style={{position:'absolute', right:0, top:'10%'}}>
						<Icon
							rounded
							raised
							reverse={!this.props.toggle}
								name={this.props.buttonRight.icon}
								type={this.props.buttonRight.iconType}
							   color={appColor}
								size={14}
							  />
						</TouchableOpacity>
					}
	  	          </View>
	  	        </View>
			  ,
		      android:
				  <View style={{ alignItems: 'center', backgroundColor:'white', marginTop:'-7%'}} >
	  	          <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', width: "90%", backgroundColor:'white', flexDirection:'row'}}>
	  	            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
	  	              <Icon name='menu' size={30} color='grey'/>
	  	            </TouchableOpacity>
	  	            <View style={{flexDirection: "row", marginLeft:'30%', marginTop:'-3.5%'}}>
	  	              <Text style={[globalStyles.title]}>{this.props.title}</Text>
					  {
						  this.props.buttonRight && <TouchableOpacity onPress={() => {this.props.onPress()}} style={{position:'absolute', left:windowWidth*0.45, top:'10%'}}>
			                  <Icon
			                  rounded
			                  raised
			                  reverse={!this.props.toggle}
			                      name={this.props.buttonRight.icon}
			                      type={this.props.buttonRight.iconType}
			                     color={appColor}
			                      size={14}
			                    />
			              </TouchableOpacity>
					  }
	  	            </View>
	  	          </View>
	  	        </View>
		    })
		)
	}
}

export class ColorUIProp extends React.Component {
	constructor(props) {
		super();
	}

	gradientDaemon = (G, req) => {
      let gradientObj = gradients.find((element) => {
        return element.name == G;
      });
      if(!gradientObj) return './img/gradients/royal.png';
      return (req === 'color') ? gradientObj.color : gradientObj.src;
    }

	render() {
		let color = this.props.color;
		let commonWrapperStyle = [colorUIPropStyles.itemWrapper, this.props.wrapperStyle, this.props.large ? {padding:18, justifyContent:'flex-end'} : null];
		return(
			<View style={[colorUIPropStyles.item, this.props.containerStyle, {borderRadius: this.props.borderRadius}, this.props.large ? {marginTop: 10, height:190, width: Platform.OS === 'ios' ? '102%' : '98%'} : null]}>
			{
				!this.props.enforce ? Platform.select({
			      ios:
					<ImageBackground source={this.gradientDaemon(color, "src")} imageStyle={{ borderRadius: this.props.borderRadius || (this.props.large ? 10 : 8) }}
						style={commonWrapperStyle}>
					  {this.props.children}
					</ImageBackground>
				  ,
			      android:
					<View style={commonWrapperStyle.concat({elevation: 3, backgroundColor: this.gradientDaemon(color, "color")})}>
						{this.props.children}
					</View>
			  }) :
				<ImageBackground source={this.gradientDaemon(color, "src")} imageStyle={{ borderRadius: this.props.borderRadius || (this.props.large ? 10 : (Platform.OS === 'ios' ? 8 : 12))  }}
					style={commonWrapperStyle}>
				  {this.props.children}
				</ImageBackground>
		  }
		  </View>
		)
	}
}

export class ColorUIContainer extends React.Component {
	constructor(props) {
		super();
	}

	render() {
		return(
			<View style={[colorUIContainerStyles.container, this.props.containerStyle]}>
				{
					this.props.title ? <View style={[colorUIContainerStyles.header, this.props.headerStyle]}>
				  <Text style={[colorUIContainerStyles.heading, this.props.headerTextStyle]}>{this.props.title}</Text>
				</View> : null
			}
				{this.props.children || <Text style={colorUIContainerStyles.placeholder}>Nothing here. Check back again later.</Text>}
				<View style={[colorUIContainerStyles.line, this.props.lineStyle]}></View>
	        </View>
		)
	}
}
