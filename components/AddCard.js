import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {connect} from "react-redux";
import {dark, light, soft} from "../utils/colors";
import {handleAddQuestion} from "../actions";
import {CommonActions} from "@react-navigation/native";

function Btn({onPress, text}) {
  return (
    <TouchableOpacity
      style={styles.submit}
      onPress={onPress}>
      <Text style={{color: dark, fontSize: 18}}>{text}</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  handleSubmit = () => {
    const {question, answer} = this.state
    const deckId = this.props.route.params.deckId
    this.props.dispatch(handleAddQuestion(deckId, question, answer))
    this.props.navigation.dispatch(CommonActions.goBack())
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
          <TextInput
            style={styles.input}
            placeholder='Enter Answer'
            onChangeText={text => this.setState({answer: text})}
            defaultValue={this.state.answer}
          />
        </View>
        <View style={styles.buttons}>
          <Btn onPress={this.handleSubmit} text={'Submit'} />
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
  }
})

export default connect()(AddCard)