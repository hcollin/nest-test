import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { arnd } from "rndlib";
import { Server } from "socket.io";


@WebSocketGateway({cors: true})
export class SocketTestGateway {

    @WebSocketServer()
    server: Server;


    constructor() {


        setInterval(() => {
            if (this.server) {
                const rcolor = arnd(["green", "red", "yellow", "purple", "gray", "blue", "brown"]);
                this.server.emit("blip", rcolor);
            }
        }, 1000);
    }



    // @SubscribeMessage("blip")
    // handleEvent(@MessageBody() data: string) {


    // }








}