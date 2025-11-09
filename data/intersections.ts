import { Intersection } from '@/types/shorthand';

export const intersectionsData: Intersection[] = [
  // ==========================================
  // INTERSECTIONS
  // Source: Pitman Shorthand Book - Intersections
  // A single stroke may represent a complete word when written 
  // through or written close to another outline. It is a special 
  // device to avoid clashes and duplications of words of joined consonants.
  // An intersection may be helpful if intersections through words 
  // are written through the first stroke if the intersection is 
  // read first or through the final stroke if the intersection is read second.
  // ==========================================
  
  // ==========================================
  // PRIMARY INTERSECTIONS - The 3 Main Intersections
  // Source: Various units in Pitman Shorthand Book
  // ==========================================
  
  {
    id: 'int_1',
    word: 'company',
    intersectedStroke: 'K',
    strokeName: 'kay',
    description: 'Intersected K represents "company"',
    usage: 'Written through another outline to indicate the word "company"',
    examples: [
      'Lake Company',
      'usual company',
      'nail company', 
      'in the company',
      'Boot Company Limited'
    ],
    position: 'Through first stroke if read first, through final stroke if read second',
    category: 'primary',
    source: 'Textbook Intersections',
  },
  
  {
    id: 'int_2',
    word: 'department',
    intersectedStroke: 'D',
    strokeName: 'dee',
    description: 'Intersected D represents "department"',
    usage: 'Written through another outline to indicate the word "department"',
    examples: [
      'Wage Department',
      'mail department',
      'sales department',
      'the department'
    ],
    position: 'Through first stroke if read first, through final stroke if read second',
    category: 'primary',
    source: 'Textbook Intersections',
  },
  
  {
    id: 'int_3',
    word: 'limited',
    intersectedStroke: 'L',
    strokeName: 'el',
    description: 'Intersected L represents "limited"',
    usage: 'Written through another outline to indicate the word "limited"',
    examples: [
      'Data Limited',
      'Boot Company Limited',
      'Smith Limited',
      'Jones & Co. Limited'
    ],
    position: 'Through first stroke if read first, through final stroke if read second',
    category: 'primary',
    source: 'Textbook Intersections',
  },
  
  // ==========================================
  // UNIT 5 INTERSECTIONS
  // Source: Unit 5 - Pitman Shorthand Book
  // ==========================================
  
  {
    id: 'int_u5_1',
    word: 'party',
    intersectedStroke: 'P',
    strokeName: 'pee',
    description: 'P represents "party"',
    usage: 'Intersected P stroke to indicate the word "party"',
    examples: [
      'big party',
      'the party',
      'political party',
      'party members'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 5',
  },
  
  {
    id: 'int_u5_2',
    word: 'bank',
    intersectedStroke: 'B',
    strokeName: 'bee',
    description: 'B represents "bank"',
    usage: 'Intersected B stroke to indicate the word "bank"',
    examples: [
      'at the bank',
      'the bank',
      'bank account',
      'to the bank'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 5',
  },
  
  {
    id: 'int_u5_3',
    word: 'bank, policy',
    intersectedStroke: 'B or P',
    strokeName: 'bee or pee',
    description: 'B or P represents "bank" or "policy"',
    usage: 'Intersected B or P stroke - B for bank, P for policy',
    examples: [
      'bank policy',
      'insurance policy',
      'policy statement',
      'bank details'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 5',
  },
  
  // ==========================================
  // UNIT 6 INTERSECTIONS
  // Source: Unit 6 - Pitman Shorthand Book
  // ==========================================
  
  {
    id: 'int_u6_1',
    word: 'business',
    intersectedStroke: 'B',
    strokeName: 'bee',
    description: 'B represents "business"',
    usage: 'Intersected B stroke to indicate the word "business"',
    examples: [
      'the business',
      'big business',
      'business meeting',
      'in business'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 6',
  },
  
  {
    id: 'int_u6_2',
    word: 'form',
    intersectedStroke: 'F',
    strokeName: 'ef',
    description: 'F represents "form"',
    usage: 'Intersected F stroke to indicate the word "form"',
    examples: [
      'in the form',
      'customs form',
      'application form',
      'the form'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 6',
  },
  
  {
    id: 'int_u6_3',
    word: 'government',
    intersectedStroke: 'G',
    strokeName: 'gay',
    description: 'G represents "government"',
    usage: 'Intersected G stroke to indicate the word "government"',
    examples: [
      'this government',
      'the government',
      'government policy',
      'local government'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 6',
  },
  
  {
    id: 'int_u6_4',
    word: 'town',
    intersectedStroke: 'T',
    strokeName: 'tee',
    description: 'T represents "town"',
    usage: 'Intersected T stroke to indicate the word "town"',
    examples: [
      'in the town',
      'the town',
      'town hall',
      'town centre'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 6',
  },
  
  {
    id: 'int_u6_5',
    word: 'loan',
    intersectedStroke: 'L',
    strokeName: 'el',
    description: 'L represents "loan"',
    usage: 'Intersected L stroke to indicate the word "loan"',
    examples: [
      'loan business',
      'bank loan',
      'the loan',
      'loan agreement'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 6',
  },
  
  {
    id: 'int_u6_6',
    word: 'balance, insurance',
    intersectedStroke: 'Upward R',
    strokeName: 'ray (upward)',
    description: 'Upward R represents "balance" or "insurance"',
    usage: 'Intersected upward R stroke to indicate "balance" or "insurance"',
    examples: [
      'balance government',
      'this insurance',
      'bank balance',
      'insurance policy'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 6',
  },
  
  // ==========================================
  // UNIT 7 INTERSECTIONS
  // Source: Unit 7 - Pitman Shorthand Book
  // ==========================================
  
  {
    id: 'int_u7_1',
    word: 'arrangement',
    intersectedStroke: 'Downward R',
    strokeName: 'ray (downward)',
    description: 'Downward R represents "arrangement"',
    usage: 'Intersected downward R stroke to indicate the word "arrangement"',
    examples: [
      'make arrangements',
      'the arrangement',
      'special arrangement',
      'by arrangement'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 7',
  },
  
  {
    id: 'int_u7_2',
    word: 'arranged',
    intersectedStroke: 'S',
    strokeName: 'ess',
    description: 'S represents "arranged"',
    usage: 'Intersected S stroke to indicate the word "arranged"',
    examples: [
      'we have arranged',
      'already arranged',
      'arranged meeting',
      'as arranged'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 7',
  },
  
  {
    id: 'int_u7_3',
    word: 'arrange',
    intersectedStroke: 'X',
    strokeName: 'eks',
    description: 'X represents "arrange"',
    usage: 'Intersected X stroke to indicate the word "arrange"',
    examples: [
      'we arrange',
      'to arrange',
      'please arrange',
      'arrange appointment'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 7',
  },
  
  {
    id: 'int_u7_4',
    word: 'requirement',
    intersectedStroke: 'Upward R',
    strokeName: 'ray (upward)',
    description: 'Upward R represents "requirement"',
    usage: 'Intersected upward R stroke to indicate the word "requirement"',
    examples: [
      'your requirements',
      'the requirement',
      'meet requirements',
      'specific requirement'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 7',
  },
  
  {
    id: 'int_u7_5',
    word: 'required',
    intersectedStroke: 'H',
    strokeName: 'aych',
    description: 'H represents "required"',
    usage: 'Intersected H stroke to indicate the word "required"',
    examples: [
      'they required',
      'as required',
      'documents required',
      'if required'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 7',
  },
  
  {
    id: 'int_u7_6',
    word: 'require',
    intersectedStroke: 'J',
    strokeName: 'jay',
    description: 'J represents "require"',
    usage: 'Intersected J stroke to indicate the word "require"',
    examples: [
      'we shall require',
      'may require',
      'require assistance',
      'require information'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 7',
  },
  
  // ==========================================
  // UNIT 8 INTERSECTIONS
  // Source: Unit 8 - Pitman Shorthand Book
  // ==========================================
  
  {
    id: 'int_u8_1',
    word: 'charge',
    intersectedStroke: 'CH',
    strokeName: 'chay',
    description: 'CH represents "charge"',
    usage: 'Intersected CH stroke to indicate the word "charge"',
    examples: [
      'the charge',
      'no charge',
      'in charge',
      'service charge'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 8',
  },
  
  {
    id: 'int_u8_2',
    word: 'attention',
    intersectedStroke: 'T',
    strokeName: 'tee',
    description: 'T represents "attention"',
    usage: 'Intersected T stroke to indicate the word "attention"',
    examples: [
      'for your attention',
      'attention to detail',
      'immediate attention',
      'attention please'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 8',
  },
  
  {
    id: 'int_u8_3',
    word: 'large',
    intersectedStroke: 'SH',
    strokeName: 'ish',
    description: 'SH represents "large"',
    usage: 'Intersected SH stroke to indicate the word "large"',
    examples: [
      'in the letter',
      'large amount',
      'large order',
      'large scale'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 8',
  },
  
  // ==========================================
  // UNIT 9 INTERSECTIONS
  // Source: Unit 9 - Pitman Shorthand Book
  // ==========================================
  
  {
    id: 'int_u9_1',
    word: 'society',
    intersectedStroke: 'S',
    strokeName: 'ess',
    description: 'Stroke S represents "society"',
    usage: 'Intersected S stroke to indicate the word "society"',
    examples: [
      'this society',
      'the society',
      'society meeting',
      'building society'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 9',
  },
  
  {
    id: 'int_u9_2',
    word: 'our society',
    intersectedStroke: 'X',
    strokeName: 'eks',
    description: 'X represents "our society"',
    usage: 'Intersected X stroke to indicate "our society"',
    examples: [
      'our society',
      'in our society',
      'our society members',
      'our society meeting'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 9',
  },
  
  // ==========================================
  // UNIT 10 INTERSECTIONS
  // Source: Unit 10 - Pitman Shorthand Book
  // ==========================================
  
  {
    id: 'int_u10_1',
    word: 'month',
    intersectedStroke: 'M',
    strokeName: 'em',
    description: 'M represents "month"',
    usage: 'Intersected M stroke to indicate the word "month"',
    examples: [
      'for the month',
      'this month',
      'next month',
      'last month'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 10',
  },
  
  {
    id: 'int_u10_2',
    word: 'authority',
    intersectedStroke: 'TH',
    strokeName: 'thee',
    description: 'TH represents "authority"',
    usage: 'Intersected TH stroke to indicate the word "authority"',
    examples: [
      'no authority',
      'the authority',
      'local authority',
      'proper authority'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 10',
  },
  
  {
    id: 'int_u10_3',
    word: 'morning',
    intersectedStroke: 'N',
    strokeName: 'en',
    description: 'N represents "morning"',
    usage: 'Intersected N stroke to indicate the word "morning"',
    examples: [
      'Monday morning',
      'this morning',
      'good morning',
      'morning meeting'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 10',
  },
  
  {
    id: 'int_u10_4',
    word: 'authority',
    intersectedStroke: 'K',
    strokeName: 'kay',
    description: 'K represents "authority"',
    usage: 'Intersected K stroke to indicate the word "authority"',
    examples: [
      'or authority',
      'with authority',
      'authority granted',
      'full authority'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 10',
  },
  
  {
    id: 'int_u10_5',
    word: 'manager',
    intersectedStroke: 'T',
    strokeName: 'tee',
    description: 'T represents "manager"',
    usage: 'Intersected T stroke to indicate the word "manager"',
    examples: [
      'sales manager',
      'the manager',
      'general manager',
      'branch manager'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 10',
  },
  
  {
    id: 'int_u10_6',
    word: 'market',
    intersectedStroke: 'J',
    strokeName: 'jay',
    description: 'J represents "market"',
    usage: 'Intersected J stroke to indicate the word "market"',
    examples: [
      'market research',
      'the market',
      'market price',
      'market analysis'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 10',
  },
  
  // ==========================================
  // UNIT 11 INTERSECTIONS
  // Source: Unit 11 - Pitman Shorthand Book
  // ==========================================
  
  {
    id: 'int_u11_1',
    word: 'national',
    intersectedStroke: 'N',
    strokeName: 'en',
    description: 'N represents "national"',
    usage: 'Intersected N stroke to indicate the word "national"',
    examples: [
      'national and others',
      'the national',
      'national office',
      'national level'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 11',
  },
  
  {
    id: 'int_u11_2',
    word: 'National Bank',
    intersectedStroke: 'J',
    strokeName: 'jay',
    description: 'J represents "National Bank"',
    usage: 'Intersected J stroke to indicate "National Bank"',
    examples: [
      'National Bank',
      'the National Bank',
      'National Bank account',
      'at National Bank'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 11',
  },
  
  {
    id: 'int_u11_3',
    word: 'your enquiry',
    intersectedStroke: 'X',
    strokeName: 'eks',
    description: 'X represents "your enquiry"',
    usage: 'Intersected X stroke to indicate "your enquiry" or "your inquiry"',
    examples: [
      'your enquiry',
      'regarding your enquiry',
      'your inquiry',
      'about your enquiry'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 11',
  },
  
  {
    id: 'int_u11_4',
    word: 'we shall enquire',
    intersectedStroke: 'K',
    strokeName: 'kay',
    description: 'K represents "we shall enquire"',
    usage: 'Intersected K stroke to indicate "we shall enquire" or "we shall inquire"',
    examples: [
      'we shall enquire',
      'we shall inquire',
      'we shall enquire further',
      'we shall enquire about'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 11',
  },
  
  // ==========================================
  // UNIT 14 INTERSECTIONS
  // Source: Unit 14 - Pitman Shorthand Book
  // ==========================================
  
  {
    id: 'int_u14_1',
    word: 'at the beginning',
    intersectedStroke: 'T',
    strokeName: 'tee',
    description: 'T represents "at the beginning"',
    usage: 'Intersected T stroke to indicate "at the beginning"',
    examples: [
      'at the beginning',
      'at the beginning of',
      'start at the beginning',
      'at the very beginning'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 14',
  },
  
  {
    id: 'int_u14_2',
    word: 'booked for, beginning',
    intersectedStroke: 'J',
    strokeName: 'jay',
    description: 'J represents "booked for" or "beginning"',
    usage: 'Intersected J stroke to indicate "booked for" or "beginning"',
    examples: [
      'by the beginning',
      'booked for',
      'the beginning',
      'beginning phase'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 14',
  },
  
  {
    id: 'int_u14_3',
    word: 'from the beginning',
    intersectedStroke: 'S',
    strokeName: 'ess',
    description: 'S represents "from the beginning"',
    usage: 'Intersected S stroke to indicate "from the beginning"',
    examples: [
      'from the beginning',
      'start from the beginning',
      'from the very beginning',
      'right from the beginning'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 14',
  },
  
  // ==========================================
  // UNIT 18 INTERSECTIONS
  // Source: Unit 18 - Pitman Shorthand Book
  // ==========================================
  
  {
    id: 'int_u18_1',
    word: 'corporation',
    intersectedStroke: 'KR',
    strokeName: 'kay-ray',
    description: 'KR represents "corporation"',
    usage: 'Intersected KR stroke to indicate the word "corporation"',
    examples: [
      'public corporation',
      'the corporation',
      'corporation tax',
      'large corporation'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 18',
  },
  
  {
    id: 'int_u18_2',
    word: 'Business Systems plc',
    intersectedStroke: 'Circle',
    strokeName: 'circle (dot)',
    description: 'Circle represents "Business Systems plc"',
    usage: 'Intersected circle/dot to indicate "Business Systems plc"',
    examples: [
      'Business Systems plc',
      'at Business Systems plc',
      'Business Systems company',
      'Business Systems office'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 18',
  },
  
  {
    id: 'int_u18_3',
    word: 'hidden',
    intersectedStroke: 'L + S',
    strokeName: 'el-ess',
    description: 'L + S combination represents "hidden"',
    usage: 'Intersected L + S stroke combination',
    examples: [
      'hidden',
      'hidden costs',
      'hidden details',
      'hidden information'
    ],
    position: 'Through the outline',
    category: 'primary',
    source: 'Unit 18',
  },
  
  // ==========================================
  // COMMON INTERSECTION COMBINATIONS
  // Used frequently in business correspondence
  // ==========================================
  
  {
    id: 'int_combo_1',
    word: 'Company Limited',
    intersectedStroke: 'K + L',
    strokeName: 'kay + el',
    description: 'Intersected K and L together represent "Company Limited"',
    usage: 'Common in business names - K for Company, L for Limited',
    examples: [
      'Boot Company Limited',
      'Trading Company Limited',
      'Manufacturing Company Limited'
    ],
    position: 'K through main outline, L through K',
    category: 'combination',
    source: 'Textbook Intersections',
  },
  
  // ==========================================
  // NOTES ON INTERSECTION USAGE
  // Important rules and guidelines
  // ==========================================
  
  {
    id: 'int_note_1',
    word: 'Intersection Rules',
    intersectedStroke: 'General',
    strokeName: 'info',
    description: 'General rules for using intersections',
    usage: 'Intersections are a special device to avoid clashes and duplications of words. They help when writing business terms quickly.',
    examples: [
      'Written through first stroke if intersection is read first',
      'Written through final stroke if intersection is read second',
      'Used to avoid confusion with similar outlines',
      'Common in business correspondence'
    ],
    position: 'Variable - depends on reading order',
    category: 'info',
  },
  
  // ==========================================
  // ADDITIONAL COMMON INTERSECTIONS
  // Based on standard Pitman usage
  // ==========================================
  
  {
    id: 'int_4',
    word: 'government',
    intersectedStroke: 'G',
    strokeName: 'gay',
    description: 'Intersected G may represent "government" in some contexts',
    usage: 'Used in phrases like "the government", "government department"',
    examples: [
      'the government',
      'government department',
      'local government'
    ],
    position: 'Through the outline as appropriate',
    category: 'extended',
  },
  
  {
    id: 'int_5',
    word: 'Mr / Mister',
    intersectedStroke: 'M',
    strokeName: 'em',
    description: 'Intersected M can represent "Mr" or "Mister"',
    usage: 'Common in correspondence and names',
    examples: [
      'Mr Smith',
      'Mr Jones',
      'Dear Mr'
    ],
    position: 'Before or through the surname outline',
    category: 'extended',
  },
  
  {
    id: 'int_6',
    word: 'number',
    intersectedStroke: 'N',
    strokeName: 'en',
    description: 'Intersected N can represent "number" (No.)',
    usage: 'Used for reference numbers, addresses',
    examples: [
      'Number 10',
      'reference number',
      'invoice number'
    ],
    position: 'Through the outline or before',
    category: 'extended',
  },
  
  {
    id: 'int_7',
    word: 'street',
    intersectedStroke: 'S',
    strokeName: 'ess',
    description: 'Intersected S can represent "Street" (St.)',
    usage: 'Common in addresses',
    examples: [
      'High Street',
      'Main Street',
      'Oxford Street'
    ],
    position: 'Through or after the street name',
    category: 'extended',
  },
  
  {
    id: 'int_8',
    word: 'road',
    intersectedStroke: 'R',
    strokeName: 'ray',
    description: 'Intersected R can represent "Road" (Rd.)',
    usage: 'Common in addresses',
    examples: [
      'Park Road',
      'London Road',
      'Station Road'
    ],
    position: 'Through or after the road name',
    category: 'extended',
  },
];
