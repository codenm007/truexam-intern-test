exports.up = function (knex) {
    return knex.schema.createTable("users", (t) => {
      t.increments("id").unsigned().primary();
      t.string("first_name");
      t.string("last_name");
      t.string("profile_pic");
      t.string("email").unique();
      t.boolean("email_verified").defaultTo(knex.raw("false"));
      t.integer("gender_code").notNull();
      t.string("password_digest");
      t.integer("city_id").notNull();
      t.integer("state_id").notNull();
      t.integer("country_id").notNull();
      t.integer("role_code").notNull();
      t.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
      t.datetime("updated_at").notNullable().defaultTo(knex.raw("now()"));
      t.boolean("is_blocked").defaultTo(knex.raw("false"));
      //foreign keys start here
      t.foreign('city_id').references('id').inTable('city');
      t.foreign('state_id').references('id').inTable('state');
      t.foreign('country_id').references('id').inTable('country');
      t.foreign('gender_code').references('code').inTable('user_genders');
      t.foreign('role_code').references('code').inTable('user_roles');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("users");
  };
  