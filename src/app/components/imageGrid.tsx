export default function ImageGrid(): JSX.Element {
  const images = [
    {
      src: "https://img.freepik.com/free-photo/salad-with-fresh-vegetables-plate-top-view_169016-29107.jpg",
    },
    {
      src: "https://img.freepik.com/premium-photo/top-view-chinese-fried-rice-black-background-concept-chinese-cuisine-fried-rice-food-photography-black-background-top-view_864588-44056.jpg",
    },
    {
      src: "https://img.freepik.com/premium-photo/homemade-chicken-tocino-with-sunny-egg-served-dish-isolated-wooden-background-top-view-breakfast_689047-2863.jpg",
    },
    {
      src: "https://simpleandseasonal.com/wp-content/uploads/2020/09/crockpot-express-roasted-red-pepper-and-tomato-soup-2.jpg",
    },
    { src: "https://cnz.to/wp-content/uploads/2008/11/mv_lasagna-3.jpg" },
    {
      src: "https://img.freepik.com/premium-photo/grilled-ribeye-beef-steak-herbs-spices-juicy-cooked-steak-top-view-rustic-style-flat-lay_187166-47400.jpg",
    },
  ];

  return (
    <div className="flex flex-wrap mx-20 lg:mx-80">
      {images.map((image, index) => {
        //creates a grid of images for main page
        return (
          <div key={index} className="w-1/3">
            <img
              src={image.src}
              alt={`image${index + 1}`}
              className="w-auto h-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
