import {AsyncStorage} from "react-native";
const CARDS_STORAGE_KEY = 'reactND-mobile-flashcards:cards'

export const RECEIVE_DATA = 'RECEIVE_DATA'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

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

// If there is no such key in AsyncStorage,
// initialize it with initial deck list (`questions` variable)
// Read the available data otherwise.
// Not sure if this is a right way to handle the absence of value in initial storage.

export function handleInitialData() {
  return (dispatch) => {
    AsyncStorage.getItem(CARDS_STORAGE_KEY)
      .then(res => {
        if (!res) {
          AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(questions))
            .then(() => {
              AsyncStorage.getItem(CARDS_STORAGE_KEY, (err, res)=>{
                dispatch(getInitialData(JSON.parse(res)))
              })
            })
        } else {
          AsyncStorage.getItem(CARDS_STORAGE_KEY, (err, res)=>{
            dispatch(getInitialData(JSON.parse(res)))
          })
        }
      })
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
      .then(() => dispatch(addDeck(key, entry)))
  }
}

function removeDeck(deckName) {
  return {
    type: REMOVE_DECK,
    key: deckName,
  }
}

export function handleRemoveDeck(deckName) {
  return (dispatch) => {
    console.log('inside action')
    AsyncStorage.getItem(CARDS_STORAGE_KEY, (err, items) => {
      const {[deckName]: value, ...newItems} = JSON.parse(items)
      AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(newItems))
    })
      .then(dispatch(removeDeck(deckName)))
  }
}

function addQuestion(deckName, question) {
  return {
    type: ADD_QUESTION,
    key: deckName,
    question,
  }
}

function formQuestion(question, answer) {
  return {
    question,
    answer,
  }
}

export function handleAddQuestion(deckName, question, answer) {
  return (dispatch) => {
    const questionObj = formQuestion(question, answer)
    AsyncStorage.getItem(CARDS_STORAGE_KEY, (err, items) => {
      const item = JSON.parse(items)[deckName]
      console.log('item!!!!', item)
      const newItem = {
        ...item,
        questions: item.questions.concat([questionObj])
      }
      console.log('newItem!!!!!!', newItem)
      AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
        [deckName]: newItem,
      }))
    })
      .then(dispatch(addQuestion(deckName, questionObj)))
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