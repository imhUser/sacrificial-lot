export class ShareOwner {
  private _fullName?: string;
  private _phone?: string;
  private _address?: string;
  private _deliveryType?: string;
  private _shareCost?: string;
  private _shareQuantity?: number;
  private _cuttingTime?: string;
  private _code?: string;
  private _animalID?: number;
  private _processDate?: string;
  private _deposit?: boolean;
  private _fee?: boolean;

  constructor(
    fullName?: string,
    phone?: string,
    address?: string,
    deliveryType?: string,
    shareCost?: string,
    shareQuantity?: number,
    cuttingTime?: string,
    code?: string,
    animalID?: number,
    processDate?: string,
    deposit?: boolean,
    fee?: boolean
  ) {
    this._fullName = fullName;
    this._phone = phone;
    this._address = address;
    this._deliveryType = deliveryType;
    this._shareCost = shareCost;
    this._shareQuantity = shareQuantity;
    this._cuttingTime = cuttingTime;
    this._code = code;
    this._animalID= animalID;
    this._processDate = processDate;
    this._deposit = deposit;
    this._fee = fee;
  }

  public get deposit() {
    return this._deposit;
  }

  public get fee() {
    return this._fee;
  }

  public get fullName() {
    return this._fullName;
  }

  public get phone() {
    return this._phone;
  }

  public get address() {
    return this._address;
  }

  public get deliveryType() {
    return this._deliveryType;
  }

  public get shareCost() {
    return this._shareCost;
  }

  public get shareQuantity() {
    return this._shareQuantity;
  }

  public get cuttingTime() {
    return this._cuttingTime;
  }

  public get code() {
    return this._code;
  }

  public get processDate() {
    return this._processDate;
  }

  public get animalID() {
    return this._animalID;
  }
}
