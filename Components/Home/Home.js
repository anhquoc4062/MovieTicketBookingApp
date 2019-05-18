
import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import {TouchableOpacity, Text} from 'react-native';
import Shop from './Shop';
import Menu from './Menu';
import checkLogin from '../../src/api/checkLogin';
import getToken from '../../src/api/getToken';
import CheckSignIn from '../CheckSignIn';

console.disableYellowBox = true;
export default class Main extends Component{

    
    componentDidMount(){
        getToken()
        .then(token =>checkLogin(token))
        .then(res => {
            console.log(res);
            if(res.token != 'ERROR'){
                CheckSignIn.onSignIn(res.username, res.avatar)
            }
        })
        .catch(error => console.log('error at home', error));
    }   

    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };  
    render(){

        const {navigation} = this.props;
        return(
            <Drawer
                ref={(ref)=> this._drawer=ref}
                openDrawerOffset={0.3}
                tapToClose={true}
                content={
                    <Menu navigation={navigation}/>
                }
            >
                <Shop open={this.openControlPanel} navigation={navigation}/>
            </Drawer>
        )
            
    };
}
