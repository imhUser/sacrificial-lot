import { useLocation, Link, useNavigate } from "react-router-dom";
import { db, auth } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";
import Button from "../components/Button";

interface Props {
  deliveryType: string;
  shareCost: string;
  shareQuantity: number;
}

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromHome: Props = location.state.fromHome;

  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [deliveryType, setDeliveryType] = useState<string>("");
  const [shareCost, setShareCost] = useState<string>("");
  const [shareQuantity, setShareQuantity] = useState<number>(0);

  useEffect(() => {
    if (Object.values(fromHome).every((p) => p !== null && p !== undefined)) {
      setDeliveryType(fromHome.deliveryType);
      setShareCost(fromHome.shareCost);
      setShareQuantity(fromHome.shareQuantity);
    }
  });

  const [code, setCode] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult>();
  const [isOpenSMSCodeSection, setIsOpenSMSCodeSection] = useState(false);
  const onSendSMSCode = async () => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-section", {
      size: "invisible",
      callback: async () => {
        console.log("recaptcha verified!");
        await sendSMSToPhone(recaptchaVerifier);
      },
    });
    await recaptchaVerifier.verify();
  };

  async function sendSMSToPhone(recaptchaVerifier: RecaptchaVerifier) {
    await signInWithPhoneNumber(auth, phone, recaptchaVerifier)
      .then((result) => {
        setIsOpenSMSCodeSection(true);
        setConfirmation(result);
      })
      .catch((error) => {
        console.log("sign in with phone failure");
        console.log(error);
      });
  }

  const shareOwnersRef = collection(db, "shareOwners");
  const onVerifyCode = async () => {
    await confirmation
      ?.confirm(code)
      .then((result) => {
        console.log("code verified");
        addDoc(shareOwnersRef, {
          fullName: fullName,
          phone: phone,
          address: address,
          deliveryType: deliveryType,
          shareCost: shareCost,
          shareQuantity: shareQuantity,
        })
          .then((result) => {
            console.log("share owner saved");
            navigate("/shareInfo", {
              state: {
                fullName: fullName,
                phone: phone,
                address: address,
                deliveryType: deliveryType,
                shareCost: shareCost,
                shareQuantity: shareQuantity,
                isNewShareOwner: true
              },
            });
          })
          .catch((error) => {
            console.log("share owner not saved");
          });
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.error("code not verified");
      });
  };

  return (
    <>
      <div className="container d-flex justify-content-center">
        <span className="onay-sayfası d-flex justify-content-center">
          ONAY SAYFASI ve HİSSE BİLGİLERİ
        </span>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="geri-tus d-flex align-items-between">
              <span className="material-symbols-outlined"> arrow_back </span>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/"
                state={{ fromConfirmation: fromHome }}
              >
                <span className="geri">Geri</span>
              </Link>
            </div>
            <div className="teslimat-onay">
              <div className="teslimat-turu-onay">
                <div className="d-flex">
                  <p className="teslimat-yazi">Teslimat Türü</p>
                  <p
                    className="kesimhane-teslim teslimat-yazi"
                    id="deliveryType"
                  >
                    {deliveryType}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="teslimat-yazi">Hisse Tutarı</p>
                  <p
                    className="teslimat-yazi kesimhane-teslim"
                    style={{ width: "15%" }}
                    id="sharePrice"
                  >
                    {shareCost} TL
                  </p>
                  <p
                    className="teslimat-yazi"
                    style={{ width: "20%", marginLeft: "30px" }}
                  >
                    Hİsse Adedi
                  </p>
                  <p
                    className="teslimat-yazi kesimhane-teslim"
                    style={{ width: "6%" }}
                    id="shareAmount"
                  >
                    {shareQuantity}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="teslimat-yazi">Saat Seçimi</p>
                  <p
                    className="teslimat-yazi kesimhane-teslim"
                    style={{ width: "10%" }}
                  >
                    09.35
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="hisse-button d-flex align-content-center"
              id="shareAmountList"
            ></div>
            <div className="inputs">
              <div className="row input-üst">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="adSoyad" className="small">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      className="form-control inputlar"
                      id="personName"
                      placeholder="Ad Soyad Giriniz"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="telefon" className="small">
                      Cep Telefonu
                    </label>
                    <input
                      type="tel"
                      className="form-control inputlar"
                      id="tel"
                      maxLength={13}
                      placeholder="555 555 55 55"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="adres">
                <div className="form-group">
                  <label htmlFor="adres" className="small">
                    Adres
                  </label>
                  <input
                    type="text"
                    className="form-control inputlar"
                    id="address"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, eros vel bibendum lacinia, justo nunc tempor sapien, at viverra sapien ex ut nisi."
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="kayitCheckbox"
                  />
                  <label
                    className="form-check-label small"
                    htmlFor="kayitCheckbox"
                  >
                    Tüm hisselerin bu iletişim bilgisine kaydedilmesini
                    istiyorum.
                  </label>
                </div>
                <div className="form-check" style={{ marginTop: "10px" }}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="kayitCheckbox"
                  />
                  <label
                    className="form-check-label small"
                    htmlFor="kayitCheckbox"
                  >
                    Vekaletimi verdim.
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="button d-flex justify-content-center">
        {/* <Link style={{ textDecoration: "none" }} to="/finalization">
          <button
            type="button"
            className="btn btn-success"
            style={{ marginBottom: "182px" }}
            id="nextButton"
            onClick={onSubmit}
          >
            Kaydımı Kesinleştir!
          </button>
        </Link> */}

        <button
          type="button"
          className="btn btn-success"
          // style={{ marginBottom: "182px" }}
          style={{ marginBottom: "60px" }}
          id="nextButton"
          onClick={onSendSMSCode}
        >
          Kaydımı Kesinleştir!
        </button>
      </div>

      <div className="button d-flex justify-content-center">
        <div id="recaptcha-section" />
      </div>

      {isOpenSMSCodeSection && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-4" style={{ marginBottom: "15vh" }}>
              <input
                className="form-control inputlar"
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                buttonTitle="Kodu Doğrula"
                additionalStyles={["btn-success"]}
                onClick={onVerifyCode}
              ></Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Confirmation;
