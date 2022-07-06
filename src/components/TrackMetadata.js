const TrackMetadata = ({ producer, genre, size }) => {
  return (
    <ul className="contentBox" id="trackMetadata">
      <li>producer: {producer}</li>
      <li>genre: {genre}</li>
      <li>size: {size}</li>
    </ul>
  );
};

export default TrackMetadata;
