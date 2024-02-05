import React, { useState, useEffect } from 'react';
import './App.css';
import { Box, TextField, Button, List, ListItem, ListItemText, Stack, ListItemButton, Dialog, DialogContent, DialogActions } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';



function TodoList() {

  const [creates, setCreate] = useState([]); // 입력된 자료
  const [inputtext, setInputtext] = useState('');
  const [curState, setCurState] = useState('');
  const [switched, setSwitched]  = useState(false);

  function createBtn(){
    if(!(inputtext.trim().length !== 0)){
      return alert('글자를 입력해주세요');
    }
    
    let tmpCreate = [...creates];
    tmpCreate.push(inputtext);
    setCreate(tmpCreate);
    setInputtext(''); // 입력 후 글자 공백처리
  }

  const enterCreateBtn = (e) => {
    if(e.keyCode === 13){
      createBtn();
    }
  };

  const deleteItem = (e, idx)=>{
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
                  <ListItemButton onClick={(e) => deleteItem(e, idx)}>
                    <ListItemText className='listItem' primary={creates[idx]} />
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
                      setModified={(e) => {
                        // 여기서 수정된 값을 사용할 수 있음
                        creates[curState] = e;
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
  const [modifiedValue, setModifiedValue] = useState('');
  
  const handleClose = () => {
    props.setSwitched(false);
  };

  const mdf = (e)=>{
    setModifiedValue(e);
  }

  useEffect(() => {
    // 모달이 열릴 때마다 modifiedValue를 초기화
    setModifiedValue(props.creates); 
  }, []);

  return (
    
      <Dialog
        open={props.switched}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
            props.setModified(modifiedValue);
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
          <Button onClick={handleClose}>취소</Button>
          <Button type="submit" onClick={() => props.setModified(modifiedValue || props.creates)}>수정</Button>
        </DialogActions>
      </Dialog>
  )
}

export default TodoList;