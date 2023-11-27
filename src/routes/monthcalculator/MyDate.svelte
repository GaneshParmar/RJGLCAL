<script lang="ts">
	import { A, Input } from 'flowbite-svelte';

	export let date_: Date | null | string;
	export let startDate_: Date | null;
	export let defaultToday : boolean;

	let changedDate: Date | null;


	const changeDateToCurrent = () => {
		const currentDate = new Date();
		// date_ = currentDate;
		// Format the date in "yyyy-MM-dd" and set it as the input value
		const formattedDate = currentDate.toISOString().split('T')[0];
        date_ = formattedDate;
	};

	if(defaultToday){
		changeDateToCurrent()
	}
</script>

<span class="lg:inline-block md:m-auto m-2  lg:w-96">
	<Input
		datepicker
		type="text"
		bind:value={date_}
		required
	/>
	
	<A on:click={changeDateToCurrent}>( Now )</A>
</span>
