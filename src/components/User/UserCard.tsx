import type { User } from "../../types/User";
export const UserCard = (props: User) => {
  const creationDate = new Date(props.created_at);
  return (
    <>
      {props.avatar_url ? (
        <div
          style={{
            margin: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img width="75" src={props.avatar_url} alt={props.name} />
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <div style={{ fontSize: "1.25em", fontWeight: "bold" }}>
              {props.name}
            </div>
            <div>{props.company}</div>
            <div>{props.hireable ? "Available" : "Not available"}</div>
            <div>{`Account created on ${creationDate.toLocaleDateString()}`}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};
