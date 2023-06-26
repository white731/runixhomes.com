import { PropaneSharp } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { PropertyTaskType } from "../../types/Types";
import { OptionalAddons } from "./OptionalAddons";
import { QuarterQuote } from "./QuarterQuote";

type Props = {
  tasks: PropertyTaskType[];
};

export const Quote = (props: Props) => {
  return (
    <Grid>
      <Grid
        container
        sx={{
          marginTop: "20px",
          justifyContent: "space-around",
          position: "sticky",
          top: 56,
          backgroundColor: "white",
          zIndex: 2,
        }}
      >
        <Grid xs={4} sx={{ border: 1 }}>
          <Box
            sx={{
              textAlign: "center",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ margin: "5px" }}>
              Healthy Home
            </Typography>
            <Box>
              <Typography>
                <strong>$200.00</strong>
              </Typography>
              <Typography>/Service</Typography>
            </Box>
            <FormControlLabel control={<Checkbox />} label="Select" />
          </Box>
        </Grid>
        <Grid xs={4} sx={{ border: 1 }}>
          <Box
            sx={{
              textAlign: "center",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ margin: "5px" }}>
              Essentials
            </Typography>
            <Box>
              <Typography>
                <strong>$200.00</strong>
              </Typography>
              <Typography>/Service</Typography>
            </Box>
            <FormControlLabel control={<Checkbox />} label="Select" />
          </Box>
        </Grid>
        <Grid xs={4} sx={{ border: 1 }}>
          <Box
            sx={{
              textAlign: "center",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ margin: "5px" }}>
              Healthy Home + Essentials
            </Typography>
            <Box>
              <Typography>
                <strong>$200.00</strong>
              </Typography>
              <Typography>/Service</Typography>
            </Box>
            <FormControlLabel control={<Checkbox />} label="Select" />
          </Box>
        </Grid>
      </Grid>
      <QuarterQuote
        tasks={props.tasks.filter((x) =>
          x.fields.QuarterEffective
            ? x.fields.QuarterEffective.includes("1")
            : false
        )}
        quarterName="Summer"
        color="#F7EF99"
      />
      <QuarterQuote
        tasks={props.tasks.filter((x) =>
          x.fields.QuarterEffective
            ? x.fields.QuarterEffective.includes("2")
            : false
        )}
        quarterName="Fall"
        color="#F78E69"
      />
      <QuarterQuote
        tasks={props.tasks.filter((x) =>
          x.fields.QuarterEffective
            ? x.fields.QuarterEffective.includes("3")
            : false
        )}
        quarterName="Winter"
        color="#AACCDA"
      />
      <QuarterQuote
        tasks={props.tasks.filter((x) =>
          x.fields.QuarterEffective
            ? x.fields.QuarterEffective.includes("4")
            : false
        )}
        quarterName="Spring"
        color="#ABE188"
      />
      {/* <OptionalAddons /> */}
    </Grid>
  );
};
