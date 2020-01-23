import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StatusBar
} from 'react-native';
//import Button from './Button';
import base64 from 'base-64';
//import base64 from 'react-native-base64';
import { createStackNavigator, createSwitchNavigator, 
    createAppContainer, TabBarBottom } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {AsyncStorage} from 'react-native';
//import { PieChart } from 'react-native-svg-charts'
import PieChartWithDynamicSlices from './PieChart'
import StackedBarChartExample from './BarChart'
import StackedAreaExample from './LineChart';



class CurrentDay extends React.Component {
    static navigationOptions = {
        title: 'Dashboard',
      };
    constructor(props) {
        super(props);
        this.state = {
        caloriesToday: "",
        durationToday: "",
        activityGoal: "",

        mealCalsToday: "",
        mealCarbsToday: "",
        mealFatToday: "",
        mealProteinToday: "",

        caloriesGoal: "",
        carbsGoal: "",
        fatGoal: "",
        proteinGoal: "",

        textSize: 0
        }
        
    }

    static navigationOptions = {
        headerShown: false
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      };
    

    async getAgActs(){
        let todayCals = await AsyncStorage.getItem('calsToday');
        this.setState({caloriesToday: todayCals});
        let todayDur = await AsyncStorage.getItem('durToday');
        this.setState({durationToday: todayDur});
        let gdActivity1 = await AsyncStorage.getItem('gdActivity1');
        this.setState({activityGoal: gdActivity1});

        // console.log(todayCals);
      //  console.log(this.state.activityGoal);
    //   console.log("today mins");
    //     console.log(this.state.durationToday);
    }

    async getAgMeals(){
        //await AsyncStorage.setItem('mealCalsToday', stringCals);
       // await AsyncStorage.setItem('mealCarbsToday', stringCarbs);
     //   await AsyncStorage.setItem('mealFatToday', stringFat);
      //  await AsyncStorage.setItem('mealProteinToday', stringProtein);

        let todayCals = await AsyncStorage.getItem('mealCalsToday');
        this.setState({mealCalsToday: todayCals});

        console.log("calories consumed");
        console.log(this.state.mealCalsToday);
        let todayCarbs = await AsyncStorage.getItem('mealCarbsToday');
        this.setState({mealCarbsToday: todayCarbs});
        let todayFat = await AsyncStorage.getItem('mealFatToday');
        this.setState({mealFatToday: todayFat});
        let todayProtein= await AsyncStorage.getItem('mealProteinToday');
        this.setState({mealProteinToday: todayProtein});

        let gdCals1 = await AsyncStorage.getItem('gdCals1');
        this.setState({caloriesGoal: gdCals1});
        let gdCarbs1 = await AsyncStorage.getItem('gdCarbs1');
        this.setState({carbsGoal: gdCarbs1});
        let gdFat1 = await AsyncStorage.getItem('gdFat1');
        this.setState({fatGoal: gdFat1});
        let gdProtein1 = await AsyncStorage.getItem('gdProtein1');
        this.setState({proteinGoal: gdProtein1});


        // // console.log(todayCals);
        // console.log(this.state.activityGoal);
    }

