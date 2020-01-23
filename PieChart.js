import React from 'react';
import {
  Text,
  View,
  Dimensions
} from 'react-native';
import { PieChart } from 'react-native-svg-charts'

 class PieChartWithDynamicSlices extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: this.props.keys,
        value: "",
        value2: ""
      },
      labelWidth: 0
    }
  }

  async getKey2()
  {
    let gdActivity1 = await AsyncStorage.getItem('gdActivity1');
    let gdCals1 = await AsyncStorage.getItem('gdCals1');
    let gdCarbs1 = await AsyncStorage.getItem('gdCarbs1');
    let gdFat1 = await AsyncStorage.getItem('gdFat1');
    let gdProtein1 = await AsyncStorage.getItem('gdProtein1');
  

   // return value2;
  }

     componentDidMount() {
        
         if (this.props.keys === "Activity") {
             this.setState({value2: "Activity Goal"});
         }
         else if (this.props.keys === "Calories") {
            this.setState({value2: "Calorie Goal"});
         }
         else if (this.props.keys === "Carbs") {
            this.setState({value2: "Carb Goal"});
         }
         else if (this.props.keys === "Fat") {
            this.setState({value2: "Fat Goal"});
         }
         else if (this.props.keys === "Protein") {
            this.setState({value2: "Protein Goal"});
         }
     }

  render() {
    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    // console.log(this.props.keys);

      
    // //value2 is the goal 
    // console.log(this.state.value2)
    // console.log(this.props.goal);
    // console.log("actual");
   // console.log(this.props.actual);
    var valueGoal = parseInt(this.props.goal, 10 );
    var valueActual = parseInt(this.props.actual, 10 );
   // console.log(valueActual);
    const keys = [this.props.keys + " Today", this.state.value2];
    //second value needs to be actual activity that has occured
    const values = [valueActual, valueGoal];
    const colors = ['#d966ff', '#600080', '#ecb3ff','#9900cc', '#c61aff']
    const data = keys.map((key, index) => {
        return {
          key,
          value: values[index],
          svg: { fill: colors[index] },
          arc: { outerRadius: (70 + values[index]) + '%', padAngle: label === key ? 0.1 : 0 },
          onPress: () => this.setState({ selectedSlice: { label: key, value: values[index] } })
        }
      })
    const deviceWidth = Dimensions.get('window').width

    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <PieChart
          style={{ height: 200 }}
          outerRadius={'80%'}
          innerRadius={'50%'}
          data={data}
        />
        <Text
          onLayout={({ nativeEvent: { layout: { width } } }) => {
            this.setState({ labelWidth: width });
          }}
          style={{
            //position: relativ,
         //   left: deviceWidth / 2 - labelWidth / 2,
    //         top: 0, left: 0, 
    // right: 0, bottom: 0, 
             justifyContent: 'center', 
             alignItems: 'center',
            textAlign: 'center',
          }}>
          {`${label} \n ${value}`}
        </Text>
       
      </View>
    )
  }
}

export default PieChartWithDynamicSlices;