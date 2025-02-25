import { AutoComplete } from "primereact/autocomplete";
import React, { useState } from "react";

const AutoSuggest = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);

  const search = (event) => {
    let _items = [...Array(10).keys()];
    setItems(
      event.query
        ? [...Array(10).keys()].map((item) => event.query + "-" + item)
        : _items
    );
  };

  return (
    <AutoComplete
      value={value}
      suggestions={items}
      completeMethod={search}
      onChange={(e) => setValue(e.value)}
      dropdown
    />
  );
};

export default AutoSuggest;
