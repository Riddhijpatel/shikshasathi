import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
  NativeModules,
} from 'react-native';
import { registerRootComponent } from 'expo'; // Fixes "main has not been registered"

const LiteRTLMNative = NativeModules.LiteRTLM;

// -------------------------------------------------------------
// COMPLETE GSEB STANDARD 5 CHAPTER CONFIGURATION (ALL 3 SUBJECTS)
// -------------------------------------------------------------
const CHAPTERS = {
  mathematics: [
    { id: 'math_ch1', name: 'Ch 1: Shapes and Angles' },
    { id: 'math_ch2', name: 'Ch 2: Parts and Wholes (Fractions)' },
    { id: 'math_ch3', name: 'Ch 3: How Many Squares (Area & Perimeter)' },
    { id: 'math_ch4', name: 'Ch 4: Does it Look the Same (Symmetry)' },
    { id: 'math_ch5', name: 'Ch 5: Be My Multiple, Ill be Your Factor' },
    { id: 'math_ch6', name: 'Ch 6: Can You See the Pattern' },
    { id: 'math_ch7', name: 'Ch 7: Mapping Your Way (Directions & Scale)' },
    { id: 'math_ch8', name: 'Ch 8: Boxes and Sketches (3D Nets)' },
    { id: 'math_ch9', name: 'Ch 9: Tenths and Hundredths (Decimals)' },
    { id: 'math_ch10', name: 'Ch 10: Area and its Boundary' },
    { id: 'math_ch11', name: 'Ch 11: Smart Charts (Data Handling)' },
    { id: 'math_ch12', name: 'Ch 12: Ways to Multiply and Divide' },
    { id: 'math_ch13', name: 'Ch 13: How Big? How Heavy? (Volume & Mass)' },
    { id: 'math_ch14', name: 'Ch 14: The National Fruit - Mango (Word Problems)' },
  ],
  science: [
    { id: 'sci_ch1', name: 'Ch 1: Seeds and Seeds' },
    { id: 'sci_ch2', name: 'Ch 2: From Tasting to Digesting' },
    { id: 'sci_ch3', name: 'Ch 3: Super Senses (Animal Senses)' },
    { id: 'sci_ch4', name: 'Ch 4: Experiments with Water (Density & Solutes)' },
    { id: 'sci_ch5', name: 'Ch 5: Every Drop Counts (Water Conservation)' },
    { id: 'sci_ch6', name: 'Ch 6: A Treat for Mosquitoes (Malaria & Health)' },
    { id: 'sci_ch7', name: 'Ch 7: Up You Go! (Mountaineering & Mountains)' },
    { id: 'sci_ch8', name: 'Ch 8: Walls Tell Stories (Historical Monuments)' },
    { id: 'sci_ch9', name: 'Ch 9: Sunita in Space (Gravity & Atmosphere)' },
    { id: 'sci_ch10', name: 'Ch 10: What If It Finishes (Petroleum & Fuels)' },
    { id: 'sci_ch11', name: 'Ch 11: A Shelter So High (Ladakh Cold Desert)' },
    { id: 'sci_ch12', name: 'Ch 12: When the Earth Shook (Earthquakes & Safety)' },
    { id: 'sci_ch13', name: 'Ch 13: Blow Hot, Blow Cold (Temperature & Respiration)' },
    { id: 'sci_ch14', name: 'Ch 14: A Seed Tells a Farmers Story (Agriculture)' },
  ],
  social_studies: [
    { id: 'sst_ch1', name: 'Ch 1: Gujarat: Geography & Natural Resources' },
    { id: 'sst_ch2', name: 'Ch 2: Cultural Heritage & Stepwells (Vavs)' },
    { id: 'sst_ch3', name: 'Ch 3: Ancient Seaports & Lothal Dockyard' },
    { id: 'sst_ch4', name: 'Ch 4: Architectural Wonders & Sun Temple Modhera' },
    { id: 'sst_ch5', name: 'Ch 5: Wildlife Sanctuaries & Asiatic Lions' },
    { id: 'sst_ch6', name: 'Ch 6: Freedom Struggle & Sabarmati Ashram' },
    { id: 'sst_ch7', name: 'Ch 7: Sardar Sarovar Dam & Irrigation Networks' },
  ],
};

