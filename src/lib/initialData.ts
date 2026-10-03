import { Course, QuizExam, UpcomingExam, User, QnAPost } from '../types';

export const INITIAL_USER: User = {
  id: 'usr_nepal_001',
  email: 'nischal.student@gmail.com',
  phone: '+977-9841892301',
  full_name: 'Nischal Acharya',
  role: 'student',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  created_at: '2026-01-15T08:00:00Z',
};

export const INITIAL_UPCOMING_EXAMS: UpcomingExam[] = [
  {
    id: 'exam_loksewa_nasu',
    organization: 'Public Service Commission (Loksewa Aayog)',
    organization_nepali: 'लोक सेवा आयोग, अनामनगर',
    post_name: 'Nayab Subba (NaSu) - First Paper (GK & IQ)',
    post_name_nepali: 'नायब सुब्बा प्रथम पत्र (सामान्य ज्ञान र बौद्धिक परीक्षण)',
    date_bs: '२०८३ असोज २४ गते',
    date_ad: 'Oct 10, 2026',
    days_remaining: 7,
    level: 'Non-Gazetted 1st Class (रा.प.अनं. प्रथम)',
    syllabus_url: 'https://psc.gov.np',
    application_deadline_bs: '२०८३ भाद्र २० गते',
  },
  {
    id: 'exam_rbb_assistant',
    organization: 'Rastriya Banijya Bank Limited (RBBL)',
    organization_nepali: 'राष्ट्रिय वाणिज्य बैंक लिमिटेड (RBB)',
    post_name: 'Senior Assistant (Level 4 - Administration & Cash)',
    post_name_nepali: 'वरिष्ठ सहायक (तह ४ - प्रशासन तथा नगद)',
    date_bs: '२०८३ कार्तिक १५ गते',
    date_ad: 'Oct 31, 2026',
    days_remaining: 28,
    level: 'Assistant Level 4 (सहायक तह ४)',
    syllabus_url: 'https://rbb.com.np',
    application_deadline_bs: '२०८३ असोज १० गते',
  },
  {
    id: 'exam_loksewa_adhikrit',
    organization: 'Public Service Commission (Loksewa Aayog)',
    organization_nepali: 'लोक सेवा आयोग, केन्द्रीय कार्यालय',
    post_name: 'Section Officer (Sakha Adhikrit) - All Papers',
    post_name_nepali: 'शाखा अधिकृत (प्रशासन, लेखा परीक्षण र परराष्ट्र)',
    date_bs: '२०८३ मंसिर २ गते',
    date_ad: 'Nov 17, 2026',
    days_remaining: 45,
    level: 'Gazetted 3rd Class (रा.प. तृतीय)',
    syllabus_url: 'https://psc.gov.np',
    application_deadline_bs: '२०८३ कार्तिक ०५ गते',
  },
  {
    id: 'exam_tu_cmat',
    organization: 'Tribhuvan University (FOM - TU Dean Office)',
    organization_nepali: 'त्रिभुवन विश्वविद्यालय, व्यवस्थापन संकाय',
    post_name: 'CMAT Entrance Examination 2083 (BBA/BBM/BHM)',
    post_name_nepali: 'केन्द्रीय व्यवस्थापन प्रवेश परीक्षा (CMAT २०८३)',
    date_bs: '२०८३ कार्तिक २८ गते',
    date_ad: 'Nov 13, 2026',
    days_remaining: 41,
    level: 'Undergraduate Entrance',
    syllabus_url: 'https://fomecd.edu.np',
    application_deadline_bs: '२०८३ कार्तिक १५ गते',
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'crs_loksewa_nasu_01',
    title: 'Loksewa Nayab Subba (NaSu) First Paper Masterclass (GK + IQ)',
    title_nepali: 'नायब सुब्बा प्रथम पत्र सम्पूर्ण तयारी (GK + IQ मास्टरक्लास)',
    slug: 'loksewa-nasu-first-paper-masterclass',
    description: 'Complete syllabus coverage for Loksewa NaSu 1st paper based on the latest 2083/2084 curriculum. Includes 120+ HD video lectures, 40 mock test sets, and downloadable PDF revision mindmaps.',
    description_nepali: 'लोक सेवा आयोगको नयाँ पाठ्यक्रम अनुसार नायब सुब्बा प्रथम पत्रको पूर्ण तयारी। नेपालको भूगोल, इतिहास, संविधान, आर्थिक अवस्था र IQ ट्रिक्स सहित।',
    price_npr: 3999,
    original_price_npr: 6500,
    thumbnail_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
    category: 'Loksewa (लोकसेवा)',
    level: 'Non-Gazetted 1st (नासु)',
    instructor_name: 'Govinda Giri & Subash Chandra KC',
    instructor_title: 'Ex-Under Secretary & Renowned Loksewa Author',
    instructor_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    total_hours: 48.5,
    total_lessons: 32,
    rating: 4.94,
    enrolled_count: 3420,
    is_published: true,
    is_live_class: true,
    live_class_schedule: 'Daily 6:30 AM - 8:00 AM (Morning Batch)',
    features: [
      'DRM Protected Piracy-Free HD Video Lessons',
      'Daily 2083 B.S. Current Affairs & Contemporary Issues',
      'Instant PWA Offline Note Caching (No Internet Needed)',
      '40 Full Mock Test Papers with Loksewa 20% Negative Marking',
      'Direct Faculty Q&A & Weekly Live Zoom Interaction'
    ],
    modules: [
      {
        id: 'mod_1',
        course_id: 'crs_loksewa_nasu_01',
        title: '१. नेपालको भूगोल र प्राकृतिक सम्पदा (Geography of Nepal)',
        order_index: 1,
        lessons: [
          {
            id: 'les_101',
            course_id: 'crs_loksewa_nasu_01',
            title: 'नेपालको भौगोलिक अवस्थिति, सिमाना र प्रादेशिक विभाजन',
            title_nepali: 'नेपालको भौगोलिक अवस्थिति र ७ प्रदेशको तुलनात्मक अध्ययन',
            duration_minutes: 34,
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            order_index: 1,
            is_free_preview: true,
            notes_title: 'नेपालको सिमाना र भौगोलिक विभाजन विस्तृत टिपोट.pdf',
            summary_text: 'नेपाल २६ डिग्री २२ मिनेट देखि ३० डिग्री २७ मिनेट उत्तरी अक्षांश र ८० डिग्री ४ मिनेट देखि ८८ डिग्री १२ मिनेट पूर्वी देशान्तरमा फैलिएको छ। पूर्व-पश्चिम औसत लम्बाइ ८८५ कि.मी. छ। ७ प्रदेश र ७७ जिल्लाको आधारभूत तथ्यांक।',
          },
          {
            id: 'les_102',
            course_id: 'crs_loksewa_nasu_01',
            title: 'नेपालका प्रमुख नदीनाला, ताल तलैया र हिमालहरू',
            title_nepali: 'प्रमुख नदी प्रणाली: कोशी, गण्डकी, कर्णाली र ८ हजार मिटर माथिका हिमाल',
            duration_minutes: 42,
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            order_index: 2,
            is_free_preview: false,
            notes_title: 'नदीनाला र ताल तलैया संक्षिप्त चार्ट.pdf',
            summary_text: 'नेपालमा ६,००० भन्दा बढी नदीनाला छन्। नेपालका प्रथम स्तरका नदीहरू: कोशी (सप्तकोशी), गण्डकी (सप्तगण्डकी) र कर्णाली। सगरमाथा (८,८४८.८६ मिटर) सहित विश्वका १४ मध्ये ८ सर्वोच्च शिखर नेपालमा छन्।',
          },
          {
            id: 'les_103',
            course_id: 'crs_loksewa_nasu_01',
            title: 'हावापानी, राष्ट्रिय निकुञ्ज र जैविक विविधता',
            title_nepali: 'हावापानीका प्रकार र १२ वटा राष्ट्रिय निकुञ्जहरूको संरक्षण स्थिति',
            duration_minutes: 38,
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            order_index: 3,
            is_free_preview: false,
            notes_title: 'संरक्षित क्षेत्र र वन्यजन्तु संरक्षण ऐन २०२०.pdf',
            summary_text: 'नेपालमा ५ प्रकारका हावापानी पाइन्छन्: उष्ण, समशीतोष्ण, चिसो समशीतोष्ण, लेकाली र हिमाली (टुन्ड्रा)। नेपालको पहिलो राष्ट्रिय निकुञ्ज चितवन (वि.सं. २०३०)।',
          }
        ]
      },
      {
        id: 'mod_2',
        course_id: 'crs_loksewa_nasu_01',
        title: '२. बौद्धिक परीक्षण (General Mental Ability / IQ Mastery)',
        order_index: 2,
        lessons: [
          {
            id: 'les_104',
            course_id: 'crs_loksewa_nasu_01',
            title: 'Number Series, Alphabet Coding & Decoding Magic Tricks',
            title_nepali: 'संख्या श्रेणी र कोडिङ/डिकोडिङका सर्टकट सूत्रहरू',
            duration_minutes: 45,
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            order_index: 4,
            is_free_preview: true,
            notes_title: 'IQ Series Patterns Cheat Sheet.pdf',
            summary_text: 'Series problem types: Arithmetic progression, Geometric ratios, Prime sequences, Alternating operations, Differences of differences, and Fibonacci variants.',
          },
          {
            id: 'les_105',
            course_id: 'crs_loksewa_nasu_01',
            title: 'Direction and Distance, Blood Relation Reasoning',
            title_nepali: 'दिशा र दूरी तथा नाता सम्बन्ध (Diagrammatic approach)',
            duration_minutes: 50,
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            order_index: 5,
            is_free_preview: false,
            notes_title: 'Blood Relation Family Tree Formulas.pdf',
            summary_text: 'Right turns, Left turns, shadow problems at sunrise/sunset, and generation-by-generation family tree modeling for fast solving in under 30 seconds.',
          }
        ]
      },
      {
        id: 'mod_3',
        course_id: 'crs_loksewa_nasu_01',
        title: '३. नेपालको संविधान र शासन प्रणाली (Constitution of Nepal 2072)',
        order_index: 3,
        lessons: [
          {
            id: 'les_106',
            course_id: 'crs_loksewa_nasu_01',
            title: 'नेपालको संविधान २०७२: मौलिक हक र कर्तव्यहरू (धारा १६ देखि ४८)',
            title_nepali: '३१ वटा मौलिक हकहरू याद गर्ने अचुक तरिका र संवैधानिक उपचार',
            duration_minutes: 55,
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
            order_index: 6,
            is_free_preview: false,
            notes_title: 'संविधानका ३५ भाग, ३०८ धारा र ९ अनुसूची सार-संग्रह.pdf',
            summary_text: 'नेपालको संविधान २०७२ असोज ३ गते जारी भयो। ३५ भाग, ३०८ धारा र ९ अनुसूची छन्। भाग ३ मा धारा १६ देखि ४६ सम्म ३१ वटा मौलिक हक र धारा ४८ मा नागरिकका कर्तव्य तोकिएको छ।',
          }
        ]
      }
    ]
  },
  {
    id: 'crs_rbb_assistant_02',
    title: 'Rastriya Banijya Bank (RBB) Level 4 Senior Assistant Crash Course',
    title_nepali: 'राष्ट्रिय वाणिज्य बैंक तह ४ वरिष्ठ सहायक पूर्ण अनलाइन तयारी',
    slug: 'rbb-level-4-senior-assistant-crash-course',
    description: 'Comprehensive preparation for RBB Senior Assistant (Cash & Administration). Covering Banking Law (BAFIA, NRB Act, AML/CFT), Accounting Principles, Management, and Pre-Exam Mock Tests.',
    description_nepali: 'राष्ट्रिय वाणिज्य बैंक लिमिटेडको लिखित तथा पूर्व-योग्यता परीक्षाको लागि उत्कृष्ट तयारी। बैंकिङ ऐन-नियम, लेखा, कम्प्युटर र कार्यालय व्यवस्थापन।',
    price_npr: 4500,
    original_price_npr: 7000,
    thumbnail_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    category: 'Banking (बैंकिङ)',
    level: 'Level 4 (सहायक चौथो)',
    instructor_name: 'Prakash Adhikari, CA',
    instructor_title: 'Senior Banking Officer & Chartered Accountant',
    instructor_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    total_hours: 52.0,
    total_lessons: 28,
    rating: 4.96,
    enrolled_count: 2890,
    is_published: true,
    is_live_class: true,
    live_class_schedule: 'Daily 7:00 PM - 8:30 PM (Evening Batch)',
    features: [
      'Bank and Financial Institutions Act (BAFIA 2073) In-Depth',
      'Nepal Rastra Bank Act 2058 & AML/CFT Rules',
      'Double Entry Bookkeeping & Final Accounts Workshop',
      'RBB Past 5 Years Solved Subjective & Objective Papers',
      'Personalized Feedback on Subjective Answer Writing'
    ],
    modules: [
      {
        id: 'mod_rbb_1',
        course_id: 'crs_rbb_assistant_02',
        title: 'भाग १: बैंकिङ ऐन, नियम र मौद्रिक नीति (Banking Acts & NRB Directives)',
        order_index: 1,
        lessons: [
          {
            id: 'les_201',
            course_id: 'crs_rbb_assistant_02',
            title: 'नेपाल राष्ट्र बैंक ऐन २०५८ का मुख्य व्यवस्थाहरू र उद्देश्य',
            title_nepali: 'नेपाल राष्ट्र बैंक ऐन २०५८: काम, कर्तव्य र अधिकार',
            duration_minutes: 40,
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            order_index: 1,
            is_free_preview: true,
            notes_title: 'NRB Act 2058 Summary Notes.pdf',
            summary_text: 'नेपाल राष्ट्र बैंक वि.सं. २०१३ वैशाख १४ मा स्थापना भयो। हाल नेपाल राष्ट्र बैंक ऐन २०५८ अनुसार स्वायत्त केन्द्रीय बैंकको रूपमा सञ्चालित छ। मौद्रिक नीतिको तर्जुमा, विदेशी मुद्रा व्यवस्थापन र बैंक तथा वित्तीय संस्थाको नियमन प्रमुख जिम्मेवारी हुन्।',
          },
          {
            id: 'les_202',
            course_id: 'crs_rbb_assistant_02',
            title: 'बैंक तथा वित्तीय संस्था सम्बन्धी ऐन (BAFIA २०७३) र वर्गिकरण',
            title_nepali: 'क, ख, ग, घ वर्गका बैंक तथा वित्तीय संस्थाहरूको कार्यक्षेत्र',
            duration_minutes: 48,
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            order_index: 2,
            is_free_preview: false,
            notes_title: 'BAFIA 2073 Simplified Matrix.pdf',
            summary_text: 'Class A (वाणिज्य बैंक), Class B (विकास बैंक), Class C (वित्त कम्पनी), र Class D (लघुवित्त वित्तीय संस्था) को न्यूनतम चुक्ता पुँजी, निक्षेप संकलन सीमा र कर्जा लगानी सम्बन्धी कानुनी प्रावधान।',
          }
        ]
      },
      {
        id: 'mod_rbb_2',
        course_id: 'crs_rbb_assistant_02',
        title: 'भाग २: लेखा र वित्तीय व्यवस्थापन (Accounting Principles)',
        order_index: 2,
        lessons: [
          {
            id: 'les_203',
            course_id: 'crs_rbb_assistant_02',
            title: 'दोहोरो लेखा प्रणाली, जर्नल, लेजर र ट्रायल ब्यालेन्स',
            title_nepali: 'Double Entry System and Trial Balance Preparation',
            duration_minutes: 52,
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
            order_index: 3,
            is_free_preview: false,
            notes_title: 'Accounting Golden Rules and Practical Entries.pdf',
            summary_text: 'Three golden rules of accounting (Personal, Real, Nominal accounts). Bank reconciliation statements (BRS), adjusting entries, and trial balance error detection.',
          }
        ]
      }
    ]
  },
  {
    id: 'crs_cmat_tu_03',
    title: 'CMAT 2083 Ultimate Entrance Package (BBA / BBM / BHM / BIM)',
    title_nepali: 'त्रिभुवन विश्वविद्यालय CMAT २०८३ पूर्ण तयारी प्याकेज',
    slug: 'cmat-entrance-package-bba-bbm',
    description: 'Cracking TU CMAT with top percentile. Covers Verbal Ability (Vocabulary & Reading Comprehension), Quantitative Ability, Logical Reasoning, and Business General Awareness.',
    description_nepali: 'शंकरदेव, पाटन, नेपाल कमर्स क्याम्पस लगायतका सरकारी तथा निजी कलेजहरूमा पूर्ण छात्रवृत्तिका लागि विशेष CMAT तयारी।',
    price_npr: 2999,
    original_price_npr: 5000,
    thumbnail_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    category: 'CMAT & Entrance',
    level: 'TU Undergraduate Entrance',
    instructor_name: 'Er. Sujan Sharma & Dr. Kabita Poudel',
    instructor_title: 'Premier Entrance Coach & TU Topper',
    instructor_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    total_hours: 38.0,
    total_lessons: 24,
    rating: 4.88,
    enrolled_count: 1950,
    is_published: true,
    is_live_class: false,
    features: [
      '1000+ CMAT High-Yield Question Bank with Explanations',
      'Quantitative Speed Mathematics (Percentages, Ratios, Time & Work)',
      'Verbal Ability & Reading Comprehension Elimination Tactics',
      '15 Timed Full-Length CBT Simulation Tests',
      'College Selection & Interview Preparation Guidance'
    ],
    modules: [
      {
        id: 'mod_cmat_1',
        course_id: 'crs_cmat_tu_03',
        title: 'Section A: Verbal Ability (25 Marks)',
        order_index: 1,
        lessons: [
          {
            id: 'les_301',
            course_id: 'crs_cmat_tu_03',
            title: 'Vocabulary, Idioms, Synonyms, and Antonyms Strategies',
            duration_minutes: 36,
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            order_index: 1,
            is_free_preview: true,
            notes_title: 'Top 500 High-Frequency CMAT Words.pdf',
            summary_text: 'Root word mnemonics (Latin & Greek roots), prefix/suffix deduction techniques, and contextual tone analysis for multiple choice questions.',
          }
        ]
      },
      {
        id: 'mod_cmat_2',
        course_id: 'crs_cmat_tu_03',
        title: 'Section B: Quantitative Ability (25 Marks)',
        order_index: 2,
        lessons: [
          {
            id: 'les_302',
            course_id: 'crs_cmat_tu_03',
            title: 'Profit & Loss, Percentage, Simple and Compound Interest',
            duration_minutes: 44,
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            order_index: 2,
            is_free_preview: false,
            notes_title: 'Quantitative Formulas & 10-Second Calculation Shortcuts.pdf',
            summary_text: 'Fraction to percentage lookup tables, multiplier methods for successive discounts, and effective annual rate comparisons.',
          }
        ]
      }
    ]
  },
  {
    id: 'crs_loksewa_adhikrit_04',
    title: 'Loksewa Sakha Adhikrit (Section Officer) 4th Paper Masterclass',
    title_nepali: 'शाखा अधिकृत चौथो पत्र: सेवा सम्बन्धी कार्यप्रणाली र समसामयिक विषय',
    slug: 'loksewa-section-officer-4th-paper',
    description: 'Expert guidance on drafting subjective answers, policy analysis, administrative governance, public finance, and international affairs for Gazetted 3rd Class Officers.',
    description_nepali: 'लोक सेवा आयोग शाखा अधिकृतको मुख्य लिखित परीक्षाको चौथो पत्र तयारी। उच्चस्तरीय उत्तर लेखन शैली र विश्लेषणात्मक प्रस्तुति।',
    price_npr: 5500,
    original_price_npr: 8500,
    thumbnail_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    category: 'Loksewa (लोकसेवा)',
    level: 'Gazetted 3rd (अधिकृत)',
    instructor_name: 'Dr. Narayan Prasad Regmi',
    instructor_title: 'Joint Secretary (सहसचिव), Government of Nepal',
    instructor_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    total_hours: 60.0,
    total_lessons: 35,
    rating: 4.98,
    enrolled_count: 1420,
    is_published: true,
    is_live_class: true,
    live_class_schedule: 'Every Saturday & Sunday 6:00 AM - 9:00 AM',
    features: [
      'Taught directly by sitting Joint Secretaries & Experts',
      'Answer writing frameworks for 10-mark and 15-mark questions',
      'Current 16th Periodic Plan of Nepal In-Depth Review',
      'Weekly written test with individual faculty evaluation',
      'Exclusive model answers repository'
    ],
    modules: [
      {
        id: 'mod_adhikrit_1',
        course_id: 'crs_loksewa_adhikrit_04',
        title: 'खण्ड (क): सार्वजनिक शासन र समसामयिक सवालहरू',
        order_index: 1,
        lessons: [
          {
            id: 'les_401',
            course_id: 'crs_loksewa_adhikrit_04',
            title: 'सुशासन (Good Governance), पारदर्शिता र उत्तरदायित्वका आयामहरू',
            title_nepali: 'सुशासन व्यवस्थापन तथा सञ्चालन ऐन २०६४ को व्यावहारिक कार्यान्वयन',
            duration_minutes: 58,
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            order_index: 1,
            is_free_preview: true,
            notes_title: 'सुशासन र प्रशासनिक जवाफदेहिता मोडल उत्तर.pdf',
            summary_text: 'सुशासनका ८ आधारभूत तत्वहरू: जनसहभागिता, विधिको शासन, पारदर्शिता, जवाफदेहिता, समतामूलक समाज, प्रभावकारिता, दूरदृष्टि र सहमतिमुखी निर्णय। नेपालमा सुशासनका चुनौतीहरू र समाधानका उपाय।',
          }
        ]
      }
    ]
  }
];

