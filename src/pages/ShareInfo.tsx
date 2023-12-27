import { useLocation } from "react-router-dom";
import CowImage from "../assets/images/cow.png";
import { ShareOwner } from "../models/shareOwner";

const ShareInfo = () => {
  const shareOwnerInfo: ShareOwner = useLocation().state.shareOwner;
  const isNewShareOwner: boolean = useLocation().state.isNewShareOwner;
  
  console.log(useLocation());
  return (
    <>
      <div className="container">
        <div className="row">
          {isNewShareOwner ? (
            <div className="tesekkur">
              <p className="d-flex justify-content-center">Teşekkürler</p>
              <p className="d-flex justify-content-center">
                Hisse kaydınız başarıyla gerçekleştirilmiştir
              </p>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <p className="sorgulama">Hisse Sorgulama</p>
            </div>
          )}
          <div>
            <div className="container-fluid">
              <table className="table table-borderless" id="customDataTable">
                <thead className="thead-dark">
                  <tr>
                    <th>Hisse Sahibi</th>
                    <th>Kod</th>
                    <th>Kesim Saati</th>
                    <th>Hisse Bedeli</th>
                    <th>Hisse Adedi</th>
                    <th>Cep Telefonu</th>
                    <th>İşlem Tarihi</th>
                    <th>Teslim Türü</th>
                    <th>Kapora</th>
                    <th>Ücret</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{textAlign:"left"}} data-th="Hisse Sahibi">{shareOwnerInfo.fullName}</td>
                    <td style={{textAlign:"left"}} data-th="Kod">{shareOwnerInfo.code}</td>
                    <td style={{textAlign:"left"}} data-th="Kesim Saati">{shareOwnerInfo.cuttingTime}</td>
                    <td style={{textAlign:"left"}} data-th="Hisse Bedeli">{shareOwnerInfo.shareCost} TL</td>
                    <td style={{textAlign:"left"}} data-th="Hisse Adedi">{shareOwnerInfo.shareQuantity} Adet</td>
                    <td style={{textAlign:"left"}} data-th="Cep Telefonu">{shareOwnerInfo.phone}</td>
                    <td style={{textAlign:"left"}} data-th="İşlem Tarihi">{shareOwnerInfo.processDate}</td>
                    <td style={{textAlign:"left"}} data-th="Teslim Türü">{shareOwnerInfo.deliveryType}</td>
                    <td style={{textAlign:"left"}} data-th="Kapora">
                      {shareOwnerInfo.deposit ? <span
                        style={{
                          backgroundColor: "#bcf3e1",
                          color: "#1a9f75",
                          padding: "2vh",
                          borderRadius: "5px",
                        }}
                      >
                        Alındı
                      </span>:<span
                        style={{
                          backgroundColor: "#ffdadb",
                          color: "#e26260",
                          padding: "2vh",
                          borderRadius: "5px",
                        }}
                      >
                        Alınmadı
                      </span>}
                    </td>
                    <td style={{textAlign:"left"}} data-th="Ücret">
                    {shareOwnerInfo.fee ? <span
                        style={{
                          backgroundColor: "#bcf3e1",
                          color: "#1a9f75",
                          padding: "2vh",
                          borderRadius: "5px",
                        }}
                      >
                        Alındı
                      </span>:<span
                        style={{
                          backgroundColor: "#ffdadb",
                          color: "#e26260",
                          padding: "2vh",
                          borderRadius: "5px",
                        }}
                      >
                        Alınmadı
                      </span>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="alertt" style={{ marginTop: "39px" }}>
              <div
                className="alert alert-danger d-flex"
                role="alert"
                style={{
                  color: "black",
                  backgroundColor: "#e6f7ff",
                  border: "1px solid #beeaff",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ marginRight: "10px" }}
                >
                  error{" "}
                </span>
                <span>
                  Her hisse için 1000₺ kapora verilmesi gerekmektedir ve 7 gün
                  içerisinde kaporası ödenmeyen hisseler iptal edilir.
                </span>
              </div>
              <div className="alert alert-danger d-flex" role="alert">
                <span
                  className="material-symbols-outlined"
                  style={{ marginRight: "10px" }}
                >
                  error
                </span>
                <span>
                  Tüm ödemelerinizin 23 Haziran Cuma gününe kadar tamamlanması
                  gerekmektedir.
                </span>
              </div>
            </div>
            <div className="kapora-adres">
              <span style={{ fontWeight: "600" }}>Kapora Adresi:</span>
              <span>
                Hacı Bayram, Ulus, Adliye Sk. No:1, 06050 Altındağ/Ankara
              </span>
              <p style={{ marginTop: "15px" }}>
                <span style={{ fontWeight: "600" }}>Kesim Noktası: </span>
                <span> Sarılar Köyü, Kahramankazan/Ankara</span>
                <div>
                  <a
                    href="https://maps.app.goo.gl/3szRPFNfeGugJjPo7"
                    target="_blank"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ color: "#05a75b" }}
                    >
                      location_on
                    </span>
                    Haritalarda Görüntüleyin
                  </a>
                </div>
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div
              className="text-white mx-auto d-block"
              style={{ width: "100%", marginBottom: "174px" }}
            >
              <img src={CowImage} alt=""  className="cowImage"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareInfo;
