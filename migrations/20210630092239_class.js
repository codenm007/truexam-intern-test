exports.up = function (knex) {
    return knex.schema.createTable("classes", (t) => {
      t.increments("id").unsigned().primary();
      t.integer("user_id").notNull();
      t.string('name').notNull();
      t.integer("subject_id").notNull();
      t.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
      t.datetime("updated_at").notNullable().defaultTo(knex.raw("now()"));
      //foreign keys start here
      t.foreign('user_id').references('id').inTable('users');
      t.foreign('subject_id').references('code').inTable('subjects');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("classes");
  };
  