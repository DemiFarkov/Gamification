import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  TextField,
} from "@mui/material";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import React, { useState } from "react";
import classes from "./profil.module.css";
import { TextFieldStyle } from "../../components/styles/styles";

const HistoryCompliments = (props) => {
  const {
    openHistoryCompliments,
    setOpenHistoryCompliments,
    complaintsData,
    praisesData,
    group,
    searchParams,
  } = props;
  const [openPraises, setOpenPraises] = useState(true);
  const [TabsValue, setTabsValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setTabsValue(newValue);
  };
  return (
    <Dialog
      open={openHistoryCompliments}
      onClose={() => {
        setOpenHistoryCompliments(false);
      }}
      fullWidth={true}
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          background: "#202833",
          position: "relative",
        },
      }}
    >
      {(group == "Администраторы" || searchParams.size == 0) && (
        <DialogTitle sx={{ marginLeft: "1vw" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              onChange={handleChange}
              value={TabsValue}
              sx={{
                "& .MuiButtonBase-root": { color: "#fff", fontSize: "20px" },
                "& .MuiTabs-indicator":
                  TabsValue == "0"
                    ? { backgroundColor: "#6cc551ca" }
                    : { backgroundColor: "#c55151ca" },
                "& .MuiBox-root": { borderColor: "#fff" },
                "& .Mui-selected":
                  TabsValue == "0"
                    ? { color: "#6cc551ca" }
                    : { color: "#c55151ca" },
              }}
            >
              <Tab
                label="Комплименты"
                {...a11yProps(0)}
                sx={{ color: "#6cc551ca !important" }}
              />
              <Tab
                label="Жалобы"
                {...a11yProps(1)}
                sx={{ color: "#c55151ca !important" }}
              />
            </Tabs>
          </Box>
        </DialogTitle>
      )}

      <DialogContent sx={{ padding: "0", "& .MuiBox-root": { padding: "0" } }}>
        <CustomTabPanel value={TabsValue} index={0}>
          {praisesData &&
            praisesData.map((el, i) => (
              <HistoryPoint key={i} data={el} TabsValue={TabsValue} />
            ))}
        </CustomTabPanel>
        <CustomTabPanel value={TabsValue} index={1}>
          {Object.keys(complaintsData).length > 0 &&
            complaintsData.complaints.map((el, i) => (
              <HistoryPoint key={i} data={el} TabsValue={TabsValue} />
            ))}
        </CustomTabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryCompliments;

const HistoryPoint = (props) => {
  const { data, TabsValue } = props;
  const style = { width: "100%", margin: ".2vw 0" };
  return (
    <div
      className={classes.historyPoint}
      style={{
        borderImage: `linear-gradient(90deg, #${
          TabsValue == "0" ? "6cc551ca" : "c55151ca"
        }, #2028338b  ${Math.floor(Math.random() * (100 - 50) + 50)}%)`,
      }}
    >
      <article>
        <TextField
          InputProps={{
            readOnly: true,
            value: `${data.text}`,
          }}
          multiline
          label={data.created_at.slice(0, 10)}
          sx={{
            ...TextFieldStyle,
            margin: "1vw 0 0 0 ",
            "& .MuiOutlinedInput-notchedOutline": { border: "none !important" },
            "& .MuiInputBase-input": { fontSize: "22px" },
            "& .MuiFormLabel-root": { top: "0" },
          }}
        />
      </article>
      {data.moderation_comment !== null && data.moderation_comment !== "" && (
        <article>
          <TextField
            sx={{ ...TextFieldStyle, width: "70%" }}
            label={"Комментарий модератора"}
            multiline
            focused
            InputProps={{
              readOnly: true,
              value: `${data.moderation_comment}`,
            }}
          />
        </article>
      )}
    </div>
  );
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
