import { FirebaseService } from "./firebaseService";
import { SacrificialAnimal } from "../models/sacrificialAnimal";
import { getDocs, query, where, addDoc } from "firebase/firestore";

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
    return sacrificialAnimalList;
  }
}
