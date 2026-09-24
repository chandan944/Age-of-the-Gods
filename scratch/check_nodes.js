const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find TREE_DATA
const startIdx = html.indexOf('const TREE_DATA =');
console.log('TREE_DATA found at index:', startIdx);
if (startIdx !== -1) {
  const jsonStart = html.indexOf('[', startIdx);
  const jsonEnd = html.indexOf(';\n', jsonStart);
  try {
    const data = JSON.parse(html.substring(jsonStart, jsonEnd));
    console.log('Total nodes:', data.length);
    const brahman = data.find(n => n.id === 'brahman');
    console.log('Brahman coords:', brahman ? { x: brahman.x, y: brahman.y, z: brahman.z } : 'none');
    const narasimha = data.find(n => n.id.includes('narasimha'));
    console.log('Narasimha coords:', narasimha ? { id: narasimha.id, x: narasimha.x, y: narasimha.y, z: narasimha.z } : 'none');
  } catch (e) {
    console.error('Parse error:', e.message);
  }
}
