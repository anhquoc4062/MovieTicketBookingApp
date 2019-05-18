import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions, Image, Alert} from 'react-native';
import Header from './Header';
import Body from './Body/Body';
import { ScrollView } from 'react-native-gesture-handler';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class ChooseSeat extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { navigation } = this.props;
        
        return(
            <View style={styles.wrapper}>
                <ScrollView>
                    <Header navigation= {navigation}/>
                    <Body navigation= {navigation}/>
                </ScrollView>
            </View>
            
            
        )
            
    };
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#1D1D27',

    }
});