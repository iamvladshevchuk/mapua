export default class ContextMissingError extends Error {
    constructor() {
      super("You tried to use context outside of its boundaries");
      this.name = "ContextMissingError"; 
    }
  }