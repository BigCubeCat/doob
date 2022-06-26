import React, {useState} from 'react';

import Colors from "./Colors";
import Playlist from './Playlist';

export default function Index({user}) {
  const [combination, setCombination] = useState('');
  return (
    <div style={{maxWidth: 500, width: "85%", alignSelf: "center"}}>
        <Colors setCombinations={comb => {
          setCombination(comb)
        }} />
        <Playlist combination={combination} user={user} />
    </div>
  )
}
