import {supabase} from './supabaseClient.js';
import {SELECT_LIMIT} from '../consts.js';

/**
 * Adding edited row id to memory table2
 * @param id {int}
 * @returns {Promise<*|null|*>}
 */
async function addToMemory(id) {
  let {data, err} = await supabase.from('memory').select().eq('id', 0);
  if (err) {
    return err;
  }
  if (data[0]['ids'].includes(id)) {
    return null;
  }
  data[0]['ids'].push(id);
  await supabase.from('memory').
      update({'ids': data[0]['ids']}).
      eq('id', 0);
  return null;
}

/**
 *Creates new row in "Tracks" table and new row in "Rates" table
 * @param {string} title Track title
 * @param {string} link Track youtube url
 * @param {string} comb combination
 * @param {bool} isCartoons
 * @returns {Promise<null|*>}
 */
export async function addNewTrack(title, link, comb, isCartoons = false) {
  let {data, err} = await supabase.from(isCartoons ? 'cartoons' : 'tracks').
      insert([
        {
          'title': title,
          'link': link,
          'combination': comb,
        }]);
  if (err) {
    return err;
  }

  console.log(
      `Track added: id: ${data[0]['id']} title: ${data[0]['title']}\n`);
  return null;
}

/**
 * Returns array of rows from "Tracks" table
 * @returns {Promise<*[]>}
 */
export async function getAllTracks() {
  const {data, err} = await supabase.from('tracks').select();
  if (err) {
    return [null, err];
  }
  return [data, null];
}

/**
 * @param colors {string}
 * @param isCartoons {bool}
 * @param userSongs {Array}
 * @returns {Promise<any[][]|*[]>}
 */
export async function getTracksByColors(
    colors, isCartoons,userSongs=[]) {
  if (userSongs.length === 0) {
    const {data, err} = await supabase.from(isCartoons ? 'cartoons' : 'tracks').
        select().
        eq('combination', colors).
        limit(SELECT_LIMIT);
    if (err) {
      return [null, err];
    }
    return [data, null];
  } else {
    const {data, err} = await supabase.from(isCartoons ? 'cartoons' : 'tracks').
        select().eq('combination', colors).in('id', userSongs).
        limit(SELECT_LIMIT);

    if (err) {
      return [null, err];
    }
    return [data, null];
  }
}

/**
 * Updates color statistic for the track.
 * @param track_id {int}
 * @param colors {string}
 * @returns {Promise<null|*>}
 */
export async function updateColors(track_id, colors) {
  let {data, err} = await supabase.from('tracks').select().eq('id', track_id);
  if (err) {
    return err;
  }
  let trackStats = [
    data[0]['rates'][0],
    data[0]['rates'][1],
    data[0]['rates'][2],
    data[0]['rates'][3],
    data[0]['rates'][4],
    data[0]['rates'][5],
    data[0]['rates'][6],
    data[0]['rates'][7],
  ];
  for (const colorId of colors) {
    trackStats[colorId - 0]++;
  }
  await supabase.from('tracks').
      update({'rates': trackStats}).
      eq('id', track_id);
  await addToMemory(track_id);
  return null;
}

export async function addToFavorite(user_id, track_id) {
  const {data, err} = await supabase.from('user_data').
      select('tracks').
      eq('user_id', user_id);
  if (err) {
    return;
  }
  let arr = data[0]['tracks'];
  arr.push(track_id);
  await supabase.from('user_data').
      update({'tracks': arr}).
      eq('user_id', user_id);
  return null;
}


export async function createNewUserData(user_id) {
  const {data, err} = await supabase.from('user_data').
      select().
      eq('user_id', user_id);
  if (err) {
    return;
  }
  if (data.length === 0) {
    await supabase.from('user_data').insert({
      'user_id': user_id,
      'tracks': [],
    });
  }
  return null;
}