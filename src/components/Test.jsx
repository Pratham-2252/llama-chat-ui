import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import AutoSuggest from "./AutoSuggest";

import { Divider } from "primereact/divider";

const Test = () => {
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(null);

  return (
    <>
      <div className="text-center">
        <Button
          label="Click"
          icon="pi pi-plus"
          onClick={(e) => setCount(count + 1)}
        ></Button>
        <div className="text-2xl text-900 mt-3">{count}</div>
        <AutoSuggest />
        <Divider />
        <Calendar
          value={date}
          onChange={(e) => setDate(e.value)}
          dateFormat="dd/mm/yy"
        />
        <Divider />
      </div>
    </>
  );
};

export default Test;
