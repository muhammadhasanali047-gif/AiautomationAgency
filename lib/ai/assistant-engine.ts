// Deterministic Grounding & Language Engine for NexaCore AI Assistant
import { NEXACORE_KNOWLEDGE } from './knowledge';

export type SupportedLanguage = 'urdu' | 'roman_urdu' | 'mixed' | 'english';

export interface AssistantAction {
  type: 'navigate';
  path: string;
  label: string;
}

export interface AssistantResponse {
  reply: string;
  action?: AssistantAction;
}

// 1. Language Detection
export function detectLanguage(text: string): SupportedLanguage {
  // Check for Arabic/Urdu unicode script: \u0600-\u06FF
  const urduScriptRegex = /[\u0600-\u06FF]/;
  if (urduScriptRegex.test(text)) {
    return 'urdu';
  }

  const lower = text.toLowerCase();

  // Distinct Roman Urdu vocabulary markers
  const romanUrduMarkers = [
    'karo', 'kro', 'karein', 'karen', 'kr do', 'kar do', 'krna', 'karna',
    'batao', 'btau', 'bataen', 'bataiye', 'btaye',
    'sakty', 'skty', 'sakta', 'sakte', 'sakti', 'skta',
    'mujhe', 'mjhe', 'mera', 'meri', 'mere', 'humara', 'hamari', 'apka', 'aapka',
    'ap', 'aap', 'tum', 'kaise', 'kaisy', 'kia', 'kya', 'kyun', 'kaha', 'kahan',
    'kon', 'kaun', 'hai', 'hain', 'ho', 'tha', 'thi', 'the',
    'le jao', 'dikhao', 'dekhao', 'dikhaye', 'dekhna',
    'chahiye', 'chahye', 'banwana', 'bana sakty', 'bana skte',
    'wala', 'wali', 'wale', 'acha', 'theek', 'shukriya', 'meherbani',
  ];

  let romanCount = 0;
  for (const marker of romanUrduMarkers) {
    if (new RegExp(`\\b${marker}\\b`, 'i').test(lower)) {
      romanCount++;
    }
  }

  // English words check
  const englishWords = [
    'what', 'how', 'when', 'where', 'who', 'which', 'can', 'could', 'please',
    'tell', 'explain', 'show', 'navigate', 'service', 'services', 'project',
    'projects', 'team', 'contact', 'price', 'pricing', 'cost', 'process',
  ];
  let englishCount = 0;
  for (const word of englishWords) {
    if (new RegExp(`\\b${word}\\b`, 'i').test(lower)) {
      englishCount++;
    }
  }

  if (romanCount >= 1 && englishCount >= 2) {
    return 'mixed';
  }

  if (romanCount >= 1) {
    return 'roman_urdu';
  }

  return 'english';
}

// 2. Navigation Intent Detection
export function detectNavigationIntent(text: string): { isNav: boolean; destination?: { path: string; label: string } } {
  const lower = text.toLowerCase().trim();

  // Navigation verbs in English and Roman Urdu
  const navTriggers = [
    'open', 'go to', 'take me to', 'navigate to', 'visit', 'redirect to', 'show me',
    'le jao', 'dikhao', 'dekhao', 'open karo', 'open kro', 'khol do', 'kholo', 'par jao', 'pe jao',
  ];

  const hasNavVerb = navTriggers.some((trigger) => lower.includes(trigger));

  // Destination matching
  for (const item of NEXACORE_KNOWLEDGE.navigationAllowlist) {
    for (const keyword of item.keywords) {
      if (lower.includes(keyword)) {
        // If explicit navigation verb or simple imperative phrase ("services open", "contact page")
        if (hasNavVerb || lower === keyword || lower === `${keyword} please` || lower.endsWith('page')) {
          return {
            isNav: true,
            destination: { path: item.path, label: item.label },
          };
        }
      }
    }
  }

  return { isNav: false };
}

