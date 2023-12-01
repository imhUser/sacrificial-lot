import { getCollectionRef } from "./firebaseService";
import { getDocs, query, where } from "firebase/firestore";
import { ShareOwner } from "../models/shareOwner";

export class ShareOwnerService {
  private _shareOwnerCollectionRef = getCollectionRef("shareOwners");

  async getAllShareOwners() {
    const shareOwnerList: ShareOwner[] = [];

    await getDocs(this._shareOwnerCollectionRef).then((result) => {
      if (!result.empty) {
        result.forEach((doc) => {
          shareOwnerList.push(doc.data() as ShareOwner);
        });
      } else {
        console.error("share owner docs is empty");
      }
    });
    return shareOwnerList;
  }

  async getShareOwner(phone: string) {
    const querySnapshot = await getDocs(
      query(this._shareOwnerCollectionRef, where("phone", "==", phone))
    );
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as ShareOwner;
    } else {
      throw new Error("Something bad happened");
    }
  }
}
