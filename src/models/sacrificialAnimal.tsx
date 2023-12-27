export class SacrificialAnimal {
    private _id: number;
    private _purchasableShareQuantity?: string;
    private _totalPrice?: string;
    private _totalShareQuantity?: string;
  
    constructor(
      id: number,
      purchasableShareQuantity?: string,
      totalPrice?: string,
      totalShareQuantity?: string
    ) {
      this._id = id;
      this._purchasableShareQuantity = purchasableShareQuantity;
      this._totalPrice = totalPrice;
      this._totalShareQuantity = totalShareQuantity;
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
    
    public get totalShareQuantity() {
      return this._totalShareQuantity;
    }
  }
  