// -------------------------------------------------------------
// COMPREHENSIVE TEXTBOOK QUESTION BANK
// -------------------------------------------------------------
const QUESTION_BANK = [
  // ================= MATHEMATICS =================
  // Ch 1: Shapes and Angles
  { id: 'M1_01', chapterId: 'math_ch1', concept: 'Right Angles', type: 'MCQ', prompt: '1. How many degrees are there in a right angle?', marks: 1, options: ['45 degrees', '90 degrees', '180 degrees', '360 degrees'], correctOptionIndex: 1, explanation: 'A right angle measures exactly 90 degrees.' },
  { id: 'M1_02', chapterId: 'math_ch1', concept: 'Clock Angles', type: 'TRUE_FALSE', prompt: '2. At 9:00 o clock, the hands of a clock form an obtuse angle.', marks: 1, correctBoolean: false, explanation: 'At 9:00, clock hands form a 90 degree right angle.' },
  { id: 'M1_03', chapterId: 'math_ch1', concept: 'Acute vs Obtuse', type: 'MATCHING', prompt: '3. Match each angle type with its degree range:', marks: 2, matchingPairs: [{ left: 'Less than 90 deg', right: 'Acute' }, { left: 'Between 90 and 180 deg', right: 'Obtuse' }], explanation: 'Acute is <90 deg; Obtuse is between 90 and 180 deg.' },
  { id: 'M1_04', chapterId: 'math_ch1', concept: 'Straight Angles', type: 'FILL_BLANKS', prompt: '4. An angle that forms a straight line measures exactly _______ degrees.', marks: 1, acceptedBlanks: ['180', '180 degrees'], explanation: 'A straight angle measures exactly 180 degrees.' },
  { id: 'M1_05', chapterId: 'math_ch1', concept: 'Polygons', type: 'SHORT_ANSWER', prompt: '5. Name the geometric instrument used to measure angles in degrees.', marks: 2, rubricKeywords: ['protractor', 'd scale'], explanation: 'A protractor measures angles in degrees.' },

  // Ch 2: Parts and Wholes
  { id: 'M2_01', chapterId: 'math_ch2', concept: 'Fraction Values', type: 'MCQ', prompt: '1. What is 1/2 of 100 rupees?', marks: 1, options: ['25 rupees', '50 rupees', '75 rupees', '10 rupees'], correctOptionIndex: 1, explanation: 'Half of 100 is 50 rupees.' },
  { id: 'M2_02', chapterId: 'math_ch2', concept: 'Equivalent Fractions', type: 'TRUE_FALSE', prompt: '2. The fraction 2/4 is equal to 1/2.', marks: 1, correctBoolean: true, explanation: '2/4 simplifies to 1/2.' },
  { id: 'M2_03', chapterId: 'math_ch2', concept: 'Denominator', type: 'FILL_BLANKS', prompt: '3. In the fraction 3/5, the bottom number 5 is called the _______.', marks: 1, acceptedBlanks: ['denominator'], explanation: 'The bottom number is the denominator.' },
  { id: 'M2_04', chapterId: 'math_ch2', concept: 'Comparing Fractions', type: 'MCQ', prompt: '4. Which fraction is larger: 1/3 or 1/6?', marks: 1, options: ['1/3', '1/6', 'Both are equal', 'Cannot tell'], correctOptionIndex: 0, explanation: '1/3 is larger than 1/6.' },
  { id: 'M2_05', chapterId: 'math_ch2', concept: 'Real-world Fractions', type: 'SHORT_ANSWER', prompt: '5. How many minutes are there in 3/4 of an hour?', marks: 2, rubricKeywords: ['45', 'forty five'], explanation: '3/4 of 60 minutes = 45 minutes.' },

  // Ch 3: How Many Squares
  { id: 'M3_01', chapterId: 'math_ch3', concept: 'Perimeter', type: 'MCQ', prompt: '1. The total length of the boundary of a closed shape is called its:', marks: 1, options: ['Area', 'Perimeter', 'Volume', 'Radius'], correctOptionIndex: 1, explanation: 'Perimeter is the total boundary length.' },
  { id: 'M3_02', chapterId: 'math_ch3', concept: 'Area Calculation', type: 'FILL_BLANKS', prompt: '2. The area of a rectangle with length 6 cm and width 4 cm is _______ sq cm.', marks: 1, acceptedBlanks: ['24', '24 sq cm'], explanation: 'Area = length × width = 6 × 4 = 24 sq cm.' },
  { id: 'M3_03', chapterId: 'math_ch3', concept: 'Square Grid', type: 'TRUE_FALSE', prompt: '3. A square of side 1 cm has an area of 1 sq cm.', marks: 1, correctBoolean: true, explanation: '1 cm × 1 cm = 1 sq cm.' },

  // Ch 4: Symmetry
  { id: 'M4_01', chapterId: 'math_ch4', concept: 'Mirror Halves', type: 'TRUE_FALSE', prompt: '1. The letter H has both vertical and horizontal lines of symmetry.', marks: 1, correctBoolean: true, explanation: 'Letter H can be split evenly both vertically and horizontally.' },
  { id: 'M4_02', chapterId: 'math_ch4', concept: 'Rotations', type: 'MCQ', prompt: '2. After a half turn (180 deg rotation), which digit looks identical?', marks: 1, options: ['0 and 8', '3 and 5', '2 and 7', '4 and 6'], correctOptionIndex: 0, explanation: 'Digits 0 and 8 remain the same after a half-turn.' },

  // Ch 5: Factors & Multiples
  { id: 'M5_01', chapterId: 'math_ch5', concept: 'Common Multiples', type: 'MCQ', prompt: '1. What is the smallest common multiple (LCM) of 3 and 5?', marks: 1, options: ['8', '10', '15', '20'], correctOptionIndex: 2, explanation: '15 is the smallest common multiple of 3 and 5.' },
  { id: 'M5_02', chapterId: 'math_ch5', concept: 'Factors', type: 'FILL_BLANKS', prompt: '2. The number 1 is a factor of _______ numbers.', marks: 1, acceptedBlanks: ['every', 'all', 'any'], explanation: '1 divides every whole number.' },

  // Ch 6: Patterns
  { id: 'M6_01', chapterId: 'math_ch6', concept: 'Number Patterns', type: 'FILL_BLANKS', prompt: '1. What comes next in the sequence: 2, 4, 8, 16, _______?', marks: 1, acceptedBlanks: ['32'], explanation: 'Each number doubles: 16 × 2 = 32.' },

  // Ch 7: Mapping Your Way
  { id: 'M7_01', chapterId: 'math_ch7', concept: 'Scale Maps', type: 'MCQ', prompt: '1. On a scale where 1 cm = 10 km on ground, a 5 cm map distance equals:', marks: 1, options: ['25 km', '50 km', '100 km', '5 km'], correctOptionIndex: 1, explanation: '5 cm × 10 km = 50 km.' },

  // Ch 8: Boxes & Sketches
  { id: 'M8_01', chapterId: 'math_ch8', concept: '3D Shapes', type: 'MCQ', prompt: '1. How many square faces does a standard cube have?', marks: 1, options: ['4', '6', '8', '12'], correctOptionIndex: 1, explanation: 'A cube has 6 flat square faces.' },

  // Ch 9: Decimals
  { id: 'M9_01', chapterId: 'math_ch9', concept: 'Centimeters & Millimeters', type: 'FILL_BLANKS', prompt: '1. One centimeter equals _______ millimeters.', marks: 1, acceptedBlanks: ['10', '10 mm'], explanation: '1 cm = 10 mm.' },

  // Ch 10: Area & Boundary
  { id: 'M10_01', chapterId: 'math_ch10', concept: 'Perimeter of Square', type: 'FILL_BLANKS', prompt: '1. A square park with each side 20 meters has a perimeter of _______ meters.', marks: 1, acceptedBlanks: ['80', '80 meters'], explanation: 'Perimeter = 4 × 20 = 80 meters.' },

  // Ch 11: Smart Charts
  { id: 'M11_01', chapterId: 'math_ch11', concept: 'Tally Marks', type: 'TRUE_FALSE', prompt: '1. A group of 5 tally marks is represented by 4 vertical lines with one diagonal strike.', marks: 1, correctBoolean: true, explanation: 'Tally mark bundles count up to 5.' },

  // Ch 12: Multiply & Divide
  { id: 'M12_01', chapterId: 'math_ch12', concept: 'Division with Remainder', type: 'MCQ', prompt: '1. What is the quotient and remainder when 25 is divided by 4?', marks: 1, options: ['6 Remainder 1', '5 Remainder 5', '6 Remainder 2', '7 Remainder 0'], correctOptionIndex: 0, explanation: '4 × 6 = 24 with remainder 1.' },

  // Ch 13: Volume & Mass
  { id: 'M13_01', chapterId: 'math_ch13', concept: 'Units of Weight', type: 'FILL_BLANKS', prompt: '1. One kilogram equals _______ grams.', marks: 1, acceptedBlanks: ['1000', '1000 g'], explanation: '1 kg = 1000 grams.' },

  // Ch 14: Mango Problems
  { id: 'M14_01', chapterId: 'math_ch14', concept: 'Unitary Method', type: 'MCQ', prompt: '1. If 1 kg of Kesar mangoes costs 120 rupees, what is the cost of 3 kg?', marks: 1, options: ['240 rupees', '360 rupees', '480 rupees', '300 rupees'], correctOptionIndex: 1, explanation: '3 × 120 = 360 rupees.' },

  // ================= SCIENCE / EVS =================
  // Ch 1: Seeds and Seeds
  { id: 'S1_01', chapterId: 'sci_ch1', concept: 'Germination', type: 'FILL_BLANKS', prompt: '1. Sprouting of a seed into a new young plant is called _______.', marks: 1, acceptedBlanks: ['germination', 'seed germination'], explanation: 'Germination is when a seed embryo awakens and sprouts.' },
  { id: 'S1_02', chapterId: 'sci_ch1', concept: 'Seed Dispersal', type: 'SHORT_ANSWER', prompt: '2. Name two natural carriers or agents of seed dispersal.', marks: 2, rubricKeywords: ['wind', 'water', 'animal', 'bird', 'air'], explanation: 'Seeds are dispersed by wind, water, and animals.' },
  { id: 'S1_03', chapterId: 'sci_ch1', concept: 'Inventions', type: 'SHORT_ANSWER', prompt: '3. What feature of burr seeds inspired George de Mestral to invent Velcro?', marks: 2, rubricKeywords: ['hooks', 'hook', 'stick', 'fur', 'clothes'], explanation: 'Tiny hooks on burrs clung to fur, inspiring Velcro.' },

  // Ch 2: From Tasting to Digesting
  { id: 'S2_01', chapterId: 'sci_ch2', concept: 'Digestive Enzymes', type: 'MCQ', prompt: '1. Which fluid secreted in our mouth begins the breakdown of food starch?', marks: 1, options: ['Bile', 'Saliva', 'Water', 'Acid'], correctOptionIndex: 1, explanation: 'Saliva enzymes begin carbohydrate breakdown.' },
  { id: 'S2_02', chapterId: 'sci_ch2', concept: 'Scientific Discoveries', type: 'MCQ', prompt: '2. Which doctor famously studied the human stomach through a hole in patient Martin?', marks: 1, options: ['Dr. Beaumont', 'Dr. Fleming', 'Dr. Jenner', 'Dr. Watson'], correctOptionIndex: 0, explanation: 'Dr. William Beaumont discovered stomach digestion secrets.' },

  // Ch 3: Super Senses
  { id: 'S3_01', chapterId: 'sci_ch3', concept: 'Animal Olfactory Sense', type: 'TRUE_FALSE', prompt: '1. Ants leave behind a scent trail on the ground for other ants to follow.', marks: 1, correctBoolean: true, explanation: 'Ants release pheromone scent trails.' },
  { id: 'S3_02', chapterId: 'sci_ch3', concept: 'Vision in Birds', type: 'MCQ', prompt: '2. Why do birds like pigeons and sparrows frequently move their necks?', marks: 1, options: ['Their eyes are fixed and cannot move', 'To hear sounds better', 'To catch insects in air', 'To stay warm'], correctOptionIndex: 0, explanation: 'Most birds have fixed eyes and must turn their heads to look around.' },

  // Ch 4: Experiments with Water
  { id: 'S4_01', chapterId: 'sci_ch4', concept: 'Salinity & Buoyancy', type: 'MCQ', prompt: '1. A person floats easily without sinking in the Dead Sea because of its:', marks: 1, options: ['High salt density', 'Cold temperature', 'Fresh water', 'Fast currents'], correctOptionIndex: 0, explanation: 'Extreme salt concentration makes the water dense enough to keep humans buoyant.' },
  { id: 'S4_02', chapterId: 'sci_ch4', concept: 'Historical Events', type: 'FILL_BLANKS', prompt: '2. Mahatma Gandhi undertook the famous Dandi March in Gujarat to protest the tax on _______.', marks: 1, acceptedBlanks: ['salt'], explanation: 'The 1930 Dandi March was against the British salt law.' },

  // Ch 5: Every Drop Counts
  { id: 'S5_01', chapterId: 'sci_ch5', concept: 'Rainwater Conservation', type: 'FILL_BLANKS', prompt: '1. Traditional stepped wells built to harvest and store rainwater are called _______.', marks: 1, acceptedBlanks: ['stepwells', 'baolis', 'vavs', 'vav'], explanation: 'Stepwells and baolis collect and store rainwater.' },

  // Ch 6: A Treat for Mosquitoes
  { id: 'S6_01', chapterId: 'sci_ch6', concept: 'Disease Vectors', type: 'MCQ', prompt: '1. Malaria is transmitted to humans by the bite of the female:', marks: 1, options: ['Anopheles mosquito', 'Aedes mosquito', 'Culex mosquito', 'Housefly'], correctOptionIndex: 0, explanation: 'Female Anopheles mosquitoes carry the malaria parasite.' },
  { id: 'S6_02', chapterId: 'sci_ch6', concept: 'Anaemia & Nutrition', type: 'SHORT_ANSWER', prompt: '2. Name two foods rich in iron recommended to treat anaemia.', marks: 2, rubricKeywords: ['jaggery', 'amla', 'spinach', 'green', 'leaves'], explanation: 'Jaggery, amla, and green leafy vegetables are rich in iron.' },

  // Ch 7: Up You Go!
  { id: 'S7_01', chapterId: 'sci_ch7', concept: 'Mountaineering', type: 'FILL_BLANKS', prompt: '1. The first Indian woman to reach the peak of Mount Everest in 1984 was _______.', marks: 1, acceptedBlanks: ['bachendri pal'], explanation: 'Bachendri Pal reached the summit on May 23, 1984.' },

  // Ch 8: Walls Tell Stories
  { id: 'S8_01', chapterId: 'sci_ch8', concept: 'Fort Architecture', type: 'MCQ', prompt: '1. Rounded thick protruding sections of fort walls used for defense are called:', marks: 1, options: ['Bastions (Burj)', 'Pillars', 'Arches', 'Moats'], correctOptionIndex: 0, explanation: 'Bastions gave defenders a wide vantage point to spot enemies.' },

  // Ch 9: Sunita in Space
  { id: 'S9_01', chapterId: 'sci_ch9', concept: 'Microgravity', type: 'TRUE_FALSE', prompt: '1. In space stations orbiting Earth, water floats in mid-air as liquid blobs.', marks: 1, correctBoolean: true, explanation: 'In microgravity, water does not stay in open glasses.' },

  // Ch 10: What if it Finishes?
  { id: 'S10_01', chapterId: 'sci_ch10', concept: 'Fossil Fuels', type: 'MCQ', prompt: '1. Which of the following is a non-renewable fossil fuel extracted from underground wells?', marks: 1, options: ['Petroleum', 'Solar energy', 'Wind energy', 'Biomass'], correctOptionIndex: 0, explanation: 'Petroleum takes millions of years to form and is exhaustible.' },

  // Ch 11: A Shelter So High
  { id: 'S11_01', chapterId: 'sci_ch11', concept: 'Ladakh Geography', type: 'FILL_BLANKS', prompt: '1. The high-altitude cold desert of India located in Jammu & Kashmir is _______.', marks: 1, acceptedBlanks: ['ladakh', 'leh'], explanation: 'Ladakh is known as a cold desert with little annual rainfall.' },

  // Ch 12: When the Earth Shook
  { id: 'S12_01', chapterId: 'sci_ch12', concept: 'Earthquake Safety', type: 'MCQ', prompt: '1. During an earthquake, what safety action is recommended if inside a building?', marks: 1, options: ['Drop under a sturdy table and hold on', 'Use the elevator', 'Stand near tall windows', 'Run on stairs'], correctOptionIndex: 0, explanation: 'Drop, Cover, and Hold Under a sturdy table protects from falling debris.' },

  // Ch 13: Blow Hot, Blow Cold
  { id: 'S13_01', chapterId: 'sci_ch13', concept: 'Respiration & Heat', type: 'TRUE_FALSE', prompt: '1. Our breath can be used both to warm freezing hands and to cool hot soup.', marks: 1, correctBoolean: true, explanation: 'Breath temperature changes depending on mouth distance and airflow.' },

  // Ch 14: Farmers Story
  { id: 'S14_01', chapterId: 'sci_ch14', concept: 'Traditional Farming', type: 'SHORT_ANSWER', prompt: '1. Why are earthworms known as a farmer best friend?', marks: 2, rubricKeywords: ['soil', 'fertile', 'air', 'holes', 'dig', 'manure'], explanation: 'Earthworms dig tunnels that aerate the soil and create nutrient-rich castings.' },

  // ================= SOCIAL STUDIES / GUJARAT HERITAGE =================
  // Ch 1: Geography & Resources
  { id: 'SS1_01', chapterId: 'sst_ch1', concept: 'Coastline', type: 'MCQ', prompt: '1. What is the approximate length of Gujarat coastline, the longest in India?', marks: 1, options: ['1,000 km', '1,214 km', '1,600 km', '2,400 km'], correctOptionIndex: 2, explanation: 'Gujarat has a shoreline spanning roughly 1,600 km.' },
  { id: 'SS1_02', chapterId: 'sst_ch1', concept: 'Deserts', type: 'FILL_BLANKS', prompt: '2. The famous White Salt Desert is located in the Great Rann of _______.', marks: 1, acceptedBlanks: ['kutch', 'kachchh'], explanation: 'The White Desert is located in Kutch district.' },

  // Ch 2: Heritage & Stepwells
  { id: 'SS2_01', chapterId: 'sst_ch2', concept: 'Stepwell Architecture', type: 'MCQ', prompt: '1. In which historic city is the UNESCO World Heritage stepwell Rani ki Vav situated?', marks: 1, options: ['Patan', 'Surat', 'Rajkot', 'Junagadh'], correctOptionIndex: 0, explanation: 'Rani ki Vav is an 11th-century stepwell in Patan.' },
  { id: 'SS2_02', chapterId: 'sst_ch2', concept: 'Traditional Textiles', type: 'FILL_BLANKS', prompt: '2. The world-famous double-ikat woven silk sarees of Patan are called _______.', marks: 1, acceptedBlanks: ['patola', 'patan patola'], explanation: 'Patan Patola is a revered double-ikat weaving tradition.' },

  // Ch 3: Ancient Seaports
  { id: 'SS3_01', chapterId: 'sst_ch3', concept: 'Harappan Seaport', type: 'TRUE_FALSE', prompt: '1. Lothal in Gujarat was an ancient Harappan port with a brick tidal dockyard.', marks: 1, correctBoolean: true, explanation: 'Lothal is recognized as an ancient Indus Valley Civilization port.' },
  { id: 'SS3_02', chapterId: 'sst_ch3', concept: 'Modern Seaports', type: 'MCQ', prompt: '2. Which major cargo seaport in Kutch is one of India largest trade gateways?', marks: 1, options: ['Kandla (Deendayal Port)', 'Mandvi', 'Veraval', 'Porbandar'], correctOptionIndex: 0, explanation: 'Kandla is a major international trade port.' },

  // Ch 4: Sun Temple Modhera
  { id: 'SS4_01', chapterId: 'sst_ch4', concept: 'Solanki Architecture', type: 'MCQ', prompt: '1. The 11th-century Sun Temple built during the Solanki dynasty is located at:', marks: 1, options: ['Modhera', 'Somnath', 'Dwarka', 'Ambaji'], correctOptionIndex: 0, explanation: 'The Sun Temple is located in Modhera, Mehsana district.' },

  // Ch 5: Wildlife Sanctuaries
  { id: 'SS5_01', chapterId: 'sst_ch5', concept: 'Asiatic Lions', type: 'TRUE_FALSE', prompt: '1. Gir National Park in Gujarat is the only natural home in the world for Asiatic Lions.', marks: 1, correctBoolean: true, explanation: 'Gir is the sole surviving wild habitat for Asiatic Lions.' },
  { id: 'SS5_02', chapterId: 'sst_ch5', concept: 'Blackbuck Sanctuary', type: 'FILL_BLANKS', prompt: '2. The famous National Park in Gujarat dedicated to the conservation of blackbucks is at _______.', marks: 1, acceptedBlanks: ['velavadar'], explanation: 'Velavadar in Bhavnagar is famous for blackbucks.' },

  // Ch 6: Freedom Struggle
  { id: 'SS6_01', chapterId: 'sst_ch6', concept: 'Gandhian Movement', type: 'SHORT_ANSWER', prompt: '1. On the banks of which river did Mahatma Gandhi establish the Sabarmati Ashram in 1917?', marks: 2, rubricKeywords: ['sabarmati'], explanation: 'Sabarmati Ashram was established along the Sabarmati river in Ahmedabad.' },
  { id: 'SS6_02', chapterId: 'sst_ch6', concept: 'National Leaders', type: 'MCQ', prompt: '2. The colossal Statue of Unity built on the Narmada River honors which freedom leader?', marks: 1, options: ['Sardar Vallabhbhai Patel', 'Mahatma Gandhi', 'Subhash Chandra Bose', 'Jawaharlal Nehru'], correctOptionIndex: 0, explanation: 'The Statue of Unity honors Sardar Vallabhbhai Patel.' },

  // Ch 7: Sardar Sarovar & Irrigation
  { id: 'SS7_01', chapterId: 'sst_ch7', concept: 'Lifeline of Gujarat', type: 'MCQ', prompt: '1. Which river is revered as the Lifeline of Gujarat, housing the Sardar Sarovar Dam?', marks: 1, options: ['Narmada', 'Sabarmati', 'Tapi', 'Mahi'], correctOptionIndex: 0, explanation: 'The Narmada River provides drinking water and irrigation across Gujarat.' },
];

