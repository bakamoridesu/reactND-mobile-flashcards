import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native'

function Item (item) {

    return (
        <View onClick={console.log('clicked')}>
            <Text>
                {item.title}
            </Text>
        </View>
    )
}
class DeckList extends Component {
  render() {
      console.log(questions)
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
        data ={Object.keys(questions)}
        renderItem = {({item}) => <Item {...questions[item]}/>}
        keyExtractor={item => questions[item].title}/>
      </SafeAreaView>
    )
  }
}

export default DeckList

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
    },
});
