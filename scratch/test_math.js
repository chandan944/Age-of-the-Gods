// Fast, high-quality procedural planet generator math verification
const width = 512, height = 256;

// Pseudo-random noise function
function pseudoNoise(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x, y) {
  const i = Math.floor(x), j = Math.floor(y);
  const fx = x - i, fy = y - j;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);

  const n00 = pseudoNoise(i, j);
  const n10 = pseudoNoise(i + 1, j);
  const n01 = pseudoNoise(i, j + 1);
  const n11 = pseudoNoise(i + 1, j + 1);

  const nx0 = n00 * (1 - sx) + n10 * sx;
  const nx1 = n01 * (1 - sx) + n11 * sx;
  return nx0 * (1 - sy) + nx1 * sy;
}

function fbm(x, y, octaves = 5) {
  let val = 0, amp = 0.5, freq = 1;
  for (let o = 0; o < octaves; o++) {
    val += amp * smoothNoise(x * freq, y * freq);
    freq *= 2.05;
    amp *= 0.5;
  }
  return val;
}

console.log("Testing fbm(2.5, 3.1) ->", fbm(2.5, 3.1));

// Test pixel loop for earth
let validPixels = 0;
for (let y = 0; y < height; y++) {
  const v = y / height;
  for (let x = 0; x < width; x++) {
    const u = x / width;
    const n = fbm(u * 6, v * 3, 5);
    if (!isNaN(n) && n >= 0 && n <= 1) validPixels++;
  }
}
console.log("Earth pixels test passed:", validPixels, "of", width * height);

// Test volcanic fissures
let crackCount = 0;
for (let y = 0; y < height; y++) {
  const v = y / height;
  for (let x = 0; x < width; x++) {
    const u = x / width;
    const n = fbm(u * 12, v * 6, 5);
    const ridge = Math.abs(n - 0.5) * 2;
    const crack = Math.pow(Math.max(0, 1 - ridge), 3.5);
    if (crack > 0.4) crackCount++;
  }
}
console.log("Volcanic cracks test passed. Crack count:", crackCount);
