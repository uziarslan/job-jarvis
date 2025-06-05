import { styled, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";

const InputLabelWithStyle = styled(InputLabel)`
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0%;
    text-transform: capitalize;
    color: #00AEEF;
    transform: translate(14px, 12px) scale(1);

    &.Mui-focused {
        color: #00AEEF;
        transform: translate(14px, -9px) scale(0.75);
        background-color: #FFFFFFED;
        padding: 0 4px;
    }

    &.MuiInputLabel-root {
        color: #00AEEF;
    }

    &.MuiInputLabel-shrink {
        color: #00AEEF;
        transform: translate(14px, -9px) scale(0.75);
        background-color: #FFFFFFED;
        padding: 0 4px;
    }
`;

const FormControlWithStyle = styled(FormControl)`
  margin-top: 20px;
  width: 100%;
  border: none
`;

const SelectWithStyle = styled(Select)`
  height: 40px;
  border-radius: 4px;
  width: 100%;
  border: 1px solid #00AEEF;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0%;
    text-transform: capitalize;
    color: #00AEEF;

  & .MuiOutlinedInput-notchedOutline {
    border-color: #00AEEF;
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: #00AEEF;
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #00AEEF;
  }

  & svg {
    fill: #00AEEF;
  }
`;

export default function Settings() {
  const [value, setValue] = useState<number>(3); // Default to 3 minutes

  // Load saved refresh interval on mount
  useEffect(() => {
    chrome.storage.local.get(['refreshIntervalMinutes'], (result) => {
      if (result.refreshIntervalMinutes) {
        setValue(Number(result.refreshIntervalMinutes));
        console.log(`Loaded refresh interval: ${result.refreshIntervalMinutes} minutes`);
      }
    });
  }, []);

  // Save refresh interval on change
  const handleChange = (event: any) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    chrome.storage.local.set({ refreshIntervalMinutes: newValue }, () => {
      console.log(`Saved refresh interval: ${newValue} minutes`);
    });
  };

  return (
    <div>
      <h1 className="savedSearchesHeading">Settings</h1>
      <p className="savedSearchesSubHeading">
        Control how frequently Job Jarvis will monitor for new jobs.
      </p>
      <FormControlWithStyle fullWidth>
        <InputLabelWithStyle id="refreshRate">Refresh interval</InputLabelWithStyle>
        <SelectWithStyle
          label="Refresh interval"
          onChange={handleChange}
          labelId="refreshRate"
          value={value}
        >
          <MenuItem value={1}>Aggressive (1 minute)</MenuItem>
          <MenuItem value={3}>Normal (3 minutes)</MenuItem>
          <MenuItem value={5}>Moderate (5 minutes)</MenuItem>
          <MenuItem value={10}>Infrequent (10 minutes)</MenuItem>
        </SelectWithStyle>
      </FormControlWithStyle>
    </div>
  );
}