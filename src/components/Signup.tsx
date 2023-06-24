import { CheckBox, LocalPostOffice, RepeatOneSharp } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  duration,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker, StaticDatePicker } from "@mui/x-date-pickers";
import { additionalServices } from "../data/Services";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { customerServiceAgreement } from "./signup/customerAgreement";
import { CustomButton } from "../hooks/CustomButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { PropertyTaskType, PropertyType } from "../types/Types";
import { useNavigate, useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";

type updatedFormStates = {
  name: string;
  quantity: number;
  frequency: number;
  memberPrice: number;
  nonMemberPrice: number;
  result: number;
};

type FormType = {
  subject: string;
  body: string;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const Signup = () => {
  const { propertyid } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState<PropertyType>({
    "Add Ons Monthly": 0,
    "Add on Tasks": [],
    Address: [],
    AssumeHealthyPlan: false,
    AssumeEssentialsPlan: false,
    City: [],
    Customer: [],
    "Customer Name": [],
    Email: [],
    "Essentials Monthly": 0,
    "Essentials Tasks": ["N/A"],
    "Estimate #": 0,
    "Estimate Link": "",
    Estimates: [], // Assuming 'Estimates' is an array
    "First Service": [],
    "First Service Friendly": { error: "" },
    "Healthy Home Monthly": 0,
    "Healthy Home Tasks": ["N/A"],
    "Healthy Home Time Expected Quarter 1": 0,
    "Healthy Home Time Expected Quarter 3": 0,
    ID: "",
    ItemTaskJoin: [],
    "Items to Maintain": [],
    "Phone Number": [],
    "Property Name": "",
    PropertyID: "",
    Quotes: [],
    Services: [],
    State: [],
    "Total Monthly": 0,
    Type: [],
    recordId: "",
  });
  const [availableDates, setAvailableDates] = useState([
    {
      Schedule: "Between Noon and 3pm",
    },
  ]);

  const [PropertyTasks, setPropertyTasks] = useState<
    PropertyTaskType[] | undefined
  >();

  const [EssentialsTasks, setEssentialsTasks] = useState<
    PropertyTaskType[] | undefined
  >();
  const [HealthyHomeTasks, setHealthyHomeTasks] = useState<
    PropertyTaskType[] | undefined
  >();
  const [AdditionalTasks, setAdditionalTasks] = useState<PropertyTaskType[]>([
    {
      fields: {
        Task: ["Clean Toilets"],
        PlanName: ["1-Healthy Home Plan"],
        QuarterEffective: ["1"],
        FrequencyNumber: 1,
        Qty: [1],
        TotalDuration: 2400,
        "Individual Service Price (with materials)": [0.0],
      },
      id: "0",
    },
  ]);

  const [totalAddonCost, setTotalAddonCost] = useState(0);
  const [healthyHomeService, setHealthyHomeService] = useState(
    property.AssumeHealthyPlan
  );
  const [essentialsService, setEssentialsService] = useState(
    property.AssumeEssentialsPlan
  );

  const today = new Date().getDate();
  const [selectedAddons, setSelectedAddons] = useState([
    {
      name: "Task",
      quantity: 0,
      frequency: 1,
      memberPrice: 1.0,
      nonMemberPrice: 1.0,
      result: 0,
    },
  ]);
  const [customerAgrees, setCustomerAgrees] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(
    dayjs(today)
  );
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (index: number, value: number) => {
    // Create a copy of the form states array
    const updatedFormStates = [...selectedAddons];
    // Update the selectedAddon value for the specific form
    updatedFormStates[index].quantity = value;
    // Update the state variable
    console.log(updatedFormStates);
    setSelectedAddons(updatedFormStates);
    //UpdateTheTotalAddOnCost
    handleUpdateAddOnCost(updatedFormStates);
  };

  const handleFrequencyChange = (index: number, value: number) => {
    // Create a copy of the form states array
    const updatedFormStates = [...selectedAddons];
    // Update the frequency for the specific form
    updatedFormStates[index].frequency = value;
    // Update the state variable

    console.log(updatedFormStates);
    setSelectedAddons(updatedFormStates);
    handleUpdateAddOnCost(updatedFormStates);
  };

  const handleUpdateAddOnCost = (updatedFormStates: updatedFormStates[]) => {
    let total = totalAddonCost;

    updatedFormStates.forEach((aos) => {
      if (essentialsService || healthyHomeService) {
        const quantity = aos.quantity;
        const frequency = aos.frequency;
        const memberPrice = aos.memberPrice;

        const result = quantity * frequency * memberPrice;
        aos.result = result; // Adding the result property to each object for reference

        total += result;
      } else {
        const quantity = aos.quantity;
        const frequency = aos.frequency;
        const nonMemberPrice = aos.nonMemberPrice;

        const result = quantity * frequency * nonMemberPrice;
        aos.result = result; // Adding the result property to each object for reference

        total += result;
      }
    });
    console.log(total / 12);
    setTotalAddonCost(total / 12);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    console.log(newValue?.toString());
    setSelectedDateTime(newValue);
  };

  let healthyHomePrice =
    healthyHomeService && property ? property["Healthy Home Monthly"] : 0;
  let essentialsPrice =
    essentialsService && property ? property["Essentials Monthly"] : 0;

  const total = currencyFormatter.format(
    healthyHomePrice + essentialsPrice + totalAddonCost
  );

  const handleSubmit = () => {
    let selectedAddOnsAsString = "";

    selectedAddons
      .filter((x) => x.quantity > 0)
      .map((x) => {
        let text = `Name: ${x.name} | Frequency: ${x.frequency} | Quanity: ${x.quantity} | Member Price: ${x.memberPrice} | Non-Member Price: ${x.nonMemberPrice}\n`;
        selectedAddOnsAsString += text;
      });

    const data = {
      subject: `Congrats! ${property["Customer Name"]} just signed up for a service`,
      body: `${property["Customer Name"]} signed up for a servince on ${selectedDateTime}. 
    They want the following plants: "Healthy Home Plan" : ${healthyHomeService}, "Essentials Plan" : ${essentialsService}
    They would like the following add on services: 
    ${selectedAddOnsAsString}
    Their total monthly fee is ${total}
    Healthy Home Service: ${healthyHomePrice} per month.
    Essentials Service: ${essentialsPrice} per month.
    Total Addons Per month is ${totalAddonCost} per month.
    The customer has agreed to the terms and conditions: ${customerAgrees}
    `,
    };

    console.log(data);
    postNewCustomerSignUp(data);
    navigate("/signup/complete");
  };

  const postNewCustomerSignUp = async (data: FormType) => {
    try {
      let res = await axios.post(
        "https://sendmaintome-ftozsj74aa-uc.a.run.app",
        data
      );
    } catch (error: any) {}
  };

  const getPropertyTasks = async (propertyRecordID: string) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5001/runix-home-services/us-central1/getPropertyTasks?propertyRecordID=${propertyRecordID}`
      );
      console.log(response.data);
      let propertyTasks: PropertyTaskType[] = response.data;
      setPropertyTasks(propertyTasks);
      let healthyHomeTasks = propertyTasks.filter((propertyTask) =>
        propertyTask.fields.PlanName[0].includes("1")
      );
      let essentialTasks = propertyTasks.filter((propertyTask) =>
        propertyTask.fields.PlanName[0].includes("2")
      );
      let additionalTasks = propertyTasks.filter((propertyTask) =>
        propertyTask.fields.PlanName[0].includes("4")
      );
      console.log("healthyHomeTasks: ", healthyHomeTasks);
      console.log("essentialsTasks: ", essentialTasks);
      console.log("additionalTasks: ", additionalTasks);

      setHealthyHomeTasks(healthyHomeTasks);
      setEssentialsTasks(essentialTasks);
      setAdditionalTasks(additionalTasks);

      const initialFormStates = additionalTasks.map((service) => ({
        name: service.fields.Task[0],
        quantity: service.fields.Qty[0],
        frequency: service.fields.FrequencyNumber,
        memberPrice:
          service.fields["Individual Service Price (with materials)"][0],
        nonMemberPrice:
          service.fields["Individual Service Price (with materials)"][0],
        result: 0,
      }));

      setSelectedAddons(initialFormStates);
    } catch (error) {}
  };

  const getPropertyByRecordID = async () => {
    setLoading(true);

    try {
      //this is for testing purposes only
      const recordId = "rec5co1VjZYUpPlWs";
      const response = await axios.get(
        `https://getpropertyfunction-ftozsj74aa-uc.a.run.app?recordId=${propertyid}`
        // `http://127.0.0.1:5001/runix-home-services/us-central1/getPropertyFunction?recordId=${propertyid}`
      );
      console.log(response.data.fields);
      if (response.data.fields) {
        setProperty(response.data.fields);
        setEssentialsService(
          response.data.fields.AssumeEssentialsPlan ? true : false
        );
        setHealthyHomeService(
          response.data.fields.AssumeHealthyPlan ? true : false
        );
        getPropertyTasks(response.data.fields.recordId);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const getAvailableDates = async () => {
    try {
      const res = await axios.get(
        // "http://127.0.0.1:5001/runix-home-services/us-central1/getAvailableDates"
        "https://getavailabledates-ftozsj74aa-uc.a.run.app"
      );
      setAvailableDates(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPropertyByRecordID();
    getAvailableDates();
  }, []);

  const handleHealthyHomePlanChecked = (e: any) => {
    setHealthyHomeService(e.target.checked);
    console.log(e.target.checked);
  };

  const handleEssentialPlanChecked = (e: any) => {
    setEssentialsService(e.target.checked);
    console.log(e.target.checked);
  };

  const healthyHomeCard = () => {
    return (
      <Card
        sx={{
          margin: "10px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={
            "https://res.cloudinary.com/dndx9szw0/image/upload/t_Facebook ad/v1685723221/Runix%20Logos/AdobeStock_136888535_myml6n.jpg"
          }
          alt="beautiful home"
        />
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardHeader title="Healthy Home Package"></CardHeader>
            <FormControlLabel
              label="Include in Plan"
              control={
                <Checkbox
                  onChange={handleHealthyHomePlanChecked}
                  checked={healthyHomeService}
                />
              }
            />
          </Box>
        </CardContent>
        <CardActionArea>
          <Accordion>
            <AccordionSummary
              sx={{
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "secondary.main",
                },
              }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Summary of Services</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {property["Healthy Home Tasks"].map((service) => {
                return <Typography variant="body2">• {service}</Typography>;
              })}
            </AccordionDetails>
          </Accordion>
        </CardActionArea>
      </Card>
    );
  };

  const essentialsCard = () => {
    return (
      <Card
        sx={{
          margin: "10px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={
            "https://res.cloudinary.com/dndx9szw0/image/upload/c_lfill,g_center,h_1080,w_1080,y_0/v1685724564/Runix%20Logos/AdobeStock_402251354_mhxgik.jpg"
          }
          alt="air filters"
        />
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardHeader title="Essentials Package"></CardHeader>
            <FormControlLabel
              label="Include in Plan"
              control={
                <Checkbox
                  onChange={handleEssentialPlanChecked}
                  checked={essentialsService}
                />
              }
            />
          </Box>
        </CardContent>
        <CardActionArea>
          <Accordion>
            <AccordionSummary
              sx={{
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "secondary.main",
                },
              }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Summary of Services</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {property["Essentials Tasks"].map((service) => {
                return <Typography variant="body2">• {service}</Typography>;
              })}
            </AccordionDetails>
          </Accordion>
        </CardActionArea>
      </Card>
    );
  };

  const additionalServicesCard = () => {
    return (
      <Card>
        <CardMedia
          component="img"
          height="250"
          image={
            "https://res.cloudinary.com/dndx9szw0/image/upload/c_lfill,g_center,h_1080,w_1080,y_0/v1685724564/Runix%20Logos/AdobeStock_402251354_mhxgik.jpg"
          }
          alt="air filters"
        />
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardHeader title="Additional Services"></CardHeader>
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
          <Typography
            sx={{ width: "45px", textAlign: "center" }}
            variant="body2"
          >
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
        {AdditionalTasks.map((service, index) => {
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
                  defaultValue={0}
                  size="small"
                  onChange={(e: any) => {
                    handleSelectChange(index, e.target.value);
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
                  defaultValue={selectedAddons[index].quantity}
                  // value=
                  size="small"
                  sx={{
                    width: "40px",
                    marginLeft: "3.5px",
                    marginRight: "3.5px",
                  }}
                  onChange={(e: any) => {
                    handleFrequencyChange(index, e.target.value);
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
                    essentialsService || healthyHomeService
                      ? service.fields[
                          "Individual Service Price (with materials)"
                        ][0]
                      : service.fields[
                          "Individual Service Price (with materials)"
                        ][0]
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

  const propertyName = property ? property["Property Name"] : "";
  const customerName = property ? property["Customer Name"][0] : "";

  const isWeekend = (date: Dayjs) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "secondary.main",
        paddingTop: "60px",
        paddingBottom: "100px",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginTop: "10px" }}>
          {customerName}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          {propertyName}
        </Typography>

        <Typography variant="h6" sx={{ marginTop: "40px" }}>
          My Service Subscriptions
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {healthyHomeCard()}
          {essentialsCard()}
        </Box>
        {additionalServicesCard()}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginTop: "40px" }}>
            Total: <strong>{total}</strong> per Year
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ margin: "10px", textAlign: "center" }}>
          Select a preferred date for your first service.
        </Typography>
        <DatePicker
          disablePast
          shouldDisableDate={isWeekend}
          onChange={(newValue) => handleDateChange(newValue)}
        />
        <Typography
          variant="h6"
          sx={{ marginTop: "40px", marginBottom: "20px" }}
        >
          Customer Terms and Conditions
        </Typography>
        <TextField
          multiline
          rows={10}
          sx={{ width: { xs: "300px", sm: "500px", md: "700px" } }}
          defaultValue={customerServiceAgreement}
        />
        <FormControlLabel
          label="By checking this box I agree to the terms and conditions outlined above"
          control={
            <Checkbox
              checked={customerAgrees}
              onChange={(e) => setCustomerAgrees(e.target.checked)}
            />
          }
        />
        <Typography
          variant="h6"
          sx={{ marginTop: "40px", marginBottom: "5px" }}
        >
          Complete Signup
        </Typography>
        <Typography variant="caption" sx={{ textAlign: "center" }}>
          Monthly payment charges will be set up after the completion of the
          first visit. If you have any questions send us an email or contact us
          at (208) 219-5001
        </Typography>
        <CustomButton
          text="Submit"
          customStyle={{ marginBottom: "30px", marginTop: "5px" }}
          handleClick={handleSubmit}
        />
      </Container>
      <Backdrop
        sx={{ color: "#fff" }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Signup;
