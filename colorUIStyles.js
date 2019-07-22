import { StyleSheet, Platform, Dimensions } from 'react-native';

export const colorUIPropStyles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: Platform.OS === 'ios' ? 8 : 0,
    height: 100,
    marginTop: 3,
    marginBottom:3,
    width:'100%',
  },
  itemWrapper: {
    padding: 8,
    paddingLeft: 12,
    paddingTop:0,
    justifyContent: 'center',
    width: Platform.OS === 'ios' ? '100%' : '96%',
    height: '100%',
    marginLeft: Platform.OS === 'ios' ? 0 : '2%',
  },
  itemAvatar: {
    position: 'absolute',
    right: 15,
  },
  itemHead: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 13
  },
  itemSub: {
    color: 'white',
    fontSize: 12
  },
});

export const colorUIContainerStyles = StyleSheet.create({
    container: {
        width: Platform.OS === 'ios' ? '102%' : '96%',
        alignItems: 'center',
        paddingLeft: Platform.OS === 'ios' ? '0%' :'1%'
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
        marginTop:'5%',
        height:1,
        backgroundColor:'lightgrey'
    }
});
