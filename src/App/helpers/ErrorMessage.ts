export default class ErrorMessage {
  public readonly code: string;
  public readonly description: string;

  public constructor(code: string, description: string) {
    this.code = code;
    this.description = description;
  }
}
