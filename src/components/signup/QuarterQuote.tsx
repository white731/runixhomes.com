import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { PropertyTaskType } from "../../types/Types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type Props = {
  tasks: PropertyTaskType[];
  quarterName: string;
  color: string;
};

export const QuarterQuote = (props: Props) => {
  return (
    <Box>
      <Box
        sx={{
          border: 1,
          borderColor: "#889696",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: props.color,
          zIndex: 1,
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "Center" }}>
          {props.quarterName}
        </Typography>
      </Box>
      <Box>
        {props.tasks.map((task) => {
          return (
            <Box>
              <Grid
                sx={{
                  border: 1,
                  borderColor: "#889696",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ textAlign: "Center", margin: "10px" }}
                >
                  {task.fields.Task}
                </Typography>
              </Grid>
              <Grid
                container
                sx={{
                  justifyContent: "space-around",
                  backgroundColor: "white",
                }}
              >
                <Grid
                  xs={4}
                  sx={{
                    border: 1,
                    borderColor: "#889696",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {task.fields.PlanName[0].includes("1") ? (
                    <CheckCircleIcon sx={{ color: "green", margin: "3px" }} />
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid
                  xs={4}
                  sx={{
                    border: 1,
                    borderColor: "#889696",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {task.fields.PlanName[0].includes("2") ? (
                    <CheckCircleIcon sx={{ color: "green", margin: "3px" }} />
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid
                  xs={4}
                  sx={{
                    border: 1,
                    borderColor: "#889696",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {task.fields.PlanName[0].includes("1") ||
                  task.fields.PlanName[0].includes("2") ? (
                    <CheckCircleIcon sx={{ color: "green", margin: "3px" }} />
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
