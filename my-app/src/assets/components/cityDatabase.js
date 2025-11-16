// cityDatabase.js - Comprehensive city attractions and information

export const cityDatabase = {
  'Delhi': {
    attractions: [
      { name: 'India Gate', description: 'Iconic war memorial built in 1931', time: '1-2 hours', bestTime: 'Evening', category: 'Monument', tips: 'Perfect for evening walks and photography', image: 'https://s7ap1.scene7.com/is/image/incredibleindia/india-gate-delhi-2-attr-hero?qlt=82&ts=1742164655647' },
      { name: 'Red Fort', description: 'Historic Mughal fortress and UNESCO World Heritage Site', time: '2-3 hours', bestTime: 'Morning', category: 'Historical', tips: 'Visit early to avoid crowds, watch light and sound show', image: 'https://wanderwisdom.com/.image/w_3840,q_auto:good,c_limit/MjAzNDMwNzE1ODA1NjcyNzk2/fort-agra-easy-peasy.jpg' },
      { name: 'Qutub Minar', description: 'Tallest brick minaret in the world at 73 meters', time: '2 hours', bestTime: 'Morning', category: 'Monument', tips: 'UNESCO site, explore the ancient iron pillar', image: 'https://s7ap1.scene7.com/is/image/incredibleindia/qutab-minar-delhi-attr-hero?qlt=82&ts=1742169673469' },
      { name: 'Lotus Temple', description: 'Bahai House of Worship shaped like lotus', time: '1 hour', bestTime: 'Afternoon', category: 'Religious', tips: 'Maintain silence inside', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/LotusDelhi.jpg' },
      { name: "Humayuns Tomb", description: 'Persian-style Mughal tomb with gardens', time: '2 hours', bestTime: 'Morning', category: 'Historical', tips: 'UNESCO site, inspiration for Taj Mahal', image: 'https://pohcdn.com/sites/default/files/styles/paragraph__hero_banner__hb_image__1880bp/public/hero_banner/humayun%27s-tomb_optimized.jpg' },
      { name: 'Chandni Chowk', description: 'Historic market and food hub', time: '2-3 hours', bestTime: 'Evening', category: 'Shopping', tips: 'Try parathas at Paranthe Wali Gali', image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/e4/c8/c2.jpg' }
    ],
    cuisine: ['Butter Chicken', 'Chole Bhature', 'Parathas', 'Kebabs', 'Chaat'],
    bestSeason: 'October to March (15-25°C)',
    localTransport: 'Metro, Auto-rickshaw, Uber/Ola, DTC Buses'
  },


  'Mumbai': {
    attractions: [
      { name: 'Gateway of India', description: '26m high basalt arch monument', time: '1 hour', bestTime: 'Morning', category: 'Monument', tips: 'Take ferry to Elephanta Caves', image: 'https://media1.thrillophilia.com/filestore/a6xfgd96rla05y092cy5emcpi9pu_1574833817_shutterstock_566137291.jpg?w=400&dpr=2' },
      { name: 'Marine Drive', description: 'C-shaped promenade known as Queens Necklace', time: '1-2 hours', bestTime: 'Evening', category: 'Beach', tips: 'Best sunset views', image: 'https://res.cloudinary.com/kmadmin/image/upload/v1743244200/kiomoi/marine-drive-2_3907.webp' },
      { name: 'Elephanta Caves', description: 'UNESCO rock-cut cave temples', time: '4 hours', bestTime: 'Morning', category: 'Historical', tips: 'Closed Mondays', image: 'https://vajiramandravi.com/current-affairs/wp-content/uploads/2025/04/elephanta_caves.jpg' },
      { name: 'Colaba Causeway', description: 'Bustling shopping street', time: '2-3 hours', bestTime: 'Afternoon', category: 'Shopping', tips: 'Visit Leopold Cafe', image: 'https://media1.thrillophilia.com/filestore/0c2q6sb29aiy9jik8bu7vkjn2ca1_veqww3aozq4nadv1c6tl77cry8l3_shutterstock_1123949642.webp' },
      { name: 'Juhu Beach', description: 'Popular beach with food stalls', time: '2 hours', bestTime: 'Evening', category: 'Beach', tips: 'Try bhel puri and pav bhaji', image: 'https://s7ap1.scene7.com/is/image/incredibleindia/juhu-beach-mumbai-maharashtra-2-musthead-hero?qlt=82&ts=1742167931841' },
      { name: 'Chhatrapati Shivaji Terminus', description: 'Victorian Gothic UNESCO station', time: '1 hour', bestTime: 'Evening', category: 'Historical', tips: 'Beautifully lit at night', image: 'https://pohcdn.com/sites/default/files/styles/paragraph__hero_banner__hb_image__1880bp/public/hero_banner/station.jpg' }
    ],
    cuisine: ['Vada Pav', 'Pav Bhaji', 'Bombay Sandwich', 'Seafood', 'Misal Pav'],
    bestSeason: 'November to February (20-30°C)',
    localTransport: 'Local Train, Metro, Auto, BEST Buses'
  },


  'Bangalore': {
    attractions: [
      { name: 'Lalbagh Garden', description: 'Historic 240-acre botanical garden with glass house', time: '2-3 hours', bestTime: 'Morning', category: 'Nature', tips: 'Republic Day flower show is spectacular', image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=500' },
      { name: 'Cubbon Park', description: '300-acre green lung of the city', time: '1-2 hours', bestTime: 'Morning', category: 'Nature', tips: 'Perfect for morning walks and jogging', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500' },
      { name: 'Bangalore Palace', description: 'Tudor-style palace with beautiful architecture', time: '2 hours', bestTime: 'Afternoon', category: 'Historical', tips: 'Audio guide available, photography allowed', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500' },
      { name: 'ISKCON Temple', description: 'Beautiful Krishna temple with modern architecture', time: '1-2 hours', bestTime: 'Evening', category: 'Religious', tips: 'Attend evening aarti, vegetarian food available', image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=500' },
      { name: 'Nandi Hills', description: 'Hill station 60km away, sunrise point', time: '4-5 hours', bestTime: 'Early Morning', category: 'Nature', tips: 'Start at 4 AM for sunrise, paragliding available', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500' },
      { name: 'Vidhana Soudha', description: 'Legislative building with neo-Dravidian architecture', time: '1 hour', bestTime: 'Evening', category: 'Sightseeing', tips: 'Beautifully lit at night, entry restricted', image: 'https://images.unsplash.com/photo-1588084705271-7f71b61c21f5?w=500' }
    ],
    cuisine: ['Masala Dosa', 'Bisi Bele Bath', 'Filter Coffee', 'Idli Vada', 'Ragi Mudde'],
    bestSeason: 'September to February (15-28°C)',
    localTransport: 'Namma Metro (best option), Uber/Ola, BMTC Buses, Auto-rickshaw'
  },

  'Kolkata': {
    attractions: [
      { name: 'Victoria Memorial', description: 'Iconic white marble building and museum', time: '2-3 hours', bestTime: 'Morning', category: 'Historical', tips: 'Son et Lumiere show in evening', image: 'https://images.hindustantimes.com/img/2021/02/05/1600x900/24d6db7c-6645-11eb-9024-f0893c954548_1612522413279.jpg' },
      { name: 'Howrah Bridge', description: 'Iconic cantilever bridge over Hooghly River', time: '1 hour', bestTime: 'Evening', category: 'Monument', tips: 'Best viewed from Prinsep Ghat', image: 'https://housing.com/news/wp-content/uploads/2023/04/Howrah-Bridge-Kolkata-Fact-guide-f.jpg' },
      { name: 'Dakshineswar Temple', description: 'Famous Kali temple on Hooghly banks', time: '1-2 hours', bestTime: 'Morning', category: 'Religious', tips: 'Ramakrishna lived here, peaceful atmosphere', image: 'https://i0.wp.com/traveldreams.live/wp-content/uploads/2020/11/2-4.jpg?resize=696%2C720&ssl=1' },
      { name: 'Indian Museum', description: 'Oldest and largest museum in India', time: '2-3 hours', bestTime: 'Afternoon', category: 'Sightseeing', tips: 'Egyptian mummy, Buddhist stupas collection', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Indian_Museum%2C_Courtyard%2C_Kolkata%2C_India.jpg' },
      { name: 'Park Street', description: 'Famous street with restaurants and nightlife', time: '2-3 hours', bestTime: 'Evening', category: 'Shopping', tips: 'Christmas decorations are spectacular', image: 'https://www.getbengal.com/uploads/story_image/Park-Street-2020.jpg' },
      { name: 'Science City', description: 'Largest science center in Indian subcontinent', time: '3-4 hours', bestTime: 'Morning', category: 'Entertainment', tips: 'Great for kids, 3D shows available', image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Science_City_Kolkata_4643.JPG' }
    ],
    cuisine: ['Rosogolla', 'Macher Jhol', 'Kathi Rolls', 'Mishti Doi', 'Puchka'],
    bestSeason: 'October to March (12-27°C)',
    localTransport: 'Metro, Yellow Taxi, Uber/Ola, Tram, Local Bus'
  },

  'Chennai': {
    attractions: [
      { name: 'Marina Beach', description: 'Second longest urban beach in the world', time: '2-3 hours', bestTime: 'Evening', category: 'Beach', tips: 'Try sundal and murukku snacks', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500' },
      { name: 'Kapaleeshwarar Temple', description: 'Ancient Dravidian architecture Shiva temple', time: '1-2 hours', bestTime: 'Morning', category: 'Religious', tips: 'Dress modestly, photography restricted', image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=500' },
      { name: 'Fort St. George', description: 'First English fortress in India, museum inside', time: '2 hours', bestTime: 'Morning', category: 'Historical', tips: 'British colonial artifacts, old cannons', image: 'https://images.unsplash.com/photo-1588084705271-7f71b61c21f5?w=500' },
      { name: 'San Thome Cathedral', description: 'Neo-Gothic Roman Catholic basilica', time: '1 hour', bestTime: 'Afternoon', category: 'Religious', tips: 'Built over tomb of St. Thomas', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500' },
      { name: 'Mahabalipuram', description: 'UNESCO site with rock-cut temples', time: '4-5 hours', bestTime: 'Morning', category: 'Historical', tips: '55km from Chennai, visit Shore Temple', image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=500' },
      { name: 'VGP Universal Kingdom', description: 'Popular amusement park with water rides', time: '4-5 hours', bestTime: 'Morning', category: 'Entertainment', tips: 'Avoid weekends, carry swimwear', image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=500' }
    ],
    cuisine: ['Idli Sambar', 'Dosa', 'Filter Coffee', 'Chettinad Chicken', 'Pongal'],
    bestSeason: 'November to February (20-30°C)',
    localTransport: 'Metro, Uber/Ola, Auto-rickshaw, MTC Buses'
  },

  'Hyderabad': {
    attractions: [
      { name: 'Charminar', description: 'Iconic 400-year-old monument with four minarets', time: '1-2 hours', bestTime: 'Evening', category: 'Monument', tips: 'Climb 149 steps for city views', image: 'https://tourism.telangana.gov.in/storage/app/media/charminar-landscape.jpg' },
      { name: 'Golconda Fort', description: 'Medieval fort with acoustic architecture', time: '3 hours', bestTime: 'Morning', category: 'Historical', tips: 'Sound and light show in evening', image: 'https://www.savaari.com/blog/wp-content/uploads/2022/10/Golkonda-fort.jpg' },
      { name: 'Ramoji Film City', description: 'Worlds largest film studio complex', time: '6-7 hours', bestTime: 'Morning', category: 'Entertainment', tips: 'Book full day tour, includes lunch', image: 'https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/j8ppa0xypsdu6mgszudb.jpg' },
      { name: 'Hussain Sagar Lake', description: 'Heart-shaped lake with Buddha statue', time: '1-2 hours', bestTime: 'Evening', category: 'Nature', tips: 'Take boat ride to see Buddha statue', image: 'https://www.hlimg.com/images/things2do/738X538/Hussain-Sagar-1_1523097561t.jpg?w=400&dpr=2.6' },
      { name: 'Salar Jung Museum', description: 'One of largest museums with global artifacts', time: '2-3 hours', bestTime: 'Afternoon', category: 'Sightseeing', tips: 'See Veiled Rebecca sculpture', image: 'https://deccanserai.com/wp-content/uploads/2025/01/Deccan-sarai-salar.jpg' },
      { name: 'Birla Mandir', description: 'White marble temple on hillock', time: '1 hour', bestTime: 'Evening', category: 'Religious', tips: 'Panoramic city views, peaceful atmosphere', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Birla_Mandir%2C_Hyderabad.png/1200px-Birla_Mandir%2C_Hyderabad.png' }
    ],
    cuisine: ['Hyderabadi Biryani', 'Haleem', 'Qubani ka Meetha', 'Irani Chai', 'Osmania Biscuits'],
    bestSeason: 'October to February (15-28°C)',
    localTransport: 'Metro (best option), Uber/Ola, TSRTC Buses, Auto-rickshaw'
  },

  'Pune': {
    attractions: [
      { name: 'Shaniwar Wada', description: 'Historic fortification and palace of Peshwas', time: '2 hours', bestTime: 'Evening', category: 'Historical', tips: 'Sound and light show is excellent', image: 'https://hblimg.mmtcdn.com/content/hubble/img/pune/mmt/activities/m_activities_pune_shaniwar_wada_l_387_579.jpg' },
      { name: 'Aga Khan Palace', description: 'Historic monument, Gandhi was imprisoned here', time: '1-2 hours', bestTime: 'Morning', category: 'Historical', tips: 'Gandhi memorial inside, peaceful gardens', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/ac/cb/70/the-palace.jpg?w=1200&h=-1&s=1' },
      { name: 'Sinhagad Fort', description: 'Hill fort with historical significance', time: '3-4 hours', bestTime: 'Morning', category: 'Historical', tips: 'Trek or drive, try Zunka Bhakri', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500' },
      { name: 'Dagdusheth Ganpati', description: 'Famous Ganesh temple, 130 years old', time: '1 hour', bestTime: 'Morning', category: 'Religious', tips: 'Very crowded during Ganesh Chaturthi', image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=500' },
      { name: 'Osho Ashram', description: 'International meditation resort', time: '2-3 hours', bestTime: 'Morning', category: 'Religious', tips: 'Register in advance, dress code strict', image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=500' },
      { name: 'Parvati Hill', description: 'Hillock with temples and city views', time: '2 hours', bestTime: 'Evening', category: 'Religious', tips: 'Climb 108 steps, sunset views', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500' }
    ],
    cuisine: ['Misal Pav', 'Puran Poli', 'Vada Pav', 'Mastani', 'Bakarwadi'],
    bestSeason: 'October to February (12-30°C)',
    localTransport: 'Auto-rickshaw, Uber/Ola, PMPML Buses, Metro (under construction)'
  },

  'Ahmedabad': {
    attractions: [
      { name: 'Sabarmati Ashram', description: 'Gandhis residence for 12 years', time: '1-2 hours', bestTime: 'Morning', category: 'Historical', tips: 'Museum with Gandhis belongings', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500' },
      { name: 'Kankaria Lake', description: 'Circular lake with recreational activities', time: '2-3 hours', bestTime: 'Evening', category: 'Nature', tips: 'Balloon safari, toy train, zoo nearby', image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=500' },
      { name: 'Sidi Saiyyed Mosque', description: 'Famous for intricate stone lattice work', time: '1 hour', bestTime: 'Afternoon', category: 'Religious', tips: 'Tree of Life jali work is iconic', image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=500' },
      { name: 'Adalaj Stepwell', description: '5-story stepwell with intricate carvings', time: '1-2 hours', bestTime: 'Morning', category: 'Historical', tips: '19km from city, beautiful architecture', image: 'https://images.unsplash.com/photo-1588084705271-7f71b61c21f5?w=500' },
      { name: 'Auto World Museum', description: 'Vintage car collection, unique museum', time: '1-2 hours', bestTime: 'Afternoon', category: 'Sightseeing', tips: 'Over 100 vintage cars and bikes', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500' },
      { name: 'Akshardham Temple', description: 'Stunning Hindu temple complex', time: '2-3 hours', bestTime: 'Evening', category: 'Religious', tips: 'Sound and light show, no cameras allowed', image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=500' }
    ],
    cuisine: ['Dhokla', 'Thepla', 'Khandvi', 'Gujarati Thali', 'Fafda Jalebi'],
    bestSeason: 'November to February (12-30°C)',
    localTransport: 'BRTS, Auto-rickshaw, Uber/Ola, AMTS Buses'
  },

  'Jaipur': {
    attractions: [
      { name: 'Hawa Mahal', description: 'Palace of Winds with 953 windows', time: '1 hour', bestTime: 'Morning', category: 'Monument', tips: 'Best photos from across the street', image: 'https://images.unsplash.com/photo-1570478172766-7d870ebf5a28?w=500' },
      { name: 'Amber Fort', description: 'Majestic 16th century hilltop fort', time: '3 hours', bestTime: 'Morning', category: 'Historical', tips: 'Take elephant ride, visit Sheesh Mahal', image: 'https://images.unsplash.com/photo-1599661046289-e84cb1dd5a2f?w=500' },
      { name: 'City Palace', description: 'Royal residence with museums', time: '2-3 hours', bestTime: 'Morning', category: 'Historical', tips: 'See Chandra Mahal, royal costumes', image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09f?w=500' },
      { name: 'Jantar Mantar', description: 'UNESCO astronomical observatory', time: '1-2 hours', bestTime: 'Afternoon', category: 'Monument', tips: 'Hire guide to understand instruments', image: 'https://images.unsplash.com/photo-1599661046850-8e08f3a84402?w=500' },
      { name: 'Nahargarh Fort', description: 'Hilltop fort with panoramic views', time: '2 hours', bestTime: 'Evening', category: 'Historical', tips: 'Best sunset point in Jaipur', image: 'https://images.unsplash.com/photo-1599661046289-e84cb1dd5a2f?w=500' },
      { name: 'Jal Mahal', description: 'Water palace floating in lake', time: '1 hour', bestTime: 'Sunset', category: 'Monument', tips: 'Cannot enter, best viewed from shore', image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=500' }
    ],
    cuisine: ['Dal Baati Churma', 'Laal Maas', 'Ghewar', 'Pyaaz Kachori', 'Rajasthani Thali'],
    bestSeason: 'October to March (10-25°C)',
    localTransport: 'Auto-rickshaw, Uber/Ola, JCTSL Buses, Rent Car'
  },

  'Goa': {
    attractions: [
      { name: 'Baga Beach', description: 'Most popular beach with water sports', time: '3-4 hours', bestTime: 'Afternoon', category: 'Beach', tips: 'Parasailing, jet skiing, beach shacks', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500' },
      { name: 'Calangute Beach', description: 'Queen of beaches, largest in North Goa', time: '2-3 hours', bestTime: 'Evening', category: 'Beach', tips: 'Good for swimming, water sports', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500' },
      { name: 'Fort Aguada', description: '17th century Portuguese fort', time: '2 hours', bestTime: 'Morning', category: 'Historical', tips: 'Visit lighthouse, panoramic views', image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500' },
      { name: 'Basilica of Bom Jesus', description: 'UNESCO church with St. Francis Xavier', time: '1-2 hours', bestTime: 'Morning', category: 'Religious', tips: 'Baroque architecture, no photography', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500' },
      { name: 'Dudhsagar Falls', description: 'Four-tiered 310m high waterfall', time: '4-5 hours', bestTime: 'Morning', category: 'Nature', tips: 'Visit during monsoon, jeep safari', image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=500' },
      { name: 'Anjuna Flea Market', description: 'Famous Wednesday market', time: '2-3 hours', bestTime: 'Afternoon', category: 'Shopping', tips: 'Bargain hard, hippie jewelry, clothes', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500' }
    ],
    cuisine: ['Fish Curry Rice', 'Bebinca', 'Vindaloo', 'Xacuti', 'Feni'],
    bestSeason: 'November to February (20-30°C)',
    localTransport: 'Rent Scooter/Bike (best), Taxi, Auto-rickshaw, Local Bus'
  },

  'Kochi': {
    attractions: [
      { name: 'Fort Kochi', description: 'Historic area with colonial architecture', time: '3-4 hours', bestTime: 'Morning', category: 'Historical', tips: 'Explore on foot, visit Dutch Palace', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500' },
      { name: 'Chinese Fishing Nets', description: 'Iconic giant fishing nets', time: '1 hour', bestTime: 'Sunset', category: 'Sightseeing', tips: 'Best at sunset, buy fresh fish', image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=500' },
      { name: 'Mattancherry Palace', description: 'Portuguese palace with Kerala murals', time: '1-2 hours', bestTime: 'Morning', category: 'Historical', tips: 'Dutch Palace, closed on Fridays', image: 'https://images.unsplash.com/photo-1588084705271-7f71b61c21f5?w=500' },
      { name: 'Marine Drive', description: 'Waterfront promenade', time: '1-2 hours', bestTime: 'Evening', category: 'Sightseeing', tips: 'Evening walks, street food', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500' },
      { name: 'Jew Town', description: 'Historic Jewish quarter with antique shops', time: '2 hours', bestTime: 'Afternoon', category: 'Shopping', tips: 'Visit Paradesi Synagogue', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=500' },
      { name: 'Backwaters', description: 'Houseboat cruises through canals', time: 'Full Day', bestTime: 'Morning', category: 'Nature', tips: 'Book overnight houseboat stay', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500' }
    ],
    cuisine: ['Appam', 'Kerala Fish Curry', 'Puttu', 'Banana Chips', 'Sadya'],
    bestSeason: 'September to March (23-32°C)',
    localTransport: 'Auto-rickshaw, Metro, Uber/Ola, Ferries, KSRTC Buses'
  },

  'Chandigarh': {
    attractions: [
      { name: 'Rock Garden', description: 'Sculpture garden made from recycled materials', time: '2-3 hours', bestTime: 'Morning', category: 'Sightseeing', tips: 'Unique art installation, photogenic', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500' },
      { name: 'Sukhna Lake', description: 'Artificial lake with boating', time: '2 hours', bestTime: 'Evening', category: 'Nature', tips: 'Paddle boating, evening walks', image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=500' },
      { name: 'Rose Garden', description: 'Asias largest rose garden', time: '1-2 hours', bestTime: 'Morning', category: 'Nature', tips: 'Best in Feb-March during rose festival', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500' },
      { name: 'Capitol Complex', description: 'Le Corbusier designed government buildings', time: '1 hour', bestTime: 'Afternoon', category: 'Sightseeing', tips: 'UNESCO site, modernist architecture', image: 'https://images.unsplash.com/photo-1588084705271-7f71b61c21f5?w=500' },
      { name: 'Elante Mall', description: 'Largest mall in northern India', time: '2-3 hours', bestTime: 'Evening', category: 'Shopping', tips: 'Shopping, food court, multiplex', image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=500' },
      { name: 'Sector 17 Market', description: 'Central shopping and entertainment hub', time: '2 hours', bestTime: 'Evening', category: 'Shopping', tips: 'Street shopping, cafes, fountain', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=500' }
    ],
    cuisine: ['Chole Bhature', 'Butter Chicken', 'Amritsari Kulcha', 'Lassi', 'Tikki'],
    bestSeason: 'October to March (8-25°C)',
    localTransport: 'Auto-rickshaw, Uber/Ola, CTU Buses, Bicycle'
  },

  'Lucknow': {
    attractions: [
      { name: 'Bara Imambara', description: 'Asafis palace with Bhool Bhulaiya maze', time: '2-3 hours', bestTime: 'Morning', category: 'Historical', tips: 'Explore maze, rooftop views', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500' },
      { name: 'Rumi Darwaza', description: 'Imposing 60-foot gateway', time: '30 mins', bestTime: 'Evening', category: 'Monument', tips: 'Turkish gateway, lit beautifully at night', image: 'https://images.unsplash.com/photo-1588084705271-7f71b61c21f5?w=500' },
      { name: 'Chota Imambara', description: 'Decoration with chandeliers and lights', time: '1 hour', bestTime: 'Evening', category: 'Religious', tips: 'Beautiful during Muharram', image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=500' },
      { name: 'Hazratganj Market', description: 'Premier shopping district', time: '2-3 hours', bestTime: 'Evening', category: 'Shopping', tips: 'Try Tunday Kababi, shopping arcade', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=500' },
      { name: 'British Residency', description: 'Ruins from 1857 revolt', time: '1-2 hours', bestTime: 'Afternoon', category: 'Historical', tips: 'Historical significance, peaceful gardens', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500' },
      { name: 'Ambedkar Park', description: 'Memorial park with grand architecture', time: '1-2 hours', bestTime: 'Evening', category: 'Sightseeing', tips: 'Beautifully maintained, statues', image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=500' }
    ],
    cuisine: ['Tunday Kabab', 'Biryani', 'Sheermal', 'Basket Chaat', 'Makhan Malai'],
    bestSeason: 'October to March (10-25°C)',
    localTransport: 'Auto-rickshaw, Uber/Ola, Metro (under construction), City Buses'
  },

  'Indore': {
    attractions: [
      { name: 'Rajwada Palace', description: 'Historic 7-story palace', time: '1-2 hours', bestTime: 'Evening', category: 'Historical', tips: 'Holkar dynasty palace, night lighting', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500' },
      { name: 'Lal Bagh Palace', description: 'Grand palace with European architecture', time: '2 hours', bestTime: 'Morning', category: 'Historical', tips: 'Holkar rulers residence, museum', image: 'https://images.unsplash.com/photo-1588084705271-7f71b61c21f5?w=500' },
      { name: 'Sarafa Bazaar', description: 'Famous night food market', time: '2-3 hours', bestTime: 'Night', category: 'Shopping', tips: 'Street food paradise, open after 8 PM', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500' },
      { name: 'Khajrana Ganesh Temple', description: 'Popular Ganesh temple', time: '1 hour', bestTime: 'Morning', category: 'Religious', tips: 'Very crowded on Wednesdays', image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=500' },
      { name: 'Patalpani Waterfall', description: 'Scenic waterfall 35km away', time: '3-4 hours', bestTime: 'Monsoon', category: 'Nature', tips: 'Trek to waterfall, best in rains', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500' },
      { name: 'Ralamandal', description: 'Wildlife sanctuary with deer park', time: '2-3 hours', bestTime: 'Morning', category: 'Nature', tips: 'Picnic spot, observatory tower', image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=500' }
    ],
    cuisine: ['Poha Jalebi', 'Bhutte ka Kees', 'Dal Bafla', 'Garadu', 'Sabudana Khichdi'],
    bestSeason: 'October to March (10-28°C)',
    localTransport: 'Auto-rickshaw, Uber/Ola, AICTSL Buses'
  },

  'Bhopal': {
    attractions: [
      { name: 'Upper Lake', description: 'Largest artificial lake in Asia', time: '2-3 hours', bestTime: 'Evening', category: 'Nature', tips: 'Boating, sunset views, Van Vihar nearby', image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=500' },
      { name: 'Taj-ul-Masajid', description: 'One of largest mosques in India', time: '1-2 hours', bestTime: 'Morning', category: 'Religious', tips: 'Pink facade, impressive architecture', image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=500' },
      { name: 'Van Vihar', description: 'National park and zoo', time: '2-3 hours', bestTime: 'Morning', category: 'Nature', tips: 'Safari, tigers, leopards, birds', image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=500' },
      { name: 'Bhimbetka Caves', description: 'UNESCO rock shelters with cave paintings', time: '3-4 hours', bestTime: 'Morning', category: 'Historical', tips: '45km away, prehistoric art, guide recommended', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500' },
      { name: 'Sanchi Stupa', description: 'UNESCO Buddhist monument', time: '3-4 hours', bestTime: 'Morning', category: 'Religious', tips: '46km away, ancient Buddhist site', image: 'https://images.unsplash.com/photo-1588084705271-7f71b61c21f5?w=500' },
      { name: 'Tribal Museum', description: 'Museum showcasing tribal culture', time: '2 hours', bestTime: 'Afternoon', category: 'Sightseeing', tips: 'Unique tribal artifacts, art gallery', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500' }
    ],
    cuisine: ['Bhopali Gosht Korma', 'Biryani', 'Poha', 'Jalebi', 'Seekh Kabab'],
    bestSeason: 'October to March (10-28°C)',
    localTransport: 'Auto-rickshaw, Uber/Ola, City Buses, Rent Car'
  }
};

// Helper function to get city data
export const getCityData = (cityName) => {
  return cityDatabase[cityName] || {
    attractions: [
      {
        name: `Popular Attraction in ${cityName}`,
        description: 'Must visit place in the city',
        time: '2 hours',
        bestTime: 'Morning',
        category: 'Sightseeing',
        tips: 'Book tickets in advance for best experience',
        image: `https://source.unsplash.com/400x300/?${cityName},landmark`
      },
      {
        name: `Famous Site in ${cityName}`,
        description: 'Popular tourist hotspot',
        time: '2 hours',
        bestTime: 'Afternoon',
        category: 'Sightseeing',
        tips: 'Visit during weekdays to avoid crowds',
        image: `https://source.unsplash.com/400x300/?${cityName},tourism`
      },
      {
        name: `Top Destination in ${cityName}`,
        description: 'Most visited place in city',
        time: '2 hours',
        bestTime: 'Evening',
        category: 'Sightseeing',
        tips: 'Carry camera for memorable photos',
        image: `https://source.unsplash.com/400x300/?${cityName},travel`
      }
    ],
    cuisine: ['Local Specialty', 'Street Food', 'Traditional Dish', 'Regional Cuisine'],
    bestSeason: 'October to March',
    localTransport: 'Auto-rickshaw, Taxi, Metro, Local Buses'
  };
};