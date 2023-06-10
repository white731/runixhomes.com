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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { additionalServices, services } from "../../data/Services";

const ServicesSection = () => {
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
      <Container maxWidth="md">
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
              <strong>Healthy Home Package</strong> - Starting at{" "}
              <strong>$39.00</strong> per month
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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
              <strong>Essentials Package</strong> - Starting at{" "}
              <strong> $29.99</strong> per month
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ textAlign: "center" }}>
              All furnace filters, water filters and salt materials are included
              in price.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
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
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {additionalServices.map((service) => {
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
                      <CardContent>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <CardHeader
                            title={service.name}
                            subheader={
                              <>
                                <Typography>
                                  Member Price:{" "}
                                  <strong style={{ color: "green" }}>
                                    {service.memberPrice}
                                  </strong>
                                </Typography>
                                <Typography>
                                  Non-Member Price:{" "}
                                  <strong style={{ color: "red" }}>
                                    {service.nonMemberPrice}
                                  </strong>
                                </Typography>
                              </>
                            }
                          ></CardHeader>
                        </Box>
                      </CardContent>
                    </Card>
                  </>
                );
              })}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  );
};

export default ServicesSection;
