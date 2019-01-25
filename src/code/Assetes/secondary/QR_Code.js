import React, { Component } from 'react'; 
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Dimensions,
    Text,
    TouchableOpacity,
    Image,
    Clipboard,
  } from 'react-native';
  import QRCode from 'react-native-qrcode'; 
  import Identicon from 'polkadot-identicon-react-native';
  let ScreenWidth = Dimensions.get("screen").width;
  let ScreenHeight = Dimensions.get("screen").height;
  import { observer, inject } from "mobx-react";
  @inject('rootStore')
  @observer
  export default class Product_ErWeiMa extends Component{
      constructor(props){
          super(props)
          this.state={
              address:this.props.rootStore.stateStore.Accounts[this.props.rootStore.stateStore.Account].address
          }
          this.copy=this.copy.bind(this)
          this.back=this.back.bind(this)
      }   
      async copy(){
        Clipboard.setString(this.state.address);
        alert('Copy success')
      }
      back(){
        this.props.navigation.navigate('Tabbed_Navigation')
      }
      render(){
          return(
              <View style={styles.container}>
                {/* 标题栏 */}
                <View style={styles.title}>
                    <TouchableOpacity
                        onPress={this.back}
                    >
                        <Image
                        style={styles.image_title}
                        source={require('../../../images/Assetes/Create_Account/back.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.text_title}>Receive</Text>
                    <TouchableOpacity>
                        <Image 
                        style={styles.image_title}
                        //Need Open
                        // source={require('../../../images/Assetes/share.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.view}>
                    {/* Head_portrait */}
                    <Identicon
                        style={styles.Head_portrait}
                        value={this.props.rootStore.stateStore.Accounts[this.props.rootStore.stateStore.isfirst==0?0:this.props.rootStore.stateStore.Account].address}
                        size={ScreenHeight/14}
                        theme={'polkadot'}
                    />
                    {/* username */}
                    <Text style={styles.username}>{this.props.rootStore.stateStore.Accounts[this.props.rootStore.stateStore.Account].account}</Text>
                    <View style={styles.address}>
                      <Image style={styles.image_copy}/>
                      {/* address */}
                      <Text 
                        style={{width:ScreenWidth*0.5,fontWeight:'200',fontSize:ScreenWidth/28}}
                        ellipsizeMode={"middle"}
                        numberOfLines={1}
                      >
                        {this.state.address}
                      </Text>
                      {/* copy */}
                      <TouchableOpacity
                        onPress={this.copy}
                      >
                        <Image
                            style={styles.image_copy}
                            source={require('../../../images/Assetes/copy.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <QRCode
                        value={this.state.address}
                        size={ScreenHeight/4}
                        bgColor='black'
                        fgColor='white'
                    ></QRCode>
                </View>
              </View>
          )
      }
  }
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        backgroundColor:'black',
        // alignItems:'center',
        // justifyContent:'center'
    },
    title:{
        padding:ScreenHeight/50,
        height:ScreenHeight/9,
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'space-between'
    },
    text_title:{
        fontSize:ScreenHeight/37,
        fontWeight:'bold',
        color:'#e6e6e6'
    },
    image_title:{
        height:ScreenHeight/33.35,
        width:ScreenHeight/33.35,
        // resizeMode:'contain'
    },
    view:{
        height:ScreenHeight/1.63,
        width:ScreenWidth*0.95,
        backgroundColor:'white',
        marginLeft:ScreenWidth*0.025,
        borderRadius:ScreenHeight/100,
        marginTop:ScreenHeight/10,
        alignItems:'center'
    },
    Head_portrait:{
        marginTop:ScreenHeight/25,
        height:ScreenHeight/14,
        width:ScreenHeight/14,
        resizeMode:'contain',
        borderRadius:ScreenHeight/28
    },
    username:{
        marginTop:ScreenHeight/60,
        fontWeight:"200",
        fontSize:ScreenHeight/45,
    },
    address:{
        marginTop:ScreenHeight/60,
        height:ScreenHeight/3.81/6,
        width:ScreenWidth,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginBottom:ScreenHeight/25
    },
    image_copy:{
        marginLeft:ScreenWidth/53.57,
        height:ScreenHeight/30,
        width:ScreenHeight/30,
        resizeMode:'contain'
    }
})