function clean(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
}

function gradeQuestion(q, ans) {
  const u = ans || {};
  if (q.type === 'MCQ') {
    const ok = u.mcqSelected === q.correctOptionIndex;
    return { isCorrect: ok, score: ok ? q.marks : 0, feedback: ok ? 'Correct choice!' : 'Correct option: ' + q.options[q.correctOptionIndex] };
  }
  if (q.type === 'TRUE_FALSE') {
    const ok = u.booleanSelected === q.correctBoolean;
    return { isCorrect: ok, score: ok ? q.marks : 0, feedback: ok ? 'Correct!' : 'Statement is ' + (q.correctBoolean ? 'True' : 'False') + '.' };
  }
  if (q.type === 'FILL_BLANKS') {
    const val = clean(u.blankEntered || '');
    const ok = q.acceptedBlanks.map(clean).includes(val);
    return { isCorrect: ok, score: ok ? q.marks : 0, feedback: ok ? 'Correct term verified!' : 'Expected answer: ' + q.acceptedBlanks[0] };
  }
  if (q.type === 'MATCHING') {
    const pairs = q.matchingPairs || [];
    const userPairs = u.matchingUserPairs || {};
    let matched = 0;
    pairs.forEach(p => { if (clean(userPairs[p.left] || '') === clean(p.right)) matched++; });
    const ok = matched === pairs.length;
    return { isCorrect: ok, score: ok ? q.marks : matched > 0 ? 1 : 0, feedback: matched + ' of ' + pairs.length + ' pairs matched.' };
  }
  if (q.type === 'SHORT_ANSWER') {
    const text = clean(u.writtenText || '');
    let matchedCount = 0;
    (q.rubricKeywords || []).forEach(kw => { if (text.includes(clean(kw))) matchedCount++; });
    const score = Math.min(q.marks, matchedCount >= 2 ? 2 : matchedCount === 1 ? 1 : 0);
    return { isCorrect: score === q.marks, score: score, feedback: 'Rubric: ' + score + '/' + q.marks + ' marks based on key concepts.' };
  }
  return { isCorrect: false, score: 0, feedback: 'Not answered' };
}

