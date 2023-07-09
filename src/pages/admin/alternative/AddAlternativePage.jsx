import React, { useState, useEffect } from "react";
import { uid } from "uid";
import { app } from "../../../config";
import { useNavigate } from "react-router-dom";
import { set, ref, getDatabase, onValue } from "firebase/database";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const db = getDatabase(app);
const AddAlternativePage = () => {
  const [alternative, setAlternative] = useState("");
  const [subcriteriaData, setSubcriteriaData] = useState([]);
  const [data, setData] = useState([]);
  const [dataModel, setDataModel] = useState([]);
  const [dataPrice, setDataPrice] = useState([]);
  const [dataPhotoResolution, setDataPhotoResolution] = useState([]);
  const [dataVideoResoultion, setDataVideoResolution] = useState([]);
  const [dataBattery, setDataBattery] = useState([]);
  const [cameraAttributes, setCameraAttributes] = useState({
    model: 1,
    price: 1,
    photoResolution: 1,
    videoResolution: 1,
    batteryPower: 1,
  });
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const addAlternative = (e) => {
    e.preventDefault();
    const uuid = uid();

    // Create a Firebase Storage reference
    const storageRef = refStorage(
      getStorage(app),
      `/alternativeImages/${uuid}`
    );

    // Upload the image file to Firebase Storage
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        // Get the download URL of the uploaded image
        getDownloadURL(snapshot.ref)
          .then((imageUrl) => {
            // Save the alternative details and image URL to the database
            set(ref(db, `/alternative/${uuid}`), {
              alternative,
              uuid,
              cameraAttributes: cameraAttributes,
              imageUrl: imageUrl, // Add the image URL
            });
            navigate("/pages/data-alternative");
          })
          .catch((error) => {
            console.error("Error getting image download URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const getData = () => {
    const criteriaRef = ref(db, "criteria");
    onValue(criteriaRef, (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();

        data.push({
          key,
          value,
        });
      });
      setData(data);
    });
  };

  useEffect(() => {
    getSubcriteria();
    getData();
  }, []);

  const getSubcriteria = () => {
    const subcriteriaRef = ref(db, "subcriteria");
    onValue(subcriteriaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const subcriteriaArray = Object.entries(data).map(([key, value]) => ({
          key,
          ...value,
        }));
        const modelSubcriteriaArray = subcriteriaArray.filter(
          (subcriteria) => subcriteria.selectedCriteria === "Model Kamera"
        );
        setDataModel(modelSubcriteriaArray);

        const priceSubcriteriaArray = subcriteriaArray.filter(
          (subcriteria) => subcriteria.selectedCriteria === "Harga Kamera"
        );
        setDataPrice(priceSubcriteriaArray);

        const photoResolutionSubcriteriaArray = subcriteriaArray.filter(
          (subcriteria) =>
            subcriteria.selectedCriteria === "Resolusi Foto Kamera (Pixel)"
        );
        setDataPhotoResolution(photoResolutionSubcriteriaArray);

        const videoResolutionSubcriteriaArray = subcriteriaArray.filter(
          (subcriteria) =>
            subcriteria.selectedCriteria === "Resolusi Video Kamera (Pixel)"
        );
        setDataVideoResolution(videoResolutionSubcriteriaArray);

        const batterySubcriteriaArray = subcriteriaArray.filter(
          (subcriteria) =>
            subcriteria.selectedCriteria === "Daya Baterai Kamera"
        );
        setDataBattery(batterySubcriteriaArray);

        setSubcriteriaData(subcriteriaArray);
      }
    });
  };

  const handleCameraAttributeChange = (attributeName, value) => {
    setCameraAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attributeName]: value,
    }));
  };

  return (
    <>
      <form onSubmit={addAlternative}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="" className="label__input">
              Alternatif
            </label>
            <input
              value={alternative}
              onChange={(e) => setAlternative(e.target.value)}
              type="text"
              className="input"
            />
          </div>
          <div>
            <label className="label__input">Model Kamera</label>
            <select
              name="cameraModel"
              className="input"
              value={cameraAttributes.model}
              onChange={(e) =>
                handleCameraAttributeChange("model", e.target.value)
              }
            >
              {dataModel.map((item, index) => (
                <option key={index + 1} value={item.weight}>
                  {item.subcriteria}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label__input">Harga Kamera</label>
            <select
              name="cameraPrice"
              className="input"
              value={cameraAttributes.price}
              onChange={(e) =>
                handleCameraAttributeChange("price", e.target.value)
              }
            >
              {dataPrice.map((item, index) => (
                <option key={index + 1} value={item.weight}>
                  {item.subcriteria}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label__input">Resolusi Foto Kamera (Pixel)</label>
            <select
              name="cameraPhotoResolution"
              className="input"
              value={cameraAttributes.photoResolution}
              onChange={(e) =>
                handleCameraAttributeChange("photoResolution", e.target.value)
              }
            >
              {dataPhotoResolution.map((item, index) => (
                <option key={index + 1} value={item.weight}>
                  {item.subcriteria}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label__input">
              Resolusi Video Kamera (Pixel)
            </label>
            <select
              name="cameraVideoResolution"
              className="input"
              value={cameraAttributes.videoResolution}
              onChange={(e) =>
                handleCameraAttributeChange("videoResolution", e.target.value)
              }
            >
              {dataVideoResoultion.map((item, index) => (
                <option key={index + 1} value={item.weight}>
                  {item.subcriteria}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label__input">Daya Baterai Kamera</label>
            <select
              name="camereBatteryPower"
              className="input"
              value={cameraAttributes.batteryPower}
              onChange={(e) =>
                handleCameraAttributeChange("batteryPower", e.target.value)
              }
            >
              {dataBattery.map((item, index) => (
                <option key={index + 1} value={item.weight}>
                  {item.subcriteria}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="" className="label__input">
            Gambar
          </label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit" className="w-full mt-6 button__primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddAlternativePage;
