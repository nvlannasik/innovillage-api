# API Spec

## Authentication

All API must use this authentication

Request :

- Header :
  - `x-auth-token` : "jwt token"

## User Register

Request:

- Method : `POST`
- Endpoint: `/api/user/register`
- Header :
  - `Content-Type`: `application/json`
  - `Accept`: `application/json`
- Body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "number"
}
```

- Response:

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": "string, unique",
    "name": "string",
    "email": "string",
    "password": "string, hashed",
    "role": "string, default: user",
    "phoneNumber": "number",
    "dateRegist": "date"
  }
}
```

## User Login

Request:

- Method : `POST`
- Endpoint: `/api/user/login`
- Header :
  - `Content-Type`: `application/json`
  - `Accept`: `application/json`
- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

- Response:

```json
{
    "status": "success",
    "message": "User logged in successfully",
    "data": {
        "id": "string, unique",
        "name": "string",
        "email": "sting"
    }
    "accessToken": "token key, unique"
}

```
