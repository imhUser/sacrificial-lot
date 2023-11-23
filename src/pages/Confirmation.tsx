import { useLocation, Link } from "react-router-dom";

interface Props {
  deliveryType: string;
  shareCost: string;
  shareQuantity: number;
}

const Confirmation = () => {
  const location = useLocation();
  const fromHome: Props = location.state.fromHome;

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
                    {fromHome.deliveryType}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="teslimat-yazi">Hisse Tutarı</p>
                  <p
                    className="teslimat-yazi kesimhane-teslim"
                    style={{ width: "15%" }}
                    id="sharePrice"
                  >
                    {fromHome.shareCost} TL
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
                    {fromHome.shareQuantity}
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
                      maxLength={11}
                      placeholder="555 555 55 55"
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
        <button
          type="button"
          className="btn btn-success"
          style={{ marginBottom: "182px" }}
          id="nextButton"
        >
          Kaydımı Kesinleştir!
        </button>
      </div>
    </>
  );
};

export default Confirmation;