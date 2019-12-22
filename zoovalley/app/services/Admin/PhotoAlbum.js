import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert, StatusBar, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
const uid = DeviceInfo.getUniqueId();
export default class PhotoAlbum extends Component {
    static navigationOptions = {
        header: null,
    }
    state = {
        //selected: '',
        photos: [],
        isdisabled: true, bgColor: false,
        fileName: ''
    };
    bgColor1(bgColor) {
        console.log("bgColor:",bgColor)
        if(this.state.bgColor==true){
            return styles.dataButton;
        }
        else{
            return styles.dataDefault;
        }
    }
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
    UploadPhoto(selecteduri,filename) {
        const url = "https://zoochatbotpython.appspot.com/upload";  
        //console.log('hi:', this.state.selected);
        const image = {
            uri: selecteduri,
            type: 'image/jpeg',
            name: filename
            //name: '123456'
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
        .then((response) => {
                console.log('response upload', response);
                alert("upload successful")
                this.setState({ isdisabled: false, bgColor: true });
                this.setState({ selected: null });
            })
        .catch(error => {
                console.error(error);
                alert("upload failed")
                
            });
        
    }

     selectImage(uri, filename) {
        // define whatever you want to happen when an image is selected here
         /*this.setState({
            selected: uri,
            fileName: filename
            // showSelectedPhoto: true,

        });*/
        console.log('Selected image: ', this.state.selected);
        console.log('uri: ', uri);
        console.log('filename:', filename)
        this.UploadPhoto(uri,filename);
    }
    render() {
        const { navigate } = this.props.navigation;
        return (

            <ImageBackground source={require('../Image/background.png')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.justContain}>
                        <Image source={require('../Image/album1.png')} style={styles.logo}></Image>
                        <Text style={styles.menubtn}><Text> ALBUM </Text></Text>

                    </View>
                    <ScrollView><View style={styles.imageList}> {/* เป็นการแสดงข้อมูลรูปภาพแบบเป็น 2 รูปภาพต่อ 1 แถว*/}
                        {this.state.photos.map((p, i) => {
                            return (
                                <TouchableOpacity key={i}
                                    onPress={() => this.selectImage(p.node.image.uri, p.node.image.filename)}> {/* สามารถกดที่รูปจะทำการ upload แล้วสามารถเรียกดูข้อมูลัตว์อีกรอบได้*/}
                                    <Image
                                        key={i}
                                        style={styles.imageSelect}
                                        source={{ uri: p.node.image.uri }}

                                    /></TouchableOpacity>
                            );
                        })}  
                    </View>
                    </ScrollView>
                    <TouchableOpacity disabled={this.state.isdisabled} onPress={() => navigate('Data', { name: 'user' })} style={this.bgColor1()}>
                        <Text style={styles.fontTitle}>View Information</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        margin: '7%',
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
    },
    justContain: {
        height: hp('15%'),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 15,
    },
    menubtn: {
        margin: '7%',
        width: wp('50%'),
        height: hp('12%'),
        backgroundColor: 'white',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: wp('10%'),
        fontFamily: 'OpenSans_Light'
    },
    logo: {
        width: wp('30%'),
        height: hp('18%'),
        resizeMode: 'stretch'
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    imageSelect: {
        margin: '3%',
        width: wp('35%'),
        height: hp('20%'),
    },
    imageList: {
        //margin: '2%',
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    dataButton: {
        marginTop: '3%',
        width: wp('85%'),
        height: hp('8%'),
        backgroundColor: '#2DCD87',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: hp('4%'),
        fontFamily: 'OpenSans_Light',
        alignItems: 'center'
    },
    dataDefault: {
        marginTop: '3%',
        width: wp('85%'),
        height: hp('8%'),
        backgroundColor: '#636465',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: hp('4%'),
        fontFamily: 'OpenSans_Light',
        alignItems: 'center',
        color:'#A5A6A7'
    },
    fontTitle: {
        color: 'white',
        fontFamily: 'OpenSans_Bold',
        fontSize: hp('4%')
    }
})