export class CuttingTime {
    private _isSelected?: boolean;
    private _time?: string;
  
    constructor(
      isSelected?: boolean,
      time?: string
    ) {
      this._isSelected = isSelected;
      this._time = time;
    }
  
    public get isSelected() {
      return this._isSelected;
    }
  
    public get time() {
      return this._time;
    }
  }
  