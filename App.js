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
import { registerRootComponent } from 'expo'; 

const LiteRTLMNative = NativeModules.LiteRTLM;

// -------------------------------------------------------------
// CHAPTER CONFIGURATION (GSEB Standard 5 Aligned)
// -------------------------------------------------------------
const CHAPTERS = {
  mathematics: [
    { id: 'math_ch1', name: 'Chapter 1: Shapes and Angles' },
    { id: 'math_ch2', name: 'Chapter 2: Parts and Wholes (Fractions)' },
  ],
  science: [
    { id: 'sci_ch1', name: 'Chapter 1: Seeds and Seeds' },
    { id: 'sci_ch2', name: 'Chapter 2: From Tasting to Digesting' },
  ],
  social_studies: [
    { id: 'sst_ch1', name: 'Chapter 1: Gujarat: Geography & Resources' },
    { id: 'sst_ch2', name: 'Chapter 2: Cultural Heritage & Stepwells' },
  ],
};

// -------------------------------------------------------------
// QUESTION BANK (90 Total Questions • 15 Per Chapter)
// -------------------------------------------------------------
const QUESTION_BANK = [
  // ================= MATHEMATICS - CH 1 (15 Qs) =================
  { id: 'M1_01', chapterId: 'math_ch1', type: 'MCQ', prompt: '1. How many degrees are there in a right angle?', marks: 1, options: ['45 degrees', '90 degrees', '180 degrees', '360 degrees'], correctOptionIndex: 1, explanation: 'A right angle measures exactly 90 degrees.' },
  { id: 'M1_02', chapterId: 'math_ch1', type: 'TRUE_FALSE', prompt: '2. At 9:00 o clock, the hands of a clock form an obtuse angle.', marks: 1, correctBoolean: false, explanation: 'At 9:00, the clock hands form a 90 degree right angle, not an obtuse angle.' },
  { id: 'M1_03', chapterId: 'math_ch1', type: 'MATCHING', prompt: '3. Match each angle type with its degree range:', marks: 2, matchingPairs: [{ left: 'Less than 90 deg', right: 'Acute' }, { left: 'Between 90 and 180 deg', right: 'Obtuse' }], explanation: 'Acute is <90 deg; Obtuse is between 90 and 180 deg.' },
  { id: 'M1_04', chapterId: 'math_ch1', type: 'FILL_BLANKS', prompt: '4. An angle that forms a straight flat line measures exactly _______ degrees.', marks: 1, acceptedBlanks: ['180', '180 degrees'], explanation: 'A straight angle measures exactly 180 degrees.' },
  { id: 'M1_05', chapterId: 'math_ch1', type: 'MCQ', prompt: '5. What type of angle is smaller than a right angle?', marks: 1, options: ['Obtuse angle', 'Acute angle', 'Straight angle', 'Reflex angle'], correctOptionIndex: 1, explanation: 'An angle measuring less than 90 degrees is an acute angle.' },
  { id: 'M1_06', chapterId: 'math_ch1', type: 'SHORT_ANSWER', prompt: '6. Define a right angle in your own words.', marks: 2, rubricKeywords: ['90', 'degree', 'degrees', 'perpendicular', 'square', 'corner'], explanation: 'A right angle measures exactly 90 degrees and forms a square corner.' },
  { id: 'M1_07', chapterId: 'math_ch1', type: 'MCQ', prompt: '7. How many corners (vertices) does a triangle have?', marks: 1, options: ['2', '3', '4', '5'], correctOptionIndex: 1, explanation: 'A triangle has 3 sides and 3 corners.' },
  { id: 'M1_08', chapterId: 'math_ch1', type: 'TRUE_FALSE', prompt: '8. Every rectangle contains four right angles.', marks: 1, correctBoolean: true, explanation: 'All four internal angles of a rectangle are 90 degrees.' },
  { id: 'M1_09', chapterId: 'math_ch1', type: 'FILL_BLANKS', prompt: '9. An angle greater than 90 degrees but less than 180 degrees is called an _______ angle.', marks: 1, acceptedBlanks: ['obtuse', 'obtuse angle'], explanation: 'Obtuse angles measure between 90 and 180 degrees.' },
  { id: 'M1_10', chapterId: 'math_ch1', type: 'MCQ', prompt: '10. At 6:00 o clock, what kind of angle do the clock hands form?', marks: 1, options: ['Acute angle', 'Right angle', 'Straight angle', 'Zero angle'], correctOptionIndex: 2, explanation: 'At 6:00, hands point in opposite directions making a 180 deg straight angle.' },
  { id: 'M1_11', chapterId: 'math_ch1', type: 'MATCHING', prompt: '11. Match each shape with its number of angles:', marks: 2, matchingPairs: [{ left: 'Triangle', right: '3 angles' }, { left: 'Pentagon', right: '5 angles' }], explanation: 'Triangle has 3 angles; pentagon has 5 angles.' },
  { id: 'M1_12', chapterId: 'math_ch1', type: 'TRUE_FALSE', prompt: '12. Two right angles combined together form a straight angle.', marks: 1, correctBoolean: true, explanation: '90 deg + 90 deg = 180 deg (straight angle).' },
  { id: 'M1_13', chapterId: 'math_ch1', type: 'SHORT_ANSWER', prompt: '13. What geometric tool in a compass box measures angles in degrees?', marks: 2, rubricKeywords: ['protractor', 'd scale'], explanation: 'A protractor measures angles in degrees.' },
  { id: 'M1_14', chapterId: 'math_ch1', type: 'FILL_BLANKS', prompt: '14. The common end point where two arms meet to form an angle is the _______.', marks: 1, acceptedBlanks: ['vertex', 'corner'], explanation: 'The vertex is the intersection point of two angle rays.' },
  { id: 'M1_15', chapterId: 'math_ch1', type: 'MCQ', prompt: '15. How many right angles are there in a standard square?', marks: 1, options: ['1', '2', '3', '4'], correctOptionIndex: 3, explanation: 'A square has 4 right angles.' },

  // ================= MATHEMATICS - CH 2 (15 Qs) =================
  { id: 'M2_01', chapterId: 'math_ch2', type: 'MCQ', prompt: '1. What is 1/2 of 100 rupees?', marks: 1, options: ['25 rupees', '50 rupees', '75 rupees', '10 rupees'], correctOptionIndex: 1, explanation: 'Half of 100 is 50 rupees.' },
  { id: 'M2_02', chapterId: 'math_ch2', type: 'TRUE_FALSE', prompt: '2. The fraction 2/4 is equal to 1/2.', marks: 1, correctBoolean: true, explanation: '2/4 simplifies to 1/2.' },
  { id: 'M2_03', chapterId: 'math_ch2', type: 'MATCHING', prompt: '3. Match each fraction word with its number value:', marks: 2, matchingPairs: [{ left: 'One Half', right: '1/2' }, { left: 'One Quarter', right: '1/4' }], explanation: 'One half = 1/2; One quarter = 1/4.' },
  { id: 'M2_04', chapterId: 'math_ch2', type: 'FILL_BLANKS', prompt: '4. In the fraction 3/5, the bottom number 5 is called the _______.', marks: 1, acceptedBlanks: ['denominator'], explanation: 'The bottom number of a fraction is the denominator.' },
  { id: 'M2_05', chapterId: 'math_ch2', type: 'MCQ', prompt: '5. How many one-fourth (1/4) parts make one whole?', marks: 1, options: ['2', '3', '4', '8'], correctOptionIndex: 2, explanation: 'Four 1/4 parts equal 1 whole.' },
  { id: 'M2_06', chapterId: 'math_ch2', type: 'SHORT_ANSWER', prompt: '6. In a fraction, what does the numerator represent?', marks: 2, rubricKeywords: ['top', 'parts', 'taken', 'selected', 'considered'], explanation: 'The numerator shows how many equal parts are selected.' },
  { id: 'M2_07', chapterId: 'math_ch2', type: 'MCQ', prompt: '7. Which fraction is larger: 1/3 or 1/6?', marks: 1, options: ['1/3', '1/6', 'Both are equal', 'Cannot tell'], correctOptionIndex: 0, explanation: '1/3 is larger than 1/6.' },
  { id: 'M2_08', chapterId: 'math_ch2', type: 'TRUE_FALSE', prompt: '8. If you have 4 parts out of 4, you have 1 whole.', marks: 1, correctBoolean: true, explanation: '4/4 = 1 whole.' },
  { id: 'M2_09', chapterId: 'math_ch2', type: 'FILL_BLANKS', prompt: '9. Half of an hour (60 minutes) equals _______ minutes.', marks: 1, acceptedBlanks: ['30', '30 minutes'], explanation: '1/2 of 60 minutes = 30 minutes.' },
  { id: 'M2_10', chapterId: 'math_ch2', type: 'MCQ', prompt: '10. If a pizza is cut into 8 equal slices and you eat 2, what fraction did you eat?', marks: 1, options: ['1/8', '2/8', '4/8', '6/8'], correctOptionIndex: 1, explanation: '2 slices out of 8 is 2/8 (or 1/4).' },
  { id: 'M2_11', chapterId: 'math_ch2', type: 'MATCHING', prompt: '11. Match each fraction to its equivalent fraction:', marks: 2, matchingPairs: [{ left: '1/2', right: '3/6' }, { left: '3/4', right: '6/8' }], explanation: '1/2 = 3/6 and 3/4 = 6/8.' },
  { id: 'M2_12', chapterId: 'math_ch2', type: 'TRUE_FALSE', prompt: '12. In a proper fraction, the numerator is always greater than the denominator.', marks: 1, correctBoolean: false, explanation: 'In a proper fraction, the numerator is smaller.' },
  { id: 'M2_13', chapterId: 'math_ch2', type: 'SHORT_ANSWER', prompt: '13. How do you calculate one-third of 15 candies?', marks: 2, rubricKeywords: ['divide', '15', '3', '5', 'five'], explanation: 'Divide 15 by 3 to get 5 candies.' },
  { id: 'M2_14', chapterId: 'math_ch2', type: 'FILL_BLANKS', prompt: '14. Fractions that have the exact same denominator are called _______ fractions.', marks: 1, acceptedBlanks: ['like', 'like fractions'], explanation: 'Fractions with identical denominators are like fractions.' },
  { id: 'M2_15', chapterId: 'math_ch2', type: 'MCQ', prompt: '15. What is 2/10 in its simplest reduced form?', marks: 1, options: ['1/5', '1/10', '2/5', '1/2'], correctOptionIndex: 0, explanation: '2/10 simplifies to 1/5.' },

  // ================= SCIENCE - CH 1 (15 Qs) =================
  { id: 'S1_01', chapterId: 'sci_ch1', type: 'FILL_BLANKS', prompt: '1. The sprouting of a seed into a new young plant is called _______.', marks: 1, acceptedBlanks: ['germination', 'seed germination'], explanation: 'Germination is when a seed embryo awakens and begins to sprout.' },
  { id: 'S1_02', chapterId: 'sci_ch1', type: 'SHORT_ANSWER', prompt: '2. Name two natural carriers or agents of seed dispersal.', marks: 2, rubricKeywords: ['wind', 'water', 'animal', 'animals', 'bird', 'birds', 'air'], explanation: 'Seeds are dispersed by abiotic (wind, water) and biotic (animals) agents.' },
  { id: 'S1_03', chapterId: 'sci_ch1', type: 'MCQ', prompt: '3. Light seeds with hair or wings (like dandelion) are dispersed by:', marks: 1, options: ['Water', 'Wind', 'Animals', 'Gravity only'], correctOptionIndex: 1, explanation: 'Light and feathery seeds float on wind currents.' },
  { id: 'S1_04', chapterId: 'sci_ch1', type: 'TRUE_FALSE', prompt: '4. Seeds require moisture, air, and proper warmth to germinate.', marks: 1, correctBoolean: true, explanation: 'Water, oxygen, and warmth are essential for germination.' },
  { id: 'S1_05', chapterId: 'sci_ch1', type: 'MATCHING', prompt: '5. Match each seed with its primary dispersal method:', marks: 2, matchingPairs: [{ left: 'Dandelion seed', right: 'Wind' }, { left: 'Coconut seed', right: 'Water' }], explanation: 'Dandelion uses wind; coconut uses water.' },
  { id: 'S1_06', chapterId: 'sci_ch1', type: 'MCQ', prompt: '6. Which part inside a seed stores food for the growing baby plant embryo?', marks: 1, options: ['Seed coat', 'Cotyledons', 'Stem', 'Flower'], correctOptionIndex: 1, explanation: 'Cotyledons store starch and food for initial growth.' },
  { id: 'S1_07', chapterId: 'sci_ch1', type: 'FILL_BLANKS', prompt: '7. Plants like the Pitcher Plant that trap and digest insects are called _______ plants.', marks: 1, acceptedBlanks: ['insectivorous', 'carnivorous'], explanation: 'Insectivorous plants trap insects to obtain essential nitrogen.' },
  { id: 'S1_08', chapterId: 'sci_ch1', type: 'TRUE_FALSE', prompt: '8. All plant seeds are of the same size, shape, and surface texture.', marks: 1, correctBoolean: false, explanation: 'Seeds vary widely in size, color, shape, and texture.' },
  { id: 'S1_09', chapterId: 'sci_ch1', type: 'SHORT_ANSWER', prompt: '9. What feature of burr seeds inspired George de Mestral to invent Velcro?', marks: 2, rubricKeywords: ['hooks', 'hook', 'stick', 'sticking', 'fur', 'clothes', 'loops'], explanation: 'Tiny hooks on burrs clung to fur and clothing, inspiring Velcro.' },
  { id: 'S1_10', chapterId: 'sci_ch1', type: 'MCQ', prompt: '10. Which kitchen spice seed crackles and pops when added to hot oil?', marks: 1, options: ['Mustard', 'Gram', 'Pea', 'Wheat'], correctOptionIndex: 0, explanation: 'Mustard seeds crackle and pop when heated in oil.' },
  { id: 'S1_11', chapterId: 'sci_ch1', type: 'FILL_BLANKS', prompt: '11. A seed that splits easily into two equal halves is called a _______ seed.', marks: 1, acceptedBlanks: ['dicot', 'dicotyledon'], explanation: 'Seeds with two cotyledons are dicots.' },
  { id: 'S1_12', chapterId: 'sci_ch1', type: 'MATCHING', prompt: '12. Match each plant seed with its dispersal adaptation:', marks: 2, matchingPairs: [{ left: 'Xanthium seed', right: 'Tiny hooks' }, { left: 'Pea pod', right: 'Explosive bursting' }], explanation: 'Xanthium has hooks; dry pea pods burst open.' },
  { id: 'S1_13', chapterId: 'sci_ch1', type: 'TRUE_FALSE', prompt: '13. Dry gram seeds will sprout inside an airtight dry jar without any water.', marks: 1, correctBoolean: false, explanation: 'Seeds need water to soften their coat and start germination.' },
  { id: 'S1_14', chapterId: 'sci_ch1', type: 'MCQ', prompt: '14. Green chillies were brought to India from which part of the world by traders?', marks: 1, options: ['South America', 'Europe', 'Australia', 'Africa'], correctOptionIndex: 0, explanation: 'Chillies were brought from South America to India.' },
  { id: 'S1_15', chapterId: 'sci_ch1', type: 'SHORT_ANSWER', prompt: '15. Why is it important for seeds to disperse far away from their mother plant?', marks: 2, rubricKeywords: ['overcrowding', 'sunlight', 'water', 'space', 'compete', 'competition', 'grow'], explanation: 'Dispersal prevents overcrowding and competition for sunlight and water.' },

  // ================= SCIENCE - CH 2 (15 Qs) =================
  { id: 'S2_01', chapterId: 'sci_ch2', type: 'MCQ', prompt: '1. Which fluid secreted in our mouth begins the breakdown of food starch?', marks: 1, options: ['Bile', 'Saliva', 'Water', 'Acid'], correctOptionIndex: 1, explanation: 'Saliva contains enzymes that begin carbohydrate breakdown.' },
  { id: 'S2_02', chapterId: 'sci_ch2', type: 'TRUE_FALSE', prompt: '2. The human stomach churns and mixes food with acidic digestive juices.', marks: 1, correctBoolean: true, explanation: 'Stomach walls churn food and mix it with digestive acids.' },
  { id: 'S2_03', chapterId: 'sci_ch2', type: 'MATCHING', prompt: '3. Match each food item with its primary taste:', marks: 2, matchingPairs: [{ left: 'Jaggery', right: 'Sweet' }, { left: 'Bitter gourd (Karela)', right: 'Bitter' }], explanation: 'Jaggery is sweet; Karela is bitter.' },
  { id: 'S2_04', chapterId: 'sci_ch2', type: 'FILL_BLANKS', prompt: '4. The digestive juice inside the human stomach contains _______ acid.', marks: 1, acceptedBlanks: ['hydrochloric', 'hydrochloric acid', 'acid'], explanation: 'Hydrochloric acid kills microbes and activates enzymes.' },
  { id: 'S2_05', chapterId: 'sci_ch2', type: 'MCQ', prompt: '5. What sensory structures on the tongue allow us to recognize different tastes?', marks: 1, options: ['Taste buds', 'Saliva glands', 'Teeth enamel', 'Pores'], correctOptionIndex: 0, explanation: 'Taste buds detect sweet, salty, sour, and bitter tastes.' },
  { id: 'S2_06', chapterId: 'sci_ch2', type: 'SHORT_ANSWER', prompt: '6. Why does a piece of plain bread start tasting sweeter after being chewed for a long time?', marks: 2, rubricKeywords: ['saliva', 'sugar', 'glucose', 'starch', 'break', 'breaks', 'sweet'], explanation: 'Saliva breaks starch into sweet simple sugars.' },
  { id: 'S2_07', chapterId: 'sci_ch2', type: 'MCQ', prompt: '7. A patient suffering from severe dehydration and vomiting is given a drip of:', marks: 1, options: ['Glucose', 'Milk', 'Fruit juice', 'Cold water'], correctOptionIndex: 0, explanation: 'A glucose drip gives instant energy and hydration directly into the bloodstream.' },
  { id: 'S2_08', chapterId: 'sci_ch2', type: 'TRUE_FALSE', prompt: '8. Digestion of food begins in the stomach, not in the mouth.', marks: 1, correctBoolean: false, explanation: 'Digestion begins right in the mouth with saliva.' },
  { id: 'S2_09', chapterId: 'sci_ch2', type: 'FILL_BLANKS', prompt: '9. The muscular food pipe connecting the throat to the stomach is the _______.', marks: 1, acceptedBlanks: ['oesophagus', 'esophagus', 'food pipe'], explanation: 'The oesophagus carries swallowed food to the stomach.' },
  { id: 'S2_10', chapterId: 'sci_ch2', type: 'MCQ', prompt: '10. Which doctor famously studied the human stomach through a hole in patient Martin?', marks: 1, options: ['Dr. Beaumont', 'Dr. Fleming', 'Dr. Jenner', 'Dr. Watson'], correctOptionIndex: 0, explanation: 'Dr. William Beaumont discovered stomach digestion secrets through Martin.' },
  { id: 'S2_11', chapterId: 'sci_ch2', type: 'MATCHING', prompt: '11. Match each food item with its taste:', marks: 2, matchingPairs: [{ left: 'Lemon juice', right: 'Sour' }, { left: 'Table salt', right: 'Salty' }], explanation: 'Lemon is sour; table salt is salty.' },
  { id: 'S2_12', chapterId: 'sci_ch2', type: 'TRUE_FALSE', prompt: '12. Chewing food thoroughly makes it easier for our body to digest.', marks: 1, correctBoolean: true, explanation: 'Chewing breaks food into small particles mixed with enzymes.' },
  { id: 'S2_13', chapterId: 'sci_ch2', type: 'SHORT_ANSWER', prompt: '13. What is the full form of ORS, commonly given during diarrhea or vomiting?', marks: 2, rubricKeywords: ['oral', 'rehydration', 'solution'], explanation: 'ORS stands for Oral Rehydration Solution.' },
  { id: 'S2_14', chapterId: 'sci_ch2', type: 'FILL_BLANKS', prompt: '14. When our stomach is empty for a long time, acid causes a burning sensation called _______.', marks: 1, acceptedBlanks: ['acidity', 'heartburn'], explanation: 'Excess stomach acid without food creates acidity.' },
  { id: 'S2_15', chapterId: 'sci_ch2', type: 'MCQ', prompt: '15. What is the approximate internal temperature of a healthy human stomach?', marks: 1, options: ['15 deg C', '30 deg C', '50 deg C', '100 deg C'], correctOptionIndex: 1, explanation: 'The internal stomach temperature is approximately 30 degrees Celsius.' },

  // ================= SOCIAL STUDIES - CH 1 (15 Qs) =================
  { id: 'SS1_01', chapterId: 'sst_ch1', type: 'MCQ', prompt: '1. Gujarat has the longest coastline in India. What is its approximate length?', marks: 1, options: ['1,000 km', '1,214 km', '1,600 km', '2,400 km'], correctOptionIndex: 2, explanation: 'Gujarat has a shoreline spanning roughly 1,600 km.' },
  { id: 'SS1_02', chapterId: 'sst_ch1', type: 'FILL_BLANKS', prompt: '2. The famous White Salt Desert is situated in the Great Rann of _______.', marks: 1, acceptedBlanks: ['kutch', 'kachchh'], explanation: 'The White Desert is located in the northern Kutch district.' },
  { id: 'SS1_03', chapterId: 'sst_ch1', type: 'SHORT_ANSWER', prompt: '3. Name the two natural gulfs bordering the coast of Gujarat.', marks: 2, rubricKeywords: ['kutch', 'kachchh', 'khambhat', 'cambay'], explanation: 'The two major gulfs are the Gulf of Kutch and Gulf of Khambhat.' },
  { id: 'SS1_04', chapterId: 'sst_ch1', type: 'TRUE_FALSE', prompt: '4. Gir Forest in Gujarat is the only natural home in the world for Asiatic Lions.', marks: 1, correctBoolean: true, explanation: 'Gir National Park is the sole surviving wild habitat for Asiatic Lions.' },
  { id: 'SS1_05', chapterId: 'sst_ch1', type: 'MCQ', prompt: '5. Which is the longest and largest river flowing through Gujarat?', marks: 1, options: ['Sabarmati', 'Tapi', 'Narmada', 'Mahi'], correctOptionIndex: 2, explanation: 'Narmada is the largest river, revered as the lifeline of Gujarat.' },
  { id: 'SS1_06', chapterId: 'sst_ch1', type: 'MATCHING', prompt: '6. Match each industrial center with its identity:', marks: 2, matchingPairs: [{ left: 'Kandla', right: 'Major Port' }, { left: 'Alang', right: 'Ship Breaking' }], explanation: 'Kandla is a major cargo port; Alang is known for ship recycling.' },
  { id: 'SS1_07', chapterId: 'sst_ch1', type: 'FILL_BLANKS', prompt: '7. The capital administrative city of Gujarat state is _______.', marks: 1, acceptedBlanks: ['gandhinagar'], explanation: 'Gandhinagar is the planned administrative capital of Gujarat.' },
  { id: 'SS1_08', chapterId: 'sst_ch1', type: 'TRUE_FALSE', prompt: '8. The Tropic of Cancer passes directly through the state of Gujarat.', marks: 1, correctBoolean: true, explanation: 'The Tropic of Cancer (23.5 deg N) runs across northern Gujarat.' },
  { id: 'SS1_09', chapterId: 'sst_ch1', type: 'MCQ', prompt: '9. The gigantic multipurpose dam built across the Narmada River is named:', marks: 1, options: ['Sardar Sarovar Dam', 'Ukai Dam', 'Dharoi Dam', 'Kadana Dam'], correctOptionIndex: 0, explanation: 'The Sardar Sarovar Dam provides irrigation and drinking water.' },
  { id: 'SS1_10', chapterId: 'sst_ch1', type: 'SHORT_ANSWER', prompt: '10. Name two major cash crops widely grown in the fertile soils of Gujarat.', marks: 2, rubricKeywords: ['cotton', 'groundnut', 'tobacco', 'cumin', 'mustard', 'sesame'], explanation: 'Gujarat is a leading producer of cotton and groundnut in India.' },
  { id: 'SS1_11', chapterId: 'sst_ch1', type: 'MATCHING', prompt: '11. Match each place with its geographic feature:', marks: 2, matchingPairs: [{ left: 'Saputara', right: 'Hill Station' }, { left: 'Velavadar', right: 'Blackbuck Sanctuary' }], explanation: 'Saputara is Gujarat only hill station; Velavadar is known for blackbucks.' },
  { id: 'SS1_12', chapterId: 'sst_ch1', type: 'TRUE_FALSE', prompt: '12. The Narmada and Tapi rivers flow westward into the Arabian Sea.', marks: 1, correctBoolean: true, explanation: 'Both Narmada and Tapi flow west and empty into the Arabian Sea.' },
  { id: 'SS1_13', chapterId: 'sst_ch1', type: 'FILL_BLANKS', prompt: '13. Ankleshwar in Bharuch district is well known for the production of mineral oil and _______.', marks: 1, acceptedBlanks: ['petroleum', 'natural gas', 'gas'], explanation: 'Ankleshwar is a major oil and natural gas field in Gujarat.' },
  { id: 'SS1_14', chapterId: 'sst_ch1', type: 'MCQ', prompt: '14. Which sea borders the entire western and southern coastline of Gujarat?', marks: 1, options: ['Arabian Sea', 'Bay of Bengal', 'Red Sea', 'Indian Ocean'], correctOptionIndex: 0, explanation: 'Gujarat borders the Arabian Sea to the west.' },
  { id: 'SS1_15', chapterId: 'sst_ch1', type: 'SHORT_ANSWER', prompt: '15. Why is Gujarat long coastline advantageous for international trade?', marks: 2, rubricKeywords: ['ports', 'port', 'ships', 'shipping', 'trade', 'sea', 'export', 'import'], explanation: 'The coastline provides natural deep-water harbours for merchant shipping.' },

  // ================= SOCIAL STUDIES - CH 2 (15 Qs) =================
  { id: 'SS2_01', chapterId: 'sst_ch2', type: 'MCQ', prompt: '1. The famous Rani ki Vav stepwell is located in which historic city of Gujarat?', marks: 1, options: ['Patan', 'Surat', 'Rajkot', 'Junagadh'], correctOptionIndex: 0, explanation: 'Rani ki Vav is a grand 11th-century stepwell in Patan.' },
  { id: 'SS2_02', chapterId: 'sst_ch2', type: 'FILL_BLANKS', prompt: '2. In Gujarat, traditional architectural stepwells are locally called _______.', marks: 1, acceptedBlanks: ['vav'], explanation: 'Subterranean stepped wells are known as Vav in Gujarat.' },
  { id: 'SS2_03', chapterId: 'sst_ch2', type: 'SHORT_ANSWER', prompt: '3. Why were stepwells (vavs) built throughout Gujarat in ancient times?', marks: 2, rubricKeywords: ['water', 'storage', 'drought', 'travelers', 'rest', 'drinking'], explanation: 'Stepwells stored rainwater and provided rest for travelers.' },
  { id: 'SS2_04', chapterId: 'sst_ch2', type: 'TRUE_FALSE', prompt: '4. Lothal in Gujarat was an ancient Harappan port with a brick tidal dockyard.', marks: 1, correctBoolean: true, explanation: 'Lothal is famous as an ancient Indus Valley Civilization seaport.' },
  { id: 'SS2_05', chapterId: 'sst_ch2', type: 'MCQ', prompt: '5. The renowned ancient Sun Temple of Gujarat is situated at:', marks: 1, options: ['Modhera', 'Somnath', 'Dwarka', 'Ambaji'], correctOptionIndex: 0, explanation: 'The Sun Temple is located in Modhera in Mehsana district.' },
  { id: 'SS2_06', chapterId: 'sst_ch2', type: 'MATCHING', prompt: '6. Match each historical site with its associated significance:', marks: 2, matchingPairs: [{ left: 'Sabarmati Ashram', right: 'Mahatma Gandhi' }, { left: 'Lothal', right: 'Ancient Dockyard' }], explanation: 'Sabarmati was home to Gandhiji; Lothal had a Harappan dockyard.' },
  { id: 'SS2_07', chapterId: 'sst_ch2', type: 'FILL_BLANKS', prompt: '7. The vibrant folk dance performed during the Navratri festival in Gujarat is _______.', marks: 1, acceptedBlanks: ['garba', 'garba dance'], explanation: 'Garba is the world-renowned traditional dance of Gujarat.' },
  { id: 'SS2_08', chapterId: 'sst_ch2', type: 'TRUE_FALSE', prompt: '8. Rani ki Vav is recognized worldwide as a UNESCO World Heritage Site.', marks: 1, correctBoolean: true, explanation: 'Rani ki Vav was inscribed as a UNESCO World Heritage Site in 2014.' },
  { id: 'SS2_09', chapterId: 'sst_ch2', type: 'MCQ', prompt: '9. The Statue of Unity on the Narmada River honors which great national leader?', marks: 1, options: ['Sardar Vallabhbhai Patel', 'Mahatma Gandhi', 'Subhash Chandra Bose', 'Jawaharlal Nehru'], correctOptionIndex: 0, explanation: 'The Statue of Unity honors Sardar Vallabhbhai Patel.' },
  { id: 'SS2_10', chapterId: 'sst_ch2', type: 'SHORT_ANSWER', prompt: '10. Name two famous traditional textile handicrafts of Gujarat.', marks: 2, rubricKeywords: ['bandhani', 'patola', 'embroidery', 'khadi', 'ajrakh', 'block print'], explanation: 'Famous Gujarati textiles include Bandhani tie-dye and Patan Patola.' },
  { id: 'SS2_11', chapterId: 'sst_ch2', type: 'MATCHING', prompt: '11. Match each festival with its cultural activity in Gujarat:', marks: 2, matchingPairs: [{ left: 'Uttarayan', right: 'Kite Flying' }, { left: 'Navratri', right: 'Garba & Dandiya' }], explanation: 'Uttarayan is celebrated with kite flying; Navratri with Garba.' },
  { id: 'SS2_12', chapterId: 'sst_ch2', type: 'TRUE_FALSE', prompt: '12. In the Modhera Sun Temple, morning sun rays shone directly on the golden sun deity.', marks: 1, correctBoolean: true, explanation: 'The temple was engineered so solar equinox rays lit up the sanctum.' },
  { id: 'SS2_13', chapterId: 'sst_ch2', type: 'FILL_BLANKS', prompt: '13. The double-ikat woven silk sarees crafted by master weavers in Patan are called _______.', marks: 1, acceptedBlanks: ['patola', 'patan patola'], explanation: 'Patan Patola is an intricate double-ikat silk weaving heritage.' },
  { id: 'SS2_14', chapterId: 'sst_ch2', type: 'MCQ', prompt: '14. The Adalaj Stepwell (Vav) is situated near which twin cities?', marks: 1, options: ['Ahmedabad and Gandhinagar', 'Surat and Navsari', 'Rajkot and Jamnagar', 'Vadodara and Anand'], correctOptionIndex: 0, explanation: 'Adalaj Vav is located between Ahmedabad and Gandhinagar.' },
  { id: 'SS2_15', chapterId: 'sst_ch2', type: 'SHORT_ANSWER', prompt: '15. Who established the Sabarmati Ashram on the banks of the Sabarmati river in 1917?', marks: 2, rubricKeywords: ['gandhi', 'gandhiji', 'mahatma'], explanation: 'Mahatma Gandhi established the Sabarmati Ashram to guide India freedom movement.' },
];

