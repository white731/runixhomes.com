import {
  Backdrop,
  Box,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { customerServiceAgreement } from "./signup/customerAgreement";
import { CustomButton } from "../hooks/CustomButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { PropertyTaskType, PropertyType } from "../types/Types";
import { useNavigate, useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { SignupCard } from "./signup/SignupCard";
import { Quote } from "./signup/Quote";

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

  const [PropertyTasks, setPropertyTasks] = useState<PropertyTaskType[]>([
    {
      fields: {
        Task: ["Service Furnace"],
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

  const [EssentialsTasks, setEssentialsTasks] = useState<
    PropertyTaskType[] | undefined
  >([
    {
      fields: {
        Task: ["Service Furnace"],
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
  const [HealthyHomeTasks, setHealthyHomeTasks] = useState<
    PropertyTaskType[] | undefined
  >([
    {
      fields: {
        Task: ["Service Furnace"],
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
  const [AdditionalTasks, setAdditionalTasks] = useState<PropertyTaskType[]>([
    {
      fields: {
        Task: ["Service Furnace"],
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
  const [selectedAdditionalTasks, setAdditionalSelectedTasks] = useState([
    {
      name: "Task",
      quantity: 1,
      frequency: 1,
      memberPrice: 1.0,
      nonMemberPrice: 1.0,
      result: 0,
    },
  ]);

  const [selectedHealthyHomeTasks, setSelectedHealthyHomeTasks] = useState([
    {
      name: "Task",
      quantity: 1,
      frequency: 1,
      memberPrice: 1.0,
      nonMemberPrice: 1.0,
      result: 0,
    },
  ]);

  const [selectedEssentialTasks, setSelectedEssentialTasks] = useState([
    {
      name: "Task",
      quantity: 1,
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

  const handleQuantityChange = (index: number, value: number) => {
    // Create a copy of the form states array
    const updatedFormStates = [...selectedAdditionalTasks];
    // Update the selectedAddon value for the specific form
    updatedFormStates[index].quantity = value;
    // Update the state variable
    console.log(updatedFormStates);
    setAdditionalSelectedTasks(updatedFormStates);
    //UpdateTheTotalAddOnCost
    handleUpdateAddOnCost(updatedFormStates);
  };

  const handleFrequencyChange = (index: number, value: number) => {
    // Create a copy of the form states array
    const updatedFormStates = [...selectedAdditionalTasks];
    // Update the frequency for the specific form
    updatedFormStates[index].frequency = value;
    // Update the state variable

    console.log(updatedFormStates);
    setAdditionalSelectedTasks(updatedFormStates);
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

    selectedAdditionalTasks
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

      const initialHealthyHomeStates = healthyHomeTasks.map((service) => ({
        name: service.fields.Task[0],
        quantity: service.fields.Qty[0] ? service.fields.Qty[0] : 0,
        frequency: service.fields.FrequencyNumber,
        memberPrice:
          service.fields["Individual Service Price (with materials)"][0],
        nonMemberPrice:
          service.fields["Individual Service Price (with materials)"][0],
        result: 0,
      }));

      const initialEssentialsStates = essentialTasks.map((service) => ({
        name: service.fields.Task[0],
        quantity: service.fields.Qty[0] ? service.fields.Qty[0] : 0,
        frequency: service.fields.FrequencyNumber,
        memberPrice:
          service.fields["Individual Service Price (with materials)"][0],
        nonMemberPrice:
          service.fields["Individual Service Price (with materials)"][0],
        result: 0,
      }));

      const initialAdditionalStates = additionalTasks.map((service) => ({
        name: service.fields.Task[0],
        quantity: service.fields.Qty[0] ? service.fields.Qty[0] : 0,
        frequency: service.fields.FrequencyNumber,
        memberPrice:
          service.fields["Individual Service Price (with materials)"][0],
        nonMemberPrice:
          service.fields["Individual Service Price (with materials)"][0],
        result: 0,
      }));

      setSelectedEssentialTasks(initialEssentialsStates);
      setSelectedHealthyHomeTasks(initialHealthyHomeStates);
      setAdditionalSelectedTasks(initialAdditionalStates);
    } catch (error) {
      console.log(error);
    }
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

        <Typography
          variant="h6"
          sx={{ marginTop: "40px", textAlign: "center" }}
        >
          Get <strong>25% off</strong> your first service for all services in
          July!
        </Typography>
        <Quote tasks={PropertyTasks} />
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <SignupCard
            listOfTasks={HealthyHomeTasks as PropertyTaskType[]}
            handleFrequencyChange={handleFrequencyChange}
            handleQuantityChange={handleQuantityChange}
            selectedTasks={selectedHealthyHomeTasks}
            imageUrl="https://res.cloudinary.com/dndx9szw0/image/upload/t_Facebook ad/v1685723221/Runix%20Logos/AdobeStock_136888535_myml6n.jpg"
            cardHeaderTitle="Healthy Home Services"
          />
          <SignupCard
            listOfTasks={EssentialsTasks as PropertyTaskType[]}
            handleFrequencyChange={handleFrequencyChange}
            handleQuantityChange={handleQuantityChange}
            selectedTasks={selectedEssentialTasks}
            imageUrl="https://res.cloudinary.com/dndx9szw0/image/upload/c_lfill,g_center,h_1080,w_1080,y_0/v1685724564/Runix%20Logos/AdobeStock_402251354_mhxgik.jpg"
            cardHeaderTitle="Essential Services"
          />
        </Box> */}
        <SignupCard
          listOfTasks={AdditionalTasks as PropertyTaskType[]}
          handleFrequencyChange={handleFrequencyChange}
          handleQuantityChange={handleQuantityChange}
          selectedTasks={selectedAdditionalTasks}
          imageUrl="https://res.cloudinary.com/dndx9szw0/image/upload/c_lfill,g_center,h_1080,w_1080,y_0/v1687666364/Runix%20Services/IMG_6991_mloyiw.jpg"
          cardHeaderTitle="Additional Services"
        />
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
        sx={{ color: "#fff", zIndex: 3 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Signup;
