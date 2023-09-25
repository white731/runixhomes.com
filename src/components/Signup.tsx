import {
  Backdrop,
  Box,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
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
import { htmlEmail } from "./signup/htmlEmail";

export type selectedAdditionalTasks = {
  name: string;
  quantity: number;
  frequency: number;
  memberPrice: number;
  nonMemberPrice: number;
  result: number;
};

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
    "Essentials Annual": 0,
    "Essentials Tasks": ["N/A"],
    "Estimate #": 0,
    "Estimate Link": "",
    Estimates: [], // Assuming 'Estimates' is an array
    "First Service": [],
    "First Service Friendly": { error: "" },
    "Healthy Home Annual": 0,
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
  const [healthyHomeService, setHealthyHomeService] = useState(false);
  const [essentialsService, setEssentialsService] = useState(false);

  const [bothPlansSelected, setBothPlansSelected] = useState(false);

  const today = new Date().getDate();
  const [selectedAdditionalTasks, setAdditionalSelectedTasks] = useState([
    {
      name: "Task",
      quantity: 1,
      frequency: 0,
      memberPrice: 1.0,
      nonMemberPrice: 1.0,
      result: 0,
    },
  ]);

  // const [essentialsPlanSelected, setEssentialsPlanSelected] = useState(false);
  // const [healthyHomePlanSelected, setHealthyHomePlanSelected] = useState(false);

  const [customerAgrees, setCustomerAgrees] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(
    dayjs(today)
  );
  const [loading, setLoading] = useState(false);

  const handlePlanChange = (e: any) => {
    let value = e.target.value;

    if (value == "Healthy Home") {
      setHealthyHomeService(!healthyHomeService);
      setEssentialsService(false);
      setBothPlansSelected(false);
    }

    if (value == "Essentials") {
      setEssentialsService(!essentialsService);
      setHealthyHomeService(false);
      setBothPlansSelected(false);
    }

    if (value == "Healthy Home + Essentials") {
      setBothPlansSelected(!bothPlansSelected);
      setHealthyHomeService(false);
      setEssentialsService(false);
    }
  };

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
    let total = 0;

    updatedFormStates.forEach((aos) => {
      const quantity = aos.quantity;
      const frequency = aos.frequency;
      const memberPrice = aos.memberPrice;

      const result = quantity * frequency * memberPrice;
      aos.result = result; // Adding the result property to each object for reference

      console.log(aos.result);
      total += result;
    });
    console.log("Total Add on: ", total);
    setTotalAddonCost(total);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDateTime(newValue);
  };

  let healthyHomePrice = property ? property["Healthy Home Annual"] : 0;
  let essentialsPrice = property ? property["Essentials Annual"] : 0;

  let planName = essentialsService
    ? "Essentials Plan"
    : healthyHomeService
    ? "Healthy Home Plan"
    : "Healthy Home + Essentials Plan";

  const handleSubmit = () => {
    if (!customerAgrees || selectedDateTime?.isBefore(dayjs("2011-15-31"))) {
      window.alert(
        "Please agree to the terms and conditions and verify that you have chosen a valid date before submitting."
      );
      return;
    }
    let selectedAddOnsAsString = "\n";

    selectedAdditionalTasks
      .filter((x) => x.frequency > 0 && x.quantity > 0)
      .map((x) => {
        let text = `Name: ${x.name} | Frequency: ${x.frequency} | Quanity: ${x.quantity} | Member Price: ${x.memberPrice}\n`;
        selectedAddOnsAsString += text;
      });

    const data = {
      subject: `Congrats! ${property["Customer Name"]} just signed up for a service`,
      body: `${
        property["Customer Name"]
      } signed up for a servince on ${selectedDateTime}\n.
    They want the following plans:\n
    "Healthy Home Plan" : ${healthyHomeService},\n 
    "Essentials Plan" : ${essentialsService},\n 
    "Healthy Home + Essentials Plan" : ${bothPlansSelected}\n
    They would like the following add on services: 
    ${selectedAddOnsAsString}
    Their total healthy home quarterly fee is ${currencyFormatter.format(
      healthyHomePrice / 4
    )}
    Their total essentials quarterly fee is ${currencyFormatter.format(
      essentialsPrice / 4
    )}
    Their total healthy home + essentials quarterly fee is ${currencyFormatter.format(
      ((healthyHomePrice + essentialsPrice) * 0.9) / 4
    )}

    Total Addons Per month is ${currencyFormatter.format(
      totalAddonCost
    )} per month.
    The customer has agreed to the terms and conditions: ${customerAgrees}
    `,
    };

    let bothPlans = PropertyTasks.filter((x) =>
      x.fields.PlanName[0].includes("1") || x.fields.PlanName[0].includes("2")
        ? true
        : false
    );

    let healthyHomePlanDetails = PropertyTasks.filter((x) =>
      x.fields.PlanName[0].includes("1")
    );
    let essentialsPlanDetails = PropertyTasks.filter((x) =>
      x.fields.PlanName[0].includes("2")
    );

    let planDetails = essentialsService
      ? essentialsPlanDetails
      : healthyHomeService
      ? healthyHomePlanDetails
      : bothPlans;

    let data2 = {
      subject: "Welcome to Runix Home Services",
      body: htmlEmail(
        planName,
        planDetails,
        selectedAdditionalTasks,
        currencyFormatter.format(totalQuarterlyPriceOfSelectedService),
        currencyFormatter.format(totalQuarterlyPriceOfSelectedService - 25),
        selectedDateTime?.format("MM-DD-YYYY") as string
      ),
      to: property.Email,
    };

    postNewCustomerSignUp(data2);
    navigate("/signup/complete");
  };

  const postNewCustomerSignUp = async (data: FormType) => {
    try {
      let res = await axios.post(
        "https://sendmaintome-ftozsj74aa-uc.a.run.app",
        // "http://127.0.0.1:5002/runix-home-services/us-central1/sendMainToMe",
        data
      );
    } catch (error: any) {}
  };

  const getPropertyTasks = async (propertyRecordID: string) => {
    try {
      const response = await axios.get(
        // `http://127.0.0.1:5001/runix-home-services/us-central1/getPropertyTasks?propertyRecordID=${propertyRecordID}`
        `https://getpropertytasks-ftozsj74aa-uc.a.run.app?propertyRecordID=${propertyRecordID}`
      );
      let propertyTasks: PropertyTaskType[] = response.data;
      setPropertyTasks(propertyTasks);

      let additionalTasks = propertyTasks.filter((propertyTask) =>
        propertyTask?.fields?.PlanName?.length > 0
          ? propertyTask.fields?.PlanName[0]?.includes("4")
          : false
      );

      setAdditionalTasks(additionalTasks);

      const initialAdditionalStates = additionalTasks.map((service) => ({
        name: service.fields.Task[0],
        quantity: service.fields.Qty[0] ? service.fields.Qty[0] : 0,
        frequency: 0,
        memberPrice:
          service.fields["Individual Service Price (with materials)"][0],
        nonMemberPrice:
          service.fields["Individual Service Price (with materials)"][0],
        result: 0,
      }));

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
      if (response.data.fields) {
        setProperty(response.data.fields);
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

  const totalQuarterlyPriceOfSelectedService = essentialsService
    ? essentialsPrice / 4
    : healthyHomeService
    ? healthyHomePrice / 4
    : bothPlansSelected
    ? ((essentialsPrice + healthyHomePrice) * 0.9) / 4
    : 0;

  const discountComponent = () => {
    return (
      <Box sx={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
        <Typography>Discounts:</Typography>
        <Typography>
          <strong>$25.00</strong>
        </Typography>
      </Box>
    );
  };

  const totalComponent = () => {
    return (
      <>
        <Typography>
          Total Amount due <strong>after</strong> your first service.
        </Typography>
        <Typography variant="h4">
          {currencyFormatter.format(
            totalQuarterlyPriceOfSelectedService - 25.0
          )}
        </Typography>
      </>
    );
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
          Get <strong>$25.00 off</strong> your first service when you sign up in
          June or July.
        </Typography>
        <Quote
          tasks={PropertyTasks}
          healthyHomeAnnualPrice={property["Healthy Home Annual"]}
          essentialsAnnualPrice={property["Essentials Annual"]}
          essentialsPlanSelected={essentialsService}
          healthyHomePlanSelected={healthyHomeService}
          bothPlansSelected={bothPlansSelected}
          handlePlanChange={handlePlanChange}
        />
        <Box sx={{ display: "flex", flexDirection: "row", marginTop: "40px" }}>
          <Typography>
            {essentialsService
              ? "Essentials Plan  "
              : healthyHomeService
              ? "Healthy Home Plan  "
              : bothPlansSelected
              ? "Healthy Home + Essentials Plan  "
              : "Please Select a plan from above.  "}
            Subtotal:
          </Typography>
          <Typography>
            <strong>
              {currencyFormatter.format(totalQuarterlyPriceOfSelectedService)}
            </strong>{" "}
            per Quarter
          </Typography>
        </Box>
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
          <Box
            sx={{ display: "flex", flexDirection: "row", marginTop: "40px" }}
          >
            <Typography>
              {essentialsService
                ? "Essentials Plan  "
                : healthyHomeService
                ? "Healthy Home Plan  "
                : bothPlansSelected
                ? "Healthy Home + Essentials Plan  "
                : "Please select a plan from above.  "}
              Total:{" "}
            </Typography>
            <Typography>
              <strong>
                {currencyFormatter.format(totalQuarterlyPriceOfSelectedService)}
              </strong>{" "}
              per Quarter
            </Typography>
          </Box>
          {totalQuarterlyPriceOfSelectedService != 0 ? discountComponent() : ""}
          {totalQuarterlyPriceOfSelectedService != 0 ? totalComponent() : ""}

          <br />
          <Typography>*Total Add On Amount:</Typography>
          <Typography>
            <strong>{currencyFormatter.format(totalAddonCost)}</strong> per Year
          </Typography>
          <br />
          <Typography variant="caption">
            *If you've chosen any add-on's we'll reach out to discuss an
            appropriate schedule for performing each of the services at a time
            that works best for you.
          </Typography>

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
            Payment will be set up <strong>after</strong> the completion of the
            first visit. If you have any questions send us an email or contact
            us at (208) 219-5001
          </Typography>
          <CustomButton
            text="Submit"
            customStyle={{ marginBottom: "30px", marginTop: "5px" }}
            handleClick={handleSubmit}
          />
        </Box>
      </Container>
      <Backdrop sx={{ color: "#fff", zIndex: 3 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Signup;
