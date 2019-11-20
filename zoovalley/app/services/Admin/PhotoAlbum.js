import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert, StatusBar, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";

export default class AutoChatBot extends Component {
    static navigationOptions = {
        header: null,
    }
    state = {
        selected: '',
        photos: [],
        showSelectedPhoto: false,
        uri: ''
    };

    componentDidMount() {

        CameraRoll.getPhotos({
            first: 10,
            assetType: 'Photos',
            Album: 'zooimage',
            groupName: 'zooimage'
        })
            .then(r => {
                this.setState({ photos: r.edges });

            })
            .catch((err) => {
                //Error Loading Images
            });
    };
    UploadPhoto() {
        const url = "https://zoochatbotpython.appspot.com/upload"    
        const image = {
            uri: this.state.photo.uri,
            type: 'image/jpeg',
            name: this.state.photo.fileName
        }
        const imgBody = new FormData();
        imgBody.append('file', image);
        imgBody.append('userid', uid);
        console.log('imgBody:', imgBody);

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: imgBody
        })
            .then(response => {
                console.log('response upload', response);
                this.postId(image);
                alert("upload successful")
            })
            .catch(error => {
                console.error(error);
                alert("upload failed")
                this.setState({ photo: null });
            });
    }
    selectImage(uri) {
        // define whatever you want to happen when an image is selected here
        this.setState({
            selected: uri,
           // showSelectedPhoto: true,
            uri: uri
        });
        this.UploadPhoto();
        console.log('Selected image: ', uri);
    }
    render() {
        const { navigate } = this.props.navigation;
    /*    const { showSelectedPhoto, uri } = this.state;
        if (showSelectedPhoto) {
            /*this.props.navigation.navigate('SelectedPhoto',{ name: 'user' })
            const {uri}=this.state.uri;
           return (
                <View>
                    <SelectedPhoto
                        uri={uri}
                         />
                    
                </View>
           )
        }*/
        return (

            <ImageBackground source={require('../Image/background.png')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.justContain}>
                        <Image source={require('../Image/album1.png')} style={styles.logo}></Image>
                        <Text style={styles.menubtn}><Text> ZOO ALBUM </Text></Text>

                    </View>

                    <ScrollView><View style={styles.imageList}>

                        {this.state.photos.map((p, i) => {

                            return (

                                <TouchableOpacity key={i} onPress={() => navigate('Data', { name: 'user' })} >

                                    <Image
                                        key={i}
                                        style={styles.imageSelect}
                                        source={{ uri: p.node.image.uri }}

                                    /></TouchableOpacity>

                            );

                        })}

                    </View>
                    </ScrollView>

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
        margin: 30,
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
    },
    justContain: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 15,
    },
    menubtn: {
        margin: '7%',
        width: '60%',
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
        width: '38%',
        height: '120%',
        resizeMode: 'stretch'
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    imageSelect: {
        margin: '3%',
        width: 130,
        height: 150,
    },
    imageList: {
        //margin: '2%',
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    dataButton: {
        marginTop: 10,
        width: '100%',
        height: 60,
        backgroundColor: '#2DCD87',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 45,
        fontFamily: 'OpenSans_Light',
        alignItems: 'center'
    },
    fontTitle: {
        color: 'white',
        fontFamily: 'OpenSans_Bold',
    }
})