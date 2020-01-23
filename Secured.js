import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button,
    TextInput
} from 'react-native';
//import Button from './Button';
import {AsyncStorage} from 'react-native';
import { createStackNavigator, createSwitchNavigator, 
    createAppContainer, TabBarBottom } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';


class Secured extends Component {
    static navigationOptions = {
        title: 'Profile'
      };
    constructor(props) {
        super(props);
        this.handleLogic = this.handleLogic.bind(this);
        this.state = {
        firstName: "First Name",
        lastName: "Last Name",
        activity: "Daily Activity Goal",
        calories: "Daily Calorie Goal" ,
        carbs: "Daily Carbohydrates Goal",
        fat: "Daily Fat Goal",
        protein: "Daily Protein Goal",
        username: "",
        token: this.props.token,
        color: "green",
        disText: "LARGE TEXT",
        textSize: 0
        }
        
    }

    async tryToken() {
        //get token
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log(this.state.userText);
        console.log(this.state.passText);

        let user1 = await AsyncStorage.getItem('username1');
        let pass1 =  await AsyncStorage.getItem('password1');
        myHeaders.append("Authorization", 'Basic ' + base64.encode(user1 + ":" + pass1));
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

        if(result.token != null)
        {
            this.setState({token: result.token});
            await AsyncStorage.setItem('token1', result.token);
        }

    }

    async editUser() {
   
        let user1 = await AsyncStorage.getItem('username1');
        let tok1 =  await AsyncStorage.getItem('token1');
        this.setState({username : this.props.username});
        this.setState({token : this.props.token});
        
         console.log("TOken")
         console.log(tok1);
         console.log(this.state.username);
        console.log(user1);


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", tok1);
   

    //myHeaders.append("Authorization", "Basic U2FtdXNlcjAxOlBhc3N3b3Jk");
    
   // var raw = "{\n    \"admin\": false,\n    \"firstName\": null,\n    \"goalDailyActivity\": 5,\n    \"goalDailyCalories\": 10,\n    \"goalDailyCarbohydrates\": 5,\n    \"goalDailyFat\": 5,\n    \"goalDailyProtein\": 5,\n    \"lastName\": null,\n    \"username\": \"Samuser02\"\n}";
   var raw = JSON.stringify({admin: false, 
                                firstName: this.state.firstName,
                                goalDailyActivity: this.state.activity,
                                goalDailyCalories: this.state.calories,
                                goalDailyCarbohydrates: this.state.carbs,
                                goalDailyFat: this.state.fat,
                                goalDailyProtein: this.state.protein,
                                lastName: this.state.lastName,
                                username: user1});

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let response = await fetch('https://mysqlcs639.cs.wisc.edu/users/' + user1, requestOptions);
    let result = await response.json();
    
    // fetch('https://mysqlcs639.cs.wisc.edu/users/Samuser02', requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

      console.log("resultmessg");
      console.log(result.message);

      if(result.message === "Token is missing!")
      {
          this.editUser();
      }
      else if(result.message === "User has been updated!") 
      {
          console.log("state name");
          console.log(this.state.firstName);
          let fN = this.state.firstName;
          let lN = this.state.lastName;
          let gdA = this.state.activity;
          let gCals = this.state.calories;
          let gCarbs = this.state.carbs;
          let gFat = this.state.fat;
          let gProteins = this.state.protein;


            if (fN != null) {
                await AsyncStorage.setItem('firstName1', fN.toString());
            }
            if (lN != null) {
                await AsyncStorage.setItem('lastName1', lN.toString());
            }
           await AsyncStorage.setItem('gdActivity1', gdA.toString());
           let gdActivity1 = await AsyncStorage.getItem('gdActivity1');
           console.log("activity secured:");
           console.log(gdActivity1);
           await AsyncStorage.setItem('gdCals1', gCals.toString());
           await AsyncStorage.setItem('gdCarbs1', gCarbs.toString());
           await AsyncStorage.setItem('gdFat1', gFat.toString());
           await AsyncStorage.setItem('gdProtein1', gProteins.toString());
            alert(result.message);
      }
      else if(result.message === "Token is invalid!") 
      {
        this.tryToken();
        this.editUser();
      }
      else
      {
          console.log(result.message);
          alert("Something went wrong! Double check that number values are numbers!");
      }
      
   
   }

    async deleteUser() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("token", "NODEJSAPP");

        let token = await AsyncStorage.getItem('token1');
        let username = await AsyncStorage.getItem('username1');

