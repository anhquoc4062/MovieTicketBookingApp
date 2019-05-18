import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions, Image, Alert} from 'react-native';
import Header from '../Checkout/Header';
import Body from './Body/Body';
import { ScrollView } from 'react-native-gesture-handler';
import getToken from '../../src/api/getToken';
import checkLogin from '../../src/api/checkLogin';
import Global from '../../Globals';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Checkout extends Component{
    constructor(props){
        super(props);

    }
    componentDidMount(){
        
    }

    postData(idphim, idaccount, ghedachon, combodachon, giochieu, ngaychieu, tongtien){
        console.log('post', JSON.stringify({
            idphim: idphim,
            idaccount: idaccount,
            ghedachon: ghedachon,
            combodachon: combodachon,
            giochieu: giochieu,
            ngaychieu: ngaychieu,
            tongtien: tongtien
        }));
        fetch('http://'+Global.API+'/server/confirmcheckout.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idphim: idphim,
                idaccount: idaccount,
                ghedachon: ghedachon,
                combodachon: combodachon,
                giochieu: giochieu,
                ngaychieu: ngaychieu,
                tongtien: tongtien
            }),

        })
        .then((response)=>response.text())
        .then((responseJson)=>{
            console.log('checkout response', responseJson)
            if(responseJson == 'SUCCESS'){
                Alert.alert(
                    'Thông báo',
                    'Thanh toán thành công',
                    [
                      {text: 'OK', onPress: () => console.log('pressed')}
                    ],
                    {cancelable: false},
                  );
            }
            else{
                Alert.alert(
                    'Thông báo',
                    'Thanh toán thất bại',
                    [
                      {text: 'OK', onPress: () => console.log('pressed')}
                    ],
                    {cancelable: false},
                  );
            }
        })
        .catch((error)=>(console.log(error)));
    }

    bookingConfirm(){
        const {navigation} = this.props;
        const selectedSeats = navigation.getParam('selectedSeats', '');
        const selectedCombo = navigation.getParam('selectedCombo', '');
        const selectedTime = navigation.getParam('selectedTime', '');
        const selectedDate = navigation.getParam('selectedDate', '');
        const movieId = navigation.getParam('movieId', -1);
        const totalCosts = navigation.getParam('totalCosts', 0);
        console.log('checkout', totalCosts);
        var accountId = '';
        getToken()
        .then(token => checkLogin(token))
        .then(res => {
            if(res.token != 'ERROR'){
                accountId = res.id
            }
            console.log(res);
        })
        .then(()=>{
            //post data here
            console.log('accountId' ,accountId);

            this.postData(movieId, accountId, JSON.stringify(selectedSeats), JSON.stringify(selectedCombo), selectedTime, selectedDate, totalCosts);
            navigation.popToTop();
        })
        .catch(error => console.log('error' ,error));

    }

    alertCheckout(){
        Alert.alert(
            'Thông báo',
            'Xác nhận đặt vé',
            [
              {text: 'Xác nhận', onPress: () => this.bookingConfirm()},
              {text: 'Hủy', onPress: () => console.log('OK Pressed')}
            ],
            {cancelable: false},
          );
    }

    render(){
        const {navigation} = this.props;
        return(
            <View style={styles.wrapper}>
                <ScrollView>
                    <Header navigation= {navigation}/>
                    <Body navigation= {navigation} />
                    
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={()=>this.alertCheckout()}>
                    <Text style={styles.buttonText}>XÁC NHẬN</Text>
                </TouchableOpacity>
            </View>
            
            
        )
            
    };
}

const imageWidth = width;
const imageHeight = (imageWidth/ 933) * 465;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#1D1D27',

    },
    button: {
        height: 55,
        backgroundColor: '#F66280',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#C2C1C5'
    }

});