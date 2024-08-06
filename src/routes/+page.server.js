import { mysqlconnFn } from '$lib/db/mysql';
import 'dotenv/config';

export async function load({ url }) {
  const mysqlconn = await mysqlconnFn();
  const tagFilter = url.searchParams.get('tagFilter');
  let queryStr = "SELECT * FROM email"; // Aquí puedes especificar las columnas que necesitas
  const params = [];

  if (tagFilter) {
    queryStr += " WHERE FIND_IN_SET(?, manualTags)";
    params.push(tagFilter);
  }

  try {
    const [rows] = await mysqlconn.query(queryStr, params);
    return {
      emails: rows,
    };
  } catch (error) {
    console.error("Got an error!!!");
    console.log(error);
    return {
      status: 500,
      error: new Error("Failed to load emails")
    };
  }
}
