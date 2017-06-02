const Jetty = require('jetty');
const World = require('./world');
const LifeLikeWorld = require('./lifelikeworld');
const BouncingCritter = require('./critter');
const WallFollower = require('./wallfollower');
const Wall = require('./wall');
const Plant = require('./plant');
const PlantEater = require('./planteater');
const SmartPlantEater = require('./smartplanteater');
const Tiger = require('./tiger');

const PLAN_WORLD = [
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
const PLAN_VALLEY = [
    "############################",
    "#####                 ######",
    "##   ***                **##",
    "#   *##**         **  O  *##",
    "#    ***     O    ##**    *#",
    "#       O         ##***    #",
    "#                 ##**     #",
    "#   O       #*             #",
    "#*          #**       O    #",
    "#***        ##**    O    **#",
    "##****     ###***       *###",
    "############################"
];
const PLAN_FOREST = [
    "####################################################",
    "#                 ####         ****              ###",
    "#   *  @  ##                 ########       OO    ##",
    "#   *    ##        O O                 ****       *#",
    "#       ##*                        ##########     *#",
    "#      ##***  *         ****                     **#",
    "#* **  #  *  ***      #########                  **#",
    "#* **  #      *               #   *              **#",
    "#     ##              #   O   #  ***          ######",
    "#*            @       #       #   *        O  #    #",
    "#*                    #  ######                 ** #",
    "###          ****          ***                  ** #",
    "#       O                        @         O       #",
    "#   *     ##  ##  ##  ##               ###      *  #",
    "#   **         #              *       #####  O     #",
    "##  **  O   O  #  #    ***  ***        ###      ** #",
    "###               #   *****                    ****#",
    "####################################################"
];

const world = new World(
    PLAN_WORLD,
    {
        '#': Wall,
        'o': BouncingCritter,
        '~': WallFollower
    }
);
const valley = new LifeLikeWorld(
    PLAN_VALLEY,
    {
        "#": Wall,
        "O": PlantEater,
        "*": Plant
    }
);
const smartvalley = new LifeLikeWorld(
    PLAN_FOREST,
    {
        "#": Wall,
        "O": SmartPlantEater,
        "*": Plant,
        "@": Tiger
    }
);
const forest = new LifeLikeWorld(
    PLAN_FOREST,
    {
        "#": Wall,
        "O": SmartPlantEater,
        "*": Plant,
        "@": Tiger
    }
);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateWorld(world) {
    const jetty = new Jetty(process.stdout);
    jetty.clear();

    for (let i = 0; i < 50; i++) {
        jetty.moveTo([0,0]);
        world.turn();
        jetty.text(world.toString());
        await sleep(500);
    }
}

// animateWorld(world);
// animateWorld(valley);
// animateWorld(smartvalley);
animateWorld(forest);
