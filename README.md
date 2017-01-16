# TheBookDatabase

Simple website for managing books using Goodreads API

![App](https://s23.postimg.org/xns0gcvij/website.jpg)

# Install
```
npm install
```

# Adding MongoDB connection string
Modify MongoDB connection string in `data/database.js`:
```
var mongoUrl = 'mongodb connection string';
```

# Adding your API key
Modify API key in `services/goodReadsService.js`:
```
var options = {
            host: 'www.goodreads.com',
            path: `/book/show/${id}.xml?key=YOUR-API-KEY`
        };
```
# Run
```
npm start
```