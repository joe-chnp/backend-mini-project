import * as pg from "pg";

const { Pool } = pg.default;

const connectionPool = new Pool({
    connectionString: "postgresql://postgres:chnpostgres@localhost:5432/backend-mini-project",
});

export default connectionPool;