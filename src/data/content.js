/**
 * Editorial copy for the redesigned site (bilingual).
 * Objectives are summarised from Article 4 of the registered Atshri Trust deed.
 */

export const MANTRA = { en: 'सेवा परमो धर्मः', hi: 'सेवा परमो धर्मः' };

export const ABOUT = {
  title: {
    en: 'A trust rooted in seva, guided by dharma',
    hi: 'सेवा में निहित, धर्म से प्रेरित एक न्यास',
  },
  body: {
    en: 'Atshri Trust is a registered public charitable trust based in Rewa, Madhya Pradesh. We began with a simple conviction — that every act of service, however small, creates lasting change. Today we organise relief, cultural seva and community welfare with the same humility we started with.',
    hi: 'अथश्री ट्रस्ट रीवा, मध्य प्रदेश स्थित एक पंजीकृत सार्वजनिक धर्मार्थ न्यास है। हमारी शुरुआत एक सरल विश्वास से हुई — सेवा का हर छोटा कार्य स्थायी परिवर्तन लाता है। आज हम उसी विनम्रता से राहत, सांस्कृतिक सेवा और जनकल्याण के कार्य करते हैं।',
  },
  quote: {
    en: 'We show up wherever we are needed — with willing hands and open hearts.',
    hi: 'जहाँ आवश्यकता हो, हम वहाँ पहुँचते हैं — तत्पर हाथों और खुले हृदय के साथ।',
  },
  points: [
    { en: 'Non-profit, non-political and fully charitable in purpose', hi: 'पूर्णतः गैर-लाभकारी, गैर-राजनीतिक एवं धर्मार्थ उद्देश्य' },
    { en: 'Volunteer-led seva across Rewa and Madhya Pradesh', hi: 'रीवा एवं मध्य प्रदेश में स्वयंसेवक-आधारित सेवा' },
    { en: 'Transparent governance through a registered trust board', hi: 'पंजीकृत ट्रस्टी बोर्ड द्वारा पारदर्शी संचालन' },
  ],
};

export const VISION = {
  en: 'A compassionate society where no one is left without food, warmth, learning, care or dignity — and where our cultural heritage continues to inspire selfless service.',
  hi: 'एक करुणामय समाज, जहाँ कोई भी भोजन, गर्माहट, शिक्षा, देखभाल या सम्मान से वंचित न रहे — और जहाँ हमारी सांस्कृतिक विरासत निःस्वार्थ सेवा की प्रेरणा बनी रहे।',
};

export const MISSION = {
  en: 'To serve people and families in need through relief, education, health, environmental and cultural initiatives — organised with honesty, accountability and the spirit of seva.',
  hi: 'राहत, शिक्षा, स्वास्थ्य, पर्यावरण एवं सांस्कृतिक पहलों के माध्यम से जरूरतमंद व्यक्तियों और परिवारों की सेवा करना — ईमानदारी, जवाबदेही और सेवा-भाव के साथ।',
};

/** Focus areas — `image` keys map to site.json → images; `cats` link to activity categories. */
export const FOCUS_AREAS = [
  {
    id: 'culture',
    image: 'culture',
    tag: { en: 'Cultural & Religious', hi: 'सांस्कृतिक एवं धार्मिक' },
    title: { en: 'Temple seva & cultural heritage', hi: 'मंदिर सेवा एवं सांस्कृतिक विरासत' },
    text: {
      en: 'Mandir cleaning, aarti, festivals and katha — keeping our traditions alive through collective seva.',
      hi: 'मंदिर स्वच्छता, आरती, उत्सव एवं कथा — सामूहिक सेवा से परंपराओं को जीवित रखना।',
    },
  },
  {
    id: 'welfare',
    image: 'volunteers',
    tag: { en: 'Social Welfare', hi: 'समाज कल्याण' },
    title: { en: 'Relief for families in need', hi: 'जरूरतमंद परिवारों को राहत' },
    text: {
      en: 'Food, water, blankets and essentials — and emergency help during floods, fire or other disasters.',
      hi: 'भोजन, जल, कम्बल व आवश्यक वस्तुएँ — तथा आपदा के समय आपातकालीन सहायता।',
    },
  },
  {
    id: 'education',
    image: 'education',
    tag: { en: 'Education', hi: 'शिक्षा' },
    title: { en: 'Learning for every child', hi: 'हर बच्चे के लिए शिक्षा' },
    text: {
      en: 'School kits, books, scholarships and skill programmes for deserving students.',
      hi: 'योग्य विद्यार्थियों के लिए स्कूल किट, पुस्तकें, छात्रवृत्ति एवं कौशल कार्यक्रम।',
    },
  },
  {
    id: 'health',
    image: 'health',
    tag: { en: 'Health', hi: 'स्वास्थ्य' },
    title: { en: 'Health camps & blood donation', hi: 'स्वास्थ्य शिविर एवं रक्तदान' },
    text: {
      en: 'Medical camps, free consultation and awareness for preventive care.',
      hi: 'चिकित्सा शिविर, निःशुल्क परामर्श एवं निवारक स्वास्थ्य जागरूकता।',
    },
  },
  {
    id: 'environment',
    image: 'environment',
    tag: { en: 'Environment', hi: 'पर्यावरण' },
    title: { en: 'Trees, water & clean streets', hi: 'वृक्ष, जल एवं स्वच्छता' },
    text: {
      en: 'Plantation drives, water conservation and cleanliness campaigns.',
      hi: 'वृक्षारोपण, जल संरक्षण एवं स्वच्छता अभियान।',
    },
  },
  {
    id: 'community',
    image: 'community',
    tag: { en: 'Community', hi: 'समुदाय' },
    title: { en: 'Elders, women & the vulnerable', hi: 'वरिष्ठ, महिलाएँ एवं वंचित वर्ग' },
    text: {
      en: 'Care for senior citizens, women, children and persons with disabilities.',
      hi: 'वरिष्ठ नागरिकों, महिलाओं, बच्चों एवं दिव्यांगजनों की देखभाल।',
    },
  },
];

