import SpotifyWebApi from 'spotify-web-api-node'

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-private',
  'user-read-email',
  'user-follow-modify',
  'user-follow-read',
  'user-library-modify',
  'user-library-read',
  'streaming',
  'app-remote-control',
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'playlist-read-private',
  'playlist-modify-public',
]

const params = {
  scope: scopes,
}
const scoping = scopes.join(',')

const paramString = new URLSearchParams(params)
const redirect_uri = 'http://localhost:3000/api/auth/callback/spotify'
const client_id = process.env.NEXT_PUBLIC_CLIENT_ID
const authendpoint = 'https://accounts.spotify.com/authorize?'
const LOGIN_URL = `${authendpoint}client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scoping}&response_type=token&show_dialog=true`

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

console.log(LOGIN_URL)

export default spotifyApi
export { LOGIN_URL }
