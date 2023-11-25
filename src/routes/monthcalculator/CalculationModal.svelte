<script lang="ts">
	import { calculateInterest, calculateSimpleInterest } from '$lib/utils/FormulaUtlis';
	import {
		Button,
		Modal,
		Label,
		Input,
		Checkbox,
		Heading,
		P,
		Span,
		Breadcrumb,
		BreadcrumbItem,
		A,

		Hr

	} from 'flowbite-svelte';
	export let formModal: boolean;
	export let months: number;
	export let days: number;
	export let principle: number;
	export let rateOfInterest: number;

	let isCompoundInterest: boolean = false;

	let interest: number;

	let totalSum: number;

	const numberOfDaysDiscounted = 4;

	let monthsAfterExtraDays = 0;
	let penalty = false;

	let per_month_interest:number; 

	$: {
		if (numberOfDaysDiscounted <= days) {
			monthsAfterExtraDays = months + 1;
			penalty = true;
		} else {
			monthsAfterExtraDays = months;
			penalty = false;
		}

		per_month_interest = calculateSimpleInterest(principle,rateOfInterest,1);
	}

	function calculate() {
		interest = calculateInterest(
			principle,
			monthsAfterExtraDays,
			isCompoundInterest,
			rateOfInterest
		);
		if (typeof principle == 'string') {
			principle = parseInt(principle);
		}
		if (typeof interest == 'string') {
			interest = parseInt(interest);
		}
		totalSum = principle + interest;
	}
</script>

<Modal
	bind:open={formModal}
	on:close={() => {
		totalSum = 0;
	}}
	size="xs"
	autoclose={false}
	class="w-full"
>
	{#if !totalSum}
		<form class="flex flex-col space-y-6" action="#">
			<div class="flex justify-center gap-4">
				<div class="rounded-md border p-4 text-center border-gray-100">
					<Span>
						{months}
					</Span>
					<P>Months</P>
				</div>
				<div class="rounded-md border p-4 text-center border-gray-100">
					<Span>
						{days}
					</Span>
					<P>Days</P>
				</div>
				<Checkbox bind:checked={isCompoundInterest}>Compound Interest</Checkbox>
			</div>

			<div class="text-center">
				<Heading>
					{monthsAfterExtraDays} Months
				</Heading>
			</div>
			{#if penalty}
				<div class="inline-block text-center m-auto">
					<p>Note if more than {numberOfDaysDiscounted} days its calculated as full month</p>
					<Span highlight>Example 1 month {numberOfDaysDiscounted} days is 2 months</Span><br />
					Go to
					<A href="/settings">settings</A>
				</div>
			{/if}

			<Button on:click={calculate}>Continue</Button>
		</form>
	{:else}
		<div class="grid grid-cols-3 gap-4">

			<div class="col-span-2">Per month interest : </div>
			<div>{per_month_interest}</div>
			
			<div class="col-span-2">Total Number of months : </div>
			<div>{monthsAfterExtraDays} months</div>
			
			<div class="col-span-2">Principle (मूल) : </div>
			<div>Rs {principle} </div>
			
			<div class="col-span-2">Total Interest (ब्याज) : </div>
			<div>Rs {interest}</div>
			
			<div class="col-span-3">
				<Hr/>
			</div>
			
			<div class="col-span-2">
				Total (मूल + ब्याज) : 
			</div>
			
			<div>
				{totalSum}
			</div>
		</div>

	{/if}
</Modal>
