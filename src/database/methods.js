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
 * @returns {Promise<null|*>}
 */
export async function addNewTrack(title, link) {
  let {data, err} = await supabase.from('tracks').insert([
    {
      'title': title,
      'link': link,
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
 * @returns {Promise<any[][]|*[]>}
 */
export async function getTracksByColors(colors) {
  const {data, err} = await supabase.from('tracks').
      select().
      eq('combination', colors).
      limit(SELECT_LIMIT);
  if (err) {
    return [null, err];
  }
  return [data, null];
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

