import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import ViewSwiper from './ViewSwiper';
import ViewPager from './ViewPager';
import ComingSoon from './ComingSoon';


const { wHeight } = Dimensions.get("window");

export default class Body extends Component{

    render(){
        const {navigation} = this.props;
        return(
            <View style={styles.wrapper}>
                <ViewSwiper />
                <ViewPager navigation={navigation}/>
                <ComingSoon navigation={navigation}/>
            </View>
        )
            
    };
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        top: -53,
    }

});