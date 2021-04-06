/** @param {import('knex').Knex} knex  */
exports.up = async (knex) => {
  await knex.schema.createTable('messages', (table) => {
    table.increments();
    table.text('message_id');
    table.text('username');
    table.text('display_name');
    table.text('channel_id');
    table.text('avatar');
    table.text('content');
    table.dateTime('created_at');
  });
};

/** @param {import('knex').Knex} knex  */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('messages');
};
