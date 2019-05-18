import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions, Image} from 'react-native';
import Header from '../ChooseCombo/Header';
import Body from './Body/Body';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class ChooseCombo extends Component{
    constructor(props){
        super(props);
        this.state = {
            total: 0,
            selectedCombo: [],
            comboCosts: 0,
        }
    }
    
    updateState (total, selectedCombo, comboCosts) {
        this.setState({
            total: total,
            selectedCombo: selectedCombo,
            comboCosts: comboCosts
        })
    }

    componentDidMount(){
        const { navigation } = this.props;
        const seatCosts = navigation.getParam('seatCosts', 0);
        this.setState({
            total: seatCosts
        })
    }

    goToCheckout(){
        const { total, selectedCombo, comboCosts } = this.state;
        const { navigation } = this.props;
        const movieId = navigation.getParam('movieId', -1);
        const movieName = navigation.getParam('movieName', '');
        const moviePoster = navigation.getParam('moviePoster', '');
        const movieDuration = navigation.getParam('movieDuration', 0);
        const selectedSeats = navigation.getParam('selectedSeats', '');
        const selectedTime = navigation.getParam('selectedTime', '');
        const selectedDate = navigation.getParam('selectedDate', '');

        navigation.navigate('Checkout',{
            movieId: movieId,
            movieName: movieName,
            moviePoster: moviePoster,
            movieDuration: movieDuration,
            selectedSeats: selectedSeats,
            totalCosts: total,
            selectedCombo: JSON.stringify(selectedCombo),
            selectedTime: selectedTime,
            selectedDate: selectedDate,
            comboCosts: comboCosts,
        });
    }

    render(){
        const { navigation } = this.props;
        
        const {total} = this.state;
        return(
            <View style={styles.wrapper}>
                <ScrollView>
                    <Header navigation= {navigation}/>
                    <Body navigation= {navigation} updateParentState={this.updateState.bind(this)}/>
                    
                </ScrollView>
                <TouchableOpacity onPress={()=>this.goToCheckout()}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#F66280', '#F95860']} style={styles.button}>
                        <Text style={styles.buttonText}>THANH TOÁN - ${this.state.total}</Text>
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