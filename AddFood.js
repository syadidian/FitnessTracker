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


class AddFood extends React.Component {
    static navigationOptions = {
        title: 'Add Food',
      };
    constructor(props) {
        super(props);
        this.state = {
         name: "",
        calories: 0,
        carbs: 0,
        fat: 0,
        protein:0,
        }
        
    }

   
    submitFunc = async () =>
    {
        // console.log("user:")
        // console.log(user1);
       // console.log(this.state.username);
       this.addFoods();
       this.props.navigation.navigate('MealEditor');
    }


    async addFoods() {
    
        var myHeaders = new Headers();
        let token = await AsyncStorage.getItem('token1');

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("token", "NODEJSAPP");
        myHeaders.append("x-access-token", token);
        
       // var raw = "{\n    \"calories\": 78,\n    \"carbohydrates\": 0.6,\n    \"fat\": 5,\n    \"id\": 1,\n    \"measure\": \"unit\",\n    \"name\": \"egg\",\n    \"protein\": 6\n}";
        var raw = JSON.stringify({
            name: this.state.name,
            calories: this.state.calories,
            carbohydrates: this.state.carbs,
            fat: this.state.fat,
            protein: this.state.protein
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let mealID = await AsyncStorage.getItem('currMealID');
        console.log(mealID);

        let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + mealID + "/foods", requestOptions);
        let result = await response.json();

        if(result.message === "Food created!")
        {
            alert(result.message);
        }
        else{
            alert("Woops! Please double check that your values are correct.")
        }

    }

    // componentDidMount() {
    //     this.getActivities();
    // }
    
    render() {
        return (
            <View style={{paddingTop: 30, flex: 1, backgroundColor: 'lightyellow' }}>
                    <TextInput style={{fontSize: 32, textAlignVertical: "center",textAlign: "center"}} placeholder=" Name" 
                   onChangeText={(name) => this.setState({name})} value={this.state.name}/>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'center',margin:5}} />
                    <Text style={{ fontSize: 30, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                        Calories: </Text>
                    <TextInput style={{color: "grey",fontSize: 27, textAlignVertical: "center",textAlign: "center"}} placeholder="Calories" 
                   onChangeText={(calories) => this.setState({calories})} value={this.state.calories}/>
                   
                  
                    <View style={{flexDirection: 'row', justifyContent: 'center',margin:5}} />
                    <Text style={{ fontSize: 30, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                        Carbs: </Text>
                    <TextInput style={{color: "grey",fontSize: 27, textAlignVertical: "center",textAlign: "center"}} placeholder="Carbs" 
                   onChangeText={(carbs) => this.setState({carbs})} value={this.state.carbs}/>
                   
                   <View style={{flexDirection: 'row', justifyContent: 'center',margin:5}} />
                   <Text style={{ fontSize: 30, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                        Fat: </Text>
                    <TextInput style={{color: "grey",fontSize: 27, textAlignVertical: "center",textAlign: "center"}} placeholder="Fat" 
                   onChangeText={(fat) => this.setState({fat})} value={this.state.fat}/>
                   
                   <View style={{flexDirection: 'row', justifyContent: 'center',margin:5}} />
                   <Text style={{ fontSize: 30, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                        Protein: </Text>
                    <TextInput style={{color: "grey",fontSize: 27, textAlignVertical: "center",textAlign: "center"}} placeholder="Protein" 
                   onChangeText={(protein) => this.setState({protein})} value={this.state.protein}/>
                <View style={{margin:10}} />


                <Button style={{fontSize: 50}}
                          onPress= {this.submitFunc}
                          title="Submit"
                      />
                <StatusBar barStyle="default" />
            </View>
            )
    }
}


export default AddFood;
