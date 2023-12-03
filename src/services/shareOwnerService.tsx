import { FirebaseService } from "./firebaseService";
import { getDocs, query, where, addDoc } from "firebase/firestore";
import { ShareOwner } from "../models/shareOwner";

export class ShareOwnerService {
  private static _firebaseService = new FirebaseService();
  private static _shareOwnerCollectionRef =
    this._firebaseService.getCollectionRef("shareOwners");

  async getAllShareOwners() {
    const shareOwnerList: ShareOwner[] = [];

    await getDocs(ShareOwnerService._shareOwnerCollectionRef).then((result) => {
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

  async getShareOwnerByPhone(phone: string) {
    const querySnapshot = await getDocs(
      query(ShareOwnerService._shareOwnerCollectionRef, where("phone", "==", phone))
    );
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as ShareOwner;
    } else {
      throw new Error("Something bad happened");
    }
  }

  async addShareOwner(shareOwner: ShareOwner) {
    return await addDoc(ShareOwnerService._shareOwnerCollectionRef, shareOwner);
  }
}
