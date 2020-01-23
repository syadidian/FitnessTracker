import React from 'react'
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import {AsyncStorage, View, Text} from 'react-native';
import { createStackNavigator, createSwitchNavigator, 
    createAppContainer, TabBarBottom } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

class StackedAreaExample extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mealCals6: 0,
            mealCarbs6: 0,
            mealFat6: 0,
            mealProtein6:0,
            dur6: 0,

            mealCals5: 0,
            mealCarbs5: 0,
            mealFat5: 0,
            mealProtein5:0,
            dur5: 0,

            mealCals4: 0,
            mealCarbs4: 0,
            mealFat4: 0,
            mealProtein4:0,
            dur4: 0,

            mealCals3: 0,
            mealCarbs3: 0,
            mealFat3: 0,
            mealProtein3:0,
            dur3: 0,

            mealCals2: 0,
            mealCarbs2: 0,
            mealFat2: 0,
            mealProtein2:0,
            dur2: 0,

            
            mealCals1: 0,
            mealCarbs1: 0,
            mealFat1: 0,
            mealProtein1:0,
            dur1: 0,

            mealCals0: 0,
            mealCarbs0: 0,
            mealFat0: 0,
            mealProtein0:0,
            dur0: 0,

            displayText:"",
            displayColor:"",
            textSize: 0
        }
    }


    async numerize()
    {
        let mealCals6 = await AsyncStorage.getItem('mealCals6');
        nmealCals6 = parseInt(mealCals6, 10 );
        let mealCarbs6 = await AsyncStorage.getItem('mealCarbs6');
        nmealCarbs6 = parseInt(mealCarbs6, 10 );
        let mealFat6 = await AsyncStorage.getItem('mealFat6');
        nmealFat6 = parseInt(mealFat6, 10 );
        let mealProtein6 = await AsyncStorage.getItem('mealProtein6');
        nmealProtein6 = parseInt(mealProtein6, 10 );
        let dur6 = await AsyncStorage.getItem('dur6');
        ndur6 = parseInt(dur6, 10 );
        this.setState({dur6:ndur6, mealCals6: nmealCals6, mealCarbs6:nmealCarbs6, mealFat6:nmealFat6, mealProtein6:nmealProtein6});
        console.log("statetest");
        console.log(this.state.mealCals6);
        console.log(this.state.mealCarbs6);
        console.log(this.state.mealFat6);
        console.log(this.state.mealProtein6);


        let mealCals5 = await AsyncStorage.getItem('mealCals5');
        nmealCals5 = parseInt(mealCals5, 10 );
        let mealCarbs5 = await AsyncStorage.getItem('mealCarbs5');
        nmealCarbs5 = parseInt(mealCarbs5, 10 );
        let mealFat5 = await AsyncStorage.getItem('mealFat5');
        nmealFat5 = parseInt(mealFat5, 10 );
        let mealProtein5 = await AsyncStorage.getItem('mealProtein5');
        nmealProtein5 = parseInt(mealProtein5, 10 );
        let dur5 = await AsyncStorage.getItem('dur5');
        ndur5 = parseInt(dur5, 10 );
        this.setState({dur5: ndur5, mealCals5: nmealCals5, mealCarbs5:nmealCarbs5, mealFat5:nmealFat5, mealProtein5:nmealProtein5});


        let mealCals4 = await AsyncStorage.getItem('mealCals4');
        nmealCals4 = parseInt(mealCals4, 10 );
        let mealCarbs4 = await AsyncStorage.getItem('mealCarbs4');
        nmealCarbs4 = parseInt(mealCarbs4, 10 );
        let mealFat4 = await AsyncStorage.getItem('mealFat4');
        nmealFat4 = parseInt(mealFat4, 10 );
        let mealProtein4 = await AsyncStorage.getItem('mealProtein4');
        nmealProtein4 = parseInt(mealProtein4, 10 );
        let dur4 = await AsyncStorage.getItem('dur4');
        ndur4 = parseInt(dur4, 10 );
        this.setState({dur4: ndur4, mealCals4: nmealCals4, mealCarbs4: nmealCarbs4, mealFat4:nmealFat4, mealProtein4:nmealProtein4});


        let mealCals3 = await AsyncStorage.getItem('mealCals3');
        nmealCals3 = parseInt(mealCals3, 10 );
        let mealCarbs3 = await AsyncStorage.getItem('mealCarbs3');
        nmealCarbs3 = parseInt(mealCarbs3, 10 );
        let mealFat3 = await AsyncStorage.getItem('mealFat3');
        nmealFat3 = parseInt(mealFat3, 10 );
        let mealProtein3 = await AsyncStorage.getItem('mealProtein3');
        nmealProtein3 = parseInt(mealProtein3, 10 );
        let dur3 = await AsyncStorage.getItem('dur3');
        ndur3 = parseInt(dur3, 10 );
        this.setState({dur3: ndur3, mealCals3: nmealCals3, mealCarbs3: nmealCarbs3, mealFat3:nmealFat3, mealProtein3:nmealProtein3});

        let mealCals2 = await AsyncStorage.getItem('mealCals2');
        nmealCals2 = parseInt(mealCals2, 10 );
        let mealCarbs2 = await AsyncStorage.getItem('mealCarbs2');
        nmealCarbs2 = parseInt(mealCarbs2, 10 );
        let mealFat2 = await AsyncStorage.getItem('mealFat2');
        nmealFat2 = parseInt(mealFat2, 10 );
        let mealProtein2 = await AsyncStorage.getItem('mealProtein2');
        nmealProtein2 = parseInt(mealProtein2, 10 );
        let dur2 = await AsyncStorage.getItem('dur2');
        ndur2 = parseInt(dur2, 10 );
        this.setState({dur2: ndur2, mealCals2: nmealCals2, mealCarbs2: nmealCarbs2, mealFat2:nmealFat2, mealProtein2:nmealProtein2});

        let mealCals1 = await AsyncStorage.getItem('mealCals1');
        nmealCals1 = parseInt(mealCals1, 10 );
        let mealCarbs1 = await AsyncStorage.getItem('mealCarbs1');
        nmealCarbs1 = parseInt(mealCarbs1, 10 );
        let mealFat1 = await AsyncStorage.getItem('mealFat1');
        nmealFat1 = parseInt(mealFat1, 10 );
        let mealProtein1 = await AsyncStorage.getItem('mealProtein1');
        nmealProtein1 = parseInt(mealProtein1, 10 );
        let dur1 = await AsyncStorage.getItem('dur1');
        ndur1 = parseInt(dur1, 10 );
        this.setState({dur1: ndur1, mealCals1: nmealCals1, mealCarbs1: nmealCarbs1, mealFat1:nmealFat1, mealProtein1:nmealProtein1});

        let mealCals0 = await AsyncStorage.getItem('mealCalsToday');
        nmealCals0 = parseInt(mealCals0, 10 );
        let mealCarbs0 = await AsyncStorage.getItem('mealCarbsToday');
        nmealCarbs0 = parseInt(mealCarbs0, 10 );
        let mealFat0 = await AsyncStorage.getItem('mealFatToday');
        nmealFat0 = parseInt(mealFat0, 10 );
        let mealProtein0 = await AsyncStorage.getItem('mealProteinToday');
        nmealProtein0 = parseInt(mealProtein0, 10 );
        let dur0 = await AsyncStorage.getItem('durToday');
        ndur0 = parseInt(dur0, 10 );
        this.setState({dur0: ndur0, mealCals0: nmealCals0, mealCarbs0: nmealCarbs0, mealFat0: nmealFat0, mealProtein0: nmealProtein0});
    }

    componentDidMount() {
        //this.getActivities();
        
        //this.setDis();
    }
        

    componentWillUnmount() {
        // Remove the event listener
       this.focusListener.remove();
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
       
        this.numerize();
        const data = [
            {
                // 6 days ago
                month: new Date(2015, 0, 1),
                Calories: this.state.mealCals6,
                Carbs: this.state.mealCarbs6,
                Fat: this.state.mealFat6,
                Protein: this.state.mealProtein6,
                Activity: this.state.dur6
            },
            {
                // 5 days ago
                month: new Date(2015, 1, 1),
                Calories: this.state.mealCals5,
                Carbs: this.state.mealCarbs5,
                Fat: this.state.mealFat5,
                Protein: this.state.mealProtein5,
                Activity: this.state.dur5
            },
            {
                // 4 days ago
                month: new Date(2015, 2, 1),
                Calories: this.state.mealCals4,
                Carbs: this.state.mealCarbs4,
                Fat: this.state.mealFat4,
                Protein: this.state.mealProtein4,
                Activity: this.state.dur4
            },
            {
                // 3 days ago
                month: new Date(2015, 3, 1),
                Calories: this.state.mealCals3,
                Carbs: this.state.mealCarbs3,
                Fat: this.state.mealFat3,
                Protein: this.state.mealProtein3,
                Activity: this.state.dur3
            },
            {
                // 2 days ago
                month: new Date(2015, 4, 1),
                Calories: this.state.mealCals2,
                Carbs: this.state.mealCarbs2,
                Fat: this.state.mealFat2,
                Protein: this.state.mealProtein2,
                Activity: this.state.dur2
            },
            {
                // 1 day ago
                month: new Date(2015, 5, 1),
                Calories: this.state.mealCals1,
                Carbs: this.state.mealCarbs1,
                Fat: this.state.mealFat1,
                Protein: this.state.mealProtein1,
                Activity: this.state.dur1
            },
            {
                // Today
                month: new Date(2015, 6, 1),
                Calories: this.state.mealCals0,
                Carbs: this.state.mealCarbs0,
                Fat: this.state.mealFat0,
                Protein: this.state.mealProtein0,
                Activity: this.state.dur0
            },
        ]

        const colors = ['#8800cc', '#aa00ff', '#cc66ff', '#eeccff', 'blue']
        const keys = ['Calories', 'Carbs', 'Fat', 'Protein', 'Activity']
        const svgs = [
            { onPress: () => this.setState({displayText: 'Calories Consumed: ' + this.state.mealCals6 + ", "
            + this.state.mealCals5 + ", " + this.state.mealCals4 + ", " + this.state.mealCals3 + ", " + this.state.mealCals2 + ", " + this.state.mealCals1 + ", " + this.state.mealCals0+"(today)",
             displayColor: '#8800cc'}) },
            { onPress: () => this.setState({displayText: 'Carbs Consumed: ' + this.state.mealCarbs6 + ", "
            + this.state.mealCarbs5 + ", " + this.state.mealCarbs4 + ", " + this.state.mealCarbs3 + ", " + this.state.mealCarbs2 + ", " + this.state.mealCarbs1 + ", " + this.state.mealCarbs0+"(today)",
             displayColor: '#aa00ff'}) },
            { onPress: () => this.setState({displayText: 'Fat Consumed: ' + this.state.mealFat6 + ", "
            + this.state.mealFat5 + ", " + this.state.mealFat4 + ", " + this.state.mealFat3 + ", " + this.state.mealFat2 + ", " + this.state.mealFat1 + ", " + this.state.mealFat0+"(today)", 
             displayColor: '#cc66ff'}) },
            { onPress: () => this.setState({displayText: 'Protein Consumed: ' + this.state.mealProtein6 + ", "
            + this.state.mealProtein5 + ", " + this.state.mealProtein4 + ", " + this.state.mealProtein3 + ", " + this.state.mealProtein2 + ", " + this.state.mealProtein1 + ", " + this.state.mealProtein0+"(today)", 
            displayColor: '#eeccff'}) },
            { onPress: () => this.setState({displayText: 'Minutes Active: ' + this.state.dur6 + ", "
            + this.state.dur5 + ", " + this.state.dur4 + ", " + this.state.dur3 + ", " + this.state.dur2 + ", " + this.state.dur1 + ", " + this.state.dur0+"(today)", 
            displayColor: 'blue'}) },
        ]

        return (
            <View>
                <StackedAreaChart
                    style={{ height: 200, paddingVertical: 16 }}
                    data={data}
                    keys={keys}
                    colors={colors}
                    curve={shape.curveNatural}
                    showGrid={false}
                    svgs={svgs}
                />
                <Text style={{ color: this.state.displayColor, fontSize: 20+ this.state.textSize, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                    {this.state.displayText} </Text>
            </View>
        )
    }
}

export default StackedAreaExample;