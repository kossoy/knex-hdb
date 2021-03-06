
// HDB Column Compiler
// -------
import inherits from 'inherits';
import ColumnCompiler from 'knex/lib/schema/columncompiler';
import * as helpers from 'knex/lib/helpers';

import { assign } from 'lodash'

function ColumnCompiler_HDB() {
  ColumnCompiler.apply(this, arguments);
  this.modifiers = ['unsigned', 'nullable', 'defaultTo', 'comment', 'first', 'after', 'collate']
}
inherits(ColumnCompiler_HDB, ColumnCompiler);

// Types
// ------

assign(ColumnCompiler_HDB.prototype, {

  increments: 'integer not null generated by default as identity',

  bigincrements: 'bigint not null generated by default as identity',

  tinyint: 'tinyint',
  smallint: 'smallint',

  floating: 'real',
  double: 'double',
  
  decimal(precision, scale) {
    return `decimal(${this._num(precision, 8)}, ${this._num(scale, 2)})`;
  },

  varchar(length, charset) {
    return (charset === 'utf-8' ? 'nvarchar' : 'varchar') + `(${this._num(length, 255)})`;
  },

  text: 'NCLOB',
  mediumtext: 'NCLOB',
  longtext: 'NCLOB',

  datetime: 'seconddate',
  timestamp: 'timestamp',

  binary(length) {
    return length ? `varbinary(${this._num(length)})` : 'blob'
  },

  // Modifiers
  // ------

  comment(comment) {
    return comment && `comment '${comment}'`
  }
})

export default ColumnCompiler_HDB;
