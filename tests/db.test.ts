import DBFactory  from "../src/db";

test('Testing AWS RDS Connection', async () => {
    const conn = await new DBFactory().getConnection();
    expect(conn?.isConnected).toBe(true);    
});