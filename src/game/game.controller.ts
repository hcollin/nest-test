import { Controller, Get, Param } from "@nestjs/common";
import { Game } from "./game.models";
import { GameService } from "./game.service";


@Controller("game")
export class GameController {

    constructor(private readonly gameService: GameService) { }

    @Get() 
    async getGames(): Promise<Game[]> {
        
        return this.gameService.listGames();
    }

    @Get(":gid")
    async getGame(@Param() params): Promise<Game|null> {
        

        console.log("Gid", params);

        return null;
    }

}