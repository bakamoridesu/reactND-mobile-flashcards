import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Switch} from 'react-native'
import {connect} from "react-redux";
import {dark, green, light, red, soft, white} from "../utils/colors";
import {handleAddQuestion} from "../actions";
import {CommonActions} from "@react-navigation/native";

function Btn({onPress, text, disabled}) {
  return (
    <TouchableOpacity
      style={disabled? [styles.submit, styles.disabled] : styles.submit}
      onPress={onPress}>
      <Text style={disabled? [styles.submitText, styles.submitTextDisabled] : styles.submitText}>{text}</Text>
      {disabled && (
        <Text style={{color: red, fontSize: 10}}>
          enter question to submit
        </Text>
      )}
    </TouchableOpacity>
  )
}

class AddCard extends Component {
  state = {
    question: '',
    answer: false,
  }

  handleSubmit = () => {
    const {question, answer} = this.state
    const deckId = this.props.route.params.deckId
    this.props.dispatch(handleAddQuestion(deckId, question, answer))
    this.props.navigation.dispatch(CommonActions.goBack())
  }
  toggleSwitch = () => {
    this.setState((prevState) => {
      return {
        answer: !prevState.answer
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.input}
            placeholder='Enter Question'
            onChangeText={text => this.setState({question: text})}
            defaultValue={this.state.question}
          />
          <View style={styles.answer}>
            <Text style={{color: light, fontSize: 24, flex:1}}>Is that correct?</Text>
            <Switch

              trackColor={{ false: red, true: light }}
              thumbColor={this.state.answer ? green : red}
              onValueChange={this.toggleSwitch}
              value={this.state.answer}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <Btn onPress={this.handleSubmit} text={'Submit'} disabled={this.state.question === ''}/>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: soft,
  },
  input: {
    borderWidth: 2,
    borderColor: light,
    height: 42,
    width: '90%',
    backgroundColor: light,
    margin: 20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  submit: {
    backgroundColor: light,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 55,
    borderRadius: 10,
    borderColor: light,
    borderWidth: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '50%',
  },
  disabled:{
    backgroundColor: white,
  },
  submitText: {
    color: dark,
    fontSize: 18
  },
  submitTextDisabled: {
    color: 'grey'
  },
  answer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '90%',
  }
})

export default connect()(AddCard)