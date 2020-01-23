import React from 'react';
import { View, StyleSheet } from 'react-native';
// import Modal from './Modal';
// import Button from './Button';
import Login from './Login'
import Secured from './Secured'
import AuthLoadingScreen from './AuthLoadingScreen'
import CurrentDay from './CurrentDay'
import Activities from './Activities'
import ActivitiesEditor from './ActivitiesEditor'
import AddActivity from './AddActivity'
import Meals from './Meals'
import AddMeal from './AddMeal'
import MealsEditor from './MealsEditor';
import AddFood from './AddFood';
import FoodsEditor from './FoodsEditor';







import { createBottomTabNavigator } from 'react-navigation-tabs';
import {AsyncStorage, Platform} from 'react-native';
import {createSwitchNavigator, 
  createAppContainer, TabBarBottom } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isLoggedIn: false,
      signingUp: false,
      username: "",
      token: "",
      password: ""
    }
  }

  // static navigationOptions = {
  //   title: 'Please sign in or sign up',
  // };

  // buttonCallback = (userText, tok, passText)=>{
  //   console.log(userText);
  //   this.setState({username: userText});
  //   this.setState({token: tok});
  //   this.setState({password: passText});
  //   console.log("HERE");
  //   console.log(this.state.username);
  //   console.log(this.state.token);
  // }

  _storeData = async () => {
    try {
      // await AsyncStorage.setItem('username1', this.state.username);
      // await AsyncStorage.setItem('token1', this.state.token);
      // if(this.state.password == null)
      // {
      //   console.log("in the tester");
      //   console.log(this.state.password);
      // }
      // await AsyncStorage.setItem('password1', this.state.password);
     // console.log(this.state.token);
      this.props.navigation.navigate('App');
    } catch (error) {
      // Error saving data
    }
  };

  

  //AsyncStorage.get(username)

  render() {
    // return (
     
    //   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //     <Button buttonStyle={{backgroundColor: '#aaaaaa', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10}} textStyle={{color: '#ffffff'}} text={'Show Modal'} onPress={() => this.showModal()}/>
    //     <Modal width={300} height={600} show={this.state.showModal} hide={() => this.hideModal()}/>
    //   </View>
    // );
    if (this.state.isLoggedIn) 
    {
      return <Secured 
          onLogoutPress={() => this.setState({isLoggedIn: false})}
          username = {this.state.username}
          token = {this.state.token}
        />;
    }
    else 
    {
      return <Login style={{backgroundColor: 'white'}}
          onLoginPress={() => this.setState({signingUp: false, isLoggedIn: true})}
          onSignUpPress={() => this.setState({signingUp: true, isLoggedIn: false})}
          // onUserName={this.buttonCallback}
          />;
    }
       
  }

  showModal() {
    this.setState({showModal: true});
  }

  hideModal() {
    this.setState({showModal: false});
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const publicConfig = 
{ default: "Signin"};

const actConfig = 
{ default: "Acts"};

const mealsConfig = 
{ default: "Meals"};

// const foodConfig = 
// { default: "AddFood"};

const profileConfig = 
{ default: "Profile"};

const dashConfig = 
{ default: "Profile"};

const appConfig = Platform.select({
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} fontSize= {27} size={50} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
});


const AuthStack = createStackNavigator({ SignIn: Login }, publicConfig);

const ProfileStack = createStackNavigator({Profile: Secured}, profileConfig);

const ActStack = createStackNavigator({Acts: Activities, ActEditor: ActivitiesEditor, ActAdder: AddActivity}, actConfig);

const MealsStack = createStackNavigator({Meals: Meals, MealEditor: MealsEditor, MealAdder: AddMeal, FoodAdder: AddFood, FoodEditor: FoodsEditor}, mealsConfig);

const DashStack = createStackNavigator({Dash: CurrentDay, Acts: Activities}, dashConfig);

const AppStack = createBottomTabNavigator({Home: DashStack, MyActivities: ActStack, MyMeals: MealsStack,
  Profile: ProfileStack}, appConfig)

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Act: ActStack,
    Meal: MealsStack,
    Prof: ProfileStack,
    Dash: DashStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
;
