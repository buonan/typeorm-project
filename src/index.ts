const express = require("express");
import { createConnection, Connection, getConnectionManager, DataSource } from 'typeorm';
import { Photo } from './models/photo.model';
import { User } from './models/user.model';

const app = express();

export var connection: Connection;
export const connectedPromise: Promise<void> = createConnection({
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'example',
    database: 'test',
    timezone: 'Z',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/**/models/**.model{.ts,.js}'],
    subscribers: [__dirname + '/**/subscribers/**.subscriber{.ts,.js}'],
}).then(async (_conn) => {
    connection = _conn;

    const dataSource = getConnectionManager().connections[0];
    method1(dataSource, connection);
    method2(dataSource, connection);
});

async function method1(dataSource: DataSource, connection: Connection) {
    const photoRepository = connection.getRepository(Photo);
    const userRepository = connection.getRepository(User);
    let user = await userRepository.query('SELECT *  FROM user WHERE name = ?', ['John']);
    if (user) {

    } else {

    }
    const photos = await photoRepository.find({ relations: ["user"] });

    const photo1 = new Photo()
    photo1.url = "me.jpg"
    await dataSource.manager.save(photo1)

    const photo2 = new Photo()
    photo2.url = "me-and-bears.jpg"
    await dataSource.manager.save(photo2)

    const person = new User()
    person.name = "John"
    person.photos = [photo1, photo2]
    await dataSource.manager.save(person)
}

async function method2(dataSource: DataSource, connection: Connection) {
    const person = new User()
    person.name = "John"
    await dataSource.manager.save(person)

    const photo1 = new Photo()
    photo1.url = "me.jpg"
    photo1.user = person
    await dataSource.manager.save(photo1)

    const photo2 = new Photo()
    photo2.url = "me-and-bears.jpg"
    photo2.user = person
    await dataSource.manager.save(photo2)
}

console.log(`Hello TypeScript!`)

// start express server
app.listen(3000);