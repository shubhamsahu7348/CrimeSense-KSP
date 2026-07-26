import { FIRRecord, RepeatOffender, PoliceStationInfo } from '../types';

export const INITIAL_POLICE_STATIONS: PoliceStationInfo[] = [
  {
    code: 'KA-BGR-KOR',
    name: 'Koramangala Police Station',
    district: 'Bengaluru City',
    range: 'Bengaluru Urban Range',
    shoName: 'Insp. R. Venkatesh',
    shoRank: 'Police Inspector',
    contact: '+91 80 2294 2530',
    activeCases: 14,
    solvedCases: 38,
  },
  {
    code: 'KA-BGR-IND',
    name: 'Indiranagar Police Station',
    district: 'Bengaluru City',
    range: 'Bengaluru Urban Range',
    shoName: 'Insp. Anand Kumar',
    shoRank: 'Police Inspector',
    contact: '+91 80 2294 2542',
    activeCases: 11,
    solvedCases: 42,
  },
  {
    code: 'KA-BGR-CYB',
    name: 'Cybercrime CID PS',
    district: 'Bengaluru City',
    range: 'Karnataka CID HQ',
    shoName: 'DySP Archana Murthy',
    shoRank: 'Deputy Superintendent of Police',
    contact: '+91 80 2209 4500',
    activeCases: 29,
    solvedCases: 18,
  },
  {
    code: 'KA-BGR-WFD',
    name: 'Whitefield Police Station',
    district: 'Bengaluru City',
    range: 'Bengaluru Urban Range',
    shoName: 'Insp. K. Praveen',
    shoRank: 'Police Inspector',
    contact: '+91 80 2294 2577',
    activeCases: 8,
    solvedCases: 24,
  },
  {
    code: 'KA-MYS-NZB',
    name: 'Nazarbad Police Station',
    district: 'Mysuru City',
    range: 'Southern Range Mysuru',
    shoName: 'Insp. Mahesh Gowda',
    shoRank: 'Police Inspector',
    contact: '+91 821 2418 312',
    activeCases: 6,
    solvedCases: 31,
  },
  {
    code: 'KA-MNG-URW',
    name: 'Urwa Police Station',
    district: 'Mangaluru City',
    range: 'Western Range Mangaluru',
    shoName: 'Insp. Devadas Shetty',
    shoRank: 'Police Inspector',
    contact: '+91 824 2220 801',
    activeCases: 7,
    solvedCases: 29,
  },
  {
    code: 'KA-HBL-SUB',
    name: 'Suburban Police Station',
    district: 'Hubballi-Dharwad',
    range: 'Northern Range Belagavi',
    shoName: 'Insp. Suresh Patil',
    shoRank: 'Police Inspector',
    contact: '+91 836 2233 410',
    activeCases: 5,
    solvedCases: 22,
  }
];

