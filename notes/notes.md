# notes

## robots.txt

[See this article](https://www.cyberciti.biz/web-developer/block-openai-bard-bing-ai-crawler-bots-using-robots-txt-file/)

Plus, [see this cloudflare article](https://blog.cloudflare.com/ai-bots/)

## OAuth / Login

See [OAuth for the Open Web](https://aaronparecki.com/2018/07/07/7/oauth-for-the-open-web)
article.

> Once we've found the user's authorization endpoint, we can start a normal
> OAuth request and send them to their server to authenticate. 

__the scenario__

I am making a new application, and I need to verify that the person I am talking
to is the owner of `nichoth.com`.

>
> When the server redirects back to the application, it will go and verify
> the authorization code with their authorization endpoint just like
> normally happens with OAuth.
>

> an easy opportunity to return this to the application: in the access token
> response when the application sends the authorization code to obtain an
> access token. 

See [indieauth-for-login](https://indieweb.org/indieauth-for-login) article.


1. User enters their personal web address in the login form of the web
   application and clicks "Log in"
1. Web application discovers the authorization endpoint by fetching the
   user's homepage
1. Web application redirects the user's browser to the authorization endpoint
1. Authorization endpoint verifies the user, e.g. by logging in
1. Authorization endpoint redirects the browser back to the web application,
   including a code
1. Web application verifies the code directly with the authorization endpoint
1. User is logged into the web application

>
> The user chooses an authorization server by linking to it from their
> home page.
>

```html
<link rel="authorization_endpoint" href="http://indieauth.example.org/">
```