export const INITIAL_MOCK_EXAMS: QuizExam[] = [
  {
    id: 'quiz_loksewa_model_01',
    title: 'Loksewa NaSu 1st Paper Official Model Set 2083',
    title_nepali: 'नायब सुब्बा प्रथम पत्र आधिकारिक नमूना प्रश्नोत्तर सेट १',
    category: 'Loksewa (लोकसेवा)',
    duration_minutes: 45,
    total_marks: 100,
    negative_marking_percent: 20, // Standard Loksewa 20%
    pass_marks: 40,
    instructions: [
      'प्रत्येक सहि उत्तरको लागि २ अंक प्राप्त हुनेछ।',
      'प्रत्येक गलत उत्तर बापत २०% अर्थात् ०.४० अंक कट्टा (Negative Marking) गरिनेछ।',
      'समय समाप्त हुनासाथ स्वतः उत्तर पेश हुनेछ।',
      'परीक्षा अवधिभर कुनै पनि अन्य ट्याब वा एप खोल्न पाइने छैन।'
    ],
    questions: [
      {
        id: 'q1',
        exam_id: 'quiz_loksewa_model_01',
        question_en: 'According to the latest official survey, what is the exact height of Mount Everest (Sagarmatha)?',
        question_np: 'नेपाल र चीनद्वारा संयुक्त रूपमा मापन गरिएको सगरमाथाको पछिल्लो आधिकारिक उचाइ कति हो?',
        options: [
          { key: 'A', text_en: '8,848.00 meters', text_np: '८,८४८.०० मिटर' },
          { key: 'B', text_en: '8,848.86 meters', text_np: '८,८४८.८६ मिटर' },
          { key: 'C', text_en: '8,850.12 meters', text_np: '८,८५०.१२ मिटर' },
          { key: 'D', text_en: '8,844.43 meters', text_np: '८,८४४.४३ मिटर' }
        ],
        correct_option: 'B',
        explanation_en: 'On December 8, 2020 (2077 Mangsir 23 B.S.), Nepal and China jointly declared the revised height of Mount Everest as 8,848.86 meters.',
        explanation_np: 'वि.सं. २०७७ मंसिर २३ (८ डिसेम्बर २०२०) मा नेपाल र चीन सरकारले संयुक्त रूपमा सगरमाथाको नयाँ उचाइ ८,८४८.८६ मिटर घोषणा गरेका हुन्। यो पुरानो उचाइ भन्दा ८६ से.मी. बढी छ।',
        subject_section: 'General Knowledge'
      },
      {
        id: 'q2',
        exam_id: 'quiz_loksewa_model_01',
        question_en: 'Which river in Nepal is also famously known as "Rameshworam" or the "Sorrow of Bihar"?',
        question_np: 'नेपालको कुन नदीलाई भारतमा "बिहारको दुःख" (Sorrow of Bihar) भनिन्छ?',
        options: [
          { key: 'A', text_en: 'Gandaki River', text_np: 'गण्डकी नदी' },
          { key: 'B', text_en: 'Karnali River', text_np: 'कर्णाली नदी' },
          { key: 'C', text_en: 'Koshi River', text_np: 'कोशी नदी' },
          { key: 'D', text_en: 'Mahakali River', text_np: 'महाकाली नदी' }
        ],
        correct_option: 'C',
        explanation_en: 'The Koshi River is known as the Sorrow of Bihar because its annual monsoon flooding causes immense damage in northern Bihar, India.',
        explanation_np: 'कोशी नदीलाई वर्षायाममा आउने ठूलो बाढीका कारण भारतको बिहार राज्यमा "बिहारको दुःख" (Sorrow of Bihar) भनेर चिनिन्छ।',
        subject_section: 'General Knowledge'
      },
      {
        id: 'q3',
        exam_id: 'quiz_loksewa_model_01',
        question_en: 'IQ: Find the missing number in the sequence: 4, 9, 25, 49, 121, ?',
        question_np: 'IQ: तलको संख्या अनुक्रममा प्रश्नचिन्ह (?) भएको ठाउँमा के आउँछ? ४, ९, २५, ४९, १२१, ?',
        options: [
          { key: 'A', text_en: '144', text_np: '१४४' },
          { key: 'B', text_en: '169', text_np: '१६९' },
          { key: 'C', text_en: '196', text_np: '१९६' },
          { key: 'D', text_en: '225', text_np: '२२५' }
        ],
        correct_option: 'B',
        explanation_en: 'These numbers are squares of consecutive prime numbers: 2²=4, 3²=9, 5²=25, 7²=49, 11²=121. The next prime number is 13, and 13² = 169.',
        explanation_np: 'यो क्रमिक रूढ (अविभाज्य) संख्याहरूको वर्ग हो: २²=४, ३²=९, ५²=२५, ७²=४९, ११²=१२१। त्यसपछिको रूढ संख्या १३ हो, जसको वर्ग १३² = १६९ हुन्छ।',
        subject_section: 'IQ & Mental Ability'
      },
      {
        id: 'q4',
        exam_id: 'quiz_loksewa_model_01',
        question_en: 'How many Fundamental Rights (मौलिक हकहरू) are guaranteed in the Constitution of Nepal 2072?',
        question_np: 'नेपालको संविधान २०७२ को भाग ३ मा कतिवटा मौलिक हकहरूको व्यवस्था गरिएको छ?',
        options: [
          { key: 'A', text_en: '21 Fundamental Rights', text_np: '२१ वटा' },
          { key: 'B', text_en: '27 Fundamental Rights', text_np: '२७ वटा' },
          { key: 'C', text_en: '31 Fundamental Rights', text_np: '३१ वटा' },
          { key: 'D', text_en: '35 Fundamental Rights', text_np: '३५ वटा' }
        ],
        correct_option: 'C',
        explanation_en: 'Part 3 of the Constitution of Nepal contains 31 Fundamental Rights ranging from Article 16 (Right to live with dignity) to Article 46 (Right to constitutional remedies).',
        explanation_np: 'नेपालको संविधान २०७२ को भाग ३ अन्तर्गत धारा १६ (सम्मानपूर्वक बाँच्न पाउने हक) देखि धारा ४६ (संवैधानिक उपचारको हक) सम्म कुल ३१ वटा मौलिक हकको प्रत्याभूति गरिएको छ।',
        subject_section: 'General Knowledge'
      },
      {
        id: 'q5',
        exam_id: 'quiz_loksewa_model_01',
        question_en: 'IQ: If a person walks 4 km North, turns right and walks 3 km, what is the shortest distance from the starting point?',
        question_np: 'IQ: एक व्यक्ति उत्तरतर्फ ४ कि.मी. हिँड्छ, त्यसपछि दायाँ फर्केर ३ कि.मी. हिँड्छ भने सुरुको बिन्दुबाट उसको सिधा दूरी कति हुन्छ?',
        options: [
          { key: 'A', text_en: '7 km', text_np: '७ कि.मी.' },
          { key: 'B', text_en: '5 km', text_np: '५ कि.मी.' },
          { key: 'C', text_en: '6 km', text_np: '६ कि.मी.' },
          { key: 'D', text_en: '1 km', text_np: '१ कि.मी.' }
        ],
        correct_option: 'B',
        explanation_en: 'Using Pythagoras theorem: Distance = √(4² + 3²) = √(16 + 9) = √25 = 5 km.',
        explanation_np: 'पाइथागोरस सिद्धान्त अनुसार: कर्ण = √(लम्ब² + आधार²) = √(४² + ३²) = √(१६ + ९) = √२५ = ५ कि.मी.।',
        subject_section: 'IQ & Mental Ability'
      },
      {
        id: 'q6',
        exam_id: 'quiz_loksewa_model_01',
        question_en: 'Which is the largest district of Nepal by area?',
        question_np: 'क्षेत्रफलको आधारमा नेपालको सबैभन्दा ठूलो जिल्ला कुन हो?',
        options: [
          { key: 'A', text_en: 'Humla', text_np: 'हुम्ला' },
          { key: 'B', text_en: 'Mustang', text_np: 'मुस्ताङ' },
          { key: 'C', text_en: 'Dolpa', text_np: 'डोल्पा' },
          { key: 'D', text_en: 'Taplejung', text_np: 'ताप्लेजुङ' }
        ],
        correct_option: 'C',
        explanation_en: 'Dolpa is the largest district of Nepal with an area of 7,889 square kilometers, covering about 5.36% of the total area of Nepal.',
        explanation_np: 'डोल्पा जिल्ला ७,८८९ वर्ग किलोमिटर क्षेत्रफल सहित नेपालको सबैभन्दा ठूलो जिल्ला हो, जसले नेपालको कुल भूभागको करिब ५.३६% ओगटेको छ।',
        subject_section: 'General Knowledge'
      }
    ]
  },
  {
    id: 'quiz_banking_model_02',
    title: 'RBB / NBL Banking Assistant Level 4 Pre-Exam Test',
    title_nepali: 'राष्ट्रिय वाणिज्य बैंक तथा नेपाल बैंक तह ४ पूर्व-तयारी परीक्षा',
    category: 'Banking (बैंकिङ)',
    duration_minutes: 45,
    total_marks: 100,
    negative_marking_percent: 20,
    pass_marks: 40,
    instructions: [
      'बैंकिङ ऐन, वित्तीय शब्दावली र सामान्य ज्ञानमा आधारित प्रश्नहरू।',
      'गलत उत्तरमा ०.४० अंक कट्टा हुनेछ।'
    ],
    questions: [
      {
        id: 'bq1',
        exam_id: 'quiz_banking_model_02',
        question_en: 'What is the minimum paid-up capital requirement for a Class "A" Commercial Bank in Nepal according to NRB regulations?',
        question_np: 'नेपाल राष्ट्र बैंकको निर्देशन अनुसार "क" वर्गको वाणिज्य बैंक स्थापना गर्न न्यूनतम चुक्ता पुँजी कति हुनुपर्दछ?',
        options: [
          { key: 'A', text_en: 'Rs. 2 Billion (२ अर्ब)', text_np: 'रू २ अर्ब' },
          { key: 'B', text_en: 'Rs. 4 Billion (४ अर्ब)', text_np: 'रू ४ अर्ब' },
          { key: 'C', text_en: 'Rs. 8 Billion (८ अर्ब)', text_np: 'रू ८ अर्ब' },
          { key: 'D', text_en: 'Rs. 10 Billion (१० अर्ब)', text_np: 'रू १० अर्ब' }
        ],
        correct_option: 'C',
        explanation_en: 'Nepal Rastra Bank increased the minimum paid-up capital requirement for national level Class "A" Commercial Banks to NPR 8 Billion.',
        explanation_np: 'नेपाल राष्ट्र बैंकको मौद्रिक नीति तथा निर्देशन अनुसार राष्ट्रिय स्तरको "क" वर्गको वाणिज्य बैंकको लागि न्यूनतम चुक्ता पुँजी रू. ८ अर्ब (८०० करोड) तोकिएको छ।',
        subject_section: 'Banking & Management'
      },
      {
        id: 'bq2',
        exam_id: 'quiz_banking_model_02',
        question_en: 'When was Rastriya Banijya Bank (RBBL) established in Bikram Sambat?',
        question_np: 'राष्ट्रिय वाणिज्य बैंकको स्थापना वि.सं. कहिले भएको हो?',
        options: [
          { key: 'A', text_en: '2022 Magh 10 B.S.', text_np: 'वि.सं. २०२२ माघ १०' },
          { key: 'B', text_en: '1994 Kartik 30 B.S.', text_np: 'वि.सं. १९९४ कार्तिक ३०' },
          { key: 'C', text_en: '2013 Baisakh 14 B.S.', text_np: 'वि.सं. २०१३ बैशाख १४' },
          { key: 'D', text_en: '2024 Poush 28 B.S.', text_np: 'वि.सं. २०२४ पुस २८' }
        ],
        correct_option: 'A',
        explanation_en: 'Rastriya Banijya Bank was established on 2022 Magh 10 B.S. (January 23, 1966) under the Rastriya Banijya Bank Act 2021.',
        explanation_np: 'राष्ट्रिय वाणिज्य बैंकको स्थापना वि.सं. २०२२ साल माघ १० गते राष्ट्रिय वाणिज्य बैंक ऐन २०२१ अनुसार सरकारी स्वामित्वको दोस्रो वाणिज्य बैंकको रूपमा भएको हो।',
        subject_section: 'Banking & Management'
      }
    ]
  }
];

