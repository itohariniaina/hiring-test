type ToDoFilerProps = {
  filterText: string;
  setFilterText: (text: string) => void;
};

const ToDoFilter = (props: ToDoFilerProps) => {
  return (
    <input
      style={{ height: 25, marginTop: 10 }}
      value={props.filterText}
      onChange={(e) => props.setFilterText(e.target.value)}
      type="text"
      placeholder="Filter tasks"
    />
  );
};

export default ToDoFilter;
