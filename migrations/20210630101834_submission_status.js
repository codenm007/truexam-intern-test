exports.up = function (knex) {
    return knex.schema.createTable("submission_status", (t) => {
      t.increments("id").unsigned().primary();
      t.string("title");
      t.integer("code").notNull().unique();
      t.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("submission_status");
  };
  