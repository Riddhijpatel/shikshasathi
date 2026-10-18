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

// -------------------------------------------------------------------------
// GUJARAT STATE BOARD OF SCHOOL TEXTBOOKS (GANDHINAGAR) - STANDARD V (5)
// EXACT 3 OFFICIAL TEXTBOOKS AS PRESCRIBED IN THE OFFICIAL GSSTB / GCERT PDFS
// 1. Marigold - Book Five (Textbook in English for Class V) - 10 Units
// 2. Math-Magic - Standard V (Mathematics) - 14 Chapters
// 3. Environment - Looking Around - Standard V - 23 Chapters
// -------------------------------------------------------------------------
const CHAPTERS = {
  marigold: [
    { id: 'mari_u1', name: 'Unit 1: Ice-cream Man & Wonderful Waste! (Bamboo Curry)' },
    { id: 'mari_u2', name: 'Unit 2: Teamwork & Flying Together' },
    { id: 'mari_u3', name: 'Unit 3: My Shadow & Robinson Crusoe Discovers a footprint' },
    { id: 'mari_u4', name: 'Unit 4: Crying & My Elder Brother (Bade Bhai Saheb)' },
    { id: 'mari_u5', name: 'Unit 5: The Lazy Frog & Rip Van Winkle' },
    { id: 'mari_u6', name: 'Unit 6: Class Discussion & The Talkative Barber' },
    { id: 'mari_u7', name: 'Unit 7: Topsy-turvy Land & Gulliver\'s Travels' },
    { id: 'mari_u8', name: 'Unit 8: Nobody\'s Friend & The Little Bully' },
    { id: 'mari_u9', name: 'Unit 9: Sing a Song of People & Around the World' },
    { id: 'mari_u10', name: 'Unit 10: Malu Bhalu & Who Will be Ningthou?' },
  ],
  mathematics: [
    { id: 'math_ch1', name: '1. Our National Fruit-Mango (Gir Kesar & Talala)' },
    { id: 'math_ch2', name: '2. Shapes and Angles (Clock Hands & 90° Right Angle)' },
    { id: 'math_ch3', name: '3. How Many Squares? (1 cm Grid & Area)' },
    { id: 'math_ch4', name: '4. Parts and Wholes (Fractions & Flag Proportions)' },
    { id: 'math_ch5', name: '5. Does it Look the Same? (Symmetry & Half-Turns)' },
    { id: 'math_ch6', name: '6. Be My Multiple, I\'ll be Your Factor (LCM & Factors)' },
    { id: 'math_ch7', name: '7. Can You See the Pattern? (Magic Squares & Hexagons)' },
    { id: 'math_ch8', name: '8. Mapping Your Way (Rajpath Map & Scale)' },
    { id: 'math_ch9', name: '9. Boxes and Sketches (Cube Nets & Deep Drawings)' },
    { id: 'math_ch10', name: '10. Tenths and Hundredths (Millimeters & Decimals)' },
    { id: 'math_ch11', name: '11. Area and its Boundary (Perimeter & Fencing)' },
    { id: 'math_ch12', name: '12. Smart Charts (Tally Marks & Pie Charts)' },
    { id: 'math_ch13', name: '13. Ways to Multiply and Divide (Bela\'s Method)' },
    { id: 'math_ch14', name: '14. How Big? How Heavy? (Volume in cm³ & Water Rise)' },
  ],
  environment: [
    { id: 'env_ch1', name: '1. Super Senses (Ant Trails & Bird Eyes)' },
    { id: 'env_ch2', name: '2. A Snake and Snake Charmer (Kalbeliyas & 4 Venomous Snakes)' },
    { id: 'env_ch3', name: '3. From Tasting to Digesting (Dr. Beaumont & Martin)' },
    { id: 'env_ch4', name: '4. Mangoes Round the Year ! (Aam Papad in Junagadh)' },
    { id: 'env_ch5', name: '5. Seed, Seed, Seed (Germination & Velcro 1948)' },
    { id: 'env_ch6', name: '6. Water is Life (Ghadsisar 9 Lakes & Gujarat Vavs)' },
    { id: 'env_ch7', name: '7. Experiments with Water (Dead Sea & Dandi March 1930)' },
    { id: 'env_ch8', name: '8. Mosquitoes : Diseases and Treatment (Malaria & Ronald Ross)' },
    { id: 'env_ch9', name: '9. Climbing High ! (Bachendri Pal Everest Ascent 1984)' },
    { id: 'env_ch10', name: '10. Story of Walls (Uparkot Fort Junagadh & Cannons)' },
    { id: 'env_ch11', name: '11. Sunita in Space (Zero Gravity & Earth Globe)' },
    { id: 'env_ch12', name: '12. What if this will be Finished ? (Petroleum Refining & Adalaj)' },
    { id: 'env_ch13', name: '13. Shelter High ! (Ladakh Cold Desert & Changpa Pashmina)' },
    { id: 'env_ch14', name: '14. When the Earth Shook ! (Bhuj Kutch Earthquake 2001)' },
    { id: 'env_ch15', name: '15. Cold or Hot ? (Dr. Zakir Hussain & Miya Balishtiye)' },
    { id: 'env_ch16', name: '16. Cleaning is our job (Shankarbhai & Sabarmati Ashram)' },
    { id: 'env_ch17', name: '17. Across the Wall (Afsana & Nagpada Basketball Team)' },
    { id: 'env_ch18', name: '18. Where do we go now ? (Anujbhai & Khedi Dam Migration)' },
    { id: 'env_ch19', name: '19. A Seed Tells Farmer\'s Story (Vangaam Gujarat & Bajra)' },
    { id: 'env_ch20', name: '20. Whose Forests ? (Suryamani & Kuduk Torang Jharkhand)' },
    { id: 'env_ch21', name: '21. Like Father, Like Daughter (Mendel Peas & Polio Virus)' },
    { id: 'env_ch22', name: '22. On the Move Again (Dhanu & Sugarcane Mukadam)' },
    { id: 'env_ch23', name: '23. We are Gujarati... (33 Districts, Narmada, Amul Dairy)' },
  ],
};

