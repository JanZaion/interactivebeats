const TrackMetadata = ({ producer, genre, size }) => {
  return (
    <div className="metadataBox">
      <div className="trackMetadata">
        <p>producer: {producer}</p>
        <p>genre: {genre}</p>
        <p>size: {size}</p>
      </div>
    </div>
  );
};

export default TrackMetadata;
