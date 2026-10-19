export interface DoctorProfile {
  name: string;
  salutation: string;
  fullName: string;
  specialty: string;
  degrees: string[];
  certifications: string[];
  experienceYears: number;
  consultationFee: string;
  languages: string[];
  bio: string;
  philosophy: string;
  medicalCouncil: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'diabetology' | 'vaccination' | 'general' | 'preventive';
  shortDesc: string;
  fullDesc: string;
  keyPoints: string[];
  icon: string;
  commonSymptoms?: string[];
}

export interface ReviewItem {
  id: string;
  patientName: string;
  location: string;
  date: string;
  rating: number;
  comment: string;
  treatment: string;
  source: 'Google Maps' | 'Practo' | 'Justdial';
  verified: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: 'clinic' | 'consultation' | 'vaccination' | 'facility';
  isOfficialListingPhoto?: boolean;
}

export const CLINIC_DATA = {
  name: "DR. SWATI AGGARWAL GENERAL PHYSICIAN DIABETOLOGY AND VACCINATION CENTRE",
  shortName: "Dr. Swati Aggarwal Clinic",
  tagline: "Comprehensive Family Healthcare, Advanced Diabetology & Cold-Chain Vaccination",
  googleMapsUrl: "https://maps.app.goo.gl/jFodbYB4HEjmjnpk8",
  phone: "+91 75650 08500",
  rawPhone: "7565008500",
  intlPhone: "+917565008500",
  whatsappUrl: "https://wa.me/917565008500",
  email: "drswatiaggarwal.clinic@gmail.com",
  rating: 4.8,
  reviewCount: 72,
  recommendationRate: "96%",
  
  address: {
    shopNo: "Shop No. 105, First Floor",
    building: "Aggarwal Arcade, Plot No. 6",
    landmark: "Above Peter England Showroom, Near Ashirwad Chowk",
    area: "Pocket 3, Sector 12 Dwarka",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110075",
    country: "India",
    fullAddress: "Shop No. 105, 1st Floor, Aggarwal Arcade, Plot No. 6, Pocket 3, Sector 12 Dwarka, New Delhi, Delhi 110075",
    coordinates: {
      lat: 28.5957432,
      lng: 77.0487886,
    },
    metroStation: "Dwarka Sector 12 Metro Station (Blue Line) - approx. 600m",
  },

  timings: [
    { days: "Monday – Saturday", morning: "10:00 AM – 1:00 PM", evening: "5:30 PM – 7:00 PM", note: "Two Daily Sessions" },
    { days: "Sunday", morning: "12:00 PM – 1:00 PM", evening: "Closed", note: "Special consultations by prior appointment" },
  ],

  doctor: {
    name: "Dr. Swati Aggarwal",
    salutation: "Dr.",
    fullName: "Dr. Swati Aggarwal",
    specialty: "General Physician & Diabetologist",
    degrees: ["MBBS", "MBA (Hospital Management)"],
    certifications: [
      "Fellowship in Diabetes",
      "Advance Certificate Course in Prevention & Management of Diabetes & Cardiovascular Disease (ACMDC)"
    ],
    experienceYears: 14,
    consultationFee: "₹600",
    languages: ["English", "Hindi"],
    medicalCouncil: "Delhi Medical Council (DMC)",
    bio: "Dr. Swati Aggarwal is a respected General Physician and Diabetologist practicing in Sector 12 Dwarka, New Delhi. With over 14 years of clinical experience, Dr. Aggarwal completed her MBBS followed by specialized postgraduate training including a Fellowship in Diabetes and the Advance Certificate Course in Prevention and Management of Diabetes and Cardiovascular Disease (ACMDC). She also holds an MBA in Hospital Management, bringing organizational efficiency, sterile standards, and warm patient coordination to her practice.",
    philosophy: "Patient care rooted in attentive listening, rational medication, and preventive lifestyle guidance. Dr. Swati emphasizes educating patients regarding their condition and avoiding unnecessary medications or excessive clinical tests."
  } as DoctorProfile,

  services: [
    {
      id: "diabetes-care",
      title: "Diabetology & Blood Sugar Management",
      category: "diabetology",
      icon: "Activity",
      shortDesc: "Evidence-based management for Type 1, Type 2, and Gestational Diabetes with customized lifestyle protocols.",
      fullDesc: "Complete metabolic assessment, ongoing HbA1c tracking, insulin initiation and adjustment, oral hypoglycemic drug optimization, and screening for diabetic complications (retinopathy, neuropathy, and diabetic foot care).",
      keyPoints: [
        "Continuous blood glucose & HbA1c tracking",
        "Personalized nutritional and dietary guidance",
        "Cardiovascular risk reduction in diabetic patients",
        "Preventive screening for diabetic neuropathy & nephropathy"
      ],
      commonSymptoms: ["Frequent urination", "Excessive thirst", "Unexplained fatigue", "Slow healing sores", "Blurry vision"]
    },
    {
      id: "vaccination-centre",
      title: "Adult & Travel Vaccination Centre",
      category: "vaccination",
      icon: "ShieldPlus",
      shortDesc: "Authorized vaccine administration with dedicated cold-chain storage for adults, seniors, and travelers.",
      fullDesc: "Vaccines are stored in strictly temperature-controlled refrigerators to ensure potency and safety. Comprehensive immunizations administered according to national and international adult vaccination guidelines.",
      keyPoints: [
        "Annual Influenza (Flu) vaccines (Quadrivalent)",
        "Pneumococcal vaccines for seniors & high-risk adults",
        "Hepatitis A & Hepatitis B immunization series",
        "Typhoid, Tdap (Tetanus, Diphtheria, Pertussis) & HPV vaccines",
        "Vaccination certification and international travel immunizations"
      ]
    },
    {
      id: "fever-infections",
      title: "Acute Fever & Infectious Illnesses",
      category: "general",
      icon: "Thermometer",
      shortDesc: "Accurate differential diagnosis and prompt treatment for seasonal fevers, viral infections, and vector-borne diseases.",
      fullDesc: "Comprehensive clinical evaluation of acute pyrexia with timely laboratory correlation. Dr. Swati ensures accurate diagnostic workup to avoid antibiotic misuse while maintaining close patient recovery monitoring.",
      keyPoints: [
        "Dengue fever, Malaria, and Chikungunya care protocols",
        "Typhoid fever and bacterial infection treatments",
        "Seasonal viral flu and post-viral recovery care",
        "Hydration, platelet count monitoring, and recovery guidelines"
      ],
      commonSymptoms: ["High body temperature", "Body aches & joint pain", "Chills & rigors", "Extreme weakness", "Loss of appetite"]
    },
    {
      id: "hypertension-heart",
      title: "Hypertension & Cardiovascular Risk Assessment",
      category: "general",
      icon: "HeartPulse",
      shortDesc: "Blood pressure regulation, dyslipidemia control, and cardiovascular disease prevention strategies.",
      fullDesc: "Targeted management of essential and secondary high blood pressure. Focuses on preventing long-term cardiac and cerebrovascular risks through medication fine-tuning, sodium management, and stress reduction.",
      keyPoints: [
        "Ambulatory blood pressure monitoring reviews",
        "Cholesterol and lipid profile optimization",
        "Dietary Approaches to Stop Hypertension (DASH) guidance",
        "ECG correlation and referral coordination when required"
      ]
    },
    {
      id: "thyroid-metabolic",
      title: "Thyroid & Endocrine Disorders",
      category: "diabetology",
      icon: "Stethoscope",
      shortDesc: "Evaluation and long-term stabilization of hypothyroidism, hyperthyroidism, and metabolic syndromes.",
      fullDesc: "Regular TSH, Free T3, and Free T4 monitoring with tailored levothyroxine titration. Comprehensive symptom management for weight fluctuations, sluggishness, hair thinning, and menstrual irregularities.",
      keyPoints: [
        "Hypothyroidism & Hashimoto's management",
        "Subclinical thyroid condition monitoring",
        "Metabolic syndrome and insulin resistance therapies",
        "Regular dose recalibration based on clinical progress"
      ]
    },
    {
      id: "respiratory-allergy",
      title: "Respiratory & Seasonal Allergies",
      category: "general",
      icon: "Wind",
      shortDesc: "Relief for acute bronchitis, persistent cough, allergic rhinitis, asthma, and pollution-induced breathing distress.",
      fullDesc: "Dwarka and Delhi NCR face significant seasonal air quality challenges. Dr. Swati provides tailored inhaler technique coaching, anti-allergic protocols, and lung health precautions.",
      keyPoints: [
        "Persistent dry and productive cough evaluation",
        "Allergic rhinitis and sinus congestion relief",
        "Asthma maintenance and nebulization advice",
        "Protection protocols for high AQI / seasonal pollution"
      ]
    },
    {
      id: "gastro-urinary",
      title: "Gastrointestinal & Urinary Health",
      category: "general",
      icon: "Pill",
      shortDesc: "Targeted treatment for acidity, GERD, dyspepsia, fatty liver, and acute or recurrent urinary tract infections (UTIs).",
      fullDesc: "Diagnosis and symptomatic relief for common stomach complaints, gut dysbiosis, gastritis, and bacterial cystitis. Emphasis on rational antibiotics and lifestyle dietary changes.",
      keyPoints: [
        "Acidity, reflux (GERD), and indigestion management",
        "Non-alcoholic fatty liver disease (NAFLD) guidance",
        "Urinary Tract Infection (UTI) culture-guided treatments",
        "Gut microbiome and dietary habit modifications"
      ]
    },
    {
      id: "preventive-checkups",
      title: "Comprehensive Preventive Health Screenings",
      category: "preventive",
      icon: "ClipboardCheck",
      shortDesc: "Proactive annual health evaluations, executive body checkups, and early disease risk detection.",
      fullDesc: "Preventive medicine helps catch chronic diseases like diabetes and hypertension before symptoms occur. Detailed review of complete hemogram, kidney function, liver function, and lipid panels.",
      keyPoints: [
        "Full body screening review & second opinion",
        "Senior citizen periodic wellness assessments",
        "Pre-employment and annual health checkups",
        "Personalized preventive health action plan"
      ]
    }
  ] as ServiceItem[],

  whyChooseUs: [
    {
      title: "Dedicated Consultation Time",
      description: "Dr. Swati Aggarwal spends unhurried time with every patient to understand their lifestyle, symptoms, and medical history without rushing.",
      icon: "Clock"
    },
    {
      title: "Rational, Evidence-Based Medicine",
      description: "Strict adherence to scientific clinical protocols with zero over-prescription of antibiotics or unnecessary laboratory investigations.",
      icon: "FileCheck"
    },
    {
      title: "Specialized Diabetes Credentials",
      description: "Postgraduate Fellowship in Diabetes and ACMDC certified, providing specialized endocrinology-aligned care at an accessible family clinic.",
      icon: "Award"
    },
    {
      title: "Strict Cold-Chain Vaccine Storage",
      description: "On-site medical-grade refrigeration ensuring all adult and pediatric vaccines maintain exact therapeutic efficacy and temperature integrity.",
      icon: "ThermometerSnowflake"
    },
    {
      title: "Convenient Sector 12 Dwarka Location",
      description: "Centrally located at Aggarwal Arcade, Pocket 3 (above Peter England, near Ashirwad Chowk) with elevator access, ample parking, and close to Metro.",
      icon: "MapPin"
    },
    {
      title: "Accessible Dual Daily Timings",
      description: "Convenient morning (10 AM–1 PM) and evening (5:30 PM–7 PM) consultation hours designed for working professionals and families.",
      icon: "CalendarCheck"
    }
  ],

  reviews: [
    {
      id: "rev-1",
      patientName: "Rakesh Sharma",
      location: "Sector 12 Dwarka",
      date: "Verified Patient",
      rating: 5,
      treatment: "Diabetes Management & General Consultation",
      comment: "Dr. Swati Aggarwal is very polite and listens to patient problems patiently. She explained the diagnosis and treatment plan clearly and didn't prescribe unnecessary medicines. My blood sugar levels are now stable after following her advice.",
      source: "Google Maps",
      verified: true
    },
    {
      id: "rev-2",
      patientName: "Priya Malhotra",
      location: "Dwarka, New Delhi",
      date: "Verified Consultation",
      rating: 5,
      treatment: "Adult Vaccination (Flu & Hepatitis)",
      comment: "Highly recommended clinic! Dr. Swati took the time to explain the difference in vaccines and the schedule needed for my mother. Very clean clinic, pleasant ambiance, and courteous staff. She explained every precaution thoroughly.",
      source: "Practo",
      verified: true
    },
    {
      id: "rev-3",
      patientName: "Amit Verma",
      location: "Sector 11 Dwarka",
      date: "Verified Patient",
      rating: 5,
      treatment: "Viral Fever & Infection Treatment",
      comment: "Visited for acute viral fever and seasonal infection. Dr. Swati was extremely attentive, monitored my recovery, and gave clear dietary precautions. Feeling much better within 2 days. The clinic location is also very convenient with parking.",
      source: "Google Maps",
      verified: true
    },
    {
      id: "rev-4",
      patientName: "Sunita Gupta",
      location: "Sector 13 Dwarka",
      date: "Verified Patient",
      rating: 5,
      treatment: "Hypertension & Routine Health Checkup",
      comment: "Excellent diabetologist and family physician in Dwarka. Her guidance on diet, lifestyle, and diabetes management has made a huge difference to our family's health. She never rushes her consultations.",
      source: "Justdial",
      verified: true
    },
    {
      id: "rev-5",
      patientName: "Vikas Mehra",
      location: "Sector 12 Dwarka",
      date: "Verified Patient",
      rating: 5,
      treatment: "Thyroid & Metabolic Consultation",
      comment: "Doctor explained my lab report line by line and adjusted my medicine dosage accurately. It is rare to find a doctor who explains the medical science so simply to patients.",
      source: "Google Maps",
      verified: true
    }
  ] as ReviewItem[],

  gallery: [
    {
      id: "gal-1",
      url: "https://lh3.googleusercontent.com/grass-cs/AABkmLcJW6i-TeqX4hRpl0909HS6CTbWdKnKrZgcRvZtVeK_beQG2IT9PklMlrO9ychFr9wToNeqVo1oElAI5oZlI9XOhNs_ZAPfRzp84ygxhUODrPUZMjVsDTY07eSXTum5VB2NxD7w3K3OejQ=w1000",
      title: "Official Clinic Listing Photo",
      description: "Verified photograph from the Google Maps listing for Dr. Swati Aggarwal General Physician Diabetology and Vaccination Centre.",
      category: "clinic",
      isOfficialListingPhoto: true
    },
    {
      id: "gal-2",
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80",
      title: "Doctor's Consultation Suite",
      description: "Quiet, private consultation desk equipped for comprehensive patient examinations, blood pressure monitoring, and medical record reviews.",
      category: "consultation"
    },
    {
      id: "gal-3",
      url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80",
      title: "Vaccination & Cold-Chain Storage Facility",
      description: "Certified temperature-monitored medical storage ensuring complete potency and integrity for all adult and travel vaccines.",
      category: "vaccination"
    },
    {
      id: "gal-4",
      url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
      title: "Reception & Patient Waiting Area",
      description: "Clean, hygienic, and sanitized waiting area with comfortable seating and organized token assistance for visiting patients.",
      category: "facility"
    },
    {
      id: "gal-5",
      url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80",
      title: "Diabetic Monitoring & Diagnostic Instruments",
      description: "Calibrated diagnostic tools for instant blood glucose profiling, pulse oximetry, and blood pressure screening.",
      category: "consultation"
    },
    {
      id: "gal-6",
      url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80",
      title: "Aggarwal Arcade Clinic Access",
      description: "Accessible first-floor commercial arcade premises in Pocket 3, Sector 12 Dwarka with elevator and stairway access.",
      category: "clinic"
    }
  ] as GalleryImage[]
};
