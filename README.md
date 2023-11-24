# MONGOOSE-EXPRESS-CRUD-MASTERY

## To Run this project:

### Clone the repository

```bash
git clone https://github.com/mfarhadattari/mongoose-express-crud-mastery
```

### Install Dependencies

```bash
cd mongoose-express-crud-mastery
yarn
```

### Add Environment Variables

```
NODE_ENV = <environment>
PORT = <port>
DATABASE_URI = <database-uri>
```

### Run the project

```bash
yarn dev
```

### To Build

```bash
yarn build
```

### To run built applications

```bash
yarn start
```

### Other Commands:

```bash
yarn lint
yarn lint --fix
yarn format
```

## Testing API

### Create A User API (POST): https://ts-mongoose-crud-master-dmf.vercel.app/api/users

```json
{
  "userId": 10,
  "username": "linda_brown",
  "password": "Asdfg12345",
  "fullName": {
    "firstName": "Linda",
    "lastName": "Brown"
  },
  "age": 42,
  "email": "linda.brown@example.com",
  "isActive": true,
  "hobbies": ["yoga", "painting"],
  "address": {
    "street": "987 Oak St",
    "city": "Cityville",
    "country": "USA"
  }
}
```

### Get All Users API (GET): https://ts-mongoose-crud-master-dmf.vercel.app/api/users

### Get A User API (GET): https://ts-mongoose-crud-master-dmf.vercel.app/api/users/10

### Update a User API (PUT): https://ts-mongoose-crud-master-dmf.vercel.app/api/users/10

```json
{
  "userId": 10,
  "username": "linda_brown",
  "password": "Asdfg12345",
  "fullName": {
    "firstName": "Linda",
    "lastName": "Brown"
  },
  "age": 42,
  "email": "linda.brown@gmail.com",
  "isActive": true,
  "hobbies": ["yoga", "painting", "cycaling"],
  "address": {
    "street": "987 Oak St",
    "city": "Cityville",
    "country": "USA"
  }
}
```

### Delete a User API (DELETE): https://ts-mongoose-crud-master-dmf.vercel.app/api/users/10

### Add An Order API (PUT): https://ts-mongoose-crud-master-dmf.vercel.app/api/users/5/orders

```json
{
  "productName": "Laptop Bag",
  "price": 67,
  "quantity": 2
}
```

### Get a user orders API (GET): https://ts-mongoose-crud-master-dmf.vercel.app/api/users/5/orders

### Get a user total price of orders API (GET): https://ts-mongoose-crud-master-dmf.vercel.app/api/users/5/orders/total-price
