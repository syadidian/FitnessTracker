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


class Activities extends React.Component {
    static navigationOptions = {
        title: 'Activities',
      };
    constructor(props) {
        super(props);
        this.state = {
         activities: [],
         currID: ""
        }
        
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    async getActivities() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let token = await AsyncStorage.getItem('token1');
     // console.log(token);
        myHeaders.append("x-access-token", token);

       // var raw = "{\n	\"name\":\"run\",\n \"duration\":5,\n \"calories\":5\n}";

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
          //  body: raw,
            redirect: 'follow'
        };

        // fetch('https://mysqlcs639.cs.wisc.edu/activities', requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));

        let response = await fetch('https://mysqlcs639.cs.wisc.edu/activities', requestOptions);
        let result = await response.json();

       // console.log(result);
        this.setState({activities: result});
       // this.formatActs();
       
        // console.log("outer");
        // console.log(this.state.activities);
        console.log("HERE");
    }

    formatActs () {
        // console.log(this.state.activities.activities);
        // console.log(this.state.activities);
        let listSec = [];
        // // <View>
        // // // {
        //     console.log("list");
        //  console.log(list);
        // //     console.log("acts:");
        // console.log(list.activities);

        for(const acts of Object.values(this.state.activities))
        {
            for(let i = 0; i < acts.length; i++)
            {
                let currID = acts[i].id.toString();
                let currCals = acts[i].calories.toString();
                let currDuration = acts[i].duration.toString();
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
                    chevron onPress={() => this.editAct(currID, currCals, currDuration, currName)}>
                    </ListItem>
                )
               // console.log(acts[i].calories);
            }
            
        }

        this.agActs();

        //console.log(listSec);

        return listSec;
        
    }

    async agActs () {
        let todayCals = 0;
        let todayDur = 0;
        for(const acts of Object.values(this.state.activities))
        {
            for(let i = 0; i < acts.length; i++)
            {
                let currID = acts[i].id.toString();
                let currCals = acts[i].calories
                let currDuration = acts[i].duration
                let currName = acts[i].name.toString();
               // console.log(acts[i].date);

                var date = new Date(acts[i].date);
                
                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local();
                console.log(upDate);
                let today = moment(upDate).isSame(moment(), 'day');
                console.log(moment());
                console.log("istoday?");
                console.log(today);
                if(today === true)
                {
                    todayCals += currCals;
                    console.log("Cals today "+ todayCals);
                    todayDur += currDuration;
                    console.log("Mins today " + todayDur);
                }

            }
        }
        let stringCals = todayCals.toString();
        let stringDur = todayDur.toString();
        if(stringDur === NaN)
        {
            stringDur = 0;
        }
        if(stringCals === NaN)
        {
            stringCals = 0;
        }
        await AsyncStorage.setItem('calsToday', stringCals);
        await AsyncStorage.setItem('durToday', stringDur);

        this.ag1DayAgo();
        this.ag2DayAgo();
        this.ag3DayAgo();
        this.ag4DayAgo();
        this.ag5DayAgo();
        this.ag6DayAgo();
    }

    async ag1DayAgo () {
     
        let todayDur = 0;
        for(const acts of Object.values(this.state.activities))
        {
            for(let i = 0; i < acts.length; i++)
            {
                let currID = acts[i].id.toString();
                let currCals = acts[i].calories
                let currDuration = acts[i].duration
                let currName = acts[i].name.toString();
               // console.log(acts[i].date);

                var date = new Date(acts[i].date);
                
                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local();
                console.log(upDate);
                let today = moment(upDate).isSame(moment().subtract(1, 'day'), 'day');;
                console.log(moment());
                console.log("istoday?");
                console.log(today);
                if(today === true)
                {
                    todayDur += currDuration;
                    console.log("Mins today " + todayDur);
                }

            }
        }
      
        let stringDur = todayDur.toString();
        if(stringDur === NaN)
        {
            stringDur = 0;
        }
        await AsyncStorage.setItem('dur1', stringDur);
    }

    async ag2DayAgo () {
     
        let todayDur = 0;
        for(const acts of Object.values(this.state.activities))
        {
            for(let i = 0; i < acts.length; i++)
            {
                let currID = acts[i].id.toString();
                let currCals = acts[i].calories
                let currDuration = acts[i].duration
                let currName = acts[i].name.toString();
               // console.log(acts[i].date);

                var date = new Date(acts[i].date);
                
                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local();
                console.log(upDate);
                let today = moment(upDate).isSame(moment().subtract(2, 'day'), 'day');;
                console.log(moment());
                console.log("istoday?");
                console.log(today);
                if(today === true)
                {
                    todayDur += currDuration;
                    console.log("Mins today " + todayDur);
                }

            }
        }
      
        let stringDur = todayDur.toString();
        if(stringDur === NaN)
        {
            stringDur = 0;
        }
        await AsyncStorage.setItem('dur2', stringDur);
    }

    async ag3DayAgo () {
     
        let todayDur = 0;
        for(const acts of Object.values(this.state.activities))
        {
            for(let i = 0; i < acts.length; i++)
            {
                let currID = acts[i].id.toString();
                let currCals = acts[i].calories
                let currDuration = acts[i].duration
                let currName = acts[i].name.toString();
               // console.log(acts[i].date);

                var date = new Date(acts[i].date);
                
                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local();
                console.log(upDate);
                let today = moment(upDate).isSame(moment().subtract(3, 'day'), 'day');;
                console.log(moment());
                console.log("istoday?");
                console.log(today);
                if(today === true)
                {
                    todayDur += currDuration;
                    console.log("Mins today " + todayDur);
                }

            }
        }
      
        let stringDur = todayDur.toString();
        if(stringDur === NaN)
        {
            stringDur = 0;
        }
        await AsyncStorage.setItem('dur3', stringDur);
    }

    async ag4DayAgo () {
     
        let todayDur = 0;
        for(const acts of Object.values(this.state.activities))
        {
            for(let i = 0; i < acts.length; i++)
            {
                let currID = acts[i].id.toString();
                let currCals = acts[i].calories
                let currDuration = acts[i].duration
                let currName = acts[i].name.toString();
               // console.log(acts[i].date);

                var date = new Date(acts[i].date);
                
                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local();
                console.log(upDate);
                let today = moment(upDate).isSame(moment().subtract(4, 'day'), 'day');;
                console.log(moment());
                console.log("istoday?");
                console.log(today);
                if(today === true)
                {
                    todayDur += currDuration;
                    console.log("Mins today " + todayDur);
                }

            }
        }
      
        let stringDur = todayDur.toString();
        if(stringDur === NaN)
        {
            stringDur = 0;
        }
        await AsyncStorage.setItem('dur4', stringDur);
    }

    async ag5DayAgo () {
     
        let todayDur = 0;
        for(const acts of Object.values(this.state.activities))
        {
            for(let i = 0; i < acts.length; i++)
            {
                let currID = acts[i].id.toString();
                let currCals = acts[i].calories
                let currDuration = acts[i].duration
                let currName = acts[i].name.toString();
               // console.log(acts[i].date);

                var date = new Date(acts[i].date);
                
                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local();
                console.log(upDate);
                let today = moment(upDate).isSame(moment().subtract(5, 'day'), 'day');;
                console.log(moment());
                console.log("istoday?");
                console.log(today);
                if(today === true)
                {
                    todayDur += currDuration;
                    console.log("Mins today " + todayDur);
                }

            }
        }
      
        let stringDur = todayDur.toString();
        if(stringDur === NaN)
        {
            stringDur = 0;
        }
        await AsyncStorage.setItem('dur5', stringDur);
    }

    async ag6DayAgo () {
     
        let todayDur = 0;
        for(const acts of Object.values(this.state.activities))
        {
            for(let i = 0; i < acts.length; i++)
            {
                let currID = acts[i].id.toString();
                let currCals = acts[i].calories
                let currDuration = acts[i].duration
                let currName = acts[i].name.toString();
               // console.log(acts[i].date);

                var date = new Date(acts[i].date);
                
                var stillUtc = moment(date).utc(date).toDate();
                var upDate = moment(stillUtc).local();
                console.log(upDate);
                let today = moment(upDate).isSame(moment().subtract(6, 'day'), 'day');;
                console.log(moment());
                console.log("istoday?");
                console.log(today);
                if(today === true)
                {
                    todayDur += currDuration;
                    console.log("Mins today " + todayDur);
                }

            }
        }
      
        let stringDur = todayDur.toString();
        if(stringDur === NaN)
        {
            stringDur = 0;
        }
        await AsyncStorage.setItem('dur6', stringDur);
    }

    async editAct(id, cals, duration, name) {

        await AsyncStorage.setItem('currActID', id);
        await AsyncStorage.setItem('currActCals', cals);
        await AsyncStorage.setItem('currActDuration', duration);
        await AsyncStorage.setItem('currActName', name);
        this.props.navigation.navigate('ActEditor');
      
    }

    addAct = () => {
        this.props.navigation.navigate('ActAdder');
    }

    componentDidMount() {
        //this.getActivities();
        this.getActivities();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.getActivities();
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
                <Button style={{flex: 1, justifyContent: 'center'}} title="Add Activity" onPress={this.addAct} />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                    {this.formatActs()}</View>

                    
                </ScrollView>


                <StatusBar barStyle="default" />
            </View>
            )
    }
}


export default Activities;

