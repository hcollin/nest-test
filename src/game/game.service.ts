import { Injectable } from "@nestjs/common";
import { stringify } from "querystring";
import { createRandomGame } from "./game.helper";
import { Game } from "./game.models";


@Injectable()
export class GameService {

    private games: Map<string, Game> = new Map();

    constructor() {
        this.games.set("AAA", createRandomGame({id: "AAA"}));
    }

    async loadGame(id: string): Promise<Game> {
    
        if(!this.games.has(id)) {
            throw new Error(`Game id ${id} does not exist.`);
        }

        const g = this.games.get(id);
        return g;
    }

    async saveGame(game: Game): Promise<boolean> {

        this.games.set(game.id, game);
        return true;
    }

    async listGames(): Promise<Game[]> {

        const glist = Array.from(this.games).reduce( (g: Game[], v: [string, Game]) => {
            g.push(v[1]);
            return g;
        }, []);
        console.log("GLIST", glist);

        return glist;
    }




}