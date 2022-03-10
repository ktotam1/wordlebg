<script>
    export let language;
    import {wordListBg} from './bg.js'
    import {wordListGr} from './gr.js'
    import Row from './Row.svelte'
    let wordList = wordListBg;
    $: wordList = language === "bg" ? wordListBg : wordListGr;
    let attempt = 0
    let states = Array(6).fill("guessing")
    let fiveWords = wordList.filter(x => x.length === 5)
    $: fiveWords = wordList.filter(x => x.length === 5)
    let answer;
    $: fiveWords[Math.floor(Math.random()*fiveWords.length)].toUpperCase()
    let letter = 0
    let words = Array(6).fill("")
    let alphabet;
    $: alphabet = language === "bg" ?  "АБВГДЕЖЗИЙКЛМНОабвгдежзийклмноПРСТУФХЦЧШЩЪЬЮЯяюьъшщчцхфутсрп" : "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω"
    function handleKeyPress(e,answer){
        const pressed = e.key
        if(letter > 0 && pressed === "Backspace"){
            words[attempt] = words[attempt].slice(0,-1)
            words = words;
            letter -= 1
        }
        if(letter < 5 && alphabet.includes(pressed)) { 
            words[attempt] = words[attempt] + pressed.toUpperCase()
            words = words;
            letter += 1
        }
        if(letter === 5 && pressed === "Enter"){
            
            if(isWord(words[attempt].toUpperCase())){
                letter = 0
                states[attempt] = "not guessing"
                if(words[attempt].toUpperCase()===answer.toUpperCase()){
                    alert("you win!")
                }
                attempt += 1
                
            }
            else{
                alert("not a word!")
            }
            if (attempt === 6 && words[5].toUpperCase() !== answer.toUpperCase()){
                alert("you lose! word was: "+ answer) 
            }
        }
    }

    function isWord(word){
        let newList = wordList.map((x)=>x.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        return newList.includes(word.toLowerCase())
    }

    $: document.onkeydown = (e) => handleKeyPress(e,answer)
</script>
<main>
    {#each [...Array(6).keys()] as i}
        <Row answer={answer} word={words[i]} state={states[i]}></Row>
    {/each}
</main>
<style>

</style>