const Intro = () => {
  const UA = navigator.userAgent;
  const mac = UA.indexOf('Macintosh') !== -1;
  const iPhone = UA.indexOf('iPhone') !== -1;
  const iPad = UA.indexOf('iPad') !== -1;

  return (
    <div className="intro">
      <p>
        {mac || iPhone || iPad
          ? 'This app is currently not supported on Apple devices :('
          : 'Click a pad, it will be fun...'}
      </p>
    </div>
  );
};

export default Intro;
