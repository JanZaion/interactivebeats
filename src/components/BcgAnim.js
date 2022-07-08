const lights = [];

for (let i = 0; i < 9; i++) {
  lights.push(<div key={i} className={`light x${i}`} />);
}

const BcgAnim = () => {
  return <div className="bcgAnim">{lights}</div>;
};

export default BcgAnim;
