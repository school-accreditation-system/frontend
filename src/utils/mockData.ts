// Utility to generate mock/dummy data for development and testing

import { format } from 'date-fns';

// Generate a random date within the last 2 years
const generateRandomDate = () => {
  const now = new Date();
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(now.getFullYear() - 2);
  
  const randomTimestamp = twoYearsAgo.getTime() + Math.random() * (now.getTime() - twoYearsAgo.getTime());
  return new Date(randomTimestamp);
};

// Generate a formatted date string
const formatDate = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};

// Generate a random accreditation score between 60 and 100
const generateRandomScore = () => {
  return Math.floor(Math.random() * 41) + 60; // 60-100 range
};

// Available school types
const schoolTypes = ['Public', 'Private', 'Charter', 'International'];
const schoolLevels = ['Pre-Primary', 'Primary', 'O-Level', 'A-Level', 'TVET'];
const provinces = ['Kigali', 'Eastern Province', 'Western Province', 'Northern Province', 'Southern Province'];
const districts = {
  'Kigali': ['Nyarugenge', 'Gasabo', 'Kicukiro'],
  'Eastern Province': ['Bugesera', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Nyagatare', 'Rwamagana'],
  'Western Province': ['Karongi', 'Ngororero', 'Nyabihu', 'Nyamasheke', 'Rubavu', 'Rusizi', 'Rutsiro'],
  'Northern Province': ['Burera', 'Gakenke', 'Gicumbi', 'Musanze', 'Rulindo'],
  'Southern Province': ['Gisagara', 'Huye', 'Kamonyi', 'Muhanga', 'Nyamagabe', 'Nyanza', 'Nyaruguru', 'Ruhango'],
};

// Generate combinations for a school
const generateCombinations = () => {
  const combinations = [
    { id: '1', name: 'PCB' },
    { id: '2', name: 'PCM' },
    { id: '3', name: 'MEG' },
    { id: '4', name: 'MPC' },
    { id: '5', name: 'MCB' },
    { id: '6', name: 'History' },
    { id: '7', name: 'Geography' },
    { id: '8', name: 'Literature' },
    { id: '9', name: 'ICT' },
    { id: '10', name: 'Primary Education' },
    { id: '11', name: 'Early Childhood' },
  ];
  
  // Randomly select between 1 and 4 combinations
  const numCombinations = Math.floor(Math.random() * 4) + 1;
  const shuffled = combinations.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numCombinations);
};

// Function to create dummy school data
export const generateDummySchools = (count: number = 15) => {
  const schools = [];
  
  for (let i = 1; i <= count; i++) {
    // Randomly select province and district
    const province = provinces[Math.floor(Math.random() * provinces.length)];
    const provinceDistricts = districts[province];
    const district = provinceDistricts[Math.floor(Math.random() * provinceDistricts.length)];
    
    // Create school object
    schools.push({
      id: i.toString(),
      name: `School ${i}${i % 3 === 0 ? ' Academy' : i % 5 === 0 ? ' High School' : ' College'}`,
      email: `info@school${i}.edu.rw`,
      phoneNumber: `+250 788 ${100000 + Math.floor(Math.random() * 900000)}`,
      province: province,
      district: district,
      type: schoolTypes[Math.floor(Math.random() * schoolTypes.length)],
      level: schoolLevels[Math.floor(Math.random() * schoolLevels.length)],
      combinations: generateCombinations(),
      assessments: Array(Math.floor(Math.random() * 3) + 1).fill(null).map(() => ({
        id: Math.random().toString(36).substring(2, 9),
        date: formatDate(generateRandomDate())
      })),
      accreditedAt: formatDate(generateRandomDate()),
      updatedAt: formatDate(new Date()),
      score: generateRandomScore(),
      status: Math.random() > 0.2 ? 'Accredited' : 'Provisional',
      website: `www.school${i}.edu.rw`,
      address: `${district}, ${province}`
    });
  }
  
  return schools;
};

// Generate dummy school with specific id (for details page)
export const generateDummySchool = (id: string) => {
  const province = provinces[Math.floor(Math.random() * provinces.length)];
  const provinceDistricts = districts[province];
  const district = provinceDistricts[Math.floor(Math.random() * provinceDistricts.length)];
  
  return {
    id: id,
    name: `School ${id}${parseInt(id) % 3 === 0 ? ' Academy' : parseInt(id) % 5 === 0 ? ' High School' : ' College'}`,
    email: `info@school${id}.edu.rw`,
    phoneNumber: `+250 788 ${100000 + Math.floor(Math.random() * 900000)}`,
    province: province,
    district: district,
    type: schoolTypes[Math.floor(Math.random() * schoolTypes.length)],
    level: schoolLevels[Math.floor(Math.random() * schoolLevels.length)],
    combinations: generateCombinations(),
    assessments: Array(Math.floor(Math.random() * 3) + 1).fill(null).map(() => ({
      id: Math.random().toString(36).substring(2, 9),
      date: formatDate(generateRandomDate())
    })),
    accreditedAt: formatDate(generateRandomDate()),
    updatedAt: formatDate(new Date()),
    score: generateRandomScore(),
    status: Math.random() > 0.2 ? 'Accredited' : 'Provisional',
    website: `www.school${id}.edu.rw`,
    address: `${district}, ${province}`,
    accreditation: Math.random() > 0.5 ? 'Full' : 'Conditional',
    description: `School ${id} is a ${schoolTypes[Math.floor(Math.random() * schoolTypes.length)].toLowerCase()} school located in ${district}, ${province}. It offers ${schoolLevels[Math.floor(Math.random() * schoolLevels.length)]} education with a focus on quality and excellence.`,
    yearEstablished: 2000 + Math.floor(Math.random() * 23),
    studentCount: 200 + Math.floor(Math.random() * 800),
    teacherCount: 20 + Math.floor(Math.random() * 40),
    facilities: [
      'Library',
      'Computer Lab',
      'Science Lab',
      'Sports Field',
      'Dormitories',
      'Cafeteria',
      'Smart Classrooms'
    ].filter(() => Math.random() > 0.3)
  };
};