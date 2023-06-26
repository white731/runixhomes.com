import {
  Card,
  CardMedia,
  CardContent,
  Box,
  CardHeader,
  Typography,
  Divider,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { PropertyTaskType, SelectedTaskType } from "../../types/Types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export type SignupCardProps = {
  listOfTasks: PropertyTaskType[];
  handleFrequencyChange: (index: number, value: number) => void;
  handleQuantityChange: (index: number, value: number) => void;
  selectedTasks: SelectedTaskType[];
  imageUrl: string;
  cardHeaderTitle: string;
};

export const SignupCard = (props: SignupCardProps) => {
  console.log("list of tasks: ", props.listOfTasks);
  console.log("selectedTasks: ", props.selectedTasks);
  return (
    <Card sx={{ marginTop: "30px" }}>
      <CardMedia
        component="img"
        height="250"
        image={props.imageUrl}
        alt="air filters"
      />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardHeader title={props.cardHeaderTitle}></CardHeader>
        </Box>
      </CardContent>
      {/* <Container maxWidth="sm">
          <Typography
            variant="caption"
            sx={{ textAlign: "center", padding: "10px" }}
          >
            Choose from the list below any additional services you would like to
            have done on your home. You can choose the frequency of the service
            as well as how many items you have. For example, If you have 6
            Exterior lights that you'd like cleaned twice a year, select
            Semi-Annually for "How Often" and "6" for "How many" next to the
            "Clean exterior lights" option.
          </Typography>
        </Container> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            width: { xs: "100px", sm: "200px" },
            textAlign: "center",
            marginLeft: "8px",
          }}
          variant="body2"
        >
          Times per year?
        </Typography>
        <Typography sx={{ width: "45px", textAlign: "center" }} variant="body2">
          How many?
        </Typography>
        <Typography
          variant="body2"
          sx={{
            width: { xs: "125px", sm: "200px" },
            margin: "3px",
            textAlign: "center",
          }}
        >
          {" "}
          Name
        </Typography>
        <Typography
          variant="body2"
          sx={{ maxWidth: "45px", marginRight: "8px", textAlign: "center" }}
        >
          {" "}
          Price
        </Typography>
      </Box>
      <Divider />
      {props.listOfTasks.map((service, index) => {
        return (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              <Select
                defaultValue={
                  !service.fields.PlanName[0].includes("4")
                    ? props.selectedTasks[index].frequency
                    : 0
                }
                size="small"
                onChange={(e: any) => {
                  props.handleFrequencyChange(index, e.target.value);
                }}
                sx={{
                  width: { xs: "100px", sm: "200px" },
                  marginLeft: "8px",
                  marginRight: "3.5px",
                }}
              >
                <MenuItem key="1" value={1}>
                  Annually
                </MenuItem>
                <MenuItem key="2" value={2}>
                  Semi-Annually
                </MenuItem>
                <MenuItem key="3" value={4}>
                  Quarterly
                </MenuItem>
                <MenuItem key="4" value={12}>
                  Monthly
                </MenuItem>
                <MenuItem key="6" value={0}>
                  None
                </MenuItem>
              </Select>
              <OutlinedInput
                type="number"
                defaultValue={props.selectedTasks[index].quantity}
                size="small"
                sx={{
                  width: "50px",
                  marginLeft: "3.5px",
                  marginRight: "3.5px",
                }}
                onChange={(e: any) => {
                  props.handleQuantityChange(index, e.target.value);
                }}
              />
              <Typography
                sx={{
                  width: { xs: "125px", sm: "200px" },
                  marginLeft: "3.5px",
                  marginRight: "3.5px",
                  textAlign: "center",
                }}
                variant="caption"
              >
                {service.fields.Task}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  width: "45px",
                  marginRight: "8px",
                  marginLeft: "3.5px",
                }}
              >
                {currencyFormatter.format(
                  service.fields["Individual Service Price (with materials)"][0]
                )}
              </Typography>
            </Box>
            <Divider />
          </>
        );
      })}
    </Card>
  );
};
