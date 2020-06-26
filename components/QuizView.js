import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from "react-redux";
import {dark, light, soft} from "../utils/colors";
import {TouchableWithoutFeedback} from "react-native-web";

class QuizView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 1,
      isQuestion: true,
      size: this.props.questions.length
    }
  }

  componentDidMount() {
    const {navigation, title} = this.props
    navigation.setOptions({title: `${title} quiz`})
  }

  render() {
    const {questions} = this.props
    const {question} = this.state
    const curQuestion = questions[question - 1].question
    const curAnswer = questions[question - 1].answer
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{color: light, margin: 20, fontSize: 24}}>
            {`${this.state.question}/${this.state.size}`}
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

        <View style={styles.buttons}>
          {this.state.isQuestion && (
            <View>
              <Text> Button 1</Text>
              <Text> Button 2</Text>
            </View>
          )}
        </View>

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
})

export default connect(mapStateToProps)(QuizView)