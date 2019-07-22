import { StyleSheet, Platform, Dimensions } from 'react-native';

var windowWidth = Dimensions.get('window').width;
var windowHeight = 812;

export const appColor='#140958';

export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width:'100%'
    },
    title: {
        fontWeight: "700",
        fontSize: Platform.OS === 'ios' ? 36 : 24,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        color: Platform.OS === 'ios' ? 'black' : 'grey',
    },
    viewSelect: {
      height: 32,
      width: 32,
      top: "20%",
      left: Dimensions.get('window').width/3,
      shadowOffset:{  width: 0,  height: 2,  },
      shadowColor: 'black',
      shadowOpacity: 0.2
      },
      shadowSet: {
          shadowOffset:{  width: 0,  height: 2,  },
          shadowColor: 'black',
          shadowOpacity: 0.2
      },
      textbox: {
        textAlign: 'center',
        color:'black',
        width: '98%',
        marginTop: 12,
        height: 32,
        borderRadius: 8 ,
        fontSize: 16,
        backgroundColor: '#eee',
      },
    header: {
        width:'100%',
        alignItems:'flex-start'
    },
    heading: {
        fontWeight: "700",
        fontSize:24,
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: 'left',
        marginTop: '2%',
        color:'black'
    },
    placeholder: {
        color:'grey',
        marginTop:'8%',
        marginBottom: '12%'
    },
    line: {
          width:'112%',
          height:1,
          backgroundColor:'lightgrey'
      },
    scrollView: Platform.select({
      ios: {height:'95%', padding:'4%', width:'100%'},
      android: {height:'98%', width:'100%'},
      // android: {height:'90%', width:'92%', marginLeft:'4%'},
    }),
    scrollViewContainer: {
        alignItems: 'center',
        paddingBottom: windowHeight/5,
        width: '100%'
    },
    textbox: {
      textAlign: 'center',
      color:'black',
      width: '98%',
      marginTop: 12,
      paddingBottom: 8,
      height: Platform.OS === 'ios' ? 32 : 36,
      borderRadius: 8 ,
      fontSize: 16,
      backgroundColor: '#eee',
    },
    textinput: {
        fontSize: 16,
        marginBottom: '2%'
    },
    textinputheader: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: -15

    },
    button:{
        margin:5,
        marginTop:10,
        marginBottom:10,
        padding: 15,
        borderRadius: 10,
        height: 55,
        shadowOffset:{  width: 0,  height: 2,  },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#007AFF'
    }
});
