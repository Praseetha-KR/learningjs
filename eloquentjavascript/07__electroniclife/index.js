const Jetty = require('jetty');
const World = require('./world');
const BouncingCritter = require('./critter');
const WallFollower = require('./wallfollower');
const Wall = require('./wall');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateWorld() {
    const jetty = new Jetty(process.stdout);
    jetty.clear();

    for (let i = 0; i < 10; i++) {
        jetty.moveTo([0,0]);
        world.turn();
        jetty.text(world.toString());
        await sleep(500);
    }
}

const PLAN = [
    "############################",
    "#      #    #      o      ##",
    "#                     ~    #",
    "#          #####           #",
    "##         #   #    ##     #",
    "###~          ##     #    ~#",
    "#      ~    ###      #     #",
    "#   ####                   #",
    "#   ##       o             #",
    "# o  #         o       ### #",
    "#    #                     #",
    "############################"
];
const world = new World(PLAN, { '#': Wall, 'o': BouncingCritter, '~': WallFollower });
animateWorld(world);
