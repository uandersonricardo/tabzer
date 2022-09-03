import React, { useMemo, useState } from "react";

import { IoMdMusicalNotes } from "react-icons/io";

import BaseSelect from "../BaseSelect";

const difficultyOptions = [
  { value: "all", label: "Qualquer dificuldade" },
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" }
];

interface DifficultySelectProps {
  withAll?: boolean;
  showText?: boolean;
  onChange?: (value: string) => void;
}

const DifficultySelect: React.FC<DifficultySelectProps> = ({
  withAll = false,
  showText = true,
  onChange: handleChange = () => undefined
}) => {
  const [difficulty, setDifficulty] = useState(withAll ? "all" : "beginner");

  const options = useMemo(
    () =>
      withAll
        ? difficultyOptions
        : difficultyOptions.filter(option => option.value !== "all"),
    [withAll]
  );

  const onChange = (value: string) => {
    setDifficulty(value);
    handleChange(value);
  };

  return (
    <BaseSelect
      options={options}
      value={difficulty}
      onChange={onChange}
      showText={showText}
    />
  );
};

export default DifficultySelect;
