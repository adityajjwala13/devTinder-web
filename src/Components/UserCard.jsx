const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoURL } = user;
  console.log(user);
  return (
    <div className="card bg-base-300 w-80 shadow-sm min-h-[500px]">
      <figure>
        <img src={photoURL} alt="..." className="h-90 w-80" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + "," + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-2">
          <button className="btn btn-primary text-black">Ignore</button>
          <button className="btn btn-secondary text-black">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
