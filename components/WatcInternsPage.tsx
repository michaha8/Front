import React from 'react';
import { FC, useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, FlatList, TouchableHighlight, BackHandler, TextInputComponent, ScrollView } from 'react-native';
import { UserIntern } from '../model/AuthModel';
import UserModel, { UserUpdateHospital} from '../model/UserModel';

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
        const [showFullDescription, setShowFullDescription] = useState(false)
        const updatePreference = (name: string, rating: number) => {
            onPreferenceChange(rating,name)
        };
        const toggleShowFullDescription = () => {
            setShowFullDescription(!showFullDescription);
        };
    
        // const getUserDetails = async ()=>{
        //     try{
        //         console.log("sender : "+ name)
        //         const user = await UserModel.getUserbyEmail(email)
        //         console.log("getting user by ID " +JSON.stringify(user))
        //     }catch(err){
        //         console.log("fail getting user by ID " + err)
        //     }
        // }

        useEffect(()=>{
            // getUserDetails()
            console.log("its me "+ name)
        })
        interface ValueProps {
            label: string;
            value: String;
          }
        const IconValu: FC<ValueProps> = ({ label, value }) => {
            return (
                
              <View style={styles.container}>
                <Text style={styles.iconLabel}>{label}</Text>
                <View style={styles.iconValue}>
                  <Text style={styles.value}>{value}</Text>
                </View>
              </View>
            );
          };
        return (
            <TouchableHighlight onPress={onClick} underlayColor={'gainsboro'}>
                {/* <Text style={styles.iconLabel}>Choose preferens from must wanted 1 </Text> */}
               
                <View style={styles.cardItem}>
                    {avatarUrl == "" && <Image style={styles.listRowImage} source={require('../assets/avatar-icon-images-4.jpg')} />}
                    {avatarUrl != "" && <Image style={styles.listRowImage} source={{ uri: avatarUrl.toString() }} />}
                   < View style={{  alignItems: 'center' }}>
                    <View style={styles.listRowTextContainer}>
                        <IconValu label='Name' value={name} />
                        <IconValu label='Email' value={email} />
                        <IconValu label='ID' value={idIntern} />
                        <IconValu label='phoneNumber' value={phoneNumber} />
                        <IconValu label='GPA' value={GPA} />
                        <View style={styles.listRowTextContainer}>
                        <Text style={styles.iconLabel}>
                           Description 
                        </Text> 
                        <Text style={styles.value}>
                           {showFullDescription ? description : `${description.substring(15, description.indexOf('\n\n'))}`}
                        </Text> 
                        {description.length > 40 && (
                            <TouchableOpacity onPress={toggleShowFullDescription}>
                                <Text style={{ color: 'blue' }}>{showFullDescription ? 'Read Less' : 'Read More'}</Text>
                            </TouchableOpacity>
                        )}
                       
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
                </View>
            </TouchableHighlight>
        )
    }


const WatchInternsPage: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {

   
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const[phoneNumber,setPhoneNumber]=useState<string>("")
    const [hospitalQuantity,setHospitalQuantity]= useState<string>("");
    const[city,setCity]=useState<string>("")
    const[description,setDescription]=useState<string>(``)
    const [preferenceArray, setPreferenceArray] = useState<string[]>([]);
  
    const loadUser = async ()=>{

        //Thats way i know how is log in
        const id = await AsyncStorage.getItem('id')
        const res = await UserModel.getUserById(id)
        setName(res[0])
        setCity(res[1])
        setEmail(res[2])
        setDescription(res[3])
        setHospitalQuantity(res[4])
        setPhoneNumber(res[5])
        setPreferenceArray(res[6])
        
        
        console.log('USerLogIN')
        console.log(id)
        console.log(res[12])
        console.log(preferenceArray)

      }



     const handlerSaveBT=async()=>{
        setPreferenceArray(preference)
        console.log('HANDLE SAVE '+ preferenceArray)
        console.log('HANDLE SAVE '+ preference)
       try{ await handleSaveToMongoo(preference)
       }catch(err){
        console.log('Error Save to Mongo '+ err)
       }
      }

      const handleSaveToMongoo = async (prefArray: string[]) => {
        const id_ = await AsyncStorage.getItem('id')
        const up : UserUpdateHospital = {
          id: id_,
              hospitalQuantity:hospitalQuantity,
              description:description,
              city:city,
              name: name,
              phoneNumber:phoneNumber,
              email:email,
              preferenceArray:[...prefArray]
        }
        console.log(up)
        try{
          const res = await UserModel.upadteUserHospital(up)
          console.log("update user success")
        } catch(err){
          console.log("update user failed " + err)
        }
      };


    const onRowSelected = (email: String) => {
      
        console.log("in the list: row was selected " + email)
        
    }
    const [preference, setPreference] = useState<string[]>([]);
    const [users, setUsers] = useState<Array<UserIntern>>();
    const onPreferenceChange = (index: number, name: string) => {
    
        console.log('Index '+ index +' Name '+name)
        console.log('preferenceAfterChane '+preference)
             setPreference(preference => {
            const c = preference.findIndex(p => p === name);
            console.log('c '+c)
            const newPreference = [...preference];
            console.log('newPreference '+newPreference)
            if (index === -1) {
                newPreference[index - 1] = name;
            } else {
                newPreference[c] = 'none';
                newPreference[index - 1] = name;
            }
            console.log('newPreferenceNow')
            console.log(newPreference)
            // setPreference(newPreference)
            console.log('preferenceAfterChane '+preference)
            console.log(preference)
            return newPreference;
        });
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log('focus')
            loadUser()
            Alert.alert(
                'Choose preferences for all users',
                'From 1-The Must Wanted!',
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

    return (
        <>
        <ScrollView>
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
  <View style={{flex:1,padding:10}}></View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlerSaveBT}>
            <Text style={styles.buttonText}>
                Save Preference
            </Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
        </>
     
    );
};


const styles = StyleSheet.create({
    color:{
        borderColor:"lightcyan",
    },

    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection:'column',
        alignItems:'center',
        backgroundColor: "aliceblue",
    },
    flatlist: {
        flex: 1,
        
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        },
        buttonContainer: {
            position: 'absolute',
            bottom:9,
            paddingBottom:0,
            alignSelf: 'center',
            justifyContent: 'space-around',
            marginHorizontal: 20,
          },
            button: {
                backgroundColor: 'lightcyan',
                borderRadius: 10,
                padding: 7,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
        borderWidth:2,
        borderColor:'gainsboro',
        marginBottom: 10,
        alignSelf:'center',
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
        flexDirection:'column',
        margin: 3,
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
        backgroundColor: 'aliceblue',
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
        backgroundColor: 'aliceblue',
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
        marginVertical: 3, // add margin between each card
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
        fontSize: 15,
        marginBottom:2,
        fontWeight: 'bold',
        color:'mediumturquoise',
        textAlign: 'center',
      },
      iconValue: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
     
        
      },value: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'grey',
        marginRight: 8,
        alignSelf:'center'
      },
});

export default WatchInternsPage