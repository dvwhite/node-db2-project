
exports.up = function(knex) {
  // Initialize the database
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    
    // Required fields
    tbl.text("VIN", 17) // max lenfth of a VIN is 17 characters
      .unique()
      .notNullable();
    tbl.text("make")
      .notNullable();
    tbl.text("model")
      .notNullable();
    tbl.text("mileage", 128)
      .notNullable();

    // Optional fields
    tbl.text("transmission_type", 128)
    tbl.text("title_status", 128)
  });
};

exports.down = function(knex) {
  // Drop the table
  return knex.schema.dropTableIfExists();
};
