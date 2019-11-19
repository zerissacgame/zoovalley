import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Alert, StatusBar, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios'
import DeviceInfo, { getUniqueId } from 'react-native-device-info'
const bot_user = {
    _id: 2,
    name: 'ChibaInuBot',
    avatar: require('../Image/avatar2.png')
};
const uid = DeviceInfo.getUniqueId()
export default class AutoChatBot extends Component {
    static navigationOptions = {
        title: 'Zoo Valley',
        headerTitleStyle: { flex: 1, textAlign: 'center', color:'white'},
        headerLeft: null,
        headerStyle: {
            backgroundColor: '#2DCD87',
          },
        //header: null
    }
    state = {
        messages: [
            {
                _id: 1,
                text: "ยินดีต้อนรับสู่ Zoo Valley ผมชื่อ Chibaku หากมีข้อสงสัยถามผมได้เลย !",
                createdAt: new Date(),
                user: bot_user,
                image:''
            },
        ],
        id: uid
    };

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
        console.log('onsend');
        let input_word = messages[0].text;
        this.PostMessage(input_word);
    };

    PostMessage(input_word) {
        const url = 'https://zoochatbotpython.appspot.com';
        const bot = axios.post(url, {
            id: this.state.id,
            input_word: input_word
        })
            .then(function (response) {
                console.log('Post response', response);
            })
            .catch(function (error) {
                console.log('Post error', error);
            });
        this.BotResponse(bot);
        //this.state.messages = '';
    }
    BotResponse() {
        const id = this.state.id;
        console.log('id', id);
        const url = `http://zoochatbotpython.appspot.com/get/datab/${id}`;
        axios.get(url)
            .then((Data) => {
                console.log('JSON:', Data);
                const phrase = Data.data.phrase;
                const image = Data.data.map;
                    let msg = [
                    {
                        _id: this.state.messages.length + 1,
                        text: phrase,
                        //createdAt: new Date(),
                        user: bot_user,
                        image: image
                    }];
                this.setState(previousState => ({

                    messages: GiftedChat.append(previousState.messages, msg)

                }));
            })
    }
    render() {
        console.log('uid:', this.state.id);
        console.log(this.state.messages);
        return (
            <ImageBackground source={require('../Image/background.png')} style={styles.backgroundImage}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    alwaysShowSend={true}
                    user={{
                        _id: 1,
                    }}
                    
                /></ImageBackground>
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
        margin: 30,
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'stretch'
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
})