<script>
    import {letterState} from './stores';
    export let language;
    let alphabet = "УЕИШЩКСДЗЦЯАОЖГТНВМЧЮЙЪЬФХПРЛБ";
    $: alphabet = language === "bg" ? "УЕИШЩКСДЗЦЯАОЖГТНВМЧЮЙЪЬФХПРЛБ" : "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ";
    $: rows = language === "bg" ? alphabet.split(/(?<=Ц|Ч)/) : alphabet.split(/(?<=Κ|Π)/)
    function pressKey(letter){
        const event = new Event('keydown')
        event.key = letter
        document.dispatchEvent(event)
    }
</script>
<main>
    <div class="row">
    <div>
    {#each rows as row}
        <div class="row">
        {#each row as letter}
            <div on:click={(e)=>pressKey(letter)} class={`cell ${$letterState[letter]}`}>{letter}</div>
        {/each}  
        </div>
    {/each}
    </div>
    </div>
    <div class="row">
        <div class="cell" on:click={(e)=>pressKey("Backspace")}>Del</div>
        <div class="cell" on:click={(e)=>pressKey("Enter")}>Enter</div>
    </div>
</main>
<style>
.row {
    display: flex;
    flex-direction: row;
    gap: .5rem;
    margin: .25rem;
    max-width: 95vw;
}
.cell{
    border-style: solid;
    border-radius: 10%;
    border-color: black;
    border-width: 1px;
    height: 2rem;
    width: 2rem;
    padding: 3px;
    text-align: center;
    display: flex;        
    align-items: center;
    justify-content: center;
    text-emphasis: top;
    -webkit-user-select: none; /* Safari */        
-moz-user-select: none; /* Firefox */
-ms-user-select: none; /* IE10+/Edge */
user-select: none; /* Standard */
}
.yellow{
    background-color: yellow;
}
.green{
    background-color: green;
}
.grey{
    background-color: grey;
}
</style>