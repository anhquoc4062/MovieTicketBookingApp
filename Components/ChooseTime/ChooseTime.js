import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions, Image, Alert} from 'react-native';
import Header from '../ChooseSeat/Header';
import Body from './Body/Body';
import { ScrollView } from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class ChooseTime extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTime : "",
            selectedDate: ""
        }
    }
    updateState (selectedDate, selectedTime) {
        this.setState({
            selectedTime : selectedTime,
            selectedDate: selectedDate
        });
    }

    goToChooseSeat(){
        
        const { navigation } = this.props;
        const {selectedDate, selectedTime} = this.state;
        const movieId = navigation.getParam('movieId', -1);
        const movieName = navigation.getParam('movieName', '');
        const moviePoster = navigation.getParam('moviePoster', '');
        const movieDuration = navigation.getParam('movieDuration', '');
        if(selectedTime != ""){
            navigation.navigate('ChooseSeat',{
                movieId: movieId,
                movieName: movieName,
                moviePoster: moviePoster,
                movieDuration: movieDuration,
                selectedTime: selectedTime,
                selectedDate: selectedDate

            })
        }
        else{
            Alert.alert(
                'Thông báo',
                'Chưa chọn suất chiếu',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        }
        
    }

    render(){
        const { navigation } = this.props;
        return(
            <View style={styles.wrapper}>
                <ScrollView>
                    <Header navigation= {navigation}/>
                    <Body navigation= {navigation} updateParentState={this.updateState.bind(this)}/>
                    
                </ScrollView>
                <TouchableOpacity onPress={()=>this.goToChooseSeat()}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#F66280', '#F95860']} style={styles.button}>
                        <Text style={styles.buttonText}>CHỌN GHẾ</Text>
                    </LinearGradient>
                        
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#C2C1C5'
    }

});