# netlify notes

[run a lambda function on an event](https://www.netlify.com/blog/2021/12/19/automatically-trigger-netlify-functions-on-specific-events/)

[blog about the button](https://www.netlify.com/blog/2021/12/26/deploying-with-the-click-of-a-button/)

The difficult part is that when someone clicks the 'deploy' button, we need to create a new keypair in node, and save the private key as an env variable.







## html example

```html
<a href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/next-netlify-starter">
  <img src="https://www.netlify.com/img/deploy/button.svg">
</a>
```

## add env vars with values

[set env vars](https://docs.netlify.com/site-deploys/create-deploys/#pre-fill-environment-variables)

### tldr -- use the hash
> You can pass environment variable values for the site template in the hash of the template’s Deploy to Netlify URL with key/value pairs. 

> You can can create custom Deploy to Netlify buttons for your users with tokens and other secure data, and they won’t appear in Netlify logs.

### example pre-filled secrets

```
https://app.netlify.com/start/deploy?repository=https://github.com/myworkspace/sweetkittentemplate#SECRET_TOKEN=specialuniquevalue&CUSTOM_LOGO=https://placekitten.com/100/100
```

## add env vars that need to be written by the user when you click the button

Use the `netlify.toml` file.

```
[template.environment]
  FAUNA_DB_SECRET = "faunaDB secret"
  CLOUDINARY_SECRET = "cloudinary secret"
```








----------------------------------------------

**How to set the keypair when you create a new site?**

* make a template repo for the deployment. The URL for this template goes in the deploy button's URL.

The 'deploy' button is a link with the following URL as an `href`:

```
https://app.netlify.com/start/deploy?repository=https://github.com/netlify/netlify-statuskit
```

-----------------------------------------

[ocs.netlify.com/site-deploys/create-deploys/#deploy-to-netlify-button](https://docs.netlify.com/site-deploys/create-deploys/#deploy-to-netlify-button)

> You can provide a set of default values for your template directly in the template’s git repository.

Create a `netlify.toml` file in the template repo root. 

> A list of required environment variables. This is the way to let users configure specific configuration options upon deployment.

Use the `[template.environment]` section to add variables that the user will configure.

```
[template.environment]
  SECRET_TOKEN = "change me for your secret token"
  CUSTOM_LOGO = "set the url to your custom logo here"
```

> You can pass environment variable values for the site template in the hash of the template’s Deploy to Netlify URL with key/value pairs. 

```
https://app.netlify.com/start/deploy?repository=https://github.com/myworkspace/sweetkittentemplate#SECRET_TOKEN=specialuniquevalue&CUSTOM_LOGO=https://placekitten.com/100/100
```

The problem is that it needs to be unique every time

> Passing environment variable values in the hash ensures that they’re processed on the client side only. You can can create custom Deploy to Netlify buttons for your users with tokens and other secure data, and they won’t appear in Netlify logs.

Could try doing that, and we could put the `deploy` button on my website, and that way you could generate a new keypair every time the page loads, instead of having to write a static value in a readme file or what have you.

https://www.netlify.com/blog/2019/09/10/announcing-the-faunadb-add-on-for-netlify/#:~:text=The%20FaunaDB%20Add%2Don%20for%20Netlify%20enables%20users%20to%20seamlessly,manage%20them%20within%20FaunaDB%20Console.

-------------------------------------

[written instructions for deploy button + fauna](https://github.com/netlify/netlify-faunadb-example#tldr-quick-deploy)

> Paste your FaunaDB database access secret into the “Your FaunaDB Server Secret” field.

> Click “Save & Deploy”. Netlify clones your repo, then builds and deploys your app. All done!

**Need to visit fauna website and get a secret key**

----------------------------------------

`ssc-server` could be a template repo for netlify, and hermes can be a
deployed instance.



