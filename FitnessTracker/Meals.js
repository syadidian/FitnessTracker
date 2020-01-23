import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StatusBar,
    List
} from 'react-native';
import {AsyncStorage} from 'react-native';
import { ListItem } from 'react-native-elements'
import moment from "moment";


class Meals extends React.Component {
    static navigationOptions = {
        title: 'Meals',
      };
    constructor(props) {
        super(props);
        this.state = {
         meals: [],
         currID: "",
         foods: []
        }
        
    }


    async getMeals() {
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

        let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals', requestOptions);
        let result = await response.json();
  
         // console.log(result);
        this.setState({meals: result});
    }

    formatMeals () {
        // console.log(this.state.activities.activities);
        // console.log(this.state.activities);
        let listSec = [];
        // // <View>
        // // // {
        //     console.log("list");
        //  console.log(list);
        // //     console.log("acts:");
        // console.log(list.activities);

        for(const acts of Object.values(this.state.meals))
        {
            for(let i = 0; i < acts.length; i++)
            {
                let currID = acts[i].id.toString();
             //   let currCals = acts[i].calories.toString();
             //   let currDuration = acts[i].duration.toString();
                let currName = acts[i].name.toString();
              //  console.log(acts[i].date);
               // var date = acts[i].date;
             //  let myDate = new Date(your_date_string).toLocaleString("en-US", {timeZone: "America/Chicago"});
               // myDate = new Date(myDate);

                var date = new Date(acts[i].date);
              //  console.log(date);
              //  date = new Date(date);
                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local().format("dddd, MMMM Do YYYY, h:mm:ss a");
               // let newDate = moment.utc(upDate).local().format("dddd, MMMM Do YYYY, h:mm:ss a");
               // console.log(upDate);
               // console.log(newDate);

                listSec.push(
                    <ListItem key={acts[i].id}
                    title= {"Name: " + acts[i].name}
                    
                    subtitle={upDate}
                  
                    bottomDivider
                    chevron onPress={() => this.editMeal(currID, currName)}>
                    </ListItem>
                )
               // console.log(acts[i].calories);
            }
            
        }

        this.agMeals();

        //console.log(listSec);

        return listSec;
    }

    async agMeals () {
        var todayCals = 0;
        var todayCarbs = 0;
        var todayFat = 0;
        var todayProtein = 0;


        for(const acts of Object.values(this.state.meals))
        {
            for(let i = 0; i < acts.length; i++)
            {
                
                var date = new Date(acts[i].date);

                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local();
                console.log(upDate);
                let today = moment(upDate).isSame(moment(), 'day');
                console.log(moment());
                console.log("istoday?");
                console.log(today);
                if (today === true) {
                    var foods = [];
                    console.log(acts[i]);
                    let currID = acts[i].id.toString();
                    // let currCals = acts[i].calories
                    // let currDuration = acts[i].duration
                    // let currName = acts[i].name.toString();
                    // console.log(acts[i].date);
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

                    // let mealID = await AsyncStorage.getItem('currMealID');
                    // console.log(mealID);

                    let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + currID + "/foods", requestOptions);
                    let result = await response.json();

                    // console.log(result);
                    // this.setState({foods: result});
                    foods = result;

                    for (const food of Object.values(foods)) {
                        for (let i = 0; i < food.length; i++) {
                            console.log(food[i]);
                            let currName = food[i].name.toString();
                            let currCals = food[i].calories;
                            let currCarbs = food[i].carbohydrates;
                            let currFat = food[i].fat;
                            let currProtein = food[i].protein;
                         
                            todayCals += currCals;
                             console.log("Cals today "+ todayCals);
                            todayCarbs += currCarbs;
                             console.log("Carbs today " + todayCarbs);
                            todayFat += currFat;
                            console.log("Fat today " + todayFat);
                            todayProtein += currProtein;
                              console.log("Prot today " + todayProtein);
                        }
                    }
                }

            }
        }
        
