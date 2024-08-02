import { mysqlconnFn } from "$lib/db/mysql";

// Función para cargar los emails
export async function load() {
  let mysqlconn = await mysqlconnFn();
  try {
    let results = await mysqlconn.query("SELECT * FROM email;").then(function ([rows, fields]) {
      return rows;
    });

    return {
      data: results,
    };
  } catch (error) {
    console.error("Got an error!!!");
    console.log(error);
    return error;
  }
}

// Función para analizar y etiquetar emails
export async function POST({ request }) {
  let mysqlconn = await mysqlconnFn();
  try {
    let results = await mysqlconn.query("SELECT * FROM email;").then(function ([rows, fields]) {
      return rows;
    });

    for (let email of results) {
      if (email.content.includes("TechRequest")) {
        await mysqlconn.query("UPDATE email SET manualTags = ? WHERE id = ?", [`${email.manualTags},TechRequest`, email.id]);
      }
    }

    return {
      status: 200,
      body: {
        message: "Emails analyzed and tagged successfully"
      }
    };
  } catch (error) {
    console.error("Got an error!!!");
    console.log(error);
    return {
      status: 500,
      body: {
        message: "An error occurred"
      }
    };
  }
}
