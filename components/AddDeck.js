import React, {Component} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { dark, white, soft } from "../utils/colors";


function SubmitBtn({onPress}) {
  return (
    <TouchableOpacity
      style={styles.submit}
      onPress={onPress}>
      <Text style={{color: white}}>Submit</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 42, padding: 20, textAlign: 'center', color: soft}}>
          What's the name of your new deck?
        </Text>
        <TextInput style={styles.input} placeholder='Enter Deck Name'/>
        <SubmitBtn/>
      </View>
    )
  }
}

export default AddDeck

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: dark,
    height: 42,
    width: '90%'
  },
  submit: {
    backgroundColor: dark,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  }
});