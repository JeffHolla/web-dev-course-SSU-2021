// Task 2 Shootout game (Elimination Game)

console.log(getLastPlayer(7, 3));
console.log(getLastPlayer(11, 19));
console.log(getLastPlayer(1, 300));
console.log(getLastPlayer(14, 2));
console.log(getLastPlayer(100, 1));

function getLastPlayer(playerCount, step) 
{
    let players = new Array(playerCount).fill().map((nothing, i) => i + 1);

    for (let iter = 1; players.length > 1; iter++) 
    {
        let cur = players.shift();

        if (iter % step === 0) 
        {
            iter = 0;
            continue;
        }

        players.push(cur);
    }

    return players[0]; // last
}