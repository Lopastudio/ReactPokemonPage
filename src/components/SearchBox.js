function SearchBox(props) {
    return (
      <form style={{display: "flex", justifyContent: "center"}}>
        <input type="text" placeholder="Search Pokemon..." value={props.value} onChange={props.onChange} />
      </form>
    );
  }
export default SearchBox;