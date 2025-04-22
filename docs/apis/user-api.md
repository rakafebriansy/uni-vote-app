# User API Spec

## Register User

Endpoint: POST /api/users

Request Body:

```json
    {
        "nim": "222410101050",
        "password": "password",
        "name": "Raka Febrian"
    }
```

Response Body (Success):
```json
{
    "data": {
        "nim": "222410101050",
        "name": "Raka Febrian"
    }
}
```

Response Body (Failed):
```json
{
    "errors": "NIM is already exists"
}
```

## Login User

Endpoint: POST /api/users/login

Request Body:
```json
{
    "nim": "222410101050",
    "password": "1234",
}
```

Response Body (Success):
```json
{
    "data": {
        "nim": "222410101050",
        "name": "Raka Febrian",
        "token": "[Session ID Generated]"
    }
}
```

Response: Body (Failed):
```json
{
    "errors": "NIM or password is wrong"
}
```

## Logout User

Endpoint: DELETE /api/users/current

Headers:
- Authorization: any.token

Response Body (Success):
```json
{
    "data": true
}
```

Response: Body (Failed):
```json
{
    "errors": "Invalid token"
}
```