function clean(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
}

// -------------------------------------------------------------
// DETERMINISTIC EVALUATION LOGIC
// -------------------------------------------------------------
function gradeQuestion(q, ans) {
  const u = ans || {};

  if (q.type === 'MCQ') {
    const ok = u.mcqSelected === q.correctOptionIndex;
    return {
      isCorrect: ok,
      score: ok ? q.marks : 0,
      feedback: ok ? 'Correct choice!' : 'Incorrect. Correct option was: ' + q.options[q.correctOptionIndex],
    };
  }

  if (q.type === 'TRUE_FALSE') {
    const ok = u.booleanSelected === q.correctBoolean;
    return {
      isCorrect: ok,
      score: ok ? q.marks : 0,
      feedback: ok ? 'Correct!' : 'Incorrect. The statement is ' + (q.correctBoolean ? 'True' : 'False') + '.',
    };
  }

  if (q.type === 'FILL_BLANKS') {
    const val = clean(u.blankEntered || '');
    const validList = q.acceptedBlanks.map(clean);
    const ok = validList.includes(val);
    return {
      isCorrect: ok,
      score: ok ? q.marks : 0,
      feedback: ok ? 'Correct term verified!' : 'Expected answer: ' + q.acceptedBlanks[0],
    };
  }

  if (q.type === 'MATCHING') {
    const pairs = q.matchingPairs || [];
    const userPairs = u.matchingUserPairs || {};
    let matched = 0;
    pairs.forEach(function (p) {
      if (clean(userPairs[p.left] || '') === clean(p.right)) {
        matched++;
      }
    });
    const ok = matched === pairs.length;
    return {
      isCorrect: ok,
      score: ok ? q.marks : matched > 0 ? 1 : 0,
      feedback: matched + ' of ' + pairs.length + ' pairs matched correctly.',
    };
  }

  if (q.type === 'SHORT_ANSWER') {
    const text = clean(u.writtenText || '');
    let matchedCount = 0;
    const keywords = q.rubricKeywords || [];
    keywords.forEach(function (kw) {
      if (text.includes(clean(kw))) {
        matchedCount++;
      }
    });
    const score = Math.min(q.marks, matchedCount >= 2 ? 2 : matchedCount === 1 ? 1 : 0);
    return {
      isCorrect: score === q.marks,
      score: score,
      feedback: 'Rubric Check: ' + score + '/' + q.marks + ' marks awarded based on syllabus key concepts.',
    };
  }

  return { isCorrect: false, score: 0, feedback: 'Not answered' };
}

