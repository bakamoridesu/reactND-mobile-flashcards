import {AsyncStorage} from "react-native-web";

const CARDS_STORAGE_KEY = 'reactND-mobile-flashcards:cards'

export function submitEntry( { key } ) {
    return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
        [key]: [],
    }))
}

export function getEntries () {
    return AsyncStorage.getItem(CARDS_STORAGE_KEY)
}
