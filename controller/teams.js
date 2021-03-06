const HashMap = require('hashmap');
const crypto = require('crypto');
let teams = new HashMap();
let hashedTeamnames = new HashMap();

module.exports = class Teams {
    has(team) {
        return teams.has(team);
    }

    hasHash(team) {
        return hashedTeamnames.has(team);
    }

    set(teamname, data) {
        teams.set(teamname, data);
    }

    setHash(teamname, data) {
        hashedTeamnames.set(teamname, data);
    }

    keys() {
        return teams.keys();
    }

    hashKeys() {
        return hashedTeamnames.keys();
    }

    getPublicTeams() {
        return teams.values().filter(team => {
            return team.public;
        }).map(team => {
            return team.name;
        });
    }

    get(teamname) {
        if (teams.has(teamname)) {
            return teams.get(teamname);
        }
        throw new Error('No such team in teamnames');
    }

    getTeamnameOfHash(hashedName) {
        if (hashedTeamnames.has(hashedName)) {
            return hashedTeamnames.get(hashedName);
        }
        throw new Error('No such team in hashedTeamnames');
    }

    recalculatePizzaCount(teamname) {
        let team = teams.get(teamname);
        if (team.teamSize.type === 'persons') {
            team.pizzaCount = Math.ceil(team.teamSize.size / 2);
        } else {
            team.pizzaCount = Math.ceil(team.teamSize.size / 8);
        }
        console.log(team.teamSize);
    }

    setTestTeams() {
        teams.set('test', {
            name: 'test',
            hashedName: crypto.createHash('sha256').update('test').digest('hex'),
            teamSize: {
                size: 2,
                type: 'persons'
            },
            public: true,
            pizzaCount: 1,
            voteMode: 'std',
            freeze: false,
            vegetarian: 0,
            noPork: 0
        });
        teams.set('SMHR', {
            name: 'SMHR',
            hashedName: crypto.createHash('sha256').update('SMHR').digest('hex'),
            teamSize: {
                size: 0,
                type: 'persons'
            },
            public: false,
            pizzaCount: 0,
            voteMode: 'std',
            freeze: false,
            vegetarian: 0,
            noPork: 0
        });
        hashedTeamnames.set(crypto.createHash('sha256').update('test').digest('hex'), 'test');
        hashedTeamnames.set(crypto.createHash('sha256').update('SMHR').digest('hex'), 'SMHR');
        console.log(`Hash for team 'test': ${crypto.createHash('sha256').update('test').digest('hex')}`);
        console.log(`Hash for team 'SMHR': ${crypto.createHash('sha256').update('SMHR').digest('hex')}`);

    }
}