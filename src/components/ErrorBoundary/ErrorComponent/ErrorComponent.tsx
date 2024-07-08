const ErrorComponent = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Something went wrong</h2>
      <button style={{ margin: '30px auto' }} onClick={handleClick}>
        Back
      </button>
    </div>
  );
};

export default ErrorComponent;
