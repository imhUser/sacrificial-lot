import CowImage from "../assets/images/cow.png";
import AlarmClockImage from "../assets/images/alarm-clock.png";
import CheckMarkImage from "../assets/images/check-mark.png";
import HygienicImage from "../assets/images/hygienic.png";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ShareOwner } from "../models/shareOwner";
import { ShareOwnerService } from "../services/shareOwnerService";
import { SacrificialAnimalService } from "../services/sacrificialAnimalService";
import { SacrificialAnimal } from "../models/sacrificialAnimal";

const Home = () => {
  const navigate = useNavigate();

  const [deliveryType, setDeliveryType] = useState<string>();
  const [shareCost, setShareCost] = useState<string>();
  const [shareQuantity, setShareQuantity] = useState<number>();

  const [phone, setPhone] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [shareOwnerList, setShareOwnerList] = useState<ShareOwner[]>([]);
  const [sacrificialAnimalList, setSacrificialAnimalList] = useState<
    SacrificialAnimal[]
  >([]);

  const [selectedSacrificialAnimal, setSelectedSacrificialAnimal] =
    useState<SacrificialAnimal>();
  const cuttingTimeList: string[] = ["9:00", "9:15", "9:30", "9:45"];
  const [selectedCuttingTime, setSelectedCuttingTime] = useState<string>("");

  const [selectedShareOwnerWithTableItem, setSelectedShareOwnerWithTableItem] =
    useState<ShareOwner>();
  const [checkedBtn, setCheckedBtn] = useState<string>("");
  const onCheckTableItem = (shareOwner: ShareOwner, id: string) => {
    document.getElementById(checkedBtn)?.removeAttribute("checked");
    setCheckedBtn(id);

    setSelectedShareOwnerWithTableItem(shareOwner);
    document.getElementById(id)?.setAttribute("checked", "true");
  };

  const resetData = () => {
    setSelectedCuttingTime("");

    document.getElementById(checkedBtn)?.removeAttribute("checked");
    setCheckedBtn("");
    setSelectedShareOwnerWithTableItem({} as ShareOwner);
  };

  const _shareOwnerService = new ShareOwnerService();
  const _sacrificialAnimalService = new SacrificialAnimalService();

  const onClickDeliveryType = (deliveryType: string) => {
    setDeliveryType(deliveryType);
  };

  const onClickShareCost = (shareCost: string) => {
    setShareCost(shareCost);
  };

  const onClickShareQuantity = (shareQuantity: string) => {
    setShareQuantity(parseInt(shareQuantity));
  };

  const displayBlock = () => {
    let shareOwnerTabBody = document.getElementById("profile-tab-pane");
    if (shareOwnerTabBody != null) {
      shareOwnerTabBody.style.display = "block";
    }
  };

  const displayNone = () => {
    let shareOwnerTabBody = document.getElementById("profile-tab-pane");
    if (shareOwnerTabBody != null) {
      shareOwnerTabBody.style.display = "none";
    }
  };
  useEffect(() => {
    console.log(deliveryType + " , " + shareCost + " , " + shareQuantity);

    _shareOwnerService.getAllShareOwners().then((result) => {
      if (result.length > 0) {
        let shareOwnerTabHeader = document.getElementById("profile-tab");
        if (shareOwnerTabHeader != null) {
          shareOwnerTabHeader.style.display = "block";
        }

        setShareOwnerList(result);
      }
    });

    _sacrificialAnimalService.getAll().then((result) => {
      if (result.length > 0) {
        setSacrificialAnimalList(result);
      }
    });
  }, [deliveryType, shareCost, shareQuantity]);

  // set share quantity html buttons
  const shareQuantityButtons = [];
  for (let index = 1; index <= 7; index++) {
    shareQuantityButtons.push(
      <li key={index}>
        <a
          className="dropdown-item"
          onClick={() => onClickShareQuantity(index.toString())}
        >
          {index}
        </a>
      </li>
    );
  }

  // set share cost html buttons
  const shareCostButtons = [];
  const shareCosts = ["8500", "9250", "1000", "10750", "11500"];
  for (let index = 0; index < shareCosts.length; index++) {
    shareCostButtons.push(
      // <Button
      //   key={index}
      //   buttonTitle={shareCosts[index]}
      //   style={{ flex: "1", marginLeft: "20px" }}
      //   additionalStyles={["btn-secondary", "hisse-fiyat"]}
      //   additionalTextAsHtml={<span>₺</span>}
      //   onClick={onClickShareCost}
      // ></Button>
      <li key={index}>
        <a
          className="dropdown-item"
          onClick={() => onClickShareCost(shareCosts[index])}
        >
          {shareCosts[index]} <span>₺</span>
        </a>
      </li>
    );
  }

  // set share owners html table items
  const setShareOwnerTableItems = () => {
    return shareOwnerList.map((item, index) => (
      <tr
        key={index}
        onClick={() => onCheckTableItem(item, "selectTableItem " + index)}
      >
        <td>{item.cuttingTime}</td>
        <td>{item.fullName}</td>
        <td>5</td>
        <td>
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id={"selectTableItem " + index}
            onClick={() => onCheckTableItem(item, "selectTableItem " + index)}
          />
        </td>
      </tr>
    ));
  };

  // set sacrificial animals html select box
  const setSacrificialAnimalTableItems = () => {
    return sacrificialAnimalList.map((item, index) => (
      <li key={index}>
        <a
          className="dropdown-item"
          onClick={() => setSelectedSacrificialAnimal(item)}
        >
          Dana {item.id}
        </a>
      </li>
    ));
  };

  // / set sacrificial animal cutting times html select box
  const setCuttingTimeHTMLItems = () => {
    return cuttingTimeList.map((item, index) => (
      <li key={index}>
        <a
          className="dropdown-item"
          onClick={() => setSelectedCuttingTime(item)}
        >
          {item}
        </a>
      </li>
    ));
  };

  const onFindShareOwner = () => {
    _shareOwnerService
      .getShareOwnerByPhone(phone)
      .then((shareOwnerInfo) => {
        navigate("/shareInfo", {
          state: {
            shareOwner: shareOwnerInfo,
            isNewShareOwner: false,
          },
        });
      })
      .catch((e) => {
        console.log("cannot find share owner that have it phone number");
      });
  };

  const nextPage = () => {
    if (
      selectedShareOwnerWithTableItem != null &&
      deliveryType != null &&
      shareCost != null &&
      shareQuantity != null
    ) {
      navigate("/confirmation", {
        state: {
          fromHome: {
            shareOwner: selectedShareOwnerWithTableItem,
            deliveryType: deliveryType,
            shareCost: shareCost,
            shareQuantity: shareQuantity,
          },
        },
      });
    } else if (
      selectedSacrificialAnimal != null &&
      selectedCuttingTime != "" &&
      deliveryType != null &&
      shareCost != null &&
      shareQuantity != null
    ) {
      navigate("/confirmation", {
        state: {
          fromHome: {
            selectedSacrificialAnimal: selectedSacrificialAnimal,
            selectedCuttingTime: selectedCuttingTime,
            deliveryType: deliveryType,
            shareCost: shareCost,
            shareQuantity: shareQuantity,
          },
        },
      });
    } else {
      alert("Lütfen Gerekli Bilgileri Doldurunuz");
    }
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
              <img src={CowImage} alt="" className="cowImage" />
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

      <div className="container">
        <div className="row teslimat">
          <div className="col">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                  onClick={() => {resetData(); displayNone();}}
                >
                  Yeni Hayvan Seç
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                  onClick={() => {
                    resetData();
                    displayBlock();
                  }}
                  style={{ display: "none" }}
                >
                  Var Olan Hisselerden Hisse Seç
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabIndex={0}
              >
                <div className="container">
                  <div className="row teslimat">
                    <div
                      className="col"
                      style={{ marginTop: "2vw", textAlign: "center" }}
                    >
                      <div
                        className="dropdown-center"
                        style={{ marginBottom: "2vw" }}
                      >
                        <label>Kesim Saati: </label> &nbsp; &nbsp;
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{
                            backgroundColor: "#3ec564",
                            border: "none",
                          }}
                        >
                          {selectedCuttingTime == ""
                            ? "Seçiniz"
                            : selectedCuttingTime}
                        </button>
                        <ul className="dropdown-menu">
                          {setCuttingTimeHTMLItems()}
                        </ul>
                      </div>

                      <div
                        className="dropdown-center"
                        style={{ marginBottom: "2vw" }}
                      >
                        <label>Hayvan Seçiniz: </label> &nbsp; &nbsp;
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{
                            backgroundColor: "#3ec564",
                            border: "none",
                          }}
                        >
                          {selectedSacrificialAnimal == null
                            ? "Seçiniz"
                            : "Dana " + selectedSacrificialAnimal.id}
                        </button>
                        <ul className="dropdown-menu">
                          {setSacrificialAnimalTableItems()}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="row teslimat">
                    <div className="col" style={{ textAlign: "center" }}>
                      {selectedSacrificialAnimal != null ? (
                        <>
                          {"Seçilen Hayvanın Toplam Fiyatı:" +
                            selectedSacrificialAnimal?.totalPrice +
                            "₺"}
                          <br></br>
                          {"Seçtiğiniz Hayvandan Alınabilir Hisse Fiyatı:" +
                            selectedSacrificialAnimal?.purchasableShareQuantity}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane"
                role="tabpanel"
                aria-labelledby="profile-tab"
                tabIndex={0}
                style={{ display: "none" }}
              >
                <div className="container">
                  <div className="row teslimat">
                    {/* {loading ? (
                      <div className="text-center" style={{ marginTop: "3vw" }}>
                        <span className="sr-only">Bilgiler Getiriliyor</span>
                        <div
                          className="spinner-border text-success"
                          role="status"
                        ></div>
                      </div>
                    ) : (
                      
                    )} */}

                    <div className="col" style={{ marginTop: "59px" }}>
                      <div className="table-responsive table-container">
                        <table>
                          <thead>
                            <tr>
                              <th>Saat</th>
                              <th>İlk Hisse Sahibi</th>
                              <th>Boş Hisse Sayısı</th>
                              <th>Seç</th>
                            </tr>
                          </thead>
                          <tbody>{setShareOwnerTableItems()}</tbody>
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
                          Kurbanlarımız kesildikten sonra parçalanma süresi 2.30
                          - 3 saati bulabilmektedir.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(selectedCuttingTime != "" && selectedSacrificialAnimal != null) ||
      checkedBtn != "" ? (
        <div className="container">
          <div className="row teslimat">
            {/* Hisse Seçim */}
            <div className="col" style={{ marginTop: "59px" }}>
              <div className="teslimat-türü">
                <p className="teslimat-yazi">Teslimat Türü</p>
                <div id="button-group1" className="button-teslimat-turu d-flex">
                  {/* <Button
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
                  ></Button> */}

                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      backgroundColor: "grey",
                      border: "none",
                      width: "12vw",
                    }}
                  >
                    {deliveryType == null ? "Seçiniz" : deliveryType}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() =>
                          onClickDeliveryType("Kesimhanede Teslim")
                        }
                      >
                        Kesimhanede Teslim
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => onClickDeliveryType("Toplu Teslim")}
                      >
                        Toplu Teslim
                      </a>
                    </li>
                  </ul>
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
                      {/* <div style={{ display: "flex" }}>{shareCostButtons}</div> */}
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                          backgroundColor: "grey",
                          border: "none",
                          width: "10vw",
                        }}
                      >
                        {shareCost == null ? "Seçiniz" : shareCost}
                      </button>
                      <ul className="dropdown-menu">{shareCostButtons}</ul>
                      {/* <div
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
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="hisse-adedi" style={{ marginTop: "36px" }}>
                <p className="teslimat-yazi">Hisse Adedi</p>
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    backgroundColor: "grey",
                    border: "none",
                    width: "10vw",
                  }}
                >
                  {shareQuantity == null ? "Seçiniz" : shareQuantity}
                </button>
                <ul className="dropdown-menu">{shareQuantityButtons}</ul>
              </div>
              <button
                className="sonraki-adım"
                onClick={() => nextPage()}
                style={{ marginTop: "15px" }}
              >
                Sonraki Adım
                <span className="material-symbols-outlined">
                  {" "}
                  chevron_right{" "}
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
