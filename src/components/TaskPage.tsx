import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
// import Carousel from "react-material-ui-carousel";
import Carousel, { Modal, ModalGateway, ViewType } from "react-images";
import { CarouselProps } from "react-material-ui-carousel/dist/components/types";
import Gallery, { PhotoProps } from "react-photo-gallery";
import { useParams } from "react-router-dom";
import { RawTaskType } from "../types/Types";

export const TaskPage = () => {
  const { task, task_id } = useParams();

  const [taskObject, setTaskObject] = useState<RawTaskType | undefined>();

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  // const openLightbox = useCallback((event, { photo, index }) => {
  //   setCurrentImage(index);
  //   setViewerIsOpen(true);
  // }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:5001/runix-home-services/us-central1/getTask?recordId=${task_id}`
      );

      setTaskObject(response.data);

      console.log(response.data);
      // getPhotos("Photos", response.data.fields);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const carouselTemplate = (
    img: string,
    title: string,
    description: string
  ) => {
    return (
      <Box
        component="img"
        sx={{
          height: 233,
          // width: 350,
          margin: "auto, 0",
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt={description}
        src={img}
      />
    );
  };

  // const renderPhotos = () => {
  //   let photos: Array<PhotoProps> = [];
  //   let photosView: ViewType[] = [];

  //   taskObject?.fields.photoObjects.map((x) => {
  //     let photo = { src: x.fields.url, width: 100, height: 100 };
  //     let photoView = { source: x.fields.url };
  //     photos.push(photo);
  //     photosView.push(photoView);
  //   });

  //   return (
  //     <div>
  //       {/* // FIRST GALLERY */}
  //       <Gallery photos={photos} onClick={openLightbox} />
  //       <ModalGateway>
  //         {viewerIsOpen ? (
  //           <Modal onClose={closeLightbox}>
  //             <Carousel
  //               currentIndex={currentImage}
  //               views={photosView.map((x) => ({
  //                 ...x,
  //               }))}
  //             />
  //           </Modal>
  //         ) : null}
  //       </ModalGateway>
  //     </div>
  //   );
  // };

  return (
    <Container>
      <Box sx={{ paddingTop: "20%" }}>
        <Typography variant="h3">{taskObject?.fields.Task}</Typography>
        <Typography>{taskObject?.fields.description}</Typography>
        <Typography>
          Starting at:{" "}
          {taskObject?.fields["Service Price With Materials Non-Member Price"]}
        </Typography>
        {/* <Carousel>
          {taskObject?.fields.photoObjects.map((x) =>
            carouselTemplate(x.fields.url, x.fields.Name, x.fields.caption)
          )}
        </Carousel> */}
      </Box>
    </Container>
  );
};
