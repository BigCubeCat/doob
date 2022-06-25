import {supabase} from './supabaseClient';
import {SELECT_LIMIT} from '../consts';

/**
 * Adding edited row id to memory table2
 * @param supabase
 * @param id {int}
 * @returns {Promise<*|null|*>}
 */
async function addToMemory(supabase, id) {
  let {data, err} = await supabase.from('memory').select('ids').eq('id', 0);
  if (err) {
    return err;
  }
  data.push(id);
  err = await supabase.from('memory').update({'ids': data});
  if (err) {
    return err;
  }
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
  const {data, err} = await supabase.from('tracks').select().eq('id', track_id);
  if (err) {
    return err;
  }
  let trackStats = [
    data[0]['red'],
    data[0]['green'],
    data[0]['blue'],
    data[0]['yellow'],
    data[0]['black'],
    data[0]['gray'],
    data[0]['pink'],
    data[0]['brown'],
  ];
  for (const colorId of colors) {
    trackStats[colorId]++;
  }
  const {errNext} = await supabase.from('track').
      update({'rates': trackStats}).
      eq('id', track_id);
  if (errNext) {
    return errNext;
  }
  return null;
}

