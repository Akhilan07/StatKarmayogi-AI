export type LanguageCode = 'en' | 'hi' | 'ta' | 'te' | 'ml' | 'kn';

export interface TranslationDictionary {
  nav_dashboard: string;
  nav_competency: string;
  nav_igot: string;
  nav_generator: string;
  nav_analytics: string;
  nav_viva: string;
  nav_official_system: string;
  nav_karmayogi: string;
  nav_switch_login: string;
  nav_sign_out: string;

  // Language selector
  lang_switch_title: string;
  lang_confirm_question: string;
  confirm: string;
  cancel: string;
  language: string;
  current_language: string;

  // Landing Page & Login
  landing_hero_title: string;
  landing_hero_subtitle: string;
  landing_sso_title: string;
  landing_sso_subtitle: string;
  landing_select_officer: string;
  landing_enter_custom: string;
  landing_sign_in_btn: string;
  landing_portal_features: string;
  feature_ai_gap_title: string;
  feature_ai_gap_desc: string;
  feature_igot_sync_title: string;
  feature_igot_sync_desc: string;
  feature_blooms_quiz_title: string;
  feature_blooms_quiz_desc: string;
  feature_viva_title: string;
  feature_viva_desc: string;

  // Dashboard & Competency
  dashboard_title: string;
  dashboard_subtitle: string;
  officer_readiness: string;
  target_competency: string;
  critical_gaps: string;
  action_start_assessment: string;
  action_generate_path: string;
  karma_points: string;
  officer_standing: string;
  key_competency_domains: string;

  // Competency Analyzer
  analyzer_title: string;
  analyzer_subtitle: string;
  action_run_ai: string;
  four_pillars: string;
  all_pillars: string;
  statistical_pillar: string;
  technical_pillar: string;
  digital_governance_pillar: string;
  behavioural_pillar: string;
  sync_igot: string;
  official_benchmark: string;
  priority_roadmap: string;

  // Competency Domain Titles (Trilingual Deep Translations)
  comp_survey_design: string;
  comp_cpi_iip: string;
  comp_national_accounts: string;
  comp_plfs_labour: string;
  comp_asi_stats: string;
  comp_sdg_nif: string;
  comp_data_quality: string;
  comp_python_r: string;
  comp_sql_stata: string;
  comp_gis_spatial: string;
  comp_ai_ml_cloud: string;
  comp_dpdp_privacy: string;
  comp_meghraj_cloud: string;
  comp_survey_mgmt: string;
  comp_ethics_comm: string;

  // Status Badges
  status_proficient: string;
  status_critical_gap: string;
  status_moderate_gap: string;

  // iGOT & NSSTA Learning Path
  learning_path_title: string;
  learning_path_subtitle: string;
  igot_catalog: string;
  nssta_tpac: string;
  enroll_module: string;
  submit_nomination: string;
  my_learning_history: string;
  view_certificate: string;

  // Quiz & MCQ Generator
  generator_title: string;
  generator_subtitle: string;
  source_manual: string;
  difficulty: string;
  blooms_focus: string;
  interactive_preview: string;
  action_generate_full: string;
  upload_material: string;
  question_count: string;

  // Analytics & Reports
  analytics_title: string;
  analytics_subtitle: string;
  learner_view: string;
  admin_view: string;
  export_telemetry: string;
  division_metrics: string;
  workforce_readiness: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    // Navigation
    nav_dashboard: "Dashboard",
    nav_competency: "Competency Analyzer",
    nav_igot: "iGOT Learning Path",
    nav_generator: "Quiz & MCQ Generator",
    nav_analytics: "Analytics & Reports",
    nav_viva: "AI Oral Viva",
    nav_official_system: "Official Statistical System",
    nav_karmayogi: "iGOT Karmayogi Ecosystem",
    nav_switch_login: "Switch Officer / Login",
    nav_sign_out: "Sign Out",

    // Language selector
    lang_switch_title: "Switch Language / भाषा बदलें / மொழி மாற்றம்",
    lang_confirm_question: "Are you sure you want to change the interface language to {lang}?",
    confirm: "Confirm",
    cancel: "Cancel",
    language: "Language",
    current_language: "English",

