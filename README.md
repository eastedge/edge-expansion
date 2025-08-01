# edge-expansion

It is a Wordpress integration plugin that comes with a variety of features to enhance your website.

### Environment Construction（Mac）
- Install MAMP
- Install Node.js


### How to use (overview)
Create Block is an official WordPress tool that creates the templates and development environment necessary for creating blocks.\
To create a block skeleton and development environment, run the create-block command in your terminal.\
For example, if you run the following command in the plugin directory, a directory called edge-block will be created and the necessary files will be generated inside it.

### Creating Files
```
% npx @wordpress/create-block edge-block
```


### Setting up a development environment
In your terminal, navigate to the directory my-block and run the command npm start to enable edge-block and start development.

```
% cd edge-block
% npm start
```

### For production environments
Once development is complete, run the production build with the npm run build command.

```
//For production environments
% npm run build
```
