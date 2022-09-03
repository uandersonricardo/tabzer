import React, { useMemo, useState } from "react";

import { IoMdMusicalNotes } from "react-icons/io";

import BaseSelect from "../BaseSelect";

const tuningOptions = [
  { value: "all", label: "Todas as afinações" },
  { value: "standard", label: "Padrão" },
  { value: "drop-d", label: "Drop D" },
  { value: "drop-c#", label: "Drop C#" },
  { value: "drop-c", label: "Drop C" }
];

interface TuningSelectProps {
  withAll?: boolean;
  showText?: boolean;
  onChange?: (value: string) => void;
}

const TuningSelect: React.FC<TuningSelectProps> = ({
  withAll = false,
  showText = true,
  onChange: handleChange = () => undefined
}) => {
  const [tuning, setTuning] = useState(withAll ? "all" : "standard");

  const options = useMemo(
    () =>
      withAll
        ? tuningOptions
        : tuningOptions.filter(option => option.value !== "all"),
    [withAll]
  );

  const onChange = (value: string) => {
    setTuning(value);
    handleChange(value);
  };

  return (
    <BaseSelect
      options={options}
      value={tuning}
      onChange={onChange}
      icon={<IoMdMusicalNotes />}
      showText={showText}
    />
  );
};

export default TuningSelect;
