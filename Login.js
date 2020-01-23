import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';
//import Button from './Button';
import base64 from 'base-64';
//import base64 from 'react-native-base64';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import {AsyncStorage} from 'react-native';

export default class Login extends React.Component {
    // static navigationOptions = {
    //     title: 'Welcome to the app!',
    //   };
    constructor(props) {
        super(props);
        this.state = {
        userText: "",
        passText: "",
        titleText: "Log In",
        buttonText: "Sign Up",
        profile: {},
        shouldSignUp: false,
        shouldLogin: false,
        token: ""
        }
        
    }
    
    static navigationOptions = {
        headerShown: false
    };

    async makeUser() {
   
         if(this.state.titleText === "Sign Up")
         { 
            console.log(this.state.userText);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        //  myHeaders.append("token", "NODEJSAPP");
        //   myHeaders.append("x-access-token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InNhbXVzZXIxIiwiZXhwIjoxNTczMDgxMzIyfQ.ONvQMwPOmEW6ORCotdRALjcVaBPkPiIRaXTLb8eOpIY");
            
        // var raw = "{\n    \"username\": \"samuser1\",\n    \"password\": \"password\"\n}";
            var raw = JSON.stringify({username: this.state.userText, password: this.state.passText});

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            
            
            let response = await fetch('https://mysqlcs639.cs.wisc.edu/users', requestOptions);
            let result = await response.json();

            console.log(result);
            this.setState({shouldSignUp:false}); 
            this.createToken();
            alert(result.message);
          }
          else{
              this.createToken();
          }

    
      //  this.setState({isLoggedIn: true});
    }

    async createToken() {
        //get token
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log(this.state.userText);
        console.log(this.state.passText);

        myHeaders.append("Authorization", 'Basic ' + base64.encode(this.state.userText + ":" + this.state.passText));
      //myHeaders.append("Authorization", "Basic c2FtdXNlcjExOlBhc3N3b3Jk");
      //  var raw = "{\n    \"username\": \"samuser11\",\n    \"password\": \"Password\"\n}";
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
       //   body: raw,
          redirect: 'follow'
        };

        let response = await fetch('https://mysqlcs639.cs.wisc.edu/login', requestOptions);
        let result = await response.json();

        // console.log("token:")
       //  console.log(result);
       //  console.log(result.token);