        myHeaders.append("x-access-token", token);


        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            //body: raw,
            redirect: 'follow'
        };


        let response = await fetch('https://mysqlcs639.cs.wisc.edu/users/' + username, requestOptions);
        let result = await response.json();

        console.log(result);

        alert(result.message);
        this.signOutAsync();
    }


    
   signOutAsync = async () => {
    //this.setState({isLoggedIn: false})
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
    }

    submitFunc = async () =>
    {
        // console.log("user:")
        // console.log(user1);
       // console.log(this.state.username);
       this.editUser();
        
    }

    deleteFunc = async () =>
    {
       this.deleteUser();
    }

    async setPlaceholders()
    {
        let firstName1 = await AsyncStorage.getItem('firstName1');
        let lastName1 = await AsyncStorage.getItem('lastName1');
        let gdActivity1 = await AsyncStorage.getItem('gdActivity1');
        let gdCals1 = await AsyncStorage.getItem('gdCals1');
        let gdCarbs1 = await AsyncStorage.getItem('gdCarbs1');
        let gdFat1 = await AsyncStorage.getItem('gdFat1');
        let gdProtein1 = await AsyncStorage.getItem('gdProtein1');

        console.log("firstName1");
        console.log(firstName1);

        if(firstName1 != null)
        {
            this.setState({firstName : firstName1});
        }
        if(lastName1 != null)
        {
            this.setState({lastName : lastName1});
        }
        this.setState({activity: gdActivity1, calories : gdCals1, carbs : gdCarbs1, fat: gdFat1, protein:gdProtein1});
    }


    componentDidMount() {
        //this.setPlaceholders();
        this.setPlaceholders();
        this.setDis();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.setPlaceholders();
        this.setDis();
        });
    }
        

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    handleLogic = async () =>{
        //console.log(this.state.color);
        console.log("LOGIC should change");
        console.log("Before click" + this.state.disText);
        if(this.state.disText === 'Normal Sized Text')
        {
         //   this.setState({ color: 'danger' });
            this.setState({disText: "LARGE TEXT", color: 'green' });
            await AsyncStorage.setItem('disability', "normal");
            this.setDis();
        }
        else if(this.state.disText === 'LARGE TEXT')
        {
        //    this.setState({ color: 'primary'});
            this.setState({disText: 'Normal Sized Text', color: 'purple' });
            await AsyncStorage.setItem('disability', "large");
            this.setDis();
        }
        //opposite logic of what is showing is actually taking place
        // so if OR is showing, AND is currently taking place
        console.log("After click" + this.state.disText);
       // this.changeLogic();
      
    }

    async setDis()
    {
        let dis = await AsyncStorage.getItem('disability');
        if (dis === "large")
        {
            this.setState({textSize: 5});
        }
        else if (dis === "normal")
        {
            this.setState({textSize: 0});
        }
        console.log(dis);
    }

    render() {
        return (
            <ScrollView eventKey="sec" title="Sec">
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>

                    <View style={{ flexDirection: 'row', paddingBottom: 5, alignItems: 'left' }}>
                        <Text style={{ fontSize: 30 + this.state.textSize, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                            First Name: </Text>
                        <TextInput style={{ color: "grey", fontSize: 27+ this.state.textSize, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.firstName}
                            onChangeText={(firstName) => this.setState({ firstName })} value={this.state.firstName} />
                    </View>

                    <View style={{ flexDirection: 'row', paddingBottom: 5, alignItems: 'left' }}>
                        <Text style={{ fontSize: 30+ this.state.textSize, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                            Last Name: </Text>
                        <TextInput style={{ color: "grey", fontSize: 27+ this.state.textSize, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.lastName}
                            onChangeText={(lastName) => this.setState({ lastName })} value={this.state.lastName} />
                    </View>

                    <View style={{ flexDirection: 'row', paddingBottom: 5, alignItems: 'left' }}>
                        <Text style={{ fontSize: 30+ this.state.textSize, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                            Daily Activity Goal (Mins): </Text>
                        <TextInput style={{ color: "grey", fontSize: 27+ this.state.textSize, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.activity}
                            onChangeText={(activity) => this.setState({ activity })} value={this.state.activity} />
                    </View>

                    <View style={{ flexDirection: 'row', paddingBottom: 5, alignItems: 'left' }}>
                        <Text style={{ fontSize: 30+ this.state.textSize, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                            Daily Calorie Goal: </Text>
                        <TextInput style={{ color: "grey", fontSize: 27+ this.state.textSize, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.calories}
                            onChangeText={(calories) => this.setState({ calories })} value={this.state.calories} />
                    </View>

                    <View style={{ flexDirection: 'row', paddingBottom: 5, alignItems: 'left' }}>
                        <Text style={{ fontSize: 30+ this.state.textSize, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                            Daily Carbs Goal: </Text>
                        <TextInput style={{ color: "grey", fontSize: 27+ this.state.textSize, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.carbs}
                            onChangeText={(carbs) => this.setState({ carbs })} value={this.state.carbs} />
                    </View>

                    <View style={{ flexDirection: 'row', paddingBottom: 5, alignItems: 'left' }}>
                        <Text style={{ fontSize: 30+ this.state.textSize, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                            Daily Fat Goal: </Text>
                        <TextInput style={{ color: "grey", fontSize: 27+ this.state.textSize, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.fat}
                            onChangeText={(fat) => this.setState({ fat })} value={this.state.fat} />
                    </View>

                    <View style={{ flexDirection: 'row', paddingBottom: 10, alignItems: 'left' }}>
                        <Text style={{ fontSize: 30+ this.state.textSize, textAlignVertical: "center", textAlign: "center" }} adjustsFontSizeToFit={true}>
                            Daily Protein Goal: </Text>
                        <TextInput style={{ color: "grey", fontSize: 27+ this.state.textSize, textAlignVertical: "center", textAlign: "center" }} placeholder={this.state.protein}
                            onChangeText={(protein) => this.setState({ protein })} value={this.state.protein} />
                    </View>
               
                    <Button style={{ fontSize: 50 }}
                        onPress={this.submitFunc}
                        title="Submit"
                    />

               
                <Text style={{paddingTop: 20, fontSize: 30+ this.state.textSize, textAlignVertical: "center", alignItems: 'left', textAlign: "left" }} adjustsFontSizeToFit={true}>
                            Disability Settings: </Text>

                    <Button color={this.state.color} 
                    onPress= {this.handleLogic} title={this.state.disText}></Button>

                    <View style={{ marginTop: 40}}/>
                    <Button color="red"
                        // onPress={this.props.onLogoutPress}
                        onPress={this.signOutAsync}

                        title="Logout"
                    />

                    <View  style={{ marginTop: 100}}>
                    <Button color="red" 
                        // onPress={this.props.onLogoutPress}
                        onPress={this.deleteFunc}

                        title="Delete Account"
                    />
                    </View>
                    
                </View>
                </ScrollView>

                )
    }
}

export default Secured;