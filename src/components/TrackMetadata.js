const TrackMetadata = ({ producer, genre, size }) => (
  <ul className="contentBox" id="trackMetadata">
    <li>producer: {producer}</li>
    <li>genre: {genre}</li>
    <li>size: {size}</li>
  </ul>
);

export default TrackMetadata;