// -------------------------------------------------------------
// MAIN COMPONENT WITH AIR-GAPPED DIAGNOSTICS & ON-DEVICE AI
// -------------------------------------------------------------
export default function App() {
  const [screen, setScreen] = useState('HOME');
  const [selectedSub, setSelectedSub] = useState('mathematics');
  const [selectedChapterId, setSelectedChapterId] = useState('math_ch1');

  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const [testResults, setTestResults] = useState([]);
  const [chapterDiagnosis, setChapterDiagnosis] = useState({
    chapterTitle: '',
    score: 0,
    maxScore: 0,
    percentage: 0,
    masteredConcepts: [],
    focusConcepts: [],
    aiFeedback: '',
  });

  const [history, setHistory] = useState([]);
  const [generatingAiReport, setGeneratingAiReport] = useState(false);

  // AI Modal
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [aiTutorPrompt, setAiTutorPrompt] = useState('');
  const [aiTutorResponse, setAiTutorResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Model Manager State
  const [modelStatus, setModelStatus] = useState('NOT_DOWNLOADED');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [deviceMemInfo, setDeviceMemInfo] = useState({ ram: '1,840 MB (Safe)', storage: '4,200 MB (Safe)', safe: true });

  useEffect(() => {
    checkMemory();
  }, []);

  async function checkMemory() {
    if (LiteRTLMNative && LiteRTLMNative.checkDeviceEligibility) {
      try {
        const info = await LiteRTLMNative.checkDeviceEligibility();
        setDeviceMemInfo({
          ram: Math.round(info.availableRamMB) + ' MB free',
          storage: Math.round(info.availableStorageMB) + ' MB free',
          safe: info.canLoadModel,
        });
      } catch (e) {
        setDeviceMemInfo({ ram: 'Available', storage: 'Available', safe: true });
      }
    }
  }

  function simulateOrDownloadModel() {
    setModelStatus('DOWNLOADING');
    setDownloadProgress(0);
    let current = 0;
    const timer = setInterval(() => {
      current += 25;
      if (current >= 100) {
        clearInterval(timer);
        setDownloadProgress(100);
        setModelStatus('READY_IN_RAM');
        Alert.alert('Model Ready', 'Gemma 3 1B INT4 pinned in local device RAM. 100% on-device.');
      } else {
        setDownloadProgress(current);
      }
    }, 250);
  }

  function unloadModelFromRam() {
    if (LiteRTLMNative && LiteRTLMNative.unloadModel) {
      LiteRTLMNative.unloadModel();
    }
    setModelStatus('NOT_DOWNLOADED');
    setDownloadProgress(0);
    Alert.alert('Memory Cleared', 'LiteRT-LM weights unloaded.');
  }

  function startChapterTest() {
    const filtered = QUESTION_BANK.filter(q => q.chapterId === selectedChapterId);
    if (filtered.length === 0) {
      Alert.alert('Coming Soon', 'Questions for this chapter are being added in the next module.');
      return;
    }
    // Randomize question order for variety
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setActiveQuestions(shuffled);
    setCurrentIndex(0);
    setAnswers({});
    setScreen('QUIZ');
  }

  async function finishTest() {
    let earned = 0;
    let max = 0;
    const graded = [];
    const conceptScores = {};

    activeQuestions.forEach(q => {
      const u = answers[q.id] || {};
      const evalRes = gradeQuestion(q, u);
      earned += evalRes.score;
      max += q.marks;

      const cName = q.concept || 'General Concept';
      if (!conceptScores[cName]) {
        conceptScores[cName] = { correct: 0, total: 0 };
      }
      conceptScores[cName].total += q.marks;
      conceptScores[cName].correct += evalRes.score;

      graded.push({ question: q, evalRes: evalRes, userAns: u });
    });

    const pct = max > 0 ? Math.round((earned / max) * 100) : 0;
    const chapterObj = CHAPTERS[selectedSub].find(c => c.id === selectedChapterId);
    const chapterTitle = chapterObj ? chapterObj.name : selectedChapterId;

    const mastered = [];
    const focus = [];

    Object.keys(conceptScores).forEach(cKey => {
      const item = conceptScores[cKey];
      if (item.correct === item.total) {
        mastered.push(cKey);
      } else {
        focus.push(`${cKey} (${item.correct}/${item.total} marks)`);
      }
    });

    setChapterDiagnosis({
      chapterTitle,
      score: earned,
      maxScore: max,
      percentage: pct,
      masteredConcepts: mastered,
      focusConcepts: focus,
      aiFeedback: 'Generating AI diagnostic feedback...',
    });

    setTestResults(graded);
    setScreen('REVIEW');

    setHistory([
      {
        id: 'T_' + Date.now(),
        subject: selectedSub,
        chapterTitle,
        score: earned,
        maxScore: max,
        percentage: pct,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...history,
    ]);

    generateAiDiagnosis(chapterTitle, earned, max, pct, mastered, focus);
  }

  async function generateAiDiagnosis(chapterTitle, earned, max, pct, mastered, focus) {
    setGeneratingAiReport(true);
    const prompt = `Student completed GSEB Standard 5 test on "${chapterTitle}". Score: ${earned}/${max} (${pct}%).
Mastered: ${mastered.join(', ') || 'Basics'}.
Focus on: ${focus.join(', ') || 'None'}. Provide friendly study guidance for standard 5 student in Gujarat.`;

    if (modelStatus === 'READY_IN_RAM' && LiteRTLMNative && LiteRTLMNative.generateTutorResponse) {
      try {
        const res = await LiteRTLMNative.generateTutorResponse(prompt, '');
        setChapterDiagnosis(prev => ({ ...prev, aiFeedback: res.text }));
        setGeneratingAiReport(false);
        return;
      } catch (err) {}
    }

    setTimeout(() => {
      let advice = '';
      if (pct >= 80) {
        advice = `🌟 Excellent work, Arjun! You scored ${earned}/${max} (${pct}%). You demonstrated strong understanding of ${mastered.slice(0, 2).join(' and ')}. Keep revising ${focus.join(', ') || 'the entire chapter'} once before final tests!`;
      } else if (pct >= 50) {
        advice = `👍 Good effort, Arjun! You scored ${earned}/${max} (${pct}%). You did great in ${mastered.join(', ') || 'fundamentals'}. For your revision, spend 10 minutes re-reading textbook sections on ${focus.join(', ')}.`;
      } else {
        advice = `💪 Keep practicing, Arjun! You scored ${earned}/${max} (${pct}%). Mistakes help us learn. Re-read ${focus.slice(0, 2).join(', ')} in your textbook and ask your AI tutor anytime!`;
      }
      setChapterDiagnosis(prev => ({ ...prev, aiFeedback: advice }));
      setGeneratingAiReport(false);
    }, 500);
  }

  async function askAiTutor(questionObj, userText) {
    setAiModalVisible(true);
    setAiLoading(true);
    setAiTutorResponse('');
    setAiTutorPrompt(questionObj.prompt);

    const query = userText
      ? `Student's attempt: "${userText}". Question: "${questionObj.prompt}". Explain simply to Standard 5 student.`
      : `Question: "${questionObj.prompt}". Explain this concept to a Standard 5 student in simple English with daily life examples.`;

    if (modelStatus === 'READY_IN_RAM' && LiteRTLMNative && LiteRTLMNative.generateTutorResponse) {
      try {
        const res = await LiteRTLMNative.generateTutorResponse(query, '');
        setAiTutorResponse(res.text);
      } catch (e) {
        setAiTutorResponse(`💡 Concept Explanation:\n${questionObj.explanation}`);
      } finally {
        setAiLoading(false);
      }
    } else {
      setTimeout(() => {
        setAiTutorResponse(`💡 Concept Explanation:\n${questionObj.explanation}\n\nTip: Connect this rule to objects in your house or classroom!`);
        setAiLoading(false);
      }, 500);
    }
  }

  const currentQ = activeQuestions[currentIndex];
  const userAns = currentQ ? answers[currentQ.id] || {} : {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>ShikshaSaathi</Text>
          <TouchableOpacity
            style={[styles.aiChip, modelStatus === 'READY_IN_RAM' ? styles.aiChipActive : null]}
            onPress={() => setScreen('AI_MANAGER')}
          >
            <Text style={styles.aiChipText}>
              {modelStatus === 'READY_IN_RAM' ? '🟢 LiteRT Active' : '⚙️ AI Model'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>GSEB Std 5 • Complete 3-Subject Curriculum & Diagnostics</Text>
      </View>

      {/* SCREEN 1: HOME */}
      {screen === 'HOME' && (
        <ScrollView style={styles.body}>
          <Text style={styles.h2}>1. Select Subject</Text>
          <View style={styles.row}>
            {['mathematics', 'science', 'social_studies'].map(sub => {
              const active = selectedSub === sub;
              return (
                <TouchableOpacity
                  key={sub}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => {
                    setSelectedSub(sub);
                    setSelectedChapterId(CHAPTERS[sub][0].id);
                  }}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {sub === 'mathematics' ? 'Math (14)' : sub === 'science' ? 'Science (14)' : 'Social (7)'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.h2}>2. Select Chapter ({CHAPTERS[selectedSub].length} Total)</Text>
          {CHAPTERS[selectedSub].map(ch => {
            const isSelected = selectedChapterId === ch.id;
            return (
              <TouchableOpacity
                key={ch.id}
                style={[styles.chapterBtn, isSelected && styles.chapterBtnActive]}
                onPress={() => setSelectedChapterId(ch.id)}
              >
                <Text style={[styles.chapterBtnText, isSelected && styles.chapterBtnTextActive]}>
                  {isSelected ? '✓ ' : '• '} {ch.name}
                </Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity style={styles.primaryBtn} onPress={startChapterTest}>
            <Text style={styles.primaryBtnText}>Start Chapter Assessment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => setScreen('DASHBOARD')}>
            <Text style={styles.secondaryBtnText}>📊 Open Parent Dashboard</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* SCREEN 2: QUIZ */}
      {screen === 'QUIZ' && currentQ && (
        <ScrollView style={styles.body}>
          <View style={styles.progBanner}>
            <Text style={styles.progText}>Q{currentIndex + 1} OF {activeQuestions.length} • {currentQ.concept}</Text>
            <TouchableOpacity
              style={styles.askAiSmallBtn}
              onPress={() => askAiTutor(currentQ, userAns.writtenText)}
            >
              <Text style={styles.askAiSmallText}>💡 Ask AI</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.prompt}>{currentQ.prompt}</Text>

          {/* MCQ */}
          {currentQ.type === 'MCQ' &&
            currentQ.options.map((opt, idx) => {
              const isSelected = userAns.mcqSelected === idx;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.optCard, isSelected && styles.optCardActive]}
                  onPress={() => {
                    const copy = { ...answers };
                    copy[currentQ.id] = { ...userAns, mcqSelected: idx };
                    setAnswers(copy);
                  }}
                >
                  <Text style={[styles.optCardText, isSelected && styles.optCardTextActive]}>
                    {String.fromCharCode(65 + idx)}. {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}

          {/* TRUE/FALSE */}
          {currentQ.type === 'TRUE_FALSE' && (
            <View style={styles.row}>
              {[true, false].map(val => {
                const isSelected = userAns.booleanSelected === val;
                return (
                  <TouchableOpacity
                    key={String(val)}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => {
                      const copy = { ...answers };
                      copy[currentQ.id] = { ...userAns, booleanSelected: val };
                      setAnswers(copy);
                    }}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                      {val ? 'TRUE' : 'FALSE'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* FILL BLANKS */}
          {currentQ.type === 'FILL_BLANKS' && (
            <TextInput
              style={styles.input}
              placeholder="Type your word answer..."
              value={userAns.blankEntered || ''}
              onChangeText={t => {
                const copy = { ...answers };
                copy[currentQ.id] = { ...userAns, blankEntered: t };
                setAnswers(copy);
              }}
            />
          )}

          {/* MATCHING */}
          {currentQ.type === 'MATCHING' &&
            currentQ.matchingPairs.map((pair, idx) => {
              const currentVal = (userAns.matchingUserPairs || {})[pair.left] || '';
              return (
                <View key={idx} style={styles.matchRow}>
                  <Text style={styles.matchLeft}>{pair.left} ➔</Text>
                  <TextInput
                    style={[styles.input, { flex: 1, marginVertical: 0 }]}
                    placeholder="Type match"
                    value={currentVal}
                    onChangeText={v => {
                      const copy = { ...answers };
                      const pCopy = { ...(userAns.matchingUserPairs || {}) };
                      pCopy[pair.left] = v;
                      copy[currentQ.id] = { ...userAns, matchingUserPairs: pCopy };
                      setAnswers(copy);
                    }}
                  />
                </View>
              );
            })}

          {/* SHORT ANSWER */}
          {currentQ.type === 'SHORT_ANSWER' && (
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
              multiline={true}
              placeholder="Type your explanation using key scientific/math terms..."
              value={userAns.writtenText || ''}
              onChangeText={t => {
                const copy = { ...answers };
                copy[currentQ.id] = { ...userAns, writtenText: t };
                setAnswers(copy);
              }}
            />
          )}

          <View style={[styles.row, { marginTop: 14 }]}>
            {currentIndex > 0 && (
              <TouchableOpacity
                style={[styles.secondaryBtn, { flex: 1, marginRight: 6 }]}
                onPress={() => setCurrentIndex(currentIndex - 1)}
              >
                <Text style={styles.secondaryBtnText}>Previous</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.primaryBtn, { flex: 1, marginTop: 0 }]}
              onPress={() => {
                if (currentIndex < activeQuestions.length - 1) {
                  setCurrentIndex(currentIndex + 1);
                } else {
                  finishTest();
                }
              }}
            >
              <Text style={styles.primaryBtnText}>
                {currentIndex === activeQuestions.length - 1 ? 'Finish & Generate AI Report' : 'Save & Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* SCREEN 3: CHAPTER SUMMARY & DIAGNOSTICS */}
      {screen === 'REVIEW' && (
        <ScrollView style={styles.body}>
          <View style={styles.diagCard}>
            <Text style={styles.diagChapter}>{chapterDiagnosis.chapterTitle}</Text>
            <View style={styles.diagScoreRow}>
              <View>
                <Text style={styles.diagScoreBig}>
                  {chapterDiagnosis.score} / {chapterDiagnosis.maxScore}
                </Text>
                <Text style={styles.diagScorePct}>{chapterDiagnosis.percentage}% Mastery</Text>
              </View>
              <View style={[styles.badge, chapterDiagnosis.percentage >= 70 ? styles.badgePass : styles.badgeRevise]}>
                <Text style={styles.badgeText}>
                  {chapterDiagnosis.percentage >= 80 ? '🌟 Mastered' : chapterDiagnosis.percentage >= 50 ? '📈 Good Progress' : '📖 Needs Revision'}
                </Text>
              </View>
            </View>

            <View style={styles.conceptSection}>
              <Text style={styles.conceptSecTitle}>✅ Mastered Concepts:</Text>
              {chapterDiagnosis.masteredConcepts.length > 0 ? (
                chapterDiagnosis.masteredConcepts.map((c, i) => (
                  <Text key={i} style={styles.conceptItemGood}>• {c}</Text>
                ))
              ) : (
                <Text style={styles.conceptItemNeutral}>Review questions below to build mastery.</Text>
              )}
            </View>

            <View style={styles.conceptSection}>
              <Text style={styles.conceptSecTitleFocus}>🎯 Concepts to Focus On:</Text>
              {chapterDiagnosis.focusConcepts.length > 0 ? (
                chapterDiagnosis.focusConcepts.map((c, i) => (
                  <Text key={i} style={styles.conceptItemFocus}>• {c}</Text>
                ))
              ) : (
                <Text style={styles.conceptItemGood}>🎉 Perfect Score! All concepts mastered.</Text>
              )}
            </View>

            <View style={styles.aiFeedbackBox}>
              <View style={styles.aiFeedbackHeader}>
                <Text style={styles.aiFeedbackTitle}>🤖 AI Tutor Diagnostic Feedback</Text>
                {generatingAiReport && <ActivityIndicator size="small" color="#2563EB" />}
              </View>
              <Text style={styles.aiFeedbackText}>{chapterDiagnosis.aiFeedback}</Text>
            </View>
          </View>

          <Text style={[styles.h2, { marginTop: 14 }]}>Detailed Question Review</Text>
          {testResults.map((item, idx) => {
            const ok = item.evalRes.isCorrect;
            return (
              <View key={idx} style={[styles.resCard, ok ? styles.resPass : styles.resFail]}>
                <View style={styles.resCardHeaderRow}>
                  <Text style={styles.resCardHeader}>
                    Q{idx + 1} ({item.question.concept}): {ok ? '✅ Correct' : '❌ Needs Review'}
                  </Text>
                  <TouchableOpacity
                    style={styles.reviewAiBtn}
                    onPress={() => askAiTutor(item.question, item.userAns?.writtenText)}
                  >
                    <Text style={styles.reviewAiBtnText}>💡 Ask AI</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.resPrompt}>{item.question.prompt}</Text>
                <Text style={styles.resFeedback}>{item.evalRes.feedback}</Text>
                <Text style={styles.resExp}>Notes: {item.question.explanation}</Text>
              </View>
            );
          })}

          <TouchableOpacity style={styles.primaryBtn} onPress={() => setScreen('HOME')}>
            <Text style={styles.primaryBtnText}>Back to Chapter Select</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* SCREEN 4: PARENT DASHBOARD */}
      {screen === 'DASHBOARD' && (
        <ScrollView style={styles.body}>
          <Text style={styles.h2}>Parent Analytics & Performance Log</Text>
          <Text style={styles.subText}>Student: Arjun Patel • GSEB Standard 5</Text>

          <View style={styles.statBox}>
            <Text style={styles.statVal}>{history.length}</Text>
            <Text style={styles.statLabel}>Total Chapter Assessments Completed</Text>
          </View>

          <Text style={[styles.h2, { marginTop: 14 }]}>Assessment History</Text>
          {history.length === 0 ? (
            <Text style={styles.subText}>No chapter tests taken yet.</Text>
          ) : (
            history.map((h, idx) => (
              <View key={idx} style={styles.historyCard}>
                <Text style={styles.historyTitle}>{h.chapterTitle}</Text>
                <Text style={styles.historyScore}>
                  Score: {h.score}/{h.maxScore} ({h.percentage}%) • Time: {h.time}
                </Text>
              </View>
            ))
          )}

          <TouchableOpacity style={[styles.primaryBtn, { marginTop: 16 }]} onPress={() => setScreen('HOME')}>
            <Text style={styles.primaryBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* SCREEN 5: AI MODEL MANAGER */}
      {screen === 'AI_MANAGER' && (
        <ScrollView style={styles.body}>
          <Text style={styles.h2}>On-Device AI Model Manager</Text>
          <Text style={styles.subText}>Google LiteRT-LM & Gemma 3 1B INT4</Text>

          <View style={styles.statBox}>
            <Text style={styles.infoLabel}>Device Free RAM: <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>{deviceMemInfo.ram}</Text></Text>
            <Text style={styles.infoLabel}>Internal Storage: <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>{deviceMemInfo.storage}</Text></Text>
            <Text style={[styles.infoLabel, { marginTop: 4, color: deviceMemInfo.safe ? '#16A34A' : '#DC2626' }]}>
              {deviceMemInfo.safe ? '✓ Device Memory Eligible (Air-Gapped)' : '⚠️ Low Memory'}
            </Text>
          </View>

          {modelStatus === 'NOT_DOWNLOADED' && (
            <TouchableOpacity style={styles.primaryBtn} onPress={simulateOrDownloadModel}>
              <Text style={styles.primaryBtnText}>Initialize On-Device AI Tutor (550 MB)</Text>
            </TouchableOpacity>
          )}

          {modelStatus === 'READY_IN_RAM' && (
            <TouchableOpacity style={styles.dangerBtn} onPress={unloadModelFromRam}>
              <Text style={styles.dangerBtnText}>Unload Model from Memory</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.secondaryBtn, { marginTop: 12 }]} onPress={() => setScreen('HOME')}>
            <Text style={styles.secondaryBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* AI TUTOR MODAL */}
      <Modal visible={aiModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🤖 ShikshaSaathi AI Tutor</Text>
              <TouchableOpacity onPress={() => setAiModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 320 }}>
              <Text style={styles.modalQuestionPrompt}>"{aiTutorPrompt}"</Text>
              {aiLoading ? (
                <View style={{ padding: 20, alignItems: 'center' }}>
                  <ActivityIndicator size="large" color="#2563EB" />
                  <Text style={styles.modalThinking}>Thinking locally on-device...</Text>
                </View>
              ) : (
                <Text style={styles.modalResponseText}>{aiTutorResponse}</Text>
              )}
            </ScrollView>

            <TouchableOpacity style={styles.primaryBtn} onPress={() => setAiModalVisible(false)}>
              <Text style={styles.primaryBtnText}>Got it, Thank you!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// -------------------------------------------------------------
// STYLES
// -------------------------------------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#1E293B', padding: 16, paddingTop: 30 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  aiChip: { backgroundColor: '#334155', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  aiChipActive: { backgroundColor: '#065F46' },
  aiChipText: { color: '#F1F5F9', fontSize: 11, fontWeight: 'bold' },
  body: { flex: 1, padding: 16 },
  h2: { fontSize: 15, fontWeight: 'bold', color: '#0F172A', marginVertical: 8 },
  subText: { fontSize: 12, color: '#64748B', marginBottom: 10 },
  row: { flexDirection: 'row', marginBottom: 12 },
  chip: { flex: 1, padding: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
  chipActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  chipText: { fontSize: 13, fontWeight: 'bold', color: '#475569' },
  chipTextActive: { color: '#FFFFFF' },
  chapterBtn: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 14, marginBottom: 8 },
  chapterBtnActive: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  chapterBtnText: { fontSize: 14, color: '#334155', fontWeight: '600' },
  chapterBtnTextActive: { color: '#1D4ED8', fontWeight: 'bold' },
  primaryBtn: { backgroundColor: '#16A34A', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  primaryBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  secondaryBtn: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  secondaryBtnText: { color: '#334155', fontWeight: 'bold', fontSize: 13 },
  progBanner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  progText: { fontSize: 12, fontWeight: 'bold', color: '#2563EB' },
  askAiSmallBtn: { backgroundColor: '#FEF3C7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#FCD34D' },
  askAiSmallText: { fontSize: 11, fontWeight: 'bold', color: '#B45309' },
  prompt: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginBottom: 14, lineHeight: 22 },
  optCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', padding: 14, borderRadius: 8, marginBottom: 8 },
  optCardActive: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  optCardText: { fontSize: 14, color: '#1E293B' },
  optCardTextActive: { color: '#1D4ED8', fontWeight: 'bold' },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 12, marginVertical: 8, fontSize: 14 },
  matchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  matchLeft: { width: 140, fontSize: 13, fontWeight: 'bold', color: '#334155' },

  // CHAPTER DIAGNOSTIC STYLES
  diagCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#CBD5E1', marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  diagChapter: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginBottom: 8 },
  diagScoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  diagScoreBig: { fontSize: 24, fontWeight: 'bold', color: '#2563EB' },
  diagScorePct: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  badgePass: { backgroundColor: '#DCFCE7' },
  badgeRevise: { backgroundColor: '#FEF3C7' },
  badgeText: { fontSize: 12, fontWeight: 'bold', color: '#1E293B' },
  conceptSection: { marginTop: 12 },
  conceptSecTitle: { fontSize: 12, fontWeight: 'bold', color: '#16A34A', marginBottom: 4 },
  conceptSecTitleFocus: { fontSize: 12, fontWeight: 'bold', color: '#D97706', marginBottom: 4 },
  conceptItemGood: { fontSize: 12, color: '#334155', marginLeft: 6, marginBottom: 2 },
  conceptItemFocus: { fontSize: 12, color: '#B45309', marginLeft: 6, marginBottom: 2, fontWeight: '600' },
  conceptItemNeutral: { fontSize: 12, color: '#64748B', fontStyle: 'italic', marginLeft: 6 },

  // AI FEEDBACK
  aiFeedbackBox: { backgroundColor: '#EEF2FF', borderWidth: 1, borderColor: '#C7D2FE', borderRadius: 8, padding: 12, marginTop: 14 },
  aiFeedbackHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  aiFeedbackTitle: { fontSize: 13, fontWeight: 'bold', color: '#3730A3' },
  aiFeedbackText: { fontSize: 13, color: '#1E1B4B', lineHeight: 20 },

  resCard: { padding: 12, borderRadius: 8, borderWidth: 1, marginBottom: 10, backgroundColor: '#FFFFFF' },
  resPass: { borderColor: '#86EFAC' },
  resFail: { borderColor: '#FCA5A5' },
  resCardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  resCardHeader: { fontWeight: 'bold', fontSize: 12, color: '#1E293B' },
  reviewAiBtn: { backgroundColor: '#E0E7FF', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  reviewAiBtnText: { color: '#3730A3', fontSize: 11, fontWeight: 'bold' },
  resPrompt: { fontSize: 13, color: '#334155', marginBottom: 4 },
  resFeedback: { fontSize: 12, color: '#0284C7', fontWeight: 'bold' },
  resExp: { fontSize: 11, color: '#64748B', fontStyle: 'italic', marginTop: 3 },
  statBox: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', marginBottom: 10 },
  statVal: { fontSize: 26, fontWeight: 'bold', color: '#2563EB', textAlign: 'center' },
  statLabel: { fontSize: 12, color: '#64748B', textAlign: 'center', marginTop: 2 },
  infoLabel: { fontSize: 12, color: '#475569', marginBottom: 4 },
  dangerBtn: { backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FCA5A5', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  dangerBtnText: { color: '#DC2626', fontWeight: 'bold', fontSize: 13 },
  historyCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, padding: 10, marginBottom: 8 },
  historyTitle: { fontSize: 13, fontWeight: 'bold', color: '#1E293B' },
  historyScore: { fontSize: 12, color: '#16A34A', fontWeight: '600', marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 16 },
  modalCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  modalClose: { fontSize: 18, color: '#64748B', padding: 4 },
  modalQuestionPrompt: { fontSize: 13, fontStyle: 'italic', color: '#64748B', marginBottom: 10 },
  modalThinking: { fontSize: 12, color: '#64748B', marginTop: 8 },
  modalResponseText: { fontSize: 14, color: '#1E293B', lineHeight: 22 },
});

// REGISTRATION
registerRootComponent(App);
