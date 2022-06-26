import React, {useEffect, useState} from 'react';

import Colors from './Colors';
import Playlist from './Playlist';
import {createNewUserData} from '../database/methods';

export default function Index({user}) {
  const [combination, setCombination] = useState('');
  useEffect(() => {
    const createUserDataIfNotExists = async () => {
      await createNewUserData(user ? user.id : '');
    };
    createUserDataIfNotExists().catch(console.warn);

  });

  return (
      <div style={{maxWidth: 500, width: '85%', alignSelf: 'center'}}>
        <Colors setCombinations={comb => {
          setCombination(comb);
        }}/>
        <Playlist combination={combination} user={user}/>
      </div>
  );
}
