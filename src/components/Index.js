import React, {Fragment, useState} from 'react';

import Colors from "./Colors";
import Playlist from './Playlist';

export default function Index() {
  const [combination, setCombination] = useState('01');
  return (
    <Fragment>
        <Colors setCombinations={comb => {
          console.log("comb =", comb)
          setCombination(comb)
        }} />
        <Playlist combination={combination}/>
    </Fragment>
  )
}
