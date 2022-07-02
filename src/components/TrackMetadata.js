const TrackMetadata = ({ producer, genre, size }) => {
  return (
    <div className="contentBox" id="trackMetadata">
      <p>producer: {producer}</p>
      <p>genre: {genre}</p>
      <p>size: {size}</p>
    </div>
  );
};

export default TrackMetadata;
