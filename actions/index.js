import {AsyncStorage} from "react-native-web";

export const RECEIVE_DATA = 'RECEIVE_DATA'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'

function formNewEntry(key) {
  return {
    title: key,
    questions: []
  }
}

function getInitialData(data) {
  return {
    type: RECEIVE_DATA,
    data,
  }
}

export function handleInitialData() {
  console.log('handleInitialData')
  return (dispatch) => {
    dispatch(getInitialData(questions))
  }
}

function addDeck(key, deck) {
  return {
    type: ADD_DECK,
    key,
    deck,
  }
}

export function handleAddDeck(key) {
  return (dispatch) => {
    const entry = formNewEntry(key)
    return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
      [key]: entry,
    }))
      .then(()=> dispatch(addDeck(key, entry)))
  }
}

export function removeDeck(deckName) {
  return {
    type: REMOVE_DECK,
    deckName,
  }
}


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
  },
  Java: {
    title: 'Java',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}