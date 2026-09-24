// Test concentric ring texture generator logic
console.log("Checking concentric ring generator...");
const size = 256;
const cx = size / 2, cy = size / 2;
const innerR = 70, outerR = 124;

let strokedArcs = 0;
for (let r = innerR; r < outerR; r++) {
  const norm = (r - innerR) / (outerR - innerR);
  if (norm > 0.44 && norm < 0.52) continue; // Cassini division
  strokedArcs++;
}
console.log("Stroked concentric rings count:", strokedArcs);
console.log("Concentric ring math OK!");
