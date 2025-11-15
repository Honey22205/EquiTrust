
import { LoanApplication, Decision, FeatureContribution, ConsentSettings } from '../types';

// Simulate the core Explainability-First Engine (XFE)
export const simulateLoanDecision = (application: LoanApplication, consents: ConsentSettings): Decision => {
  const { creditScore, income, dti, existingProducts } = application;
  const contributions: FeatureContribution[] = [];

  let score = 0;

  // Base score on credit score
  const creditScoreImpact = (creditScore - 650) * 0.5;
  score += creditScoreImpact;
  contributions.push({ name: 'Credit Score', impact: creditScoreImpact });

  // Use income only if consented
  if (consents.useIncome) {
    const incomeImpact = (income / 2000);
    score += incomeImpact;
    contributions.push({ name: 'Annual Income', impact: incomeImpact });
  } else {
    contributions.push({ name: 'Annual Income', impact: 0 });
  }

  // DTI has a negative impact
  const dtiImpact = (dti - 30) * -2;
  score += dtiImpact;
  contributions.push({ name: 'Debt-to-Income', impact: dtiImpact });

  // Existing products have a positive impact
  const productsImpact = existingProducts * 10;
  score += productsImpact;
  contributions.push({ name: 'Existing Products', impact: productsImpact });
  
  // Spending habits (if consented) give a small bonus
  if(consents.useSpendingHabits) {
    const spendingHabitsImpact = 15;
    score += spendingHabitsImpact;
    contributions.push({ name: 'Spending Habits Analysis', impact: spendingHabitsImpact });
  } else {
    contributions.push({ name: 'Spending Habits Analysis', impact: 0 });
  }


  let decision: 'Approved' | 'Denied' | 'Referred' = 'Referred';
  if (score > 100) {
    decision = 'Approved';
  } else if (score < 0) {
    decision = 'Denied';
  }

  const naturalLanguageExplanation = generateExplanation(decision, contributions, consents);

  return {
    decision,
    naturalLanguageExplanation,
    featureContributions: contributions,
  };
};

const generateExplanation = (decision: string, contributions: FeatureContribution[], consents: ConsentSettings): string => {
  const sortedFactors = [...contributions]
    .filter(c => c.impact !== 0)
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));
    
  const topPositive = contributions.filter(c => c.impact > 0).sort((a,b) => b.impact - a.impact)[0];
  const topNegative = contributions.filter(c => c.impact < 0).sort((a,b) => a.impact - b.impact)[0];
  
  switch (decision) {
    case 'Approved':
      return `Congratulations! Your loan has been approved. The key factor in this decision was your excellent ${topPositive?.name.toLowerCase() || 'profile'}. We also considered your ${sortedFactors[1]?.name.toLowerCase() || 'financial health'}, which strengthened your application.`;
    case 'Denied':
      return `We're unable to approve your application at this time. The primary reason was the impact of your ${topNegative?.name.toLowerCase() || 'profile details'}. We recommend focusing on this area. We value your business and invite you to reapply in the future.`;
    case 'Referred':
      return `Your application requires a bit more review, so we've referred it to one of our loan specialists who will be in touch shortly. While you have strengths like your ${topPositive?.name.toLowerCase() || 'profile'}, there are areas such as your ${topNegative?.name.toLowerCase() || 'profile'} that need a closer look.`;
    default:
      return 'The decision process has been completed.';
  }
};


// Simulate AI profile explanation for DCI
export const getAIProfile = (consents: ConsentSettings): string => {
  let profile = "Based on the data you've shared, our system sees you as a valued customer. ";
  
  if (consents.useIncome && consents.useSpendingHabits) {
    profile += "With insights from your income and spending habits, we can identify you as a 'Low-Risk, High-Growth Customer', which helps us offer you better rates.";
  } else if (consents.useIncome) {
    profile += "By analyzing your income, we've classified you as a 'Stable Customer', allowing us to pre-qualify you for certain products.";
  } else {
    profile += "The more data you feel comfortable sharing, the more personalized our insights and offers can become. You are always in control.";
  }
  return profile;
};
