import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {soft, light, dark, white, red} from "../utils/colors";
import {handleAddDeck} from "../actions";
import {connect} from "react-redux";
import {CommonActions} from '@react-navigation/native'

class AddDeck extends Component {

  state = {
    name: ''
  }
  handleAddDeck = () => {
    this.props.dispatch(handleAddDeck(this.state.name))
    this.setState({
      name: ''
    })
    this.props.navigation.dispatch(CommonActions.goBack())
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 42, padding: 20, textAlign: 'center', color: light}}>
          What's the name of your new deck?
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Deck Name'
          onChangeText={text => this.setState({name: text})}
          defaultValue={this.state.name}
        />
        <TouchableOpacity
          disabled={this.state.name === ''}
          style={this.state.name === '' ? styles.submitDisabled : styles.submit}
          onPress={() => this.handleAddDeck()}>
          <Text style={this.state.name === ''
            ? styles.submitTextDisabled
            : styles.submitText}>Add deck!</Text>
          {this.state.name === '' && (
            <Text style={{color: red, fontSize: 10}}>
              deck has no name
            </Text>
          )}
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(AddDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: soft,
  },
  input: {
    borderWidth: 2,
    borderColor: light,
    height: 42,
    width: '90%',
    backgroundColor: light,
  },
  submit: {
    backgroundColor: light,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 10,
    borderColor: light,
    borderWidth: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitDisabled: {
    backgroundColor: white,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 10,
    borderColor: light,
    borderWidth: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: dark,
    fontWeight: 'bold'
  },
  submitTextDisabled: {
    color: 'gray',
  }
});