    // Landing Page & Login
    landing_hero_title: "MoSPI StatKarmayogi Portal",
    landing_hero_subtitle: "AI-Powered Competency Assessment & iGOT Karmayogi Learning Ecosystem for India's Official Statistical System",
    landing_sso_title: "Officer Single Sign-On (SSO)",
    landing_sso_subtitle: "Authenticate via iGOT Karmayogi Civil Services Credentials or Select Demo Profile",
    landing_select_officer: "Select Demo Officer Profile",
    landing_enter_custom: "Enter Custom Karmayogi Credentials",
    landing_sign_in_btn: "Authenticate & Enter Workspace",
    landing_portal_features: "Core Platform Capabilities",
    feature_ai_gap_title: "Real-time AI Competency Gap Analysis",
    feature_ai_gap_desc: "Evaluates officer performance against MoSPI benchmark standards across 4 competency pillars.",
    feature_igot_sync_title: "Dual iGOT & NSSTA TPAC Pathway",
    feature_igot_sync_desc: "Seamless integration with iGOT Karmayogi e-learning & NSSTA TPAC institutional programmes.",
    feature_blooms_quiz_title: "Bloom's Taxonomy MCQ Generator",
    feature_blooms_quiz_desc: "Generates grounded assessment exams directly from uploaded statistical manuals and NSS reports.",
    feature_viva_title: "AI Oral Viva Examiner Board",
    feature_viva_desc: "Simulates board oral examinations with real-time feedback and manual citation verification.",

    // Dashboard
    dashboard_title: "Officer Competency Intelligence Dashboard",
    dashboard_subtitle: "Personalized capacity building engine for India's Official Statistical System",
    officer_readiness: "Overall Readiness Score",
    target_competency: "Target Competency Benchmark",
    critical_gaps: "Critical Skill Deficits",
    action_start_assessment: "Start Assessment",
    action_generate_path: "Generate Personalized Learning Path",
    karma_points: "Karma Points",
    officer_standing: "Officer Competency Standing",
    key_competency_domains: "Key Competency Domains",

    // Competency Analyzer
    analyzer_title: "Competency Gap Evaluation Engine",
    analyzer_subtitle: "Evaluate skill deficits against MoSPI benchmark standards and map tailored iGOT courses.",
    action_run_ai: "Run Live AI Gap Analysis",
    four_pillars: "4 Competency Pillars",
    all_pillars: "All Pillars",
    statistical_pillar: "Statistical Competencies",
    technical_pillar: "Technical Competencies",
    digital_governance_pillar: "Digital Governance",
    behavioural_pillar: "Behavioural & Managerial",
    sync_igot: "Sync with iGOT Learning Path",
    official_benchmark: "Official Competency Benchmark",
    priority_roadmap: "Priority Learning Roadmap",

    // Competency Domain Titles
    comp_survey_design: "Survey Design & Sampling Methodology",
    comp_cpi_iip: "Price Statistics (CPI Base 2012=100 & IIP)",
    comp_national_accounts: "National Accounts Statistics (GVA/NVA & SUT)",
    comp_plfs_labour: "Labour Statistics (PLFS Framework)",
    comp_asi_stats: "Agricultural & Industrial Statistics (ASI)",
    comp_sdg_nif: "SDG Indicators & Metadata Standards",
    comp_data_quality: "Data Quality Frameworks & Anomaly Scrutiny",
    comp_python_r: "Python & R Analytics for Microdata Parsing",
    comp_sql_stata: "Database & Statistical Packages (SQL, Stata, SPSS)",
    comp_gis_spatial: "GIS & Spatial Analytics for Demarcation",
    comp_ai_ml_cloud: "AI/ML, Cloud Computing & Open Data APIs",
    comp_dpdp_privacy: "Data Privacy, Anonymization & DPDP Act Compliance",
    comp_meghraj_cloud: "Government Cloud (MeghRaj), DPI & Digital Signatures",
    comp_survey_mgmt: "Leadership & Survey Project Management",
    comp_ethics_comm: "Communication, Decision Making & Statistical Ethics",

    // Status Badges
    status_proficient: "Proficient",
    status_critical_gap: "Critical Deficit",
    status_moderate_gap: "Moderate Gap",

    // iGOT & NSSTA Learning Path
    learning_path_title: "Personalized Learning & Training Recommendations",
    learning_path_subtitle: "AI-curated learning pathways combining iGOT Karmayogi Digital Courses & NSSTA TPAC Recommended Programmes.",
    igot_catalog: "iGOT Karmayogi Catalog",
    nssta_tpac: "NSSTA TPAC Recommended",
    enroll_module: "Enroll Module",
    submit_nomination: "Submit TPAC Nomination",
    my_learning_history: "My Learning History",
    view_certificate: "View & Export Certificate",

    // Quiz & MCQ Generator
    generator_title: "AI-Powered MCQ & Assessment Engine",
    generator_subtitle: "Generate rigorous Bloom's Taxonomy MCQs and Quizzes grounded in official MoSPI manuals and uploaded documents.",
    source_manual: "Source Statistical Manual",
    difficulty: "Target Difficulty",
    blooms_focus: "Bloom's Taxonomy Focus",
    interactive_preview: "Interactive Assessment Preview",
    action_generate_full: "Generate Full Assessment Exam",
    upload_material: "Upload Learning Materials (PDF / DOCX / PPTX)",
    question_count: "Number of Questions",

