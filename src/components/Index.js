import React, {Fragment} from 'react';

// import Header from "./Header";
import Colors from "./Colors";
import TabPlaylist from "./TabPlaylist";
import UploadVideo from './UploadVideo';

export default function Index() {
  return (
    <Fragment>
        <Colors />
        <UploadVideo />
        <TabPlaylist />
    </Fragment>
  )
}
