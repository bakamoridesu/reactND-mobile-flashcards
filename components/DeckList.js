import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet, SafeAreaView, TouchableWithoutFeedback} from 'react-native'
import {connect} from "react-redux";
import {handleInitialData} from "../actions";
import {dark, light, soft} from "../utils/colors";

function Item(item) {

  return (
    <TouchableWithoutFeedback onPress={() => console.log(item.title)}>
      <View style={styles.listItem}>
        <Text style={styles.listItemTitle}>
          {item.title}
        </Text>
        <Text>
          {`${item.questions.length} questions`}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

class DeckList extends Component {
  componentDidMount() {
    console.log('MOUNT')
    const {dispatch} = this.props
    dispatch(handleInitialData())
  }

  render() {
    const questions = this.props.questions

    if (!questions) {
      return (
        <View>
          <Text>
            No entries!
          </Text>
        </View>
      )
    }
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={Object.keys(questions)}
          renderItem={({item}) => <Item key={questions[item].title} {...questions[item]}/>}
          keyExtractor={item => questions[item].title}/>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(questions) {
  return {
    questions,
  }
}

export default connect(mapStateToProps)(DeckList)

const questions = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: soft,
  },
  listItem: {
    height: 100,
    borderWidth: 2,
    borderColor: dark,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: light,
  },
  listItemTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: dark,
  }
});
