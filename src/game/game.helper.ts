import { Game } from "./game.models";


export function createRandomGame(gameTemplate: Partial<Game>) {

    const game = Object.assign({},
        {
            id: "AAA",
            turn: 0
        },
        gameTemplate);

    return game;

}