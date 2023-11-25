export const calculateInterest = (
  principle: number,
  months: number,
  isCompoundInterest: boolean,
  ROI: number
): number => {
  if (isCompoundInterest) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    console.log(years);
    console.log(remainingMonths);
    let totalInterest = 0;

    // Calculate compound interest for each 12-month period
    for (let i = 0; i < years; i++) {
      const compoundInterest = calculateSimpleInterest(principle,ROI,12);
      totalInterest += compoundInterest;
      principle += compoundInterest; // Update the principle for the next 12 months
    }

    // Calculate simple interest for the remaining months
    const simpleInterestForRemainingMonths = calculateSimpleInterest(principle,ROI,remainingMonths);
    return totalInterest + simpleInterestForRemainingMonths;
  }

  // Assuming simple interest calculation for non-compound interest case
  return calculateSimpleInterest(principle,ROI,months);
};

export const calculateSimpleInterest=(principle:number,ROI:number,months:number):number=>{
  return (principle * ROI * months) / 100
}