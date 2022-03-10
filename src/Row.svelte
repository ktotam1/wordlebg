<script>
    import {letterState} from './stores';

    export let word;
    export let answer;
    export let state;
    let classes = Array(5).fill("cell")
    $: classes = classCalculator(state,answer,word) 
    function classCalculator(state,answer,word){
        if(state === "guessing"){
            return Array(5).fill("cell")
        }
        else{
            let cells = Array(5)
            let subtract = answer
            for(let i = 0; i < 5; i++){
                let str = ""
                word = word.toUpperCase()
                answer = answer.toUpperCase()
                if(word.charAt(i)===answer.charAt(i)){
                    str = " correct"
                    subtract = subtract.replace(word.charAt(i), '')
                    letterState.setCorrect(word.charAt(i))
                }
                cells[i] = "cell" + str
            }
            for(let i = 0; i < 5; i++){
                let str = ""
                word = word.toUpperCase()
                answer = answer.toUpperCase()
                if(subtract.includes(word.charAt(i))){
                    letterState.setUsed(word.charAt(i))

                    str = " move"
                    subtract = subtract.replace(word.charAt(i), '')
                }else{
                    letterState.setIncorrect(word.charAt(i))
                    str = " incorrect"
                }
                if(cells[i] !== "cell correct"){
                    cells[i] = "cell" + str
                }
            }
            return cells
        }
        
    }
</script>
<main>
    <div class="row">
        {#each [...Array(5).keys()] as i}
            {#if word.length > i}
                <div class={classes[i]}>{word.charAt(i)}</div>
            {:else}
                <div class="cell"></div>
            {/if}
        {/each}      
    </div>
</main>
<style>
    .cell{
        height: 3rem;
        width: 3rem;
        border-style: solid;
        border-width: 1px;
        border-color: black;
        background-color: white;
        padding: 3px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        text-emphasis: top;
    }
    .row{
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        border-spacing: 10px;
    }
    .correct {
        background-color: green;
    }
    .move{
        background-color: yellow;

    }
    .incorrect{
        background-color: grey;
    }
</style>