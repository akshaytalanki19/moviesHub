import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypinAnim";


const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
           <TypingAnim/>
        </Box>
        
        <Box sx={{ display: "flex", mx: "auto" }}>
          <img
            src="movies.png"
            alt="movies"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "80%" : "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px #ff0000",
              marginTop: 50,
              marginBottom: 20,
              padding: 10,
            }}
          />
        </Box>
      </Box>
      
    </Box>
  );
};

export default Home;