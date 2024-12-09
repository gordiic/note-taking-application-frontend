export abstract class BaseModel {
  public id: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(id: string, createdAt: string, updatedAt: string) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

}
