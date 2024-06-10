    export class Message {
      messageType!: MessageType;
      message!: string;
      constructor() {
        this.messageType = MessageType.default;
        this.message = "";
    }
    }
  
  export enum MessageType {
    joinGame,
    gameResult,
    default
  }