    // Analytics & Reports
    analytics_title: "Capacity Building Analytics & Performance Telemetry",
    analytics_subtitle: "Monitor workforce competency distribution, training impact, and predictive skill requirement insights.",
    learner_view: "Learner View",
    admin_view: "Administrator View",
    export_telemetry: "Export Telemetry CSV",
    division_metrics: "Division-wide Readiness",
    workforce_readiness: "Workforce Competency Distribution",
  },

  hi: {
    // Navigation
    nav_dashboard: "डैशबोर्ड",
    nav_competency: "दक्षता विश्लेषण",
    nav_igot: "iGOT शिक्षण मार्ग",
    nav_generator: "क्विज़ एवं प्रश्न निर्माता",
    nav_analytics: "विश्लेषण एवं रिपोर्ट",
    nav_viva: "एआई मौखिक परीक्षा",
    nav_official_system: "आधिकारिक सांख्यिकी प्रणाली",
    nav_karmayogi: "iGOT कर्मयोगी पारिस्थितिकी तंत्र",
    nav_switch_login: "अधिकारी बदलें / लॉगिन करें",
    nav_sign_out: "साइन आउट",

    // Language selector
    lang_switch_title: "भाषा बदलें / Switch Language / மொழி மாற்றம்",
    lang_confirm_question: "क्या आप इंटरफ़ेस भाषा को {lang} में बदलना चाहते हैं?",
    confirm: "पुष्टि करें",
    cancel: "रद्द करें",
    language: "भाषा",
    current_language: "हिंदी",

    // Landing Page & Login
    landing_hero_title: "एमओएसपीआई स्टैटकर्मयोगी पोर्टल",
    landing_hero_subtitle: "भारत की आधिकारिक सांख्यिकी प्रणाली के लिए एआई-संचालित दक्षता मूल्यांकन एवं iGOT कर्मयोगी शिक्षण मंच",
    landing_sso_title: "अधिकारी एकल साइन-ऑन (SSO)",
    landing_sso_subtitle: "iGOT कर्मयोगी सिविल सेवा क्रेडेंशियल्स के माध्यम से प्रमाणित करें या डेमो प्रोफ़ाइल चुनें",
    landing_select_officer: "डेमो अधिकारी प्रोफ़ाइल चुनें",
    landing_enter_custom: "कस्टम कर्मयोगी क्रेडेंशियल्स दर्ज करें",
    landing_sign_in_btn: "प्रमाणित करें एवं कार्यक्षेत्र में प्रवेश करें",
    landing_portal_features: "मुख्य प्लेटफ़ॉर्म क्षमताएं",
    feature_ai_gap_title: "रियल-टाइम एआई दक्षता अंतर विश्लेषण",
    feature_ai_gap_desc: "4 मुख्य दक्षता स्तंभों में एमओएसपीआई बेंचमार्क मानकों के विरुद्ध अधिकारी प्रदर्शन का मूल्यांकन करता है।",
    feature_igot_sync_title: "दोहरा iGOT एवं NSSTA TPAC मार्ग",
    feature_igot_sync_desc: "iGOT कर्मयोगी ई-लर्निंग और NSSTA TPAC संस्थागत कार्यक्रमों के साथ निर्बाध एकीकरण।",
    feature_blooms_quiz_title: "ब्लूम्स टैक्सोनॉमी एमसीक्यू जनरेटर",
    feature_blooms_quiz_desc: "अपलोड किए गए सांख्यिकीय मैनुअल और एनएसएस रिपोर्टों से सीधे परीक्षा उत्पन्न करता है।",
    feature_viva_title: "एआई मौखिक परीक्षा बोर्ड",
    feature_viva_desc: "वास्तविक समय की प्रतिक्रिया और मैनुअल संदर्भ सत्यापन के साथ मौखिक परीक्षाओं का अनुकरण करता है।",

    // Dashboard
    dashboard_title: "अधिकारी दक्षता बुद्धिमत्ता डैशबोर्ड",
    dashboard_subtitle: "भारत की आधिकारिक सांख्यिकी प्रणाली के लिए व्यक्तिगत क्षमता निर्माण इंजन",
    officer_readiness: "समग्र तत्परता स्कोर",
    target_competency: "लक्ष्य दक्षता मानदंड",
    critical_gaps: "महत्वपूर्ण कौशल कमियां",
    action_start_assessment: "मूल्यांकन शुरू करें",
    action_generate_path: "व्यक्तिगत शिक्षण मार्ग उत्पन्न करें",
    karma_points: "कर्म अंक",
    officer_standing: "अधिकारी दक्षता स्थिति",
    key_competency_domains: "मुख्य दक्षता क्षेत्र",

    // Competency Analyzer
    analyzer_title: "दक्षता अंतर मूल्यांकन इंजन",
    analyzer_subtitle: "एमओएसपीआई मानक बेंचमार्क के विरुद्ध कौशल कमियों का मूल्यांकन करें और अनुकूलित iGOT पाठ्यक्रमों को मैप करें।",
    action_run_ai: "लाइव एआई अंतर विश्लेषण चलाएं",
    four_pillars: "4 मुख्य दक्षता स्तंभ",
    all_pillars: "सभी स्तंभ",
    statistical_pillar: "सांख्यिकीय दक्षताएँ",
    technical_pillar: "तकनीकी दक्षताएँ",
    digital_governance_pillar: "डिजिटल शासन",
    behavioural_pillar: "व्यवहारिक एवं प्रबंधकीय",
    sync_igot: "iGOT शिक्षण मार्ग के साथ समन्वयित करें",
    official_benchmark: "आधिकारिक दक्षता बेंचमार्क",
    priority_roadmap: "प्राथमिकता शिक्षण रोडमैप",

    // Competency Domain Titles (Hindi)
    comp_survey_design: "सर्वेक्षण डिज़ाइन एवं प्रतिचयन कार्यप्रणाली",
    comp_cpi_iip: "मूल्य सांख्यिकी (सीपीआई आधार 2012=100 एवं आईआईपी)",
    comp_national_accounts: "राष्ट्रीय लेखा सांख्यिकी (जीवीए/एनवीए एवं एसयूटी)",
    comp_plfs_labour: "श्रम सांख्यिकी (पीएलएफएस ढांचा)",
    comp_asi_stats: "कृषि एवं औद्योगिक सांख्यिकी (एएसआई)",
    comp_sdg_nif: "एसडीजी संकेतक एवं मेटाडेटा मानक",
    comp_data_quality: "डेटा गुणवत्ता ढांचा एवं विसंगति जांच",
    comp_python_r: "माइक्रोडेटा विश्लेषण हेतु पायथन एवं आर",
    comp_sql_stata: "डेटाबेस एवं सांख्यिकीय पैकेज (SQL, Stata, SPSS)",
    comp_gis_spatial: "सीमांकन हेतु जीआईएस एवं स्थानिक विश्लेषण",
    comp_ai_ml_cloud: "एआई/एमएल, क्लाउड कंप्यूटिंग एवं ओपन डेटा एपीआई",
    comp_dpdp_privacy: "डेटा गोपनीयता, अनामीकरण एवं डीपीडीपी अधिनियम अनुपालन",
    comp_meghraj_cloud: "सरकारी क्लाउड (मेघराज), डीपीआई एवं डिजिटल हस्ताक्षर",
    comp_survey_mgmt: "नेतृत्व एवं सर्वेक्षण परियोजना प्रबंधन",
    comp_ethics_comm: "संचार, निर्णय लेना एवं सांख्यिकीय नैतिकता",

    // Status Badges
    status_proficient: "कुशल",
    status_critical_gap: "गंभीर कमी",
    status_moderate_gap: "मध्यम अंतर",

    // iGOT & NSSTA Learning Path
    learning_path_title: "व्यक्तिगत शिक्षण एवं प्रशिक्षण सिफारिशें",
    learning_path_subtitle: "iGOT कर्मयोगी डिजिटल पाठ्यक्रम और NSSTA TPAC अनुशंसित कार्यक्रमों का एआई-क्युरेटेड संयोजन।",
    igot_catalog: "iGOT कर्मयोगी कैटलॉग",
    nssta_tpac: "NSSTA TPAC अनुशंसित",
    enroll_module: "मॉड्यूल में नामांकन करें",
    submit_nomination: "टीपीएसी नामांकन प्रस्तुत करें",
    my_learning_history: "मेरा शिक्षण इतिहास",
    view_certificate: "प्रमाणपत्र देखें एवं निर्यात करें",

    // Quiz & MCQ Generator
    generator_title: "एआई-संचालित एमसीक्यू एवं मूल्यांकन इंजन",
    generator_subtitle: "आधिकारिक एमओएसपीआई मैनुअल और अपलोड किए गए दस्तावेज़ों पर आधारित ब्लूम्स टैक्सोनॉमी एमसीक्यू उत्पन्न करें।",
    source_manual: "स्रोत सांख्यिकी मैनुअल",
    difficulty: "लक्ष्य कठिनाई",
    blooms_focus: "ब्लूम्स टैक्सोनॉमी फोकस",
    interactive_preview: "इंटरएक्टिव मूल्यांकन पूर्वावलोकन",
    action_generate_full: "पूर्ण मूल्यांकन परीक्षा उत्पन्न करें",
    upload_material: "शिक्षण सामग्री अपलोड करें (PDF / DOCX / PPTX)",
    question_count: "प्रश्नों की संख्या",

    // Analytics & Reports
    analytics_title: "क्षमता निर्माण विश्लेषण एवं प्रदर्शन टेलीमेट्री",
    analytics_subtitle: "कार्यबल दक्षता वितरण, प्रशिक्षण प्रभाव और पूर्वानुमानित कौशल आवश्यकताओं की निगरानी करें।",
    learner_view: "शिक्षार्थी दृश्य",
    admin_view: "प्रशासक दृश्य",
    export_telemetry: "टेलीमेट्री CSV निर्यात करें",
    division_metrics: "प्रभाग-वार तत्परता",
    workforce_readiness: "कार्यबल दक्षता वितरण",
  },

  ta: {
    // Navigation
    nav_dashboard: "டாஷ்போர்டு",
    nav_competency: "திறன் பகுப்பாய்வு",
    nav_igot: "iGOT கற்றல் பாதை",
    nav_generator: "வினாடி வினா தயாரிப்பாளர்",
    nav_analytics: "பகுப்பாய்வு மற்றும் அறிக்கைகள்",
    nav_viva: "AI வாய்மொழி தேர்வு",
    nav_official_system: "அதிகாரப்பூர்வ புள்ளியியல் அமைப்பு",
    nav_karmayogi: "iGOT கர்மயோகி சுற்றுச்சூழல் அமைப்பு",
    nav_switch_login: "அதிகாரியை மாற்று / உள்நுழைக",
    nav_sign_out: "வெளியேறு",

    // Language selector
    lang_switch_title: "மொழி மாற்றம் / Switch Language / भाषा बदलें",
    lang_confirm_question: "இணைப்பு மொழியை {lang} ஆக மாற்ற நிச்சயமாக விரும்புகிறீர்களா?",
    confirm: "உறுதிப்படுத்து",
    cancel: "ரத்து செய்",
    language: "மொழி",
    current_language: "தமிழ்",

    // Landing Page & Login
    landing_hero_title: "MoSPI ஸ்டாட்கர்மயோகி போர்ட்டல்",
    landing_hero_subtitle: "இந்தியாவின் அதிகாரப்பூர்வ புள்ளியியல் அமைப்பிற்கான AI-இயங்கும் திறன் மதிப்பீடு மற்றும் iGOT கர்மயோகி கற்றல் தளம்",
    landing_sso_title: "அதிகாரி ஒற்றை உள்நுழைவு (SSO)",
    landing_sso_subtitle: "iGOT கர்மயோகி சான்றுகள் அல்லது டெமோ சுயவிவரம் மூலம் உள்நுழையவும்",
    landing_select_officer: "டெமோ அதிகாரி சுயவிவரத்தைத் தேர்ந்தெடுக்கவும்",
    landing_enter_custom: "விருப்ப கர்மயோகி சான்றுகளை உள்ளிடவும்",
    landing_sign_in_btn: "உறுதிசெய்து பணிப்பகுதிக்குள் நுழையவும்",
    landing_portal_features: "முதன்மை தளம் திறன்கள்",
    feature_ai_gap_title: "நேரலை AI திறன் இடைவெளி பகுப்பாய்வு",
    feature_ai_gap_desc: "4 முதன்மை திறன் தூண்களில் MoSPI தரநிலைகளுக்கு எதிராக அதிகாரி செயல்திறனை மதிப்பிடுகிறது.",
    feature_igot_sync_title: "இரட்டை iGOT & NSSTA TPAC பாதை",
    feature_igot_sync_desc: "iGOT கர்மயோகி மின்-கற்றல் மற்றும் NSSTA TPAC நிறுவன திட்டங்களுடன் தடையற்ற ஒருங்கிணைப்பு.",
    feature_blooms_quiz_title: "புளூம்ஸ் வினாடி வினா தயாரிப்பாளர்",
    feature_blooms_quiz_desc: "பதிவேற்றப்பட்ட புள்ளியியல் கையேடுகளிலிருந்து நேரடியாக தேர்வினை உருவாக்குகிறது.",
    feature_viva_title: "AI வாய்மொழி தேர்வு வாரியம்",
    feature_viva_desc: "நேரலை கருத்து மற்றும் கையேடு சரிபார்ப்புடன் வாய்மொழி தேர்வுகளை உருவகப்படுத்துகிறது.",

    // Dashboard
    dashboard_title: "அதிகாரி திறன் நுண்ணறிவு முகப்பு",
    dashboard_subtitle: "இந்தியாவின் அதிகாரப்பூர்வ புள்ளியியல் அமைப்பிற்கான தனிப்பயனாக்கப்பட்ட திறன் மேம்பாட்டு இயந்திரம்",
    officer_readiness: "ஒட்டுமொத்த தயார்நிலை மதிப்பெண்",
    target_competency: "இலக்கு திறன் பெஞ்ச்மார்க்",
    critical_gaps: "முக்கிய திறன் குறைபாடுகள்",
    action_start_assessment: "மதிப்பீட்டைத் தொடங்கு",
    action_generate_path: "தனிப்பயனாக்கப்பட்ட கற்றல் பாதையை உருவாக்கு",
    karma_points: "கர்ம புள்ளிகள்",
    officer_standing: "அதிகாரி திறன் நிலை",
    key_competency_domains: "முக்கிய திறன் களங்கள்",

    // Competency Analyzer
    analyzer_title: "திறன் இடைவெளி மதிப்பீட்டு பொறி",
    analyzer_subtitle: "MoSPI தரநிலைகளுக்கு எதிராக திறன் குறைபாடுகளை மதிப்பிட்டு iGOT படிப்புகளை வரைபடமாக்குங்கள்.",
    action_run_ai: "நேரலை AI இடைவெளி பகுப்பாய்வை இயக்கு",
    four_pillars: "4 முதன்மை திறன் தூண்கள்",
    all_pillars: "அனைத்து தூண்களும்",
    statistical_pillar: "புள்ளியியல் திறன்கள்",
    technical_pillar: "தொழில்நுட்ப திறன்கள்",
    digital_governance_pillar: "டிஜிட்டல் ஆளுகை",
    behavioural_pillar: "நடத்தை மற்றும் மேலாண்மை",
    sync_igot: "iGOT கற்றல் பாதையுடன் ஒத்திசைக்கவும்",
    official_benchmark: "அதிகாரப்பூர்வ திறன் பெஞ்ச்மார்க்",
    priority_roadmap: "முன்னுரிமை கற்றல் சாலை வரைபடம்",

    // Competency Domain Titles (Tamil)
    comp_survey_design: "கணிப்பு வடிவமைப்பு மற்றும் மாதிரி முறைமை",
    comp_cpi_iip: "விலை புள்ளியியல் (CPI அடிப்படை 2012=100 & IIP)",
    comp_national_accounts: "தேசிய கணக்குகள் புள்ளியியல் (GVA/NVA & SUT)",
    comp_plfs_labour: "தொழிலாளர் புள்ளியியல் (PLFS கட்டமைப்பு)",
    comp_asi_stats: "வேளாண் மற்றும் தொழில்துறை புள்ளியியல் (ASI)",
    comp_sdg_nif: "SDG குறிகாட்டிகள் மற்றும் தரநிலைகள்",
    comp_data_quality: "தரவு தரக் கட்டமைப்பு மற்றும் முரண்பாடு ஆய்வு",
    comp_python_r: "நுண் தரவு பகுப்பாய்விற்கான பைதான் & ஆர்",
    comp_sql_stata: "தரவுத்தளம் மற்றும் புள்ளியியல் தொகுப்புகள் (SQL, Stata)",
    comp_gis_spatial: "எல்லை நிர்ணயத்திற்கான GIS & இடஞ்சார்ந்த பகுப்பாய்வு",
    comp_ai_ml_cloud: "AI/ML, மேகக்கணி கணிப்பொறி & திறந்த தரவு API",
    comp_dpdp_privacy: "தரவு தனியுரிமை & DPDP சட்டம் இணக்கம்",
    comp_meghraj_cloud: "அரசு மேகக்கணி (மேக்ராஜ்) & டிஜிட்டல் கையொப்பங்கள்",
    comp_survey_mgmt: "தலைமைத்துவம் மற்றும் கணிப்பு திட்ட மேலாண்மை",
    comp_ethics_comm: "தொடர்பு, முடிவெடுத்தல் மற்றும் புள்ளியியல் நெறிமுறைகள்",

    // Status Badges
    status_proficient: "திறமையானவர்",
    status_critical_gap: "முக்கிய குறைபாடு",
    status_moderate_gap: "மிதமான இடைவெளி",

    // iGOT & NSSTA Learning Path
    learning_path_title: "தனிப்பயனாக்கப்பட்ட கற்றல் மற்றும் பயிற்சி பரிந்துரைகள்",
    learning_path_subtitle: "iGOT கர்மயோகி டிஜிட்டல் படிப்புகள் & NSSTA TPAC பரிந்துரைக்கப்பட்ட திட்டங்களை இணைக்கும் AI-பரிந்துரை பாதை.",
    igot_catalog: "iGOT கர்மயோகி பட்டியல்",
    nssta_tpac: "NSSTA TPAC பரிந்துரைக்கப்பட்டது",
    enroll_module: "தொகுதியில் சேரவும்",
    submit_nomination: "TPAC பரிந்துரையை சமர்ப்பிக்கவும்",
    my_learning_history: "என் கற்றல் வரலாறு",
    view_certificate: "சான்றிதழைப் பார் மற்றும் ஏற்றுமதி செய்",

    // Quiz & MCQ Generator
    generator_title: "AI-இயங்கும் வினாடி வினா மற்றும் மதிப்பீட்டு பொறி",
    generator_subtitle: "MoSPI கையேடுகள் மற்றும் பதிவேற்றப்பட்ட ஆவணங்களை அடிப்படையாகக் கொண்ட புளூம்ஸ் வினாடி வினாக்களை உருவாக்குங்கள்.",
    source_manual: "மூல புள்ளியியல் கையேடு",
    difficulty: "இலக்கு சிரமம்",
    blooms_focus: "ப்ளூம்ஸ் வகைபிரித்தல் கவனம்",
    interactive_preview: "ஊடாடும் மதிப்பீட்டு முன்னோட்டம்",
    action_generate_full: "முழு மதிப்பீட்டு தேர்வை உருவாக்கு",
    upload_material: "கற்றல் பொருட்களைப் பதிவேற்றவும் (PDF / DOCX / PPTX)",
    question_count: "கேள்விகளின் எண்ணிக்கை",

    // Analytics & Reports
    analytics_title: "திறன் மேம்பாட்டு பகுப்பாய்வு மற்றும் செயல்பாட்டு தரவு",
    analytics_subtitle: "பணியாளர்களின் திறன் விநியோகம், பயிற்சி தாக்கம் மற்றும் கணிப்புத் திறன் தேவைகளை கண்காணிக்கவும்.",
    learner_view: "கற்பவர் பார்வை",
    admin_view: "நிர்வாகி பார்வை",
    export_telemetry: "செயல்பாட்டு தரவு CSV ஏற்றுமதி",
    division_metrics: "பிரிவு வாரியான தயார்நிலை",
    workforce_readiness: "பணியாளர் திறன் விநியோகம்",
  },
  te: {} as any,
  ml: {} as any,
  kn: {} as any
};

