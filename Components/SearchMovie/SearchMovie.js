import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Image, ScrollView, Dimensions, TouchableNativeFeedback, ActivityIndicator} from 'react-native';
import Global from '../../Globals'
import Icon from 'react-native-ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get("window");

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: '',
            movieData: [],
            isLoading: false
        }
    }

    onSearch(keyword){
        this.setState({
            isLoading: true
        })
        return fetch('http://'+Global.API+'/server/getmoviebyname.php?keyword='+keyword)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    movieData: responseJson,
                    isLoading: false
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        let textResult;
        if(this.state.movieData.length > 0){
            textResult=(<Text style={styles.movieName}>Tìm thấy {this.state.movieData.length} kết quả với từ khóa {this.state.keyword}</Text>)
        }
        else{
            textResult=(<Text style={styles.movieName}>Không tìm thấy kết quả nào</Text>)
        }
        var resultJSX = (
            <ScrollView  contentContainerStyle={styles.contentContainer}>
                {this.state.movieData.map((item, index)=>(
                <TouchableNativeFeedback
                onPress={()=>this.props.navigation.navigate('Detail',{
                            movieId: item.id_phim,
                        })}
                        >
                    <View style={styles.containerBox}>
                        <Image source={{uri: "http://"+Global.API+"/server/uploads/posters/"+item.hinh_phim}} style={styles.poster}/>
                        <View style={{flexDirection: 'column'}}>
                        <Text style={styles.movieName}>
                            {item.ten_phim}
                        </Text>
                        <Text style={styles.movieDuration}>{item.thoiluong_phim} phút</Text>
                        <Text style={styles.movieDesc} numberOfLines={2}>{item.mota}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                ))}
            
            </ScrollView>
        );
        var loadingJSX = (
            <View style={{flex: 1, padding: 20, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#F66280"/>
            </View>
        );
        var mainJSX = this.state.isLoading ? loadingJSX : resultJSX;
        return (
        <View style={styles.container}>
            <View style={{height: 60, justifyContent:'center', paddingHorizontal: 5}}>
                <View style={{height: 50, backgroundColor:'white', flexDirection: 'row', alignItems:'center', padding: 5}}>
                    <TouchableOpacity style={{marginLeft: 10}}><Icon android="md-search"/></TouchableOpacity>
                    <TextInput 
                    placeholder="Nhập phim cần tìm..." 
                    style={{fontSize:17, marginLeft: 15}} 
                    onChangeText={(keyword) => this.setState({keyword})}
                    onSubmitEditing = {()=>this.onSearch(this.state.keyword)}
                    />
                </View>
            </View>
            {textResult}
            {mainJSX}
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
        paddingHorizontal: 10
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
    }
    });