import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";
import { ShareOwnerService } from "./shareOwnerService";
import { ShareOwner } from "../models/shareOwner";

export class FirebaseService {
  private _shareOwnerService = new ShareOwnerService();

  getCollectionRef = (collectionName: string) => {
    return collection(db, collectionName);
  };

  private async _signInWithPhoneNumber(
    phone: string,
    recaptchaVerifier: RecaptchaVerifier
  ) {
    return await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
  }

  async sendSMSToPhone(
    phone: string,
    setIsOpenSMSCodeSection: React.Dispatch<React.SetStateAction<boolean>>,
    setConfirmation: React.Dispatch<
      React.SetStateAction<ConfirmationResult | undefined>
    >
  ) {
    let recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-section", {
      size: "invisible",
      callback: async () => {
        console.log("recaptcha verified!");
        await this._signInWithPhoneNumber(phone, recaptchaVerifier).then(
          (result) => {
            setIsOpenSMSCodeSection(true);
            setConfirmation(result);
          }
        );
      },
    });
    await recaptchaVerifier.verify();
  }

  async verifyCode(
    confirmation?: ConfirmationResult,
    code: string = "",
    shareOwner: ShareOwner = {} as ShareOwner
  ) {
    await confirmation
      ?.confirm(code)
      .then((result) => {
        console.log("code verified");
        return this._shareOwnerService.addShareOwner(shareOwner);
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.error("code not verified");
      });
  }
}
