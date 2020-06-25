import {AsyncStorage} from "react-native-web";

const CARDS_STORAGE_KEY = 'reactND-mobile-flashcards:cards'

export function getEntries () {
    return AsyncStorage.getItem(CARDS_STORAGE_KEY)
}
