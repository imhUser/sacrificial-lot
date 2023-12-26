import { collection } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";

export class FirebaseService {
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
}
