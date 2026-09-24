// Test planet color algorithms and mapping logic
console.log("Checking planet generator logic...");

const PLANET_TYPES = ['earth', 'volcanic', 'purple_gas', 'ice_cryo', 'amber_desert', 'verdant', 'basalt_moon', 'crimson_rock'];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getPlanetTypeForNode(node) {
  const id = node.id || '';
  const cat = node.category || '';

  // Explicit mappings based on mythology & visual matching with user image
  if (id === 'brahman') return 'amber_desert';
  if (id === 'shiva' || id === 'parvati' || id === 'ganga' || id === 'himalayas') return 'ice_cryo';
  if (id === 'kali' || id === 'durga' || id === 'lanka_war' || id === 'kurukshetra' || id === 'kurukshetra_war' || id === 'kali_yuga') return 'volcanic';
  if (id === 'vishnu' || id === 'shesha' || id === 'krishna' || id === 'indra' || id === 'dvapara_yuga') return 'purple_gas';
  if (id === 'prithvi' || id === 'manu' || id === 'sita' || id === 'matsya' || id === 'varuna') return 'earth';
  if (id === 'surya' || id === 'aditi' || id === 'satya_yuga' || id === 'hiranyagarbha' || id === 'brahma') return 'amber_desert';
  if (id === 'treta_yuga' || id === 'vanara' || id === 'ayodhya' || id === 'kadru') return 'verdant';
  if (id === 'mahapralaya' || id === 'kalki' || id === 'diti') return 'basalt_moon';
  if (id === 'narasimha' || id === 'parashurama' || id === 'ravana') return 'crimson_rock';

  // Category fallback
  if (cat === 'war') return 'volcanic';
  if (cat === 'avatar') {
    const list = ['earth', 'volcanic', 'purple_gas', 'ice_cryo'];
    return list[hashString(id) % list.length];
  }

  return PLANET_TYPES[hashString(id) % PLANET_TYPES.length];
}

console.log("brahman ->", getPlanetTypeForNode({ id: 'brahman', category: 'cosmos' }));
console.log("shiva ->", getPlanetTypeForNode({ id: 'shiva', category: 'divine' }));
console.log("kali ->", getPlanetTypeForNode({ id: 'kali', category: 'divine' }));
console.log("vishnu ->", getPlanetTypeForNode({ id: 'vishnu', category: 'divine' }));
console.log("lanka_war ->", getPlanetTypeForNode({ id: 'lanka_war', category: 'war' }));
console.log("Success!");
