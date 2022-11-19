import {
  Box,
  styled,
  Dialog,
  Typography,
  TextField,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import { useState, useEffect } from "react";
import { createTask } from "../api";
import { Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";

const Container = styled(Box)`
  height: 100vh;
  background-color: #e8e8e8;
`;

const dialogStyle = {
  height: "80%",
  width: "70%",
  borderRadius: "1%",
  boxShadow: "none",
  overflow: "none",
  display: "flex",
};

const Title = styled(Typography)`
  font-size: 36px;
  font-weight: 300;
  text-align: center;
  margin: 20px auto;
  font-family: inherit;
`;

const Main = () => {
  const [text, setText] = useState("");

  const handleClickTask = async () => {
    await createTask(text);
    setText("");
    await getTasks();
  };

  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const res = await axios.get("http://localhost:4000/api/v1/tasks");
    setTaskItems(res.data);
  };

  return (
    <Container>
      <Dialog
        open={true}
        PaperProps={{ sx: dialogStyle }}
        hideBackdrop={true}
        maxWidth={"md"}
      >
        <Box>
          <Title>Task Manager</Title>
        </Box>
        <Stack direction="row" spacing={1} style={{ margin: "30px auto" }}>
          <TextField
            sx={{ width: 300 }}
            label="Task Name"
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button color="secondary" onClick={handleClickTask}>
            Add
          </Button>
        </Stack>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            margin: "0px auto",
            padding: 0,
          }}
        >
          {taskItems.map((item) => (
            <ListItem key={item._id} sx={{ margin: 0, padding: 0 }}>
              <ListItemText primary={item.name} />
              <ListItemIcon>
                <DeleteIcon
                  onClick={async () => {
                    await axios.delete(
                      `http://localhost:4000/api/v1/tasks/${item._id}`
                    );
                    await getTasks();
                  }}
                />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </Container>
  );
};

export default Main;
