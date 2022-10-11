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
  "phoneNumber": "number",
  "userName": "string"
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
    "dateRegist": "date",
    "userName": "string"
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
  "userName": "string",
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
    "userName": "string",
    "name": "string",
    "email": "sting",
    "role": "string"
  },
  "accessToken": "token key, unique"
}
```
## Petani Register

Request:

- Method : `POST`
- Endpoint: `/api/petani/register`
- Header :
  - `Content-Type`: `application/json`
  - `Accept`: `application/json`
- Body:

```json
{
  "name": "string",
  "email": "string" ,// {Optional} ,
  "password": "string",
  "phoneNumber": "number",
  "userName": "string"
}
```

- Response:

```json
{
  "status": "success",
  "message": "Register Petani Berhasil",
  "data": {
    "id": "string, unique",
    "name": "string",
    "email": "string", // or {blank},
    "password": "string, hashed",
    "role": "string, default: user",
    "phoneNumber": "number",
    "dateRegist": "date",
    "userName": "string"
  }
}
```

## Petani Login

Request:

- Method : `POST`
- Endpoint: `/api/petani/login`
- Header :
  - `Content-Type`: `application/json`
  - `Accept`: `application/json`
- Body:

```json
{
  "userName": "string",
  "password": "string"
}
```

- Response:

```json
{
  "status": "success",
  "message": "User berhasil login",
  "data": {
    "id": "string, unique",
    "userName": "string",
    "name": "string",
    "email": "sting",
    "role": "string"
  },
  "accessToken": "token key, unique"
}
```
