import React from "react";

const FormWeight = () => {
  const modelKameraOptions = [
    { value: "mirrorless", label: "Mirrorless", rating: 1 },
    { value: "pocket", label: "Pocket", rating: 2 },
    { value: "dslr", label: "DSLR", rating: 3 },
  ];

  const hargaKameraOptions = [
    { value: "1-5", label: "Rp. 1 juta – Rp. 5 juta", rating: 1 },
    { value: "5-10", label: "Rp. > 5 juta – Rp. 10 juta", rating: 2 },
    { value: "10-15", label: "Rp. > 10 juta – Rp. 15 juta", rating: 3 },
    { value: "15-20", label: "Rp. > 15 juta – Rp. 20 juta", rating: 4 },
    { value: "20-25", label: "Rp. > 20 juta – Rp. 25 juta >", rating: 5 },
  ];

  const resolusiFotoOptions = [
    { value: "10-15", label: "10 MP – 15 MP", rating: 1 },
    { value: "15-20", label: "> 15 MP – 20 MP", rating: 2 },
    { value: "20-25", label: "> 20 MP – 25 MP", rating: 3 },
    { value: "25-30", label: "> 25 MP – 30 MP", rating: 4 },
    { value: "30", label: "> 30 MP", rating: 5 },
  ];

  const resolusiVideoOptions = [
    { value: "640", label: "Video (640 x 480)", rating: 1 },
    { value: "1280", label: "Video HD (1280 x 720)", rating: 2 },
    { value: "1920", label: "Full HD (1920 x 1080)", rating: 3 },
    { value: "3840", label: "Ultra HD (3840 x 2160)", rating: 4 },
    { value: "4096", label: "4K (4096 x 2160)", rating: 5 },
  ];

  const dayaBateraiOptions = [
    { value: "100-500", label: "100 mAH – 500 mAH", rating: 1 },
    { value: "500-1000", label: "> 500 mAH – 1000 mAH", rating: 2 },
    { value: "1000-1500", label: "> 1000 mAH – 1500 mAH", rating: 3 },
    { value: "1500-2000", label: "> 1500 mAH – 2000 mAH", rating: 4 },
    { value: "2000-2500", label: "> 2000 mAH – 2500 mAH", rating: 5 },
  ];

  const hello = (e) => {
    e.preventDefault();
    console.log("hello world");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="shadow w-[300px] md:w-[500px] p-8">
        <form onSubmit={hello} className="flex flex-col space-y-4">
          <div>
            <label className="label__input">Model Kamera</label>
            <select name="modelKamera" className="input">
              {modelKameraOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label__input">Harga Kamera</label>
            <select name="hargaKamera" className="input">
              {hargaKameraOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label__input">Resolusi Foto Kamera (Pixel)</label>
            <select name="resolusiFoto" className="input">
              {resolusiFotoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label__input">
              Resolusi Video Kamera (Pixel)
            </label>
            <select name="resolusiVideo" className="input">
              {resolusiVideoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label__input">Daya Baterai Kamera</label>
            <select name="dayaBaterai" className="input">
              {dayaBateraiOptions.map((option) => (
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
  );
};

export default FormWeight;
