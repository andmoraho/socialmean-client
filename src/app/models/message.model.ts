export class Message {
  constructor(
      public _id: String,
      public _emitter: String,
      public _receiver: String,
      public text: String,
      public viewed: String,
      public createdAt: Number
  ) {}
}
