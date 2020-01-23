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


class AddMeal extends React.Component {
    static navigationOptions = {
        title: 'Add Meal',
      };
    constructor(props) {
        super(props);
        this.state = {
         name: "",
         foods: [],
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
       this.addMeals();
       this.props.navigation.navigate('Meals');
    }

    async addMeals() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("token", "NODEJSAPP");
        let token = await AsyncStorage.getItem('token1');
        myHeaders.append("x-access-token", token);

        var raw = JSON.stringify({name: this.state.name,  
            date: this.state.chosenDate});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals', requestOptions);
        let result = await response.json();

        let id = result.id;
        if(result.message === "Meal created!")
        {
            alert("Meal created! Select your meal to add food to it!");
          //  await AsyncStorage.setItem('currMealID', id);
        }
        else{
            alert("Woops! Please double check that your inputs are correct.")
        }

    }

    //if user is adding food
    async addMeals2() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("token", "NODEJSAPP");
        let token = await AsyncStorage.getItem('token1');
        myHeaders.append("x-access-token", token);

        var raw = JSON.stringify({name: this.state.name,  
            date: this.state.chosenDate});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals', requestOptions);
        let result = await response.json();

        let id = result.id.toString();
        if(result.message === "Meal created!")
        {
           // alert(result.message);
            await AsyncStorage.setItem('currMealID', id);
        }
        else{
            alert("Woops! Please double check that your inputs are correct.")
        }

    }

    addFood = () => {
        this.addMeals2();
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
  
       // console.log(mealID);
        if(mealID != "tmp")
        {
          this.setState({foods: result});
        }
        
    }

    formatFoods () {
        // console.log(this.state.activities.activities);
        // console.log(this.state.activities);
        let listSec = [];
        // // <View>
        // // // {
        //     console.log("list");
        //  console.log(list);
      //      console.log("acts:");
        // console.log(this.state.foods);
      
        for(const food of Object.values(this.state.foods))
        {
            console.log("foodlength");
            console.log(food.length);
            if(food.length != 0){
            for(let i = 0; i < food.length; i++)
            {
                console.log("inloop");
                let currID = food[i].id.toString();
             //   let currCals = acts[i].calories.toString();
             //   let currDuration = acts[i].duration.toString();
                let currName = food[i].name.toString();
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
                    chevron onPress={() => this.editFood(currID, currName)}>
                    </ListItem>
                )
               // console.log(acts[i].calories);
            }
            
        }
    }

      //  this.agMeals();

        //console.log(listSec);

        return listSec;
    }
    
    async editFood(id, name) {

        await AsyncStorage.setItem('currMealID', id);
     //   await AsyncStorage.setItem('currActCals', cals);
     //   await AsyncStorage.setItem('currActDuration', duration);
        await AsyncStorage.setItem('currMealName', name);
        //change to foodeditr
        this.props.navigation.navigate('MealEditor');
      
    }

    componentDidMount() {
        //this.getActivities();
        //this.getFoods();
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
            <View style={{paddingTop: 50, flex: 1, backgroundColor: 'lightyellow', justifyContent: 'center' }}>
                    <TextInput style={{fontSize: 27, textAlignVertical: "center",textAlign: "center"}} placeholder="Meal Name" 
                   onChangeText={(name) => this.setState({name})} value={this.state.name}/>
                    
                  
                    <View style={{margin:5}} />

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


export default AddMeal;
