import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from "react-redux";
import {dark, light, red, soft} from "../utils/colors";
import {TouchableWithoutFeedback} from "react-native-web";

function Btn({onPress, text}) {
  return (
    <TouchableOpacity
      style={styles.submit}
      onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  )
}



class DeckView extends Component {

  addCard = () => {

  }

  startQuiz = () => {

  }

  render() {
    const len = this.props.deck.questions.length
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {this.props.deck.title}
          </Text>
          <Text style={{color: light}}>
            {`${len} card${(len%10!==1 && len%100!==11)? 's':''}`}
          </Text>
        </View>
        <View style={styles.buttons}>
          <Btn onPress={this.addCard} text={'Add Card'}/>
          <Btn onPress={this.startQuiz} text={'Start Quiz'} />
          <TouchableWithoutFeedback onPress = {()=>console.log('click')}>
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
    height: 45,
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

function mapStateToProps(questions, {route}) {
  return {
    deck: questions[route.params.deckId]
  }
}

export default connect(mapStateToProps)(DeckView)