// Post-initialize Telugu, Malayalam, and Kannada translations to reuse English default keys
TRANSLATIONS.te = {
  ...TRANSLATIONS.en,
  lang_switch_title: "భాషను మార్చండి (Switch Language)",
  lang_confirm_question: "ఇంటర్‌ఫేస్ భాషను {lang} కి మార్చాలనుకుంటున్నారా?",
  confirm: "ధృవీకరించు",
  cancel: "రద్దు చేయి",
  language: "భాష",
  current_language: "తెలుగు",
  landing_hero_title: "MoSPI స్టాట్‌కర్మయోగి పోర్టల్",
  landing_hero_subtitle: "భారతదేశ అధికారిక గణాంక వ్యవస్థ కోసం AI-ఆధారిత సామర్థ్య అంచనా & iGOT కర్మయోగి అభ్యాస పర్యావరణ వ్యవస్థ",
  landing_sso_title: "అధికారి సింగిల్ సైన్-ఆన్ (SSO)",
  landing_sso_subtitle: "iGOT కర్మయోగి సివిల్ సర్వీసెస్ ఆధారాల ద్వారా లాగిన్ అవ్వండి లేదా డెమో ప్రొఫైల్‌ను ఎంచుకోండి",
  landing_select_officer: "డెమో అధికారి ప్రొఫైల్‌ను ఎంచుకోండి",
  landing_enter_custom: "కస్టమ్ కర్మయోగి ఆధారాలను నమోదు చేయండి",
  landing_sign_in_btn: "ధృవీకరించండి & వర్క్‌స్పేస్‌లోకి ప్రవేశించండి",
  nav_dashboard: "డాష్‌బోర్డ్",
  nav_competency: "సామర్థ్య విశ్లేషణ",
  nav_igot: "iGOT లెర్నింగ్ పాత్",
  nav_generator: "క్విజ్ & MCQ జనరేటర్",
  nav_analytics: "విశ్లేషణలు & నివేదికలు",
  nav_viva: "AI మౌఖిక వివా",
  status_proficient: "నైపుణ్యం గల",
  status_critical_gap: "తీవ్రమైన లోటు",
  status_moderate_gap: "మితమైన అంతరం"
};