export const INITIAL_REPEAT_OFFENDERS: RepeatOffender[] = [
  {
    id: 'RO-001',
    name: "Ramesh alias 'Blade' Kumar",
    alias: 'Blade Ramesh',
    age: 34,
    riskLevel: 'Critical',
    linkedFIRs: ['KA-BGR-2026-00102', 'KA-BGR-2026-00108', 'KA-MYS-2026-00201'],
    primaryCrimeTypes: ['Chain Snatching', 'Robbery', 'House Theft'],
    lastKnownLocation: 'Koramangala 4th Block / Hosur Road border',
    status: 'Absconding',
    modusOperandiPattern: 'Operates on a stolen black TVS Apache motorcyle during morning peak hours (06:30 - 08:30 AM), targeting elderly pedestrians walking alone. Uses surgical blade for quick cut or direct snatching.'
  },
  {
    id: 'RO-002',
    name: 'Syed Imran Khan',
    alias: 'Cyber Imran / Tech Imran',
    age: 29,
    riskLevel: 'High',
    linkedFIRs: ['KA-BGR-2026-00101', 'KA-BGR-2026-00105', 'KA-MNG-2026-00302'],
    primaryCrimeTypes: ['Cyber Fraud', 'Financial Fraud'],
    lastKnownLocation: 'BTM Layout 2nd Stage, Bengaluru',
    status: 'In Custody',
    modusOperandiPattern: 'Creates fake APK links impersonating BESCOM electricity bill updates and FedEx package custom holds. Uses mule bank accounts registered in rural North Karnataka.'
  },
  {
    id: 'RO-003',
    name: 'Manjunath G.',
    alias: 'Crowbar Manja',
    age: 41,
    riskLevel: 'High',
    linkedFIRs: ['KA-BGR-2026-00103', 'KA-HBL-2026-00401'],
    primaryCrimeTypes: ['House Theft', 'Burglary'],
    lastKnownLocation: 'Peenya Industrial Area / Tumakuru Road',
    status: 'On Bail',
    modusOperandiPattern: 'Breaks lock latches of locked independent houses during weekends between 01:00 AM - 03:30 AM using customized heavy crowbars. Disables CCTV outdoor power lines prior to entry.'
  },
  {
    id: 'RO-004',
    name: "Vicky alias 'Ganja' Thomas",
    alias: 'Vicky Thomas',
    age: 26,
    riskLevel: 'Medium',
    linkedFIRs: ['KA-BGR-2026-00107', 'KA-MNG-2026-00301'],
    primaryCrimeTypes: ['Narcotics', 'Extortion'],
    lastKnownLocation: 'Ullal / Mangaluru University corridor',
    status: 'Absconding',
    modusOperandiPattern: 'Procures Hydroponic Weed and MDMA pills via darknet forums and dispatches via fake courier delivery boys to college students in Bengaluru and Mangaluru.'
  }
];

