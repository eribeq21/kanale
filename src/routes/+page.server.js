import { link } from '$env/static/private';

export async function load() {

  let links = link;

  return{
    link : links
  }
  
}