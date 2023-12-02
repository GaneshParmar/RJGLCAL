<script lang="ts">
	import { formatDate, formatDateToString, parseDate } from '$lib/utils/DateUtilis';
	import { A, Input } from 'flowbite-svelte';

	export let date_: Date | null | string;
	export let startDate_: Date | null;
	export let defaultToday : boolean;

	let changedDate: Date | null;
	let dateString : string;

	const changeDateToCurrent = () => {
		const currentDate = new Date();
		// date_ = currentDate;
		// Format the date in "yyyy-MM-dd" and set it as the input value
		// const formattedDate = currentDate.toISOString().split('T')[0];
		dateString = formatDateToString(currentDate);
		date_ = parseDate(dateString);
	};

	if(defaultToday){
		changeDateToCurrent()
	}

	function handleOnInput(){
		dateString = formatDate(dateString);
		date_ = parseDate(dateString);
		console.log(date_);
	}

</script>

<span class="lg:inline-block md:m-auto m-2  lg:w-96">
	<Input
		type="text"
		bind:value={dateString}
		required
		on:input={handleOnInput}
		placeholder="dd-mm-yyyy"
		maxLength={10}
		inputmode="numeric"
	/>
	
	<A on:click={changeDateToCurrent}>( Now )</A>
</span>
