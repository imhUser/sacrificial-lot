export class ShareOwner {
  private _fullName?: string;
  private _phone?: string;
  private _address?: string;
  private _deliveryType?: string;
  private _shareCost?: string;
  private _shareQuantity?: number;
  private _cuttingTime?: string;
  private _code?: string;
  private _animalID?: string;
  private _isNewShareOwner?: boolean;

  constructor(
    fullName?: string,
    phone?: string,
    address?: string,
    deliveryType?: string,
    shareCost?: string,
    shareQuantity?: number,
    cuttingTime?: string,
    code?: string,
    animalID?: string,
    isNewShareOwner?: boolean
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
    this._isNewShareOwner = isNewShareOwner;
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

  public get isNewShareOwner() {
    return this._isNewShareOwner;
  }
}
