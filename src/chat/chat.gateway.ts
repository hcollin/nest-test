import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { arnd } from "rndlib";
import { of } from "rxjs";
import { Server } from "socket.io";
import { ChatChannel, ChatMessage } from "./chat.models";




@WebSocketGateway({ cors: true })
export class ChatGateway {

    @WebSocketServer()
    server: Server;

    private channels: Map<string, ChatChannel> = new Map<string, ChatChannel>();

    constructor() {
        this.createChannel("GENERALPUBLIC", "General");
        this.createChannel("GAME1", "Game 1");

        
    }

    createChannel(id: string, name: string): ChatChannel {
        if (this.channels.has(id)) {
            throw new Error(`Channel with id ${id} already exists`);
        }
        const channel = {
            id: id,
            name: name,
            messages: []
        };

        channel.messages.push(this.createMessage("System", `Channel ${name} created!`));
        this.channels.set(id, channel);
        return channel;
    }

    createMessage(sender: string, msg: string): ChatMessage {
        return {
            sender: sender,
            message: msg,
            ts: Date.now(),
        };
    }

    sendMessageToChannel(channelId: string, sender: string, msg: string) {
        const channel = this.channels.get(channelId);
        if(channel) {
            channel.messages.push(this.createMessage(sender, msg));
            this.sendChannelUpdate(channelId);
        }
    }


    sendChannelUpdate(channelId: string) {
        const channel = this.channels.get(channelId);
        if(channel) {
            this.server.emit("chatChannelUpdate", channel);
        }
    }

    @SubscribeMessage("chatMessage")
    sendMessage(@MessageBody() data: any) {
        const channelId = data[0];
        const msg = data[1];
        console.log(`Chat message to channel ${channelId}`, msg);
        if(!this.channels.has(channelId)) {
            this.createChannel(channelId, "Unnamed Channel");
        }
        const channel = this.channels.get(channelId);
        channel.messages.push(msg);
        this.sendChannelUpdate(channelId);
    }

    @SubscribeMessage("chatJoin")
    joinChannel(@MessageBody() data: any) {
        console.log("Join Channel", data);
        const cid = data[0];
        const name = data[1];
        if(!this.channels.has(cid)) {
            this.createChannel(cid, "Unnamed Channel");
        }
        this.sendMessageToChannel(cid, "System", `${name} joined channel. Welcome!`);
    }

    @SubscribeMessage("channelList")
    getChannels(@MessageBody() data: any ) {

        const clist: [string, string][] = [];
        this.channels.forEach((cc: ChatChannel) => {
            clist.push([cc.id, cc.name]);
        });
        this.server.emit(`channelList-response`, clist)
    }

}