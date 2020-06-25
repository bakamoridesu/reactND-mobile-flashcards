import {ADD_DECK, RECEIVE_DATA, REMOVE_DECK} from "../actions";

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
  }
}