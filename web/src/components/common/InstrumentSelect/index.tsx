import React, { useMemo, useState } from "react";

import { GiGuitarHead } from "react-icons/gi";

import BaseSelect from "../BaseSelect";

const instrumentOptions = [
  { value: "all", label: "Todos os instrumentos" },
  { value: "guitar", label: "Violão" },
  { value: "eletric-guitar", label: "Guitarra" }
];

interface InstrumentSelectProps {
  withAll?: boolean;
  showText?: boolean;
  onChange?: (value: string) => void;
}

const InstrumentSelect: React.FC<InstrumentSelectProps> = ({
  withAll = false,
  showText = true,
  onChange: handleChange = () => undefined
}) => {
  const [instrument, setInstrument] = useState(withAll ? "all" : "guitar");

  const options = useMemo(
    () =>
      withAll
        ? instrumentOptions
        : instrumentOptions.filter(option => option.value !== "all"),
    [withAll]
  );

  const onChange = (value: string) => {
    setInstrument(value);
    handleChange(value);
  };

  return (
    <BaseSelect
      options={options}
      value={instrument}
      onChange={onChange}
      icon={<GiGuitarHead />}
      showText={showText}
    />
  );
};

export default InstrumentSelect;