        let stringCals = todayCals.toString();
        console.log(stringCals);
        let stringCarbs = todayCarbs.toString();
        let stringFat = todayFat.toString();
        let stringProtein = todayProtein.toString();
        if(stringCals === NaN)
        {
            stringCals = 0;
        }
        if(stringCarbs === NaN)
        {
            stringCarbs = 0;
        }
        if(stringFat === NaN)
        {
            stringFat = 0;
        }
        if(stringProtein === NaN)
        {
            stringProtein = 0;
        }
        await AsyncStorage.setItem('mealCalsToday', stringCals);
        await AsyncStorage.setItem('mealCarbsToday', stringCarbs);
        await AsyncStorage.setItem('mealFatToday', stringFat);
        await AsyncStorage.setItem('mealProteinToday', stringProtein);

        this.ag1DayAgo();
        this.ag2DayAgo();
        this.ag3DayAgo();
        this.ag4DayAgo();
        this.ag5DayAgo();
        this.ag6DayAgo();
    }


    async ag1DayAgo () {
        var todayCals = 0;
        var todayCarbs = 0;
        var todayFat = 0;
        var todayProtein = 0;

        for(const acts of Object.values(this.state.meals))
        {
            for(let i = 0; i < acts.length; i++)
            {
                var date = new Date(acts[i].date);
                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local();
                console.log(upDate);
                let yesterday = moment(upDate).isSame(moment().subtract(1, 'day'), 'day');
                console.log(moment());
                console.log("isyesteday?");
                console.log(yesterday);
                if (yesterday === true) {
                    var foods = [];
                    console.log(acts[i]);
                    let currID = acts[i].id.toString();
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("token", "NODEJSAPP");
                    let token = await AsyncStorage.getItem('token1');
                    myHeaders.append("x-access-token", token);

                    var requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        //   body: raw,
                        redirect: 'follow'
                    };


                    let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + currID + "/foods", requestOptions);
                    let result = await response.json();

                    // console.log(result);
                    // this.setState({foods: result});
                    foods = result;

                    for (const food of Object.values(foods)) {
                        for (let i = 0; i < food.length; i++) {
                            console.log(food[i]);
                            let currName = food[i].name.toString();
                            let currCals = food[i].calories;
                            let currCarbs = food[i].carbohydrates;
                            let currFat = food[i].fat;
                            let currProtein = food[i].protein;
                         
                            todayCals += currCals;
                             console.log("Cals 1ago "+ todayCals);
                            todayCarbs += currCarbs;
                             console.log("Carbs 1ago " + todayCarbs);
                            todayFat += currFat;
                            console.log("Fat 1ago " + todayFat);
                            todayProtein += currProtein;
                              console.log("Prot 1ago " + todayProtein);
                        }
                    }
                }

            }
        }
        
        let stringCals = todayCals.toString();
        console.log(stringCals);
        let stringCarbs = todayCarbs.toString();
        let stringFat = todayFat.toString();
        let stringProtein = todayProtein.toString();
        if(stringCals === NaN)
        {
            stringCals = 0;
        }
        if(stringCarbs === NaN)
        {
            stringCarbs = 0;
        }
        if(stringFat === NaN)
        {
            stringFat = 0;
        }
        if(stringProtein === NaN)
        {
            stringProtein = 0;
        }
        await AsyncStorage.setItem('mealCals1', stringCals);
        await AsyncStorage.setItem('mealCarbs1', stringCarbs);
        await AsyncStorage.setItem('mealFat1', stringFat);
        await AsyncStorage.setItem('mealProtein1', stringProtein);
    }

    async ag2DayAgo () {
        var todayCals = 0;
        var todayCarbs = 0;
        var todayFat = 0;
        var todayProtein = 0;

        for(const acts of Object.values(this.state.meals))
        {
            for(let i = 0; i < acts.length; i++)
            {
                var date = new Date(acts[i].date);
                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local();
                console.log(upDate);
                let yesterday = moment(upDate).isSame(moment().subtract(2, 'day'), 'day');
                console.log(moment());
                console.log("2ago?");
                console.log(yesterday);
                if (yesterday === true) {
                    var foods = [];
                    console.log(acts[i]);
                    let currID = acts[i].id.toString();
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("token", "NODEJSAPP");
                    let token = await AsyncStorage.getItem('token1');
                    myHeaders.append("x-access-token", token);

                    var requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        //   body: raw,
                        redirect: 'follow'
                    };


                    let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + currID + "/foods", requestOptions);
                    let result = await response.json();

                    // console.log(result);
                    // this.setState({foods: result});
                    foods = result;

                    for (const food of Object.values(foods)) {
                        for (let i = 0; i < food.length; i++) {
                            console.log(food[i]);
                            let currName = food[i].name.toString();
                            let currCals = food[i].calories;
                            let currCarbs = food[i].carbohydrates;
                            let currFat = food[i].fat;
                            let currProtein = food[i].protein;
                         
                            todayCals += currCals;
                             console.log("Cals 2ago "+ todayCals);
                            todayCarbs += currCarbs;
                             console.log("Carbs 2ago " + todayCarbs);
                            todayFat += currFat;
                            console.log("Fat 2ago " + todayFat);
                            todayProtein += currProtein;
                              console.log("Prot 2ago " + todayProtein);
                        }
                    }
                }

            }
        }
        
        let stringCals = todayCals.toString();
        console.log(stringCals);
        let stringCarbs = todayCarbs.toString();
        let stringFat = todayFat.toString();
        let stringProtein = todayProtein.toString();
        if(stringCals === NaN)
        {
            stringCals = 0;
        }
        if(stringCarbs === NaN)
        {
            stringCarbs = 0;
        }
        if(stringFat === NaN)
        {
            stringFat = 0;
        }
        if(stringProtein === NaN)
        {
            stringProtein = 0;
        }
        await AsyncStorage.setItem('mealCals2', stringCals);
        await AsyncStorage.setItem('mealCarbs2', stringCarbs);
        await AsyncStorage.setItem('mealFat2', stringFat);
        await AsyncStorage.setItem('mealProtein2', stringProtein);
    }

    async ag3DayAgo () {
        var todayCals = 0;
        var todayCarbs = 0;
        var todayFat = 0;
        var todayProtein = 0;

        for(const acts of Object.values(this.state.meals))
        {
            for(let i = 0; i < acts.length; i++)
            {
                var date = new Date(acts[i].date);
                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local();
                console.log(upDate);
                let yesterday = moment(upDate).isSame(moment().subtract(3, 'day'), 'day');
                console.log(moment());
                console.log("3ago?");
                console.log(yesterday);
                if (yesterday === true) {
                    var foods = [];
                    console.log(acts[i]);
                    let currID = acts[i].id.toString();
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("token", "NODEJSAPP");
                    let token = await AsyncStorage.getItem('token1');
                    myHeaders.append("x-access-token", token);

                    var requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        //   body: raw,
                        redirect: 'follow'
                    };


                    let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + currID + "/foods", requestOptions);
                    let result = await response.json();

                    // console.log(result);
                    // this.setState({foods: result});
                    foods = result;

                    for (const food of Object.values(foods)) {
                        for (let i = 0; i < food.length; i++) {
                            console.log(food[i]);
                            let currName = food[i].name.toString();
                            let currCals = food[i].calories;
                            let currCarbs = food[i].carbohydrates;
                            let currFat = food[i].fat;
                            let currProtein = food[i].protein;
                         
                            todayCals += currCals;
                             console.log("Cals 3ago "+ todayCals);
                            todayCarbs += currCarbs;
                             console.log("Carbs 3ago " + todayCarbs);
                            todayFat += currFat;
                            console.log("Fat 3ago " + todayFat);
                            todayProtein += currProtein;
                              console.log("Prot 3ago " + todayProtein);
                        }
                    }
                }

            }
        }
        
        let stringCals = todayCals.toString();
        console.log(stringCals);
        let stringCarbs = todayCarbs.toString();
        let stringFat = todayFat.toString();
        let stringProtein = todayProtein.toString();
        if(stringCals === NaN)
        {
            stringCals = 0;
        }
        if(stringCarbs === NaN)
        {
            stringCarbs = 0;
        }
        if(stringFat === NaN)
        {
            stringFat = 0;
        }
        if(stringProtein === NaN)
        {
            stringProtein = 0;
        }
        await AsyncStorage.setItem('mealCals3', stringCals);
        await AsyncStorage.setItem('mealCarbs3', stringCarbs);
        await AsyncStorage.setItem('mealFat3', stringFat);
        await AsyncStorage.setItem('mealProtein3', stringProtein);
    }

    async ag4DayAgo () {
        var todayCals = 0;
        var todayCarbs = 0;
        var todayFat = 0;
        var todayProtein = 0;

        for(const acts of Object.values(this.state.meals))
        {
            for(let i = 0; i < acts.length; i++)
            {
                var date = new Date(acts[i].date);
                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local();
                console.log(upDate);
                let yesterday = moment(upDate).isSame(moment().subtract(4, 'day'), 'day');
                console.log(moment());
                console.log("4ago?");
                console.log(yesterday);
                if (yesterday === true) {
                    var foods = [];
                    console.log(acts[i]);
                    let currID = acts[i].id.toString();
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("token", "NODEJSAPP");
                    let token = await AsyncStorage.getItem('token1');
                    myHeaders.append("x-access-token", token);

                    var requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        //   body: raw,
                        redirect: 'follow'
                    };


                    let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + currID + "/foods", requestOptions);
                    let result = await response.json();

                    // console.log(result);
                    // this.setState({foods: result});
                    foods = result;

                    for (const food of Object.values(foods)) {
                        for (let i = 0; i < food.length; i++) {
                            console.log(food[i]);
                            let currName = food[i].name.toString();
                            let currCals = food[i].calories;
                            let currCarbs = food[i].carbohydrates;
                            let currFat = food[i].fat;
                            let currProtein = food[i].protein;
                         
                            todayCals += currCals;
                             console.log("Cals 4ago "+ todayCals);
                            todayCarbs += currCarbs;
                             console.log("Carbs 4ago " + todayCarbs);
                            todayFat += currFat;
                            console.log("Fat 4ago " + todayFat);
                            todayProtein += currProtein;
                              console.log("Prot 4ago " + todayProtein);
                        }
                    }
                }

            }
        }
        
        let stringCals = todayCals.toString();
        console.log(stringCals);
        let stringCarbs = todayCarbs.toString();
        let stringFat = todayFat.toString();
        let stringProtein = todayProtein.toString();
        if(stringCals === NaN)
        {
            stringCals = 0;
        }
        if(stringCarbs === NaN)
        {
            stringCarbs = 0;
        }
        if(stringFat === NaN)
        {
            stringFat = 0;
        }
        if(stringProtein === NaN)
        {
            stringProtein = 0;
        }
        await AsyncStorage.setItem('mealCals4', stringCals);
        await AsyncStorage.setItem('mealCarbs4', stringCarbs);
        await AsyncStorage.setItem('mealFat4', stringFat);
        await AsyncStorage.setItem('mealProtein4', stringProtein);
    }

    async ag5DayAgo () {
        var todayCals = 0;
        var todayCarbs = 0;
        var todayFat = 0;
        var todayProtein = 0;

        for(const acts of Object.values(this.state.meals))
        {
            for(let i = 0; i < acts.length; i++)
            {
                var date = new Date(acts[i].date);
                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local();
                console.log(upDate);
                let yesterday = moment(upDate).isSame(moment().subtract(5, 'day'), 'day');
                console.log(moment());
                console.log("5ago?");
                console.log(yesterday);
                if (yesterday === true) {
                    var foods = [];
                    console.log(acts[i]);
                    let currID = acts[i].id.toString();
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("token", "NODEJSAPP");
                    let token = await AsyncStorage.getItem('token1');
                    myHeaders.append("x-access-token", token);

                    var requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        //   body: raw,
                        redirect: 'follow'
                    };


                    let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + currID + "/foods", requestOptions);
                    let result = await response.json();

                    // console.log(result);
                    // this.setState({foods: result});
                    foods = result;

                    for (const food of Object.values(foods)) {
                        for (let i = 0; i < food.length; i++) {
                            console.log(food[i]);
                            let currName = food[i].name.toString();
                            let currCals = food[i].calories;
                            let currCarbs = food[i].carbohydrates;
                            let currFat = food[i].fat;
                            let currProtein = food[i].protein;
                         
                            todayCals += currCals;
                             console.log("Cals 5ago "+ todayCals);
                            todayCarbs += currCarbs;
                             console.log("Carbs 5ago " + todayCarbs);
                            todayFat += currFat;
                            console.log("Fat 5ago " + todayFat);
                            todayProtein += currProtein;
                              console.log("Prot 5ago " + todayProtein);
                        }
                    }
                }

            }
        }
        
        let stringCals = todayCals.toString();
        console.log(stringCals);
        let stringCarbs = todayCarbs.toString();
        let stringFat = todayFat.toString();
        let stringProtein = todayProtein.toString();
        if(stringCals === NaN)
        {
            stringCals = 0;
        }
        if(stringCarbs === NaN)
        {
            stringCarbs = 0;
        }
        if(stringFat === NaN)
        {
            stringFat = 0;
        }
        if(stringProtein === NaN)
        {
            stringProtein = 0;
        }
        await AsyncStorage.setItem('mealCals5', stringCals);
        await AsyncStorage.setItem('mealCarbs5', stringCarbs);
        await AsyncStorage.setItem('mealFat5', stringFat);
        await AsyncStorage.setItem('mealProtein5', stringProtein);
    }

    async ag6DayAgo () {
        var todayCals = 0;
        var todayCarbs = 0;
        var todayFat = 0;
        var todayProtein = 0;

        for(const acts of Object.values(this.state.meals))
        {
            for(let i = 0; i < acts.length; i++)
            {
                var date = new Date(acts[i].date);
                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local();
                console.log(upDate);
                let yesterday = moment(upDate).isSame(moment().subtract(6, 'day'), 'day');
                console.log(moment());
                console.log("3ago?");
                console.log(yesterday);
                if (yesterday === true) {
                    var foods = [];
                    console.log(acts[i]);
                    let currID = acts[i].id.toString();
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("token", "NODEJSAPP");
                    let token = await AsyncStorage.getItem('token1');
                    myHeaders.append("x-access-token", token);

                    var requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        //   body: raw,
                        redirect: 'follow'
                    };


                    let response = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + currID + "/foods", requestOptions);
                    let result = await response.json();

                    // console.log(result);
                    // this.setState({foods: result});
                    foods = result;

                    for (const food of Object.values(foods)) {
                        for (let i = 0; i < food.length; i++) {
                            console.log(food[i]);
                            let currName = food[i].name.toString();
                            let currCals = food[i].calories;
                            let currCarbs = food[i].carbohydrates;
                            let currFat = food[i].fat;
                            let currProtein = food[i].protein;
                         
                            todayCals += currCals;
                             console.log("Cals 6ago "+ todayCals);
                            todayCarbs += currCarbs;
                             console.log("Carbs 6ago " + todayCarbs);
                            todayFat += currFat;
                            console.log("Fat 6ago " + todayFat);
                            todayProtein += currProtein;
                              console.log("Prot 6ago " + todayProtein);
                        }
                    }
                }

            }
        }
        
        let stringCals = todayCals.toString();
        console.log(stringCals);
        let stringCarbs = todayCarbs.toString();
        let stringFat = todayFat.toString();
        let stringProtein = todayProtein.toString();
        if(stringCals === NaN)
        {
            stringCals = 0;
        }
        if(stringCarbs === NaN)
        {
            stringCarbs = 0;
        }
        if(stringFat === NaN)
        {
            stringFat = 0;
        }
        if(stringProtein === NaN)
        {
            stringProtein = 0;
        }
        await AsyncStorage.setItem('mealCals6', stringCals);
        await AsyncStorage.setItem('mealCarbs6', stringCarbs);
        await AsyncStorage.setItem('mealFat6', stringFat);
        await AsyncStorage.setItem('mealProtein6', stringProtein);
    }

    async editMeal(id, name) {
        //console.log("ineditmeal");
        await AsyncStorage.setItem('currMealID', id);
     //   await AsyncStorage.setItem('currActCals', cals);
     //   await AsyncStorage.setItem('currActDuration', duration);
        await AsyncStorage.setItem('currMealName', name);
        //console.log("navigating??");
        this.props.navigation.navigate('MealEditor');
      
    }

     addMeal = () => {
         AsyncStorage.setItem('currMealID', "tmp");
        this.props.navigation.navigate('MealAdder');
    }

    componentDidMount() {
        //this.getActivities();
        this.getMeals();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.getMeals();
        });
    }
        

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    render() {
        return (
            <View style={{paddingTop: 0, flex: 1, backgroundColor: 'lightyellow', justifyContent: 'center' }}>
                <ScrollView eventKey="acts" title="Acts">
                <Button style={{flex: 1, justifyContent: 'center'}} title="Add Meal" onPress={this.addMeal} />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                    {this.formatMeals()}</View>

                    
                </ScrollView>


                <StatusBar barStyle="default" />
            </View>
            )
    }
}


export default Meals;