/** In-memory-of section + family lineage (oldest generation first). */
export const MEMORIAL = {
  name: { en: 'Late Shri Manoj Kumar Shrivastava', hi: 'स्व. श्री मनोज कुमार श्रीवास्तव' },
  title: { en: 'In loving memory', hi: 'पुण्य स्मृति में' },
  text: {
    en: 'Atshri Trust was founded in loving memory of our revered father, Late Shri Manoj Kumar Shrivastava. His life was one of simplicity, duty and kindness towards others — and every act of seva by the trust is a humble effort to walk the path he showed us.',
    hi: 'अथश्री ट्रस्ट की स्थापना हमारे पूज्य पिताजी स्वर्गीय श्री मनोज कुमार श्रीवास्तव की पुण्य स्मृति में की गई है। उनका जीवन सरलता, कर्तव्य और दूसरों की सहायता के भाव से भरा रहा। आज ट्रस्ट का हर सेवा-कार्य उन्हीं के दिखाए मार्ग पर चलने का एक विनम्र प्रयास है।',
  },
  photo: { src: '/images/family/papa-900.webp', small: '/images/family/papa-500.webp' },
};

export const LINEAGE = [
  {
    id: 'prapardada',
    relation: { en: 'Great-great-grandfather — the eldest of our lineage', hi: 'प्रपरदादा — वंश के सबसे पूज्य पूर्वज' },
    names: { en: 'Late Shri Buland Prasad Shrivastava', hi: 'स्व. श्री बुलंद प्रसाद श्रीवास्तव' },
    text: {
      en: 'The eldest ancestor of our family, from whom our lineage begins. Father of Late Shri Rambihari Shrivastava — his blessings rest over every generation that followed.',
      hi: 'हमारे परिवार के सबसे पूज्य पूर्वज, जिनसे हमारे वंश की शुरुआत होती है। स्व. श्री रामबिहारी श्रीवास्तव के पिताजी — उनका आशीर्वाद आगे की हर पीढ़ी पर बना हुआ है।',
    },
  },
  {
    id: 'pardada',
    relation: { en: 'Great-grandparents', hi: 'परदादा एवं परदादी' },
    names: { en: 'Late Shri Rambihari Shrivastava & Late Smt. Pardadi ji', hi: 'स्व. श्री रामबिहारी श्रीवास्तव एवं स्व. श्रीमती परदादी जी' },
    text: {
      en: 'The roots of our family’s faith and traditions. It is with the blessings of these elders that this journey of seva has become possible.',
      hi: 'परिवार की परंपरा और आस्था की जड़ें। उन्हीं पूर्वजों के आशीर्वाद से यह सेवा-यात्रा संभव हो रही है।',
    },
    photo: { src: '/images/family/pardada-pardadi-1200.webp', small: '/images/family/pardada-pardadi-640.webp' },
  },
  {
    id: 'dadaji',
    relation: { en: 'Grandparents', hi: 'दादाजी एवं दादीजी' },
    names: { en: 'Late Shri Mahadev Prasad Shrivastava & Late Shrimati Kamla Shrivastava', hi: 'स्व. श्री महादेव प्रसाद श्रीवास्तव एवं स्व. श्रीमती कमला श्रीवास्तव' },
    text: {
      en: 'Their values and blessings gave our family its foundation of dharma, service and togetherness. Their teachings still live in every decision we make.',
      hi: 'जिनके संस्कारों और आशीर्वाद ने परिवार को धर्म, सेवा और एकता की नींव दी। उनकी सीख आज भी हमारे हर निर्णय में जीवित है।',
    },
    photo: { src: '/images/family/dadaji-dadiji-1200.webp', small: '/images/family/dadaji-dadiji-640.webp' },
  },
  {
    id: 'papa',
    relation: { en: 'Our father — the inspiration', hi: 'पिताजी — प्रेरणा स्रोत' },
    names: { en: 'Late Shri Manoj Kumar Shrivastava', hi: 'स्व. श्री मनोज कुमार श्रीवास्तव' },
    text: {
      en: 'In whose loving memory Atshri Trust was founded. His simplicity, sense of duty and care for others guide all our work.',
      hi: 'जिनकी पुण्य स्मृति में अथश्री ट्रस्ट की स्थापना हुई। उनकी सरलता, कर्तव्यनिष्ठा और दूसरों के प्रति करुणा ही हमारे हर कार्य की प्रेरणा है।',
    },
    portrait: true,
  },
];
