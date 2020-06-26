import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet, SafeAreaView,TouchableOpacity} from 'react-native'
import {connect} from "react-redux";
import {handleInitialData} from "../actions";
import {dark, light, soft} from "../utils/colors";

class Item extends Component {

  render () {
    const { item, onPress } = this.props
    return (
      <TouchableOpacity onPress={() => onPress(item.title)}>
        <View style={[styles.listItem]}>
          <Text style={styles.listItemTitle}>
            {item.title}
          </Text>
          <Text>
            {`${item.questions.length} questions`}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

}

class DeckList extends Component {
  componentDidMount() {
    console.log('MOUNT')
    const {dispatch} = this.props
    dispatch(handleInitialData())
  }

  handlePress = (deckId) => {
    this.props.navigation.navigate('DeckView', {deckId: deckId} )
  }

  render() {
    const questions = this.props.questions
    console.log(questions)
    if (!questions || Object.keys(questions).length === 0) {
      return (
        <View style={[styles.container,{justifyContent: 'center', alignItems: 'center'}]}>
          <Text style={{fontSize: 32, color: light}}>
            No deck to display!
          </Text>
          <Text>
            Add decks to start
          </Text>
        </View>
      )
    }
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={Object.keys(questions)}
          renderItem={({item}) => <Item onPress={this.handlePress} key={questions[item].title} item={questions[item]}/>}
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
