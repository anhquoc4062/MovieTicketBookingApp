import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Image, ScrollView, Dimensions} from 'react-native';
import Global from '../../../Globals'
import Icon from 'react-native-ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get("window");

export default class Body extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: '',
            movieData: [],
        }
    }

    componentDidMount(){
        const idAccount = this.props.navigation.getParam('idAccount', -1);
        return fetch('http://'+Global.API+'/server/getbookedmovie.php?idaccount='+idAccount)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    movieData: responseJson,
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        return (
        <View style={styles.container}>
            <ScrollView  contentContainerStyle={styles.contentContainer}>
                {this.state.movieData.map((item, index)=>(
                    <View style={styles.containerBox}>
                    <Image source={{uri: "http://"+Global.API+"/server/uploads/posters/"+item.hinh_phim}} style={styles.poster}/>
                    <View style={{flexDirection: 'column'}}>
                    <Text style={styles.movieName}>
                        {item.ten_phim}
                    </Text>
                    <Text style={styles.movieDuration}>{item.thoiluong_phim} phút</Text>
                    <Text style={styles.movieShowTime}>{item.giochieu} - {item.ngaychieu}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#F95860',fontWeight: 'bold',paddingHorizontal: 10,fontSize: 15, justifyContent: 'center'}}>Tổng cộng:</Text>
                        <Text style={styles.movieTotal}>${item.tongtien} </Text>
                    </View>
                    </View>
                </View>
                ))}
            
            </ScrollView>
        </View>
        );
    }
    }

    const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1D1D27',
        flex: 1
    },
    poster : {
        height: 150, width: (width/3)-20
    },
    movieName: {color: '#C2C1C5', marginVertical: 10, paddingLeft: 10, fontSize: 15, fontWeight: 'bold', width: (width/3)*2},
    movieDuration: {
        color: '#F66280',
        fontWeight: 'bold',
        paddingHorizontal: 10,
        fontSize: 16
    },
    movieDesc:{
        color: '#767680', marginTop: 5, paddingLeft: 10, fontSize: 13, width: (width/3)*2
    },
    containerBox: {
        flexDirection: 'row',
        borderBottomColor: '#2E2E38',
        borderBottomWidth: 1,
        paddingVertical: 5,
    },
    contentContainer: {
        paddingVertical: 20
    },
    movieShowTime: {
        color: '#767680',
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    movieTotal: {
        color: '#C2C1C5',
        fontWeight: 'bold',
        fontSize: 17
    }

});