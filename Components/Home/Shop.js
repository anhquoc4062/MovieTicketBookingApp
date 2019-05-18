
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions} from 'react-native';
import Header from './Header';
import Body from './Body/Body';
import { ScrollView } from 'react-native-gesture-handler';


const { wHeight } = Dimensions.get("window");

export default class Shop extends Component{

    openMenu(){
        const { open } = this.props;
        open();
    }

    render(){
        const {navigation} = this.props;
        return(
            <ScrollView style={styles.wrapper}>
                <Header onOpen={this.openMenu.bind(this)} navigation={navigation}/>

                <Body navigation={navigation}/>
                
            </ScrollView>
        )
            
    };
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#1D1D27',
        shadowColor: 'black',
        shadowOffset: {width: -10, height: 10},
        shadowOpacity: 0.2,
    },
    body:{

    }

});