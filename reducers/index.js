import {ADD_DECK, ADD_QUESTION, RECEIVE_DATA, REMOVE_DECK} from "../actions";

export default (state= {}, action) => {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.data
    case ADD_DECK:
      return {
        ...state,
        [action.key]: {
          ...action.deck
        },
      }
    case REMOVE_DECK:
      const {[action.key]: value, ...newState} = state
      return {
        ...newState,
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          questions: state[action.key].questions.concat([action.question])
        }
      }
  }
}