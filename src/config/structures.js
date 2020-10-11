const weapons = require("./weapons");
const vehicles = require("./vehicles");
const resources = require("./resources");
const utils = require("../utils");

/**
 * @typedef {Object} ItemData
 * @property {string} id
 * @property {string} slot
 * @property {number} index
 * @property {string} name
 * @property {string} group
 * @property {string} icon
 * @property {?string} image
 * @property {boolean} planetItem
 * @property {Object} prototype
 * @prototype {number[]} price
 * @prototype {number} price
 */

let structures = {};

structures.actions = {
    TOGGLE_SHARING: 0,
    DEPOSIT: 1,
    COLLECT: 2,
    DEMOLISH: 3,
    CUSTOM: 4
};

// Structure groups
structures.groups = [
    {
        id: "planet"
    },
    {
        id: "mine"
    },
    {
        id: "factory"
    },
    {
        id: "defense"
    }
];

// Add translations
for (let group of structures.groups) {
    Object.defineProperty(group, "name", {
        get() {
            return utils.translate(`group-${this.id}`);
        }
    })
}

/** @type {ItemData[]} */
structures.structures = [
    {
        id: "zombie-pad",
        slot: "zombie-pad",
        group: "planet",
        image: "launch-2",
        planetItem: true,
        getPrototype: () => require("../entities/structures/ZombiePad"),
        price: [200, 1000, 50],
        limit: 1
    },
    {
        id: "vehicle-yard",
        slot: "vehicle-yard",
        group: "planet",
        image: "launch-2",
        planetItem: true,
        getPrototype: () => require("../entities/structures/VehicleYard"),
        price: [4, 4, 4],
        limit: 10
    },
    /* Civilian */
    {
        id: "city",
        slot: "city",
        group: "planet",
        image: "city-1",
        planetItem: true,
        getPrototype: () => require("../entities/structures/City"),
        price: [250, 250, 0],
        limit: 50
    },
    {
        id: "launch-pad",
        slot: "launch-pad",
        group: "planet",
        image: "launch-1",
        planetItem: true,
        getPrototype: () => require("../entities/structures/LaunchPad"),
        price: [200, 1000, 50],
        limit: 1
    },
    
    {
        id: "fortified-city",
        slot: "fortified-city",
        group: "planet",
        image: "city-2",
        planetItem: true,
        getPrototype: () => require("../entities/structures/FortifiedCity"),
        price: [300, 300, 0],
        limit: 50
    },

    /* Defenses */
    {
        id: "jet",
        slot: "jet",
        group: "planet",
        image: "jet",
        planetItem: false,
        getPrototype: () => require("../entities/structures/Jet"),
        price: [0, 0, 0],
        limit: 10000
    },
    {
        id: "heli",
        slot: "heli",
        group: "planet",
        image: "heli",
        planetItem: false,
        getPrototype: () => require("../entities/structures/Heli"),
        price: [0, 0, 0],
        limit: 10000
    },
    {
        id: "mustang",
        slot: "mustang",
        group: "planet",
        image: "mustang",
        planetItem: false,
        getPrototype: () => require("../entities/structures/Mustang"),
        price: [0, 0, 0],
        limit: 10000
    },
    {
        id: "jeep",
        slot: "jeep",
        group: "planet",
        image: "jeep",
        planetItem: false,
        getPrototype: () => require("../entities/structures/Jeep"),
        price: [0, 0, 0],
        limit: 10000
    },
    {
        id: "tank",
        slot: "tank",
        group: "planet",
        image: "tank",
        planetItem: false,
        getPrototype: () => require("../entities/structures/Tank"),
        price: [0, 0, 0],
        limit: 10000
    },
    {
        id: "insurgent",
        slot: "insurgent",
        group: "planet",
        image: "insurgent",
        planetItem: false,
        getPrototype: () => require("../entities/structures/Insurgent"),
        price: [0, 0, 0],
        limit: 10000
    },
    {
        id: "ied",
        slot: "ied",
        group: "defense",
        image: "ied-1",
        planetItem: false,
        getPrototype: () => require("../entities/structures/IED"),
        price: [50, 10, 100],
        limit: 100
    },
    {
        id: "trap",
        slot: "trap",
        group: "defense",
        image: "trap",
        planetItem: false,
        getPrototype: () => require("../entities/structures/Trap"),
        price: [50, 10, 100],
        limit: 15
    },
    {
        id: "boost-pad",
        slot: "boost-pad",
        group: "defense",
        image: "boost-pad",
        planetItem: false,
        getPrototype: () => require("../entities/structures/BoostPad"),
        price: [50, 10, 100],
        limit: 20
    },

    /* Wall */
    {
        id: "wall",
        slot: "wall",
        group: "defense",
        image: "wall-1",
        planetItem: false,
        getPrototype: () => require("../entities/structures/Wall"),
        price: [60, 30, 0],
        limit: 150
    },
    {
        id: "wall-strong",
        slot: "wall",
        group: "defense",
        image: "wall-2",
        planetItem: false,
        getPrototype: () => require("../entities/structures/Wall"),
        price: [100, 150, 0],
        limit: 150
    },
    {
        id: "ground-wall",
        slot: "ground-wall",
        group: "defense",
        image: "ground-wall",
        planetItem: true,
        getPrototype: () => require("../entities/structures/Wall"),
        price: [200, 100, 10],
        limit: 25
    },

    /* Turrets */
    {
        id: "machine-gun-turret",
        slot: "turret-fast",
        group: "defense",
        image: "turret",
        planetItem: false,
        getPrototype: () => require("../entities/structures/Turret"),
        price: [200, 350, 350],
        weaponId: "machine-gun",
        limit: 10
    },
    {
        id: "missile-turret",
        slot: "turret-slow",
        group: "defense",
        image: "turret",
        planetItem: false,
        getPrototype: () => require("../entities/structures/Turret"),
        price: [500, 500, 200],
        weaponId: "missile",
        limit: 10
    },
    {
        id: "sniper-turret",
        slot: "turret-slow",
        group: "defense",
        image: "turret",
        planetItem: false,
        getPrototype: () => require("../entities/structures/Turret"),
        price: [500, 200, 500],
        weaponId: "sniper",
        limit: 10
    },
    {
        id: "minigun-turret",
        slot: "turret-fast",
        group: "defense",
        image: "turret",
        planetItem: false,
        getPrototype: () => require("../entities/structures/Turret"),
        price: [200, 1000, 600],
        weaponId: "minigun",
        limit: 10
    },
    {
        id: "super-minigun-turret",
        slot: "turret-fast",
        group: "defense",
        image: "turret",
        planetItem: false,
        getPrototype: () => require("../entities/structures/Turret"),
        price: [6000, 8000, 10000],
        weaponId: "super-minigun",
        limit: 10
    },

    /* Ground Turrets */
    {
        id: "ground-missile-turret",
        slot: "ground-turret",
        group: "defense",
        image: "turret",
        planetItem: true,
        getPrototype: () => require("../entities/structures/Turret"),
        price: [1000, 1000, 500],
        weaponId: "missile",
        limit: 15
    },
    {
        id: "ground-minigun-turret",
        slot: "ground-turret",
        group: "defense",
        image: "turret",
        planetItem: true,
        getPrototype: () => require("../entities/structures/Turret"),
        price: [2000, 1000, 2000],
        weaponId: "minigun",
        limit: 15
    },

    {
        id: "ground-sniper-turret",
        slot: "ground-turret",
        group: "defense",
        image: "turret",
        planetItem: true,
        getPrototype: () => require("../entities/structures/Turret"),
        price: [4000, 2000, 4000],
        weaponId: "sniper",
        limit: 15
    },

    /* Misc */
    {
        id: "planet-sign",
        slot: "planet-sign",
        group: "planet",
        image: "city-1",
        planetItem: true,
        special: true,
        getPrototype: () => require("../entities/structures/Sign"),
        price: [0, 0, 0],
        limit: 15
    },
    {
        id: "space-sign",
        slot: "space-sign",
        group: "planet",
        image: "city-1",
        planetItem: false,
        special: true,
        getPrototype: () => require("../entities/structures/Sign"),
        price: [0, 0, 0],
        limit: 15
    },
    {
        id: "planet-flag",
        slot: "planet-flag",
        group: "planet",
        image: "city-1",
        planetItem: true,
        special: true,
        getPrototype: () => require("../entities/structures/Flag"),
        price: [0, 0, 0],
        limit: 5
    }
];

