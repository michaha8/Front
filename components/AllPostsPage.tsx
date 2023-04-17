import React from 'react';
import { FC, useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, FlatList, TouchableHighlight, BackHandler, TextInputComponent } from 'react-native';
import { UserIntern } from '../model/AuthModel';
import UserModel, { Post } from '../model/UserModel';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ListItem: FC<{ idIntern: String,
    name: String, 
    avatarUrl: String,email:String,
    city:String ,
    educationalInstitution: String,
   typeOfInternship: String,
   GPA: String,
   password:String, institution:String, specialization:String, userType:String,
   description: String,
   partnerID: String,
   phoneNumber:String,
   preference: Array<String>,
   onPreferenceChange: (index: number, name: string) => void,
   onRowSelected: (id: String, rating: number) => void }> =
    ({ name, city, avatarUrl,educationalInstitution,typeOfInternship,email,GPA,description,partnerID,idIntern,phoneNumber,preference, onRowSelected , onPreferenceChange,}) => {
        const onClick = () => {
            console.log('int he row: row was selected ' + email)
            console.log('int he row: avatrUrl ' + avatarUrl)
            console.log('int he row: avatrUrl ' + rating)
            console.log('Im the user ' + email)
            onRowSelected(email,rating)
        }
        const [rating, setRating] = useState<number>(0);
        const [userPic, setPic] = useState<String>("");
        const [emailU, setEmail] = useState<string>("");
        const [password, setPassword] = useState<string>("");
         const [nameU, setName] = useState<string>("");
        const[idInternU,setIDIntern]=useState<string>("");
        const[institution,setInstitution]=useState<string>("");
         const[specialization,setSpecialization]=useState<string>("")
        const[phoneNumberU,setPhoneNuber]=useState<string>("")
         const[GPAU,setGPA]=useState<string>("")
         const[cityU,setCity]=useState<string>("")
         const[partnerIDU,setPartnerID]=useState<string>("")
        const[descriptionU,setDescription]=useState<string>(``)
        const updatePreference = (name: string, rating: number) => {
            onPreferenceChange(rating,name)
        };
    
        const getUserDetails = async ()=>{
            try{
                console.log("sender : "+ name)
                const user = await UserModel.getUserbyEmail(email)
                console.log("getting user by ID " +JSON.stringify(user))
                setName(user.name)
            }catch(err){
                console.log("fail getting user by ID " + err)
            }
        }

        useEffect(()=>{
            getUserDetails()
            console.log("its me "+ name)
        })
      

        return (
            <TouchableHighlight onPress={onClick} underlayColor={'gainsboro'}>
                {/* <Text style={styles.iconLabel}>Choose preferens from must wanted 1 </Text> */}
                {/* <View style={styles.listRow}></View> */}
                <View style={styles.cardItem}>
                    {avatarUrl == "" && <Image style={styles.listRowImage} source={require('../assets/avatar-icon-images-4.jpg')} />}
                    {avatarUrl != "" && <Image style={styles.listRowImage} source={{ uri: avatarUrl.toString() }} />}

                    <View style={styles.listRowTextContainer}>
                        <Text style={styles.iconLabel}>{name}</Text>
                        <Text style={styles.iconLabel}>Email-{email}</Text>
                        <View style={styles.listRowTextContainer}>
                        {/* <Image style={styles.profilePicture} source={{ uri: userPic }}/> */}
                        <Text style={styles.iconLabel}>ID-{idIntern}</Text> 
                        <Text style={styles.iconLabel}>GPA-{GPA}</Text> 
                        <Text style={styles.iconLabel}>Description-{description}</Text> 
                        <Text style={styles.iconLabel}>Phone Number-{phoneNumber}</Text> 
                       
                        <TextInput
          style={styles.iconLabel}
          placeholder="Enter rating"
          keyboardType="numeric"
          onChangeText={(text) => {  
            updatePreference(name.toString(), Number(text)); 
          }}
        />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }


const AllPostsPage: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const loadUser = async ()=>{
        //Thats way i know how is log in
        const id = await AsyncStorage.getItem('id')
        const res = await UserModel.getUserById(id)
        
        console.log('USerLogIN')
        console.log(id)
        console.log(res)

      }
   
   
   
    const onRowSelected = (sender: String) => {
        console.log("in the list: row was selected " + sender)
        console.log("preference")
        console.log("preference")
        console.log("preference")
        console.log("preference")
        loadUser()
        console.log(preference)
    }
    const [preference, setPreference] = useState<Array<String>>([]);
    const [users, setUsers] = useState<Array<UserIntern>>();
    const onPreferenceChange = (index: number, name: string) => {
        console.log('Index '+ index +' Name '+name)
             setPreference(preference => {
            const c = preference.findIndex(p => p === name);
            const newPreference = [...preference];
            if (index === -1) {
                newPreference[index - 1] = name;
            } else {
                newPreference[c] = 'none';
                newPreference[index - 1] = name;
            }
            console.log('newPreferenceNow')
            console.log(newPreference)
            return newPreference;
        });
    };
    const showAlert=()=>{
        Alert.alert(
            'Choose preferens from must wanted 1')
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log('focus')
            Alert.alert(
                'Choose preferences for all users',
                '',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            let useres: UserIntern[] = []
            try {
                console.log('getAllInternsUsers')
              useres = await UserModel.getAllInternsUsers()
                console.log("fetching Users complete")
            } catch (err) {
                console.log("fail fetching Users " + err)
            }
            console.log("fetching finish")
            setUsers(useres)
        })
        return unsubscribe
    }, [])

const handelr= async()=>{
    console.log("presssssssss")
   const x=await  UserModel.getAllInternsUsers()
   console.log(x)
}
    return (
        <>
         <View style={styles.card}>
        <FlatList style={styles.flatlist}
            data={users}
            keyExtractor={userIntern => userIntern.name.toString()}
            renderItem={({ item }) => (
                <ListItem   preference={preference} GPA={item.GPA} city={item.city} description={item.description} institution={item.institution} specialization={item.specialization} name={item.name} idIntern={item.idIntern} email={item.email} avatarUrl={item.avatarUrl} onPreferenceChange={onPreferenceChange} onRowSelected={onRowSelected} educationalInstitution={item.institution} typeOfInternship={item.specialization} password={item.password} userType={item.userType} partnerID={item.partnerID} phoneNumber={item.phoneNumber} />
            )}
        >
        </FlatList>
    </View>
    
        </>
     
    );
};


const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: 'white',
    },
    flatlist: {
        flex: 1,
    },
    listRow: {
        margin: 4,
        flexDirection: "row",
        height: 150,
        elevation: 4,
        borderRadius: 40,
    },
    userDetailsRow: {
        flexDirection: "row",
        height: 40,
        alignItems:'flex-start'
        ,alignSelf:'center'
    },
    listRowImage: {
        margin: 10,
        resizeMode: "contain",
        height: 130,
        width: 130,
    },
    listRowTextContainer: {
        flex: 1,
        margin: 20,
        justifyContent: "space-around"
    },
    listRowName: {
        fontSize: 30
    },
    listRowId: {
        fontSize: 25
    },
    profilePicture: {
        width: 35,
        height: 35,
        borderRadius: 75,
        marginEnd: 20
      },
      card: {
        backgroundColor: 'whitesmoke',
        borderRadius: 10,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      cardItem: {
        backgroundColor: 'whitesmoke',
        borderRadius: 70,
      borderColor:"lightcyan",
      borderWidth:2,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 40,
      },
      iconContainer: {
        alignItems: 'center',
      },
      icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
      },
      iconLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});

export default AllPostsPage