import {ADD_DECK, RECEIVE_DATA} from "../actions";

export default (state= {}, action) => {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.data
    case ADD_DECK:
      return {
        ...state,
        [action.deck.id]: {
          ...action.deck
        },
      }
  }
}