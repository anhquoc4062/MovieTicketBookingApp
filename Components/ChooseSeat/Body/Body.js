import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ScrollView, TouchableWithoutFeedback,  } from 'react-native-gesture-handler';
import Global from '../../../Globals'


const { width, height } = Dimensions.get("window");

export default class Body extends Component{

    constructor(props){
        super(props);
        this.state = {
            seats: [],
            disabledSeats: [],
            takenSeats: ['H1', 'H2'],//example,
            loading: false,
            selectedSeats: [],
            isLoading: true
        }
    }

    setTakenSeat(){
        const {navigation} = this.props;
        const {seats, selectedSeats} = this.state;
        const selectedTime = navigation.getParam('selectedTime', '');
        const selectedDate = navigation.getParam('selectedDate', '');
        const movieId = navigation.getParam('movieId', -1);
        const movieName = navigation.getParam('movieName', '');

        fetch('http://'+Global.API+'/server/getgheconguoi.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idphim: movieId,
                giochieu: selectedTime,
                ngaychieu: selectedDate,
            }),

        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            var arr = [];
            responseJson.map(item => {
                arr.push(item.ten_ghe)
            });
            this.setState({
                takenSeats: arr,
                loading: true,
                isLoading: false
            },()=>this.generateSeat())
        })
        .catch((error)=>(console.log(error)));
        
    }

    generateSeat(){
        var arr = [];
        for(let i = 1; i<= 15;i++){
            for(let j = 1;j<= 12 ; j++){
                var seatName = String.fromCharCode(i+64)+j;
                if((i==1&&j==1)||(i==2&&j==1)||(i==1&&j==2)||(i==1&&j==12)||(i==1&&j==11)||(i==2&&j==12)||(i==15&&j==1)||(i==15&&j==12))
                {
                    arr.push({name: seatName, disabled: 1, taken: 0});
                }
                else{
                    var checkedTaken = false;
                    this.state.takenSeats.forEach(element => {
                        if(seatName == element){
                            checkedTaken = true;
                            return;
                        }
                    });
                    if(checkedTaken){
                        arr.push({name: seatName, disabled: 0, taken: 1});
                    }
                    else{
                        arr.push({name: seatName, disabled: 0, taken: 0});
                    }
                    
                }
            }
        }
        this.setState({
            seats: arr
        });
    }

    

    componentDidMount(){
        this.setTakenSeat();
        
    }

    updateParentState(total, selectedSeat){
        this.props.updateParentState(total, selectedSeat);
    }

    selectedSeat(seatName, selected){
        if(selected == 1){
            this.setState({
                selectedSeat : this.state.selectedSeats.push(seatName)
            },()=> this.updateParentState(this.state.selectedSeats.length * 9, this.state.selectedSeats))
        }
        else{
            var currentArr = this.state.selectedSeats;
            var selectedIndex = currentArr.indexOf(seatName);
            this.setState({
                selectedSeat : currentArr.splice(selectedIndex, 1)
            },()=> this.updateParentState(this.state.selectedSeats.length * 9, this.state.selectedSeats))
        }
    }

    

    renderSeat(item){
        if(item.disabled == 0){
            if(item.taken == 0){
                var checkedSelected = false;
                this.state.selectedSeats.forEach((selected => {
                    if(item.name == selected){
                        checkedSelected = true;
                        return;
                    }
                }));
                if(checkedSelected == true){
                    return (<TouchableOpacity onPress={()=>this.selectedSeat(item.name, 0)}>
                    <View style={styles.seatSelected} />
                    </TouchableOpacity>);
                }
                else{
                    return (<TouchableOpacity onPress={()=>this.selectedSeat(item.name, 1)}>
                    <View style={styles.seatAvailable} />
                    </TouchableOpacity>);
                }
                
            }
            else{
                return (<View style={styles.seatTaken} />);
            }
            
        }else if(item.disabled == 1){
            return <View style={styles.seatDisabled} />;
        }
    }

    render(){
        
        const {navigation} = this.props;
        const {seats, selectedSeats, takenSeats} = this.state;
        const selectedTime = navigation.getParam('selectedTime', '');
        const selectedDate = navigation.getParam('selectedDate', '');
        const movieId = navigation.getParam('movieId', -1);
        const movieName = navigation.getParam('movieName', '');

        let seatJSX;
        if(this.state.isLoading == true){
            seatJSX = (<View style={{flex: 1, padding: 20, justifyContent: 'center', marginTop: 100}}>
                <ActivityIndicator size="large" color="#F66280"/>
            </View>)
        }
        else{

            seatJSX = (
                <View style={styles.seatContainer}>
                    {seats.map(item=>(
                        <View style={styles.seatItem} key={item.name}>
                            {this.renderSeat(item)}
                        </View>    
                    ))}
                </View>
            )
        }

        return(
            <View style={styles.wrapper}>
                <View style={styles.infoContainer}> 
                    <Text style={styles.movieNameText}>{movieName}</Text>
                    <Text style={styles.dateTimeText}>{selectedDate} - {selectedTime}</Text>
                </View>

                <View style={styles.seatStatusContainer}>
                    <View styles={styles.seatStatusItem}>
                        <View style={styles.seatAvailable}></View>
                        <Text style={styles.seatStatusText}>Còn trống</Text>
                    </View>
                    <View styles={styles.seatStatusItem}>
                        <View style={styles.seatTaken}></View>
                        <Text style={styles.seatStatusText}>Có người</Text>
                    </View>
                    <View styles={styles.seatStatusItem}>
                        <View style={styles.seatSelected}></View>
                        <Text style={styles.seatStatusText}>Đã chọn</Text>
                    </View>
                </View>
                {seatJSX}
            </View>
        )
            
    };
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        top: -53,
    },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 120
    },
    movieNameText: {
        fontSize: 18,
        color: '#C2C1C5',
        fontWeight: 'bold',
    },
    dateTimeText: {
        fontSize: 15,
        color: '#767680',
        fontWeight: 'bold',
        marginTop: 5,
    },
    seatStatusContainer: {
        height: 80,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#2E2E38',
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
    },
    seatStatusItem: {
        height: height,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center'
    },
    seatDisabled:{
        height: 15,
        width: 20,
        backgroundColor: '#1D1D27',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        alignSelf: 'center',
    },
    seatAvailable: {
        height: 15,
        width: 20,
        backgroundColor: '#C2C1C5',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        alignSelf: 'center',
    },
    seatStatusText: {
        marginTop: 7,
        textAlign: 'center',
        fontSize: 13,
        color: '#C2C1C5',
        fontWeight: 'bold'
    },
    seatTaken: {
        height: 15,
        width: 20,
        backgroundColor: '#2E2E38',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        alignSelf: 'center',
    },
    seatSelected: {
        height: 15,
        width: 20,
        backgroundColor: '#F66280',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        alignSelf: 'center',
    },
    seatContainer: {
        marginTop: 50,
        marginHorizontal: 15,
        width: width - 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    seatItem: {
        margin: 3
    }
});