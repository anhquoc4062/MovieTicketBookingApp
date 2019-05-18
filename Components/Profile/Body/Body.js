import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableHighlight, Alert, ActivityIndicator} from 'react-native';
import Global from '../../../Globals';
import { TouchableOpacity, TouchableWithoutFeedback,  } from 'react-native-gesture-handler';
import Icon from 'react-native-ionicons'
const ProfileIcon = "http://"+Global.API+"/server/uploads/icon/profile.png";
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentAvatar: null,
            modifiedAvatar: null,
            totalConsume: 0,
            data: null,
            isModified: 0,//1 is true 0 is false 2 isloading
        }
        this.selectImage = this.selectImage.bind(this);
    }
    selectImage(){
      const options = {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
    
      ImagePicker.showImagePicker(options, (response) => {
        console.log(response);
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let source = { uri: response.uri };
  
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
          this.setState({
            modifiedAvatar: source,
            data: response.data,
            isModified: 1
          });
        }
      });
           
    } 

    uploadImage(){
      this.setState({
        isModified: 2
      })
      RNFetchBlob.fetch('POST', 'http://'+Global.API+'/server/uploadimage.php', {
        Authorization : "Bearer access-token",
        otherHeader : "foo",
        'Content-Type' : 'multipart/form-data',
      },
      [
          { name : 'image', filename : 'image.png', type:'image/jpeg', data: this.state.data}
      ]).then((resp) => {
        console.log('log chỗ upload', JSON.parse(resp.data).Message);
        if(JSON.parse(resp.data).Message == 'Success'){
          const idAccount = this.props.navigation.getParam('idAccount', -1);
          this.changeAvatar(JSON.parse(resp.data).filename, idAccount);
        }
        else{
          Alert.alert(
            'Thông báo',
            'Upload ảnh thất bại',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        }
        
        this.setState({
          isModified: 0
        })
      }).catch((err) => {
        // ...
      })
    }

    changeAvatar(imgname, idaccount){
      fetch('http://'+Global.API+'/server/updateavatar.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imgname: imgname,
          idaccount: idaccount,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('log chỗ update', responseJson);
        if(responseJson.Message == 'Success'){
          Alert.alert(
            'Thông báo',
            'Upload ảnh thành công',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        }
        else{
          Alert.alert(
            'Thông báo',
            'Upload ảnh thất bại',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        }
      })
      .catch((error) => {
        console.error('lỗi chỗ update user', error);
      });;
    }

    componentDidMount(){
      const idAccount = this.props.navigation.getParam('idAccount', -1);
      return fetch('http://'+Global.API+'/server/getbookedmovie.php?idaccount=' + idAccount)
        .then((response) => response.json())
        .then((responseJson) => {
            var total = 0;
            responseJson.map(item => {
              total+=parseFloat(item.tongtien);
            })

            this.setState({
              totalConsume: total
            })
        })
        .catch((error) =>{
            console.error('error ở body profile', error);
        });

    }
  render() {
    
    console.log('log for isModified at render', this.state.isModified)
    const {navigation} = this.props;
    const idAccount = navigation.getParam('idAccount', -1);
    const username = navigation.getParam('username', '');
    const email = navigation.getParam('email', '');
    const avatar = navigation.getParam('avatar', '');
    var uriAvatar;
    if(avatar!=''){
      uriAvatar = {uri: "http://"+Global.API+"/server/uploads/avatar/"+avatar}
    }
    else{
      uriAvatar = {uri: ProfileIcon}
    }
    var chooseButtonJSX = (<TouchableOpacity onPress={this.selectImage.bind(this)} style={styles.uploadButton}>
                        <Text style={styles.upload}>Chọn ảnh</Text>
                      </TouchableOpacity>);
    var saveButtonJSX = (<TouchableOpacity onPress={this.uploadImage.bind(this)} style={styles.uploadButton}>
      <Text style={styles.upload}>Lưu ảnh</Text>
    </TouchableOpacity>);

    var loadingButtonJSX = (<TouchableWithoutFeedback style={styles.uploadButton}>
    <ActivityIndicator color="#C2C1C5"/>
    </TouchableWithoutFeedback>);
    //var buttonJSX = (this.state.isModified == false? chooseButtonJSX: saveButtonJSX);
    var buttonJSX = null;
    if(this.state.isModified == 0){
      buttonJSX = chooseButtonJSX;
    }
    else if (this.state.isModified == 2){
      buttonJSX = loadingButtonJSX;
    }
    else{
      buttonJSX = saveButtonJSX;
    }

    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.profileContainer}>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.selectImage.bind(this)}>
                    <Image source={this.state.modifiedAvatar!=null ? this.state.modifiedAvatar : uriAvatar} style={styles.icon}/>

                </TouchableOpacity>
            </View>
            {buttonJSX}
            <Text style={styles.username}>{username}</Text>
            <View style={{marginTop: 10, alignItems: 'center'}}>
                <Text style={{fontSize: 15, fontWeight:'bold', color:'#F66280'}}>Tổng chi tiêu</Text>
                <Text style={{fontSize: 30, fontWeight:'bold', color:'#C2C1C5'}}>${this.state.totalConsume}</Text>
            </View>
          </View>
          <View style={{backgroundColor: '#2E2E38'}}>
            <Text style={styles.headerText}>Thông tin tài khoản</Text>
        </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>{username}</Text>
          </View>
          <View style={styles.line}/>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>{email}</Text>
          </View>
          <View style={styles.line}/>
          <View style={{backgroundColor: '#2E2E38'}}>
            <Text style={styles.headerText}>Tác vụ</Text>
        </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>Thay đổi mật khẩu</Text>
          </View>
          <View style={styles.line}/>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>this.props.navigation.navigate('BookedMovie',{
              idAccount: idAccount
            })}>
              <Text style={styles.text}>Phim đã đặt</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerBox: {
    flexDirection: 'row',
  },
  profileContainer: {
      height: 330, 
      flexDirection: 'column',
      alignItems: 'center',
    },    
  contentContainer: {
    paddingVertical: 20
  },
  username: {marginTop: 10, fontWeight: 'bold', color: '#C2C1C5', fontSize: 25},
  line: {
    borderTopColor:'#2E2E38', 
    borderTopWidth: 1
  },
  text: {
    fontSize: 15, 
    marginTop: 15, 
    marginLeft: 20, 
    marginBottom: 15,
    color: '#C2C1C5'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15, 
    marginLeft: 10, 
    marginBottom: 15,
    color: '#F66280'
  },
  icon: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginTop: 20
  },
  upload: {
    color: '#C2C1C5',
    fontSize: 15,
    fontWeight:'bold'
  },
  uploadButton: {
    backgroundColor: '#F95860',
    marginTop: 5,
    paddingVertical: 5,
    borderRadius: 20,
    width: 100,
    alignItems: 'center'
  }
});