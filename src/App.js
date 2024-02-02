import React, { useState } from 'react';
import './App.css';
import { Box, TextField, Button, List, ListItem, ListItemText, Stack, ListItemButton, Modal, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';


function TodoList() {
 
  const test = useState('테스트입니다');

  const [creates, setCreate] = useState([]);
  const [inputtext, setInputtext] = useState('');
  const [curState, setCurState] = useState('');
  const [switched, setSwitched]  = useState(false);


  function createBtn(){
    if(inputtext === ''){
      return alert('글자를 입력해주세요');
    }
    let tmpCreate = [...creates];
    tmpCreate.push(inputtext);
    setCreate(tmpCreate);
    setInputtext('');
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

  const onValueChange =  (e,idx) => {
    console.log('e',e)
    const modifyArr = [...creates];
    modifyArr[idx] = e
    // setCreate()
    setCreate([...modifyArr]);
    // console.log(`zzz: ${creates}`);


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
                <ListItem disablePadding >
                  <ListItemButton>
                    <ListItemText className='listItem' primary={creates[idx]} onClick={(e) => deleteItem(e, idx)}/>
                  </ListItemButton>
                  <Box className="radiusBox" sx={{paddingLeft:'15px', paddingTop:'15px'}} >
                    <ModifyItem creates={creates[idx]} onValueChange={(val)=>onValueChange(val,idx)} />
                  </Box>
                </ListItem>
                  );
                })
                }

              </List>
            </nav>
          </Box>
        </Box>
    </Box>
  );
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModifyItem = (props) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(props);



  const confirm = (e) => {
    if(e.keyCode === 13){
      console.log('enter');
      confirmBtn(e);
    }
  }
  const confirmBtn = (e) => {
    
    props.onValueChange(e.target.value);
    // console.log('ente2r : ' + e.target.value);
    handleClose();
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <BorderColorIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-description">
            <TextField 
              defaultValue={props.creates}
              variant="standard"
              label="수정하고 enter키를 누르세요"
              sx={
                {width:'100%'}
              }
              onChange={(e)=>props.onValueChange(e.target.value)}
              onKeyDown={confirm}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default TodoList;