export default function Movie() {
  return (
    <div className="p-2.5  content-center bg-blue-400 lg:max-w-xs">
      <div className="flex justify-center items-center">
        <img
          className="max-h-80 w-1/2 ml.auto"
          src="https://cdn.marvel.com/content/1x/dp3_1sht_intl_digital_srgb_ka_blades_v2_resized.jpg"
          alt=""
        />
      </div>

      <div className="content  justify-items-center">
        <h3 className="">deadpool and Wolverine</h3>
        <div className="rating">0</div>
        <div className="genres">Action</div>
      </div>
    </div>
  );
}
