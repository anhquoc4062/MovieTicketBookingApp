import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions, Image} from 'react-native';
import Global from '../../Globals'
const icBack = "http://"+Global.API+"/server/uploads/icon/ic_back.png";


const { wHeight } = Dimensions.get("window");

export default class Header extends Component{

    render(){
        const {navigation} = this.props;
        return(
            <View style={styles.wrapper}>

                <View style={styles.iconWrapper}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} >
                        <Image style={styles.iconStyle} source={{uri: icBack}}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
            
    };
}

const styles = StyleSheet.create({
    wrapper: {
        height : 45,
        backgroundColor: 'transparent',
        padding: 20,
        justifyContent: 'space-around',
        zIndex: 5
    },
    iconWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconStyle: {
        width: 25,
        height: 25
    }

});