TRANSLATIONS.ml = {
  ...TRANSLATIONS.en,
  lang_switch_title: "ഭാഷ മാറ്റുക (Switch Language)",
  lang_confirm_question: "ഇന്റർഫേസ് ഭാഷ {lang} ലേക്ക് മാറ്റാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുണ്ടോ?",
  confirm: "സ്ഥിരീകരിക്കുക",
  cancel: "റദ്ദാക്കുക",
  language: "ഭാഷ",
  current_language: "മലയാളം",
  landing_hero_title: "MoSPI സ്റ്റാറ്റ്കർമ്മയോഗി പോർട്ടൽ",
  landing_hero_subtitle: "ഇന്ത്യയുടെ ഔദ്യോഗിക സ്റ്റാറ്റിസ്റ്റിക്കൽ സിസ്റ്റത്തിനായി AI-അധിഷ്ഠിത ശേഷി വിലയിരുത്തലും iGOT കർമ്മയോഗി ലേണിംഗ് ഇക്കോസിസ്റ്റവും",
  landing_sso_title: "ഓഫീസർ സിംഗിൾ സൈൻ-ഓൺ (SSO)",
  landing_sso_subtitle: "iGOT കർമ്മയോഗി സിവിൽ സർവീസസ് ക്രെഡൻഷ്യലുകൾ വഴി ലോഗിൻ ചെയ്യുക അല്ലെങ്കിൽ ഡെമോ പ്രൊഫൈൽ തിരഞ്ഞെടുക്കുക",
  landing_select_officer: "ಡೆಮೊ ഓഫീಸರ್ ಪ್ರೊಫೈಲ್ തിരഞ്ഞെടുക്കുക",
  landing_enter_custom: "ഇഷ്ടാനുസൃത കർമ്മയോഗി ക്രെഡൻഷ്യലുകൾ നൽകുക",
  landing_sign_in_btn: "സ്ഥിരീകരിച്ച് വർക്ക്സ്പേസിൽ പ്രവേശിക്കുക",
  nav_dashboard: "ഡാഷ്‌ബോർഡ്",
  nav_competency: "ശേഷി വിശകലനം",
  nav_igot: "iGOT ലೇണിംഗ് പാത്ത്",
  nav_generator: "ക്വിസ് & MCQ ജനറേറ്റർ",
  nav_analytics: "അനലിറ്റിക്സും റിപ്പോർട്ടുകളും",
  nav_viva: "AI വോയ്‌း വിവാ",
  status_proficient: "ಪ್ರವೀಣ್",
  status_critical_gap: "ഗുരുതരമായ കുറവ്",
  status_moderate_gap: "മിതമായ വ്യത്യാസം"
};

