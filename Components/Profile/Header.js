import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions, Image} from 'react-native';
//import icBack from '../../src/images/icons/ic_back.png';
import Global from '../../Globals';
const icBack = "http://"+Global.API+"/server/uploads/icon/ic_back.png";
const icNull = "http://"+Global.API+"/server/uploads/icon/null.png";


const { width, height } = Dimensions.get("window");

export default class Header extends Component{

    goToBack(){
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
    }
    render(){
        const {navigation} = this.props;
        return(
            <View style={styles.wrapper}>

                <View style={styles.iconWrapper}>
                    <TouchableOpacity onPress={()=>this.goToBack()}>
                        <Image style={styles.iconStyle} source={{uri: icBack}}></Image>
                    </TouchableOpacity>
                    <Text style={styles.title}>Thành viên</Text>
                    <Image style={styles.iconStyle} source={{uri: icNull}}></Image>
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
        justifyContent: 'space-between',
    },
    iconStyle: {
        width: 25,
        height: 25
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#C2C1C5'
    }

});