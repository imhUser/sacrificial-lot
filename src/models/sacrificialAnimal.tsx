export class SacrificialAnimal {
    private _id?: string;
    private _purchasableShareQuantity?: string;
    private _totalPrice?: string;
  
    constructor(
      id?: string,
      purchasableShareQuantity?: string,
      totalPrice?: string,
    ) {
      this._id = id;
      this._purchasableShareQuantity = purchasableShareQuantity;
      this._totalPrice = totalPrice;
    }
  
    public get id() {
      return this._id;
    }
  
    public get purchasableShareQuantity() {
      return this._purchasableShareQuantity;
    }
  
    public get totalPrice() {
      return this._totalPrice;
    }
  }
  