        this.setState({token: result.token});
         this.makeProfile(result.token);
    }

    
    async makeProfile(token) {

        console.log("inmake");

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-access-token", token);
        //  myHeaders.append("Authorization", "Basic c2FtdXNlcjI6UGFzc3dvcmQ=");

        //  var raw = "{\n    \"username\": \"samuser2\",\n    \"password\": \"Password\"\n}";

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };


        let response = await fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.state.userText, requestOptions);
        let result = await response.json();

        this.state.profile = result;
        if(result.message === "Token is invalid!" )
        {
            this.setState({shouldLogin: false}); 
          alert("Oops! Looks like that username/password was incorrect");
        }
        else if(result.username === this.state.userText)
        {
         //   console.log("shouldbesetting")
            this.setState({shouldLogin: true}); 
           
            //this.props.onLoginPress();
            //replace with:
            this._signInAsync();

            // console.log(this.state.userText);
            // await AsyncStorage.setItem('username1', this.state.userText);
            // await AsyncStorage.setItem('token1', this.state.token);
            // console.log(this.state.passText)
            // await AsyncStorage.setItem('password1', this.state.passText);

          //  this.props.onUserName(this.state.userText, this.state.token, this.state.passText);

          // SETTING BASIC ASYNCS
            await AsyncStorage.setItem('username1', this.state.userText);
            await AsyncStorage.setItem('token1', this.state.token);
            await AsyncStorage.setItem('password1', this.state.passText);
        //    console.log(this.state.shouldLogin);
           // console.log(this.state.token);

           let fN = result.firstName;
           let lN = result.lastName;
           let gdA = result.goalDailyActivity;
            let gCals = result.goalDailyCalories;
            let gCarbs= result.goalDailyCarbohydrates;
            let gFat = result.goalDailyFat;
            let gProteins = result.goalDailyProtein;


            if(result.firstName != null)
            {
           await AsyncStorage.setItem('firstName1', fN.toString());
            }
            if(result.lastName != null)
            {
           await AsyncStorage.setItem('lastName1', lN.toString());
            }

           await AsyncStorage.setItem('gdActivity1', gdA.toString());
           let gdActivity1 = await AsyncStorage.getItem('gdActivity1');
           console.log("activity login:");
           console.log(gdActivity1);
           await AsyncStorage.setItem('gdCals1', gCals.toString());
           await AsyncStorage.setItem('gdCarbs1', gCarbs.toString());
           await AsyncStorage.setItem('gdFat1', gFat.toString());
           await AsyncStorage.setItem('gdProtein1', gProteins.toString());
        }
    
        // console.log(this.state.profile);
        // console.log(this.state.profile.firstName);
        // console.log(this.state.profile.goalDailyActivity);


        //console.log(this.state.shouldLogin);
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('username1', this.state.userText);
        await AsyncStorage.setItem('token1', this.state.token);
        await AsyncStorage.setItem('password1', this.state.passText);
        this.props.navigation.navigate('App');
      };

    submitFunc = async() =>
    {
        this.makeUser();
        
      //  console.log(this.state.shouldSignUp);
        
        if(this.state.shouldLogin === true)
        {
            console.log("decision making");
           // this.props.onLoginPress();
        }
        else if(this.state.shouldLogin === false)
        {
           // this.props.onLoginPress(false);
        }
        
    }

    signUpLogic =() =>
    {
       // this.makeUser();
    //   console.log(this.state.titleText);
       if(this.state.titleText === "Log In")
       {
        this.setState({titleText: "Sign Up", buttonText: "Log In"});
       }
       else if(this.state.titleText === "Sign Up")
       {
        this.setState({titleText: "Log In", buttonText: "Sign Up"});
       }
       
       // this.props.onSignUpPress();
    }

    

    render() {
        return (
            
            <View style={{flex: 1, backgroundColor: 'skyblue' }}>
                <Text
                    style={{ color: 'lightgreen', fontSize: 65, textAlignVertical: "top", textAlign: "center", fontWeight: 'bold', fontStyle: 'italic',
                    textShadowRadius: 8, textShadowColor: "purple", textShadowOffset:{width: 6, height: 1},  marginBottom: 55, marginTop: 85 }} adjustsFontSizeToFit={true}>
                    Fitness Tracker
                </Text>
                <Text 
                    style={{fontSize: 50, textAlignVertical: "center",textAlign: "center"}} adjustsFontSizeToFit={true}>
                     {this.state.titleText}
                </Text>
                <TextInput style={{fontSize: 27, textAlignVertical: "center",textAlign: "center"}} placeholder="username" 
                   onChangeText={(userText) => this.setState({userText})} value={this.state.userText}/>
                <TextInput style={{fontSize: 27, textAlignVertical: "center",textAlign: "center"}} placeholder="password" 
                    onChangeText={(passText) => this.setState({passText})} value={this.state.passText}/>
                <View style={{alignItems: 'center', justifyContent: 'center'}} />
                <Button style={{fontSize: 50}}
                          onPress= {this.submitFunc}
                          title="Submit"
                      />
                <Text
                    style={{ fontSize: 20, textAlignVertical: "center", textAlign: "center", marginTop: 55}} adjustsFontSizeToFit={true}>
                    Switch View To:
                </Text>
                 <Button style={{fontSize: 50, padding: 100}}
                          onPress= {this.signUpLogic}
                          title={this.state.buttonText}
                      />
                </View>
            )
    }
}
