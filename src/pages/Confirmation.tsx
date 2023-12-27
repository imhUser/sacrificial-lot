import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ConfirmationResult } from "firebase/auth";
import Button from "../components/Button";
import { ShareOwner } from "../models/shareOwner";
import { DateHelper } from "../utilities/dateHelper";
import { SacrificialAnimal } from "../models/sacrificialAnimal";
import { ShareOwnerService } from "../services/shareOwnerService";
import { CuttingTimeService } from "../services/cuttingTimeService";
import { SacrificialAnimalService } from "../services/sacrificialAnimalService";

interface Props {
  shareOwner?: ShareOwner;
  selectedSacrificialAnimal?: SacrificialAnimal;
  selectedCuttingTime?: string;
  deliveryType: string;
  shareCost: string;
  shareQuantity: number;
}

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromHome: Props = location.state.fromHome;
  const _shareOwnerService = new ShareOwnerService();
  const _cuttingTimeService = new CuttingTimeService();
  const _sacrificialAnimalService = new SacrificialAnimalService();

  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [deliveryType, setDeliveryType] = useState<string>("");
  const [shareCost, setShareCost] = useState<string>("");
  const [shareQuantity, setShareQuantity] = useState<number>(0);
  const [processDate, setProcessDate] = useState<string>(
    DateHelper.getCurrentDate()
  );

  const [willBeAssociate, setWillBeAssociate] = useState<ShareOwner>(
    {} as ShareOwner
  );

  const [selectedSacrificialAnimal, setSelectedSacrificialAnimal] =
    useState<SacrificialAnimal>({} as SacrificialAnimal);
  const [selectedCuttingTime, setSelectedCuttingTime] = useState<string>("");

  useEffect(() => {
    if (Object.values(fromHome).every((p) => p !== null && p !== undefined)) {
      setDeliveryType(fromHome.deliveryType);
      setShareCost(fromHome.shareCost);
      setShareQuantity(fromHome.shareQuantity);

      if (fromHome.shareOwner != null) {
        setWillBeAssociate(fromHome.shareOwner);
      } else if (
        fromHome.selectedSacrificialAnimal != null &&
        fromHome.selectedCuttingTime != ""
      ) {
        setSelectedSacrificialAnimal(fromHome.selectedSacrificialAnimal);
        if (fromHome.selectedCuttingTime) {
          setSelectedCuttingTime(fromHome.selectedCuttingTime);
        }
      }
    }
  }, []);

  const [code, setCode] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult>();
  const [isOpenSMSCodeSection, setIsOpenSMSCodeSection] = useState(false);
  // const onSendSMSCode = async () => {
  //   await _firebaseService.sendSMSToPhone(
  //     phone,
  //     setIsOpenSMSCodeSection,
  //     setConfirmation
  //   );
  // };

  const saveShareOwner = async () => {
    if (fullName != "" && address != "" && phone != "") {
      const newShareOwner = {
        fullName: fullName,
        phone: phone,
        address: address,
        shareCost: shareCost,
        shareQuantity: shareQuantity,
        deliveryType: deliveryType,
        code:
          Date.now().toString().substring(11, 13) +
          phone.replaceAll(" ", "").substring(8, 10),
        cuttingTime: selectedCuttingTime,
        animalID: selectedSacrificialAnimal.id,
        processDate: processDate,
        deposit: false,
        fee: false,
      } as ShareOwner;

      _shareOwnerService
        .addShareOwner(newShareOwner)
        .then((result) => {
          _cuttingTimeService
            .setSelected(selectedCuttingTime)
            .then((result) => {
              _sacrificialAnimalService
                .setSelected(selectedSacrificialAnimal.id, shareQuantity)
                .then((result) => {
                  console.log("share owner saved, navigating...");
                  navigate("/shareInfo", {
                    state: {
                      shareOwner: newShareOwner,
                      isNewShareOwner: true,
                    },
                  });
                }).catch(error=>{
                  alert("")
                });
            });
        })
        .catch((error) => {
          console.log("share owner not saved");
        });
    } else {
      alert("Lütfen Gerekli Bilgileri Doldurunuz");
    }
  };

  const onSubmit = async () => {
    saveShareOwner();
  };

  // logic to control of check contact info input check
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isOneShare, setIsOneShare] = useState<boolean>(false);
  const disableInputsWithCSSStyle = (displayTrueIndex: number) => {
    if (!isChecked) {
      for (let index = 1; index <= shareQuantity; index++) {
        const el = document.getElementById("check-info-input-" + index);
        if (el != null && index != displayTrueIndex) {
          el.style.display = "none";
        }

        const elShareQuantityTabHeaderItem = document.getElementById(
          "share-quantity-tab-header-" + index
        );
        if (elShareQuantityTabHeaderItem != null && index != displayTrueIndex) {
          elShareQuantityTabHeaderItem.style.display = "none";
          setIsOneShare(true);
        }
      }
    } else {
      for (let index = 1; index <= shareQuantity; index++) {
        const el = document.getElementById("check-info-input-" + index);
        if (el != null && index != displayTrueIndex) {
          el.style.display = "block";
        }

        const elShareQuantityTabHeaderItem = document.getElementById(
          "share-quantity-tab-header-" + index
        );
        if (elShareQuantityTabHeaderItem != null && index != displayTrueIndex) {
          elShareQuantityTabHeaderItem.style.display = "block";
          setIsOneShare(false);
        }
      }
    }
    setIsChecked(!isChecked);
  };

  // set share html tabs header
  const shareHTMLTabHeaderItems = [];
  for (let index = 1; index <= shareQuantity; index++) {
    shareHTMLTabHeaderItems.push(
      <li
        className="nav-item"
        role="presentation"
        key={index}
        id={"share-quantity-tab-header-" + index}
      >
        <button
          className={index == 1 ? "nav-link active" : "nav-link"}
          id={"home-tab-" + (index - 1)}
          data-bs-toggle="tab"
          data-bs-target={"#home-tab-pane-" + (index - 1)}
          type="button"
          role="tab"
          aria-controls={"home-tab-pane-" + (index - 1)}
          aria-selected="true"
          onClick={() => console.log("asd")}
        >
          {isOneShare ? "Hisse" : index + ". Hisse"}
        </button>
      </li>
    );
  }

  const setFields = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    switch (field) {
      case "fullName":
        setFullName(e.target.value);
        break;
      case "phone":
        setPhone(e.target.value);
        break;
      case "address":
        setAddress(e.target.value);
        break;

      default:
        break;
    }
  };

  const [shareOwnerMapper, setShareOwnerMapper] = useState<
    Map<string, ShareOwner>
  >(new Map());
  const setShareInfo = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    saveShareOwnerIndex: number
  ) => {
    // let sO = shareOwnerMapper.get(saveShareOwnerIndex.toString());
    // console.log("ads")
    // console.log(sO)
    // if (sO != undefined) {
    //   console.log("ads")
    // }else {
    //   setShareOwnerMapper(saveShareOwnerIndex.toString(),"")
    // }
    setFields(e, field);
  };

  // set share html tabs body
  const shareHTMLTabBodyItems = [];
  for (let index = 1; index <= shareQuantity; index++) {
    shareHTMLTabBodyItems.push(
      <div
        className={
          index - 1 == 0 ? "tab-pane fade show active" : "tab-pane fade"
        }
        id={"home-tab-pane-" + (index - 1)}
        role="tabpanel"
        aria-labelledby={"home-tab-" + (index - 1)}
        tabIndex={index - 1}
        key={index}
      >
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
                  onChange={(e) => setShareInfo(e, "fullName", index - 1)}
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
                  placeholder="(506) 555 55 55"
                  onChange={(e) => setShareInfo(e, "phone", index - 1)}
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
                placeholder="Adres Giriniz"
                onChange={(e) => setShareInfo(e, "address", index - 1)}
              />
            </div>
            <div className="form-check" id={"check-info-input-" + index}>
              <input
                className="form-check-input"
                type="checkbox"
                id={"kayitCheckbox-" + index}
                onClick={() => disableInputsWithCSSStyle(index)}
              />
              <label
                className="form-check-label small"
                htmlFor={"kayitCheckbox-" + index}
              >
                Tüm hisselerin bu iletişim bilgisine kaydedilmesini istiyorum.
              </label>
            </div>
            {/* <div className="form-check" style={{ marginTop: "10px" }}>
              <input
                className="form-check-input"
                type="checkbox"
                id="kayitCheckbox"
              />
              <label className="form-check-label small" htmlFor="kayitCheckbox">
                Vekaletimi verdim.
              </label>
            </div> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="container d-flex justify-content-center"
        style={{ marginBottom: "2vw" }}
      >
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
                    Hisse Adedi
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
                    {selectedCuttingTime == null
                      ? willBeAssociate.cuttingTime
                      : selectedCuttingTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              {shareHTMLTabHeaderItems}
            </ul>
            <div className="tab-content" id="myTabContent">
              {shareHTMLTabBodyItems}
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
          onClick={onSubmit}
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
                onClick={onSubmit}
              ></Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Confirmation;
