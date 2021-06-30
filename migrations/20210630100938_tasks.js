exports.up = function (knex) {
    return knex.schema.createTable("tasks", (t) => {
      t.increments("id").unsigned().primary();
      t.integer("class_id").notNull();
      t.integer("user_id").notNull();
      t.string("title").notNull();
      t.string("desc");
      t.string("question_url").notNull();
      t.timestamp("expires_at").notNullable();
      t.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
      t.timestamp("updated_at").notNullable().defaultTo(knex.raw("now()"));
      //foreign keys start here
      t.foreign('user_id').references('id').inTable('users');
      t.foreign('class_id').references('id').inTable('classes');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("tasks");
  };
  