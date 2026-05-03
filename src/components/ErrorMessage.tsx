export const ErrorMessage = (props: { error: string }) => {
  return (
    <div style={{ margin: "1em" }}>
      <div style={{ display: "inline-block" }}>
        <div style={{ fontSize: "1.1em", fontWeight: "bold" }}>
          {props.error}
        </div>
      </div>
    </div>
  );
};
