import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { FormControlLabel, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import moment from "moment/moment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import KeyIcon from "@mui/icons-material/Key";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PublicIcon from "@mui/icons-material/Public";
import DraftsIcon from "@mui/icons-material/Drafts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Album() {
  const [date, setDate] = useState(moment("2010/05/22", "YYYY/MM/DD"));
  const [userStatsUseDate, setUserStatsUseDate] = useState(false);
  const [userStatsUserIdError, setUserStatsIdError] = useState(false);
  const [userStatsUserErrorText, setUserStatsUserErrorText] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [noUser, setNoUser] = useState(false);

  const [gameStatsDate, setGameStatsDate] = useState(
    moment("2010/05/22", "YYYY/MM/DD")
  );
  const [gameStatsUseDate, setGameStatsUseDate] = useState(false);
  const [gameStatsCountry, setGameStatsCountry] = useState(false);
  const [countries, setCountries] = useState([]);
  const [gameStatsInfo, setGameStatsInfo] = useState(null);

  const getUserStats = () => {
    if (userId === "") {
      setUserStatsUserErrorText("User ID is required.");
      setUserStatsIdError(true);
      setNoUser(false);
      return;
    } else {
      setUserStatsUserErrorText("");
      setUserStatsIdError(false);
    }
    const requestData = {
      userId: userId,
      date: userStatsUseDate ? date.utcOffset(0, true) : null,
    };

    const config = {
      method: "post",
      url: "http://localhost:8080/user/userStats",
      headers: {
        "Content-Type": "application/json",
      },
      data: requestData,
    };

    axios(config)
      .then((response) => {
        console.log(response);
        if (response.data === "") {
          setUser(null);
          setNoUser(true);
        } else {
          response.data["userId"] = userId;
          setUser(response.data);
          setNoUser(false);
        }
      })
      .catch((error) => {
        setNoUser(true);
        console.log(error);
      });
  };

  const getGameStats = () => {
    if (gameStatsCountry) {
      setGameStatsInfo(null);
      const requestData = {
        date: gameStatsUseDate ? gameStatsDate.utcOffset(0, true) : null,
      };

      const config = {
        method: "post",
        url: "http://localhost:8080/game/gameStatsByCountry",
        headers: {
          "Content-Type": "application/json",
        },
        data: requestData,
      };

      axios(config)
        .then((response) => {
          console.log(response);
          setCountries(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCountries([]);
      const requestData = {
        date: gameStatsUseDate ? gameStatsDate.utcOffset(0, true) : null,
      };

      const config = {
        method: "post",
        url: "http://localhost:8080/game/gameStats",
        headers: {
          "Content-Type": "application/json",
        },
        data: requestData,
      };

      axios(config)
        .then((response) => {
          console.log(response);
          setGameStatsInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Aleksandar Paripovic
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h4"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Nordeus challenge - Data Engineering
            </Typography>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>User level stats</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Stack
                      sx={{ pt: 4 }}
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                    >
                      <TextField
                        error={userStatsUserIdError}
                        id="outlined-basic"
                        label="User ID"
                        variant="outlined"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        helperText={userStatsUserErrorText}
                      />
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <Stack spacing={3}>
                          <DesktopDatePicker
                            label="Stats for date"
                            inputFormat="YYYY/MM/DD"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      sx={{ pt: 4 }}
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                    >
                      <Button variant="contained" onClick={getUserStats}>
                        Get stats
                      </Button>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={userStatsUseDate}
                              onChange={() => {
                                setUserStatsUseDate(!userStatsUseDate);
                              }}
                            />
                          }
                          label="Use date as a parameter"
                        />
                      </FormGroup>
                    </Stack>
                  </Grid>
                  <Grid item xs={3} />
                  <Grid item xs={6} justifyContent="center">
                    {user !== null && (
                      <>
                        {" "}
                        <nav aria-label="main mailbox folders">
                          <List>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <KeyIcon />
                                </ListItemIcon>
                                <ListItemText primary={user.userId} />
                              </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary={user.name} />
                              </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <PublicIcon />
                                </ListItemIcon>
                                <ListItemText primary={user.country} />
                              </ListItemButton>
                            </ListItem>
                          </List>
                        </nav>
                        <Divider />
                        <nav aria-label="secondary mailbox folders">
                          <List>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText
                                  primary={`Numer of logins: ${user.numberOfLogins}`}
                                />
                              </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText
                                  primary={
                                    user.dayDiff === -1
                                      ? "User has not logged in"
                                      : `Its been ${user.dayDiff} days since user last logged in`
                                  }
                                />
                              </ListItemButton>
                            </ListItem>
                          </List>
                        </nav>
                        <Divider />
                        <nav aria-label="secondary mailbox folders">
                          <List>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText
                                  primary={`Numer of transactions: ${user.numberOfTransactions}`}
                                />
                              </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText
                                  primary={`User total revenue is: ${user.totalRevenue} USD`}
                                />
                              </ListItemButton>
                            </ListItem>
                          </List>
                        </nav>
                      </>
                    )}
                    {noUser && (
                      <Typography
                        component="h4"
                        variant="h5"
                        align="center"
                        color="text.primary"
                        gutterBottom
                      >
                        No user with a given ID is found.
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Game level stats</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                      >
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <Stack spacing={3}>
                            <DesktopDatePicker
                              label="Stats for date"
                              inputFormat="YYYY/MM/DD"
                              value={gameStatsDate}
                              onChange={(newValue) =>
                                setGameStatsDate(newValue)
                              }
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </Stack>
                        </LocalizationProvider>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={gameStatsCountry}
                                onChange={() => {
                                  setGameStatsCountry(!gameStatsCountry);
                                }}
                              />
                            }
                            label="Group results by country"
                          />
                        </FormGroup>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                      >
                        <Button variant="contained" onClick={getGameStats}>
                          Get stats
                        </Button>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={gameStatsUseDate}
                                onChange={() => {
                                  setGameStatsUseDate(!gameStatsUseDate);
                                }}
                              />
                            }
                            label="Use date as a parameter"
                          />
                        </FormGroup>
                      </Stack>
                    </Grid>

                    <Grid item xs={12} justifyContent="center">
                      {countries.length > 0 && (
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Country</TableCell>
                                <TableCell align="right">
                                  Number of logins
                                </TableCell>
                                <TableCell align="right">
                                  Daily active users
                                </TableCell>
                                <TableCell align="right">
                                  Number of transactions
                                </TableCell>
                                <TableCell align="right">
                                  Total revenue (USD)
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {countries.map((country) => (
                                <TableRow
                                  key={country.country}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {country.country}
                                  </TableCell>
                                  <TableCell align="right">
                                    {country.numberOfLogins}
                                  </TableCell>
                                  <TableCell align="right">
                                    {country.numberOfActiveUsers}
                                  </TableCell>
                                  <TableCell align="right">
                                    {country.numberOfTransactions}
                                  </TableCell>
                                  <TableCell align="right">
                                    {country.totalRevenue}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </Grid>
                    <Grid item xs={3} />
                    <Grid item xs={6} justifyContent="center">
                      {gameStatsInfo !== null && (
                        <>
                          {" "}
                          <nav aria-label="secondary mailbox folders">
                            <List>
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemText
                                    primary={`Numer of logins: ${gameStatsInfo.numberOfLogins}`}
                                  />
                                </ListItemButton>
                              </ListItem>
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemText
                                    primary={`Number of acive users: ${gameStatsInfo.numberOfActiveUsers}`}
                                  />
                                </ListItemButton>
                              </ListItem>
                            </List>
                          </nav>
                          <Divider />
                          <nav aria-label="secondary mailbox folders">
                            <List>
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemText
                                    primary={`Numer of transactions: ${gameStatsInfo.numberOfTransactions}`}
                                  />
                                </ListItemButton>
                              </ListItem>
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemText
                                    primary={`Total revenue: ${gameStatsInfo.totalRevenue} USD`}
                                  />
                                </ListItemButton>
                              </ListItem>
                            </List>
                          </nav>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </AccordionDetails>
            </Accordion>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