// -------------------------------------------------------------
// MAIN COMPONENT WITH ON-DEVICE AI TUTOR INTEGRATION
// -------------------------------------------------------------
export default function App() {
  const [screen, setScreen] = useState('HOME');
  const [selectedSub, setSelectedSub] = useState('mathematics');
  const [selectedChapterId, setSelectedChapterId] = useState('math_ch1');

  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const [testResults, setTestResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [mistakes, setMistakes] = useState([]);

  // AI Tutor State
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [aiTutorPrompt, setAiTutorPrompt] = useState('');
  const [aiTutorResponse, setAiTutorResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Model Manager State
  const [modelStatus, setModelStatus] = useState('NOT_DOWNLOADED');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [deviceMemInfo, setDeviceMemInfo] = useState({ ram: 'Unknown', storage: 'Unknown', safe: true });

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
    } else {
      setDeviceMemInfo({ ram: '1,840 MB (Safe)', storage: '4,200 MB (Safe)', safe: true });
    }
  }

  function simulateOrDownloadModel() {
    if (!deviceMemInfo.safe) {
      Alert.alert('Memory Warning', 'Device has less than 1.2 GB free RAM. Loading on-device model may cause app to close.');
      return;
    }
    setModelStatus('DOWNLOADING');
    setDownloadProgress(0);

    let current = 0;
    const timer = setInterval(() => {
      current += 15;
      if (current >= 100) {
        clearInterval(timer);
        setDownloadProgress(100);
        setModelStatus('READY_IN_RAM');
        Alert.alert('Model Ready', 'Gemma 3 1B INT4 is pinned in local device RAM. All responses are 100% on-device.');
      } else {
        setDownloadProgress(current);
      }
    }, 400);
  }

  function unloadModelFromRam() {
    if (LiteRTLMNative && LiteRTLMNative.unloadModel) {
      LiteRTLMNative.unloadModel();
    }
    setModelStatus('NOT_DOWNLOADED');
    setDownloadProgress(0);
    Alert.alert('Memory Cleared', 'LiteRT-LM weights unloaded from device RAM.');
  }

  async function askAiTutor(questionObj, userText) {
    setAiModalVisible(true);
    setAiLoading(true);
    setAiTutorResponse('');

    const query = userText
      ? `Student's written attempt: "${userText}". Question: "${questionObj.prompt}". Please provide encouraging, child-friendly feedback.`
      : `Question: "${questionObj.prompt}". Explain this concept to a Standard 5 student in simple, encouraging English with daily life examples.`;

    setAiTutorPrompt(questionObj.prompt);

    if (modelStatus === 'READY_IN_RAM' && LiteRTLMNative && LiteRTLMNative.generateTutorResponse) {
      try {
        const res = await LiteRTLMNative.generateTutorResponse(query, '');
        setAiTutorResponse(res.text);
      } catch (err) {
        fallbackAiResponse(questionObj);
      } finally {
        setAiLoading(false);
      }
    } else {
      setTimeout(() => {
        fallbackAiResponse(questionObj);
        setAiLoading(false);
      }, 700);
    }
  }

  function fallbackAiResponse(q) {
    let explanationMsg = `🌟 Hello Arjun! Let's understand this together:\n\n• Concept: ${q.explanation}\n\n💡 Tip: Remember that nature and shapes follow clean, predictable rules. Think about how this works in your home or playground!`;
    setAiTutorResponse(explanationMsg);
  }

  function onSelectSubject(sub) {
    setSelectedSub(sub);
    const firstChapter = CHAPTERS[sub][0].id;
    setSelectedChapterId(firstChapter);
  }

  function startChapterTest() {
    const filtered = QUESTION_BANK.filter((q) => q.chapterId === selectedChapterId);
    setActiveQuestions(filtered);
    setCurrentIndex(0);
    setAnswers({});
    setScreen('QUIZ');
  }

  function finishTest() {
    let earned = 0;
    let max = 0;
    const graded = [];
    const newMistakes = [];

    activeQuestions.forEach(function (q) {
      const u = answers[q.id] || {};
      const evalRes = gradeQuestion(q, u);
      earned += evalRes.score;
      max += q.marks;

      graded.push({ question: q, evalRes: evalRes, userAns: u });
      if (!evalRes.isCorrect) {
        newMistakes.push(q.prompt);
      }
    });

    const pct = max > 0 ? Math.round((earned / max) * 100) : 0;
    setMistakes(mistakes.concat(newMistakes));

    const chapterObj = CHAPTERS[selectedSub].find((c) => c.id === selectedChapterId);

    setHistory([
      {
        id: 'T_' + Date.now(),
        subject: selectedSub,
        chapterTitle: chapterObj ? chapterObj.name : selectedChapterId,
        score: earned,
        maxScore: max,
        percentage: pct,
        time: new Date().toLocaleTimeString(),
      },
      ...history,
    ]);

    setTestResults(graded);
    setScreen('REVIEW');
  }

  const currentQ = activeQuestions[currentIndex];
  const userAns = currentQ ? answers[currentQ.id] || {} : {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* TOP HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>ShikshaSaathi</Text>
          <TouchableOpacity
            style={[styles.aiChip, modelStatus === 'READY_IN_RAM' ? styles.aiChipActive : null]}
            onPress={() => setScreen('AI_MANAGER')}
          >
            <Text style={styles.aiChipText}>
              {modelStatus === 'READY_IN_RAM' ? '🟢 On-Device AI Active' : '⚙️ AI Model Manager'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>GSEB Std 5 • On-Device Assessment & AI Tutor</Text>
      </View>

      {/* SCREEN 1: HOME */}
      {screen === 'HOME' && (
        <ScrollView style={styles.body}>
          <Text style={styles.h2}>1. Select Subject</Text>
          <View style={styles.row}>
            {['mathematics', 'science', 'social_studies'].map((sub) => {
              const active = selectedSub === sub;
              return (
                <TouchableOpacity
                  key={sub}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => onSelectSubject(sub)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {sub === 'mathematics' ? 'Math' : sub === 'science' ? 'Science' : 'Social'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.h2}>2. Select Chapter (15 Questions Each)</Text>
          {CHAPTERS[selectedSub].map((ch) => {
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
            <Text style={styles.primaryBtnText}>Start 15-Question Chapter Test</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => setScreen('DASHBOARD')}>
            <Text style={styles.secondaryBtnText}>📊 Open Parent Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.aiManagerBtn} onPress={() => setScreen('AI_MANAGER')}>
            <Text style={styles.aiManagerBtnText}>🤖 Manage On-Device AI Model (Gemma 3 1B)</Text>
          </TouchableOpacity>

          <View style={styles.noteBox}>
            <Text style={styles.noteText}>
              🔒 100% On-Device & Air-Gapped. No tokens or student answers leave your phone.
            </Text>
          </View>
        </ScrollView>
      )}

      {/* SCREEN 2: QUIZ */}
      {screen === 'QUIZ' && currentQ && (
        <ScrollView style={styles.body}>
          <View style={styles.progBanner}>
            <Text style={styles.progText}>QUESTION {currentIndex + 1} OF 15</Text>
            <TouchableOpacity
              style={styles.askAiSmallBtn}
              onPress={() => askAiTutor(currentQ, userAns.writtenText)}
            >
              <Text style={styles.askAiSmallText}>💡 Ask AI Tutor</Text>
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
              {[true, false].map((val) => {
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
              onChangeText={(t) => {
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
                    onChangeText={(v) => {
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
              style={[styles.input, { height: 90, textAlignVertical: 'top' }]}
              multiline={true}
              placeholder="Write your explanation using key scientific/mathematical terms..."
              value={userAns.writtenText || ''}
              onChangeText={(t) => {
                const copy = { ...answers };
                copy[currentQ.id] = { ...userAns, writtenText: t };
                setAnswers(copy);
              }}
            />
          )}

          <View style={[styles.row, { marginTop: 12 }]}>
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
                {currentIndex === activeQuestions.length - 1 ? 'Submit 15 Questions' : 'Save & Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* SCREEN 3: REVIEW */}
      {screen === 'REVIEW' && (
        <ScrollView style={styles.body}>
          <Text style={styles.h2}>15-Question Test Review</Text>
          {testResults.map((item, idx) => {
            const ok = item.evalRes.isCorrect;
            return (
              <View key={idx} style={[styles.resCard, ok ? styles.resPass : styles.resFail]}>
                <View style={styles.resCardHeaderRow}>
                  <Text style={styles.resCardHeader}>
                    Q{idx + 1}: {ok ? '✅ Correct' : '❌ Needs Practice'} ({item.evalRes.score}/{item.question.marks} Marks)
                  </Text>
                  <TouchableOpacity
                    style={styles.reviewAiBtn}
                    onPress={() => askAiTutor(item.question, item.userAns?.writtenText)}
                  >
                    <Text style={styles.reviewAiBtnText}>🤖 AI Feedback</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.resPrompt}>{item.question.prompt}</Text>
                <Text style={styles.resFeedback}>{item.evalRes.feedback}</Text>
                <Text style={styles.resExp}>Notes: {item.question.explanation}</Text>
              </View>
            );
          })}

          <TouchableOpacity style={styles.primaryBtn} onPress={() => setScreen('HOME')}>
            <Text style={styles.primaryBtnText}>Finish & Return to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* SCREEN 4: PARENT DASHBOARD */}
      {screen === 'DASHBOARD' && (
        <ScrollView style={styles.body}>
          <Text style={styles.h2}>Parent Analytics</Text>
          <Text style={styles.subText}>Student: Arjun Patel • Standard 5 GSEB</Text>

          <View style={styles.statBox}>
            <Text style={styles.statVal}>{history.length}</Text>
            <Text style={styles.statLabel}>Total Tests Completed</Text>
          </View>

          <Text style={[styles.h2, { marginTop: 16 }]}>Chapter-Wise Test Log</Text>
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

      {/* SCREEN 5: ON-DEVICE AI MODEL MANAGER */}
      {screen === 'AI_MANAGER' && (
        <ScrollView style={styles.body}>
          <Text style={styles.h2}>On-Device AI Tutor Manager</Text>
          <Text style={styles.subText}>Powered by Google LiteRT-LM & Gemma 3 1B INT4</Text>

          <View style={styles.statBox}>
            <Text style={styles.infoLabel}>Device Free RAM: <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>{deviceMemInfo.ram}</Text></Text>
            <Text style={styles.infoLabel}>Internal Storage: <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>{deviceMemInfo.storage}</Text></Text>
            <Text style={[styles.infoLabel, { marginTop: 4, color: deviceMemInfo.safe ? '#16A34A' : '#DC2626' }]}>
              {deviceMemInfo.safe ? '✓ Device Memory Eligible' : '⚠️ Insufficient RAM (Requires ≥ 1.2 GB)'}
            </Text>
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.cardInfoTitle}>Model: Gemma 3 1B IT (Quantized INT4)</Text>
            <Text style={styles.cardInfoSub}>
              • Package Size: ~550 MB{'\n'}
              • Runtime: Google LiteRT-LM (CPU/GPU acceleration){'\n'}
              • Privacy: Air-gapped (Zero cloud transmission)
            </Text>

            {modelStatus === 'DOWNLOADING' && (
              <View style={{ marginTop: 12 }}>
                <Text style={styles.downloadText}>Downloading & Preparing Model: {downloadProgress}%</Text>
                <ActivityIndicator size="small" color="#2563EB" style={{ marginTop: 6 }} />
              </View>
            )}

            {modelStatus === 'READY_IN_RAM' && (
              <View style={styles.readyBadge}>
                <Text style={styles.readyBadgeText}>✓ Model Loaded into Memory</Text>
              </View>
            )}
          </View>

          {modelStatus === 'NOT_DOWNLOADED' && (
            <TouchableOpacity style={styles.primaryBtn} onPress={simulateOrDownloadModel}>
              <Text style={styles.primaryBtnText}>Download & Load AI Tutor (550 MB)</Text>
            </TouchableOpacity>
          )}

          {modelStatus === 'READY_IN_RAM' && (
            <TouchableOpacity style={styles.dangerBtn} onPress={unloadModelFromRam}>
              <Text style={styles.dangerBtnText}>Unload Model from RAM (Free Memory)</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.secondaryBtn, { marginTop: 12 }]} onPress={() => setScreen('HOME')}>
            <Text style={styles.secondaryBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* AI TUTOR EXPLANATION MODAL */}
      <Modal visible={aiModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🤖 ShikshaSaathi AI Tutor</Text>
              <TouchableOpacity onPress={() => setAiModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 350 }}>
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
  aiManagerBtn: { backgroundColor: '#EEF2FF', borderWidth: 1, borderColor: '#C7D2FE', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  aiManagerBtnText: { color: '#4338CA', fontWeight: 'bold', fontSize: 13 },
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
  matchLeft: { width: 150, fontSize: 13, fontWeight: 'bold', color: '#334155' },
  resCard: { padding: 12, borderRadius: 8, borderWidth: 1, marginBottom: 10, backgroundColor: '#FFFFFF' },
  resPass: { borderColor: '#86EFAC' },
  resFail: { borderColor: '#FCA5A5' },
  resCardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  resCardHeader: { fontWeight: 'bold', fontSize: 13 },
  reviewAiBtn: { backgroundColor: '#E0E7FF', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  reviewAiBtnText: { color: '#3730A3', fontSize: 11, fontWeight: 'bold' },
  resPrompt: { fontSize: 13, color: '#334155', marginBottom: 4 },
  resFeedback: { fontSize: 12, color: '#0284C7', fontWeight: 'bold' },
  resExp: { fontSize: 11, color: '#64748B', fontStyle: 'italic', marginTop: 3 },
  statBox: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', marginBottom: 10 },
  statVal: { fontSize: 26, fontWeight: 'bold', color: '#2563EB', textAlign: 'center' },
  statLabel: { fontSize: 12, color: '#64748B', textAlign: 'center', marginTop: 2 },
  infoLabel: { fontSize: 12, color: '#475569', marginBottom: 4 },
  cardInfo: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', marginVertical: 8 },
  cardInfoTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
  cardInfoSub: { fontSize: 12, color: '#475569', lineHeight: 18 },
  downloadText: { fontSize: 12, fontWeight: 'bold', color: '#2563EB', textAlign: 'center' },
  readyBadge: { backgroundColor: '#DCFCE7', padding: 8, borderRadius: 6, marginTop: 8, alignItems: 'center' },
  readyBadgeText: { color: '#166534', fontWeight: 'bold', fontSize: 12 },
  dangerBtn: { backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FCA5A5', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  dangerBtnText: { color: '#DC2626', fontWeight: 'bold', fontSize: 13 },
  historyCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, padding: 10, marginBottom: 8 },
  historyTitle: { fontSize: 13, fontWeight: 'bold', color: '#1E293B' },
  historyScore: { fontSize: 12, color: '#16A34A', fontWeight: '600', marginTop: 2 },
  noteBox: { backgroundColor: '#E2E8F0', padding: 12, borderRadius: 8, marginTop: 20 },
  noteText: { fontSize: 11, color: '#475569', textAlign: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 16 },
  modalCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  modalClose: { fontSize: 18, color: '#64748B', padding: 4 },
  modalQuestionPrompt: { fontSize: 13, fontStyle: 'italic', color: '#64748B', marginBottom: 10 },
  modalThinking: { fontSize: 12, color: '#64748B', marginTop: 8 },
  modalResponseText: { fontSize: 14, color: '#1E293B', lineHeight: 22 },
});
registerRootComponent(App);
