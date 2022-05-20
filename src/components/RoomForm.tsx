import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const RoomForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState<string>("")
    
  const redirectToGameRoom = () => {
    console.log("join", value);
    fetch(`https://game-room-center.herokuapp.com/gamerooms/${value.trimEnd()}`)
      .then((response):void => {
        console.log(response);
        if (response.statusText === 'Found') {
          const redirect = `/tic-tac-toe-typescript/gameroom/${value.trimEnd()}/guest`
          navigate(redirect);
        } else {
          window.alert(`Sorry, we were not able to find ${value.trimEnd()} gameroom. Please, check with your friend or you might want to create a new one.`)
        }
      })
  } 
  const createGameRoom = () => {
    console.log("create", value);
    const formData = new FormData();
    formData.append("gameroom[name]", value);
    fetch("https://game-room-center.herokuapp.com/gamerooms", {
      method: 'post',
      body: formData
    }).then(response => response.json())
    .then((data):void => {
      console.log(data);
      if (data.status === "created") {
        const redirect = `/tic-tac-toe-typescript/gameroom/${data.gameroom_name}/admin`
        navigate(redirect);
      } else {
        window.alert(data.error_msg);
      }
    })
  }

  return (
    <div className="room-form">
      <Header active="roomform" />
      <form>
        <input type={"text"} placeholder="Enter a gameroom" value={value} onChange={(e)=> setValue(e.target.value)}></input>
        <div>
          <input type="button" value="Create a gameroom" onClick={(e)=> {
            e.preventDefault();
            createGameRoom();
          }} />
          <input type="button" value="Enter a gameroom" onClick={(e):void=> { 
            e.preventDefault();
            redirectToGameRoom()
          }} />
        </div>
      </form>
    </div>
  );
};

export default RoomForm;