import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from "react-redux";
import {dark, light, red, soft, white} from "../utils/colors";
import {TouchableWithoutFeedback} from "react-native-web";
import {handleRemoveDeck} from "../actions";
import {CommonActions} from "@react-navigation/native";

function Btn({onPress, text, disabled=false}) {
  return (
    <TouchableOpacity disabled = {disabled}
      style={disabled? [styles.submit, styles.disabled] : styles.submit}
      onPress={onPress}>
      <Text style={disabled
        ? [styles.submitText, styles.disabledText]
        : styles.submitText}>{text}</Text>
      {disabled && (
        <Text style={{color: red, fontSize: 10}} >
          Add cards to start quiz
        </Text>
      )}
    </TouchableOpacity>
  )
}

class DeckView extends Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: `${this.props.title} deck`
    })
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.deleted !== true;
  }

  addCard = () => {
    this.props.navigation.navigate('AddCard', {deckId: this.props.title})
  }

  startQuiz = () => {
    this.props.navigation.navigate('QuizView', {deckId: this.props.title})
  }

  handlePress = () => {
    console.log('handle press')
    this.props.dispatch(handleRemoveDeck(this.props.title))
    this.props.navigation.dispatch(CommonActions.goBack())
  }

  render() {
    const {title, questions} = this.props
    console.log('deckview props', this.props)
    const len = questions.length
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={{color: light}}>
            {`${len} card${(len%10!==1 && len%100!==11)? 's':''}`}
          </Text>
        </View>
        <View style={styles.buttons}>
          <Btn onPress={this.addCard} text={'Add Card'}/>
          <Btn onPress={this.startQuiz} text={'Start Quiz'} disabled={len<1}/>
          <TouchableWithoutFeedback onPress = {this.handlePress}>
            <View>
              <Text style={{
                fontSize: 24,
                color: red,
                marginTop: 10}} >Remove deck</Text>
            </View>
          </TouchableWithoutFeedback>
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
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: light,
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
  disabled: {
    backgroundColor: white
  },
  submitText: {
    color: dark,
    fontSize: 18
  },
  disabledText: {
    color: 'gray'
  }
})

function mapStateToProps(questions, {route}) {
  const deck = questions[route.params.deckId]

  console.log('mapstate deck ', deck)
  console.log('mapstate route ', route)
  console.log('mapstate deckId ', route.params.deckId)
  console.log('mapstate questions ', questions)

  if(deck){
    return {
      title: deck.title,
      questions: deck.questions,
      deleted: false
    }
  }
  else {
    return {
      deleted: true
    }
  }
}

export default connect(mapStateToProps)(DeckView)