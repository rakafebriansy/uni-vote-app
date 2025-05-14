# Election API Spec

## Create Election

Endpoint: POST /api/elections

Headers:
- Authorization: admin.token

Request Body:

```json
{
    "title": "Pemilihan Ketua BEM 2025",
    "candidates": [
        { 
            "name": "Raka Febrian", 
            "nim": "222410101050" 
        },
        { 
            "name": "Cirilla Fiona", 
            "nim": "222410101097" 
        }
    ],
    "expiresAt": "2025-04-25T23:59:00Z"
}
```

Response Body (Success):
```json
{
    "message": "Election created successfully",
    "data": {
        "_id": "[ObjectID()]",
        "title": "Pemilihan Ketua BEM 2025",
        "candidates": [
            { 
                "name": "Raka Febrian Syahputra", 
                "nim": "222410101050" 
            },
            { 
                "name": "Cirilla Fiona", 
                "nim": "222410101097" 
            }
        ],
        "expiresAt": "2025-04-25T23:59:00Z"
    }
}
```

Response Body (Failed):
```json
{
    "errors": "Failed to create an election"
}
```

## Search Election

Endpoint: GET /api/elections

Headers:
- Authorization: any.token

Query Params:

- title: string, exists: election, optional
- page: number, default 1 
- perPage: number, default 10

Response Body (Success):
```json
{
    "message": "Get all elections",
    "data": {
        "_id": "[ObjectID()]",
        "title": "Pemilihan Ketua BEM 2025",
        "expiresAt": "2025-04-25T23:59:00Z",
        "status": "open"
    }
}
```

Response Body (Failed):
```json
{
    "errors": "Failed to load elections"
}
```

## Get Election

Endpoint: GET /api/elections/:id

Headers:
- Authorization: any.token


Response Body (Success):
```json
{
    "message": "Get election",
    "data": {
        "_id": "[ObjectID()]",
        "title": "Pemilihan Ketua BEM 2025",
        "candidates": [
            { 
                "name": "Raka Febrian Syahputra", 
                "nim": "222410101050" 
            },
            { 
                "name": "Cirilla Fiona", 
                "nim": "222410101097" 
            }
        ],
        "expiresAt": "2025-04-25T23:59:00Z"
    }
}
```

Response Body (Failed):
```json
{
    "errors": "Election is not found"
}
```

## Remove Election

Endpoint: DELETE /api/elections/:id

Headers:
- Authorization: admin.token

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

## Create Vote

Endpoint: POST /api/elections/:id/vote

Headers:
- Authorization: any.token

Request Body:

```json
{
  "nim": "222410101086",
  "candidateNim": "222410101050"
}
```

Response Body (Success):
```json
{
    "message": "Vote submitted successfully",
    "data": {
        "_id": "[ObjectID()]",
        "nim": "222410101086",
        "candidateNim": "222410101050"
    }
}
```

Response Body (Failed):
```json
{
    "errors": "Failed to create an election"
}
```

## Get Vote

Endpoint: GET /api/elections/:id/vote

Headers:
- Authorization: any.token

Response Body (Success):
```json
{
    "message": "Get Vote",
    "data": {
        "_id": "[ObjectID()]",
        "votes": [
            {
                "_id": "[ObjectID()]",
                "nim": "222410101050",
                "count": 60
            },
            {
                "_id": "[ObjectID()]",
                "nim": "222410101097",
                "count": 24
            },
        ],
    }
}
```

Response Body (Failed):
```json
{
    "errors": "Election is not found"
}
```