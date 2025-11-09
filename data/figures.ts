import { FigureRepresentation } from '@/types/shorthand';

export const figuresData: FigureRepresentation[] = [
  // ==========================================
  // GENERAL RULE
  // ==========================================
  
  {
    id: 'fig_rule_1',
    value: 'General Rule',
    representation: 'Arabic numerals or shorthand digits',
    description: 'Figures 0-9, except 0 and 8, are best written in shorthand. Other numbers, except round numbers, are represented by the ordinary Arabic numerals.',
    category: 'digit',
  },
  
  // ==========================================
  // INDIVIDUAL DIGITS (0-9)
  // ==========================================
  
  {
    id: 'fig_digit_0',
    value: '0',
    representation: 'Arabic numeral 0',
    description: 'Zero is written as Arabic numeral 0 (not in shorthand)',
    category: 'digit',
    example: '0',
  },
  {
    id: 'fig_digit_1',
    value: '1',
    representation: 'Shorthand stroke',
    description: 'One is written in shorthand stroke form',
    category: 'digit',
    example: '1',
  },
  {
    id: 'fig_digit_2',
    value: '2',
    representation: 'Shorthand stroke',
    description: 'Two is written in shorthand stroke form',
    category: 'digit',
    example: '2',
  },
  {
    id: 'fig_digit_3',
    value: '3',
    representation: 'Shorthand stroke',
    description: 'Three is written in shorthand stroke form',
    category: 'digit',
    example: '3',
  },
  {
    id: 'fig_digit_4',
    value: '4',
    representation: 'Shorthand stroke',
    description: 'Four is written in shorthand stroke form',
    category: 'digit',
    example: '4',
  },
  {
    id: 'fig_digit_5',
    value: '5',
    representation: 'Shorthand stroke',
    description: 'Five is written in shorthand stroke form',
    category: 'digit',
    example: '5',
  },
  {
    id: 'fig_digit_6',
    value: '6',
    representation: 'Shorthand stroke',
    description: 'Six is written in shorthand stroke form',
    category: 'digit',
    example: '6',
  },
  {
    id: 'fig_digit_7',
    value: '7',
    representation: 'Shorthand stroke',
    description: 'Seven is written in shorthand stroke form',
    category: 'digit',
    example: '7',
  },
  {
    id: 'fig_digit_8',
    value: '8',
    representation: 'Arabic numeral 8',
    description: 'Eight is written as Arabic numeral 8 (not in shorthand)',
    category: 'digit',
    example: '8',
  },
  {
    id: 'fig_digit_9',
    value: '9',
    representation: 'Shorthand stroke',
    description: 'Nine is written in shorthand stroke form',
    category: 'digit',
    example: '9',
  },
  
  // ==========================================
  // ROUND NUMBERS - HUNDRED
  // ==========================================
  
  {
    id: 'fig_hundred_1',
    value: 'hundred or hundredth',
    representation: ') symbol',
    description: 'A curved parenthesis ) is used to represent hundred or hundredth',
    category: 'round-number',
    example: 'e.g., )-700 means 700',
  },
  {
    id: 'fig_hundred_2',
    value: '£200',
    representation: '2)-£200',
    description: 'Two hundred pounds represented with 2) before £200',
    category: 'currency',
    example: '2)-£200',
  },
  
  // ==========================================
  // ROUND NUMBERS - THOUSAND
  // ==========================================
  
  {
    id: 'fig_thousand_1',
    value: 'thousand',
    representation: '( symbol',
    description: 'A curved parenthesis ( is used to represent thousand',
    category: 'round-number',
    example: 'e.g., 5( = 5000',
  },
  {
    id: 'fig_thousand_2',
    value: '5000',
    representation: '5(',
    description: 'Five thousand represented as 5(',
    category: 'round-number',
    example: '5( = 5000',
  },
  {
    id: 'fig_thousand_3',
    value: '£2000',
    representation: '£5(',
    description: 'Two thousand pounds represented as £5(',
    category: 'currency',
    example: '£5( = £2000',
  },
  {
    id: 'fig_thousand_4',
    value: '300,000',
    representation: '3(',
    description: 'Three hundred thousand represented as 3(',
    category: 'round-number',
    example: '3( = 300,000',
  },
  
  // ==========================================
  // ROUND NUMBERS - MILLION
  // ==========================================
  
  {
    id: 'fig_million_1',
    value: 'million',
    representation: '≈ symbol (for million)',
    description: 'A wavy line ≈ is used to represent million',
    category: 'round-number',
    example: 'e.g., ≈ for million',
  },
  {
    id: 'fig_million_2',
    value: '4,000,000',
    representation: '≈ 4000000',
    description: 'Four million represented with ≈ symbol',
    category: 'round-number',
    example: '≈ 4000000',
  },
  {
    id: 'fig_million_3',
    value: '2½ million',
    representation: '2≈',
    description: 'Two and a half million represented as 2≈',
    category: 'round-number',
    example: '2≈ 2½ million',
  },
  
  // ==========================================
  // ROUND NUMBERS - BILLION
  // ==========================================
  
  {
    id: 'fig_billion_1',
    value: 'billion',
    representation: '≈≈ symbol (for billion)',
    description: 'A double wavy line ≈≈ is used to represent billion',
    category: 'round-number',
    example: 'e.g., ≈≈ for billion',
  },
  {
    id: 'fig_billion_2',
    value: 'two billion',
    representation: '≈≈ two billion',
    description: 'Two billion represented with ≈≈ symbol',
    category: 'round-number',
    example: '≈≈ two billion',
  },
  {
    id: 'fig_billion_3',
    value: 'two billion dollars',
    representation: '2≈≈',
    description: 'Two billion dollars represented as 2≈≈',
    category: 'currency',
    example: '2≈≈ two billion dollars',
  },
  
  // ==========================================
  // FRACTIONS AND PERCENTAGES
  // ==========================================
  
  {
    id: 'fig_fraction_half',
    value: '½',
    representation: 'dash above the figure',
    description: 'A dash above the figure to which the half belongs indicates a half',
    category: 'fraction',
    example: '— indicates ½',
  },
  {
    id: 'fig_fraction_half_example',
    value: '1½',
    representation: '1 with dash above',
    description: 'One and a half represented with dash above 1',
    category: 'fraction',
    example: '1— = 1½',
  },
  {
    id: 'fig_percentage_half',
    value: '.5',
    representation: '.5',
    description: 'Half represented as decimal .5',
    category: 'fraction',
    example: '.5 = ½',
  },
  
  {
    id: 'fig_percent_quarter_initial',
    value: '¼%',
    representation: 'dash with initial tick above',
    description: 'A dash with an initial tick above the figure represents ¼%',
    category: 'percentage',
    example: '1— (with initial tick) = 1¼%',
  },
  {
    id: 'fig_percent_quarter_example_1',
    value: '1¼%',
    representation: '1 with dash and initial tick',
    description: 'One and a quarter percent',
    category: 'percentage',
    example: '1¼%',
  },
  {
    id: 'fig_percent_quarter_example_4',
    value: '4¼%',
    representation: '4 with dash and initial tick',
    description: 'Four and a quarter percent',
    category: 'percentage',
    example: '4¼%',
  },
  
  {
    id: 'fig_percent_threequarter_final',
    value: '¾%',
    representation: 'dash with final tick',
    description: 'A dash with a final tick above the figure represents ¾%',
    category: 'percentage',
    example: '3— (with final tick) = 3¾%',
  },
  {
    id: 'fig_percent_threequarter_example_3',
    value: '3¾%',
    representation: '3 with dash and final tick',
    description: 'Three and three quarters percent',
    category: 'percentage',
    example: '3¾%',
  },
  {
    id: 'fig_percent_threequarter_example_7',
    value: '7¾%',
    representation: '7 with dash and final tick',
    description: 'Seven and three quarters percent',
    category: 'percentage',
    example: '7¾%',
  },
  
  {
    id: 'fig_percent_half_example',
    value: '8½%',
    representation: '8 with dash above',
    description: 'Eight and a half percent',
    category: 'percentage',
    example: '8½%',
  },
  
  // ==========================================
  // STANDARD PERCENTAGES
  // ==========================================
  
  {
    id: 'fig_percent_14',
    value: '14%',
    representation: '14',
    description: 'Fourteen percent written as standard number',
    category: 'percentage',
    example: '14',
  },
  {
    id: 'fig_percent_24',
    value: '24%',
    representation: '24',
    description: 'Twenty-four percent written as standard number',
    category: 'percentage',
    example: '24',
  },
  {
    id: 'fig_percent_34',
    value: '34%',
    representation: '34',
    description: 'Thirty-four percent written as standard number',
    category: 'percentage',
    example: '34%',
  },
];
