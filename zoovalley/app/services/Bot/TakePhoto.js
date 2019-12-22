import React from 'react';
import { Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import style from '../Admin/style'
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const uid = DeviceInfo.getUniqueId();
// More info on all the options is below in the API Reference... just some common use cases shown here
export default class TakePhoto extends React.Component {
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    static navigationOptions = {
        header: null,
        headerMode: 'none'
    }
    constructor(props) {
        super(props);

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.state = { showAlert: true, avatarSource: null, photo: null, isdisabled:true, bgColor:false};
    }
    bgColor1(bgColor) { //เป็นการแสดงปุ่มของการแสดงข้อมูล โดยถ้าหากยังไม่ทำการอัพโหลดข้อมูล ตัว stage จะแสดงปุ่มเป็นสีเทา ถ้าหากอัพโหลดแล้วจะเป็น สีเขียว
        console.log("bgColor:",bgColor)
        if(this.state.bgColor==true){
            return styles.dataButton;
        }
        else{
            return styles.dataDefault;
        }
    }
    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };
    UploadPhoto() {
        console.log('id', uid);
        const url = "https://zoochatbotpython.appspot.com/upload";
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
        .then((response) =>{
          console.log('response upload',response);
          alert("อัพโหลดเสร็จเรียบร้อย")
          this.setState({ isdisabled:false, bgColor:true });
        })
        .catch((error) => {
          console.error(error);
          alert("เกิดความผิดพลาด")
          this.setState({ photo: null });
        });
      }
    selectPhotoTapped() {
        const options = {
            //quality: 1.0,
            storageOptions: {
                skipBackup: true,
                path: './zooimage',
            },
        };

        ImagePicker.launchCamera(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                this.setState({ photo: response });
                console.log("response", response);
                console.log("uri:", response.uri.replace('file://', ''));
                this.UploadPhoto();
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    render() {

        const { navigate } = this.props.navigation;
        const { showAlert } = this.state;
        return (
            //<Image source={this.state.avatarSource} style={styles.uploadAvatar} />
            <ImageBackground source={require('../Image/background.png')} style={style.backgroundImage}>

                <View style={styles.container}>

                    <View style={style.justContain}>
                        <Image source={require('../Image/takepic1.png')} style={styles.logo}></Image>
                        <Text style={styles.menubtn}><Text> TAKE PICTURE </Text></Text>
                    </View>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

                        <View
                            style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                            {this.state.avatarSource === null ? (

                                <Text style={styles.styleIm}>กดตรงนี้เพื่อถ่ายรูปครับ !</Text>

                            ) : (
                                    <Image style={styles.avatar} source={this.state.avatarSource} />
                                )}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  disabled={this.state.isdisabled} onPress={() => navigate('Data', { name: 'user' })} style={this.bgColor1()}>
                        <Text style={styles.fontTitle}>View Information</Text>
                    </TouchableOpacity>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="Zoo Notify"
                        message="คลิ๊ก ! พื้นที่สีเทาเพื่อทำการถ่ายรูป. โปรดถ่ายรูปให้เห็นหน้าสัตว์ด้วยครับ เมื่อถ่ายรูปเสร็จแล้วต้องรอจนกว่าจะขึ้นอัพโหลดเสร็จเรียบร้อยแล้วจึงกด View Information เพื่อดูข้อมูลสัตว์ได้ครับ"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showConfirmButton={true}
                        confirmText="รับทราบ"
                        confirmButtonColor="#2DCD87"
                        onCancelPressed={() => {
                            this.hideAlert();
                        }}
                        onConfirmPressed={() => {
                            this.hideAlert();
                        }}
                    />
                </View>
            </ImageBackground>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        margin: hp('4%'),
        flex: 1,
        alignItems: 'center',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        //borderRadius: 75,
        width: wp('85%'),
        height: hp('55%'),
        backgroundColor: '#E8ECF0',
        //opacity: 0.9,
    },
    menubtn: {
        marginLeft: 20,
        width: wp('50%'),
        height: hp('13%'),
        backgroundColor: 'white',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: hp('4.7%'),
        fontFamily: 'OpenSans_Light'
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
    logo: {
        width: wp('35%'),
        height: hp('20%'),
        resizeMode: 'stretch'
    },
    fontTitle: {
        color: 'white',
        fontFamily: 'OpenSans_Bold',
        fontSize: hp('4%')
    },
    styleIm:{
        fontSize:hp('2.5%'),
    }
});