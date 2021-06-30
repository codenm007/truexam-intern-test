exports.up = function (knex) {
    return knex.schema.createTable("country", (t) => {
      t.increments("id").unsigned().primary();
      t.string("title");
      t.string("short_code");
      t.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
      t.timestamp("updated_at").notNullable().defaultTo(knex.raw("now()"));
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("country");
  };
  