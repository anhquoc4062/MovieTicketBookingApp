import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions, Image} from 'react-native';

import Global from '../../../Globals'

import Swiper from 'react-native-swiper';
import ImageLoad from 'react-native-image-placeholder'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Slide1 = "http://"+Global.API+"/server/uploads/slide/art-50k_happy-ending---chi-tro-ly-cua-anh_980-x-448.jpg";
const Slide2 = "http://"+Global.API+"/server/uploads/slide/banner.jpg";
const Slide3 = "http://"+Global.API+"/server/uploads/slide/chi-muoi-ba_sneak_980-x-448.jpg";
const Slide4 = "http://"+Global.API+"/server/uploads/slide/hobbit-wide-banner_02.jpg";
const Slide5 = "http://"+Global.API+"/server/uploads/slide/inception_movie_poster_banner_04.jpg";
const Slide6 = "http://"+Global.API+"/server/uploads/slide/twilight-movie-wide.jpg";
export default class ViewSwiper extends Component{

    render(){
        return(
            <View style={styles.wrapper}>
                <Swiper activeDotColor='#ffffff' dotStyle={{borderColor:'white', borderWidth: 1 }}>
                    <ImageLoad source={{uri: Slide1}} style={styles.banner}></ImageLoad>
                    <ImageLoad source={{uri: Slide2}} style={styles.banner}></ImageLoad>   
                    <ImageLoad source={{uri: Slide3}} style={styles.banner}></ImageLoad>
                    <ImageLoad source={{uri: Slide4}} style={styles.banner}></ImageLoad>
                    <ImageLoad source={{uri: Slide5}} style={styles.banner}></ImageLoad>
                    <ImageLoad source={{uri: Slide6}} style={styles.banner}></ImageLoad>
                </Swiper>
            </View>
            
        )
            
    };
}

const imageWidth = width;
const imageHeight = (imageWidth/ 933) * 465;

const styles = StyleSheet.create({
    wrapper: {
        height: 190
    },

    banner: {
        width: imageWidth,
        resizeMode: "contain",
        height: imageHeight,
    }
    

});