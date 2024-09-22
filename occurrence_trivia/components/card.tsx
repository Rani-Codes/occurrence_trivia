interface ImageData {
  month: number;
  year: number;
  real: boolean;
  url: string;
}

const Card = ({ image }: { image: ImageData }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-center w-auto h-72 sm:h-96 rounded-lg bg-blackOlive p-4">
        {image ? (
          <div className="flex flex-col justify-center h-auto items-center text-floralWhite">
            {/* Display the image passed via props */}
            <img
              src={image.url}
              alt="Challenge image"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center text-floralWhite">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
