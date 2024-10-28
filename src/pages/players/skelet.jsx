import React from 'react';
import { Skeleton } from "@mui/material";

import classes from "./players.module.css";
const Skelet = () => {
    return (
        <div className={classes.cardContainer}>
                      <div className={classes.cardInner}>
                        <div className={classes.cardFront}>
                          <div className={classes.title}>
                            <Skeleton
                              variant="circular"
                              sx={{
                                bgcolor: "#2d3846",
                                height: "3vw",
                                width: "3vw",
                                // borderRadius: "1vw",
                              }}
                            />
                            <Skeleton
                              variant="rounded"
                              sx={{
                                marginLeft: "1vw",
                                bgcolor: "#2d3846",
                                height: "2vw",
                                width: "60%",
                                borderRadius: "1vw",
                              }}
                            />
                          </div>
                          <Skeleton
                            variant="rounded"
                            sx={{
                              margin: "1vw auto",
                              width: "80%",
                              bgcolor: "#2d3846",

                              height: "13vw",
                            }}
                          />
                        </div>
                      </div>
                    </div>
    );
}

export default Skelet;
