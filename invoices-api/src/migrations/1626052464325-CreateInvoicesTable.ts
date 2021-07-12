import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateInvoicesTable1626052464325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'invoices',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'payment_date',
            type: 'timestamp',
          },
          {
            name: 'credit_card_id',
            type: 'uuid',
          },
          {
            name: 'transaction_id',
            type: 'uuid',
          },
          {
            name: 'store',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_invoices_credit_card',
            referencedTableName: 'credit_cards',
            referencedColumnNames: ['id'],
            columnNames: ['credit_card_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('invoices');
  }
}
