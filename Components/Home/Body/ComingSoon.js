import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableNativeFeedback} from 'react-native';
import Global from '../../../Globals';
import ImageLoad from 'react-native-image-placeholder';


const { height, width } = Dimensions.get("window");

export default class ComingSoon extends Component{

    constructor(props){
        super(props)
        this.state = {
            dataSource: []
        }
    }
    componentDidMount(){
        return fetch('http://'+Global.API+'/server/getphimsapchieu.php')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataSource: responseJson
            })
        })
        .catch((error) =>{
            console.error(error);
        });
    }
    render(){
        const {dataSource} = this.state;
        return(
            <View style={styles.wrapper}>
                <Text style={styles.title}>Phim sắp chiếu</Text>
                <View style={styles.movieWrapper}>
    
                    {dataSource.map(item => (
                        <TouchableNativeFeedback
                        key={item.id_phim}
                        onPress={()=>this.props.navigation.navigate('Detail',{
                            movieId: item.id_phim,
                        })}>
                            <View style={styles.card} >
                                <ImageLoad source={{uri: "http://"+Global.API+"/server/uploads/posters/"+item.hinh_phim}} style={styles.poster}/>
                                <View style={styles.caption}>
                                    <Text style={{color: '#C2C1C5', fontWeight: '700', fontSize: 13, textAlign: 'center'}}>{item.ten_phim}</Text>
                                        <View style={{flexDirection:'row', marginTop: 5}}>
                                            <Text style={{fontSize: 10, fontWeight: 'bold', color: '#F66280'}}>Thời lượng: </Text>
                                            <Text style={{fontSize: 10, fontWeight: 'bold', color: '#C2C1C5'}}>{item.thoiluong_phim} phút</Text>
                                        </View>
                                </View>
                            </View>

                        </TouchableNativeFeedback>
                        
                    ))}
                    
                    
                    
                </View>
                
            </View>
        )
            
    };
}

const productImgWidth = (width-50)/ 3;
const productImgHeight = (productImgWidth/160)*237;

const styles = StyleSheet.create({
    wrapper: {
    },
    title: {
        padding: 10,
        paddingTop: 10,
        color: '#C2C1C5',
        fontWeight: 'bold',
        fontSize: 17,
    },
    movieWrapper: {
        width: width-10,
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingLeft: 5
    },
    card: {
        width: productImgWidth,
        height: 250,
    },
    caption: {
        paddingTop: 10,
        alignItems: 'center',
    },
    poster: {
        width: productImgWidth,
        height: productImgHeight
    }

});