export const INITIAL_QNA: QnAPost[] = [
  {
    id: 'qna_1',
    lesson_id: 'les_101',
    author_name: 'Bikash Karki',
    author_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    question: 'सर, नेपालको नयाँ चुच्चे नक्सा अनुसार कुल क्षेत्रफल कति कायम गरिएको छ र लोकसेवामा कुन तथ्यांक लेख्दा उपयुक्त हुन्छ?',
    created_at: '2 hours ago',
    upvotes: 14,
    instructor_reply: {
      author: 'Govinda Giri (Faculty)',
      reply: 'नेपालको अध्यावधिक नक्सा (वि.सं. २०७७ जेठ ७ मन्त्रिपरिषद र असार ४ मा संसदबाट संविधान संशोधन) अनुसार १,४७,५१६ वर्ग किलोमिटर (५६,९५६ वर्ग माइल) लाई आधिकारिक रूपमा मानिएको छ। परीक्षामा प्रश्नको विकल्प हेरेर १,४७,५१६ वर्ग कि.मी. छान्नुहोला।',
      replied_at: '1 hour ago'
    }
  },
  {
    id: 'qna_2',
    lesson_id: 'les_101',
    author_name: 'Pooja Shrestha',
    author_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    question: 'Can we access these PDF notes when offline or traveling where mobile network is poor?',
    created_at: 'Yesterday',
    upvotes: 21,
    instructor_reply: {
      author: 'Shiksha LMS Support',
      reply: 'Yes Pooja! Shiksha LMS has full PWA offline capabilities. Just tap the "Save Note for Offline" button below the video, and it will be stored directly on your phone/browser cache. You can read it anytime without consuming mobile data!',
      replied_at: 'Yesterday'
    }
  }
];
