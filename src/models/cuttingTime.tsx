export class CuttingTime {
  private _id: number;
  private _isSelected?: boolean;
  private _time?: string;

  constructor(id: number, isSelected?: boolean, time?: string) {
    this._id = id;
    this._isSelected = isSelected;
    this._time = time;
  }

  public get id() {
    return this._id;
  }

  public get isSelected() {
    return this._isSelected;
  }

  public get time() {
    return this._time;
  }
}
