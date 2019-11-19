import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ImageBackground, Image } from 'react-native'
import axios from 'axios';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';

const uid = DeviceInfo.getUniqueId();
export default class DataZoo extends Component {
    static navigationOptions = {
        header: null,
    }
    state = {
        class: null,
        info: null
    };
    constructor(props) {
        super(props)
        //this.image = image;
        this.getAnimalClass()
        setTimeout(() => {
            console.log("link:", this.state.info);
            const aniclass = this.state.class;
            this.getAnimalInfo(aniclass);
        }, 1800);
    }
    getAnimalClass() {
        const iduser = uid;
        //const iduser = 'e0b964b8d89c35ee';
        const url = `https://zoochatbotpython.appspot.com/getbyuser/animal/${iduser}`;
        axios.get(url)
            .then((Data) => {
                console.log("Aniclass:", Data.data.animal);
                //const animalClass = Data.data.animal;
                //this.setState({class: animalClass});
                this.setState({ class: 'wolf' });
                console.log("finished!");
            })
            .catch((err) => {
                console.log('aniclass error', err);
            })
    }
    getAnimalInfo(animalClass) {
        const url = `https://zoochatbotpython.appspot.com/getanimalinfo/${animalClass}`;
        axios.get(url)
            .then((Data) => {
                console.log("Animal:", Data.data.info);
                const animalInfo = Data.data.info;
                console.log("animalInfo:", animalInfo);
                this.setState({ info: animalInfo });
            })
            .catch((err) => {
                console.log('Animal error', err);
            });
    }
    render() {
        return (
            <ImageBackground source={require('../Image/background.png')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Image source={{ uri: this.state.info }} style={styles.dataGet} />
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    fontS: {
        justifyContent: 'center',
        fontSize: 20,
        fontFamily: 'AbrilFatface'
    },
    container: {
        margin: 10,
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center'
    },
    justContain: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 15,
    },
    menubtn: {
        margin: 10,
        width: '65%',
        height: 80,
        backgroundColor: 'white',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 40,
        fontFamily: 'OpenSans_Light'
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'stretch'
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    showPic: {
        marginTop: 10,
        width: '48%',
        height: '89%',
        backgroundColor: 'white',
        borderRadius: 6,
    },
    justPic: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    justWord: {
        width: '98%',
        height: '80%',
    },
    showWord: {
        width: '100%',
        height: '65%',
        backgroundColor: 'white',
        borderRadius: 6,
    },
    dataGet: {
        //margin:10,
        width: '100%',
        height: '85%',
        //borderRadius:6,
        justifyContent: 'center',
        resizeMode: 'stretch',
        alignItems: 'center'
    }
})