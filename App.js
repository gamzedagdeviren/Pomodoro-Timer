import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Vibration,
  TextInput,
} from 'react-native';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    global.wMinuteVal = 25;
    global.wSecondVal = 0;
    global.bMinuteVal = 5;
    global.bSecondVal = 0;
    (global.wTittle = 'WORK TIMER'), (global.bTittle = 'BREAK TIMER');
    (global.atla = false), (global.enSonBreakte = false);
    (global.wSecTxt = global.wSecondVal), (global.wMinTxt = global.wMinuteVal);
    this.state = {
      //showCounter: true,
      paused: true,
      pauseTxt: true,
      resetStatus: false,
      wStatus: false,
      wValue: 'Start',
      tittle: 'WORK TIMER',
      min: 0,
      sec: 0,
      wMinute: global.wMinuteVal,
      wSecond: global.wSecondVal,
      bMinute: global.bMinuteVal,
      bSecond: global.bSecondVal,
      wMinTxt: global.wMinuteVal,
      wSecTxt: global.wSecondVal,
      bMinTxt: global.bMinuteVal,
      bSecTxt: global.bSecondVal,
    };
    this.propTypes = {
      wSecond: PropTypes.number,
      wMinute: PropTypes.number,
      bSecond: PropTypes.number,
      bMinute: PropTypes.number,
    };
    this.resetMethod = this.resetMethod.bind(this);
  }

  resetMethod() {
    console.log(
      'Reset, Min:' + this.state.wMinute + '  Sec:' + this.state.wSecond
    );
    if (this.state.tittle === global.wTittle) {
      this.setState({
        wMinute: this.state.wMinTxt,
        wSecond: global.wSecondVal,
        paused: true,
        tittle: global.wTittle,
      });
    } else {
      this.setState({
        bMinute: global.bMinuteVal,
        bSecond: global.bSecondVal,
        paused: true,
        tittle: global.bTittle,
      });
    }
  }

  startPauseMethod(e) {
    this.setState(() => {
      if (this.state.paused) {
        //worktime zaman aksın
        this.setState({ wValue: 'Continued' });
        this.setState({ pauseTxt: true });
        this.setState({ paused: false });
      } else {
        //break time zaman dursun
        this.setState({ wValue: 'Paused' });
        this.setState({ pauseTxt: false });
        this.setState({ paused: true });
      }
    });
  }

  componentDidMount() {
    this.interval = setInterval(this.dec, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  dec = () => {
    if (this.state.tittle === global.wTittle) {
      if (!this.state.paused) {
        if (this.state.wMinute == 0 && this.state.wSecond == 0) {
          Vibration.vibrate();
          setTimeout(() => {
            this.setState(Vibration.cancel());
          }, 1000);
          this.changeStatus();
        } else if (this.state.wSecond == 0) {
          this.setState({ wSecond: 59 }); //59 olmalı
          this.setState((prevState) => ({
            wMinute: --prevState.wMinute,
          }));
        } else {
          this.setState((prevState) => ({
            wSecond: --prevState.wSecond,
          }));
        }
      }
    } else if (this.state.tittle === global.bTittle) {
      if (!this.state.paused) {
        if (this.state.bMinute == 0 && this.state.bSecond == 0) {
          Vibration.vibrate();
          setTimeout(() => {
            this.setState(Vibration.cancel());
          }, 1000);
          this.changeStatus();
        } else if (this.state.bSecond == 0) {
          this.setState({ bSecond: 59 });
          this.setState((prevState) => ({
            bMinute: --prevState.bMinute,
          }));
        } else {
          this.setState((prevState) => ({
            bSecond: --prevState.bSecond,
          }));
        }
      }
    }
  };

  changeStatus = () => {
    if (this.state.tittle === 'WORK TIMER') {
      this.setState({ tittle: 'BREAK TIMER' });
    } else {
      this.setState({ tittle: 'WORK TIMER' });
    }
  };

  getHandler = (key) => (val) => {
    this.setState({ [key]: val });
  };

  renderText(wMin, wSec, bMin, bSec) {
    console.log(
      wMin +
        ':' +
        wSec +
        '=work  ,  break=' +
        bMin +
        ':' +
        bSec +
        '/nPaused: ' +
        this.state.paused
    );

    if (bMin == 0 && bSec == 0 && !global.atla) {
      global.atla = true;
      global.enSonBreakte = true;
      return (
        <Text style={styles.timeStyle}>
          {' '}
          {this.state.bMinute} : {this.state.bSecond}
        </Text>
      );
    } else if (wMin == 0 && wSec == 0 && !global.atla) {
      global.atla = true;
      global.enSonBreakte = false;
      return (
        <Text style={styles.timeStyle}>
          {' '}
          {this.state.wMinute} : {this.state.wSecond}
        </Text>
      );
    } else if (wMin == 0 && wSec == 0) {
      if (bMin == 0 && bSec == 0 && !global.enSonBreakte) {
        this.setState({
          wMinute: global.wMinuteVal,
          wSecond: global.wSecondVal,
        });
        global.atla = false;
        return (
          <Text style={styles.timeStyle}>
            {' '}
            {this.state.bMinute} : {this.state.bSecond}
          </Text>
        );
      } else if (bMin == 0 && bSec == 0 && global.enSonBreakte) {
        this.setState({
          bMinute: global.bMinuteVal,
          bSecond: global.bSecondVal,
        });
        global.atla = false;
        return (
          <Text style={styles.timeStyle}>
            {' '}
            {this.state.wMinute} : {this.state.wSecond}
          </Text>
        );
      } else {
        return (
          <Text style={styles.timeStyle}>
            {' '}
            {this.state.bMinute} : {this.state.bSecond}
          </Text>
        );
      }
    } else if (bMin == 0 && bSec == 0) {
      if (wMin == 0 && wSec == 0) {
        this.setState({
          bMinute: global.bMinuteVal,
          bSecond: global.bSecondVal,
        });
      }
      return (
        <Text style={styles.timeStyle}>
          {' '}
          {this.state.wMinute} : {this.state.wSecond}
        </Text>
      );
    } else {
      return (
        <Text style={styles.timeStyle}>
          {' '}
          {this.state.wMinute} : {this.state.wSecond}
        </Text>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>{this.state.tittle} </Text>
        {this.renderText(
          this.state.wMinute,
          this.state.wSecond,
          this.state.bMinute,
          this.state.bSecond
        )}
        <Text style={styles.paragraph}> {this.state.wValue} </Text>
        <Button title="Vibrate once" onPress={() => Vibration.vibrate()} />
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.viewStyle}>
            <Button
              title={!this.state.paused ? 'Pause' : 'Start'}
              color="#009688"
              style={styles.btnStyle}
              onPress={this.startPauseMethod.bind(this)}
            />
          </View>
          <View style={styles.viewStyle}>
            <Button
              title="Reset"
              color="#009688"
              style={styles.btnStyle}
              onPress={this.resetMethod.bind()}
            />
          </View>
        </View>

        <KeyboardAvoidingView
          behavior="padding"
          style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.tittle2}> Work Time: </Text>
          </View>
          <Text style={styles.text}> Mins: </Text>
          <View style={styles.viewInputStyle}>
            <TextInput
              keyboardType={'numeric'}
              onChangeText={this.getHandler('wMinute')}
              value={this.state.wMinute.toString()}
              style={styles.textInputStyle}
              onChange={(event) =>
                this.setState({ wMinute: event.nativeEvent.text })
              }
            />
          </View>
          <Text style={styles.text}> Secs: </Text>
          <View style={styles.viewInputStyle}>
            <TextInput
              keyboardType={'numeric'}
              onChangeText={this.getHandler('wSecond')}
              value={this.state.wSecond.toString()}
              style={styles.textInputStyle}
              onChange={(event) =>
                this.setState({ wSecond: event.nativeEvent.text })
              }
            />
          </View>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.tittle2}> Break Time: </Text>
          </View>
          <Text style={styles.text}> Mins: </Text>
          <View style={styles.viewInputStyle}>
            <TextInput
              keyboardType={'numeric'}
              onChangeText={this.getHandler('bMinute')}
              //onEndEditing={}
              value={this.state.bMinute.toString()}
              style={styles.textInputStyle}
              onChange={(event) =>
                this.setState({ bMinute: event.nativeEvent.text })
              }
            />
          </View>
          <Text style={styles.text}> Secs: </Text>
          <View style={styles.viewInputStyle}>
            <TextInput
              keyboardType={'numeric'}
              onChangeText={this.getHandler('bSecond')}
              value={this.state.bSecond.toString()}
              style={styles.textInputStyle}
              onChange={(event) =>
                this.setState({ bSecond: event.nativeEvent.text })
              }
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 19,
    fontSize: 18,
    textAlign: 'center',
  },
  titleStyle: {
    margin: 0,
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timeStyle: {
    margin: 0,
    fontSize: 55,
    textAlign: 'center',
  },
  btnStyle: {
    width: 10,
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1.5,
  },
  tittle2: {
    margin: 5,
    fontWeight: 'bold',
  },
  text: {
    margin: 5,
  },
  viewInputStyle: {
    width: 10,
    height: 40,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#009688',
    flex: 1,
    justifyContent: 'center',
  },
  textInputStyle: {
    margin: 10,
  },
  viewStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 25,
  },
});