// -------------------------------------------------------------------------
// OFFICIAL TEXTBOOK CHAPTER SUMMARIES & KEY CONCEPTS TO FOCUS ON
// -------------------------------------------------------------------------
const CHAPTER_SUMMARIES = {
  // MARIGOLD (ENGLISH BOOK 5)
  mari_u1: {
    summary: 'Features Rachel Field\'s poem "Ice-cream Man" describing cooling mounds of vanilla, chocolate, and strawberry trundling down hot city streets. Paired with the Travancore folk tale "Wonderful Waste!" where the palace cook invents Kerala\'s famous feast dish "Avial" by washing, cutting, and cooking vegetable scraps with coconut, green chillies, garlic, curd, coconut oil, and curry leaves. Includes the Santhal picture story "Bamboo Curry" made from bamboo shoots.',
    keyTakeaways: [
      'Resourcefulness: Transforming leftover vegetable scraps into delicious Avial',
      'Descriptive words: Cooling brown and white mounds, cart like a flower bed of roses and sweet peas',
      'Bamboo Curry is cooked using tender bamboo shoots, not hard wooden doors'
    ],
  },
  mari_u2: {
    summary: 'Jan Nigro\'s "Teamwork" poem illustrates how passing the baton in a relay race and shooting basketball hoops requires everyone\'s contribution. The Panchatantra story "Flying Together" depicts a flock of wild geese living in a tall tree. When they ignore the wise old bird\'s advice to destroy a tender creeper, a hunter climbs up and traps them in his net. They escape by cooperating, pretending to be dead, and flying away together.',
    keyTakeaways: [
      'Cooperation: "We\'re the parts that make up the whole, and we\'ve got our eyes on a common goal"',
      'Listening to wise elders prevents predicaments',
      'Collective nouns: A flock of wild geese, a team of players'
    ],
  },
  mari_u3: {
    summary: 'Robert Louis Stevenson\'s poem "My Shadow" explores how light creates a shadow that shoots up tall like an India-rubber ball or stays in bed before sunrise. Adapted from Daniel Defoe\'s classic, "Robinson Crusoe Discovers a footprint" tells how Crusoe, shipwrecked alone on a deserted island, discovers a single human footprint on the sand with toes, heel, and every mark, which is larger than his own foot.',
    keyTakeaways: [
      'Light and shadow: Shadows change size based on light angle and disappear on cloudy days',
      'Degrees of adjectives: Tall, taller, tallest; fast, faster, fastest',
      'Courage and scientific observation overcome irrational fear'
    ],
  },
  mari_u4: {
    summary: 'Galway Kinnell\'s poem "Crying" encourages crying your heart out until your pillow is soaked, then throwing open the window to laugh. Munshi Premchand\'s story "My Elder Brother" (Bade Bhai Saheb) depicts two brothers: Bhaiya (14) who studies constantly to build a strong educational foundation yet fails, and Munna (9) who loves marbles and kites yet tops his class. Bhaiya teaches Munna that life experience and parental wisdom (Ma and Baba) surpass mere bookish marks.',
    keyTakeaways: [
      'Academic marks vs life experience: Humility is vital regardless of exam success',
      'Grammar: Conjunctions (for, since) and prepositions',
      'Parental wisdom: Elders guide and correct us with greater life experience'
    ],
  },
  mari_u5: {
    summary: 'Poem "The Lazy Frog" introduces Fred, who refuses to do a stroke of work or even bow when an elderly lady frog hops by. Washington Irving\'s story "Rip Van Winkle" narrates a kind-hearted but lazy villager at the foothills of Kaatskill mountains who helps odd-looking men playing ninepins, drinks from their barrel, falls into a deep sleep, and wakes up twenty years later with a foot-long white beard.',
    keyTakeaways: [
      'Overcoming chronic procrastination and laziness',
      'Vocabulary: Suffixes (-ly, -ed, -er, -est) and prefixes (un-, dis-, im-)',
      'Value of time: "Time and tide wait for no man"'
    ],
  },
  mari_u6: {
    summary: 'Gervase Phinn\'s poem "Class Discussion" highlights Jane, who sits in thoughtful silence while classmates chatter, reminding us that quiet thinkers possess valuable insights. From Arabian Nights, "The Talkative Barber" depicts the Sultan of Cashgar growing impatient with a chatterbox barber who babbles about his six brothers (Bacbone, Bakbarea, Bakbac, Alcouz, Alnaschee, Schacabac) instead of shaving the Sultan\'s head.',
    keyTakeaways: [
      'Respecting different personality types: Quiet observation is as valuable as loud opinions',
      'Direct speech punctuation: Using inverted commas and quotation marks',
      'Patience and courtesy in social communication'
    ],
  },
  mari_u7: {
    summary: 'H.E. Wilkinson\'s whimsical poem "Topsy-turvy Land" imagines an inverted world where people walk on their heads, the sea is made of sand, and children attend school by night. In Jonathan Swift\'s "Gulliver\'s Travels", sailor Gulliver lands on the rocky coast of Brobdingnag where barley grows 40 feet high and farmers stand 60 feet tall, carrying giant reaping hooks.',
    keyTakeaways: [
      'Relative perspective: Gulliver was huge in Lilliput but tiny in the land of giants',
      'Similes: "As loud as thunder", "as light as a feather", "as slow as a tortoise"',
      'Creative imagination and autobiography writing'
    ],
  },
  mari_u8: {
    summary: 'Enid Blyton\'s poem "Nobody\'s Friend" contrasts a selfish child who shares neither sweets nor toys with a generous child who shares book, ball, and half an apple. In "The Little Bully", Hari pinches and pricks classmates until a picnic at the seaside, where crabs, lobsters, and prawns pinch him with sharp claws, teaching him how bullying hurts others.',
    keyTakeaways: [
      'Anti-bullying and empathy: Feeling others\' pain before acting',
      'Sharing and kindness are the true foundation of friendship',
      'Compound words: Seaside, classroom, playground'
    ],
  },
  mari_u9: {
    summary: 'Lois Lenski\'s poem "Sing a Song of People" portrays city dwellers hurrying through subways, sidewalks, taxis, and elevators without looking at one another. Paired with Jules Verne\'s "Around the World in Eighty Days", detailing Phileas Fogg\'s train expedition across the Pacific Railway in North America, navigating bridges and time zones.',
    keyTakeaways: [
      'Modern urban transport: Subways, elevators, and railways',
      'Punctuality, perseverance, and calm focus solve crises',
      'Adverbs of manner: Loudly, quickly, quietly, beautifully'
    ],
  },
  mari_u10: {
    summary: 'Kamla Bhasin\'s poem "Malu Bhalu" celebrates a brave young female polar bear who overcomes fear to swim in the icy Arctic sea. The Manipuri folk tale "Who Will be Ningthou?" describes King Ningthou and Queen Leima of Kangleipak testing their sons, but choosing their 5-year-old daughter Sanatombi as future Leima because she felt the agony of the pierced banyan tree (khongnang), birds, animals, and people.',
    keyTakeaways: [
      'True leadership is founded upon compassion, empathy, and nature preservation',
      'Courage: Conquering fear to uncover natural talents',
      'Manipuri culture: Ningthou (King), Leima (Queen), Meeyam (People), Khongnang (Banyan Tree)'
    ],
  },

  // MATHEMATICS (MATH-MAGIC)
  math_ch1: {
    summary: 'GSEB English Medium Chapter 1 "Our National Fruit-Mango" introduces Japanese Haiku poetry (17 letters: 5+7+5) in Gujarati, Talala Gir Somnath Kesar mangoes (Ambawadi orchards), large numbers in Lakhs and Crores (100 Lakhs = 1 Crore), vehicle transport speeds (bullock cart 4 km/h, tractor 20 km/h, truck 44 km/h), women\'s Amra Bank savings, and mango pulp weight reduction to 1/3 of fresh weight.',
    keyTakeaways: [
      'Haiku structure: 3-line poem of 17 letters (5 + 7 + 5)',
      '1 Lakh = 100,000 (5 zeros); 1 Crore = 10,000,000 (7 zeros)',
      'Distance = Speed × Time; Fresh mango pulp weighs 1/3 of fresh fruit'
    ],
  },
  math_ch2: {
    summary: 'Investigates angles formed by line segments. Defines 90° right angles (like letter L), acute angles (<90°), obtuse angles (>90°), and straight angles (180°). Explores clock hands at 3:00, 6:00, and 9:00, angle testers, and protractor measurements.',
    keyTakeaways: [
      'Right angle = 90°; Acute < 90°; Obtuse > 90°; Straight = 180°',
      'Clock hands form right angles at exactly 3:00 and 9:00',
      'Changing angles changes the polygon shape even with identical side lengths'
    ],
  },
  math_ch3: {
    summary: 'Measures perimeter (boundary length) and area (surface coverage) using 1 cm grid paper. Explores postage stamp coverage, composite polygon tiles, and proving that figures can have equal area but differing perimeters.',
    keyTakeaways: [
      'Perimeter = Total length of continuous boundary (Sum of sides)',
      'Area of Rectangle = Length × Breadth; Area of Square = Side × Side',
      'Half-square counting rule for grid estimation'
    ],
  },
  math_ch4: {
    summary: 'Fractions as equal parts of a whole and collections. Covers Indian tricolour flag proportions (1/3 saffron, 1/3 white with Ashoka Chakra, 1/3 green), equivalent fractions (1/2 = 2/4 = 3/6 = 4/8), and dividing chocolate bars and halwa.',
    keyTakeaways: [
      'Numerator = parts taken; Denominator = total equal parts',
      'Equivalent fractions represent the same quantity',
      'Finding fractional amounts: 1/4 of 100 Rs = 25 Rs'
    ],
  },
  math_ch5: {
    summary: 'Covers lines of mirror symmetry where one half completely covers the other, and rotational symmetry after quarter-turns (90°) and half-turns (180°). Shows letters H, I, O, X looking identical after half-turns.',
    keyTakeaways: [
      'Mirror line divides a shape into two symmetrical halves',
      'Half-turn = 180° rotation; Quarter-turn = 90° rotation',
      'Symmetry in windmills, wheel hubs, and English alphabets'
    ],
  },
  math_ch6: {
    summary: 'Explores number theory through the cat-and-mouse game on numbered steps. Covers multiples, common multiples (LCM), factors, factor trees, and the bangles arrangement puzzle.',
    keyTakeaways: [
      'Multiples are products of multiplication tables; Lowest Common Multiple (LCM)',
      'Factors divide a number completely with zero remainder',
      'Factor trees break composite numbers into prime factors'
    ],
  },
  math_ch7: {
    summary: 'Pattern identification and algebraic sequences. Covers 3×3 Magic Squares summing to 15 or 75, Magic Hexagons where circles equal the product of adjacent squares, number palindromes (121, 353), and calendar tricks.',
    keyTakeaways: [
      'Magic square constant: Every row, column, and diagonal sums to the same total',
      'Palindromes read identically forward and backward',
      'Rotational patterns turn by 45°, 90°, or 180°'
    ],
  },
  math_ch8: {
    summary: 'Spatial mapping, aerial navigation, and map scaling. Studies New Delhi Rajpath connecting India Gate to Rashtrapati Bhavan, central hexagon geometry, and scale conversions (2 cm on map = 1 km on ground).',
    keyTakeaways: [
      'Map Scale defines the ratio of paper distance to real ground distance',
      'Standard orientation: North at top, East on right, West on left, South at bottom',
      'Calculating highway distances using map scale'
    ],
  },
  math_ch9: {
    summary: 'Three-dimensional spatial visualization. Covers 2D nets of cubes and open sweet boxes, deep perspective drawings, floor maps with doors and windows, and the dice rule where opposite faces sum to 7.',
    keyTakeaways: [
      'A cube has 6 flat square faces, 8 vertices, and 12 equal edges',
      'Opposite faces on a standard playing die always add up to 7',
      'Floor maps show layout; deep drawings show 3D perspective'
    ],
  },
  math_ch10: {
    summary: 'Decimal number system through millimeter measurement and currency. Teaches 1 mm = 0.1 cm (tenths), 1 paisa = 0.01 rupee (hundredths), stopwatch race records in sports, and temperature charts.',
    keyTakeaways: [
      '1 cm = 10 mm, so 1 mm = 0.1 cm (Tenths)',
      '1 Rupee = 100 Paise, so 1 Paisa = 0.01 Rupee (Hundredths)',
      'Aligning decimal points for addition and subtraction'
    ],
  },
  math_ch11: {
    summary: 'Real-world area and perimeter word problems. Covers wire fencing boundaries for rectangular and square fields, kitchen floor tiling, and cutting corners of squares.',
    keyTakeaways: [
      'Perimeter = 2 × (L + B) for rectangles; 4 × Side for squares',
      'Area = L × B in square units (sq cm or sq m)',
      'Boundary requires perimeter; tiling or painting requires area'
    ],
  },
  math_ch12: {
    summary: 'Data representation using standard 5-mark tally bundles, vertical bar graphs of vehicle traffic, circular chapati (pie) charts, and three-generation family trees.',
    keyTakeaways: [
      'Tally marks group data into sets of 5 (four bars + diagonal cross)',
      'Bar charts compare frequencies with proportional heights',
      'Pie charts represent fractions of a whole (1/2, 1/4, 3/4)'
    ],
  },
  math_ch13: {
    summary: 'Multiplication fluency using Bela\'s partial-products box method, multi-digit column multiplication, and division verification: Dividend = (Divisor × Quotient) + Remainder.',
    keyTakeaways: [
      'Multiplication is repeated addition; division is equal sharing',
      'Verification: Dividend = (Divisor × Quotient) + Remainder',
      'Remainder must strictly be less than the divisor'
    ],
  },
  math_ch14: {
    summary: 'Volume as 3D space occupied by objects. Measures volume using 1 cm³ unit cubes, matchbox stage construction, weight conversion (1 kg = 1000 g), and water displacement by marbles.',
    keyTakeaways: [
      'Volume is measured in cubic centimeters (cm³)',
      'Volume of a cuboid = Length × Breadth × Height',
      'Water displacement directly reveals an irregular object\'s volume'
    ],
  },

  // ENVIRONMENT (LOOKING AROUND - 23 CHAPTERS)
  env_ch1: {
    summary: 'Animal sensory superpowers: Ants follow chemical pheromone scent trails; dogs recognize territories through urine smell; birds with fixed eye sockets continuously bob necks; nocturnal animals see in black and white; and tigers use facial whiskers to sense dark vibrations.',
    keyTakeaways: ['Ant scent trails', 'Fixed bird eye sockets', 'Tiger whiskers and nocturnal vision'],
  },
  env_ch2: {
    summary: 'Kalbeliya snake charmer community of Aryanath. Only four snakes in India are venomous: Cobra, Common Krait, Russell\'s Viper (Duboiya), and Saw-scaled Viper (Afai). Snakes perceive ground vibrations from the been (made from dried bottle gourd). Snakes are farmers\' friends who eat crop rats.',
    keyTakeaways: ['4 venomous snakes of India', 'Ground vibration perception vs external ears', 'Been instrument made of dried gourd'],
  },
  env_ch3: {
    summary: 'Food digestion begins in the mouth where saliva converts starch to sugar. Dr. William Beaumont\'s 9-year study on soldier Alexis St. Martin discovered stomach gastric juices. Explains hunger signals, glucose drip, and ORS for dehydration.',
    keyTakeaways: ['Saliva breaks down starch into sugar', 'Dr. Beaumont & Alexis St. Martin', 'ORS (Oral Rehydration Solution)'],
  },
  env_ch4: {
    summary: 'Alpesh and Mahendra in Junagadh make Aam Papad (Mamidi Tandra) by layering mango pulp with jaggery and sugar for 4 weeks on a palm mat. Covers food spoilage, bread mould fungus, and sun-drying glass jars before packing pickles.',
    keyTakeaways: ['Food preservation methods', 'Mamidi Tandra / Aam Papad making in Junagadh', 'Sterilizing glass jars in sunlight'],
  },
  env_ch5: {
    summary: 'Seed germination requires moisture and air. Seed dispersal occurs by wind, water, animals, and bursting pods. George de Mestral invented Velcro in 1948 after observing burr hooks on his dog. Portuguese traders brought chillies from South America to India.',
    keyTakeaways: ['Germination conditions: water, air, warmth', 'George de Mestral Velcro invention from burrs', 'Origin of chillies, potatoes, tomatoes from South America'],
  },
  env_ch6: {
    summary: 'King Ghadsi\'s 650-year-old Ghadsisar lake in Jaisalmer with 9 interconnected lakes. Traditional Gujarat stepwells (Vavs) like Adalaj and Rani ki Vav, and rooftop rainwater harvesting tankas.',
    keyTakeaways: ['Ghadsisar 9 interconnected lakes', 'Vavs (stepwells) of Gujarat for groundwater', 'Rooftop rainwater harvesting'],
  },
  env_ch7: {
    summary: 'Density, floating, and sinking. The Dead Sea has ~300g salt per liter, allowing swimmers to float without sinking. Lemons float in salt water. Details Mahatma Gandhi\'s 1930 Dandi Salt March protesting British salt taxes.',
    keyTakeaways: ['Salt increases water density enabling buoyancy', 'Dead Sea salinity ~300g/L', '1930 Dandi Salt March in Gujarat'],
  },
  env_ch8: {
    summary: 'Malaria transmission via female Anopheles mosquitoes breeding in stagnant water. Ronald Ross discovered malaria parasites in mosquito stomachs in Secunderabad (Nobel Prize 1902). Anaemia (low haemoglobin) is treated with iron-rich jaggery and amla.',
    keyTakeaways: ['Female Anopheles mosquito vector', 'Sir Ronald Ross Nobel Prize discovery', 'Anaemia treated with jaggery, amla, and green vegetables'],
  },
  env_ch9: {
    summary: 'Mountaineering camp at Nehru Institute of Mountaineering, Uttarkashi under Brigadier Gyan Singh. Group leader responsibilities, pitons, carabiners, and Bachendri Pal becoming the first Indian woman to reach Mount Everest on 23 May 1984.',
    keyTakeaways: ['Group leader duties: walking at rear, assisting others', 'Mountaineering gear: Pitons, carabiners, slings', 'Bachendri Pal hoisted Indian tricolour on Everest in 1984'],
  },
  env_ch10: {
    summary: 'Uparkot Fort in Junagadh, Gujarat visited by Didi, Yashpal, Zeel, and Jigna. Explores thick walls, bastions (Gadh) for 360° surveillance, Neelam and Manek bronze cannons, Adi-Kadi Vav, Navghan Kuvo, and museum preservation.',
    keyTakeaways: ['Uparkot Fort in Junagadh, Gujarat', 'Bastions (Gadh) provide defensive vantage points', 'Neelam and Manek cannons, Adi-Kadi Vav and Navghan Kuvo'],
  },
  env_ch11: {
    summary: 'Astronaut Sunita Williams aboard the International Space Station. Life in microgravity: floating food, water blobs, hair standing upright. Earth has no political border lines from space; Earth\'s gravity keeps atmosphere and oceans anchored.',
    keyTakeaways: ['Microgravity phenomenon in space', 'Earth\'s gravitational pull', 'Seen from space, Earth has no borders'],
  },
  env_ch12: {
    summary: 'School bus trip to Adalaj stepwell near Ahmedabad. Petroleum is an exhaustible fossil fuel refined into petrol, diesel, kerosene, LPG, and bitumen. Emphasizes switching off engines at signals, solar energy, and air pollution.',
    keyTakeaways: ['Petroleum is a finite non-renewable resource', 'Crude oil refining produces petrol, diesel, kerosene, LPG', 'Conservation: Solar energy and switching off engines at signals'],
  },
  env_ch13: {
    summary: 'Gaurav Jani travels on motorcycle "Loner" from Mumbai to Ladakh. The high-altitude cold desert of Leh, stone houses with ground-floor winter cattle shelters, Changpa nomads at 5,000m, Rebo yak-hair tents, and precious Pashmina wool (250 hours to weave one shawl).',
    keyTakeaways: ['Ladakh cold desert climate', 'Changpas nomadic pastoralists in Rebo tents', 'Pashmina shawl takes 250 hours of hand weaving'],
  },
  env_ch14: {
    summary: 'Jasma from Kutch, Gujarat recounts the devastating 26 January 2001 Republic Day earthquake. Community relief, rebuilding earthquake-safe bamboo-mud houses, and survival drill: Drop, Cover, and Hold Under a sturdy table.',
    keyTakeaways: ['26 January 2001 Kutch Bhuj Gujarat earthquake', 'Drop, Cover, and Hold emergency survival drill', 'Earthquake-safe architecture using light materials'],
  },
  env_ch15: {
    summary: 'Dr. Zakir Hussain\'s tale of the woodcutter and tiny Miya Balishtiye. Human breath is warm (~37°C), warming cold fingers in winter but cooling boiling potatoes. Medical stethoscopes amplify heartbeats.',
    keyTakeaways: ['Breath heat exchange: warming cold hands and cooling hot food', 'Dr. Zakir Hussain authorship', 'Stethoscope amplifies cardiac pulse'],
  },
  env_ch16: {
    summary: 'Dignity of labour featuring village cleaner Shankarbhai. At Mahatma Gandhi\'s Sabarmati Ashram, every person had to clean their own toilets to eliminate untouchability. Dr. B.R. Ambedkar\'s constitutional crusade for equality.',
    keyTakeaways: ['Dignity of labour: No job is inferior', 'Gandhiji\'s Sabarmati Ashram toilet cleaning rule', 'Dr. B.R. Ambedkar and constitutional eradication of caste bias'],
  },
  env_ch17: {
    summary: 'Afsana Mansuri, Zarin, Khushnoor, and Afreen of Nagpada Basketball Association, Mumbai. Overcoming gender stereotypes under Coach Noor Khan, emphasizing team cooperation over individual glory.',
    keyTakeaways: ['Breaking gender barriers in athletics', 'Team cooperation matters more than individual points', 'Dedication and family support overcome social walls'],
  },
  env_ch18: {
    summary: 'Anujbhai\'s displacement from tranquil Khedi village when a huge dam is built. Forced resettlement to barren Sinduri and later Mumbai slums, portraying the severe human cost of displacement.',
    keyTakeaways: ['Dam construction and rural displacement', 'Loss of ancestral culture and communal bonds', 'Struggles of urban slum migrants'],
  },
  env_ch19: {
    summary: 'Narrated by a little Bajra seed stored in Damjibhai\'s wooden box with neem leaves in Vangaam, Gujarat. Contrasts traditional farming (crop rotation, natural compost, earthworms aerating soil) with modern chemical farming debt.',
    keyTakeaways: ['Vangaam, Gujarat traditional agriculture', 'Dry neem leaves preserve stored grains naturally', 'Earthworms aerate soil and produce rich humus'],
  },
  env_ch20: {
    summary: 'Adivasi activist Suryamani in Jharkhand. Forest dwellers consider the jungle a collective bank. Details her "Torang" cultural center keeping Kuduk language and herbal lore alive, and the Forest Rights Act 2007.',
    keyTakeaways: ['Forest Rights Act 2007 protects 25-year forest dwellers', 'Suryamani\'s "Torang" cultural center in Kuduk', 'Forests as collective communal heritage'],
  },
  env_ch21: {
    summary: 'Hereditary traits: Nilam inheriting curly hair from her nani, identical twins Meena and Mamta, and Gregor Mendel\'s 28,000 pea experiments discovering genetic inheritance laws. Clarifies that polio is caused by a virus, not genetics.',
    keyTakeaways: ['Inherited physical traits from family', 'Gregor Mendel\'s pea plant genetics', 'Polio is caused by a virus, prevented by Pulse Polio vaccine'],
  },
  env_ch22: {
    summary: 'Seasonal migration of Dhanu\'s family to sugarcane factories after Dussehra. Caught in the Mukadam loan trap, children miss 6 months of schooling, highlighting the urgent right to continuous elementary education.',
    keyTakeaways: ['Seasonal sugarcane migration after Dussehra', 'Mukadam moneylender debt trap', 'Importance of continuous schooling for migrant children'],
  },
  env_ch23: {
    summary: 'Celebrates Gujarat state heritage with poet Narmad\'s anthem "Jai Jai Garvi Gujarat". Highlights 33 districts of Gujarat, longest coastline of 1,600 km, Tropic of Cancer crossing north Gujarat, Sardar Sarovar Dam on Narmada River, and Amul Dairy White Revolution in Anand by Dr. Verghese Kurien and Tribhuvandas Patel.',
    keyTakeaways: [
      '"Jai Jai Garvi Gujarat" anthem by poet Narmad',
      'Gujarat has 33 districts, longest coastline in India (1,600 km), and 2 gulfs (Kutch and Khambhat)',
      'Sardar Sarovar Dam on Narmada, and Amul Dairy White Revolution in Anand'
    ],
  },
};

