import { writable } from 'svelte/store';
const alphabet = "УЕИШЩКСДЗЦЯАОЖГТНВМЧЮЙЪЬФХПРЛБ";

const DEFAULT_STATE = alphabet.split("").reduce((prev, next) => ({...prev, [next]: ""}), {})

function createStore() {
    const {subscribe, set, update} = writable({...DEFAULT_STATE})

    return {
        subscribe,
        setCorrect: (letter) => update((o) => ({...o, [letter.toUpperCase()]: "green"})),
        setUsed: (letter) => update((o) => {
            if(o[letter.toUpperCase()] !== "green"){ 
                return ({...o, [letter.toUpperCase()]: "yellow"})
            }
            return o
        }),
        setIncorrect: (letter) => update((o) => {
            if(o[letter] !== "green" && o[letter.toUpperCase()] !== "yellow") {        
                return ({...o, [letter.toUpperCase()]: "grey"})
            }
            return o
        }),
        reset: () => set(DEFAULT_STATE)   
    }
}

export const letterState = createStore();