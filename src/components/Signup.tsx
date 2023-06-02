import { CheckBox, LocalPostOffice } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { additionalServices, services } from "../data/Services";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const sampleAirtableProperties = [
  { label: "Main Office", address: "700 E 700 N" },
  { label: "Bryon's House", address: "734 E 700 N" },
];

const Signup = () => {
  const healthyHomeCard = () => {
    return (
      <Card
        sx={{
          margin: "10px",
          width: "225px",
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
              subheader={"$25.00 per Month"}
            ></CardHeader>
            <FormControlLabel
              label="Include in Plan"
              control={<Checkbox defaultChecked />}
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
              {services
                .filter((x) => x.package !== "essentials")
                .map((service) => {
                  return (
                    <Typography variant="body2">
                      • {service.name} - {service.frequency}
                    </Typography>
                  );
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
          width: "225px",
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
              subheader={"$19.99 per Month"}
            ></CardHeader>
            <FormControlLabel
              label="Include in Plan"
              control={<Checkbox defaultChecked />}
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
              {services
                .filter((x) => x.package === "essentials")
                .map((service) => {
                  return (
                    <Typography variant="body2">
                      • {service.name} - {service.frequency}
                    </Typography>
                  );
                })}
            </AccordionDetails>
          </Accordion>
        </CardActionArea>
      </Card>
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
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ margin: "10px" }}>
          Select your property
        </Typography>
        <Autocomplete
          disablePortal
          options={sampleAirtableProperties}
          sx={{ width: "300px" }}
          renderInput={(params) => <TextField {...params} label="Properties" />}
        />
        <Typography variant="h6" sx={{ margin: "10px" }}>
          Select a date and time for your first service.
        </Typography>
        <DatePicker sx={{ width: "300px", marginBottom: "10px" }} />
        <FormControl sx={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-label">
            Select a Timeframe
          </InputLabel>
          <Select label="Select a timeframe">
            <MenuItem value="Between 9 AM and Noon">
              Between 9 AM and Noon
            </MenuItem>
            <MenuItem value="Between Noon and 3 PM">
              Between Noon and 3 PM
            </MenuItem>
            <MenuItem value="Between 3 PM and 6 PM">
              Between 3 PM and 6PM
            </MenuItem>
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
        <Typography variant="h6" sx={{ marginTop: "40px" }}>
          Additional Services
        </Typography>
        <FormControl>
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
          {additionalServices.map((service) => {
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
                  sx={{ width: { xs: "114px", sm: "200px" } }}
                >
                  <MenuItem value={1}>Annually</MenuItem>
                  <MenuItem value={4}>Quarterly</MenuItem>
                  <MenuItem value={12}>Monthly</MenuItem>
                  <MenuItem value={0}>None</MenuItem>
                </Select>
                <TextField
                  defaultValue={0}
                  size="small"
                  sx={{ width: "50px", margin: "3px" }}
                />
                <Typography
                  sx={{ width: { xs: "125px", sm: "200px" }, margin: "3px" }}
                  variant="caption"
                >
                  {service.name}
                </Typography>
                <Typography variant="caption" sx={{ width: "45px" }}>
                  {service.memberPrice}
                </Typography>
              </Box>
            );
          })}
        </FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginTop: "40px" }}>
            Total: <strong>$65.00</strong> per Month
          </Typography>
          <Typography variant="caption" sx={{ textAlign: "center" }}>
            *Note that the amount displayed above represents a monthly price for
            an annual committment.
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ marginTop: "40px" }}>
          Customer Terms and Conditions
        </Typography>
      </Container>
    </Box>
  );
};

export default Signup;
