// Total 25 * 15;

// P is at index 149
// Vehicle initial pos is at 173

var cityMap = [
  'R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R',
  'R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','P','G','G','G','R',
  'R','G','G','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R',
  'R','G','P','R','H','H','H','H','H','H','H','R','H','H','H','H','H','H','H','H','H','H','H','R','G',
  'R','G','G','R','H','R','R','R','R','R','H','R','H','R','R','R','R','R','R','R','R','R','H','R','G',
  'R','G','G','R','H','R','H','H','H','H','H','R','H','H','H','R','H','H','H','H','H','H','H','R','G',
  'R','G','G','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','G',
  'R','G','G','G','G','H','R','H','H','G','H','H','G','H','H','R','H','H','R','G','G','G','G','G','G',
  'R','G','G','P','R','H','R','H','H','G','H','H','G','H','H','R','H','H','R','G','G','G','G','G','G',
  'R','G','G','G','R','H','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R',
  'R','G','G','G','R','H','R','H','H','H','H','H','H','H','H','H','H','H','H','H','H','H','H','H','R',
  'R','G','G','G','R','R','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','R',
  'R','G','G','G','G','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','R',
  'R','G','G','G','G','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','R',
  'R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R',
]

var cityGrid = new PF.Grid(25, 15);

cityMap.forEach((v, idx) => {
  let coord = getCoordinates(idx);
  if(v !== 'R') cityGrid.setWalkableAt(coord.x, coord.y, false);
  else cityGrid.setWalkableAt(coord.x, coord.y, true);
});

var deliveryTargetCoordinates = cityMap.map((v, i, arr) => {
  if(v !== 'R') return false;

  let numberOfRoads = 0;
  let numberOfHouses = 0;

  if(arr[i - 25] === 'R') numberOfRoads += 1;
  if(arr[i + 25] === 'R') numberOfRoads += 1;
  if(arr[i - 1] === 'R') numberOfRoads += 1;
  if(arr[i + 1] === 'R') numberOfRoads += 1;
  if(arr[i - 25] === 'H') numberOfHouses += 1;
  if(arr[i + 25] === 'H') numberOfHouses += 1;
  if(arr[i - 1] === 'H') numberOfHouses += 1;
  if(arr[i + 1] === 'H') numberOfHouses += 1;

  return numberOfRoads < 3 && numberOfHouses;
}).map((v, i) => {
  return v ? [getCoordinates(i).x, getCoordinates(i).y] : 0;
}).filter((v) => v !== 0);

function getCoordinates(idx) {
  var _x = idx % 25;
  var _y = Math.floor(idx / 25);
  return { x: _x, y: _y};
};