// Mining structures
let mineStructures = [];
for (let resource of resources.resources) {
    mineStructures.push({
        id: `${resource.id}-mine`,
        slot: `${resource.id}-mine`,
        group: "mine",
        image: resource.mineIcon,
        planetItem: true,
        getPrototype: () => require("../entities/structures/Mine"),
        price: resource.factoryPrice,
        limit: 50,
        resource: resource,
        mineRadius: resource.name === "Oil" ? 64 : 96,
    });
}
structures.structures.push(...mineStructures);

// Add factory structures
let weaponFactoryStructures = [];
for (let i = 0; i < weapons.weapons.length; i++) {
    let weapon = weapons.weapons[i];
    if (weapon.maxAmmo === -1) continue;  // Don't generate infinite ammo
    weaponFactoryStructures.push({
        id: `${weapon.id}-factory`,
        slot: `${weapon.id}-factory`,
        group: "factory",
        image: "factory-1",
        planetItem: true,
        getPrototype: () => require("../entities/structures/Factory"),
        price: weapon.factoryPrice,
        limit: weapon.id === "nuke" ? 1 : 5,
        weaponIndex: i
    });
}
structures.structures.push(...weaponFactoryStructures);

// Add vehicle structures
let vehicleFactoryStructures = [];
for (let i = 0; i < vehicles.vehicles.length; i++) {
    let vehicle = vehicles.vehicles[i];
    if (vehicle.maxFielded === -1) continue;  // Don't generate infinite vehicles
    vehicleFactoryStructures.push({
        id: `${vehicle.id}-vfactory`,
        slot: `${vehicle.id}-vfactory`,
        group: "factory",
        image: "factory-1",
        planetItem: true,
        getPrototype: () => require("../entities/structures/VehicleYard"),
        price: vehicle.cost,
        limit: 100,//weapon.id === "nuke" ? 1 : 5,
        vehicleIndex: i
    });
}
structures.structures.push(...vehicleFactoryStructures);

