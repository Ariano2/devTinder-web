const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="Please provide a valid photoUrl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        {age && gender && (
          <p>{age + ', ' + gender[0].toUpperCase() + gender.slice(1)}</p>
        )}
        {about && <p>{about}</p>}
        <div className="card-actions my-6 justify-around flex font-semibold">
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-success">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
