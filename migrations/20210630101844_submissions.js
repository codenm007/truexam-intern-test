exports.up = function (knex) {
    return knex.schema.createTable("submissions", (t) => {
      t.increments("id").unsigned().primary();
      t.integer("task_id").notNull();
      t.integer("user_id").notNull();
      t.integer("status").notNull();
      t.string("title");
      t.string("desc");
      t.string("answer_url").notNull();
      t.decimal("rating");
      t.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
      t.timestamp("updated_at").notNullable().defaultTo(knex.raw("now()"));
      //foreign keys start here
      t.foreign('user_id').references('id').inTable('users');
      t.foreign('task_id').references('id').inTable('tasks');
      t.foreign('status').references('code').inTable('submission_status');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("submissions");
  };
  