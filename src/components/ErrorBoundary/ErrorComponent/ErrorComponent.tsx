export const ErrorComponent = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Something went wrong</h2>
      <button
        style={{ margin: '30px auto' }}
        onClick={() => window.location.reload()}
      >
        Back
      </button>
    </div>
  );
};