// List of slots (created by structures)
structures.slots = [];

// Add getters
for (let i = 0; i < structures.structures.length; i++) {
    let structure = structures.structures[i];

    // Get the structure index
    structure.index = i;

    // Save the slot
    if (structures.slots.indexOf(structure.slot) === -1) {
        structures.slots.push(structure.slot);
    }
    structure.slotIndex = structures.slots.indexOf(structure.slot);

    // Prototype cache
    Object.defineProperty(structure, "prototype", {
        get() {
            if (!this._prototype) {
                this._prototype = this.getPrototype();
            }
            return this._prototype;
        }
    });

    // Get the group
    structure.groupObj = structures.groups[structures.groups.findIndex(g => g.id === structure.group)];

    // Add default translation if needed
    if (!structure.name) {
        if (structure.id.endsWith("-turret")) {
            // Turret name
            Object.defineProperty(structure, "name", {
                get() {
                    return utils.translate(structure.id.startsWith("ground-") ? `structure-ground-turret` : "structure-turret", weapons.weaponForId(this.weaponId).name);
                }
            });
        } else if (structure.id.endsWith("-factory")) {
            // Factory name
            Object.defineProperty(structure, "name", {
                get() {
                    return utils.translate("structure-factory", weapons.weapons[this.weaponIndex].name);
                }
            });
        }else if (structure.id.endsWith("-vfactory")) {
            // Factory name
            Object.defineProperty(structure, "name", {
                get() {
                    return vehicles.vehicles[this.vehicleIndex].name + " factory"//utils.translate("structure-vfactory", vehicles.vehicles[this.vehicleIndex].name);
                }
            });
        } 
        else {
            // Generic name
            Object.defineProperty(structure, "name", {
                get() {
                    return utils.translate(`structure-${this.id}`);
                }
            });
        }
    }
}


// Add utility
structures.structureForId = function(id) {
    return structures.structures[structures.structureIndexForId(id)];
};

structures.structureIndexForId = function(id) {
    return structures.structures.findIndex(s => s.id === id);
};

structures.groupForId = function(id) {
    return structures.groups[structures.groups.findIndex(g => g.id === id)];
};

// Default owned structures
let testingStructures = [ ];
structures.defaultOwned = [ "city", 
"heli-vfactory", "jet-vfactory","tank-vfactory","insurgent-vfactory","mustang-vfactory","jeep-vfactory",
"vehicle-yard","fortified-city","oil-mine", "aluminium-mine", "uranium-mine", "minigun-factory", "bomb-factory", "dual-machine-gun-factory","clusterbomb-factory","rocket-factory","wall", "machine-gun-turret", ...testingStructures ].map(id => structures.structureIndexForId(id));

// Warn if has testing structures
if (testingStructures.length > 0) {
    console.warn("Has testing structures.");
}

module.exports = structures;
