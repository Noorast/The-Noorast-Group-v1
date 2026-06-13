// ─────────────────────────────────────────────────────────────────────────────
// NOORAST AI — SMART SECTION STARTERS
// Returns the 3 most relevant questions based on the current passport section
// and whatever the user has already filled in.
// Used to populate the empty state prompt buttons in PassportAI.
// ─────────────────────────────────────────────────────────────────────────────

export function getSmartStarters(
  section: string,
  sectionData: any,
  allData?: any
): string[] {
  const address = allData?.property?.address;
  const propertyType = allData?.property?.property_type;
  const isConservation = allData?.planning_policy?.conservation_area === 'yes';
  const isArticle4 = allData?.planning_policy?.article_4 === 'yes';
  const isListed = allData?.planning_policy?.listed_building === 'yes';
  const projectType = allData?.brief?.project_type || '';
  const budget = allData?.brief?.budget;

  const propertyDesc = propertyType
    ? `my ${propertyType}${address ? ` at ${address}` : ''}`
    : 'my property';

  const constraintNote = [
    isConservation && 'conservation area',
    isArticle4 && 'Article 4 direction',
    isListed && 'listed building',
  ].filter(Boolean).join(' and ');

  // Section-specific starters
  const starterMap: Record<string, string[]> = {
    property: [
      `What permitted development rights does ${propertyDesc} have for a rear extension?`,
      'What is the difference between freehold and leasehold for planning purposes?',
      'How do I find the full planning history for my property?',
    ],
    planning_policy: [
      isConservation
        ? `What does conservation area designation mean for extending ${propertyDesc}?`
        : `Do I need planning permission to extend ${propertyDesc}?`,
      isArticle4
        ? 'My property has an Article 4 Direction — what exactly does that restrict?'
        : 'How do I check whether my permitted development rights have been removed by a condition?',
      `How likely is planning approval for ${projectType || 'a rear extension'} on my street?`,
    ],
    legal: [
      'How do I check for restrictive covenants on my title register?',
      'When does the Party Wall Act apply to a rear extension?',
      `What legal constraints should I check before building ${projectType || 'an extension'} on ${propertyDesc}?`,
    ],
    environmental: [
      'What flood risk zone am I in and how does it affect my extension?',
      'My loft might have bats — what surveys do I need and when can they be done?',
      'There is a TPO tree near my proposed extension — what restrictions apply?',
    ],
    spatial: [
      'What ceiling height should my rear extension have?',
      'How do I calculate the 45-degree rule for my neighbour\'s window?',
      `What is the maximum depth I can extend ${propertyDesc} under permitted development?`,
    ],
    brief: [
      budget
        ? `Is ${budget} a realistic budget for ${projectType || 'a rear extension'} on ${propertyDesc}?`
        : `How much should I budget for ${projectType || 'a rear extension'} on ${propertyDesc}?`,
      `What information does an architect need from me before designing ${projectType || 'an extension'}?`,
      'What is the difference between a planning application and building regulations — do I need both?',
    ],
    site: [
      'How do I find out if there is a public sewer running under my proposed extension?',
      'What ground conditions should I check before designing an extension?',
      'What access constraints could affect construction on my property?',
    ],
    structure: [
      'How do I identify which walls in my house are load-bearing?',
      'What is involved in removing a wall to create an open-plan kitchen?',
      'How much does a structural engineer typically cost for a residential extension?',
    ],
    neighbours: [
      'I have a difficult neighbour — how do I manage the planning application process?',
      'My neighbour has already extended further than I want to — does that help my application?',
      'What is a party wall award and when do I need one?',
    ],
    checklist: [
      'What should I complete in my Property Passport before meeting an architect?',
      constraintNote
        ? `What are the key planning risks for ${propertyDesc} given its ${constraintNote} status?`
        : `What are the most important things to check before starting a ${projectType || 'building'} project?`,
      'How long does the planning application process typically take?',
    ],
  };

  // Default fallback starters (always relevant)
  const defaults = [
    `Can I extend ${propertyDesc} under permitted development?`,
    `What is a realistic budget for ${projectType || 'a rear extension'} in my area?`,
    'What are the first steps I should take before appointing an architect?',
  ];

  return starterMap[section] || defaults;
}
