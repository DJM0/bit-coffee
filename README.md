# bit-coffee

**a virtual currency based on coffee beans**

## Installing and running

    git clone git@github.com/davidmaitland/bit-coffee
    cd bit-coffee
    sails lift

## API

HTTP API with JSON responses based around *CRUD*

'http://127.0.0.1:1337/people/create?name=David Maitland&email=hello@davidmaitland.me'

    {
      "name": "David Maitland",
      "email": "hello@davidmaitland.me",
      "beans": 10,
      "createdAt": "2014-04-28T07:11:31.147Z",
      "updatedAt": "2014-04-28T07:11:31.147Z",
      "id": 1
    }

'http://127.0.0.1:1337/people/create?name=Bob&email=bob@gmail.com'

    {
      "name": "Bob",
      "email": "bob@gmail.com",
      "beans": 10,
      "createdAt": "2014-04-28T07:12:28.286Z",
      "updatedAt": "2014-04-28T07:12:28.286Z",
      "id": 2
    }

'http://127.0.0.1:1337/trades/create?name=Coffee&value=1'

    {
      "name": "Coffee",
      "value": "1",
      "createdAt": "2014-04-28T07:13:04.455Z",
      "updatedAt": "2014-04-28T07:13:04.455Z",
      "id": 1
    }

'http://127.0.0.1:1337/trades/buy?item=1&seller=1&buyer=2'

'http://127.0.0.1:1337/people/'

    [
      {
        "name": "David Maitland",
        "email": "hello@davidmaitland.me",
        "beans": "11",
        "createdAt": "2014-04-28T07:11:31.147Z",
        "updatedAt": "2014-04-28T07:13:30.360Z",
        "id": 1
      },
      {
        "name": "Bob",
        "email": "bob@gmail.com",
        "beans": "9",
        "createdAt": "2014-04-28T07:12:28.286Z",
        "updatedAt": "2014-04-28T07:13:30.356Z",
        "id": 2
      }
    ]
