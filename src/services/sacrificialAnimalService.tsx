import { FirebaseService } from "./firebaseService";
import { SacrificialAnimal } from "../models/sacrificialAnimal";
import { getDocs, query, where, addDoc, getDoc } from "firebase/firestore";

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
}
