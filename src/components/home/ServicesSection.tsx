import {
  Box,
  CardContent,
  Card,
  Container,
  Typography,
  Button,
  CardMedia,
  CardHeader,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { additionalServices, services } from "../../data/Services";
import { useState } from "react";
import { CustomButton } from "../../hooks/CustomButton";
import { useNavigate } from "react-router-dom";

const ServicesSection = () => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const navigate = useNavigate();

  const initialFormStates = additionalServices.map((service) => ({
    name: service.name,
    interested: false,
  }));

  const [additionalServicesForm, setAdditionalServicesForm] = useState(
    initialFormStates
  );

  const handleCheckboxChange = (index: number, value: boolean) => {
    const updatedAdditionalServicesFormState = [...additionalServicesForm];
    updatedAdditionalServicesFormState[index].interested = value;
    setAdditionalServicesForm(updatedAdditionalServicesFormState);
  };

  const handleSendSMS = (text: string | undefined) => {
    let servicesAsStrings = "%3A%0A";

    additionalServicesForm
      .filter((x) => x.interested == true)
      .forEach((x) => {
        servicesAsStrings = servicesAsStrings + `%0A${x.name}`;
      });

    let textMessage = text
      ? text
      : `Hi%20I%27m%20interested%20in%20learning%20more%20about%20${
          servicesAsStrings !== "%3A%0A"
            ? servicesAsStrings
            : "additional services."
        }`;
    navigate("/learnmore/complete");
    window.location.replace(`sms:+12082195001?&body=${textMessage}`);
  };

  return (
    <Box
      id="services"
      sx={{
        background: "rgba(57, 63, 103, 0.75)",
        width: "100%",
        paddingTop: "20px",
        paddingBottom: "50px",
      }}
    >
      <Container maxWidth="xs">
        <Typography
          variant="h4"
          sx={{ textAlign: "center", color: "secondary.main", margin: "20px" }}
        >
          Services
        </Typography>

        <Accordion>
          <AccordionSummary
            sx={{
              backgroundColor: "secondary.main",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "secondary.main",
              },
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h5">
              <strong>Healthy Home Package</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "16px 3px 16px 3px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {services
                .filter((x) => x.package == "healthyHome")
                .map((service) => {
                  return (
                    <>
                      <Card
                        sx={{
                          margin: "3px",
                          width: "140px",
                          justifyContent: "center",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="150"
                          image={service.img}
                          alt="Paella dish"
                        />
                        <CardContent sx={{ padding: "6px" }}>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <CardHeader
                              sx={{ padding: "0px" }}
                              title={service.name}
                              subheader={service.frequency}
                              titleTypographyProps={{ fontSize: "1.1rem" }}
                            ></CardHeader>
                          </Box>
                        </CardContent>
                      </Card>
                    </>
                  );
                })}
              <CustomButton
                text="Learn More"
                handleClick={() =>
                  handleSendSMS(
                    "Hi I'm interested in learning more about the Health Home Package."
                  )
                }
                customStyle={{ marginTop: "10px" }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            sx={{
              backgroundColor: "secondary.main",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "secondary.main",
              },
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h5">
              <strong>Essentials Package</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "16px 3px 16px 3px" }}>
            <Typography sx={{ textAlign: "center" }}>
              All furnace filters, water filters and salt materials are included
              in price.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {services
                .filter((x) => x.package == "essentials")
                .map((service) => {
                  return (
                    <>
                      <Card
                        key={service.name}
                        sx={{
                          margin: "10px",
                          width: "225px",
                          justifyContent: "center",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="250"
                          image={service.img}
                          alt="Paella dish"
                        />
                        <CardContent>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <CardHeader
                              title={service.name}
                              subheader={service.frequency}
                            ></CardHeader>
                          </Box>
                        </CardContent>
                      </Card>
                    </>
                  );
                })}
              <CustomButton
                text="Learn More"
                handleClick={() =>
                  handleSendSMS(
                    "Hi I'm interested in learning more about the Essentials Package."
                  )
                }
                customStyle={{ marginTop: "10px" }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            sx={{
              backgroundColor: "secondary.main",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "secondary.main",
              },
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h5">
              <strong>Additional Services</strong> - Expand for pricing
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "16px 3px 16px 3px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {additionalServices.map((service, index) => {
                return (
                  <>
                    <Card
                      key={service.name}
                      sx={{
                        margin: "3px",
                        width: "140px",
                        justifyContent: "center",
                      }}
                    >
                      <CardContent sx={{ padding: "6px" }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <CardHeader
                            sx={{ padding: "0px" }}
                            title={service.name}
                            titleTypographyProps={{ fontSize: "1.1rem" }}
                            subheader={
                              <>
                                <FormControlLabel
                                  label="Learn More"
                                  control={
                                    <Checkbox
                                      onChange={(e: any) => {
                                        handleCheckboxChange(
                                          index,
                                          e.target.checked
                                        );
                                      }}
                                      checked={
                                        additionalServicesForm[index].interested
                                      }
                                    />
                                  }
                                />
                              </>
                            }
                          ></CardHeader>
                        </Box>
                      </CardContent>
                    </Card>
                  </>
                );
              })}
              <CustomButton
                text="Learn More"
                handleClick={() => handleSendSMS("")}
                customStyle={{ marginTop: "10px" }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  );
};

export default ServicesSection;
