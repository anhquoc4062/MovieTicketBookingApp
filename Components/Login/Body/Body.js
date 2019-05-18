import React, { Component } from 'react';
import register from '../../../src/api/register';
import login from '../../../src/api/login';
import CheckSignIn from '../../CheckSignIn';
import saveToken from '../../../src/api/saveToken.js';
import getToken from '../../../src/api/getToken.js';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username   : '',
      password: '',
      email: '',
      repassword: '',
      isSignIn: true
    }
  }

  componentDidMount(){
    getToken()
    .then(token => console.log(token))
  }

  onClickListener = (viewId) => {
    if(viewId == 'login'){
        this.setState({
            isSignIn: true
        })
    }
    else{
        this.setState({
            isSignIn: false
        })
    }
  }

  onClickSignIn(){
    const {username, password} = this.state;
    const {navigation} = this.props;
    if(username == '' || password == ''){
      Alert.alert(
        'Thông báo',
        'Chưa nhập username hoặc password',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else{
      login(username, password)
      .then(res => {
        if(res.token == "ERROR"){
          Alert.alert(
            'Thông báo',
            'Tài khoản không tồn tại',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        }
        else{
          Alert.alert(
            'Thông báo',
            'Đăng nhập thành công',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
          CheckSignIn.onSignIn(res.username, res.avatar);
          saveToken(res.token);
          navigation.goBack();

        }
      })
    }
  }

  onClickSignUp(){
    const {username, password, email, repassword} = this.state;
    if(username == '' || email == '' || password == '' || repassword == ''){
      Alert.alert(
        'Thông báo',
        'Thông tin không được để trống',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else{
      if(password != repassword){
        Alert.alert(
          'Thông báo',
          'Mật khẩu không khớp',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }
      else{

        register(username,email, password)
        .then(res => {
          if(res == 'SUCCESS'){
            Alert.alert(
              'Thông báo',
              'Đăng ký thành công',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );

            this.setState({
              isSignIn: true
            })
          }
          else{
            Alert.alert(
              'Thông báo',
              'Đăng ký thất bại',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          }
        });
      }
    }
    
  }

  render() {
    const signInJSX = (
    <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="Tên đăng nhập"
          underlineColorAndroid='transparent'
          onChangeText={(username) => this.setState({username})}/>

        <TextInput style={styles.inputs}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          underlineColorAndroid='transparent'
          onChangeText={(password) => this.setState({password})}/>

        <TouchableOpacity style={styles.button} onPress={()=>this.onClickSignIn()}>
                <Text style={{fontSize: 15, color: '#F66280'}}>Đăng nhập ngay</Text>
          </TouchableOpacity>
    </View>
    );

    const signUpJSX = (
        <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="Tên đăng nhập"
          underlineColorAndroid='transparent'
          onChangeText={(username) => this.setState({username})}/>

        <TextInput style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid='transparent'
          onChangeText={(email) => this.setState({email})}/>

        <TextInput style={styles.inputs}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          underlineColorAndroid='transparent'
          onChangeText={(password) => this.setState({password})}/>

        <TextInput style={styles.inputs}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry={true}
          underlineColorAndroid='transparent'
          onChangeText={(repassword) => this.setState({repassword})}/>
        <TouchableOpacity style={styles.button} onPress={()=>this.onClickSignUp()}>
                <Text style={{fontSize: 15, color: '#F66280'}}>Đăng ký ngay</Text>
          </TouchableOpacity>
        
    </View>
    );

    const mainJSX = this.state.isSignIn? signInJSX: signUpJSX;
    const title = this.state.isSignIn? 'Đăng nhập': 'Đăng ký';
    return (
      <View style={styles.container}>
        <View style={styles.containerSignIn}>
          <Text style={styles.txtSignIn}>{title}</Text>
        </View>
        
        
        {mainJSX}

        <View style={styles.containerLogin}>
          <TouchableOpacity style={this.state.isSignIn? styles.loginButtonInactive: styles.loginButtonActive} onPress={() => this.onClickListener('login')}>
                <Text style={this.state.isSignIn? styles.inactiveText: styles.activeText}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity style={this.state.isSignIn? styles.signButtonActive: styles.signButtonInactive} onPress={() => this.onClickListener('signup')}>
                <Text style={this.state.isSignIn? styles.activeText: styles.inactiveText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D27',
  },
  inputContainer: {
      height:400,
      marginTop: 10,
      flexDirection: 'column',
      alignItems:'center',
  },
  inputs:{
    width:300,
    backgroundColor: '#FFFFFF',
      height:60,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      padding: 20,
      borderRadius: 20,
      marginBottom: 10
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  button:{
    marginTop: 15,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#F66280',
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:200,
    width:250,
    borderRadius: 20,
  },
  loginButtonActive: {
    backgroundColor: '#F66280',
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    width:150,
    height:60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 1
  },
  loginButtonInactive: {
    backgroundColor: '#2F2F37',
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    width:150,
    height:60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 1
  },
  signButtonActive: {
      
    backgroundColor: '#F66280',
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    width:150,
    height:60,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 1,
  },
  signButtonInactive: {
      
    backgroundColor: '#2F2F37',
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    width:150,
    height:60,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 1,
  },
  activeText: {
    color: 'white',
    fontSize: 15,
  },
  inactiveText: {
    color: '#767680',
    fontSize: 15,
  },
  txtSignIn: {
    color: '#F66280',
    fontSize: 40,
  },
  containerSignIn: {
    marginBottom: 30,
  },
  txtFont: {
    color: '#FFFFFF'
  },
  containerLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});