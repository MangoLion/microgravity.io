const utils = require("../utils");


let vehicles = {}
vehicles.vehicles = [
  {
    id: "mustang",
    icon: "mustang",
    name:"mustang",
    cost: [200, 50, 0],
    generationRate: 1,
    maxStock: 3,
    maxFielded: 3,
    create:(parent)=>{
      const structures = require("./structures");
      let structureData = structures.structureForId("mustang");
      let structure = new structureData.prototype(parent.game);
      let planet = parent.hostPlanet;

      structure.structureIndex = structures.structureIndexForId("mustang");
      structure.hostPlanet = planet;
      structure.planet = planet;
      var vx = (parent.x-planet.x);
      var vy = (parent.y-planet.y);
      var dist = Math.sqrt(vx*vx + vy*vy)
      var spawnPos = {
          x:(vx/dist)*200 + parent.x,
          y:(vy/dist)*200 + parent.y
      }
      structure.x = spawnPos.x;
      structure.y = spawnPos.y;
      return structure;
    }
  },
  {
    id: "jet",
    icon: "jet",
    name:"jet",
    cost: [500, 100, 0],
    generationRate: 1,
    maxStock: 3,
    maxFielded: 2,
    create:(parent)=>{
      const structures = require("./structures");
      let structureData = structures.structureForId("jet");
      let structure = new structureData.prototype(parent.game);
      let planet = parent.hostPlanet;

      structure.structureIndex = structures.structureIndexForId("jet");
      structure.hostPlanet = planet;
      structure.planet = planet;
      var vx = (parent.x-planet.x);
      var vy = (parent.y-planet.y);
      var dist = Math.sqrt(vx*vx + vy*vy)
      var spawnPos = {
          x:(vx/dist)*300 + parent.x,
          y:(vy/dist)*300 + parent.y
      }
      structure.x = spawnPos.x;
      structure.y = spawnPos.y;
      return structure;
    }
  },
  {
    id: "heli",
    icon: "heli",
    name:"heli",
    cost: [450, 150, 0],
    generationRate: 1,
    maxStock: 3,
    maxFielded: 2,
    create:(parent)=>{
      const structures = require("./structures");
      let structureData = structures.structureForId("heli");
      let structure = new structureData.prototype(parent.game);
      let planet = parent.hostPlanet;

      structure.structureIndex = structures.structureIndexForId("heli");
      structure.hostPlanet = planet;
      structure.planet = planet;
      var vx = (parent.x-planet.x);
      var vy = (parent.y-planet.y);
      var dist = Math.sqrt(vx*vx + vy*vy)
      var spawnPos = {
          x:(vx/dist)*200 + parent.x,
          y:(vy/dist)*200 + parent.y
      }
      structure.x = spawnPos.x;
      structure.y = spawnPos.y;
      return structure;
    }
  },
  {
    id: "jeep",
    icon: "jeep",
    name:"jeep",
    cost: [70, 150, 0],
    generationRate: 1,
    maxStock: 3,
    maxFielded: 3,
    create:(parent)=>{
      const structures = require("./structures");
      let structureData = structures.structureForId("jeep");
      let structure = new structureData.prototype(parent.game);
      let planet = parent.hostPlanet;

      structure.structureIndex = structures.structureIndexForId("jeep");
      structure.hostPlanet = planet;
      structure.planet = planet;
      var vx = (parent.x-planet.x);
      var vy = (parent.y-planet.y);
      var dist = Math.sqrt(vx*vx + vy*vy)
      var spawnPos = {
          x:(vx/dist)*50 + parent.x,
          y:(vy/dist)*50 + parent.y
      }
      structure.x = spawnPos.x;
      structure.y = spawnPos.y;
      return structure;
    }
  },
  {
    id: "insurgent",
    icon: "insurgent",
    name:"insurgent",
    cost: [70, 150, 0],
    generationRate: 1,
    maxStock: 3,
    maxFielded: 3,
    create:(parent)=>{
      const structures = require("./structures");
      let structureData = structures.structureForId("insurgent");
      let structure = new structureData.prototype(parent.game);
      let planet = parent.hostPlanet;

      structure.structureIndex = structures.structureIndexForId("insurgent");
      structure.hostPlanet = planet;
      structure.planet = planet;
      var vx = (parent.x-planet.x);
      var vy = (parent.y-planet.y);
      var dist = Math.sqrt(vx*vx + vy*vy)
      var spawnPos = {
          x:(vx/dist)*50 + parent.x,
          y:(vy/dist)*50 + parent.y
      }
      structure.x = spawnPos.x;
      structure.y = spawnPos.y;
      return structure;
    }
  },
  {
    id: "tank",
    icon: "tank",
    name:"tank",
    cost: [200, 500, 100],
    generationRate: 1,
    maxStock: 2,
    maxFielded: 1,
    create:(parent)=>{
      const structures = require("./structures");
      let structureData = structures.structureForId("tank");
      let structure = new structureData.prototype(parent.game);
      let planet = parent.hostPlanet;

      structure.structureIndex = structures.structureIndexForId("tank");
      structure.hostPlanet = planet;
      structure.planet = planet;
      var vx = (parent.x-planet.x);
      var vy = (parent.y-planet.y);
      var dist = Math.sqrt(vx*vx + vy*vy)
      var spawnPos = {
          x:(vx/dist)*50 + parent.x,
          y:(vy/dist)*50 + parent.y
      }
      structure.x = spawnPos.x;
      structure.y = spawnPos.y;
      return structure;
    }
  },
]
/*
for (let vehicle of vehicles.vehicles) {
  // Add camel case ID
  let normalizedId = "";
  let nextCaps = false;
  for (let i = 0; i < vehicle.id.length; i++) {
      let char = vehicle.id[i];
      if (char === "-") {
          nextCaps = true;
      } else {
          normalizedId += nextCaps ? char.toUpperCase() : char;
          nextCaps = false;
      }
  }
  vehicle.normalizedId = normalizedId;

  // Add the translated name
  Object.defineProperty(vehicle, "name", {
      get() {
          return utils.translate(`vehicle-${this.id}`);
      }
  });
}*/

module.exports = vehicles;