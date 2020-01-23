import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StatusBar,
    List,
    DatePickerIOS
} from 'react-native';
//import Button from './Button';
import base64 from 'base-64';
//import base64 from 'react-native-base64';
import { createStackNavigator, createSwitchNavigator, 
    createAppContainer, TabBarBottom } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {AsyncStorage} from 'react-native';
import { ListItem } from 'react-native-elements'


class AddActivity extends React.Component {
    static navigationOptions = {
        title: 'Add Activity',
      };
    constructor(props) {
        super(props);
        this.state = {
         name: "",
        duration: 0,
        calories: 0,
        chosenDate: new Date()
        }
        
        this.setDate = this.setDate.bind(this);

    }

    setDate(newDate) {
        this.setState({chosenDate: newDate});
      }

    submitFunc = async () =>
    {
        // console.log("user:")
        // console.log(user1);
       // console.log(this.state.username);
       this.addActivities();
       this.props.navigation.navigate('Acts');
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    async addActivities() {
        var myHeaders = new Headers();
        let token = await AsyncStorage.getItem('token1');

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("token", "NODEJSAPP");
        myHeaders.append("x-access-token", token);

        console.log(this.state.chosenDate);

        var raw = JSON.stringify({name: this.state.name,  
                                calories: this.state.calories,
                                duration: this.state.duration,
                                date: this.state.chosenDate});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        let response = await fetch('https://mysqlcs639.cs.wisc.edu/activities', requestOptions);
        let result = await response.json();

        if(result.message === "Activity created!")
        {
            alert(result.message);
        }
        else{
            alert("Woops! Please double check that you only entered numbers for duration/calories.")
        }

        let getActs = this.props.navigation.getParam('paramName', () => {return});
        getActs();
    }

    // componentDidMount() {
    //     this.getActivities();
    // }
    
    render() {
        return (
            <View style={{paddingTop: 50, flex: 1, backgroundColor: 'lightyellow', justifyContent: 'center' }}>
                    <TextInput style={{fontSize: 27, textAlignVertical: "center",textAlign: "center"}} placeholder=" Name" 
                   onChangeText={(name) => this.setState({name})} value={this.state.name}/>
                    <View style={{margin:5}} />
                    <TextInput style={{fontSize: 27, textAlignVertical: "center",textAlign: "center"}} placeholder="Duration (Minutes)" 
                   onChangeText={(duration) => this.setState({duration})} value={this.state.duration}/>
                    <View style={{margin:5}} />
                    <TextInput style={{fontSize: 27, textAlignVertical: "center",textAlign: "center"}} placeholder="Calories" 
                   onChangeText={(calories) => this.setState({calories})} value={this.state.calories}/>
                <View style={{margin:10}} />

                <View style={{flex: 1}, {justifyContent: 'center'}}>
                    <DatePickerIOS
                        date={this.state.chosenDate}
                        onDateChange={this.setDate}
                    />
                </View>

                <Button style={{fontSize: 50}}
                          onPress= {this.submitFunc}
                          title="Submit"
                      />
                <StatusBar barStyle="default" />
            </View>
            )
    }
}


export default AddActivity;
