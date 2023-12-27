import { FirebaseService } from "./firebaseService";
import { getDocs, query, where, addDoc, getDoc } from "firebase/firestore";
import { CuttingTime } from "../models/cuttingTime";

export class CuttingTimeService {
  private static _firebaseService = new FirebaseService();

  private static _timeRef =
    this._firebaseService.getCollectionRef("cuttingTimes");

  async getAllBySelected(isSelected: false) {
    const times: CuttingTime[] = [];

    await getDocs(query(
        CuttingTimeService._timeRef,
        where("isSelected", "==", isSelected)
      )).then((result) => {
      if (!result.empty) {
        result.forEach((doc) => {
          if (doc.data()) {
            times.push(doc.data() as CuttingTime);
          }
        });
      } else {
        console.error("cutting time is empty");
      }
    });

    return times;
  }
}
