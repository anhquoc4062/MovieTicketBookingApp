import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Global from '../../../Globals';
import ImageLoad from 'react-native-image-placeholder';

const { width, height } = Dimensions.get("window");

export default class Body extends Component{

    constructor(props){
        super(props);
        this.state = {
            showDate: [],
            showTime: [],
            dataSource: [],
            selectedTime: '',
            selectedDate: ''
        }
        this.selectedShowTime = this.selectedShowTime.bind(this);
    }

    generateTime(){
        var arr = [];
        arr.push({id: 'st1','time': '11:00 AM'});
        arr.push({id: 'st2','time': '12:00 AM'});
        arr.push({id: 'st3','time': '1:00 PM'});
        arr.push({id: 'st4','time': '2:30 PM'});
        arr.push({id: 'st5','time': '4:00 PM'});
        arr.push({id: 'st6','time': '7:30 PM'});
        arr.push({id: 'st7','time': '9:00 PM'});
        arr.push({id: 'st8','time': '11:30 PM'});

        this.setState({
            showTime: arr
        });
    }

    generateDate(){
        const today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear()
        strDay = dd + ' tháng ' + mm;
        var arr = [];
        arr.push({'date': strDay})
        this.setState({
            selectedDate: strDay
        })
        for(var i = 1;i<=6;i++){
            var thisDay = new Date();
            thisDay.setDate(today.getDate()+i);
            var dd = String(thisDay.getDate()).padStart(2, '0');
            var mm = String(thisDay.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = thisDay.getFullYear()
            strDay = dd + ' tháng ' + mm;
            arr.push({'date': strDay});
     
        }
        this.setState({
            showDate: arr
        });

    }

    selectedShowTime(timeId){
        //console.log("Selected time " + timeId);
        this.setState({
            selectedTime: timeId
        },
        ()=> this.updateParentState(this.state.selectedDate, this.state.selectedTime)
        );
        //this.updateParentState(this.state.selectedDate, this.state.selectedTime);
    }

    selectedShowDate(index){
        this.setState({
            selectedDate: this.state.showDate[index].date
        },
        ()=> this.updateParentState(this.state.selectedDate, this.state.selectedTime)
        );
        //console.log(this.state.showDate[index].date);
        

    }

    componentDidMount = () =>{
        this.generateDate();
        this.generateTime();
        //this.selectedShowDate(0);
    }

    updateParentState(selectedDate, selectedTime) {
        this.props.updateParentState(selectedDate, selectedTime);
    }

    render(){

        const {navigation} = this.props;
        const {showDate, showTime, selectedDate, selectedTime} = this.state;
        
        const movieId = navigation.getParam('movieId', -1);
        const movieName = navigation.getParam('movieName', '');
        const movieBanner = navigation.getParam('movieBanner', '');
        return(
            <View style={styles.wrapper}>
                <ImageLoad source={{uri: "http://"+Global.API+"/server/uploads/banner/"+movieBanner}} style={styles.banner}/>
                <View style={styles.movieNameContainer}>
                    <Text style={styles.movieName}>{movieName}</Text>
                </View>
                <Carousel 
                    contentContainerCustomStyle = {styles.carousel}
                    ref={(c) => { this._carousel = c; }}
                    data={showDate}
                    renderItem={({item})=>(
                        <View style={styles.containerDate} key={item.date}>
                            <Text style={styles.textDate}>{item.date}</Text>
                        </View>
                        
                    )}
                    onSnapToItem={(index)=>this.selectedShowDate(index)}
                    sliderWidth={width}
                    itemWidth={width/2.3}
                    enableSnap={true}
                    inactiveSlideScale = {0.7}
                    inactiveSlideOpacity = {0.5}
                    />
                <View style={styles.showTimeContainer}>
                    {showTime.map(item => (
                        <TouchableOpacity onPress={()=>this.selectedShowTime(item.time)} key={item.time}>
                            <View style={this.state.selectedTime == item.time
                                        ? styles.showTimeItemActive
                                        : styles.showTimeItemInactive}>
                                <Text style={this.state.selectedTime == item.time
                                        ? styles.showTimeTextActive
                                        : styles.showTimeTextInactive}>{item.time}</Text>
                            </View>
                        </TouchableOpacity>
                       
                    ))}

                </View>
            </View>
        )
            
    };
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        top: -53,
    },
    banner: {
        height: 200,
        width: width,
        resizeMode: 'stretch'
    },
    movieNameContainer:{
        borderBottomWidth: 1,
        borderBottomColor: '#2E2E38',
        marginHorizontal: 15,
        paddingVertical: 15,
    },
    movieName: {
        color: '#C2C1C5',
        fontSize: 18,
        fontWeight: 'bold',
    },
    carousel: {
        paddingVertical: 15
    },
    containerDate:{
        alignItems: 'center'
    },
    textDate: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#C2C1C5'
    },
    showTimeContainer: {
        borderTopWidth: 1,
        borderTopColor: '#2E2E38',
        marginHorizontal: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingTop: 30,
    },
    showTimeItemInactive: {
        borderWidth: 1,
        borderColor: '#767680',
        width: 150,
        paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 10,
    },
    showTimeItemActive: {
        borderWidth: 2,
        borderColor: '#C2C1C5',
        width: 150,
        paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 10,
    },
    showTimeTextInactive: {
        color: '#767680',
        fontSize: 16,
        fontWeight: 'bold',

    },
    showTimeTextActive: {
        color: '#C2C1C5',
        fontSize: 16,
        fontWeight: 'bold',

    }

});