import { CheckBox, LocalPostOffice } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Container,
  duration,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { additionalServices, services } from "../data/Services";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { customerServiceAgreement } from "./signup/customerAgreement";
import { CustomButton } from "../hooks/CustomButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { PropertyType } from "../types/Types";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const sampleAirtableProperties = [
  { label: "Main Office", address: "700 E 700 N" },
  { label: "Bryon's House", address: "734 E 700 N" },
];
type updatedFormStates = {
  name: string;
  quantity: number;
  textFieldValue: number;
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

  const initialFormStates = additionalServices.map((service) => ({
    name: service.name,
    quantity: 0,
    textFieldValue: 1,
    memberPrice: service.memberPrice,
    nonMemberPrice: service.nonMemberPrice,
    result: 0,
  }));

  const [totalAddonCost, setTotalAddonCost] = useState(0);
  const [healthyHomeService, setHealthyHomeService] = useState(true);
  const [essentialsService, setEssentialsService] = useState(true);
  const [selectedAddons, setSelectedAddons] = useState(initialFormStates);
  const [customerAgrees, setCustomerAgrees] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<string>(
    availableDates[0].Schedule
  );

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

  const handleTextFieldChange = (index: number, value: number) => {
    // Create a copy of the form states array
    const updatedFormStates = [...selectedAddons];
    // Update the textFieldValue for the specific form
    updatedFormStates[index].textFieldValue = value;
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
        const textFieldValue = aos.textFieldValue;
        const memberPrice = aos.memberPrice;

        const result = quantity * textFieldValue * memberPrice;
        aos.result = result; // Adding the result property to each object for reference

        total += result;
      } else {
        const quantity = aos.quantity;
        const textFieldValue = aos.textFieldValue;
        const nonMemberPrice = aos.nonMemberPrice;

        const result = quantity * textFieldValue * nonMemberPrice;
        aos.result = result; // Adding the result property to each object for reference

        total += result;
      }
    });
    console.log(total / 12);
    setTotalAddonCost(total / 12);
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
        let text = `Name: ${x.name} | Frequency: ${x.textFieldValue} | Quanity: ${x.quantity} | Member Price: ${x.memberPrice} | Non-Member Price: ${x.nonMemberPrice}\n`;
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

  const getPropertyByRecordID = async () => {
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
      }
    } catch (error) {}
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
            <CardHeader
              title="Healthy Home Package"
              subheader={`${currencyFormatter.format(
                property ? property["Healthy Home Monthly"] : 0
              )} per Month`}
            ></CardHeader>
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
            <CardHeader
              title="Essentials Package"
              subheader={`${currencyFormatter.format(
                property["Essentials Monthly"]
              )} per Month`}
            ></CardHeader>
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

  const propertyName = property ? property["Property Name"] : "";
  const customerName = property ? property["Customer Name"][0] : "";

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
        <Typography variant="h6" sx={{ margin: "10px", textAlign: "center" }}>
          Select a date and time for your first service.
        </Typography>
        <FormControl sx={{ width: "325px" }}>
          <InputLabel id="demo-simple-select-label">
            Select a Date & Time
          </InputLabel>
          <Select
            value={selectedDateTime}
            onChange={(e) => setSelectedDateTime(e.target.value)}
            label="Select a timeframe"
          >
            {availableDates.map((x) => {
              return <MenuItem value={x.Schedule}>{x.Schedule}</MenuItem>;
            })}
          </Select>
        </FormControl>
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
        <Container maxWidth="sm">
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              marginTop: "40px",
              marginBottom: "20px",
            }}
          >
            Additional Services
          </Typography>
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
        </Container>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              width: { xs: "114px", sm: "200px" },
              margin: "3px",
              textAlign: "center",
            }}
            variant="body2"
          >
            Times per year?
          </Typography>
          <Typography
            sx={{ width: "50px", margin: "3px", textAlign: "center" }}
            variant="body2"
          >
            How many?
          </Typography>
          <Typography
            variant="body2"
            sx={{
              width: { xs: "140px", sm: "200px" },
              margin: "3px",
              textAlign: "center",
            }}
          >
            {" "}
            Name
          </Typography>
          <Typography
            variant="body2"
            sx={{ maxWidth: "50px", margin: "3px", textAlign: "center" }}
          >
            {" "}
            Price
          </Typography>
        </Box>
        {additionalServices.map((service, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Select
                defaultValue={0}
                size="small"
                onChange={(e: any) => {
                  handleSelectChange(index, e.target.value);
                }}
                sx={{ width: { xs: "114px", sm: "200px" } }}
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
                <MenuItem key="5" value={1}>
                  One Time
                </MenuItem>
                <MenuItem key="6" value={0}>
                  None
                </MenuItem>
              </Select>
              <Input
                type="number"
                value={selectedAddons[index].textFieldValue}
                size="small"
                sx={{ width: "50px", margin: "3px" }}
                onChange={(e: any) => {
                  handleTextFieldChange(index, e.target.value);
                }}
              />
              <Typography
                sx={{ width: { xs: "125px", sm: "200px" }, margin: "3px" }}
                variant="caption"
              >
                {service.name}
              </Typography>
              <Typography variant="caption" sx={{ width: "45px" }}>
                {currencyFormatter.format(
                  essentialsService || healthyHomeService
                    ? service.memberPrice
                    : service.nonMemberPrice
                )}
              </Typography>
            </Box>
          );
        })}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginTop: "40px" }}>
            Total: <strong>{total}</strong> per Month
          </Typography>
          <Typography variant="caption" sx={{ textAlign: "center" }}>
            *Note that the amount displayed above represents a monthly price for
            an annual committment.
          </Typography>
        </Box>
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
    </Box>
  );
};

export default Signup;
