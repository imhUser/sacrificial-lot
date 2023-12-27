import { FirebaseService } from "./firebaseService";
import { SacrificialAnimal } from "../models/sacrificialAnimal";
import { getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

export class SacrificialAnimalService {
  private static _firebaseService = new FirebaseService();

  private static _sacrificialAnimalCollectionRef =
    this._firebaseService.getCollectionRef("sacrificialAnimals");

  async getAll() {
    const sacrificialAnimalList: SacrificialAnimal[] = [];

    await getDocs(
      query(
        SacrificialAnimalService._sacrificialAnimalCollectionRef,
        where("selected", "==", false)
      )
    ).then((result) => {
      if (!result.empty) {
        result.forEach((doc) => {
          sacrificialAnimalList.push(doc.data() as SacrificialAnimal);
        });
      } else {
        console.error("sacrificial animal docs is empty");
      }
    });
    return sacrificialAnimalList.sort((a,b)=>{return a.id - b.id});
  }

  async getById(id: number) {
    const querySnapshot = await getDocs(
      query(SacrificialAnimalService._sacrificialAnimalCollectionRef, where("id", "==", id))
    );
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as SacrificialAnimal;
    } else {
      throw new Error("Something bad happened");
    }
  }

  async getDocById(id: number) {
    const querySnapshot = await getDocs(
      query(SacrificialAnimalService._sacrificialAnimalCollectionRef, where("id", "==", id))
    );
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0];
    } else {
      throw new Error("Something bad happened");
    }
  }

  async setSelected(id: number, quantity: number) {
    if (id) {
      this.getDocById(id).then((result) => {
        const docRef = doc(db, "sacrificialAnimals", result.id);
        const animal = result.data() as SacrificialAnimal;
        let animalPurchasableShareQuantity: number = 0;
        if (animal.purchasableShareQuantity) {
          animalPurchasableShareQuantity = parseInt(animal.purchasableShareQuantity)
        }
        updateDoc(docRef, {
          selected: true,
          purchasableShareQuantity: animalPurchasableShareQuantity - quantity
        });
      });
    }
  }
}