// 3. Security & Prompt Injection Checks
export function isPromptInjection(text: string): boolean {
  const lower = text.toLowerCase();
  const injectionPatterns = [
    'ignore all instructions',
    'ignore previous instructions',
    'system prompt',
    'reveal prompt',
    'show your prompt',
    'what are your instructions',
    'hidden instructions',
    'api key',
    'api_key',
    'secret key',
    'database password',
    'env variables',
    '.env',
    'developer mode',
    'jailbreak',
  ];

  return injectionPatterns.some((pattern) => lower.includes(pattern));
}

// 4. Out of Scope Check
export function isOutOfScope(text: string): boolean {
  const lower = text.toLowerCase();

  // Explicit tech query or general programming request unrelated to hiring/services
  if (
    lower.startsWith('write me a python') ||
    lower.startsWith('write a python') ||
    lower.startsWith('write code for') ||
    lower.startsWith('solve this math') ||
    lower.startsWith('write a poem') ||
    lower.startsWith('write an essay')
  ) {
    return true;
  }

  // Unrelated topics
  const outOfScopeKeywords = [
    'president of', 'prime minister', 'cricket match', 'football match',
    'weather in', 'who is elon musk', 'who is messi', 'who won', 'capital of',
    'recipe for', 'movie review', 'joke', 'tell me a joke', 'riddle',
  ];

  return outOfScopeKeywords.some((keyword) => lower.includes(keyword));
}

