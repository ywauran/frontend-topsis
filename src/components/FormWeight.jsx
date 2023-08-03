import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastError from "./ToastError";

const FormWeight = () => {
  const [cameraModel, setCameraModel] = useState(1);
  const [cameraPrice, setCameraPrice] = useState(5);
  const [photoResolution, setPhotoResolution] = useState(1);
  const [videoResolution, setVideoResolution] = useState(1);
  const [batteryPower, setBatteryPower] = useState(1);
  let navigate = useNavigate();
  const [toast, setToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (name.trim() === "") {
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    //   return;
    // }
    navigate(
      `/rank/${cameraModel}/${cameraPrice}/${photoResolution}/${videoResolution}/${batteryPower}`
    );
    console.log("Model Kamera:", cameraModel);
    console.log("Harga Kamera:", cameraPrice);
    console.log("Resolusi Foto:", photoResolution);
    console.log("Resolusi Video:", videoResolution);
    console.log("Kapasitas Baterai:", batteryPower);
  };

  const modelOptions = [
    { value: "1", label: "Mirrorless" },
    { value: "2", label: "Pocket" },
    { value: "3", label: "DSLR" },
  ];

  const priceOptions = [
    { value: "5", label: "Rp. 1 juta – Rp. 5 juta" },
    { value: "4", label: "Rp. > 5 juta – Rp. 10 juta" },
    { value: "3", label: "Rp. > 10 juta – Rp. 15 juta" },
    { value: "2", label: "Rp. > 15 juta – Rp. 20 juta" },
    { value: "1", label: "Rp. > 20 juta – Rp. 25 juta >" },
  ];

  const photoResolutionOptions = [
    { value: "1", label: "10 MP – 15 MP" },
    { value: "2", label: "> 15 MP – 20 MP" },
    { value: "3", label: "> 20 MP – 25 MP" },
    { value: "4", label: "> 25 MP – 30 MP" },
    { value: "5", label: "> 30 MP" },
  ];

  const videoResolutionOptions = [
    { value: "1", label: "Video (640 x 480)" },
    { value: "2", label: "Video HD (1280 x 720)" },
    { value: "3", label: "Full HD (1920 x 1080)" },
    { value: "4", label: "Ultra HD (3840 x 2160)" },
    { value: "5", label: "4K (4096 x 2160)" },
  ];

  const batteryPowerOptions = [
    { value: "1", label: "100 mAH – 500 mAH" },
    { value: "2", label: "> 500 mAH – 1000 mAH" },
    { value: "3", label: "> 1000 mAH – 1500 mAH" },
    { value: "4", label: "> 1500 mAH – 2000 mAH" },
    { value: "5", label: "> 2000 mAH – 2500 mAH" },
  ];

  return (
    <>
      {toast && <ToastError />}
      <div className="flex items-center justify-center h-screen">
        <div className="shadow w-[300px] md:w-[500px] p-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* <div>
              <label className="label__input">Nama</label>
              <input
                type="text"
                className="input"
                onChange={(e) => setName(e.target.value)}
              />
            </div> */}
            <div>
              <label className="label__input">Model Kamera</label>
              <select
                name="cameraModel"
                className="input"
                value={cameraModel}
                onChange={(e) => setCameraModel(e.target.value)}
              >
                {modelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label__input">Harga Kamera</label>
              <select
                name="cameraPrice"
                className="input"
                value={cameraPrice}
                onChange={(e) => setCameraPrice(e.target.value)}
              >
                {priceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label__input">Resolusi Foto (Pixel)</label>
              <select
                name="photoResolution"
                className="input"
                value={photoResolution}
                onChange={(e) => setPhotoResolution(e.target.value)}
              >
                {photoResolutionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label__input">Resolusi Video (Pixel)</label>
              <select
                name="videoResolution"
                className="input"
                value={videoResolution}
                onChange={(e) => setVideoResolution(e.target.value)}
              >
                {videoResolutionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label__input">Kapasitas Baterai</label>
              <select
                name="batteryPower"
                className="input"
                value={batteryPower}
                onChange={(e) => setBatteryPower(e.target.value)}
              >
                {batteryPowerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormWeight;
