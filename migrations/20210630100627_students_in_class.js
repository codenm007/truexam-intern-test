exports.up = function (knex) {
    return knex.schema.createTable("students_in_classes", (t) => {
      t.increments("id").unsigned().primary();
      t.integer("class_id").notNull();
      t.integer("user_id").notNull();
      t.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
      t.datetime("updated_at").notNullable().defaultTo(knex.raw("now()"));
      t.boolean("is_student_suspended").defaultTo(knex.raw("false"));
      //foreign keys start here
      t.foreign('user_id').references('id').inTable('users');
      t.foreign('class_id').references('id').inTable('classes');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("students_in_classes");
  };
  