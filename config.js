//config.js
module.exports = {
    "noWeight": true, //true or false, if true items will have weight of 0
    "Stacksize": {
        "Stacks": true, //true or false,  if true set stack size on ammo and money
        "Ammo": 160, //default value is 60, Stacks must be true to work
        "money": 5000000 //default value is 500000,  Stacks must be true to work
    },
    "Restrictions": true, //true or false,  true = removes item restrictions for secure containers, backpacks, and all cases
    "ArmorRigs": true, //true or false, true = chest armor and armored rigs can be worn together
    "maps": {
        "globalLootModifier": 0.25, //false or value,  most maps default value is 0.25
        "CustomTimer": 50, //most maps is default 50 minutes,  timer for your raid. 
        "NoExitRestrictions": true, //true or false,  true = all extract restrictions will be removed
        "BossChance": 33, //33 is default value, value should be 1-100,  chance of boss spawn
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // this is the gameplay section
    "gameplay": {
        "bots": {
            "enabled": true, //true or false, Needs to be true for the bots section to work. 
            "pmc": {
                "enabled": true, // true or false, determines if pmc's can spawn.
                "usecChance": 10, // default value is 50, % chance that a pmc is usec or bear
                "types": {
                    "followerTest": 100, // type of bot that can be a pmc, and the chance of it being a pmc.
                    "bossTest": 100, // type of bot that can be a pmc, and the chance of it being a pmc.
                    "assault": 35, // type of bot that can be a pmc, and the chance of it being a pmc.
                    "pmcBot": 35 // type of bot that can be a pmc, and the chance of it being a pmc.
                }
            },
            "limits": {
                "assault": 30, // limit of how many can spawn in a map/raid
                "marksman": 30, // limit of how many can spawn in a map/raid
                "pmcBot": 30, // limit of how many can spawn in a map/raid
                "bossBully": 100, // limit of how many can spawn in a map/raid
                "bossGluhar": 100, // limit of how many can spawn in a map/raid
                "bossKilla": 100, // limit of how many can spawn in a map/raid
                "bossKojaniy": 100, // limit of how many can spawn in a map/raid
                "bossSanitar": 100, // limit of how many can spawn in a map/raid
                "followerBully": 100, // limit of how many can spawn in a map/raid
                "followerGluharAssault": 100, // limit of how many can spawn in a map/raid
                "followerGluharScout": 100, // limit of how many can spawn in a map/raid
                "followerGluharSecurity": 100, // limit of how many can spawn in a map/raid
                "followerGluharSnipe": 100, // limit of how many can spawn in a map/raid
                "followerKojaniy": 100, // limit of how many can spawn in a map/raid
                "followerSanitar": 100, // limit of how many can spawn in a map/raid
                "test": 30, // limit of how many can spawn in a map/raid
                "followerTest": 30, // limit of how many can spawn in a map/raid
                "bossTest": 30 // limit of how many can spawn in a map/raid
            }
        },
        "trading": {
            "enabled": true, //true or false, will allow the edits for trading section to work
            "ragfairMultiplier": 1, // default value is 3.5, multiplier for flea market prices
            "repairMultiplier": 1, // default value is 1, multiplier for the price of repairs
            "insureMultiplier": 0.1, // default value is 0.1, multiplier for the price of insurance
            "insureReturnChance": 75, // default value is 75, chance of your insurance returning
            "fenceAssortSize": 60, // default value is 60, the amount of items fence carries to sell
            "fenceRefreshInterval": 600, // default value is 600, the amount of time in seconds for fence to refresh
            //"buyItemsMarkedFound": false // true or false
        },
        "locationLoot": {
            "CustomLoot": false, //true or false, must be true for loot values to work
            //********for anything below to work CustomLoot must be true!!**********************
            "overlappingLoot": false, //true or false, true = loot able to spawn in same spot as other loot.
            "Custom": 10000, //default value is 10000,  increasing too much can effect FPS
            "Factory": 1000, //default value is 1000,  increasing too much can effect FPS
            "Interchange": 25000, //default value is 25000, increasing too much can effect FPS
            "Labs": 10000, //default value is 10000,  increasing too much can effect FPS
            "Reserve": 30000, //default value is 30000,  increasing too much can effect FPS
            "Shoreline": 15000, //default value is 15000,  increasing too much can effect FPS
            "Woods": 5000, //default value is 5000,  increasing too much can effect FPS
            "containers": {
                "ChanceForEmpty": 10, //default value is 10, chance for container to be empty
                "ChanceToSpawnNextItem": 40, //default value is 40, chance to spawn next item in container    
                "AttemptsToPlaceLoot": 15, //default value is 15, tries it takes to place item in container
                "RarityMultipliers": {
                    "Not_exist": 0, //default value is 0, items won't spawn, most Node items.
                    "Common": 1, //default value is 1, common spawn multiplier
                    "Rare": 0.7, //default value is 0.7, rare spawn multiplier
                    "Superrare": 0.4 //default value is 0.4, superrare spawn multiplier
                }
            }
        }
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //this is the globals section, globalsedits must be true for any settings in this section to work
    "globals": {
        "globalsedits": true, // true or false, must be true to edit anything in globals section
        "AimPunch": 0, // sets the aimpunchmagnitude in globals
        "SkillProgressRate": 1.4, // sets the skill progress rate in globals 
        "WeaponSkill": 3, // sets weaponskillprogress rate in globals
        "SkillAtrophy": false, // true or false, sets skill atrophy in globals
        "exp": {
            "experience": true, // true or false, must be true for everything else in these {} to work 
            "expheal": 1, // how much exp you'll get for healing
            "exphydra": 1, // how much exp you get from hydrating
            "expEnergy": 1, // how much exp you get from eating
            "survivedexp": 300, //required amount of exp to not count as a run through
            "survivedseconds": 600, //required amount of seconds to not count as run through
            "survivedreward": 300, //exp rewarded for extracting alive
            "miareward": 200, // exp rewarded for missing in action
            "runnerreward": 200, // exp rewarded for a run through
            "leftmult": 0, // exp multiplyer for leaving raid without extracting
            "miamult": 1, // exp multiplyer for missing in action
            "survivedmult": 1.5, // exp multiplyer for surviving a raid
            "runnermult": 0.5, // exp multiplyer for run through
            "killmult": 1, // exp multiplyer for kills 
            "victimlevel": 200, // exp for victims level
            "headshot": 1.2, // exp for headshots
            "damage": 50, // exp for On damage all health in globals
            "longshot": 100, // exp for the distance of longshot
            "victimbot": 100, // exp for bot victim level
        },
        "maxbots": 13, // max amount of bots on maps at one time
        "cooldown": {
            "ScavTimer": false, //true or false, set a custom timer for scav cooldown
            "timer": 20, // scav cooldown timer,  ScavTimer must be true
        },
        "InfiniteStamina": false, //true or false, true = infinite stamina, will effect some skills progress
        "globalprice": 1, // global item price modifier
        "Lootchance": 0.23, // global loot chance modifier
        "timebeforedeploy": 20, // time before deployment, load time
        "timedeploylocal": 10, // time before deploy locally
        "baseloadtime": 0.85, // magazine load time
        "baseunloadtime": 0.3, // magazine unload time
        "basechecktime": 3, // check magazine time
        "Ragfair": {
            "enabled": true, // true or false,  enables or disables flea market
            "userlevel": 10, // minimium user level for flea market
        },
        "wave_low": 1, // set the waves amount in globals
        "wave_mid": 1.4, // set the waves amount in globals
        "wave_high": 1.8, // set the waves amount in globals
        "wave_horde": 10, // set waves amount in globals
        "restrictions": true, // true or false, false will remove in raid restrictions
        "skill": {
            "skills": true, // will allow the custom skill factors below
            "SkillMinEffectiveness": 0.0001, // default value=0.0001, minimium effectiveness of skills
            "SkillFatiguePerPoint": 0.6, // default value=0.6, how much fatigue the skill will get per use
            "SkillFreshEffectiveness": 1.3, // default value=1.3, how much effectiveness a skill has fresh
            "SkillFreshPoints": 1, // default value=1, amount of skill points you get fresh 
            "SkillPointsBeforeFatigue": 1, //default value=1, amount of skill points before fatigue sets in
            "SkillFatigueReset": 200, // default value=200, amount of time for fatigue to reset
        },
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    "FastUpgrade": false, //true or false, true = upgrade time of 5 seconds
    "FastProduction": false, //true or false, true = craft time of 5 seconds
    "FastBitcoin": false, //true or false, true = production time of 5 seconds
    "FastScavCase": false, //true or false, true = scavcase return time of 5 seconds
    "AllClothes": true, //true or false, true = all clothing unlocked and free
}