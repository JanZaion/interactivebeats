const lights = [];

for (let i = 0; i < 16; i++) lights.push(<div key={i} className={`beam x${i}`} />);

const BcgAnim = () => <div className="bcgAnim">{lights}</div>;

export default BcgAnim;
