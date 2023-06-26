import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { PropertyTaskType } from "../../types/Types";

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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
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
                <Grid xs={4} sx={{ border: 1 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Checkbox
                      size="small"
                      disableTouchRipple
                      checked={
                        task.fields.PlanName[0].includes("1") ? true : false
                      }
                    />
                  </Box>
                </Grid>
                <Grid xs={4} sx={{ border: 1 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      height: "30px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>
                      <Checkbox
                        size="small"
                        disableTouchRipple
                        checked={
                          task.fields.PlanName[0].includes("2") ? true : false
                        }
                      />
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={4} sx={{ border: 1 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Checkbox
                      size="small"
                      disableTouchRipple
                      checked={
                        task.fields.PlanName[0].includes("1") ||
                        task.fields.PlanName[0].includes("2")
                          ? true
                          : false
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