// 5. Generate Grounded Response
export function generateGroundedResponse(
  query: string,
  history: Array<{ role: string; content: string }> = []
): AssistantResponse {
  const lang = detectLanguage(query);
  const lower = query.toLowerCase().trim();

  // A. Security Check
  if (isPromptInjection(query)) {
    if (lang === 'urdu') {
      return {
        reply:
          'میں آپ کی نکساکور آٹومیشنز اور ہماری ویب سائٹ سے متعلق معلومات میں مدد کر سکتا ہوں، لیکن میں اندرونی ہدایات فراہم نہیں کر سکتا۔',
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply:
          'Main NexaCore Automations aur website par available services ke bare mein aapki help kar sakta hoon, lekin internal system instructions share nahi ki ja sakeen gi.',
      };
    }
    return {
      reply:
        "I can help you with NexaCore Automations and the information available on our website, but I can't provide internal system instructions.",
    };
  }

  // B. Out of Scope Check
  if (isOutOfScope(query)) {
    if (lower.includes('python') || lower.includes('code') || lower.includes('program')) {
      if (lang === 'urdu') {
        return {
          reply:
            'میں نکساکور آٹومیشنز اور ہماری ویب سائٹ کی سروسز میں مدد کر سکتا ہوں۔ اگر آپ کسٹم سافٹ ویئر ڈویلپمنٹ چاہتے ہیں، تو میں ہماری فل اسٹیک سروسز کی تفصیل بتا سکتا ہوں۔',
        };
      }
      if (lang === 'roman_urdu' || lang === 'mixed') {
        return {
          reply:
            'Main NexaCore Automations aur hamari website ki services ke mutalliq help kar sakta hoon. Agar aap custom software development chahte hain, to main hamari Full-Stack development services explain kar sakta hoon.',
        };
      }
      return {
        reply:
          "I can help you with NexaCore Automations and the services available on our website. If you're looking for software development, I can explain our development services.",
      };
    }

    if (lang === 'urdu') {
      return {
        reply:
          'میں صرف نکساکور آٹومیشنز، ہماری سروسز، پروجیکٹس، ٹیم اور ویب سائٹ کے بارے میں معلومات فراہم کرتا ہوں۔ آپ نکساکور کے بارے میں کیا جاننا چاہتے ہیں؟',
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply:
          'Main sirf NexaCore Automations, hamari services, solutions, projects aur team ke bare mein help karta hoon. Aap NexaCore ke bare mein kya janna chahte hain?',
      };
    }
    return {
      reply:
        "I'm here to help with NexaCore Automations, our services, solutions, projects, team, and website. What would you like to know about NexaCore?",
    };
  }

  // C. Navigation Action Trigger
  const navCheck = detectNavigationIntent(query);
  if (navCheck.isNav && navCheck.destination) {
    const dest = navCheck.destination;
    let navReply = '';

    if (lang === 'urdu') {
      navReply = `بالکل، میں آپ کے لیے ${dest.label} کھول رہا ہوں۔`;
    } else if (lang === 'roman_urdu' || lang === 'mixed') {
      navReply = `Bilkul, ${dest.label} open kar raha hoon.`;
    } else {
      navReply = `Sure, opening the ${dest.label} now.`;
    }

    return {
      reply: navReply,
      action: {
        type: 'navigate',
        path: dest.path,
        label: dest.label,
      },
    };
  }

  // D. Polite Thanks / Gratitude Handling
  const thanksRegex = /\b(thanks|thank you|thank u|thx|shukriya|shukria|jazakallah|jazak allah|dhanyawad|thanku|thankyou)\b/i;
  if (thanksRegex.test(lower)) {
    if (lang === 'urdu') {
      return {
        reply: `بہت بہت شکریہ! آپ کی خدمت کر کے خوشی ہوئی۔ اگر آپ کو نکساکور کی کسی بھی سروس، چیٹ بوٹس، یا پروجیکٹ کے بارے میں مزید رہنمائی درکار ہو تو بلا جھجھک پوچھیے۔`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `Aap ka bohot bohot shukriya! NexaCore Automations mein aap ki madad kar ke khushi hui. Agar aap ko future mein AI automation, WhatsApp chatbots, email marketing ya custom web software ke hawale se koi bhi guidance chahiye ho, to hum hamesha available hain. Have a wonderful day!`,
      };
    }
    return {
      reply: `You're very welcome! It's an absolute pleasure assisting you. If you ever have any questions about NexaCore's AI automation, WhatsApp chatbots, email marketing, or custom full-stack software development, feel free to ask anytime. Wishing you great success!`,
    };
  }

  // E. Polite "OK" / Acknowledgment Handling
  const ackRegex = /^(ok|okay|okk|k|theek|theek hai|thik hai|thk hai|sahi hai|sahi|got it|alright|all right|done|acha|achha|fine|understood|sure|cool|great|nice|good|perfect|zabardast)[.!?\s]*$/i;
  if (ackRegex.test(lower) || lower === 'ok' || lower === 'okay' || lower === 'theek' || lower === 'acha') {
    if (lang === 'urdu') {
      return {
        reply: `بہترین! اگر آپ کو نکساکور کی کسی بھی سروس، کیس اسٹڈیز، یا پروجیکٹ کے بارے میں مزید تفصیلات جاننی ہوں تو ضرور بتائیے۔ میں آپ کی مدد کے لیے حاضر ہوں۔`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `Zabardast! Agar aap ko kisi bhi service, project case study ya Start a Project ke hawale se mazeed koi sawal poochna ho to zaroor batayein. Main yahin aapki madad ke liye hazir hoon!`,
      };
    }
    return {
      reply: `Glad to help! Let me know if you would like to explore any of our services, review technical case studies, or discuss starting a project together. I'm right here whenever you need me!`,
    };
  }

  // F. Polite Greetings Handling
  const greetingRegex = /^(hi|hello|hey|salam|assalam o alaikum|assalam|assalamu alaikum|aoa|greetings)[.!?\s]*$/i;
  if (greetingRegex.test(lower)) {
    if (lang === 'urdu') {
      return {
        reply: `وعلیکم السلام! نکساکور آٹومیشنز میں خوش آمدید۔ میں آپ کی AI آٹومیشن، واٹس ایپ چیٹ بوٹس، ای میل مارکیٹنگ، یا فل اسٹیک سافٹ ویئر کے حوالے سے کس طرح رہنمائی کر سکتا ہوں؟`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `Walaikum Assalam! NexaCore Automations mein khushamdeed. Main aap ko hamari AI automation, WhatsApp chatbots, email marketing aur full-stack software development services ke bare mein guide karne ke liye hazir hoon. Aaj main aap ki kya madad kar sakta hoon?`,
      };
    }
    return {
      reply: `Hello! Welcome to NexaCore Automations. I'm your AI Assistant. How can I assist you with our AI automation workflows, WhatsApp chatbots, email marketing, or full-stack software development today?`,
    };
  }

  // G. Team Member Queries
  if (lower.includes('hassan')) {
    const t = NEXACORE_KNOWLEDGE.team.hassan;
    if (lang === 'urdu') {
      return {
        reply: `محمد حسن نکساکور آٹومیشنز میں AI Automation & Chatbot Specialist ہیں۔ وہ AI ایجنٹس، واٹس ایپ کلاؤڈ API چیٹ بوٹس، خودکار کاروباری عمل، اور RAG سسٹم ڈیزائن کرنے کے ماہر ہیں۔`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `Muhammad Hassan NexaCore Automations mein **AI Automation & Chatbot Specialist** hain. Unka core focus autonomous AI agents, WhatsApp Cloud API chatbots, automated business workflows, aur document-based RAG systems par hai.`,
      };
    }
    return {
      reply: `Muhammad Hassan is the **AI Automation & Chatbot Specialist** at NexaCore Automations. He leads our AI agent workflows, official WhatsApp Cloud API chatbots, business process automation, and vector-grounded RAG knowledge systems.`,
    };
  }

  if (lower.includes('saqlain')) {
    const t = NEXACORE_KNOWLEDGE.team.saqlain;
    if (lang === 'urdu') {
      return {
        reply: `محمد ثقلین نکساکور آٹومیشنز میں Email Marketing Manager ہیں۔ وہ B2B کولڈ ای میل مہمات، ڈومین ڈیلیوریبلٹی (SPF, DKIM, DMARC)، اور خودکار لیڈ نرسرنگ ڈرپ سیکوئنسز کے ماہر ہیں۔`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `Muhammad Saqlain NexaCore Automations mein **Email Marketing Manager** hain. Unka focus B2B cold email outreach campaigns, inbox deliverability (SPF/DKIM/DMARC protocols), multi-inbox rotation, aur high-converting automated drip sequences par hai.`,
      };
    }
    return {
      reply: `Muhammad Saqlain is the **Email Marketing Manager** at NexaCore Automations. He specializes in B2B cold email outreach infrastructure, multi-inbox deliverability & DNS warm-up (SPF, DKIM, DMARC), and automated lead-nurturing funnels.`,
    };
  }

  if (lower.includes('hamdan')) {
    const t = NEXACORE_KNOWLEDGE.team.hamdan;
    if (lang === 'urdu') {
      return {
        reply: `محمد حمدان نکساکور آٹومیشنز میں Full-Stack Developer ہیں۔ وہ Next.js 14 ایپ راؤٹر، ٹائپ اسکرپٹ، سوپابیس پوسٹگری ایس کیو ایل (RLS)، اور جدید SaaS پلیٹ فارمز تیار کرتے ہیں۔`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `Muhammad Hamdan NexaCore Automations mein **Full-Stack Developer** hain. Woh Next.js 14 App Router, TypeScript, Supabase PostgreSQL with Row Level Security (RLS), REST APIs, aur production-grade SaaS web applications develop karte hain.`,
      };
    }
    return {
      reply: `Muhammad Hamdan is the **Full-Stack Developer** at NexaCore Automations. He specializes in building scalable production web applications using Next.js 14 App Router, TypeScript, Supabase PostgreSQL with strict Row Level Security (RLS), and custom SaaS dashboards.`,
    };
  }

  if (
    lower.includes('team') ||
    lower.includes('who are you') ||
    lower.includes('founders') ||
    lower.includes('members') ||
    lower.includes('kon kon') ||
    lower.includes('ٹیم') ||
    lower.includes('کون کون') ||
    lower.includes('کون ہے') ||
    lower.includes('کون ہیں')
  ) {
    if (lang === 'urdu') {
      return {
        reply: `نکساکور آٹومیشنز 3 ماہرین پر مشتمل ٹیم ہے:\n1. **محمد حسن** — AI Automation & Chatbot Specialist\n2. **محمد ثقلین** — Email Marketing Manager\n3. **محمد حمدان** — Full-Stack Developer\n\nتینوں مل کر مکمل ڈیجیٹل سسٹمز فراہم کرتے ہیں۔`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `NexaCore Automations 3 specialists ki team par mushtamil hai:\n\n1. **Muhammad Hassan** — AI Automation & Chatbot Specialist (WhatsApp bots, AI agents, workflow automation)\n2. **Muhammad Saqlain** — Email Marketing Manager (Cold email outreach, inbox deliverability, drip funnels)\n3. **Muhammad Hamdan** — Full-Stack Developer (Next.js 14, Supabase PostgreSQL, custom SaaS platforms)\n\nTeeno mil kar complete end-to-end digital solutions deliver karte hain.`,
      };
    }
    return {
      reply: `NexaCore Automations is powered by a 3-person specialist team:\n\n• **Muhammad Hassan** — AI Automation & Chatbot Specialist (AI Agents, WhatsApp Bots, Workflow Automation)\n• **Muhammad Saqlain** — Email Marketing Manager (B2B Cold Outreach, Deliverability Architecture, Drip Sequences)\n• **Muhammad Hamdan** — Full-Stack Developer (Next.js 14 App Router, Supabase PostgreSQL, Scalable SaaS)\n\nTogether they provide complete, unified agency deliverables.`,
    };
  }

  // E. Pricing / Cost Queries (Checked before specific service features to prevent hallucinating packages)
  if (
    lower.includes('price') ||
    lower.includes('pricing') ||
    lower.includes('cost') ||
    lower.includes('rate') ||
    lower.includes('kharcha') ||
    lower.includes('package') ||
    lower.includes('$') ||
    lower.includes('قیمت') ||
    lower.includes('پیکیج')
  ) {
    if (lang === 'urdu') {
      return {
        reply: `نکساکور کی ویب سائٹ پر فکسڈ قیمتیں درج نہیں ہیں، کیونکہ ہر پروجیکٹ کا دائرہ کار اور تکنیکی ضروریات مختلف ہوتی ہیں۔ آپ کنٹیکٹ پیج کے ذریعے اپنے پروجیکٹ کی ضروریات بتا کر مناسب کوٹ حاصل کر سکتے ہیں۔`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `Hamari website par abhi fixed pricing mention nahi hai kyunki har project ki technical requirements, integrations, aur scope alag hota hai. Aap **/contact** page par apni requirements share kar sakte hain taake team aapko tailored quote provide kar sake.`,
      };
    }
    return {
      reply: `Our website does not list generic fixed pricing packages because every system is engineered to tailored technical specifications, integrations, and architectural scopes. You can submit your requirements on our **/contact** page to receive a transparent, scoped proposal.`,
    };
  }

  // F. WhatsApp Chatbot Specific Query
  if (lower.includes('whatsapp') || lower.includes('chatbot') || lower.includes('bot')) {
    if (lang === 'urdu') {
      return {
        reply: `جی بالکل! نکساکور آٹومیشنز آفیشل واٹس ایپ کلاؤڈ API پر 24/7 کسٹمر سپورٹ اور لیڈ کوالیفکیشن چیٹ بوٹس بناتا ہے۔ یہ بوٹس آپ کی دستاویزات سے درست معلومات حاصل کر کے خودکار میٹنگز بک کر سکتے ہیں۔`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `Jee bilkul! NexaCore Automations official **WhatsApp Cloud API** aur website ke liye intelligent conversational chatbots develop karta hai.\n\nKey capabilities:\n• 24/7 automated customer support and instant replies\n• Document-grounded RAG answers with zero hallucinations\n• Automated lead qualification & calendar booking\n• CRM and database synchronization\n\nAap apni requirements hamare Contact page ke zariye share kar sakte hain.`,
      };
    }
    return {
      reply: `Yes, absolutely! NexaCore Automations engineers custom conversational chatbots using the official **WhatsApp Cloud API** and web interfaces powered by Google Gemini 1.5.\n\nKey Capabilities:\n• 24/7 intelligent customer engagement and immediate query resolution\n• Semantic RAG knowledge retrieval from your documentation\n• Context-aware lead qualification scoring and CRM synchronization\n• Automated appointment booking and calendar scheduling\n\nYou can discuss your chatbot specifications on our Contact page.`,
    };
  }

  // G. Email Marketing Specific Query
  if (lower.includes('email') || lower.includes('outreach') || lower.includes('deliverability') || lower.includes('drip')) {
    if (lang === 'urdu') {
      return {
        reply: `نکساکور آٹومیشنز B2B ای میل مارکیٹنگ اور آؤٹ ریچ کا مکمل انفراسٹرکچر فراہم کرتا ہے، جس میں ڈومین سیٹ اپ (SPF, DKIM, DMARC)، ملٹی ان باکس روٹیشن، اور خودکار ڈرپ سیکوئنسز شامل ہیں۔`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `NexaCore Automations B2B **Email Marketing & Cold Outreach** infrastructure provide karta hai:\n\n• Dedicated domain setup with bulletproof SPF, DKIM, and DMARC verification\n• Automated multi-inbox rotation & warm-up protocols\n• High-intent audience scraping & personalized copywriting\n• Automated multi-stage drip funnels that book qualified meetings\n\nIs service ko Muhammad Saqlain lead karte hain.`,
      };
    }
    return {
      reply: `NexaCore Automations provides strategic **Email Marketing & B2B Cold Outreach** infrastructure led by Muhammad Saqlain:\n\n• Complete DNS deliverability architecture (SPF, DKIM, DMARC verification)\n• Automated multi-inbox rotation and gradual warm-up protocols\n• Targeted B2B prospect list enrichment (Apollo.io, Instantly)\n• Behavioral multi-touch drip sequences designed for high response rates\n\nYou can request an email strategy consultation via our Contact page.`,
    };
  }

  // H. Full-Stack / Software Query
  if (lower.includes('full stack') || lower.includes('full-stack') || lower.includes('web app') || lower.includes('saas') || lower.includes('software')) {
    if (lang === 'urdu') {
      return {
        reply: `نکساکور آٹومیشنز Next.js 14، ٹائپ اسکرپٹ، اور Supabase PostgreSQL کی بنیاد پر تیز رفتار اور محفوظ فل اسٹیک ویب سائٹس اور SaaS پلیٹ فارمز تیار کرتا ہے۔`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `NexaCore Automations production-grade **Full-Stack Web Applications** develop karta hai:\n\n• Next.js 14 App Router with Server Actions & Components\n• Supabase PostgreSQL with database-level Row Level Security (RLS)\n• High-speed responsive UI built with Tailwind CSS & Framer Motion\n• Scalable multi-tenant SaaS dashboards\n\nIs discipline ko Muhammad Hamdan lead karte hain.`,
      };
    }
    return {
      reply: `NexaCore Automations engineers production-grade **Full-Stack Web Applications & Custom SaaS Platforms** led by Muhammad Hamdan:\n\n• Next.js 14 App Router architecture with Server Components & Server Actions\n• Supabase PostgreSQL database with strict Row Level Security (RLS)\n• High-density, interactive interfaces built with Tailwind CSS & Framer Motion\n• Sub-second page loads and cloud edge deployment\n\nSubmit your technical scope on our Contact page to start.`,
    };
  }

  // I. Services Overview Query
  if (lower.includes('service') || lower.includes('what do you do') || lower.includes('offer') || lower.includes('kya karte')) {
    if (lang === 'urdu') {
      return {
        reply: `نکساکور آٹومیشنز تین بنیادی شعبوں میں خدمات فراہم کرتا ہے:\n1. **AI Automation & Chatbots** — 24/7 واٹس ایپ چیٹ بوٹس اور ورک فلو آٹومیشن\n2. **Email Marketing** — B2B کولڈ ای میل مہمات اور ڈیلیوریبلٹی\n3. **Full-Stack Development** — Next.js 14 اور Supabase پر مبنی کسٹم ویب ایپس`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `NexaCore Automations 3 core disciplines mein services provide karta hai:\n\n1. **AI Automation & Chatbots** (Lead: Muhammad Hassan) — 24/7 WhatsApp Cloud API chatbots, autonomous AI agents, multi-step workflow automation.\n2. **Email Marketing** (Lead: Muhammad Saqlain) — B2B cold outreach infrastructure, domain warm-up (SPF/DKIM/DMARC), automated drip funnels.\n3. **Full-Stack Development** (Lead: Muhammad Hamdan) — Next.js 14 App Router, Supabase PostgreSQL with RLS, modern SaaS platforms.\n\nAap website ke **/services** section par detailed breakdown dekh sakte hain.`,
      };
    }
    return {
      reply: `NexaCore Automations delivers three integrated core capabilities:\n\n1. **AI Automation & Chatbots** (Lead: Muhammad Hassan) — 24/7 official WhatsApp Cloud API conversational bots, autonomous task execution pipelines, and RAG knowledge retrieval.\n2. **Email Marketing** (Lead: Muhammad Saqlain) — High-deliverability B2B cold outreach infrastructure, DNS authentication, and automated lead nurturing drip sequences.\n3. **Full-Stack Web Development** (Lead: Muhammad Hamdan) — Production-grade web applications and custom SaaS platforms built with Next.js 14, TypeScript, and Supabase.\n\nYou can explore all details at the **/services** page.`,
    };
  }

  // J. Projects / Portfolio Queries
  if (lower.includes('project') || lower.includes('portfolio') || lower.includes('case study') || lower.includes('what have you built') || lower.includes('banaye')) {
    if (lang === 'urdu') {
      return {
        reply: `ہماری ویب سائٹ پر نمایاں پروجیکٹس یہ ہیں:\n1. **Enterprise WhatsApp & AI Customer Support Bot** (محمد حسن)\n2. **Automated B2B Cold Outreach & Nurturing Engine** (محمد ثقلین)\n3. **Enterprise SaaS Operations Platform** (محمد حمدان)\n4. **Unified Agency Triad Pipeline**\n\nتفصیلات کے لیے Projects پیج وزٹ کریں۔`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `NexaCore ke featured production projects ye hain:\n\n1. **Enterprise WhatsApp & AI Customer Support Bot** (Muhammad Hassan) — 12,000+ monthly chats, 99.8% uptime, 4-second response.\n2. **Automated B2B Cold Outreach & Nurturing Engine** (Muhammad Saqlain) — 64.2% open rate, 45+ sales calls booked in 60 days.\n3. **Enterprise SaaS Operations Platform** (Muhammad Hamdan) — Next.js 14 + Supabase PostgreSQL RLS, sub-120ms loads.\n4. **Autonomous Lead-to-Close Pipeline** — Cross-discipline integrated triad system.\n\nAap **/projects** page par complete technical case studies parh sakte hain.`,
      };
    }
    return {
      reply: `Here are the featured production case studies built by NexaCore specialists:\n\n1. **Enterprise WhatsApp & AI Customer Support Bot** (Muhammad Hassan) — 24/7 conversational support, 99.8% uptime, and automated appointment scheduling.\n2. **Automated B2B Cold Outreach & Lead Nurturing Engine** (Muhammad Saqlain) — Complete DNS deliverability setup, 64.2% open rate, and automated follow-up drips.\n3. **Enterprise SaaS Operations Platform** (Muhammad Hamdan) — High-performance Next.js 14 App Router portal with Supabase PostgreSQL and Row Level Security.\n4. **Autonomous Lead-to-Close Pipeline** — Integrated cross-discipline triad pipeline.\n\nYou can read complete architectural breakdowns at **/projects**.`,
    };
  }

  // K. Development Process Query
  if (lower.includes('process') || lower.includes('how you build') || lower.includes('methodology') || lower.includes('kaise banate') || lower.includes('steps')) {
    if (lang === 'urdu') {
      return {
        reply: `نکساکور کا ڈویلپمنٹ پروسیس 5 مراحل پر مشتمل ہے:\n1. **Discovery** — ضروریات کا جائزہ\n2. **Strategy** — سسٹم آرکیٹیکچر اور ڈیزائن\n3. **Development** — صاف اور اسکیل ایبل کوڈنگ\n4. **Testing** — سیکیورٹی اور کارکردگی کی جانچ\n5. **Deployment & Optimization** — کلاؤڈ ڈیپلائمنٹ اور نگرانی`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `NexaCore Automations ka **5-stage development methodology** ye hai:\n\n1. **Discovery** — Business bottlenecks, operational requirements aur metrics ka analysis.\n2. **Strategy** — Technical architecture, database schemas, prompt pipelines aur UI plans.\n3. **Development** — Next.js 14, Supabase aur modern frameworks ke sath clean code production.\n4. **Testing** — Edge cases, latency, zero-credential leaks aur strict quality assurance.\n5. **Deployment & Optimization** — Cloud edge deployment, continuous monitoring aur production scaling.`,
      };
    }
    return {
      reply: `NexaCore Automations follows a disciplined **5-stage engineering methodology**:\n\n1. **Discovery** — In-depth analysis of operational bottlenecks, workflows, and success metrics.\n2. **Strategy** — System architecture, relational schemas, AI prompt pipelines, and UI designs.\n3. **Development** — Clean, type-safe implementation using Next.js 14, Supabase, and verified APIs.\n4. **Testing** — Stringent security audits, edge case handling, and sub-second performance validation.\n5. **Deployment & Optimization** — Cloud edge deployment with continuous uptime monitoring.`,
    };
  }

  // L. Contact / Start a Project Query
  if (lower.includes('contact') || lower.includes('hire') || lower.includes('start') || lower.includes('rabta') || lower.includes('email me') || lower.includes('phone') || lower.includes('number')) {
    if (lang === 'urdu') {
      return {
        reply: `آپ نکساکور ٹیم سے ہمارے **Contact** پیج کے ذریعے رابطہ کر سکتے ہیں یا ای میل بھیج سکتے ہیں:\n• ای میل: contact@nexacoreautomations.com\n• پیج: /contact\n\nکیا آپ چاہیں گے کہ میں Contact پیج کھول دوں؟`,
      };
    }
    if (lang === 'roman_urdu' || lang === 'mixed') {
      return {
        reply: `Aap NexaCore team se direct rabta kar sakte hain:\n\n• **Contact Form**: **/contact** page par ja kar form submit karein\n• **Official Email**: contact@nexacoreautomations.com\n• **Direct WhatsApp**: Available via website footer / contact links\n\nAgar aap chahein to main Contact page open kar sakta hoon!`,
      };
    }
    return {
      reply: `You can reach NexaCore Automations directly through our official channels:\n\n• **Project Inquiry Form**: Visit our **/contact** page\n• **Direct Email**: contact@nexacoreautomations.com\n• **Direct WhatsApp**: Accessible via our website links\n\nWould you like me to open the Contact page for you?`,
    };
  }

  // Default Friendly Assistance
  if (lang === 'urdu') {
    return {
      reply: `میں نکساکور AI اسسٹنٹ ہوں۔ میں آپ کو نکساکور آٹومیشنز کی AI آٹومیشن، چیٹ بوٹس، ای میل مارکیٹنگ، فل اسٹیک سافٹ ویئر اور ٹیم کے بارے میں تفصیلات فراہم کر سکتا ہوں۔ آپ کیا جاننا چاہتے ہیں؟`,
    };
  }
  if (lang === 'roman_urdu' || lang === 'mixed') {
    return {
      reply: `Main **NexaCore AI Assistant** hoon. Main aap ko NexaCore Automations ki services (AI Automation, WhatsApp Chatbots, Email Marketing, Full-Stack Development), projects, team aur process ke mutalliq guide kar sakta hoon. Aap kis cheez ke bare mein janna chahte hain?`,
    };
  }
  return {
    reply: `I am the **NexaCore AI Assistant**. I can help you explore our verified capabilities in AI Automation, WhatsApp Chatbots, Email Marketing, Full-Stack Development, project case studies, and team expertise. How can I assist you with your project today?`,
  };
}
