<script>
	import Game from './Game.svelte'
	import Keyboard from './Keyboard.svelte'
	import Modal,{getModal} from './Modal.svelte'
	import Switch from './Switch.svelte'
	let language = "bg"
	let checked = true
	$: language = checked ? "bg" : "gr"
</script>

<main class="centered"> 
		<h2 class="title">вордле</h2>
		<Switch bind:checked={checked}></Switch>
		<button  on:click={()=>getModal().open()} class="button">Как да играя?</button>
	<Modal >
		<p class="subtext">{"Познайте дума от пет букви. Натиснете enter. Ако една буква е в правилната позиция, тя ще стане зелена. Ако буквата е в думата, но не е в правилната позиция, тя ще стане жълта. Буквите, които не се появяват в думата, ще станат сиви. Имате шест предположения, за да разберете тайната дума!"}</p>
	</Modal>
	<Game language={language}></Game>
	<Keyboard language={language}></Keyboard>
</main>

<style>
	.centered{
		display: flex;
		flex-direction: column;
		align-items: center;
		max-height: 90vw;
	}
	.title{
		margin: 0;
	}


</style>


