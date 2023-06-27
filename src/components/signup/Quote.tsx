import { PropaneSharp } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { PropertyTaskType } from "../../types/Types";
import { QuarterQuote } from "./QuarterQuote";

type Props = {
  tasks: PropertyTaskType[];
  healthyHomeAnnualPrice: number;
  essentialsAnnualPrice: number;
  healthyHomePlanSelected: boolean;
  essentialsPlanSelected: boolean;
  bothPlansSelected: boolean;
  handlePlanChange: (e: any) => void;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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
        <Grid xs={4} sx={{ border: 1, borderColor: "#889696" }}>
          <Box
            sx={{
              textAlign: "center",
              height: "175px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ margin: "5px" }}>
              <strong>Healthy Home</strong>
            </Typography>
            <Box>
              <Typography>
                <strong>
                  {currencyFormatter.format(props.healthyHomeAnnualPrice / 4)}
                </strong>
              </Typography>
              <Typography>/Quarter</Typography>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  value="Healthy Home"
                  checked={props.healthyHomePlanSelected}
                  onChange={props.handlePlanChange}
                />
              }
              label="Select"
            />
          </Box>
        </Grid>
        <Grid xs={4} sx={{ border: 1, borderColor: "#889696" }}>
          <Box
            sx={{
              textAlign: "center",
              height: "175px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ margin: "5px" }}>
              <strong>Essentials</strong>
            </Typography>
            <Box>
              <Typography>
                <strong>
                  {currencyFormatter.format(props.essentialsAnnualPrice / 4)}
                </strong>
              </Typography>
              <Typography>/Quarter</Typography>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  value="Essentials"
                  checked={props.essentialsPlanSelected}
                  onChange={props.handlePlanChange}
                />
              }
              label="Select"
            />
          </Box>
        </Grid>
        <Grid xs={4} sx={{ border: 1, borderColor: "#889696" }}>
          <Box
            sx={{
              textAlign: "center",
              height: "175px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1" sx={{ margin: "5px" }}>
              <strong>Healthy Home + Essentials</strong>
            </Typography>
            <Box>
              <Typography>
                <strong>
                  {currencyFormatter.format(
                    ((props.healthyHomeAnnualPrice +
                      props.essentialsAnnualPrice) /
                      4) *
                      0.9
                  )}
                </strong>
              </Typography>
              <Typography>/Quarter</Typography>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  value="Healthy Home + Essentials"
                  checked={props.bothPlansSelected}
                  onChange={props.handlePlanChange}
                />
              }
              label="Select"
            />
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
