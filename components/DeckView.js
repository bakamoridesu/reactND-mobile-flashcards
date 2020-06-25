import React, {Component} from 'react'
import { View, Text } from 'react-native'
import {connect} from "react-redux";

class DeckView extends Component {
  render() {
    console.log(this.props)
    return (
      <View>
        <Text>
          {this.props.deck.title}
        </Text>
      </View>
    )
  }
}

function mapStateToProps(questions, {route}) {
  return {
    deck: questions[route.params.deckId]
  }
}

export default connect(mapStateToProps)(DeckView)