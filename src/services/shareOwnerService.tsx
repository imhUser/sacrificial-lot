import { getCollectionRef } from "./firebaseService";
import { getDocs } from "firebase/firestore";
import { ShareOwner } from "../models/shareOwner";

export class ShareOwnerService {
  async getAllShareOwners() {
    const shareOwnerList: ShareOwner[] = [];

    await getDocs(getCollectionRef("shareOwners")).then((result) => {
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
}
