exports.up = function (knex) {
    return knex.schema.createTable("subjects", (t) => {
      t.increments("id").unsigned().primary();
      t.string("title");
      t.integer("code").notNull().unique();
      t.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("subjects");
  };
  