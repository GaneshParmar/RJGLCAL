<script lang="ts">
	import { Button, Group, Input, Label, Radio, Span } from 'flowbite-svelte';
	import MyDate from './MyDate.svelte';
	import { calculateDiffBetweenDates } from '$lib/utils/DateUtilis';
	import CustomSelect from './CustomSelect.svelte';
	import CalculationModal from './CalculationModal.svelte';

	let startDate: Date;
	let endDate: Date;

	let rateOfInterest: number;
	let principle: number;

	let months: number;
	let days: number;

	let oranmentType:string = "gold"; 


	let formModalOpen:boolean;

	//
	function calculate(e:Event) {
		e.preventDefault();
		// md is month days json
		let md = calculateDiffBetweenDates(startDate, endDate);
		months = md.months;
		days = md.days;

		formModalOpen = true;
	}
</script>

<form on:submit={calculate}>

	<div class="grid gap-2 grid-cols-9 sm:grid-cols-9 m-5">



		<div class="grid-child col-span-9 my-5">
			<div class="grid gap-2 grid-cols-2">
				<div class="grid-child inline-block m-auto">
					<Radio bind:group={oranmentType} value={"gold"} name="gold">Gold</Radio>
				</div>
				<div class="grid-child inline-block m-auto">
					<Radio bind:group={oranmentType} value={"silver"} name="silver">Silver</Radio>
				</div>
			</div>

		</div>
		<div class="grid-child col-span-4 text-center">
			<Label for="first_name" class="mb-2">Principle Amount(Rs)</Label>
			<Input
				type="number"
				class="inline-block m-auto my-5 sm:w-50 lg:w-96"
				bind:value={principle}
				required
			/>
		</div>
		<div class="col-span-1 m-auto inline-block invisible sm:invisible">
			<svg
				class="w-[30px] h-[30px] text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 14 10"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					d="M1 5h12m0 0L9 1m4 4L9 9"
				/>
			</svg>
		</div>
		<div class="grid-child col-span-4 text-center">
			<Label for="first_name" class="mb-2">Rate Of Interest(%)</Label>
			<CustomSelect bind:rateOfInterest bind:oranmentType />
		</div>
		<div class="grid-child col-span-9 text-center sm:col-span-4">
			<Label tag="h4" customSize="text-4xl font-extrabold ">Start Date</Label>
			<MyDate bind:date_={startDate} startDate_={null} defaultToday={false}/>
		</div>
		<div class="col-span-1 m-auto inline-block invisible sm:visible">
			<svg
				class="w-[30px] h-[30px] text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 14 10"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					d="M1 5h12m0 0L9 1m4 4L9 9"
				/>
			</svg>
		</div>
		<div class="grid-child col-span-9 text-center sm:col-span-4">
			<Label tag="h4" customSize="text-4xl font-extrabold ">End Date</Label>
			<MyDate bind:date_={endDate} startDate_={startDate} defaultToday={true}/>
		</div>
	</div>
	
	<div class="flex justify-center mt-2">
		<!-- <div class="grid m-4 grid-cols-3 sm:grid-cols-1"> -->
		<Button type="submit" highlight >Calculate Interest</Button>
	</div>
</form>
<CalculationModal bind:formModal={formModalOpen} {months} {days} {principle} {rateOfInterest}/>

<style></style>
