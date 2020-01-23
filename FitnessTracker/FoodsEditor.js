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


class FoodEditor extends React.Component {
    static navigationOptions = {
        title: 'Edit Food',
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



    async deleteFood() {
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
        let foodID = await AsyncStorage.getItem('currFoodID');
        console.log(foodID);
        let mealID = await AsyncStorage.getItem('currMealID');
        console.log(mealID);

        let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + mealID + "/foods/" + foodID, requestOptions);
        let result = await response.json();

        alert(result.message);
        this.props.navigation.navigate('MealEditor');
    }

    async editFood() {
        var myHeaders = new Headers();
        let token = await AsyncStorage.getItem('token1');

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("token", "NODEJSAPP");
        myHeaders.append("x-access-token", token);

        var raw = JSON.stringify({name: this.state.name,  
                                calories: this.state.calories,
                                carbohydrates: this.state.carbs,
                                fat: this.state.fat,
                                protein: this.state.protein,});

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let foodID = await AsyncStorage.getItem('currFoodID');
        console.log(foodID);
        let mealID = await AsyncStorage.getItem('currMealID');
        console.log(mealID);

        let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + mealID + "/foods/" + foodID, requestOptions);
        let result = await response.json();

        if(result.message === "Food updated!")
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
       this.editFood();
       this.props.navigation.navigate('MealEditor');
    }

    async setPlaceholders()
    {
        let name1 = await AsyncStorage.getItem('currFoodName');
        let calories1 = await AsyncStorage.getItem('currFoodCals');
        let carbs1 = await AsyncStorage.getItem('currFoodCarbs');
        let fat1 = await AsyncStorage.getItem('currFoodFat');
        let protein1 = await AsyncStorage.getItem('currFoodProtein');

        this.setState({name: name1, calories : calories1, carbs: carbs1, fat: fat1, protein: protein1});
    }

    componentDidMount() {
        this.setPlaceholders();
    }
    
    render() {
        return (
            <View style={{paddingTop: 5, flex: 1, backgroundColor: 'lightyellow', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}>
                    <Text style={{ fontSize: 30, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                        Food Name: </Text>
                    <TextInput style={{ color: "grey", fontSize: 27, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.name}
                        onChangeText={(name) => this.setState({ name })} value={this.state.name} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}>
                    <Text style={{ fontSize: 30, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                        Calories: </Text>
                    <TextInput style={{ color: "grey", fontSize: 27, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.calories}
                        onChangeText={(calories) => this.setState({ calories })} value={this.state.calories} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}>
                    <Text style={{ fontSize: 30, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                        Carbs: </Text>
                    <TextInput style={{ color: "grey", fontSize: 27, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.carbs}
                        onChangeText={(carbs) => this.setState({ carbs })} value={this.state.carbs} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}>
                    <Text style={{ fontSize: 30, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                        Fat: </Text>
                    <TextInput style={{ color: "grey", fontSize: 27, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.fat}
                        onChangeText={(fat) => this.setState({ fat })} value={this.state.fat} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}>
                    <Text style={{ fontSize: 30, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                        Protein: </Text>
                    <TextInput style={{ color: "grey", fontSize: 27, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.protein}
                        onChangeText={(protein) => this.setState({ protein })} value={this.state.protein} />
                </View>

                <View style={{ margin: 10 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
                    <Button style={{ fontSize: 50,}} onPress={this.submitFunc} title="Submit" />
                </View>

                <Button color="red" style={{ fontcolor: "red" }} title="Delete Food" onPress={() => this.deleteFood()} />
                <StatusBar barStyle="default" />
            </View>
            )
    }
}


export default FoodEditor;
