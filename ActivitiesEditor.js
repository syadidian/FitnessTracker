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


class ActivitiesEditor extends React.Component {
    static navigationOptions = {
        title: 'Edit Activity',
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


    async deleteAct() {
        console.log("delete");
        var myHeaders = new Headers();
        let token = await AsyncStorage.getItem('token1');

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("token", "NODEJSAPP");
        myHeaders.append("x-access-token", token);

      //  var raw = "{\n    \"name\": \"situps\",\n    \"duration\": 20,\n    \"calories\": 20\n}";

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
         //   body: raw,
            redirect: 'follow'
        };

        // NEED TO GET ACTIVITY ID ON PRESS SOMEHOW
        let actID = await AsyncStorage.getItem('currActID');
        console.log(actID);

        let response = await fetch('https://mysqlcs639.cs.wisc.edu/activities/' + actID, requestOptions);
        let result = await response.json();

        alert(result.message);
        this.props.navigation.navigate('Acts');
    }

    async editActivities() {
        var myHeaders = new Headers();
        let token = await AsyncStorage.getItem('token1');

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("token", "NODEJSAPP");
        myHeaders.append("x-access-token", token);

        var raw = JSON.stringify({name: this.state.name,  
                                calories: this.state.calories,
                                duration: this.state.duration,
                                date: this.state.chosenDate});

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let actID = await AsyncStorage.getItem('currActID');
        console.log(actID);

        let response = await fetch('https://mysqlcs639.cs.wisc.edu/activities/' + actID, requestOptions);
        let result = await response.json();

        if(result.message === "Activity updated!")
        {
            alert(result.message);
        }
        else{
            alert("Woops! Please double check that you only entered numbers for duration/calories.")
        }
    }
    
    submitFunc = async () =>
    {
        // console.log("user:")
        // console.log(user1);
       // console.log(this.state.username);
       this.editActivities();
       this.props.navigation.navigate('Acts');
    }

    async setPlaceholders()
    {
        let name1 = await AsyncStorage.getItem('currActName');
        let duration1 = await AsyncStorage.getItem('currActDuration');
        let calories1 = await AsyncStorage.getItem('currActCals');

        this.setState({name: name1, duration : duration1, calories : calories1});
    }

    componentDidMount() {
        this.setPlaceholders();
    }
    
    render() {
        return (
            <View style={{paddingTop: 5, flex: 1, backgroundColor: 'lightyellow', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}>
                    <Text style={{ fontSize: 30, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                        Activity Name: </Text>
                    <TextInput style={{ color: "grey", fontSize: 27, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.name}
                        onChangeText={(name) => this.setState({ name })} value={this.state.name} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}>
                    <Text style={{ fontSize: 30, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                        Duration: </Text>
                    <TextInput style={{ color: "grey", fontSize: 27, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.duration}
                        onChangeText={(duration) => this.setState({ duration })} value={this.state.duration} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}>
                    <Text style={{ fontSize: 30, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                        Calories Burned: </Text>
                    <TextInput style={{ color: "grey", fontSize: 27, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.calories}
                        onChangeText={(calories) => this.setState({ calories })} value={this.state.calories} />
                </View>

                <View style={{ margin: 10 }} />

                <View style={{ flex: 1 }, { justifyContent: 'center' }}>
                    <DatePickerIOS
                        date={this.state.chosenDate}
                        onDateChange={this.setDate}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
                    <Button style={{ fontSize: 50,}} onPress={this.submitFunc} title="Submit" />
                </View>

                <Button color="red" style={{ fontcolor: "red" }} title="Delete Activity" onPress={() => this.deleteAct()} />
                <StatusBar barStyle="default" />
            </View>
            )
    }
}


export default ActivitiesEditor;
