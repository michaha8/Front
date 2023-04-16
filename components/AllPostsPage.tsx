import React from 'react';
import { FC, useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, FlatList, TouchableHighlight, BackHandler } from 'react-native';
import { UserIntern } from '../model/AuthModel';
import UserModel, { Post } from '../model/UserModel';


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
    phoneNumber:String, onRowSelected: (id: String) => void }> =
    ({ name, city, avatarUrl,educationalInstitution,typeOfInternship,email,GPA,description,partnerID,idIntern,phoneNumber, onRowSelected }) => {
        const onClick = () => {
            console.log('int he row: row was selected ' + email)
            console.log('int he row: avatrUrl ' + avatarUrl)
            onRowSelected(email)
        }

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

        const getUserDetails = async ()=>{
            try{
                console.log("sender : "+ name)
                const user = await UserModel.getUserbyEmail(email)
                console.log("getting user by ID " + user)
                setName(user[0])
                setPic(user[1])
            }catch(err){
                console.log("fail getting user by ID " + err)
            }
        }

        useEffect(()=>{
            getUserDetails()
        })

        return (
            <TouchableHighlight onPress={onClick} underlayColor={'gainsboro'}>
                <View style={styles.listRow}>
                    {avatarUrl == "" && <Image style={styles.listRowImage} source={require('../assets/avatar-icon-images-4.jpg')} />}
                    {avatarUrl != "" && <Image style={styles.listRowImage} source={{ uri: avatarUrl.toString() }} />}

                    <View style={styles.listRowTextContainer}>
                        <Text style={styles.iconLabel}>{name}</Text>
                        <Text style={styles.iconLabel}>Email-{email}</Text>
                        <View style={styles.userDetailsRow}>
                        <Image style={styles.profilePicture} source={{ uri: userPic }}/>
                        <Text style={styles.iconLabel}>{idIntern}</Text> 
                        <Text style={styles.iconLabel}>{GPA}</Text> 
                        <Text style={styles.iconLabel}>{description}</Text> 
                        <Text style={styles.iconLabel}>{partnerID}</Text> 
                        <Text style={styles.iconLabel}>{phoneNumber}</Text> 
                        <Text style={styles.iconLabel}>{email}</Text> 
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }


const AllPostsPage: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const onRowSelected = (sender: String) => {
        console.log("in the list: row was selected " + sender)
    }

    const [users, setUsers] = useState<Array<UserIntern>>();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log('focus')
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
    })

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
                <ListItem  GPA={item.GPA} city={item.city} description={item.description} institution={item.institution} specialization={item.specialization} name={item.name} idIntern={item.idIntern} email={item.email} avatarUrl={item.avatarUrl} onRowSelected={onRowSelected} educationalInstitution={item.institution} typeOfInternship={item.specialization} password={item.password} userType={item.userType} partnerID={item.partnerID} phoneNumber={item.phoneNumber} />
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
        height: 180,
        elevation: 4,
        borderRadius: 2,
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
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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