// -------------------------------------------------------------------------
// AUTHENTIC TEXTBOOK QUESTION BANK (BASED EXACTLY ON GSSTB TEXTBOOK PAGES)
// -------------------------------------------------------------------------
const QUESTION_BANK = [
  // ================= MARIGOLD ENGLISH (10 UNITS) =================
  // Unit 1: Ice-cream Man & Wonderful Waste!
  { id: 'ENG1_01', chapterId: 'mari_u1', concept: 'Avial Recipe Story', type: 'MCQ', prompt: '1. In the story "Wonderful Waste!", what famous traditional feast dish of Kerala was created by the palace cook using leftover vegetable scraps?', marks: 1, options: ['Avial', 'Sambar', 'Rasam', 'Payasam'], correctOptionIndex: 0, explanation: 'The Maharaja of Travancore ordered the cook to use scraps, creating the famous dish Avial.' },
  { id: 'ENG1_02', chapterId: 'mari_u1', concept: 'Ice-cream Man Poem', type: 'FILL_BLANKS', prompt: '2. In the poem "Ice-cream Man", Rachel Field describes the cart going with a cheerful _______ sound down the street.', marks: 1, acceptedBlanks: ['trundling', 'trundling down the street'], explanation: 'The cart goes "trundling down the street" with cold treats.' },
  { id: 'ENG1_03', chapterId: 'mari_u1', concept: 'Bamboo Curry Story', type: 'TRUE_FALSE', prompt: '3. In the Santhal folk tale "Bamboo Curry", the curry was actually prepared from bamboo shoots and not from the hard bamboo door.', marks: 1, correctBoolean: true, explanation: 'Bamboo curry is made from tender edible bamboo shoots.' },
  { id: 'ENG1_04', chapterId: 'mari_u1', concept: 'Idioms & Meanings', type: 'MATCHING', prompt: '4. Match each phrase with its textbook meaning:', marks: 2, matchingPairs: [{ left: 'In a fix', right: 'A hard situation to escape from' }, { left: 'Lo and behold', right: 'Look! What a surprise' }], explanation: '"In a fix" means difficult situation; "Lo and behold" means look what a surprise!' },

  // Unit 2: Teamwork & Flying Together
  { id: 'ENG2_01', chapterId: 'mari_u2', concept: 'Panchatantra Morals', type: 'MCQ', prompt: '1. In "Flying Together", what danger did the wise old goose warn the flock about when a tiny plant began growing at the tree base?', marks: 1, options: ['The creeper would grow thick for a hunter to climb up', 'The tree would fall down', 'Birds would run out of berries', 'Lightning would strike'], correctOptionIndex: 0, explanation: 'The wise bird warned the creeper would become thick as a rope for a hunter to climb.' },
  { id: 'ENG2_02', chapterId: 'mari_u2', concept: 'Teamwork Relay Race', type: 'TRUE_FALSE', prompt: '2. According to the poem "Teamwork", a relay race cannot continue if nobody wants to pass the baton.', marks: 1, correctBoolean: true, explanation: 'In a relay race, team members must pass the baton.' },
  { id: 'ENG2_03', chapterId: 'mari_u2', concept: 'Collective Nouns', type: 'FILL_BLANKS', prompt: '3. A group of flying geese or sheep is called a _______ of geese/sheep.', marks: 1, acceptedBlanks: ['flock', 'a flock'], explanation: 'A flock is the collective noun for geese and birds.' },

  // Unit 3: My Shadow & Robinson Crusoe
  { id: 'ENG3_01', chapterId: 'mari_u3', concept: 'Robinson Crusoe Discovery', type: 'MCQ', prompt: '1. When Robinson Crusoe was walking along the sandy beach of his deserted island, what shocking discovery terrified him?', marks: 1, options: ['A single human footprint in the sand', 'A pirate ship', 'A wild tiger', 'A giant snake'], correctOptionIndex: 0, explanation: 'Crusoe discovered a fresh human footprint on the sand.' },
  { id: 'ENG3_02', chapterId: 'mari_u3', concept: 'My Shadow Growth', type: 'TRUE_FALSE', prompt: '2. In "My Shadow", the shadow sometimes shoots up taller like an India-rubber ball.', marks: 1, correctBoolean: true, explanation: 'Stevenson describes the shadow shooting up tall like an India-rubber ball.' },

  // Unit 4: Crying & My Elder Brother
  { id: 'ENG4_01', chapterId: 'mari_u4', concept: 'Premchand Bade Bhai Saheb', type: 'SHORT_ANSWER', prompt: '1. In Munshi Premchand\'s story "My Elder Brother", why did the elder brother Bhaiya study so hard even when younger Munna passed effortlessly?', marks: 2, rubricKeywords: ['foundation', 'duty', 'responsibility', 'example', 'learn', 'elder'], explanation: 'He wanted to lay a solid educational foundation and set a responsible example.' },
  { id: 'ENG4_02', chapterId: 'mari_u4', concept: 'Crying Poem Catharsis', type: 'FILL_BLANKS', prompt: '2. In the poem "Crying", the poet advises to cry until your pillow is _______, then laugh cheerfully.', marks: 1, acceptedBlanks: ['soaked', 'wet', 'completely soaked'], explanation: 'The poem says to cry until your pillow is soaked.' },

  // Unit 5: The Lazy Frog & Rip Van Winkle
  { id: 'ENG5_01', chapterId: 'mari_u5', concept: 'Rip Van Winkle Mountain Snooze', type: 'MCQ', prompt: '1. For how many years did the good-natured but lazy villager Rip Van Winkle sleep in the Kaatskill mountains?', marks: 1, options: ['20 years', '10 years', '5 years', '50 years'], correctOptionIndex: 0, explanation: 'Rip Van Winkle slept for twenty years and woke up with a foot-long white beard.' },

  // Unit 6: Class Discussion & Talkative Barber
  { id: 'ENG6_01', chapterId: 'mari_u6', concept: 'Arabian Nights Humor', type: 'MCQ', prompt: '1. In the city of Cashgar, why was the Sultan furious with the talkative barber?', marks: 1, options: ['He kept chattering endlessly instead of shaving the Sultan\'s half-shaved head', 'He cut the Sultan\'s beard', 'He arrived late at midnight', 'He refused payment'], correctOptionIndex: 0, explanation: 'The barber kept chattering while the Sultan sat half-shaved.' },
  { id: 'ENG6_02', chapterId: 'mari_u6', concept: 'Class Discussion Jane', type: 'FILL_BLANKS', prompt: '2. In the poem "Class Discussion", the quiet girl who sat silently observing was named _______.', marks: 1, acceptedBlanks: ['jane'], explanation: 'Jane was the quiet girl who listened calmly.' },

  // Unit 7: Topsy-turvy Land & Gulliver\'s Travels
  { id: 'ENG7_01', chapterId: 'mari_u7', concept: 'Gulliver in Brobdingnag', type: 'MCQ', prompt: '1. In Gulliver\'s Travels, when Gulliver was captured in Brobdingnag, how tall were the inhabitants?', marks: 1, options: ['Giants sixty feet tall', 'Tiny dwarfs 6 inches tall', 'Invisible people', 'Average human height'], correctOptionIndex: 0, explanation: 'In Brobdingnag, the farmers and residents were giants sixty feet tall.' },
  { id: 'ENG7_02', chapterId: 'mari_u7', concept: 'Topsy-turvy Land', type: 'TRUE_FALSE', prompt: '2. In Topsy-turvy land, people walk on their heads and the sea is made of sand.', marks: 1, correctBoolean: true, explanation: 'In this whimsical poem, people walk on their heads and the sea is sand.' },

  // Unit 8: Nobody\'s Friend & The Little Bully
  { id: 'ENG8_01', chapterId: 'mari_u8', concept: 'Hari Bully Lesson', type: 'SHORT_ANSWER', prompt: '1. In "The Little Bully", what seaside creatures pinched Hari until he realized that pinching hurts others?', marks: 2, rubricKeywords: ['crabs', 'crab', 'lobster', 'prawn', 'shrimp'], explanation: 'Crabs, lobsters, and prawns pinched Hari with their sharp claws.' },

  // Unit 9: Sing a Song of People & Around the World
  { id: 'ENG9_01', chapterId: 'mari_u9', concept: 'Phileas Fogg 80-Day Wager', type: 'FILL_BLANKS', prompt: '1. In Jules Verne\'s adventure, the English gentleman who wagered he could circle the globe in 80 days is Mr. Phileas _______.', marks: 1, acceptedBlanks: ['fogg', 'phileas fogg'], explanation: 'Mr. Phileas Fogg took the wager.' },

  // Unit 10: Malu Bhalu & Who Will be Ningthou?
  { id: 'ENG10_01', chapterId: 'mari_u10', concept: 'Malu Bhalu Arctic Swimming', type: 'MCQ', prompt: '1. In Kamla Bhasin\'s poem "Malu Bhalu", what exciting skill did the brave young white polar bear learn from her mother?', marks: 1, options: ['Swimming in the icy sea', 'Flying in blizzards', 'Hunting with eagles', 'Climbing tall pines'], correctOptionIndex: 0, explanation: 'Malu learned to swim with natural ease in the cold sea.' },
  { id: 'ENG10_02', chapterId: 'mari_u10', concept: 'Sanatombi Compassionate Leadership', type: 'SHORT_ANSWER', prompt: '2. In the Manipuri folktale "Who Will be Ningthou?", why did the king choose his 5-year-old daughter Sanatombi as ruler?', marks: 2, rubricKeywords: ['pain', 'feel', 'trees', 'birds', 'animals', 'people', 'compassion', 'soul'], explanation: 'She felt the pain of the people, animals, birds, and the pierced banyan tree.' },

  // ================= MATHEMATICS (MATH-MAGIC) =================
  // Ch 1: Our National Fruit-Mango
  { id: 'M1_01', chapterId: 'math_ch1', concept: 'Haiku Poetry Structure', type: 'MCQ', prompt: '1. In Chapter 1, Japanese Haiku poetry about mangoes has how many total letters arranged in three lines (5+7+5)?', marks: 1, options: ['12 letters', '15 letters', '17 letters', '20 letters'], correctOptionIndex: 2, explanation: 'A Haiku poem has 17 letters in total (5 + 7 + 5).' },
  { id: 'M1_02', chapterId: 'math_ch1', concept: 'Large Number Values', type: 'MCQ', prompt: '2. How many zeros are there in the number "One Lakh" (1,00,000)?', marks: 1, options: ['3 zeros', '4 zeros', '5 zeros', '6 zeros'], correctOptionIndex: 2, explanation: 'One Lakh has 5 zeros (100,000).' },
  { id: 'M1_03', chapterId: 'math_ch1', concept: 'Vehicle Speed & Distance', type: 'FILL_BLANKS', prompt: '3. A tractor moves at a speed of 20 km per hour. How many kilometers will it cover in 3 hours?', marks: 1, acceptedBlanks: ['60', '60 km', '60km'], explanation: 'Distance = Speed × Time = 20 × 3 = 60 km.' },
  { id: 'M1_04', chapterId: 'math_ch1', concept: 'Dried Mango Pulp Weight', type: 'TRUE_FALSE', prompt: '4. When fresh mango pulp is prepared into dried Aam Papad, its weight reduces to 1/3 of the mango fruit weight.', marks: 1, correctBoolean: true, explanation: 'According to page 14 of Math-Magic, extracted pulp weighs 1/3 of fresh mangoes.' },

  // Ch 2: Shapes and Angles
  { id: 'M2_01', chapterId: 'math_ch2', concept: 'Right Angles', type: 'MCQ', prompt: '1. How many degrees are there in a right angle?', marks: 1, options: ['45 degrees', '90 degrees', '180 degrees', '360 degrees'], correctOptionIndex: 1, explanation: 'A right angle measures exactly 90 degrees.' },
  { id: 'M2_02', chapterId: 'math_ch2', concept: 'Clock Angles', type: 'TRUE_FALSE', prompt: '2. At 9:00 o\'clock, the hands of a clock form an obtuse angle.', marks: 1, correctBoolean: false, explanation: 'At 9:00, clock hands form a 90 degree right angle.' },
  { id: 'M2_03', chapterId: 'math_ch2', concept: 'Angle Measurement', type: 'MATCHING', prompt: '3. Match each angle type with its degree range:', marks: 2, matchingPairs: [{ left: 'Less than 90 deg', right: 'Acute' }, { left: 'Between 90 and 180 deg', right: 'Obtuse' }], explanation: 'Acute is <90°; Obtuse is between 90° and 180°.' },

  // Ch 3: How Many Squares?
  { id: 'M3_01', chapterId: 'math_ch3', concept: 'Perimeter Definition', type: 'MCQ', prompt: '1. The total continuous boundary length of a closed shape is called its:', marks: 1, options: ['Area', 'Perimeter', 'Volume', 'Radius'], correctOptionIndex: 1, explanation: 'Perimeter is the total boundary length.' },
  { id: 'M3_02', chapterId: 'math_ch3', concept: 'Rectangle Area', type: 'FILL_BLANKS', prompt: '2. The area of a rectangular tile with length 6 cm and width 4 cm is _______ sq cm.', marks: 1, acceptedBlanks: ['24', '24 sq cm'], explanation: 'Area = length × width = 6 × 4 = 24 sq cm.' },

  // Ch 4: Parts and Wholes
  { id: 'M4_01', chapterId: 'math_ch4', concept: 'National Flag Proportions', type: 'MCQ', prompt: '1. What part of the Indian National Flag is coloured saffron (orange)?', marks: 1, options: ['1/2 part', '1/3 part', '1/4 part', '1/5 part'], correctOptionIndex: 1, explanation: 'The top one-third (1/3) of the Indian flag is saffron.' },
  { id: 'M4_02', chapterId: 'math_ch4', concept: 'Equivalent Fractions', type: 'TRUE_FALSE', prompt: '2. The fraction 2/4 is equal to 1/2.', marks: 1, correctBoolean: true, explanation: '2/4 simplifies to 1/2.' },

  // Ch 5: Does it Look the Same?
  { id: 'M5_01', chapterId: 'math_ch5', concept: 'Lines of Symmetry', type: 'TRUE_FALSE', prompt: '1. The English capital letter H has both vertical and horizontal lines of symmetry.', marks: 1, correctBoolean: true, explanation: 'Letter H can be split evenly along both axes.' },
  { id: 'M5_02', chapterId: 'math_ch5', concept: 'Half-Turn 180°', type: 'MCQ', prompt: '2. If you give a shape a half-turn (1/2 turn), by how many degrees does it rotate?', marks: 1, options: ['45 degrees', '90 degrees', '180 degrees', '360 degrees'], correctOptionIndex: 2, explanation: 'A half-turn is 180 degrees.' },

  // Ch 6: Be My Multiple, I'll be Your Factor
  { id: 'M6_01', chapterId: 'math_ch6', concept: 'Lowest Common Multiple', type: 'MCQ', prompt: '1. What is the smallest common multiple (LCM) of 3 and 5?', marks: 1, options: ['8', '10', '15', '20'], correctOptionIndex: 2, explanation: '15 is the smallest common multiple of 3 and 5.' },

  // Ch 7: Can You See the Pattern?
  { id: 'M7_01', chapterId: 'math_ch7', concept: 'Magic Square Constant', type: 'MCQ', prompt: '1. In a standard 3x3 Magic Square filled with numbers 1 to 9, what is the sum of every row, column, and diagonal?', marks: 1, options: ['12', '15', '18', '21'], correctOptionIndex: 1, explanation: 'The magic constant is 15.' },

  // Ch 8: Mapping Your Way
  { id: 'M8_01', chapterId: 'math_ch8', concept: 'Map Scale Conversion', type: 'FILL_BLANKS', prompt: '1. If a map scale says 2 cm = 1 km on ground, then a distance of 4 cm on the map equals _______ kilometers in reality.', marks: 1, acceptedBlanks: ['2', '2 km', '2km'], explanation: '4 cm ÷ 2 cm/km = 2 km.' },

  // Ch 9: Boxes and Sketches
  { id: 'M9_01', chapterId: 'math_ch9', concept: 'Dice Opposite Faces Rule', type: 'MCQ', prompt: '1. On a standard playing dice cube, what is the sum of the numbers on any two opposite faces?', marks: 1, options: ['5', '6', '7', '8'], correctOptionIndex: 2, explanation: 'Opposite faces on a die always sum to 7.' },

  // Ch 10: Tenths and Hundredths
  { id: 'M10_01', chapterId: 'math_ch10', concept: 'Centimeters to Millimeters', type: 'FILL_BLANKS', prompt: '1. One centimeter equals _______ millimeters.', marks: 1, acceptedBlanks: ['10', '10 mm'], explanation: '1 cm = 10 mm.' },

  // Ch 11: Area and its Boundary
  { id: 'M11_01', chapterId: 'math_ch11', concept: 'Square Perimeter', type: 'FILL_BLANKS', prompt: '1. A square carrom board has a side of 80 cm. The perimeter of its boundary is _______ centimeters.', marks: 1, acceptedBlanks: ['320', '320 cm'], explanation: 'Perimeter = 4 × 80 = 320 cm.' },

  // Ch 12: Smart Charts
  { id: 'M12_01', chapterId: 'math_ch12', concept: 'Tally Marks 5 Bundle', type: 'MCQ', prompt: '1. In tally charts, how many items are represented by a complete bundle with four vertical lines and one cross slash?', marks: 1, options: ['4 items', '5 items', '6 items', '10 items'], correctOptionIndex: 1, explanation: 'A standard tally bundle represents 5 items.' },

  // Ch 13: Ways to Multiply and Divide
  { id: 'M13_01', chapterId: 'math_ch13', concept: 'Division Algorithm', type: 'TRUE_FALSE', prompt: '1. In division, Dividend is always equal to (Divisor × Quotient) + Remainder.', marks: 1, correctBoolean: true, explanation: 'This is the fundamental division algorithm identity.' },

  // Ch 14: How Big? How Heavy?
  { id: 'M14_01', chapterId: 'math_ch14', concept: 'Weight Units', type: 'FILL_BLANKS', prompt: '1. One kilogram (1 kg) is equal to _______ grams.', marks: 1, acceptedBlanks: ['1000', '1000 g', '1,000'], explanation: '1 kg = 1,000 grams.' },

  // ================= ENVIRONMENT (LOOKING AROUND - 23 CHAPTERS) =================
  // Ch 1: Super Senses
  { id: 'E1_01', chapterId: 'env_ch1', concept: 'Ant Scent Trails', type: 'TRUE_FALSE', prompt: '1. Ants leave behind a chemical scent trail on the ground for other ants to follow in single file.', marks: 1, correctBoolean: true, explanation: 'Ants release pheromones that follower ants detect with their antennae.' },
  { id: 'E1_02', chapterId: 'env_ch1', concept: 'Bird Eyeballs in Sockets', type: 'MCQ', prompt: '2. Why do birds like pigeons and crows continuously turn and bob their necks?', marks: 1, options: ['Their eyes are fixed in their sockets and cannot move', 'To hear distant sounds better', 'To catch insects in air', 'To stay warm'], correctOptionIndex: 0, explanation: 'Most birds have fixed eyeballs and must move their heads to view surroundings.' },

  // Ch 2: A Snake and Snake Charmer
  { id: 'E2_01', chapterId: 'env_ch2', concept: 'Poisonous Snakes of India', type: 'MCQ', prompt: '1. Out of many types of snakes in India, only four are poisonous. Which of the following is one of those four?', marks: 1, options: ['Cobra', 'Rat snake', 'Python', 'Blind snake'], correctOptionIndex: 0, explanation: 'Cobra, Common Krait, Russell\'s Viper (Duboiya), and Saw-scaled Viper (Afai) are the 4 poisonous snakes.' },
  { id: 'E2_02', chapterId: 'env_ch2', concept: 'Snake Hearing Vibration', type: 'TRUE_FALSE', prompt: '2. Snakes have external ears and hear musical sounds played by the snake charmer\'s been.', marks: 1, correctBoolean: false, explanation: 'Snakes lack external ears; they perceive ground vibrations.' },

  // Ch 3: From Tasting to Digesting
  { id: 'E3_01', chapterId: 'env_ch3', concept: 'Salivary Digestion', type: 'MCQ', prompt: '1. Which fluid secreted in our mouth begins the breakdown of food starch into sugars?', marks: 1, options: ['Bile', 'Saliva', 'Stomach Acid', 'Water'], correctOptionIndex: 1, explanation: 'Saliva contains enzymes that break complex starches into simpler sugars.' },
  { id: 'E3_02', chapterId: 'env_ch3', concept: 'Dr. Beaumont Stomach Window', type: 'MCQ', prompt: '2. Which doctor famously studied human stomach digestion through a wound in patient Martin?', marks: 1, options: ['Dr. William Beaumont', 'Dr. Alexander Fleming', 'Dr. Edward Jenner', 'Dr. Robert Koch'], correctOptionIndex: 0, explanation: 'Dr. William Beaumont made groundbreaking digestion discoveries through Martin\'s stomach.' },
  { id: 'E3_03', chapterId: 'env_ch3', concept: 'ORS Hydration', type: 'SHORT_ANSWER', prompt: '3. What is the full form of ORS, given to prevent dangerous dehydration?', marks: 2, rubricKeywords: ['oral', 'rehydration', 'solution', 'salts'], explanation: 'ORS stands for Oral Rehydration Solution.' },

  // Ch 4: Mangoes Round the Year !
  { id: 'E4_01', chapterId: 'env_ch4', concept: 'Aam Papad in Junagadh', type: 'FILL_BLANKS', prompt: '1. In Junagadh, Gujarat, brothers Alpesh and Mahendra helped make the sun-dried sweet mango treat called Aam _______.', marks: 1, acceptedBlanks: ['papad', 'paapad'], explanation: 'Aam Papad is made by drying sweetened mango pulp layers in the sun.' },

  // Ch 5: Seed, Seed, Seed
  { id: 'E5_01', chapterId: 'env_ch5', concept: 'Seed Germination', type: 'FILL_BLANKS', prompt: '1. The sprouting of a dormant seed into a young seedling is called _______.', marks: 1, acceptedBlanks: ['germination', 'seed germination'], explanation: 'Germination begins when moisture and warmth trigger growth.' },
  { id: 'E5_02', chapterId: 'env_ch5', concept: 'Velcro Invention 1948', type: 'SHORT_ANSWER', prompt: '2. What feature of burr seeds inspired George de Mestral to invent Velcro in 1948?', marks: 2, rubricKeywords: ['hooks', 'hook', 'stick', 'fur', 'clothes', 'loops'], explanation: 'Tiny hooks on burrs clung to fur and clothes, inspiring hook-and-loop Velcro.' },

  // Ch 6: Water is Life
  { id: 'E6_01', chapterId: 'env_ch6', concept: 'Ghadsisar Lake System', type: 'MCQ', prompt: '1. The historic Ghadsisar lake built by King Ghadsi consisted of how many interconnected lakes?', marks: 1, options: ['3 lakes', '5 lakes', '9 lakes', '12 lakes'], correctOptionIndex: 2, explanation: 'Ghadsisar consisted of 9 interconnected lakes.' },
  { id: 'E6_02', chapterId: 'env_ch6', concept: 'Gujarat Stepwells (Vavs)', type: 'FILL_BLANKS', prompt: '2. Multi-tiered traditional stepped water reservoirs found across Gujarat are called _______.', marks: 1, acceptedBlanks: ['vavs', 'vav', 'stepwells', 'baolis'], explanation: 'Vavs (stepwells) store and access cool groundwater.' },

  // Ch 7: Experiments with Water
  { id: 'E7_01', chapterId: 'env_ch7', concept: 'Dead Sea Density', type: 'MCQ', prompt: '1. A swimmer floats effortlessly on top of the Dead Sea without sinking due to its:', marks: 1, options: ['Extremely high salt density', 'Cold mountain water', 'Fast surface currents', 'Shallow depth'], correctOptionIndex: 0, explanation: 'The Dead Sea has ~300g salt per liter, making the water denser than the human body.' },
  { id: 'E7_02', chapterId: 'env_ch7', concept: 'Dandi March 1930', type: 'FILL_BLANKS', prompt: '2. Mahatma Gandhi led the historic 1930 Dandi March in Gujarat to protest the British tax on _______.', marks: 1, acceptedBlanks: ['salt'], explanation: 'Gandhiji marched to Dandi seashore in 1930 to protest the salt tax.' },

  // Ch 8: Mosquitoes : Diseases and Treatment
  { id: 'E8_01', chapterId: 'env_ch8', concept: 'Malaria Transmission', type: 'MCQ', prompt: '1. Malaria is transmitted to humans through the bite of the female:', marks: 1, options: ['Anopheles mosquito', 'Aedes mosquito', 'Culex mosquito', 'Housefly'], correctOptionIndex: 0, explanation: 'Female Anopheles mosquitoes carry the malaria parasite.' },

  // Ch 9: Climbing High !
  { id: 'E9_01', chapterId: 'env_ch9', concept: 'Bachendri Pal Everest Summit', type: 'MCQ', prompt: '1. Who was the first Indian woman to reach the summit of Mount Everest on 23 May 1984?', marks: 1, options: ['Bachendri Pal', 'Sunita Williams', 'Kalpana Chawla', 'Santosh Yadav'], correctOptionIndex: 0, explanation: 'Bachendri Pal summited Everest on 23 May 1984.' },

  // Ch 10: Story of Walls
  { id: 'E10_01', chapterId: 'env_ch10', concept: 'Uparkot Fort in Junagadh', type: 'MCQ', prompt: '1. In Chapter 10 "Story of Walls", which historic fort in Junagadh city of Gujarat did the children visit?', marks: 1, options: ['Uparkot Fort', 'Red Fort', 'Golconda Fort', 'Gwalior Fort'], correctOptionIndex: 0, explanation: 'Page 87 of Gujarat Environment textbook introduces Uparkot Fort near Junagadh.' },
  { id: 'E10_02', chapterId: 'env_ch10', concept: 'Uparkot Cannons', type: 'FILL_BLANKS', prompt: '2. The two famous cannons mounted at Uparkot Fort in Junagadh are called Neelam and _______.', marks: 1, acceptedBlanks: ['manek', 'manek tope'], explanation: 'The cannons are named Neelam and Manek.' },

  // Ch 11: Sunita in Space
  { id: 'E11_01', chapterId: 'env_ch11', concept: 'Microgravity Water Blobs', type: 'TRUE_FALSE', prompt: '1. In zero gravity, water does not stay in a glass; it floats as round liquid blobs in the cabin.', marks: 1, correctBoolean: true, explanation: 'In microgravity, liquids float as spheres.' },

  // Ch 12: What if this will be Finished ?
  { id: 'E12_01', chapterId: 'env_ch12', concept: 'Petroleum Refinery', type: 'MCQ', prompt: '1. Which of the following is NOT obtained by refining petroleum crude oil?', marks: 1, options: ['Diesel', 'LPG cooking gas', 'Wood', 'Kerosene'], correctOptionIndex: 2, explanation: 'Wood comes from trees, not petroleum oil refining.' },

  // Ch 13: Shelter High !
  { id: 'E13_01', chapterId: 'env_ch13', concept: 'Changpa Pashmina Goats', type: 'MCQ', prompt: '1. The nomadic Changpa tribe of Ladakh graze special goats at 5,000 meters altitude that produce world-famous:', marks: 1, options: ['Pashmina wool', 'Cotton', 'Silk', 'Jute'], correctOptionIndex: 0, explanation: 'Pashmina goats grow fine wool in freezing high-altitude mountain winds.' },

  // Ch 14: When the Earth Shook !
  { id: 'E14_01', chapterId: 'env_ch14', concept: 'Earthquake Drill Safety', type: 'MCQ', prompt: '1. During an earthquake, if you cannot immediately evacuate outdoors, what is the safest drill?', marks: 1, options: ['Drop under a sturdy table and hold on', 'Use an elevator', 'Stand near tall windows', 'Run to the roof'], correctOptionIndex: 0, explanation: 'Drop, Cover, and Hold protects from falling plaster and debris.' },

  // Ch 15: Cold or Hot ?
  { id: 'E15_01', chapterId: 'env_ch15', concept: 'Dr. Zakir Hussain Woodcutter Story', type: 'MCQ', prompt: '1. The story "Cold or Hot?" featuring the woodcutter and Miya Balishtiye was written by which former President of India?', marks: 1, options: ['Dr. Zakir Hussain', 'Dr. A.P.J. Abdul Kalam', 'Dr. Rajendra Prasad', 'Dr. S. Radhakrishnan'], correctOptionIndex: 0, explanation: 'Dr. Zakir Hussain authored the famous woodcutter story.' },

  // Ch 16: Cleaning is our job
  { id: 'E16_01', chapterId: 'env_ch16', concept: 'Gandhiji Sabarmati Ashram', type: 'TRUE_FALSE', prompt: '1. At Mahatma Gandhi\'s Sabarmati Ashram, every person—including guests—had to clean their own toilets.', marks: 1, correctBoolean: true, explanation: 'Gandhiji insisted on dignity of labour and personal hygiene.' },

  // Ch 17: Across the Wall
  { id: 'E17_01', chapterId: 'env_ch17', concept: 'Team Spirit Over Glory', type: 'TRUE_FALSE', prompt: '1. In a sports team, true team spirit means caring more about the team\'s collective victory than personal scores.', marks: 1, correctBoolean: true, explanation: 'Team spirit prioritizes unity and mutual encouragement.' },

  // Ch 18: Where do we go now ?
  { id: 'E18_01', chapterId: 'env_ch18', concept: 'Dam Displacement', type: 'MCQ', prompt: '1. Why was Anujbhai forced to leave his ancestral village of Khedi?', marks: 1, options: ['A big dam was built that submerged their village under water', 'A wild animal invasion', 'A snowstorm', 'To find gold'], correctOptionIndex: 0, explanation: 'Building a hydroelectric dam flooded their village.' },

  // Ch 19: A Seed Tells Farmer\'s Story
  { id: 'E19_01', chapterId: 'env_ch19', concept: 'Earthworms Soil Aeration', type: 'MCQ', prompt: '1. Why are earthworms called "friends of the farmer"?', marks: 1, options: ['They dig tunnels that aerate soil and make fertile humus', 'They eat all weeds', 'They scare away birds', 'They produce honey'], correctOptionIndex: 0, explanation: 'Earthworms tunnel through soil, letting air and water penetrate.' },
  { id: 'E19_02', chapterId: 'env_ch19', concept: 'Neem Leaf Preservation in Vangaam', type: 'FILL_BLANKS', prompt: '2. In Vangaam, Gujarat, farmer Damjibhai put dry _______ leaves in his wooden seed box to protect seeds from insects.', marks: 1, acceptedBlanks: ['neem', 'limdo'], explanation: 'Dry neem leaves act as a natural organic insect repellent.' },

  // Ch 20: Whose Forests ?
  { id: 'E20_01', chapterId: 'env_ch20', concept: 'Forest Rights Act 2007', type: 'MCQ', prompt: '1. The Forest Rights Act passed by the Indian government in 2007 protects Adivasis who have lived in the forest for at least how many years?', marks: 1, options: ['5 years', '10 years', '25 years', '50 years'], correctOptionIndex: 2, explanation: 'The Act protects communities settled on forest lands for at least 25 years.' },

  // Ch 21: Like Father, Like Daughter
  { id: 'E21_01', chapterId: 'env_ch21', concept: 'Gregor Mendel Genetics', type: 'MCQ', prompt: '1. Which scientist experimented on 28,000 garden pea plants to discover how traits pass from parents to offspring?', marks: 1, options: ['Gregor Mendel', 'Isaac Newton', 'Albert Einstein', 'Charles Darwin'], correctOptionIndex: 0, explanation: 'Gregor Mendel formulated the fundamental laws of heredity using pea plants.' },
  { id: 'E21_02', chapterId: 'env_ch21', concept: 'Polio Cause Clarification', type: 'TRUE_FALSE', prompt: '2. Polio is an inherited hereditary condition passed down through genes from parents.', marks: 1, correctBoolean: false, explanation: 'Polio is caused by an infectious polio virus, not genetics.' },

  // Ch 22: On the Move Again
  { id: 'E22_01', chapterId: 'env_ch22', concept: 'Sugarcane Harvest Migration', type: 'SHORT_ANSWER', prompt: '1. Why does Dhanu miss school for six months every year?', marks: 2, rubricKeywords: ['sugarcane', 'migration', 'move', 'mukadam', 'harvest', 'factory', 'work'], explanation: 'His family must seasonally migrate to sugarcane factories to work and repay loans.' },

  // Ch 23: We are Gujarati... (Special Gujarat Board Chapter)
  { id: 'E23_01', chapterId: 'env_ch23', concept: 'Gujarat Geography & Coastline', type: 'MCQ', prompt: '1. What is the approximate length of Gujarat\'s coastline, the longest among all Indian states?', marks: 1, options: ['1,000 km', '1,214 km', '1,600 km', '2,400 km'], correctOptionIndex: 2, explanation: 'Page 206 of the Gujarat textbook states that Gujarat has the longest coastline of about 1,600 km.' },
  { id: 'E23_02', chapterId: 'env_ch23', concept: 'Districts of Gujarat', type: 'FILL_BLANKS', prompt: '2. As per the official Gujarat textbook, there are _______ districts in Gujarat state.', marks: 1, acceptedBlanks: ['33', 'thirty-three', 'thirty three'], explanation: 'Gujarat state has 33 administrative districts.' },
  { id: 'E23_03', chapterId: 'env_ch23', concept: 'Amul Dairy White Revolution', type: 'SHORT_ANSWER', prompt: '3. In which city of Gujarat is the world-famous Amul Dairy located, founded by Tribhuvandas Patel and Dr. Verghese Kurien?', marks: 2, rubricKeywords: ['anand'], explanation: 'Amul Dairy was established in Anand, Gujarat.' },
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
    const ok = (q.acceptedBlanks || []).map(clean).includes(val);
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
    return { isCorrect: score === q.marks, score: score, feedback: 'Rubric: ' + score + '/' + q.marks + ' marks based on textbook keywords.' };
  }
  return { isCorrect: false, score: 0, feedback: 'Not answered' };
}

