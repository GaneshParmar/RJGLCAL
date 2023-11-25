<script lang="ts">
	import { Input, Select } from 'flowbite-svelte';

	export let rateOfInterest: number;
	// roi --> Rate of interest
	let roi = [
		{ value: 2, name: '2 %' },
		{ value: 2.5, name: '2.5 %' },
		{ value: 3, name: '3 %' }
	];

    let isCustom : boolean = false;

    $:{
        if(rateOfInterest < 0 || rateOfInterest > 100){
            isCustom = true;
            rateOfInterest = 1;
        }
    }
</script>

<span class="inline-block m-auto my-5 sm:w-50 lg:w-96">
	{#if !isCustom}
		<Select id="countries" bind:value={rateOfInterest} placeholder="">
			{#each roi as { value, name }}
				<option {value}>{name}</option>
			{/each}
			<option value={-1}>Custom</option>
		</Select>
	{:else}
		<Input
			type="number"
			placeholder=""
            bind:value={rateOfInterest}
			required
		/>
	{/if}
</span>