    componentDidMount() {
        //this.getActivities();
        this.getAgActs();
        this.getAgMeals();
        this.setDis()

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.getAgActs();
        this.getAgMeals();
        this.setDis()
        });
    }
        

    componentWillUnmount() {
        // Remove the event listener
       this.focusListener.remove();
    }

    goAct = () => {
      //  console.log("moving");
        this.props.navigation.navigate('Acts');
    }

    goAct = () => {
        //  console.log("moving");
          this.props.navigation.navigate('Meals');
      }

      async setDis()
      {
          let dis = await AsyncStorage.getItem('disability');
          if (dis === "large")
          {
              this.setState({textSize: 10});
          }
          else if (dis === "normal")
          {
              this.setState({textSize: 0});
          }
          console.log(dis);
      }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'lightgreen' }}>
                <ScrollView eventKey="days" title="Days">
                    <View style={{ marginTop: 70, marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 42+ this.state.textSize, textAlignVertical: "center", textAlign: "left" }} adjustsFontSizeToFit={true}>
                            Today's Stats </Text>
                        <Text style={{fontSize: 20+ this.state.textSize, textAlignVertical: "center", textAlign: "left" }} adjustsFontSizeToFit={true}>
                            (Try interacting with the charts!) </Text>
                    </View>

                    <View style={{ backgroundColor: 'lightyellow', marginTop: 25, paddingTop:10, paddingBottom: 10}}>
                    <View style={{ marginLeft: 10 }}>
                        <Text onPress={this.goAct} style={{ color: "purple", fontSize: 32+ this.state.textSize, textAlignVertical: "center", textAlign: "left" }} adjustsFontSizeToFit={true}>
                            Activity › </Text>
                    </View>
                    <View style={{ marginTop: 10,  flexDirection: 'row', alignItems: "center", justifyContent: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                        <Text style={{ color: "purple", fontSize: 27+ this.state.textSize, textAlignVertical: "center" }} adjustsFontSizeToFit={true}>
                            Minutes Active Today: </Text>
                        <Text style={{ fontWeight: 'bold', color: "purple", fontSize: 27+ this.state.textSize, textAlignVertical: "center" }} adjustsFontSizeToFit={true}>
                            {this.state.durationToday} </Text>
                    </View>
                    <View style={{ marginTop: 10,   flexDirection: 'row', alignItems:"center", justifyContent:"center", textAlign: "center"  }}>
                        <Text style={{ color: "purple", fontSize: 27+ this.state.textSize, textAlignVertical: "center" }} adjustsFontSizeToFit={true}>
                            Calories Burned Today: </Text>
                        <Text style={{ fontWeight: 'bold', color: "purple", fontSize: 27+ this.state.textSize, textAlignVertical: "center" }} adjustsFontSizeToFit={true}>
                            {this.state.caloriesToday} </Text>
                    </View>

                        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                            <PieChartWithDynamicSlices actual={this.state.durationToday} goal={this.state.activityGoal} keys="Activity"></PieChartWithDynamicSlices>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'lightyellow', marginTop: 25, paddingTop: 10, paddingBottom: 10 }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text onPress={this.goMeals} style={{  color: "purple", fontSize: 32+ this.state.textSize, textAlignVertical: "center", textAlign: "left" }} adjustsFontSizeToFit={true}>
                                Meals › </Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row',textAlign: "center"}}>
                                <PieChartWithDynamicSlices actual={this.state.mealCalsToday} goal={this.state.caloriesGoal} keys="Calories"></PieChartWithDynamicSlices>
                                <PieChartWithDynamicSlices actual={this.state.mealCarbsToday} goal={this.state.carbsGoal} keys="Carbs"></PieChartWithDynamicSlices>
                            </View>
                            <View style={{ flexDirection: 'row', textAlign: "center" }}>
                                <PieChartWithDynamicSlices actual={this.state.mealFatToday} goal={this.state.fatGoal} keys="Fat"></PieChartWithDynamicSlices>
                                <PieChartWithDynamicSlices actual={this.state.mealProteinToday} goal={this.state.proteinGoal} keys="Protein"></PieChartWithDynamicSlices>
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'lightyellow', marginTop: 25, paddingTop: 10, paddingBottom: 10 }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{  color: "purple", fontSize: 32+ this.state.textSize, textAlignVertical: "center", textAlign: "left" }} adjustsFontSizeToFit={true}>
                                Your Last 7 Days: </Text>
                        </View>
                        <View>
                           <StackedAreaExample> </StackedAreaExample>
                        </View>
                    </View>

                    

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button title="Signout" onPress={this._signOutAsync} />
                        <StatusBar barStyle="default" />
                    </View>
                </ScrollView>
            </View>
            )
    }
}

export default CurrentDay;
