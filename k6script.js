import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 500,
  duration: '60s',
  rps: 2000
};

export default function() {
  let randomArtist;
  if (Math.random() < 0.95) {
    randomArtist = Math.floor((Math.random() * 1000000) + 9625001);
  } else {
    randomArtist = Math.floor((Math.random() * 9625000) + 1);
  }
  let res = http.get(`http://localhost:3001/artists/albums/${randomArtist}`);
  check(res, {
    'status was 200': (r) => r.status === 200,
    'transaction time OK': (r) => r.timings.duration < 500,
    'transaction time under 1s': (r) => r.timings.duration < 1000 
  });
}