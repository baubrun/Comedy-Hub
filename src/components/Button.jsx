import React from "react";
import Loader from "react-loader-spinner";
import Button from "@material-ui/core/Button";




const MyButton = (
  {color, id, text, onClick, 
    name, size ,disabled, loading}
  ) => {


  return (
    <Button
    id={id} 
    color={`${color}`} 
    name={name} 
    onClick={onClick}
    disabled={disabled}
    size={size}
    variant="contained"
    >
      {text}

      {loading && (
          <Loader
            type="BallTriangle"
            color="white"
            height={30}
            width={30}
            visible={loading}
          />
        )}

    </Button>
  );
};

export default MyButton;
