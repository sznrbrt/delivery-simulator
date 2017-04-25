// Total 25 * 15;

// P is at index 149
// Vehicle initial pos is at 173

var cityMap = [
  'G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G',
  'G','G','G','G','H','H','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G',
  'G','G','G','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','G',
  'G','G','P','R','H','H','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','R','G',
  'G','G','G','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','R','G',
  'G','G','G','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','R','P',
  'G','G','G','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','G',
  'G','G','G','G','R','H','R','G','G','G','G','G','G','G','G','R','G','G','R','G','G','G','G','G','G',
  'G','G','G','G','R','H','R','G','G','G','G','G','G','G','G','R','G','G','R','G','G','G','G','G','G',
  'G','G','G','G','R','H','R','R','R','R','R','R','R','R','R','R','R','R','R','G','G','G','G','G','G',
  'G','G','G','G','R','H','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G',
  'G','G','G','G','R','R','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G',
  'G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G',
  'G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G',
  'G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G',
]

var cityGrid = new PF.Grid(25, 15);

cityMap.forEach((v, idx) => {
  let coord = getCoordinates(idx);
  if(v !== 'R') cityGrid.setWalkableAt(coord.x, coord.y, false);
});

function getCoordinates(idx) {
  var _x = idx % 25;
  var _y = Math.floor(idx / 25);
  return { x: _x, y: _y};
};
