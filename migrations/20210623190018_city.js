exports.up = function (knex) {
    return knex.schema.createTable("city", (t) => {
      t.increments("id").unsigned().primary();
      t.string("title");
      t.integer("state_id").notNull();
      t.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
      t.timestamp("updated_at").notNullable().defaultTo(knex.raw("now()"));
      t.foreign('state_id').references('id').inTable('state');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("city");
  };
  