export const INITIAL_FIR_RECORDS: FIRRecord[] = [
  {
    id: 'FIR-001',
    firNumber: 'KA-BGR-2026-00101',
    policeStation: 'Cybercrime CID PS',
    district: 'Bengaluru City',
    crimeCategory: 'Cyber Fraud',
    subCategory: 'APK Electricity Bill Scam / Digital Arrest',
    sections: ['BNS 318(4)', 'IT Act 66D', 'BNS 319(2)'],
    incidentDate: '2026-01-14',
    incidentTime: '11:30 AM',
    filingDate: '2026-01-15',
    complainant: {
      name: 'Dr. S. Ranganathan',
      age: 62,
      contact: '+91 98450 11223',
      address: '7th Main, 3rd Block, Jayanagar, Bengaluru'
    },
    accused: [
      {
        name: 'Syed Imran Khan',
        alias: 'Cyber Imran',
        age: 29,
        status: 'Arrested',
        address: 'BTM Layout, Bengaluru',
        priorOffensesCount: 4,
        nationalId: 'AADHAAR-XX8841'
      },
      {
        name: 'Unknown Operator',
        alias: 'Call Center Handler',
        status: 'Absconding'
      }
    ],
    victims: [
      {
        name: 'Dr. S. Ranganathan',
        age: 62,
        injuryOrLoss: 'Financial Loss of ₹14,50,000 via RTGS transfer'
      }
    ],
    investigatingOfficer: {
      name: 'DySP Archana Murthy',
      rank: 'Deputy Superintendent of Police',
      badgeNo: 'KA-CID-4021'
    },
    placeOfOccurrence: 'Complainant Residence & ICICI Bank Account Online Transfer',
    caseStatus: 'Chargesheet Filed',
    modusOperandi: 'Victim received SMS threatening immediate electricity disconnection. Clicking link installed malicious BESCOM.apk which intercepted OTPs and allowed remote access to victim net banking.',
    evidenceItems: [
      'Mule ICICI Bank Account Statement (A/C: 39482010492)',
      'WhatsApp chat transcripts & malicious APK binary file',
      'SIM card registered on fake ID (Airtel +91 97112 88492)',
      'Seized Samsung Galaxy S21 used by accused'
    ],
    incidentSummary: 'Victim Dr. Ranganathan was defrauded of ₹14.5 Lakhs after installing a fraudulent BESCOM power bill update application. CID Cyber Crime tracked the mule account to Syed Imran Khan in BTM Layout. Accused arrested and ₹8.2 Lakhs frozen in destination accounts.'
  },
  {
    id: 'FIR-002',
    firNumber: 'KA-BGR-2026-00102',
    policeStation: 'Koramangala Police Station',
    district: 'Bengaluru City',
    crimeCategory: 'Chain Snatching',
    subCategory: 'Daylight Street Robbery on Motorbike',
    sections: ['BNS 304', 'BNS 309(4)', 'BNS 3(5)'],
    incidentDate: '2026-01-20',
    incidentTime: '07:15 AM',
    filingDate: '2026-01-20',
    complainant: {
      name: 'Mrs. Lakshmi Sundaram',
      age: 58,
      contact: '+91 99001 44512',
      address: '12th Main Road, Koramangala 4th Block, Bengaluru'
    },
    accused: [
      {
        name: "Ramesh alias 'Blade' Kumar",
        alias: 'Blade Ramesh',
        age: 34,
        status: 'Absconding',
        address: 'Hosur Road Border Slum, Anekal',
        priorOffensesCount: 7
      },
      {
        name: 'Pillion Rider - Unidentified Male',
        status: 'Unknown'
      }
    ],
    victims: [
      {
        name: 'Mrs. Lakshmi Sundaram',
        age: 58,
        injuryOrLoss: '38 grams Gold Mangalsutra (approx. ₹2,85,000) & minor cervical abrasion'
      }
    ],
    investigatingOfficer: {
      name: 'Insp. R. Venkatesh',
      rank: 'Police Inspector',
      badgeNo: 'KA-BGR-1102'
    },
    placeOfOccurrence: 'Near Ganapathi Temple, 12th Main, Koramangala 4th Block',
    caseStatus: 'Under Investigation',
    modusOperandi: 'Two riders on a black TVS Apache motorcycle without license plate approached victim during morning walk. Pillion rider slashed gold chain with surgical blade and sped toward Hosur Main Road.',
    evidenceItems: [
      'CCTV Footage from Koramangala 4th Block Junction Camera #4',
      'Surgical blade fragment recovered from street pavement',
      'Eyewitness statement from morning walker Mr. Gopinath'
    ],
    incidentSummary: 'Chain snatching reported at Koramangala 4th block. Pillion rider snatched 38g gold mangalsutra. Facial recognition match from CCTV indicates habitual offender Blade Ramesh. Special team deployed on Hosur Road.'
  },
  {
    id: 'FIR-003',
    firNumber: 'KA-BGR-2026-00103',
    policeStation: 'Indiranagar Police Station',
    district: 'Bengaluru City',
    crimeCategory: 'House Theft',
    subCategory: 'Night Burglary at Locked Residence',
    sections: ['BNS 331(4)', 'BNS 305'],
    incidentDate: '2026-02-02',
    incidentTime: '02:30 AM',
    filingDate: '2026-02-03',
    complainant: {
      name: 'Rajesh Malhotra',
      age: 44,
      contact: '+91 98860 33411',
      address: '100 Feet Road, Indiranagar, Bengaluru'
    },
    accused: [
      {
        name: 'Manjunath G.',
        alias: 'Crowbar Manja',
        age: 41,
        status: 'Named in FIR',
        priorOffensesCount: 5
      }
    ],
    victims: [
      {
        name: 'Rajesh Malhotra & Family',
        age: 44,
        injuryOrLoss: 'Gold Ornaments (120g), Silverware (500g), Cash ₹1,20,000 (Total ~₹11,00,000)'
      }
    ],
    investigatingOfficer: {
      name: 'Insp. Anand Kumar',
      rank: 'Police Inspector',
      badgeNo: 'KA-BGR-1289'
    },
    placeOfOccurrence: 'Villa No. 42, 100 Feet Road, Indiranagar',
    caseStatus: 'Under Investigation',
    modusOperandi: 'Broke main door iron latch using a heavy crowbar while family was away in Mysuru. Dusted DVR system with grease to obscure fingerprints.',
    evidenceItems: [
      'Fingerprint lifted from bedroom steel almirah handle (Match with Crime Records Bureau ID: CRB-KA-882)',
      'Heavy iron crowbar left near backyard boundary wall',
      'CCTV from adjacent cafe showing silver Swift car at 02:45 AM'
    ],
    incidentSummary: 'Housebreak theft at Indiranagar while owners visited Mysuru. Forensic team recovered partial latent prints matching repeat offender Crowbar Manja (Manjunath G.). Warrants issued.'
  },
  {
    id: 'FIR-004',
    firNumber: 'KA-BGR-2026-00104',
    policeStation: 'Whitefield Police Station',
    district: 'Bengaluru City',
    crimeCategory: 'Vehicle Theft',
    subCategory: 'Four-Wheeler Theft from Apartment Visitor Parking',
    sections: ['BNS 303(2)'],
    incidentDate: '2026-02-10',
    incidentTime: '11:00 PM',
    filingDate: '2026-02-11',
    complainant: {
      name: 'Deepak Reddy',
      age: 35,
      contact: '+91 97411 99201',
      address: 'Prestige Shantiniketan, Whitefield, Bengaluru'
    },
    accused: [
      {
        name: 'Ganesh Naik',
        alias: 'Auto Ganesh',
        age: 31,
        status: 'Arrested',
        address: 'KR Puram, Bengaluru'
      }
    ],
    victims: [
      {
        name: 'Deepak Reddy',
        age: 35,
        injuryOrLoss: 'Stolen Hyundai Creta (Reg: KA-03-MN-8812) worth ₹16,00,000'
      }
    ],
    investigatingOfficer: {
      name: 'Insp. K. Praveen',
      rank: 'Police Inspector',
      badgeNo: 'KA-BGR-1440'
    },
    placeOfOccurrence: 'Visitor Parking Area, Prestige Shantiniketan Gate 2',
    caseStatus: 'Solved',
    modusOperandi: 'Used electronic OBD key cloning scanner tool to bypass immobilizer of parked SUV.',
    evidenceItems: [
      'Recovered Hyundai Creta KA-03-MN-8812 at Hoskote toll plaza',
      'Electronic Key Programmer tool & blank smart keys seized',
      'ANPR camera capture at ITPL Main Road'
    ],
    incidentSummary: 'Vehicle theft reported at Whitefield. Automated Number Plate Recognition (ANPR) cameras flagged vehicle moving towards Hoskote. Accused Ganesh Naik intercepted at toll plaza; vehicle recovered within 6 hours.'
  },
  {
    id: 'FIR-005',
    firNumber: 'KA-BGR-2026-00105',
    policeStation: 'Cybercrime CID PS',
    district: 'Bengaluru City',
    crimeCategory: 'Financial Fraud',
    subCategory: 'Stock Market Investment Whatsapp Group Ponzi Scheme',
    sections: ['BNS 318(4)', 'BNS 316(2)', 'IT Act 66D'],
    incidentDate: '2026-02-18',
    incidentTime: '03:00 PM',
    filingDate: '2026-02-19',
    complainant: {
      name: 'K. V. Subbarao',
      age: 51,
      contact: '+91 94480 66712',
      address: 'HSR Layout Sector 1, Bengaluru'
    },
    accused: [
      {
        name: 'Syed Imran Khan',
        alias: 'Cyber Imran',
        age: 29,
        status: 'Named in FIR',
        priorOffensesCount: 4
      },
      {
        name: 'Pooja Sharma (Fake Identity)',
        alias: 'Trading Admin Pooja',
        status: 'Unknown'
      }
    ],
    victims: [
      {
        name: 'K. V. Subbarao',
        age: 51,
        injuryOrLoss: 'Financial Fraud of ₹42,00,000 deposited in fake trading app "BlackRock Institutional VIP"'
      }
    ],
    investigatingOfficer: {
      name: 'DySP Archana Murthy',
      rank: 'Deputy Superintendent of Police',
      badgeNo: 'KA-CID-4021'
    },
    placeOfOccurrence: 'Online - WhatsApp Group "VIP Wealth Management Group 84"',
    caseStatus: 'Under Investigation',
    modusOperandi: 'Lured victim into fake institutional stock trading WhatsApp group promising 400% guaranteed returns on IPO shares. Funds routed via multiple mule accounts managed by Cyber Imran.',
    evidenceItems: [
      'WhatsApp chat transcripts & admin phone numbers',
      'Bank Statements of 3 mule accounts in HDFC & Axis Bank',
      'Domain registration WHOIS record for fake trading portal'
    ],
    incidentSummary: 'Investment Ponzi fraud of ₹42 Lakhs. Complainant deposited savings into fake institutional trading portal. CID Cyber Crime linked mule accounts to Syed Imran Khan.'
  },
  {
    id: 'FIR-006',
    firNumber: 'KA-BGR-2026-00106',
    policeStation: 'Koramangala Police Station',
    district: 'Bengaluru City',
    crimeCategory: 'Assault',
    subCategory: 'Pub Brawl & Violent Grievous Hurt',
    sections: ['BNS 115(2)', 'BNS 118(1)', 'BNS 351(2)'],
    incidentDate: '2026-02-22',
    incidentTime: '11:45 PM',
    filingDate: '2026-02-23',
    complainant: {
      name: 'Vikram Mehta',
      age: 28,
      contact: '+91 98110 55210',
      address: 'Koramangala 5th Block, Bengaluru'
    },
    accused: [
      {
        name: 'Kiran Gowda',
        alias: 'Kori Kiran',
        age: 27,
        status: 'Arrested',
        address: 'Ejipura, Bengaluru'
      }
    ],
    victims: [
      {
        name: 'Vikram Mehta',
        age: 28,
        injuryOrLoss: 'Fractured nasal bone, lacerations on forehead, glass bottle impact'
      }
    ],
    investigatingOfficer: {
      name: 'Insp. R. Venkatesh',
      rank: 'Police Inspector',
      badgeNo: 'KA-BGR-1102'
    },
    placeOfOccurrence: 'Toit Brewpub Lane / 80 Feet Road Koramangala',
    caseStatus: 'Pending Trial',
    modusOperandi: 'Physical assault following parking dispute outside pub. Accused used broken beer bottle as dangerous weapon.',
    evidenceItems: [
      'Pub indoor CCTV footage showing full alteraction',
      'Medical injury certificate from St. Johns Hospital',
      'Broken glass weapon seized from spot'
    ],
    incidentSummary: 'Brawl outside pub in Koramangala. Victim suffered nasal fracture. Accused Kiran Gowda arrested on spot by night patrol team. Chargesheet submitted to 4th ACMM Court.'
  },
  {
    id: 'FIR-007',
    firNumber: 'KA-BGR-2026-00107',
    policeStation: 'Indiranagar Police Station',
    district: 'Bengaluru City',
    crimeCategory: 'Narcotics',
    subCategory: 'Commercial Quantity MDMA & Hydroponic Cannabis Seizure',
    sections: ['NDPS Act 20(b)(ii)(C)', 'NDPS Act 22(c)'],
    incidentDate: '2026-03-01',
    incidentTime: '06:00 PM',
    filingDate: '2026-03-01',
    complainant: {
      name: 'PSI Chandrashekar B.',
      age: 38,
      contact: '+91 80 2294 2542',
      address: 'Indiranagar Police Station'
    },
    accused: [
      {
        name: "Vicky alias 'Ganja' Thomas",
        alias: 'Vicky Thomas',
        age: 26,
        status: 'Absconding',
        address: 'Mangaluru / Bengaluru'
      },
      {
        name: 'Rahul Sen',
        age: 23,
        status: 'Arrested',
        address: 'Binnamangala, Indiranagar'
      }
    ],
    victims: [],
    investigatingOfficer: {
      name: 'Insp. Anand Kumar',
      rank: 'Police Inspector',
      badgeNo: 'KA-BGR-1289'
    },
    placeOfOccurrence: 'Near Indiranagar Metro Station Gate B',
    caseStatus: 'Under Investigation',
    modusOperandi: 'Mule carrier Rahul Sen intercepted while carrying 120 grams MDMA crystals and 1.5kg Hydroponic weed packed inside sealed Amazon delivery bags. Sourced from Vicky Thomas.',
    evidenceItems: [
      '120g MDMA crystals verified via Forensic Science Laboratory (FSL) kit',
      '1.5kg High-grade Hydroponic Cannabis in vacuum pouch',
      'iPhone 13 seized containing Telegram deal logs with Vicky Thomas'
    ],
    incidentSummary: 'Narcotics raid near Indiranagar metro station. Courier carrier Rahul Sen caught with commercial quantity MDMA. Interrogation confirmed drug supply kingpin Vicky Thomas operating across Bengaluru & Mangaluru.'
  },
  {
    id: 'FIR-008',
    firNumber: 'KA-BGR-2026-00108',
    policeStation: 'Koramangala Police Station',
    district: 'Bengaluru City',
    crimeCategory: 'Robbery',
    subCategory: 'Knife Point Money Extortion from ATM Visitor',
    sections: ['BNS 309(6)', 'BNS 308(2)'],
    incidentDate: '2026-03-10',
    incidentTime: '10:15 PM',
    filingDate: '2026-03-11',
    complainant: {
      name: 'Suhas Kulkarni',
      age: 29,
      contact: '+91 96111 88302',
      address: 'Koramangala 8th Block, Bengaluru'
    },
    accused: [
      {
        name: "Ramesh alias 'Blade' Kumar",
        alias: 'Blade Ramesh',
        age: 34,
        status: 'Absconding',
        priorOffensesCount: 7
      }
    ],
    victims: [
      {
        name: 'Suhas Kulkarni',
        age: 29,
        injuryOrLoss: 'Forced cash withdrawal ₹20,000 and Apple Watch Series 8'
      }
    ],
    investigatingOfficer: {
      name: 'Insp. R. Venkatesh',
      rank: 'Police Inspector',
      badgeNo: 'KA-BGR-1102'
    },
    placeOfOccurrence: 'SBI ATM Kiosk, 80 Feet Road, Koramangala',
    caseStatus: 'Under Investigation',
    modusOperandi: 'Accused entered un-guarded ATM kiosk behind victim, held surgical blade to victim throat, forcing maximum cash withdrawal.',
    evidenceItems: [
      'HD ATM Interior Camera footage',
      'Transaction slip timestamped 22:16:04',
      'Matching physical description & neck tattoo with Blade Ramesh'
    ],
    incidentSummary: 'Knife-point robbery inside SBI ATM Koramangala. Victim coerced to withdraw ₹20,000 cash. CCTV shows Blade Ramesh with distinct scorpion neck tattoo. Combined search with Mysuru police initiated.'
  },
  {
    id: 'FIR-009',
    firNumber: 'KA-MYS-2026-00201',
    policeStation: 'Nazarbad Police Station',
    district: 'Mysuru City',
    crimeCategory: 'Chain Snatching',
    subCategory: 'Tourist Area Morning Snatching',
    sections: ['BNS 304', 'BNS 309(4)'],
    incidentDate: '2026-03-15',
    incidentTime: '06:45 AM',
    filingDate: '2026-03-15',
    complainant: {
      name: 'Savithri N.',
      age: 65,
      contact: '+91 821 2541092',
      address: 'Race Course Road, Mysuru'
    },
    accused: [
      {
        name: "Ramesh alias 'Blade' Kumar",
        alias: 'Blade Ramesh',
        age: 34,
        status: 'Absconding',
        priorOffensesCount: 7
      }
    ],
    victims: [
      {
        name: 'Savithri N.',
        age: 65,
        injuryOrLoss: '45g Gold Chain worth ₹3,40,000'
      }
    ],
    investigatingOfficer: {
      name: 'Insp. Mahesh Gowda',
      rank: 'Police Inspector',
      badgeNo: 'KA-MYS-2011'
    },
    placeOfOccurrence: 'Near Chamundi Hill Steps Base, Nazarbad PS limits',
    caseStatus: 'Under Investigation',
    modusOperandi: 'Offender on black Apache motorbike snatched gold chain from morning devotee near Chamundi hill road. Matches MO seen in Koramangala cases.',
    evidenceItems: [
      'Traffic junction CCTV clip showing black Apache with fake KA-05 registration plate',
      'Eyewitness statement from coconut vendor'
    ],
    incidentSummary: 'Chain snatching at Chamundi Hill road Mysuru. Modus operandi and vehicle profile match Koramangala FIR KA-BGR-2026-00102. Joint alert issued with Bengaluru Police.'
  },
  {
    id: 'FIR-010',
    firNumber: 'KA-MNG-2026-00301',
    policeStation: 'Urwa Police Station',
    district: 'Mangaluru City',
    crimeCategory: 'Narcotics',
    subCategory: 'College Campus Ganja & MDMA Distribution',
    sections: ['NDPS Act 20(b)', 'NDPS Act 27A'],
    incidentDate: '2026-03-18',
    incidentTime: '04:30 PM',
    filingDate: '2026-03-19',
    complainant: {
      name: 'PSI Harish Chandra',
      age: 36,
      contact: '+91 824 2220 801',
      address: 'Urwa Police Station'
    },
    accused: [
      {
        name: "Vicky alias 'Ganja' Thomas",
        alias: 'Vicky Thomas',
        age: 26,
        status: 'Absconding'
      },
      {
        name: 'Nitin Dsouza',
        age: 22,
        status: 'Arrested',
        address: 'Kottara Chowki, Mangaluru'
      }
    ],
    victims: [],
    investigatingOfficer: {
      name: 'Insp. Devadas Shetty',
      rank: 'Police Inspector',
      badgeNo: 'KA-MNG-3041'
    },
    placeOfOccurrence: 'Kottara Chowki Bus Shelter, Urwa',
    caseStatus: 'Under Investigation',
    modusOperandi: 'Accused Nitin Dsouza caught distributing contraband packages to engineering college students. Confessed obtaining stock from Vicky Thomas.',
    evidenceItems: [
      '800 grams Ganja and 25 MDMA pills seized from backpack',
      'GPay transaction statement showing transfers to Vicky Thomas account'
    ],
    incidentSummary: 'Drug bust near college bus shelter in Urwa, Mangaluru. Seized MDMA and Ganja. Interrogation linked accused to fugitive dealer Vicky Thomas who is also wanted in Indiranagar PS FIR KA-BGR-2026-00107.'
  },
  {
    id: 'FIR-011',
    firNumber: 'KA-HBL-2026-00401',
    policeStation: 'Suburban Police Station',
    district: 'Hubballi-Dharwad',
    crimeCategory: 'House Theft',
    subCategory: 'Commercial Shop Counter Lock Breaking',
    sections: ['BNS 331(3)', 'BNS 305'],
    incidentDate: '2026-03-22',
    incidentTime: '03:15 AM',
    filingDate: '2026-03-22',
    complainant: {
      name: 'Basavaraj Patil',
      age: 52,
      contact: '+91 836 2441099',
      address: 'Station Road, Hubballi'
    },
    accused: [
      {
        name: 'Manjunath G.',
        alias: 'Crowbar Manja',
        age: 41,
        status: 'Absconding',
        priorOffensesCount: 5
      }
    ],
    victims: [
      {
        name: 'Basavaraj Patil (Patil Jewellery Traders)',
        age: 52,
        injuryOrLoss: 'Cash ₹3,50,000 from shop safe drawer'
      }
    ],
    investigatingOfficer: {
      name: 'Insp. Suresh Patil',
      rank: 'Police Inspector',
      badgeNo: 'KA-HBL-4012'
    },
    placeOfOccurrence: 'Patil Jewellery Traders, Station Road Hubballi',
    caseStatus: 'Under Investigation',
    modusOperandi: 'Pried open shutter side lock using customized bent crowbar. Disconnected CCTV wire leading to shop DVR.',
    evidenceItems: [
      'Bent iron crowbar recovered near alley way',
      'Footprint impressions in dust matching size 9 Woodland boot'
    ],
    incidentSummary: 'Break-in at wholesale shop in Hubballi. Crowbar tool and entry method match Crowbar Manja (Manjunath G.), currently out on bail from Indiranagar case FIR KA-BGR-2026-00103. Bail cancellation notice dispatched.'
  },
  {
    id: 'FIR-012',
    firNumber: 'KA-BGR-2026-00109',
    policeStation: 'Whitefield Police Station',
    district: 'Bengaluru City',
    crimeCategory: 'Cyber Fraud',
    subCategory: 'Part-Time Telegram Job Scam / Youtube Like Review Scam',
    sections: ['BNS 318(4)', 'IT Act 66D'],
    incidentDate: '2026-03-25',
    incidentTime: '02:00 PM',
    filingDate: '2026-03-26',
    complainant: {
      name: 'Ananya Sharma',
      age: 26,
      contact: '+91 91080 33219',
      address: 'Kadugodi, Whitefield, Bengaluru'
    },
    accused: [
      {
        name: 'Mule Account Holder - Sanjeev Kumar',
        status: 'Arrested',
        address: 'Kalaburagi, Karnataka'
      }
    ],
    victims: [
      {
        name: 'Ananya Sharma',
        age: 26,
        injuryOrLoss: 'Financial loss of ₹6,20,000 paid as crypto prepaid tasks'
      }
    ],
    investigatingOfficer: {
      name: 'Insp. K. Praveen',
      rank: 'Police Inspector',
      badgeNo: 'KA-BGR-1440'
    },
    placeOfOccurrence: 'Online / Telegram Channel "Global Digital Media Rating Agency"',
    caseStatus: 'Under Investigation',
    modusOperandi: 'Complainant was promised ₹150 per YouTube video liked. Later forced into VIP crypto investment tasks to unlock withheld earnings.',
    evidenceItems: [
      'Bank transaction slips to IndusInd Bank account',
      'Telegram chat screenshots & UPI IDs'
    ],
    incidentSummary: 'Part-time job scam reported by software engineer in Whitefield. ₹6.2 Lakhs defrauded. Account freeze request sent to IndusInd Bank for mule account held by Sanjeev Kumar.'
  }
];

export function getSystemAnalyticsFromRecords(records: FIRRecord[]): {
  totalFIRs: number;
  underInvestigation: number;
  solved: number;
  chargesheetFiled: number;
  repeatOffendersCount: number;
  crimeByCategory: Record<string, number>;
  crimeByDistrict: Record<string, number>;
} {
  const analytics = {
    totalFIRs: records.length,
    underInvestigation: 0,
    solved: 0,
    chargesheetFiled: 0,
    repeatOffendersCount: INITIAL_REPEAT_OFFENDERS.length,
    crimeByCategory: {} as Record<string, number>,
    crimeByDistrict: {} as Record<string, number>,
  };

  records.forEach((rec) => {
    if (rec.caseStatus === 'Under Investigation') analytics.underInvestigation++;
    if (rec.caseStatus === 'Solved') analytics.solved++;
    if (rec.caseStatus === 'Chargesheet Filed') analytics.chargesheetFiled++;

    analytics.crimeByCategory[rec.crimeCategory] = (analytics.crimeByCategory[rec.crimeCategory] || 0) + 1;
    analytics.crimeByDistrict[rec.district] = (analytics.crimeByDistrict[rec.district] || 0) + 1;
  });

  return analytics;
}
