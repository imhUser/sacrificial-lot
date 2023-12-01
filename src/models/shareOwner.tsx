export class ShareOwner {
  private _fullName?: string;
  private _phone?: string;
  private _address?: string;
  private _deliveryType?: string;
  private _shareCost?: string;
  private _shareQuantity?: number;
  private _cuttingTime?: string;

  constructor(
    fullName?: string,
    phone?: string,
    address?: string,
    deliveryType?: string,
    shareCost?: string,
    shareQuantity?: number,
    cuttingTime?: string
  ) {
    this._fullName = fullName;
    this._phone = phone;
    this._address = address;
    this._deliveryType = deliveryType;
    this._shareCost = shareCost;
    this._shareQuantity = shareQuantity;
    this._cuttingTime = cuttingTime;
  }

  public get cuttingTime() {
    return this._cuttingTime;
  }

  public get fullName() {
    return this._fullName;
  }
}
