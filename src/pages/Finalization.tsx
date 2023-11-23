import { useLocation, Link } from "react-router-dom";
import CowImage from "../assets/images/cow.png";

const Finalization = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="tesekkur">
          <p className="d-flex justify-content-center">Teşekkürler</p>
          <p className="d-flex justify-content-center">
            Hisse kaydınız başarıyla gerçekleştirilmiştir
          </p>
        </div>
        <div className="col-lg-6">
          <div className="alertt">
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
            <span style={{ fontSize: "16px" }}>
              Hacı Bayram, Ulus, Adliye Sk. No:1, 06050 Altındağ/Ankara
            </span>
            <p style={{ marginTop: "15px" }}>
              <span style={{ fontWeight: "600" }}>Kesim Noktası: </span>
              <span> Sarılar Köyü, Kahramankazan/Ankara</span>
            </p>
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
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                style={{ marginLeft: "20px", borderRadius: "5px" }}
              >
                Hissemi Sorgula
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12">
          <div
            className="text-white mx-auto d-block"
            style={{ width: "100%", marginBottom: "174px" }}
          >
            <img src={CowImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finalization;
