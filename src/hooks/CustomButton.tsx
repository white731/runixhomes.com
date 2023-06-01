import { Button, SxProps } from "@mui/material";

type Props = {
  text: string;
  handleClick: () => void;
  customStyle: any;
};

export const CustomButton = (props: Props) => {
  const defaultStyle = {
    backgroundColor: "#C39A97",
    "&:hover": {
      backgroundColor: "primary.main",
    },
  };

  const style = {
    ...defaultStyle,
    ...props.customStyle,
  };

  return (
    <Button variant="contained" onClick={props.handleClick} sx={style}>
      {props.text}
    </Button>
  );
};
