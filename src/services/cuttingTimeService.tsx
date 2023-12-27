import { FirebaseService } from "./firebaseService";
import { getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { CuttingTime } from "../models/cuttingTime";
import { db } from "../config/firebase";

export class CuttingTimeService {
  private static _firebaseService = new FirebaseService();

  private static _timeRef =
    this._firebaseService.getCollectionRef("cuttingTimes");

  async getAllBySelected(isSelected: false) {
    const times: CuttingTime[] = [];

    await getDocs(
      query(CuttingTimeService._timeRef, where("isSelected", "==", isSelected))
    ).then((result) => {
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

    return times.sort((a, b) => {
      return a.id - b.id;
    });
  }

  async getByTime(time: string) {
    const querySnapshot = await getDocs(
      query(CuttingTimeService._timeRef, where("time", "==", time))
    );
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0];
    } else {
      throw new Error("Something bad happened");
    }
  }

  async setSelected(time: string) {
    if (time) {
      this.getByTime(time).then((result) => {
        const docRef = doc(db, "cuttingTimes", result.id);
        updateDoc(docRef, {
          isSelected: true,
        });
      });
    }
  }
}
