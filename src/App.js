import React, { useState, useEffect } from 'react';
import './App.css';
import { Box, TextField, Button, List, ListItem, ListItemText, Stack, ListItemButton, Modal, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';


function TodoList() {
 
  const test = useState('테스트입니다');

  const [creates, setCreate] = useState([]); // 입력된 자료
  const [tmpCreates, setTmpCreate] = useState([]); // 입력된 자료의 복사본
  const [modifiedValue, setModifiedValue] = useState('');
  
  const [inputtext, setInputtext] = useState('');
  const [curState, setCurState] = useState('');
  const [switched, setSwitched]  = useState(false);

  const setState = () => {
    if (switched === false) {
      setSwitched(true);

    } else {
      setSwitched(false);
    }
  }

  function createBtn(){
    if(inputtext === ''){
      return alert('글자를 입력해주세요');
    }
    let tmpCreate = [...creates];
    tmpCreate.push(inputtext);
    setCreate(tmpCreate);
    setInputtext(''); // 입력 후 글자 공백처리
    // console.log(creates)
  }

  const enterCreateBtn = (e) => {
    if(e.keyCode === 13){
      createBtn();
    }
  };

  const deleteItem = (e, idx)=>{
    console.log("idx",idx)
    creates.splice(idx, 1);
    setCreate([...creates]);
  }
  return (
    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',border:'1px solid #000'}}>
      <Box className="headContainer">
        <Box>
          
          <Stack spacing={3} direction="row" justifyContent="space-between">
              <h1>Todo List</h1>
              <CreateIcon 
              sx={{
                color: '#FFF',
                borderColor: '#FFF',
                fontSize:40,
                '&:hover': {
                  backgroundColor: '#7DBFD8', // hover 시 배경색 변경
                  color: '#FFF', // hover 시 텍스트 색상 변경
                }
              }}
              onClick={createBtn}
              />
          </Stack>
          <Stack spacing={5} direction="row">
            <TextField 
              id="" 
              label="New Todo" 
              variant="standard" 
              sx={{ width: '100%', margin:'10px' }}
              value={inputtext}
              onChange={(e) => { setInputtext(e.currentTarget.value)  } }
              onKeyDown={enterCreateBtn}
            />
          </Stack>
        </Box>
      </Box>
      <Box className="boxContainer" >
          <Box>
            <nav aria-label="secondary mailbox folders">
              <List>
                {
                creates.map((name, idx)=>{ return (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText className='listItem' primary={creates[idx]} onClick={(e) => deleteItem(e, idx)}/>
                  </ListItemButton>
                  <Box onClick={() => {setSwitched(true); setCurState(idx); }}  >
                    <Button>수정</Button>
                  </Box>
                </ListItem>
                  );
                })
                }
                {
                  switched === true 
                  ? <ModifyBox 
                      switched={switched}
                      setSwitched={setSwitched}
                      creates={creates[curState]} 
                      setModifiedValue={(modifiedValue) => {
                        // 여기서 수정된 값을 사용할 수 있음
                        creates[curState] = modifiedValue;
                        setCreate([...creates]);
                      }}
                  /> 
                  : null
                }
              </List>
            </nav>
          </Box>
        </Box>
    </Box>
  );
}

function ModifyBox(props){
  const [open, setOpen] = useState(false);
  const [modifiedValue, setModifiedValue] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.setSwitched(false);
  };

  const mdf = (e)=>{
    console.log(e);
    setModifiedValue(e);
  }
  useEffect(()=>{
    console.log("open: " + open);
  })

  console.log(`props`);
  console.log(props);
  console.log(props.switched);
  return (
    
      <Dialog
        open={props.switched}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
            props.setModifiedValue(modifiedValue);
          },
        }}
      >
        <DialogContent>
          <TextField
            autoFocus
            // required
            margin="dense"
            id="name"
            fullWidth
            defaultValue={props.creates}
            variant="standard"
            onChange={(e)=>mdf(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
  )
}

export default TodoList;