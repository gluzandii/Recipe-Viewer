import {users} from "./db/schema.js";

import "dotenv/config";
import postgres from "postgres";
import {drizzle} from "drizzle-orm/postgres-js";

const client = postgres(process.env.DATABASE_URL!, {prepare: false});

export const db = drizzle(client);

async function main() {
    await db.insert(users).values({name: "Alice", email: "nsusss@gmail.com", passwordHash: "hihi"});

    const allUsers = await db.select().from(users);
    console.log(allUsers);
}

main().catch(console.error);