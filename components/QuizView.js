import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from "react-redux";
import {dark, green, light, red, soft} from "../utils/colors";
import {TouchableWithoutFeedback} from "react-native-web";
import {CommonActions} from '@react-navigation/native'

import { clearLocalNotifications } from "../utils/helpers";

function Btn({onPress, text, style, textStyle}) {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

class QuizView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 1,
      isQuestion: true,
      numCorrect: 0,
      size: this.props.questions.length
    }
  }

  componentDidMount() {
    const {navigation, title} = this.props
    navigation.setOptions({title: `${title} quiz`})
  }

  handlePress (value, answer) {
    let inc = 0
    if(value === answer) {
      inc = 1
    }
    this.setState((prevState) => {
      return {
        numCorrect: prevState.numCorrect + inc,
        question: prevState.question + 1,
      }
    })
  }

  render() {
    const { questions } = this.props
    const { question, size, numCorrect } = this.state

    // if all questions asked, show result view.
    if(question > size) {
      clearLocalNotifications()
      return (
        <View style={styles.results}>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <View style={styles.resultCircle}>
              <Text style={styles.resultScore}>
                {numCorrect}/{size} correct!
              </Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <Btn
              onPress={() => this.setState({
                question: 1,
                numCorrect: 0
              })}
              text={'Restart quiz'}
              style={[styles.submit, {backgroundColor: light}]}
              textStyle={styles.btnResult}/>
            <Btn
              onPress={() => this.props.navigation.dispatch(CommonActions.goBack())}
              text={'Back to deck'}
              style={[styles.submit, {backgroundColor: light}]}
              textStyle={styles.btnResult}/>
          </View>
        </View>
      )
    }

    const curQuestion = questions[question - 1].question
    const curAnswer = questions[question - 1].answer
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{color: light, margin: 20, fontSize: 24}}>
            {`${question}/${size}`}
          </Text>
        </View>
        {this.state.isQuestion
          ? (
            <View style={styles.question}>
              <Text style={{color: light, margin: 20, fontSize: 32}}>
                {curQuestion}
              </Text>
              <TouchableWithoutFeedback onPress={()=>this.setState({
                isQuestion: false,
              })}>
                <View>
                  <Text style={{margin: 20, fontSize: 12}}>
                    View answer
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            )
          : (
            <View style={styles.question}>
              <Text style={{color: light, margin: 20, fontSize: 32}}>
                {curAnswer}
              </Text>
              <TouchableWithoutFeedback onPress={()=>this.setState({
                isQuestion: true,
              })}>
                <View>
                  <Text style={{margin: 20, fontSize: 12}}>
                    Return to question
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        {this.state.isQuestion
          ? (
        <View style={styles.buttons}>
              <Btn
                onPress={() => this.handlePress(true, curAnswer)}
                text={'Correct'}
                style={[styles.submit, {backgroundColor: green}]}
                textStyle={styles.btnQuestion}/>
              <Btn
                onPress={() => this.handlePress(false, curAnswer)}
                text={'Incorrect'}
                style={[styles.submit, {backgroundColor: red}]}
                textStyle={styles.btnQuestion}/>
            </View>)
          : (
            <View style={styles.buttons}>
            </View>
          )}
      </View>
    )
  }
}

function mapStateToProps(questions, {route}) {
  const deck = questions[route.params.deckId]
  if (deck) {
    return {
      title: deck.title,
      questions: deck.questions,
      deleted: false
    }
  } else {
    return {
      deleted: true
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: soft,
  },
  results: {
    flex: 1,
    backgroundColor: soft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultCircle: {
    height: 150,
    width: 150,
    backgroundColor: light,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
  },
  resultScore: {
    color: dark,
    fontWeight: 'bold',
    fontSize: 18,
  },
  header: {
    flex: 1,
  },
  question: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
    width: '70%',
  },
  btnQuestion: {
    color: light,
    fontSize: 18,
  },
  btnResult: {
    color: dark,
    fontSize: 18,
  }
})

export default connect(mapStateToProps)(QuizView)