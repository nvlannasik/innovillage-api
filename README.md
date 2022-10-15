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
  "email": "string", // {Optional} ,
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
    "id": "number, unique",
    "userName": "string",
    "name": "string",
    "email": "string", // or {blank} ,
    "role": "string"
  },
  "accessToken": "token key, unique"
}
```

## Create Product

Request:

- Method : `POST`
- Endpoint: `/api/product/`
- Header :
  - `Content-Type`: `application/json`
  - `Accept`: `application/json`
- Body:

```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "imageUrl": "https://",
  "harvestDate": "DD-MM-YYYY HH:mm:ss",
  "expirationDate": "DD-MM-YYYY HH:mm:ss"
}
```

- Response:

```json
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "_id": "number, unique",
    "name": "string",
    "description": "string",
    "price": "number",
    "stock": "number",
    "imageUrl": "https://",
    "harvestDate": "DD-MM-YYYY HH:mm:ss",
    "expirationDate": "DD-MM-YYYY HH:mm:ss",
    "timestamps": "ISO DATE Ex : (2022-10-13T05:18:39.105Z)"
  }
}
```

## Get All Product

Request:

- Method : `GET`
- Endpoint: `/api/product/`
- Header :
  - `Content-Type`: `application/json`
- Body:

```json
{
  "null"
}
```

- Response:

```json
{
  "status": "success",
  "message": "Product retrieved successfully",
  "data": [
    {
      "_id": "1",
      "name": "string",
      "description": "string",
      "price": "number",
      "stock": "number",
      "imageUrl": "https://",
      "harvestDate": "DD-MM-YYYY HH:mm:ss",
      "expirationDate": "DD-MM-YYYY HH:mm:ss",
      "timestamps": "ISO DATE Ex : (2022-10-13T05:18:39.105Z)",
    }
    {
      "_id": "2",
      "name": "string",
      "description": "string",
      "price": "number",
      "stock": "number",
      "imageUrl": "https://",
      "harvestDate": "DD-MM-YYYY HH:mm:ss",
      "expirationDate": "DD-MM-YYYY HH:mm:ss",
      "timestamps": "ISO DATE Ex : (2022-10-13T05:18:39.105Z)",
    }
    {
      "_id": "3",
      "name": "string",
      "description": "string",
      "price": "number",
      "stock": "number",
      "imageUrl": "https://",
      "harvestDate": "DD-MM-YYYY HH:mm:ss",
      "expirationDate": "DD-MM-YYYY HH:mm:ss",
      "timestamps": "ISO DATE Ex : (2022-10-13T05:18:39.105Z)",
    }
  ],
}
```

## Get Product By ID

Request:

- Method : `GET`
- Endpoint: `/api/product/:id`
- Header :
  - `Content-Type`: `application/json`
- Response:

```json
{
  "status": "success",
  "message": "Product retrieved successfully",
  "data": {
    "_id": "1",
    "name": "string",
    "description": "string",
    "price": "number",
    "stock": "number",
    "imageUrl": "https://",
    "harvestDate": "DD-MM-YYYY HH:mm:ss",
    "expirationDate": "DD-MM-YYYY HH:mm:ss",
    "timestamps": "ISO DATE Ex : (2022-10-13T05:18:39.105Z)"
  }
}
```

## Update Product By ID

Request:

- Method : `PUT`
- Endpoint: `/api/product/:id`
- Header :
  - `Content-Type`: `application/json`
- Body:

```json
{
  "id": "input id for endpoint",
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "imageUrl": "https://",
  "harvestDate": "DD-MM-YYYY HH:mm:ss",
  "expirationDate": "DD-MM-YYYY HH:mm:ss"
}
```

- Response:

```json
{
  "status": "success",
  "message": "Product updated successfully",
  "data": {
    "_id": "number, unique",
    "name": "string",
    "description": "string",
    "price": "number",
    "stock": "number",
    "imageUrl": "https://",
    "harvestDate": "DD-MM-YYYY HH:mm:ss",
    "expirationDate": "DD-MM-YYYY HH:mm:ss",
    "timestamps": "ISO DATE Ex : (2022-10-13T05:18:39.105Z)"
  }
}
```

## Delete Product By ID

Request:

- Method : `DELETE`
- Endpoint: `/api/product/:id`
- Header :

  - `Content-Type`: `application/json`

- Response:

```json
{
  "status": "success",
  "message": "Product deleted successfully"
}
```

## Create Order

Request:

- Method : `POST`
- Endpoint: `/api/order/`
- Header :
  - `Content-Type`: `application/json`
  - `Accept`: `application/json`
- Body:

```json
{
  "productId": "number",
  "quantity": "number"
}
```

- Response:

```json
{
  "status": "success",
    "message": "Order created successfully",
    "data": {
        "id": 1,
        "product": [
          {
            "id": 1,
            "name": "Product 1",
            "description": "Product 1 description",
            "price": "100.00",
            "imageUrl": "https://",
            "timestamps": "2020-01-01 00:00:00",
          }
          ],
        "quantity": 1,
        "timestamps": "2020-01-01 00:00:00",
}
```

## Get All Order

Request:

- Method : `GET`
- Endpoint: `/api/order/`
- Header :
  - `Content-Type`: `application/json`
- Body:

```json
{
  "null"
}
```

- Response:

```json
{
  "status": "success",
  "message": "Orders retrieved successfully",
  "data": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "name": "Product 1",
        "description": "Product 1 description",
        "price": "100.00",
        "imageUrl": "https://",
        "timestamps": "2020-01-01 00:00:00"
      },
      "quantity": 1,
      "timestamps": "2020-01-01 00:00:00"
    },
    {
      "id": 2,
      "product": {
        "id": 2,
        "name": "Product 2",
        "description": "Product 2 description",
        "price": "200.00",
        "imageUrl": "https://",
        "timestamps": "2020-01-01 00:00:00"
      },
      "quantity": 2,
      "timestamps": "2020-01-01 00:00:00"
    }
  ]
}
```

## Get Order By ID

Request:

- Method : `GET`
- Endpoint: `/api/order/:id`
- Header :
  - `Content-Type`: `application/json`
- Body:

```json
{
  "id": "Need ID For Endpoint"
}
```

- Response:

```json
{
  "status": "success",
  "message": "Orders retrieved successfully",
  "data": {
    "id": 1,
    "product": {
      "id": 1,
      "name": "Product 1",
      "description": "Product 1 description",
      "price": "100.00",
      "imageUrl": "https://",
      "timestamps": "2020-01-01 00:00:00"
    },
    "quantity": 1,
    "timestamps": "2020-01-01 00:00:00"
  }
}
```

## Update Order By ID

Request:

- Method : `PUT`
- Endpoint: `/api/order/update/:id`
- Header :
  - `Content-Type`: `application/json`
- Body:

```json
{
  "id": "Need ID For Endpoint",
  "productId": "number",
  "quantity": "number"
}
```

- Response:

```json
{
  "status": "success",
  "message": "Orders updated successfully",
  "data": {
    "id": 1,
    "product": {
      "id": 1,
      "name": "Product 1",
      "description": "Product 1 description",
      "price": "100.00",
      "imageUrl": "https://",
      "timestamps": "2020-01-01 00:00:00"
    },
    "quantity": 1,
    "timestamps": "2020-01-01 00:00:00"
  }
}
```

## Delete Order By ID

Request:

- Method : `DELETE`
- Endpoint: `/api/order/:id`
- Header :
  - `Content-Type`: `application/json`
- Body:

```json
{
  "id": "Need ID For Endpoint"
}
```

- Response:

```json
{
  "status": "success",
  "message": "Order deleted successfully"
}
```

## Admin Login

Request:

- Method : `POST`
- Endpoint: `/api/admin/login`
- Header :
  - `Content-Type`: `application/json`
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
  "message": "Login successfully",
  "data": {
      "id": "number",
      "email": "string",
      "password": "string",
      "timestamps": "ISO DATE Ex : (2022-10-13T05:18:39.105Z)"
  }
  ```
