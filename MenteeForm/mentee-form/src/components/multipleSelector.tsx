import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect } from "react";
import { Box, Chip } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    whiteSpace: "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
}

interface MultipleSelectorProps {
  data: string[];
  chosenData: (data: string[]) => void;
  hideTypography?: boolean;
  prevData?: string[];
}

const MultipleSelector: React.FC<MultipleSelectorProps> = ({
  data,
  chosenData,
  hideTypography,
  prevData = [],
}) => {
  const theme = useTheme();
  const [selectorData, setSelectorData] = React.useState<string[]>(prevData);

  const handleChange = (event: SelectChangeEvent<typeof selectorData>) => {
    const {
      target: { value },
    } = event;
    setSelectorData(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    chosenData(selectorData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorData]);

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        {hideTypography == undefined && (
          <InputLabel id="demo-multiple-name-label">
            Can be more than 1
          </InputLabel>
        )}
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectorData}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{ backgroundColor: "#1E1F42", color: "white" }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data &&
            data.map((name: any) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, selectorData, theme)}
              >
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelector;
