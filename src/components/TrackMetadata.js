const TrackMetadata = ({ producer, genre, size }) => {
  return (
    <>
      <p>producer: {producer}</p>
      <p>genre: {genre}</p>
      <p>size: {size}</p>
    </>
  );
};

export default TrackMetadata;
