import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Global from '../../../Globals';

export default class Body extends Component {
    constructor(props){
        super(props);
        this.state={
          selectedCombo: [],
          selectedSeats: [],
          hasCombo: false
        }
    }

    componentDidMount(){
      const {navigation} = this.props;
     
      const selectedSeats = navigation.getParam('selectedSeats', '');
      const selectedCombo = navigation.getParam('selectedCombo', '');

      if(selectedCombo != '[]'){
        this.setState({
          selectedCombo: JSON.parse(selectedCombo),
          hasCombo: true
        })
      }
      this.setState({
        selectedSeats: JSON.parse(selectedSeats)
      })
    }

    render() {
      const {navigation} = this.props;
      const {selectedCombo, hasCombo, selectedSeats} = this.state;

      const movieId = navigation.getParam('movieId', -1);
      const movieName = navigation.getParam('movieName', '');
      const moviePoster = navigation.getParam('moviePoster', '');
      const movieDuration = navigation.getParam('movieDuration', 0);
      const totalCosts = navigation.getParam('totalCosts', 0);
      const comboCosts = navigation.getParam('comboCosts', 0);
      const selectedTime = navigation.getParam('selectedTime', '');
      const selectedDate = navigation.getParam('selectedDate', '');

      const comboJSX  = hasCombo ? (
        <View>
          <View style={styles.info}>
              <Text style={{fontSize: 18, color: '#F66280', fontWeight: 'bold'}}>THÔNG TIN BẮP NƯỚC</Text>
          </View>
          {selectedCombo.map(item => (
            <View>
              <View style={styles.infoTicket}>
                <Text style={{color: '#C2C1C5', fontSize: 15}}>{item.ten_combo}</Text>
                <Text style={{color:'#C2C1C5', fontSize: 15}}>{item.quantity}</Text>
              </View>
              <View style={{borderBottomColor: '#2E2E38', borderBottomWidth: 2}}/>
            </View>
            
          ))}
          
          <View style={styles.infoTicket}>
              <Text style={{color: '#C2C1C5', fontSize: 15}}>Tổng</Text>
              <Text style={styles.txtRight}>${comboCosts}</Text>
          </View>
        </View>
      ): (<View></View>);

        return (
          <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Image style={styles.img} source={{uri: "http://"+Global.API+"/server/uploads/posters/"+moviePoster}}/>
                <View style={styles.containerText}>
                <Text style={styles.txtHeader}>{movieName}</Text>
                <Text style={{ fontSize: 13, color: '#C2C1C5'}}>Ngày {selectedDate}</Text>
                <Text style={{ fontSize: 13, color: '#C2C1C5'}}>{selectedTime} ~ 6:45 PM</Text>
                <Text style={{fontSize: 12.5, color: '#767680'}}>Ghế: {selectedSeats.map(item=> item + ', ')}</Text>
                <Text style={styles.txtSum}>Tổng cộng: ${totalCosts}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <Text style={{fontSize: 18, color: '#F66280', fontWeight: 'bold'}}>THÔNG TIN VÉ</Text>
            </View>
            <View style={styles.infoTicket}>
                <Text style={{color: '#C2C1C5', fontSize: 15}}>Số lượng</Text>
                <Text style={styles.txtRight}>{selectedSeats.length}</Text>
            </View>
            <View style={{borderBottomColor: '#2E2E38', borderBottomWidth: 2}}/>
            <View style={styles.infoTicket}>
                <Text style={{color: '#C2C1C5', fontSize: 15}}>Tổng</Text>
                <Text style={styles.txtRight}>${selectedSeats.length * 9}</Text>
            </View>

            {comboJSX}
            
            <View style={styles.info}>
                <Text style={{fontSize: 18, color: '#F66280', fontWeight: 'bold'}}>TỔNG KẾT</Text>
            </View>
            <View style={styles.infoTicket}>
                <Text style={{color: '#C2C1C5', fontSize: 15}}>Tổng cộng</Text>
                <Text style={styles.txtRight01}>${totalCosts}</Text>
            </View>
            <View style={{borderBottomColor: '#2E2E38', borderBottomWidth: 2}}/>
            <View style={styles.infoTicket}>
                <Text style={{color: '#C2C1C5', fontSize: 15}}>Giảm giá</Text>
                <Text style={styles.txtRight01}>$0</Text>
            </View>
            <View style={{borderBottomColor: '#2E2E38', borderBottomWidth: 2}}/>
            <View style={styles.infoTicket}>
                <Text style={{color: '#C2C1C5', fontSize: 15}}>Còn lại</Text>
                <Text style={styles.txtRight01}>${totalCosts}</Text>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d27',
    flexDirection: 'column',
    marginTop: -5
  },
  containerInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  containerText: {
    marginTop: 5,
    marginLeft: 5,
  },
  img: {
    width: 100,
    height: 150,
    margin: 5,
  },
  txtHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    height: 25,
  },
  txtSum: {
    color: '#F66280',
    fontWeight: '500',
    fontSize: 15,
    marginTop: 5
  },
  txtRight: {
    color: '#C2C1C5',
    fontSize: 15,
  },
  txtRight01: {
    color: '#C2C1C5',
    fontSize: 15,
  },
  info: {
    backgroundColor: '#2E2E38',
    paddingLeft: 10,
    paddingVertical: 10,
    borderBottomColor: '#2E2E38',
    borderTopColor: '#2E2E38',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  infoTicket: {
    flexDirection: 'row',
    backgroundColor: '#1d1d27',
    padding: 15,
    justifyContent: 'space-between',
  }
});