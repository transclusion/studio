# studio

## Setting up Now

```sh
# Setting Now secrets
now secret add google-oauth-client-id "..."
now secret add google-oauth-client-secret "..."

now secret add zeit-oauth-client-id "..."
now secret add zeit-oauth-client-secret "..."

# Setting Now environment variables
now \
  -e GOOGLE_OAUTH_CLIENT_ID=@google-oauth-client-id \
  -e GOOGLE_OAUTH_CLIENT_SECRET=@google-oauth-client-secret \
  -e ZEIT_OAUTH_CLIENT_ID=@zeit-oauth-client-id \
  -e ZEIT_OAUTH_CLIENT_SECRET=@zeit-oauth-client-secret
```
