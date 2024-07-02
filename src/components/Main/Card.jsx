export function Card({ imageUrl, children }) {
  return (
    <div className="card">
      <p>{children}</p>
      <div>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
}
