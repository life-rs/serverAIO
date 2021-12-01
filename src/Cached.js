exports.mod = (mod_info) => {
    logger.logInfo(`[Mod] ${mod_info.name}`);

    //Load Settings
    const config = require("../config.js");

    //Load Cache Stuff
    //Items
    let base = fileIO.readParsed(`user/cache/items.json`);
    let mapfile = fileIO.readParsed(`user/cache/locations.json`);

    //Hideout Shit
    let hareas = fileIO.readParsed(`user/cache/hideout_areas.json`);
    let hprod = fileIO.readParsed(`user/cache/hideout_production.json`);
    let scavcase = fileIO.readParsed(`user/cache/hideout_scavcase.json`);
    //Main Loop
    for (let item in base.data) {
        if (base.data[item]._type != "Node") {
            //Removes weight
            if (config.noWeight === true) {
                base.data[item]._props.Weight = 0;
            }
            //Bullet Stacks
            if (config.Stacksize.Stacks === true) {
                if (base.data[item]._parent === "5485a8684bdc2da71d8b4567") {
                    base.data[item]._props.StackMaxSize = config.Stacksize.Ammo;
                }
                //Money Stacks
                if (base.data[item]._parent === "543be5dd4bdc2deb348b4569") {
                    base.data[item]._props.StackMaxSize = config.Stacksize.money;
                }
            }
            //Gamma Restrictions
            if (config.Restrictions === true) {
                let sounds = ["gear_backpack", "container_case", "container_plastic"]
                if (sounds.includes(base.data[item]._props.ItemSound) && base.data[item]._id != "59e36c6f86f774176c10a2a7" && base.data[item]._id != "5d1b371186f774253763a656") {
                    base.data[item]._props.Grids[0]._props.filters = [];
                }
            }
            //Armor and Armored Rigs
            if (config.ArmorRigs === true) {
                base.data[item]._props.BlocksArmorVest = false;
            }
        }
    }
    //Match Related Stuff
    for (let map in mapfile) {
        //Custom timer for raids
        if (config.maps.CustomTimer != 50) {
            mapfile[map].base.escape_time_limit = config.maps.CustomTimer;
        }
        //No exit Restrictions
        if (config.maps.NoExitRestrictions === true) {
            mapfile[map].base.exit_count = 10;
            mapfile[map].base.MinDistToExitPoint = 0;
            for (let exit in mapfile[map].base.exits) {
                mapfile[map].base.exits[exit].Chance = 100;
                mapfile[map].base.exits[exit].PassageRequirement = "None";
                mapfile[map].base.exits[exit].ExfiltrationType = "Individual";
                mapfile[map].base.exits[exit].Id = "";
                mapfile[map].base.exits[exit].Count = 0;
                mapfile[map].base.exits[exit].RequirementTip = "";
            }
        }
        //Global loot modifier
        if (config.maps.globalLootModifier != 0.25) {
            mapfile[map].base.GlobalLootChanceModifier = config.maps.globalLootModifier;
        }
        //BossChance
        if (config.maps.BossChance != 33) {
            for (let boss in mapfile[map].base.BossLocationSpawn) {
                mapfile[map].base.BossLocationSpawn[boss].BossChance = config.maps.BossChance;
            }
        }
    }
    let gameplay = fileIO.readParsed(global.db.user.configs.gameplay);
    let lifegameplay = internal.path.resolve(__dirname, "gameplay.json");
    if (config.gameplay.bots.enabled === true) {
        let gbotspmc = gameplay.bots.pmc;
        let cbotspmc = config.gameplay.bots.pmc;
        gbotspmc.enabled = cbotspmc.enabled;
        gbotspmc.usecChance = cbotspmc.usecChance;
        gbotspmc.types.followerTest = cbotspmc.types.followerTest;
        gbotspmc.types.bossTest = cbotspmc.types.bossTest;
        gbotspmc.types.assault = cbotspmc.types.assault;
        gbotspmc.types.pmcBot = cbotspmc.types.pmcBot;
        let gbotslimits = gameplay.bots.limits;
        let cbotslimits = config.gameplay.bots.limits;
        gbotslimits.assault = cbotslimits.assault;
        gbotslimits.marksman = cbotslimits.marksman;
        gbotslimits.pmcBot = cbotslimits.pmcBot;
        gbotslimits.bossBully = cbotslimits.bossBully;
        gbotslimits.bossGluhar = cbotslimits.bossGluhar;
        gbotslimits.bossKilla = cbotslimits.bossKilla;
        gbotslimits.bossKojaniy = cbotslimits.bossKojaniy;
        gbotslimits.bossSanitar = cbotslimits.bossSanitar;
        gbotslimits.followerBully = cbotslimits.followerBully;
        gbotslimits.followerGluharAssault = cbotslimits.followerGluharAssault;
        gbotslimits.followerGluharScout = cbotslimits.followerGluharScout;
        gbotslimits.followerGluharSecurity = cbotslimits.followerGluharSecurity;
        gbotslimits.followerGluharSnipe = cbotslimits.followerGluharSnipe;
        gbotslimits.followerKojaniy = cbotslimits.followerKojaniy;
        gbotslimits.followerSanitar = cbotslimits.followerSanitar;
        gbotslimits.test = cbotslimits.test;
        gbotslimits.followerTest = cbotslimits.followerTest;
        gbotslimits.bossTest = cbotslimits.bossTest;
    }
    if (config.gameplay.trading.enabled === true) {
        let gtrading = gameplay.trading;
        let ctrading = config.gameplay.trading;
        gtrading.ragfairMultiplier = ctrading.ragfairMultiplier;
        gtrading.repairMultiplier = ctrading.repairMultiplier;
        gtrading.insureMultiplier = ctrading.insureMultiplier;
        gtrading.insureReturnchance = ctrading.insureReturnChance;
        gtrading.fenceAssortSize = ctrading.fenceAssortSize;
        gtrading.fenceRefreshInterval = ctrading.fenceRefreshInterval;
        //gtrading.buyItemsMarkedFound = ctrading.buyItemsMarkedFound;
    }
    let easypath = gameplay.locationloot;
    let configpath = config.gameplay.locationLoot;
    if (configpath.CustomLoot === true) {
        if (configpath.overlappingLoot === true) {
            easypath.allowLootOverlap = true;
        } else {
            easypath.allowLootOverlap = false;
        }
        easypath.bigmap = configpath.Custom;
        easypath.factory4_day = configpath.Factory;
        easypath.factory4_night = configpath.Factory;
        easypath.interchange = configpath.Interchange;
        easypath.laboratory = configpath.Labs;
        easypath.rezervbase = configpath.Reserve;
        easypath.shoreline = configpath.Shoreline;
        easypath.woods = configpath.Woods;
        //loot containers
        let newpath = easypath.containers;
        let newconfig = configpath.containers;
        newpath.ChanceForEmpty = newconfig.ChanceForEmpty;
        newpath.ChanceToSpawnNextItem = newconfig.ChanceToSpawnNextItem;
        newpath.AttemptsToPlaceLoot = newconfig.AttemptsToPlaceLoot;
        newpath.RarityMultipliers.Not_exist = newconfig.RarityMultipliers.Not_exist;
        newpath.RarityMultipliers.Common = newconfig.RarityMultipliers.Common;
        newpath.RarityMultipliers.Rare = newconfig.RarityMultipliers.Rare;
        newpath.RarityMultipliers.Superrare = newconfig.RarityMultipliers.Superrare;
    }
    db.user.config.gameplay = lifegameplay;
    fileIO.write(lifegameplay, gameplay);

    let globals = fileIO.readParsed(`db/cacheBase/globals.json`);
    let customtweaks = internal.path.resolve(__dirname, "globals.json");
    let tweaks = globals.data.config;
    //globals settings
    if (config.globals.globalsedits === true) {
        tweaks.AimPunchMagnitude = config.globals.AimPunch;
        tweaks.SkillProgressRate = config.globals.SkillProgressRate;
        tweaks.WeaponSkillProgressRate = config.globals.WeaponSkill;
        tweaks.SkillAtrophy = config.globals.SkillAtrophy;
        if (config.globals.exp.experience === true) {
            tweaks.exp.heal.expForHeal = config.globals.exp.expheal;
            tweaks.exp.heal.expForHydration = config.globals.exp.exphydra;
            tweaks.exp.heal.expForEnergy = config.globals.exp.expEnergy;
            tweaks.exp.match_end.survived_exp_requirement = config.globals.exp.survivedexp;
            tweaks.exp.match_end.survived_seconds_requirement = config.globals.exp.survivedseconds;
            tweaks.exp.match_end.survived_exp_reward = config.globals.exp.survivedreward;
            tweaks.exp.match_end.mia_exp_reward = config.globals.exp.miareward;
            tweaks.exp.match_end.runner_exp_reward = config.globals.exp.runnerreward;
            tweaks.exp.match_end.leftMult = config.globals.exp.leftmult;
            tweaks.exp.match_end.miaMult = config.globals.exp.miamult;
            tweaks.exp.match_end.survivedMult = config.globals.exp.survivedmult;
            tweaks.exp.match_end.runnerMult = config.globals.exp.runnermult;
            tweaks.exp.match_end.killedMult = config.globals.exp.killmult;
            tweaks.exp.kill.victimLevelExp = config.globals.exp.victimlevel;
            tweaks.exp.kill.headShotMult = config.globals.exp.headshot;
            tweaks.exp.kill.expOnDamageAllHealth = config.globals.exp.damage;
            tweaks.exp.kill.longShotDistance = config.globals.exp.longshot;
            tweaks.exp.kill.victimBotLevelExp = config.globals.exp.victimbot;
        }
        tweaks.MaxBotsAliveOnMap = config.globals.maxbots;
        if (config.globals.cooldown.ScavTimer === true) {
            tweaks.SavagePlayCooldown = config.globals.cooldown.timer;
            tweaks.SavagePlayCooldownNdaFree = config.globals.cooldown.timer;
        }
        if (config.globals.InfiniteStamina === true) {
            tweaks.Stamina.Capacity = 1000;
            tweaks.Stamina.SprintDrainRate = 0.1;
            tweaks.Stamina.BaseRestorationRate = 1000;
            tweaks.Stamina.JumpConsumption = 1;
            tweaks.Stamina.GrenadeHighThrow = 1;
            tweaks.Stamina.GrenadeLowThrow = 1;
            tweaks.Stamina.AimDrainRate = 0.1;
            tweaks.Stamina.OxygenCapacity = 1000;
            tweaks.Stamina.OxygenRestoration = 1000;
        }
        tweaks.GlobalItemPriceModifier = config.globals.globalprice;
        tweaks.GlobalLootChanceModifier = config.globals.Lootchance;
        tweaks.TimeBeforeDeploy = config.globals.timebeforedeploy;
        tweaks.TimeBeforeDeployLocal = config.globals.timedeploylocal;
        tweaks.BaseLoadTime = config.globals.baseloadtime;
        tweaks.BaseUnloadTime = config.globals.baseunloadtime;
        tweaks.BaseCheckTime = config.globals.basechecktime;
        tweaks.RagFair.enabled = config.globals.Ragfair.enabled;
        tweaks.RagFair.minUserLevel = config.globals.Ragfair.userlevel;
        tweaks.WAVE_COEF_LOW = config.globals.wave_low;
        tweaks.WAVE_COEF_MID = config.globals.wave_mid;
        tweaks.WAVE_COEF_HIGH = config.globals.wave_high;
        tweaks.WAVE_COEF_HORDE = config.globals.wave_horde;
        if (config.globals.restrictions === false) {
            tweaks.RestrictionsInRaid = [];
        }
        if (config.globals.skill.skills === true) {
            tweaks.SkillMinEffectiveness = config.globals.skill.SkillMinEffectiveness;
            tweaks.SkillFatiguePerPoint = config.globals.skill.SkillFatiguePerPoint;
            tweaks.SkillFreshEffectiveness = config.globals.skill.SkillFreshEffectiveness;
            tweaks.SkillFreshPoints = config.globals.skill.SkillFreshPoints;
            tweaks.SkillPointsBeforeFatigue = config.globals.skill.SkillPointsBeforeFatigue;
            tweaks.SkillFatigueReset = config.globals.skill.SkillFatigueReset;
        }
    }
    db.cacheBase.globals = customtweaks;
    fileIO.write(customtweaks, globals);
    //Hideout Shit
    //Upgrading timer
    if (config.FastUpgrade === true) {
        for (let area in hareas.data) {
            for (let stage in hareas.data[area].stages) {
                hareas.data[area].stages[stage].constructionTime = 5;
            }
        }
    }

    //Crafting timer
    //All production
    if (config.FastProduction === true && config.FastBitcoin === true) {
        for (let area in hprod.data) {
            hprod.data[area].productionTime = 5;
        }
    }
    //Only Crafting
    if (config.FastProduction === true && config.FastBitcoin === false) {
        for (let area in hprod.data) {
            if (hprod.data._id != "5d5c205bd582a50d042a3c0e") {
                hprod.data[area].productionTime = 5;
            }
        }
    }
    //Only Bitcoin
    if (config.FastProduction === false && config.FastBitcoin === true) {
        for (let area in hprod.data) {
            if (hprod.data._id === "5d5c205bd582a50d042a3c0e") {
                hprod.data[area].productionTime = 5;
            }
        }
    }
    //Fast Scav Case
    if (config.FastScavCase === true) {
        for (let price in scavcase.data) {
            scavcase.data[price].productionTime = 5;
        }
    }

    //All clothing unlocked and free
    if (config.AllClothes === true) {
        let dbcust = fileIO.readParsed(db.cacheBase.traders["5ac3b934156ae10c4430e83c"].suits);
        let custdir = internal.path.resolve(__dirname, "suit.json");
        for (let item in dbcust) {
            let ezpath = dbcust[item];
            ezpath.requirements.loyaltyLevel = 0;
            ezpath.requirements.profileLevel = 0;
            ezpath.requirements.standing = 0;
            ezpath.requirements.skillRequirements = [];
            ezpath.requirements.questRequirements = [];
            ezpath.requirements.itemRequirements = [];
        }
        db.traders["5ac3b934156ae10c4430e83c"].suits = custdir;
        fileIO.write(custdir, dbcust);

        let dbcustfence = fileIO.readParsed(db.cacheBase.traders["579dc571d53a0658a154fbec"].suits);
        let custdirt = internal.path.resolve(__dirname, "suits.json");
        for (let item in dbcustfence) {
            let ezpath = dbcustfence[item];
            ezpath.requirements.loyaltyLevel = 0;
            ezpath.requirements.profileLevel = 0;
            ezpath.requirements.standing = 0;
            ezpath.requirements.skillRequirements = [];
            ezpath.requirements.questRequirements = [];
            ezpath.requirements.itemRequirements = [];
        }
        db.traders["579dc571d53a0658a154fbec"].suits = custdirt;
        fileIO.write(custdirt, dbcustfence);

        let custom = fileIO.readParsed(`user/cache/customization.json`);
        for (let item in custom.data) {
            let pth = custom.data[item];
            pth._props.Side = ["Bear", "Usec", "Savage"];
        }
        fileIO.write(`user/cache/customization.json`, custom);
    }

    fileIO.write(`user/cache/locations.json`, mapfile);
    fileIO.write(`user/cache/items.json`, base);
    fileIO.write(`user/cache/hideout_areas.json`, hareas);
    fileIO.write(`user/cache/hideout_production.json`, hprod);
    fileIO.write(`user/cache/hideout_scavcase.json`, scavcase);
    logger.logSuccess(`[Mod] ${mod_info.name} Applied`)
}