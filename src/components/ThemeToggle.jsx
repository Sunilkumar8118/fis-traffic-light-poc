import { FormControlLabel, Switch } from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <div style={{ position: "fixed", top: 10, right: 10, zIndex: 2000 }}>
      <FormControlLabel
        control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
        label={mode === 'dark' ? 'Dark' : 'Light'}
      />
    </div>
  );
};

export default ThemeToggle;
