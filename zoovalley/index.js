/**
 * @format
 */

import React, { Component } from 'react'
import {AppRegistry} from 'react-native';
import Menu from './app/services/Admin/Menu'
import Splash from './app/services/Admin/Splash';
import AppContainer from './app/services/Admin/Menu'
import {name as appName} from './app.json';
import DataZoo from './app/services/Admin/DataZoo'

class Main extends Component{
    constructor(props){
        super(props);
        this.state = { currentScreen: 'Splash'};
        setTimeout(() => {
            this.setState({ currentScreen:'AppContainer'})
        },3000)
    }
    render(){
        const { currentScreen } = this.state
        let mainScreen = currentScreen === 'Splash' ? <Splash /> : <AppContainer />
        return mainScreen
    }
}

AppRegistry.registerComponent(appName, () => Main);
