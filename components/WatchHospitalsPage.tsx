import React from 'react';
import { FC, useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, FlatList, TouchableHighlight, BackHandler, TextInputComponent, ScrollView } from 'react-native';
import { UserHospital, UserIntern } from '../model/AuthModel';
import UserModel, { Post, UserUpdateHospital, UserUpdateIntern } from '../model/UserModel';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ListItem: FC<{ 
    name: String, 
    email:String,
    city:String ,
   password:String, userType:String,
   description: String,
 hospitalQuantity:String,
   phoneNumber:String,
   preference: Array<String>,
   onPreferenceChange: (index: number, name: string) => void,
   onRowSelected: (id: String, rating: number) => void }> =
    ({ name, city,email,description,phoneNumber,preference,hospitalQuantity, onRowSelected , onPreferenceChange,}) => {
        const onClick = () => {
            console.log('int he row: row was selected ' + email)
            console.log('int he row: avatrUrl ' + rating)
            console.log('Im the user ' + email)
            onRowSelected(email,rating)
        }
        const [rating, setRating] = useState<number>(0);
    
         const [nameU, setName] = useState<string>("");
      
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
    
        const getUserDetails = async ()=>{
            try{
                console.log("sender : "+ name)
                const user = await UserModel.getUserbyEmail(email)
                setName(user.name)
            }catch(err){
                console.log("fail getting user by ID " + err)
            }
        }

        useEffect(()=>{
            getUserDetails()
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
          {/* <View style={styles.listRow}></View> */}
          <View style={styles.cardItem}>

             < View style={{  alignItems: 'center' }}>
                    <View style={styles.listRowTextContainer}>
                        <IconValu label='Name' value={name} />
                        <IconValu label='Email' value={email} />
                        <IconValu label='Hospital Quantity' value={hospitalQuantity} />
                        <IconValu label='phoneNumber' value={phoneNumber} />
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
                        onEndEditing={(event) => {
                          const text = event.nativeEvent.text;
                          if (isNaN(text)) {
                            Alert.alert('Please enter a valid number');
                            console.log("Input is not a number");
                          } else {
                            updatePreference(name.toString(), Number(text));
                          }
                        }}
                      />
                        </View>
                    </View>
                </View>
                </View>
            </TouchableHighlight>
        )
    }


const WatchHospitalsPage: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {



    const [avatarUri, setAvatrUri] = useState("https://cdn3.vectorstock.com/i/1000x1000/78/32/male-doctor-with-stethoscope-avatar-vector-31657832.jpg")
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const[idIntern,setIDIntern]=useState<string>("");
    const[institution,setInstitution]=useState<string>("");
    const[specialization,setSpecialization]=useState<string>("")
    const[phoneNumber,setPhoneNuber]=useState<string>("")
    const[GPA,setGPA]=useState<string>("")
    const[city,setCity]=useState<string>("")
    const[partnerID,setPartnerID]=useState<string>("")
    const[userType,setUserType]=useState<string>("")
    const [hospitalQuantity,setHospitalQuantity]= useState<string>("");
    const [preferenceArray, setPreferenceArray] = useState<string[]>([]);
    const [description, setDescription] = useState<string>(
        ""
      );
  
    const loadUser = async ()=>{

        //Thats way i know how is log in
        const id = await AsyncStorage.getItem('id')
        const res = await UserModel.getUserById(id)
        setName(res[0])
        setCity(res[1])
        setEmail(res[2])
        setDescription(res[3])
        setGPA(res[4])
        setPhoneNuber(res[5])
        setAvatrUri(res[6])
        setInstitution(res[7])
        setIDIntern(res[11])
        setPartnerID(res[9])
        setSpecialization(res[10])
        setPreferenceArray(res[12])
        setUserType(res[13])
        
        console.log('USerLogIN')
        console.log(id)
        console.log(res[12])
        console.log(preferenceArray)

      }


      const handlerSaveBT=async()=>{
        const filteredArray = preference.filter((value) => {
          return value !== undefined && value !== 'none';
        });
        console.log(filteredArray)
          setPreferenceArray(filteredArray)
          console.log('HANDLE SAVE '+ preferenceArray)
          console.log('HANDLE SAVE '+ preference)
         try{ await handleSaveToMongoo(filteredArray)
          navigation.navigate('PreferenceListPage', { preferenceArray: filteredArray,userType:'Intern' });
         }catch(err){
          console.log('Error Save to Mongo '+ err)
         }
        }

  const handleSaveToMongoo = async (prefArray: string[]) => {
    const id_ = await AsyncStorage.getItem('id')
    const up : UserUpdateIntern = {
      id: id_,
          idIntern:idIntern,
          educationalInstitution:institution,
          partnerID:partnerID,
          typeOfInternship:specialization,
          description:description,
          GPA:GPA,
          city:city,
          name: name,
          phoneNumber:phoneNumber,
          email:email,
          avatarUrl: avatarUri,
          userType:userType
          ,preferenceArray:[...prefArray]
    }
    console.log(up)
    try{
      const res = await UserModel.upadteUserIntern(up)
      console.log("update user success")
    } catch(err){
      console.log("update user failed " + err)
    }
  };

    const onRowSelected = (email: String) => {
      
        console.log("in the list: row was selected " + email)
        
    }
    const [preference, setPreference] = useState<string[]>([]);
    const [users, setUsers] = useState<Array<UserHospital>>();
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
            let useres: UserHospital[] = []
            try {
                console.log('getAllHospitals')
              useres = await UserModel.getAllHospitalsUsers()
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
            keyExtractor={userHospital => userHospital.name.toString()}
            renderItem={({ item }) => (
                <ListItem   preference={preference}  city={item.city} description={item.description}  
                 name={item.name} hospitalQuantity={item.hospitalQuantity} 
                email={item.email} onPreferenceChange={onPreferenceChange}
                 onRowSelected={onRowSelected} 
                 password={item.password} userType={item.userType}  
                  phoneNumber={item.phoneNumber} />
            )}
        >
        </FlatList>
    </View>
  
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
        borderColor:"mediumturquoise",
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
            bottom: 0,
            alignSelf: 'center',
            justifyContent: 'space-around',
            marginHorizontal: 20,
          },
            button: {
                backgroundColor: 'lightcyan',
                borderRadius: 10,
                padding: 8,
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
        marginBottom:10,
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

export default WatchHospitalsPage