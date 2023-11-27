import CowImage from "../assets/images/cow.png";
import AlarmClockImage from "../assets/images/alarm-clock.png";
import CheckMarkImage from "../assets/images/check-mark.png";
import HygienicImage from "../assets/images/hygienic.png";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

interface Props {
  fullName: string;
  address: string;
  shareQuantity: number;
  shareCost: string;
  deliveryType: string;
  phone: string;
}

const Home = () => {
  const [deliveryType, setDeliveryType] = useState<string>();
  const [shareCost, setShareCost] = useState<string>();
  const [shareQuantity, setShareQuantity] = useState<number>();

  const [phone, setPhone] = useState<string>("");

  // const location = useLocation();
  // const fromConfirmation = location.state?.fromConfirmation;
  // if (fromConfirmation !== null) {
  //   console.log("nulllllllll")
  // }

  const onClickDeliveryType = (deliveryType: string) => {
    setDeliveryType(deliveryType);
  };

  const onClickShareCost = (shareCost: string) => {
    setShareCost(shareCost);
  };

  const onClickShareQuantity = (shareQuantity: string) => {
    setShareQuantity(parseInt(shareQuantity));
  };

  useEffect(() => {
    // if (fromConfirmation !== null) {
    //   console.log("buraya girdi")
    //   setDeliveryType(fromConfirmation.deliveryType)
    //   setShareCost(fromConfirmation.shareCost)
    //   setShareQuantity(fromConfirmation.shareQuantity)
    // }

    // run something every time name changes
    console.log(deliveryType + " , " + shareCost + " , " + shareQuantity);
  }, [deliveryType, shareCost, shareQuantity]);

  // set share quantity html buttons
  const shareQuantityButtons = [];
  for (let index = 1; index <= 7; index++) {
    index == 1
      ? shareQuantityButtons.push(
          <Button
            key={index}
            buttonTitle={index.toString()}
            style={{ flex: "1", margin: "0px" }}
            additionalStyles={["btn-secondary", "hisse-adet"]}
            onClick={onClickShareQuantity}
          ></Button>
        )
      : shareQuantityButtons.push(
          <Button
            key={index}
            buttonTitle={index.toString()}
            style={{ flex: "1" }}
            additionalStyles={["btn-secondary", "hisse-adet"]}
            onClick={onClickShareQuantity}
          ></Button>
        );
  }

  // set share cost html buttons
  const shareCostButtons = [];
  const shareCosts = ["8500", "9250", "1000", "10750", "11500"];
  for (let index = 0; index < shareCosts.length; index++) {
    index == 0
      ? shareCostButtons.push(
          <Button
            key={index}
            buttonTitle={shareCosts[index]}
            style={{ flex: "1", marginLeft: "0px" }}
            additionalStyles={["btn-secondary", "hisse-fiyat"]}
            additionalTextAsHtml={<span>₺</span>}
            onClick={onClickShareCost}
          ></Button>
        )
      : shareCostButtons.push(
          <Button
            key={index}
            buttonTitle={shareCosts[index]}
            style={{ flex: "1", marginLeft: "20px" }}
            additionalStyles={["btn-secondary", "hisse-fiyat"]}
            additionalTextAsHtml={<span>₺</span>}
            onClick={onClickShareCost}
          ></Button>
        );
  }

  const shareOwnersRef = collection(db, "shareOwners");
  const q = query(shareOwnersRef, where("phone", "==", phone));
  const navigate = useNavigate();
  const getShareOwnerInfo = async () => {
    const querySnapshot = await getDocs(q);
    let shareOwnerInfo: Props = {
      fullName: "",
      address: "",
      phone: "",
      shareCost: "",
      shareQuantity: 0,
      deliveryType: "",
    };
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        shareOwnerInfo = doc.data() as Props;
      });
    } else {
      throw new Error("Something bad happened");
    }
    return shareOwnerInfo;
  };

  const onFindShareOwner = () => {
    getShareOwnerInfo()
      .then((shareOwnerInfo) => {
        navigate("/shareInfo", { state: shareOwnerInfo });
      })
      .catch((e) => {
        console.log("cannot find share owner that have it phone number");
      });
  };

  return (
    <>
      {/* first part */}
      <div className="container d-flex">
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <div>
              <span className="kurban" style={{ color: "#101010" }}>
                Kurban <br />
                <span style={{ color: "#3ec564" }}>ibadetini birlikte</span>
                <br />
                gerçekleştirelim!
              </span>
            </div>
            <button type="button" className="btn btn-success">
              Hemen Başlayalım!
            </button>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div
              className="text-white mx-auto d-block"
              style={{ width: "100%" }}
            >
              <img src={CowImage} alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* second part */}
      <div className="container d-flex">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="col-lg-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                style={{
                  borderRadius: "5px",
                  fontWeight: "400",
                  lineHeight: "24px",
                }}
                placeholder="Telefon Numaranız"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                onChange={(e) => setPhone(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                style={{ marginLeft: "20px", borderRadius: "5px" }}
                onClick={onFindShareOwner}
              >
                Hissemi Sorgula
              </button>
            </div>
            <div className="col-lg-12 col-sm-12 d-flex align-items-center teslimat-bilgi">
              <div className="col-lg-3 col-sm-6 teslimat-bilgiler">
                <img className="teslimat-photo" src={AlarmClockImage} alt="" />
                <p className="bayram-teslim">
                  Bayramın <br />
                  1. Günü Teslim
                </p>
              </div>
              <div className="col-lg-3 teslimat-bilgiler">
                <img className="teslimat-photo" src={CheckMarkImage} alt="" />
                <p className="bayram-teslim">
                  İslami <br />
                  Usullere Uygun
                </p>
              </div>
              <div className="col-lg-3 teslimat-bilgiler">
                <img className="teslimat-photo" src={HygienicImage} alt="" />
                <p className="bayram-teslim">
                  Hijyenik <br />
                  Ortamda Kesim
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6" style={{ justifyContent: "space-between" }}>
            <div className="sss">
              <span>SIKÇA SORULAN SORULAR</span>
            </div>
            <div className="accordion">
              <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      Biz Kimiz
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <strong>This is the first item's accordion body.</strong>{" "}
                      It is shown by default, until the collapse plugin adds the
                      appropriate classes that we use to style each element.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseTwo"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseTwo"
                    >
                      Biz Kimiz
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      This is the second item's accordion body.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseThree"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseThree"
                    >
                      Accordion Item #3
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseThree"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      <strong>This is the third item's accordion body.</strong>{" "}
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* third part */}
      <div className="container">
        <div className="row">
          <div
            className="col-lg-12 d-flex align-items-center justify-content-center kurban-hisse"
            style={{ backgroundColor: "#fcfcfc" }}
          >
            <div className="col-lg-4 d-flex align-items-center justify-content-center kurban-hissesi">
              2000+ Kurban Hissesi
            </div>
            <div className="col-lg-4 d-flex align-items-center justify-content-center kurban-hissesi">
              2000+ Kurban Hissesi
            </div>
            <div className="col-lg-4 d-flex align-items-center justify-content-center kurban-hissesi">
              2000+ Kurban Hissesi
            </div>
          </div>
        </div>
      </div>
      {/* fourth part */}
      <div className="container">
        <div className="row teslimat">
          {/* Sol Seçim */}
          <div className="col-lg-6" style={{ marginTop: "59px" }}>
            <div className="teslimat-türü">
              <p className="teslimat-yazi">Teslimat Türü</p>
              <div id="button-group1" className="button-teslimat-turu d-flex">
                <Button
                  buttonTitle="Kesimhanede Teslim"
                  style={{ margin: "0px" }}
                  additionalStyles={["btn-secondary", "hisse-teslim"]}
                  onClick={onClickDeliveryType}
                ></Button>
                <Button
                  buttonTitle="Toplu Teslim"
                  style={{ marginLeft: "12px" }}
                  additionalStyles={["btn-secondary", "hisse-teslim"]}
                  onClick={onClickDeliveryType}
                ></Button>
              </div>
            </div>
            <div className="hisse-tutarı" style={{ marginTop: "36px" }}>
              <p className="teslimat-yazi">Hisse Tutarı</p>
              <div className="container">
                <div className="row">
                  <div
                    id="button-group2"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "0px",
                      width: "88%",
                    }}
                  >
                    <div style={{ display: "flex" }}>{shareCostButtons}</div>
                    <div
                      style={{
                        display: "flex",
                        marginTop: "15px",
                        width: "79%",
                      }}
                    >
                      <button
                        className="btn btn-secondary hisse-fiyat"
                        style={{ flex: "1", marginLeft: "0px" }}
                      >
                        12000<span>₺</span>
                      </button>
                      <button
                        className="btn btn-secondary hisse-fiyat"
                        style={{ flex: "1", marginLeft: "20px" }}
                      >
                        12500<span>₺</span>
                      </button>
                      <button
                        className="btn btn-secondary hisse-fiyat"
                        style={{ flex: "1", marginLeft: "20px" }}
                      >
                        13000<span>₺</span>
                      </button>
                      <button
                        className="btn btn-secondary hisse-fiyat"
                        style={{ flex: "1", marginLeft: "20px" }}
                      >
                        13500<span>₺</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hisse-adedi" style={{ marginTop: "36px" }}>
              <p className="teslimat-yazi">Hisse Adedi</p>
              <div
                id="button-group3"
                className="d-flex"
                style={{ width: "80%" }}
              >
                {shareQuantityButtons}
              </div>
            </div>
          </div>

          {/* Sağ Tablo */}
          <div className="col-lg-6" style={{ marginTop: "59px" }}>
            <div className="d-flex">
              <p className="teslimat-yazi">Saat Seçimi</p>
              <p
                style={{
                  marginLeft: "15px",
                  display: "flex",
                  alignItems: "end",
                  fontSize: "15px",
                  color: "#8f8f8f",
                }}
              >
                29 Haziran, Perşembe
              </p>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Saat</th>
                    <th>Hisse No</th>
                    <th>İlk Hisse Sahibi</th>
                    <th>Boş Hisse Sayısı</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>09:00</td>
                    <td>123</td>
                    <td>Ali</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>09:15</td>
                    <td>456</td>
                    <td>Ahmet</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>09:30</td>
                    <td>789</td>
                    <td>Mehmet</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>09:00</td>
                    <td>123</td>
                    <td>Ali</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>09:15</td>
                    <td>456</td>
                    <td>Ahmet</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>09:30</td>
                    <td>789</td>
                    <td>Mehmet</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>09:00</td>
                    <td>123</td>
                    <td>Ali</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>09:15</td>
                    <td>456</td>
                    <td>Ahmet</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>09:30</td>
                    <td>789</td>
                    <td>Mehmet</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>09:00</td>
                    <td>123</td>
                    <td>Ali</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>09:15</td>
                    <td>456</td>
                    <td>Ahmet</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>09:30</td>
                    <td>789</td>
                    <td>Mehmet</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>09:00</td>
                    <td>123</td>
                    <td>Ali</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>09:15</td>
                    <td>456</td>
                    <td>Ahmet</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>09:30</td>
                    <td>789</td>
                    <td>Mehmet</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>09:00</td>
                    <td>123</td>
                    <td>Ali</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>09:15</td>
                    <td>456</td>
                    <td>Ahmet</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>09:30</td>
                    <td>789</td>
                    <td>Mehmet</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>09:00</td>
                    <td>123</td>
                    <td>Ali</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>09:15</td>
                    <td>456</td>
                    <td>Ahmet</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>09:30</td>
                    <td>789</td>
                    <td>Mehmet</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>09:00</td>
                    <td>123</td>
                    <td>Ali</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>09:15</td>
                    <td>456</td>
                    <td>Ahmet</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>09:30</td>
                    <td>789</td>
                    <td>Mehmet</td>
                    <td>3</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className="alert alert-primary d-flex align-content-center"
              role="alert"
            >
              <span
                className="material-symbols-outlined"
                style={{ marginRight: "13px" }}
              >
                error
              </span>
              <span style={{ fontSize: "12px", lineHeight: "18px" }}>
                Kurbanlarımız kesildikten sonra parçalanma süresi 2.30 - 3 saati
                bulabilmektedir.
              </span>
            </div>
            <Link
              style={{ textDecoration: "none" }}
              to="/confirmation"
              state={{
                fromHome: {
                  deliveryType: deliveryType,
                  shareCost: shareCost,
                  shareQuantity: shareQuantity,
                },
              }}
            >
              <button
                className="sonraki-adım"
                onClick={() => console.log("next page")}
              >
                Sonraki Adım
                <span className="material-symbols-outlined">
                  {" "}
                  chevron_right{" "}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
