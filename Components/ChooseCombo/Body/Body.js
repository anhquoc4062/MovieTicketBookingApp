import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ScrollView, TouchableWithoutFeedback,  } from 'react-native-gesture-handler';
import Global from '../../../Globals';
import ImageLoad from 'react-native-image-placeholder';


const { width, height } = Dimensions.get("window");

export default class Body extends Component{

    constructor(props){
        super(props);
        this.state = {
            comboData: [],
            total: 0,
            quantity: [],
            selectedCombo: [],
            comboCosts: 0,
        }
    }
    incQuantity(id, name, price, index){
        const { quantity, selectedCombo } = this.state;
        
        var quaArr = quantity;
        quaArr[index] += 1;
        
        var selectedComboArr = selectedCombo;
        //add combo to selectedArray
        var exist = false;
        selectedComboArr.forEach(item => {
            if(item.id_combo == id){
                item.quantity = quaArr[index];
                exist = true;
            }
        });

        if(exist == false){
            selectedComboArr.push({id_combo: id, ten_combo: name,quantity: quaArr[index]});
        }

        this.setState({
            total: this.state.total+ parseFloat(price),
            quantity: quaArr,
            selectedCombo: selectedComboArr,
            comboCosts: this.state.comboCosts + parseFloat(price),
        },
            ()=>this.updateParentState(this.state.total, selectedCombo, this.state.comboCosts)
        )
    }
    descQuantity(id, name, price, index){
        const { quantity, selectedCombo} = this.state;
        var quaArr = quantity;
        if(quaArr[index]>0){
            quaArr[index] -= 1;

            var selectedComboArr = selectedCombo;
            if(quaArr[index] != 0){
                selectedComboArr.forEach(item => {
                    if(item.id_combo == id){
                        item.quantity = quaArr[index];
                    }
                });
            }
            else{
                var removeIndex = selectedComboArr.map(item => item.id_combo).indexOf(id);
                selectedComboArr.splice(removeIndex, 1);
            }
            
            this.setState({
                total: this.state.total - parseFloat(price),
                quantity: quaArr,
                selectedCombo: selectedComboArr,
                comboCosts: this.state.comboCosts - parseFloat(price),
            },
                ()=>this.updateParentState(this.state.total, selectedCombo, this.state.comboCosts)
            )
        }
    }

    componentDidMount(){
        const { navigation } = this.props;
        const seatCosts = navigation.getParam('seatCosts', 0);
        this.setState({
            total: seatCosts
        })
        return fetch('http://'+Global.API+'/server/getcombo.php')
        .then((response) => response.json())
        .then((responseJson) => {
            
            var quaArr = []
            for(var i= 0;i<responseJson.length;i++){
                quaArr[i]=0;
            }
            this.setState({
                comboData: responseJson,
                quantity: quaArr
            })
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    updateParentState(total, selectedCombo, comboCosts){
        this.props.updateParentState(total, selectedCombo, comboCosts);
    }

    render(){
        const {navigation} = this.props;
        const {comboData, selectedCombo} = this.state;
        const {listComboContainer, 
            comboImage, 
            comboItem, 
            comboName, 
            comboPrice, 
            comboDesc,
            comboInfoContainer,
            quantityContainer, 
            quantityView,
            button
        } = styles;
        return(
            <View style={styles.wrapper}>
                <View style={listComboContainer}>
                {comboData.map((item,index) => (
                    <View style={comboItem} key={item.id_combo}>
                        
                        <ImageLoad 
                                source={{uri: "http://"+Global.API+"/server/uploads/combo/"+item.hinh_combo}} style={comboImage}/>
                        <View style={comboInfoContainer}>
                            <Text style={comboName}>{item.ten_combo}</Text>
                            <Text style={comboPrice}>${item.gia_combo}</Text>
                            <Text style={comboDesc}>{item.mota_combo}</Text>
                            <View style={quantityContainer}>
                                <View style={quantityView}>
                                    <Text>{this.state.quantity[index]}</Text>
                                </View>
                                <TouchableOpacity style={button} onPress={()=>this.descQuantity(item.id_combo, item.ten_combo, item.gia_combo, index)}>
                                    <Text>-</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={button} onPress={()=>this.incQuantity(item.id_combo, item.ten_combo, item.gia_combo, index)}>
                                    <Text>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
                </View>
            </View>
        )
            
    };
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative'
    },
    listComboContainer: {
        justifyContent: 'center'
    },
    comboItem: {
        width: width,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#2E2E38',
        paddingVertical: 20,
    },
    comboImage: {
        height: 110,
        width: 110,
        justifyContent: 'center'
    },
    comboInfoContainer: {
        padding: 5,
        paddingHorizontal: 10,

        justifyContent: 'space-around'
    },
    comboName: {
       fontSize: 17,
       color: '#F66280',
       fontWeight: 'bold',
    },
    comboPrice : {
        fontSize: 15,
       color: '#C2C1C5',
       fontWeight: 'bold',
    },
    comboDesc: {
        fontSize: 13,
        color: '#767680',
        fontWeight: 'bold'
    },
    quantityContainer: {
        flexDirection: 'row',
        paddingTop: 5
    },
    quantityView: {
        backgroundColor: '#C2C1C5',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#C2C1C5',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 3
    }
});