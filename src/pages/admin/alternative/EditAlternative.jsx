import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { app } from "../../../config";
import { getDatabase, ref, onValue, update } from "firebase/database";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const db = getDatabase(app);

const EditAlternative = () => {
  const { id } = useParams();
  const [alternative, setAlternative] = useState("");
  const [subcriteriaData, setSubcriteriaData] = useState([]);
  const [data, setData] = useState([]);
  const [dataModel, setDataModel] = useState([]);
  const [dataPrice, setDataPrice] = useState([]);
  const [dataPhotoResolution, setDataPhotoResolution] = useState([]);
  const [dataVideoResoultion, setDataVideoResolution] = useState([]);
  const [dataBattery, setDataBattery] = useState([]);
  const [model, setModel] = useState(1);
  const [price, setPrice] = useState(1);
  const [photoResolution, setPhotoResolution] = useState(1);
  const [videoResolution, setVideoResolution] = useState(1);
  const [batteryPower, setBatteryPower] = useState(1);
  const [image, setImage] = useState(null);
  let navigate = useNavigate();

  const getData = () => {
    const dbRef = ref(db, "alternative");
    onValue(dbRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();

        if (key === id) {
          data.push({ key, value });
        }
      });
      setData(data[0].value);
      setAlternative(data[0].value.alternative);
      setModel(data[0].value.cameraAttributes.model);
      setPrice(data[0].value.cameraAttributes.price);
      setPhotoResolution(data[0].value.cameraAttributes.photoResolution);
      setVideoResolution(data[0].value.cameraAttributes.videoResolution);
      setBatteryPower(data[0].value.cameraAttributes.batteryPower);
    });
  };

  const updateData = (e) => {
    e.preventDefault();

    const storageRef = refStorage(
      getStorage(app),
      `/alternativeImages/${data.uuid}`
    );

    if (!image) {
      update(ref(db, `/alternative/${id}`), {
        alternative,
        cameraAttributes: {
          model: model,
          price: price,
          photoResolution: photoResolution,
          videoResolution: videoResolution,
          batteryPower: batteryPower,
        },
        uuid: data.uuid,
      });
      navigate("/pages/data-alternative");
    } else {
      uploadBytes(storageRef, image)
        .then((snapshot) => {
          // Get the download URL of the uploaded image
          getDownloadURL(snapshot.ref)
            .then((imageUrl) => {
              // Save the alternative details and image URL to the database
              update(ref(db, `/alternative/${id}`), {
                alternative,
                cameraAttributes: {
                  model: model,
                  price: price,
                  photoResolution: photoResolution,
                  videoResolution: videoResolution,
                  batteryPower: batteryPower,
                },
                imageUrl: imageUrl,
                uuid: data.uuid,
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
    }

    navigate("/pages/data-alternative");
  };

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

  useEffect(() => {
    getSubcriteria();
    getData();
  }, []);

  return (
    <div>
      <form onSubmit={updateData}>
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
              value={model}
              onChange={(e) => setModel(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              value={photoResolution}
              onChange={(e) => setPhotoResolution(e.target.value)}
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
              value={videoResolution}
              onChange={(e) => setVideoResolution(e.target.value)}
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
              value={batteryPower}
              onChange={(e) => setBatteryPower(e.target.value)}
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
    </div>
  );
};

export default EditAlternative;
