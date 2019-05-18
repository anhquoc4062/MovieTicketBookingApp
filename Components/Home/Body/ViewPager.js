import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions, ViewPagerAndroid, TouchableNativeFeedback, Image, FlatList} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Global from '../../../Globals';

//import Image from 'react-native-scalable-image';

import Poster1 from '../../../src/images/posters/haiphuong.jpg';
import Poster2 from '../../../src/images/posters/tinhdau.jpg';
import Poster3 from '../../../src/images/posters/us.jpg';
import ImageLoad from 'react-native-image-placeholder';
//import { TextDecoder } from 'util';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class ViewPager extends Component{

    constructor(props){
        super(props);
        this.state = {
            newestMovies: []
        }
    }
    componentDidMount() {
        return fetch('http://'+Global.API+'/server/getphimmoinhat.php')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                newestMovies: responseJson
            })
            console.log(this.state.newestMovies.length);
        })
        .catch((error) =>{
            console.error(error);
        });
    }


    render(){
        const {newestMovies} = this.state;
        return(
            <View style={styles.wrapper}>
                <Text style={styles.title}>Phim đang chiếu</Text>

                <Carousel style={styles.viewPager}
                    ref={(c) => { this._carousel = c; }}
                    data={newestMovies}
                    firstItem = {3}
                    renderItem={({item})=>(
                        <TouchableNativeFeedback
                        onPress={()=>this.props.navigation.navigate('Detail',{
                            movieId: item.id_phim,
                        })}>
                            <View style={styles.pageStyle} >
                            <ImageLoad source={{uri: "http://"+Global.API+"/server/uploads/posters/"+item.hinh_phim}} style={styles.pagePoster} />
                            <View style={styles.caption}>
                                <Text style={{color: '#C2C1C5', fontWeight: '700', fontSize: 16}}>{item.ten_phim}</Text>
                                <View style={{flexDirection:'row', marginTop: 5}}>
                                    <Text style={{fontSize: 14, fontWeight: 'bold', color: '#F66280'}}>Thời lượng: </Text>
                                    <Text style={{fontSize: 14, fontWeight: 'bold', color: '#C2C1C5'}}>{item.thoiluong_phim} phút</Text>
                                </View>
                            </View>
                        </View>
                        </TouchableNativeFeedback>
                        
                    )}
                    lockScrollWhileSnapping = {true}
                    sliderWidth={width}
                    itemWidth={width/1.6}
                    loop={true}
                    enableSnap={true}
                    />
            </View>
        )

        
            
    };
    
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        paddingTop: 0
    },
    title:{
        color: '#C2C1C5',
        fontWeight: 'bold',
        fontSize: 17,
    },
    viewPager: {
        marginTop: 20
    },
    pageStyle: {
        marginVertical: 30
    },
    pagePoster:{
        width: width/1.7,
        height: height/2.2,
        resizeMode: 'stretch'
    },
    caption:{
        paddingTop: 10
    }

});

//example
/*<View style={styles.pageStyle}>
    <Image source={{uri: "http://192.168.1.94:81/server/uploads/poster/"+'haiphuong.jpg'}} style={styles.pagePoster} />
    <View style={styles.caption}>
        <Text style={{color: '#C2C1C5', fontWeight: '700', fontSize: 16}}>ABC</Text>
        <View style={{flexDirection:'row', marginTop: 5}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#F66280'}}>Thời lượng: </Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#C2C1C5'}}>100 phút</Text>
        </View>
    </View>
</View>*/

{/* <ViewPagerAndroid
                    pageMargin={-110} 
                    style={styles.viewPager}
                    >
                        <View style={styles.pageStyle}>
                            <Image source={{uri: "http://192.168.1.94:81/server/uploads/poster/"+'haiphuong.jpg'}} style={styles.pagePoster} />
                            <View style={styles.caption}>
                                <Text style={{color: '#C2C1C5', fontWeight: '700', fontSize: 16}}>ABC</Text>
                                <View style={{flexDirection:'row', marginTop: 5}}>
                                    <Text style={{fontSize: 14, fontWeight: 'bold', color: '#F66280'}}>Thời lượng: </Text>
                                    <Text style={{fontSize: 14, fontWeight: 'bold', color: '#C2C1C5'}}>100 phút</Text>
                                </View>
                            </View>
                        </View>
                        
                </ViewPagerAndroid> */}