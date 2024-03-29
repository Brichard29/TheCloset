const { client } = require('./')

const { createProduct, getAllProducts, getProductById, getProductByTitle } = require('./products')
const { createUser, getAllUsers, getUserById, getUserByEmail } = require('./users')
const { createReview, getAllReviews, deleteReview } = require('./reviews')
const { createOrder, getAllOrders, getOrdersByUserId } = require('./orders')
const { createOrderItem, getAllOrderItems, getOrderItemsByOrder } = require('./orderItems')
const { createCategory } = require('./categories')

async function dropTables() {
  try {
    console.log('Dropping Tables')
    // add code here
    await client.query(`
      DROP TABLE IF EXISTS user_carts;
      DROP TABLE IF EXISTS product_categories;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS "orderItems";
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)

    console.log('Finished Dropping Tables')
  }
  catch (ex) {
    console.log('error dropping tables')
  }
}

async function createTables() {
  try {
    console.log('Creating Tables')
    // add code here 
    // added category and image to products table
    await client.query(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      description VARCHAR(255),
      price INTEGER,
      inventory INTEGER,
      image TEXT
      );
      `)
    // products needs, categories with 1 required, and photo with placeholder

    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          "isAdmin" BOOLEAN DEFAULT FALSE
          );  
          `)
    // users needs, check for valid email

    await client.query(`
    CREATE TABLE categories (
      id SERIAL PRIMARY KEY,
      category VARCHAR(255) NOT NULL
      );
      `)

    await client.query(`
      CREATE TABLE product_categories (
          id SERIAL PRIMARY KEY,
          "categoryId" INTEGER REFERENCES categories(id),
          "productId" INTEGER REFERENCES products(id)
              );
            `)

    await client.query(`
          CREATE TABLE reviews (
            id SERIAL PRIMARY KEY,
            "productId" INTEGER REFERENCES products(id),
            "userId" INTEGER REFERENCES users(id),
            content VARCHAR(255) NOT NULL
            );
            `)
    // should be ok
    await client.query(`
            CREATE TABLE user_carts (
              id SERIAL PRIMARY KEY,
              "userId" INTEGER REFERENCES users( id ),
              "itemId" INTEGER references products( id ) UNIQUE NOT NULL,
              "qty" INTEGER NOT NULL
              );
              `)

    await client.query(`
            CREATE TABLE orders (
              id SERIAL PRIMARY KEY,
              "customerId" INTEGER REFERENCES users( id ),
              date DATE NOT NULL
              );
              `)
    // should be ok
    await client.query(`
              CREATE TABLE "orderItems" (
                id SERIAL PRIMARY KEY,
                "orderId" INTEGER REFERENCES orders ( id ),
                "productId" INTEGER REFERENCES products ( id ),
                quantity INTEGER,
                price INTEGER
                );
    `)
    // should be ok
    console.log('Finished Creating Tables')
  }
  catch (ex) {
    console.log('error creating tables')
  }
}

async function createInitialProducts() {
  try {
    console.log('Creating Products')
    await createProduct({
      title:
        "Beige Crewneck Sweater",
      description:
        "100% cotton. Ribbed collar, cuffs, and hem.",
      price:
        60,
      inventory:
        27,
      image:
        "https://i.postimg.cc/fyZ51QKY/pexels-ron-lach-9594089.jpg",
      categories: [1 , 2 , 3]
    });

    await createProduct({
      title:
        "Assorted Sock Box",
      description:
        "80% Cotton, 17% Polyester, 3% Spandex. Heavyweight fabric.",
      price:
        20,
      inventory:
        16,
      image:
        "https://i.postimg.cc/d3Hd6bSs/pexels-ron-lach-9594145.jpg",
      categories: [ 2, 3]
    });

    await createProduct({
      title:
        "Olive Green Button-Down Shirt",
      description:
        "100% Cotton. Button-down collar.",
      price:
        40,
      inventory:
        32,
      image:
        "https://i.postimg.cc/dQbTs9PS/pexels-ron-lach-9594940.jpg",
      categories: [4]
    });

    await createProduct({
      title:
        "Cream Crop-Top",
      description:
        "90% cotton and 10% spandex. Ribbed cloth",
      price:
        25,
      inventory:
        9,
      image:
        "https://i.postimg.cc/nV4nmK9W/pexels-ron-lach-9594418.jpg",
      categories: [4]
    });

    await createProduct({
      title:
        "Jordan 1 Low",
      description:
        "White/Black/Gym Red. Leather upper and rubber outsole.",
      price:
        110,
      inventory:
        12,
      image:
        "https://i.postimg.cc/PJ33DFWZ/pexels-hamza-nouasria-12725052.jpg",
      categories: [4]
    });

    await createProduct({
      title:
        "Nike Hat",
      description:
        "Black/Gym Red. Adjustable size.",
      price:
        20,
      inventory:
        8,
      image:
        "https://i.postimg.cc/nV6TsqK5/pexels-aman-jakhar-1124465.jpg",
      categories: [4]
    });

    await createProduct({
      title:
        "Round Sunglasses",
      description:
        "Black gradient. Metal frame.",
      price:
        75,
      inventory:
        10,
      image:
        "https://i.postimg.cc/LXR509P2/pexels-asim-alnamat-343720.jpg",
      categories: [4]
    });

    await createProduct({
      title:
        "Jeans",
      description:
        "Two colors available. 100% denim.",
      price:
        60,
      inventory:
        35,
      image:
        "https://i.postimg.cc/02mp3QMJ/pexels-mica-asato-1082528.jpg",
      categories: [4]
    });

    await createProduct({
      title:
        "37mm Watch",
      description:
        "Leather band. 37mm face.",
      price:
        190,
      inventory:
        13,
      image:
        "https://i.postimg.cc/kGGTKdfv/pexels-anthony-derosa-236915.jpg",
      categories: [4]
    });

    await createProduct({
      title:
        "Leather Dress Shoes",
      description:
        "Genuine leather. Wide-range of sizes available.",
      price:
        105,
      inventory:
        13,
      image:
        "https://i.postimg.cc/L5jGnSXQ/pexels-donna-9965910.jpg",
      categories: [4]
    });


    console.log('Finished creating Products')
  }
  catch (ex) {
    console.log('error creating Products')
  }
}

async function createInitialUsers() {
  try {
    console.log('Creating Users')
    await createUser({
      email:
        "fakeemail@gmail.com",
      password:
        "123456",
    });

    await createUser({
      email:
        "Second user",
      password:
        "Password2",
    });

    await createUser({
      email:
        "Third user",
      password:
        "Password3"
    });
  
    console.log('Finished creating Users')
  }
  catch (ex) {
    console.log('error creating Users')
    console.log(ex)
  }
}

async function createInitialReviews() {
  try {
    console.log('Creating Reviews')
    await createReview({
      productId:
        1,
      userId:
        1,
      content:
        "This is the first review"
    });

    await createReview({
      productId:
        2,
      userId:
        2,
      content:
        "This is the second review"
    });

    await createReview({
      productId:
        3,
      userId:
        3,
      content:
        "This is the third review"
    });

    console.log('Finished creating Reviews')
  }
  catch (ex) {
    console.log('error creating Reviews')
    console.log(ex)
  }
}
async function createInitialCategories() {
  try {
    console.log('creating categories')
    const categoriesToAdd = [ // add more strings to this array to make more categories
      'Featured',
      'Shirts',
      'Pants',
      'Shoes'
    ]
    categoriesToAdd.map(async (cat) => {
      await createCategory(cat)
    })
    console.log('finished creating categories')
  } catch (ex) {
    console.log('error creating categories')
    console.log(ex)
  }
}


async function createInitialOrders() {
  try {
    console.log('Creating Orders')
    await createOrder({
      customerId:
        null,
      date:
        20221102
    });

    await createOrder({
      customerId:
        2,
      date:
        20221103
    });

    await createOrder({
      customerId:
        null,
      date:
        20221104
    });

    console.log('Finished creating Orders')
  }
  catch (ex) {
    console.log('error creating Orders')
    console.log(ex)
  }
}

async function createInitialOrderItems() {
  try {
    console.log('Creating Orders')
    await createOrderItem({
      orderId:
        1,
      productId:
        1,
      quantity:
        1,
      price:
        1
    });

    await createOrderItem({
      orderId:
        2,
      productId:
        2,
      quantity:
        2,
      price:
        2
    });

    await createOrderItem({
      orderId:
        3,
      productId:
        3,
      quantity:
        3,
      price:
        3
    });

    console.log('Finished creating orderItems')
  }
  catch (ex) {
    console.log('error creating orderItems')
    console.log(ex)
  }
}

async function buildDB() {
  try {
    // need to add something here
    // client.connect();
    await dropTables();
    await createTables();
    await createInitialCategories();
    await createInitialProducts();
    await createInitialUsers();
    await createInitialReviews();
    await createInitialOrders();
    await createInitialOrderItems();
  }
  catch (ex) {
    console.log('Error building the DB')
  }
}
buildDB()
  .catch(console.error)
  .finally(() => client.end())