TRANSLATIONS.kn = {
  ...TRANSLATIONS.en,
  lang_switch_title: "ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಿ (Switch Language)",
  lang_confirm_question: "ಇಂಟರ್ಫೇಸ್ ಭಾಷೆಯನ್ನು {lang} ಗೆ ಬದಲಾಯಿಸಲು ನೀವು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?",
  confirm: "ಖಚಿತಪಡಿಸಿ",
  cancel: "ರದ್ದುಮಾಡಿ",
  language: "ಭಾಷೆ",
  current_language: "ಕನ್ನಡ",
  landing_hero_title: "MoSPI ಸ್ಟಾಟ್‌ಕರ್ಮಯೋಗಿ ಪೋರ್ಟಲ್",
  landing_hero_subtitle: "ಭಾರತದ ಅಧಿಕೃತ ಸಾಂಖ್ಯಿಕ ವ್ಯವಸ್ಥೆಗಾಗಿ AI-ಚಾಲಿತ ಸಾಮರ್ಥ್ಯ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು iGOT ಕರ್ಮಯೋಗಿ ಕಲಿಕಾ ಪರಿಸರ ವ್ಯವಸ್ಥೆ",
  landing_sso_title: "ಅಧಿಕಾರಿ ಸಿಂಗಲ್ ಸೈನ್-ಆನ್ (SSO)",
  landing_sso_subtitle: "iGOT ಕರ್ಮಯೋಗಿ ನಾಗರಿಕ ಸೇವೆಗಳ ರುಜುವಾತುಗಳ ಮೂಲಕ ಲಾಗ್ ಇನ್ ಮಾಡಿ ಅಥವಾ ಡೆಮೋ ಪ್ರೊಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ",
  landing_select_officer: "ಡೆಮೋ ಅಧಿಕಾರಿ ಪ್ರೊಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ",
  landing_enter_custom: "ಕಸ್ಟಮ್ ಕರ್ಮಯೋಗಿ ರುಜುವಾತುಗಳನ್ನು ನಮೂದಿಸಿ",
  landing_sign_in_btn: "ದೃಢೀಕರಿಸಿ ಮತ್ತು ವರ್ಕ್‌ಸ್ಪೇಸ್‌ಗೆ ಪ್ರವೇಶಿಸಿ",
  nav_dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  nav_competency: "ಸಾಮರ್ಥ್ಯ ವಿಶ್ಲೇಷಣೆ",
  nav_igot: "iGOT ಕಲಿಕಾ ಮಾರ್ಗ",
  nav_generator: "ಕ್ವಿಜ್ ಮತ್ತು MCQ ಜನರೇಟರ್",
  nav_analytics: "ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ವರದಿಗಳು",
  nav_viva: "AI ಮೌಖಿಕ ಪರೀಕ್ಷೆ",
  status_proficient: "ಪರಿಣಿತ",
  status_critical_gap: "ಗಂಭೀರ ಕೊರತೆ",
  status_moderate_gap: "ಮಧ್ಯಮ ಅಂತರ"
};
