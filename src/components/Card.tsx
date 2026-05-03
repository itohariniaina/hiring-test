import type { User } from "../types/User";
export const Card = (props: User) => {
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
          </div>
        </div>
      ) : null}
    </>
  );
};
