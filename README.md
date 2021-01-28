# Spotify-SCP
Show which song you're currently listening to on your website. 


## Step 1
Visit the [Spotify Developer site](https://developer.spotify.com/dashboard/), create an app and note your **Client ID** and **Client Secret** down somewhere or add it to the JSON file I'm providing. Also add a redirect uri. Example would be https://www.google.com/. Just make sure to [encode](https://www.urlencoder.org/) the URL for step 2.

## Step 2 
Update this link with your **client_id**:

https://accounts.spotify.com/authorize?response_type=code&client_id=CLIENTIDGOESHERE&scope=playlist-modify-private&redirect_uri=https%3A%2F%2Fwww.google.de%2F
-> modify the [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) if needed.

The access code should be now seen in the URL. https://www.google.com/?code=YOURCODESHOULDBEHERE
Write the access code down somewhere or add it to the JSON file I'm providing.

## Step 3

Running this CURL command should return a JSON string with your refresh token inside.

    curl -d client_id=CLIENTIDGOESHERE -d client_secret=CLIENTSECRETGOESHERE -d grant_type=authorization_code -d code=CODE -d redirect_uri=https%3A%2F%2Fwww.google.de%2F https://accounts.spotify.com/api/token

Place the refresh token into the JSON file I'm providing and you're good to go!