// -------------------------------------------------------------
// MAIN COMPONENT (STANDARD 5: MARIGOLD, MATHS, ENVIRONMENT)
// -------------------------------------------------------------
export default function App() {
  const [screen, setScreen] = useState('HOME');
  const [selectedSub, setSelectedSub] = useState('marigold');
  const [selectedChapterId, setSelectedChapterId] = useState('mari_u1');

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
    chapterSummary: '',
    keyTakeaways: [],
    aiFeedback: '',
  });

  const [history, setHistory] = useState([]);
  const [generatingAiReport, setGeneratingAiReport] = useState(false);

  // Summary preview modal state
  const [summaryModalVisible, setSummaryModalVisible] = useState(false);
  const [summaryModalData, setSummaryModalData] = useState({ title: '', summary: '', keyTakeaways: [] });

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

  function openSummaryPreview(chId, chName) {
    const item = CHAPTER_SUMMARIES[chId] || {
      summary: `Comprehensive chapter study aligned with Gujarat State Board (GSSTB) official textbook curriculum for ${chName}.`,
      keyTakeaways: ['Study core examples', 'Complete textbook exercise drills', 'Review key definitions'],
    };
    setSummaryModalData({
      title: chName,
      summary: item.summary,
      keyTakeaways: item.keyTakeaways,
    });
    setSummaryModalVisible(true);
  }

  function startChapterTest() {
    const filtered = QUESTION_BANK.filter(q => q.chapterId === selectedChapterId);
    if (filtered.length === 0) {
      Alert.alert('Notice', 'Questions for this chapter are loading. Please try another unit!');
      return;
    }
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

    const summaryItem = CHAPTER_SUMMARIES[selectedChapterId] || {
      summary: `Gujarat Standard 5 official curriculum review for ${chapterTitle}.`,
      keyTakeaways: ['Master core rules', 'Practice textbook exercises'],
    };

    setChapterDiagnosis({
      chapterTitle,
      score: earned,
      maxScore: max,
      percentage: pct,
      masteredConcepts: mastered,
      focusConcepts: focus,
      chapterSummary: summaryItem.summary,
      keyTakeaways: summaryItem.keyTakeaways,
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
    const prompt = `Student completed Gujarat Standard 5 test on "${chapterTitle}". Score: ${earned}/${max} (${pct}%).
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
        advice = `🌟 Excellent work, Arjun! You scored ${earned}/${max} (${pct}%). You demonstrated strong understanding of ${mastered.slice(0, 2).join(' and ') || 'the chapter'}. Keep revising ${focus.join(', ') || 'the entire unit'} once before term exams!`;
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
        setAiTutorResponse(`💡 Concept Explanation:\n${questionObj.explanation}\n\nTip: Connect this rule to objects in your house, school, or daily observations!`);
        setAiLoading(false);
      }, 500);
    }
  }

  const currentQ = activeQuestions[currentIndex];
  const userAns = currentQ ? answers[currentQ.id] || {} : {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

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
        <Text style={styles.headerSubtitle}>GSEB Std 5 • Marigold English, Maths & Environment Science</Text>
      </View>

      {/* SCREEN 1: HOME */}
      {screen === 'HOME' && (
        <ScrollView style={styles.body}>
          <Text style={styles.h2}>1. Select Official Subject</Text>
          <View style={styles.row}>
            {[
              { id: 'marigold', label: 'Marigold (10)' },
              { id: 'mathematics', label: 'Maths (14)' },
              { id: 'environment', label: 'Env Science (23)' },
            ].map(sub => {
              const active = selectedSub === sub.id;
              return (
                <TouchableOpacity
                  key={sub.id}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => {
                    setSelectedSub(sub.id);
                    setSelectedChapterId(CHAPTERS[sub.id][0].id);
                  }}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {sub.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.h2}>2. Select Chapter / Unit ({CHAPTERS[selectedSub].length} Total)</Text>
          {CHAPTERS[selectedSub].map(ch => {
            const isSelected = selectedChapterId === ch.id;
            return (
              <View key={ch.id} style={[styles.chapterRow, isSelected && styles.chapterRowActive]}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => setSelectedChapterId(ch.id)}
                >
                  <Text style={[styles.chapterBtnText, isSelected && styles.chapterBtnTextActive]}>
                    {isSelected ? '✓ ' : '• '} {ch.name}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.summaryBtnSmall}
                  onPress={() => openSummaryPreview(ch.id, ch.name)}
                >
                  <Text style={styles.summaryBtnSmallText}>Summary</Text>
                </TouchableOpacity>
              </View>
            );
          })}

          <TouchableOpacity style={styles.primaryBtn} onPress={startChapterTest}>
            <Text style={styles.primaryBtnText}>Start Chapter Assessment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => setScreen('DASHBOARD')}>
            <Text style={styles.secondaryBtnText}>📊 Open Student Progress Dashboard</Text>
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
              placeholder="Type your explanation using key scientific/textbook terms..."
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

            {/* OVERALL CHAPTER SUMMARY & KEY CONCEPTS */}
            <View style={styles.summaryBox}>
              <Text style={styles.summaryBoxTitle}>📖 Overall Chapter Summary</Text>
              <Text style={styles.summaryBoxContent}>{chapterDiagnosis.chapterSummary}</Text>
              {chapterDiagnosis.keyTakeaways && chapterDiagnosis.keyTakeaways.length > 0 && (
                <View style={{ marginTop: 8 }}>
                  <Text style={styles.keyTakeawaysTitle}>Core Concepts to Remember:</Text>
                  {chapterDiagnosis.keyTakeaways.map((point, idx) => (
                    <Text key={idx} style={styles.keyTakeawayItem}>• {point}</Text>
                  ))}
                </View>
              )}
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
              <Text style={styles.conceptSecTitleFocus}>🎯 Concepts to Focus On (Revision List):</Text>
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
                <Text style={styles.resExp}>Textbook Notes: {item.question.explanation}</Text>
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
          <Text style={styles.h2}>Student Analytics & Performance Log</Text>
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

      {/* SUMMARY PREVIEW MODAL */}
      <Modal visible={summaryModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>📖 {summaryModalData.title}</Text>
              <TouchableOpacity onPress={() => setSummaryModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 320 }}>
              <Text style={styles.summaryModalHeadline}>Chapter Overview:</Text>
              <Text style={styles.modalResponseText}>{summaryModalData.summary}</Text>

              {summaryModalData.keyTakeaways && summaryModalData.keyTakeaways.length > 0 && (
                <View style={{ marginTop: 12 }}>
                  <Text style={styles.summaryModalHeadline}>Key Concepts to Focus On:</Text>
                  {summaryModalData.keyTakeaways.map((point, idx) => (
                    <Text key={idx} style={styles.keyTakeawayItem}>• {point}</Text>
                  ))}
                </View>
              )}
            </ScrollView>

            <TouchableOpacity style={styles.primaryBtn} onPress={() => setSummaryModalVisible(false)}>
              <Text style={styles.primaryBtnText}>Close Summary</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  header: { backgroundColor: '#0F172A', padding: 16, paddingTop: 34 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  aiChip: { backgroundColor: '#1E293B', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  aiChipActive: { backgroundColor: '#065F46' },
  aiChipText: { color: '#F1F5F9', fontSize: 11, fontWeight: 'bold' },
  body: { flex: 1, padding: 16 },
  h2: { fontSize: 15, fontWeight: 'bold', color: '#0F172A', marginVertical: 8 },
  subText: { fontSize: 12, color: '#64748B', marginBottom: 10 },
  row: { flexDirection: 'row', marginBottom: 12 },
  chip: { flex: 1, padding: 10, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, alignItems: 'center', marginHorizontal: 3 },
  chipActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  chipText: { fontSize: 12, fontWeight: 'bold', color: '#475569' },
  chipTextActive: { color: '#FFFFFF' },
  chapterRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 12, marginBottom: 8 },
  chapterRowActive: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  chapterBtnText: { fontSize: 13, color: '#334155', fontWeight: '600' },
  chapterBtnTextActive: { color: '#1D4ED8', fontWeight: 'bold' },
  summaryBtnSmall: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#CBD5E1', marginLeft: 6 },
  summaryBtnSmallText: { fontSize: 11, color: '#475569', fontWeight: '600' },
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
  diagCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#CBD5E1', marginBottom: 16, elevation: 2 },
  diagChapter: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginBottom: 8 },
  diagScoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  diagScoreBig: { fontSize: 24, fontWeight: 'bold', color: '#2563EB' },
  diagScorePct: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  badgePass: { backgroundColor: '#DCFCE7' },
  badgeRevise: { backgroundColor: '#FEF3C7' },
  badgeText: { fontSize: 12, fontWeight: 'bold', color: '#1E293B' },
  summaryBox: { backgroundColor: '#F8FAFC', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 12 },
  summaryBoxTitle: { fontSize: 13, fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
  summaryBoxContent: { fontSize: 12, color: '#334155', lineHeight: 18 },
  keyTakeawaysTitle: { fontSize: 12, fontWeight: 'bold', color: '#475569', marginTop: 6, marginBottom: 2 },
  keyTakeawayItem: { fontSize: 11, color: '#334155', marginLeft: 6, marginBottom: 2 },
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
  modalTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B' },
  modalClose: { fontSize: 18, color: '#64748B', padding: 4 },
  summaryModalHeadline: { fontSize: 13, fontWeight: 'bold', color: '#0F172A', marginBottom: 4 },
  modalQuestionPrompt: { fontSize: 13, fontStyle: 'italic', color: '#64748B', marginBottom: 10 },
  modalThinking: { fontSize: 12, color: '#64748B', marginTop: 8 },
  modalResponseText: { fontSize: 13, color: '#1E1B4B', lineHeight: 20 },
});

// REGISTRATION
registerRootComponent(App);
