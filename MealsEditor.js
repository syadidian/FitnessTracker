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


class MealsEditor extends React.Component {
    static navigationOptions = {
        title: 'Edit Meal',
      };
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            calsToday: 0,
            carbsToday: 0,
            fatToday:0,
            proteinToday:0,
            foods: [],
            chosenDate: new Date()
        }
        
        this.setDate = this.setDate.bind(this);

    }

   
    setDate(newDate) {
        this.setState({chosenDate: newDate});
      }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    async deleteMeal() {
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
        let mealID = await AsyncStorage.getItem('currMealID');
        console.log(mealID);

        let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + mealID, requestOptions);
        let result = await response.json();

        alert(result.message);
        this.props.navigation.navigate('Meals');

    }

    async editMeals() {
        var myHeaders = new Headers();
        let token = await AsyncStorage.getItem('token1');

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("token", "NODEJSAPP");
        myHeaders.append("x-access-token", token);

        var raw = JSON.stringify({name: this.state.name,  
                                date: this.state.chosenDate});

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let mealID = await AsyncStorage.getItem('currMealID');
        console.log(mealID);

        let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + mealID, requestOptions);
        let result = await response.json();

        if(result.message === "Meal updated!")
        {
            alert(result.message);
        }
        else{
            alert("Woops! Please double check that your inputs are correct.")
        }
    }
    
    submitFunc = async () =>
    {
        // console.log("user:")
        // console.log(user1);
       // console.log(this.state.username);
       this.editMeals();
       this.props.navigation.navigate('Meals');
    }

    async setPlaceholders()
    {
        let name1 = await AsyncStorage.getItem('currMealName');
        // let duration1 = await AsyncStorage.getItem('currActDuration');
        // let calories1 = await AsyncStorage.getItem('currActCals');

        this.setState({name: name1});
    }

    addFood = () => {
        this.props.navigation.navigate('FoodAdder');
    }

    async getFoods() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("token", "NODEJSAPP");

        let token = await AsyncStorage.getItem('token1');
        myHeaders.append("x-access-token", token);
        
      //  var raw = "{\n    \n    \"duration\": 6\n    \n}";
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
       //   body: raw,
          redirect: 'follow'
        };
        
        let mealID = await AsyncStorage.getItem('currMealID');
        console.log(mealID);

        let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + mealID + "/foods", requestOptions);
        let result = await response.json();
  
         // console.log(result);
        this.setState({foods: result});
        this.agFoods();
    }

    formatFoods () {
        // console.log(this.state.activities.activities);
        // console.log(this.state.activities);
        let listSec = [];
        // // <View>
        // // // {
        //     console.log("list");
        //  console.log(list);
        // //     console.log("acts:");
        // console.log(list.activities);

        for(const food of Object.values(this.state.foods))
        {
            for(let i = 0; i < food.length; i++)
            {
                let currID = food[i].id.toString();
             //   let currCals = acts[i].calories.toString();
             //   let currDuration = acts[i].duration.toString();
                let currName = food[i].name.toString();
                let currCals = food[i].calories.toString();
                let currCarbs = food[i].carbohydrates.toString();
                let currFat = food[i].fat.toString();
                let currProtein = food[i].protein.toString();

              //  console.log(acts[i].date);
               // var date = acts[i].date;
             //  let myDate = new Date(your_date_string).toLocaleString("en-US", {timeZone: "America/Chicago"});
               // myDate = new Date(myDate);

               // var date = new Date(food[i].date);
              //  console.log(date);
              //  date = new Date(date);
            //    var stillUtc = moment(date).utc(date).toDate();
             //   var upDate = moment(stillUtc).local().format("dddd, MMMM Do YYYY, h:mm:ss a");
               // let newDate = moment.utc(upDate).local().format("dddd, MMMM Do YYYY, h:mm:ss a");
               // console.log(upDate);
               // console.log(newDate);

                listSec.push(
                    <ListItem key={food[i].id}
                    title= {"Name: " + food[i].name}
                    
                    subtitle={"Calories: " + food[i].calories}
                  
                    bottomDivider
                    chevron onPress={() => this.editFood(currID, currName, currCals, currCarbs, currFat, currProtein)}>
                    </ListItem>
                )
               // console.log(acts[i].calories);
            }
            
        }

      //  console.log("should be agging foods");
        //console.log(listSec);

        return listSec;
    }

     async agFoods () {
        let todayCals = 0;
        let todayCarbs = 0;
        let todayFat = 0;
        let todayProtein = 0;

        for(const food of Object.values(this.state.foods))
        {
            for(let i = 0; i < food.length; i++)
            {
                console.log(food[i]);
                let currName = food[i].name.toString();
                let currCals = food[i].calories;
                let currCarbs = food[i].carbohydrates;
                let currFat = food[i].fat;
                let currProtein = food[i].protein;
               // console.log(acts[i].date);

                // var date = new Date(acts[i].date);
                
                // var stillUtc = moment(date).utc(date).toDate();
                // var upDate = moment(stillUtc).local();
                // console.log(upDate);
                // let today = moment(upDate).isSame(moment(), 'day');
                // console.log(moment());
                // console.log("istoday?");
                // console.log(today);
                // if(today === true)
                // {
                    todayCals += currCals;
                   // console.log("Cals today "+ todayCals);
                    todayCarbs += currCarbs;
                  //  console.log("Carbs today " + todayCarbs);
                    todayFat += currFat;
                   // console.log("Fat today " + todayFat);
                    todayProtein += currProtein;
                  //  console.log("Prot today " + todayProtein);

               // }

            }
        }
        console.log(todayCals);
        let stringCals = todayCals.toString();
        let stringCarbs = todayCarbs.toString();
        let stringFat = todayFat.toString();
        let stringProtein = todayProtein.toString();

       // this.setState({calsToday: todayCals});
        this.setState({calsToday: todayCals, carbsToday: todayCarbs, fatToday: todayFat, proteinToday: todayProtein});

        // let mealID = await AsyncStorage.getItem('currMealID');
        // await AsyncStorage.setItem(mealID + 'mealCalsToday', stringCals);
        // await AsyncStorage.setItem(mealID + 'mealCarbsToday', stringCarbs);
        // await AsyncStorage.setItem(mealID + 'mealFatToday', stringFat);
        // await AsyncStorage.setItem(mealID + 'mealProteinToday', stringProtein);
    }

    
    async editFood(id, name, cals, carbs, fat, protein) {

        await AsyncStorage.setItem('currFoodID', id);
        await AsyncStorage.setItem('currFoodCals', cals);
        await AsyncStorage.setItem('currFoodCarbs', carbs);
        await AsyncStorage.setItem('currFoodName', name);
        await AsyncStorage.setItem('currFoodFat', fat);
        await AsyncStorage.setItem('currFoodProtein', protein);
        this.props.navigation.navigate('FoodEditor');
    }

    componentDidMount() {
        this.setPlaceholders();
        this.getFoods();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.getFoods();
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }
    
    render() {
        return (
           
                <View style={{ paddingTop: 10, flex: 1, backgroundColor: 'lightyellow', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}>
                        <Text style={{ fontSize: 30, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                            Meal Name: </Text>
                        <TextInput style={{ color: "grey", fontSize: 27, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.name}
                            onChangeText={(name) => this.setState({ name })} value={this.state.name} />
                    </View>

                    <View style={{ margin: 5 }} />
                    <Button style={{ flex: 1, justifyContent: 'center' }} title="Add Food +" onPress={this.addFood} />

                    <View style={{ margin: 5 }} />

                    <ScrollView eventKey="meals" title="Meals">
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            {this.formatFoods()}</View>

                    </ScrollView>



                    <View style={{ flex: 1 }, { justifyContent: 'center' }}>
                        <DatePickerIOS
                            date={this.state.chosenDate}
                            onDateChange={this.setDate}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 10 }}>
                        <Button style={{ fontSize: 50, }} onPress={this.submitFunc} title="Submit" />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}>
                        <Text style={{fontWeight: 'bold', color: 'purple', fontSize: 22, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                          Meal Stats:</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}>
                        <Text style={{color: 'purple', fontSize: 22, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                            Calories: {this.state.calsToday} |  </Text>
                        <Text style={{color: 'purple', fontSize: 22, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                            Carbs: {this.state.carbsToday} </Text>
                    </View>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
                        <Text style={{color: 'purple',fontSize: 22, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                            Fat: {this.state.fatToday} | </Text>
                        <Text style={{color: 'purple',fontSize: 22, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                            Protein: {this.state.proteinToday} </Text>
                    </View>

                    <Button color="red" style={{ fontcolor: "red" }} title="Delete Meal" onPress={() => this.deleteMeal()} />
                    <StatusBar barStyle="default" />
                </View>
           

            )
    }
}


export default MealsEditor;
