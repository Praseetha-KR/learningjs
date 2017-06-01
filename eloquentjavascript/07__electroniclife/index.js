const World = require('./world');
const BouncingCritter = require('./critter');
const Wall = require('./wall');

const plan = [
    "############################",
    "#      #    #      o      ##",
    "#                          #",
    "#          #####           #",
    "##         #   #    ##     #",
    "###           ##     #     #",
    "#           ###      #     #",
    "#   ####                   #",
    "#   ##       o             #",
    "# o  #         o       ### #",
    "#    #                     #",
    "############################"
];

const world = new World(plan, { '#': Wall, 'o': BouncingCritter });
console.log(world.toString());

for (var i = 0; i < 5; i++) {
  world.turn();
  console.log(world.toString());
}
// animateWorld(world);
