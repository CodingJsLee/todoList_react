import React from 'react';
import './App.css';
import { Box, TextField, Button, List, ListItem, ListItemText, Stack } from '@mui/material';

function TodoList() {
 
  return (
    <Box>
      <Box className="headContainer">
        <Box>
          <h1>Todo List</h1>
          <Stack spacing={2} direction="row">
            <TextField 
              id="standard-basic" 
              label="New Todo" 
              variant="standard" 
              sx={{ width: '80%' }}
            />
            <Button className="btns" variant="outlined"
            sx={{
              color: '#FFF',
              borderColor: '#FFF',
              '&:hover': {
                backgroundColor: '#7DBFD8', // hover 시 배경색 변경
                color: '#FFF', // hover 시 텍스트 색상 변경
              }
            }}
            >Todo</Button>
          </Stack>
        </Box>
      </Box>
      <Box className="boxContainer">
          여기에다 글적어
        </Box>
    </Box>
  );
}

export default TodoList;