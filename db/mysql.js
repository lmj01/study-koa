const mysql = require('mysql');
const config = require('../config/default');

let pool = mysql.createPool(config.mysql);
let query = function(sql, values) {
    return new Promise((resolve, reject)=>{
        pool.getConnection(function(err, conn){
            if (err) {
                reject(err)
            } else {
                conn.query(sql, values, (error, rows)=>{
                    if (error) {
                        reject(error)
                    } else {
                        resolve(rows)
                    }
                    conn.release();
                })
            }
        })
    })
}

let users = 
`
create table if not exists users (
    id INT NOT NULL AUTO_INCREMENT,
    nickname VARCHAR(40) NOT NULL COMMENT '用户名',
    password VARCHAR(40) NOT NULL COMMENT '密码',
    avator VARCHAR(100) NOT NULL COMMENT '头像url',
    time_create TIMESTAMP COMMENT '创建时间',
    time_update TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY(id)
);
`;

query(users, []);

exports.user_insert = function(value) {
    let sql = 'insert into users set name=?,password=?,avator=?,time_create=?,time_update=?;';
    return query(sql, value);
}

exports.user_remove = function(name) {
    let sql = `delete from users where name='${name}'`;
    return query(sql, []);
}

exports.user_find = function(name) {
    let sql = `select * from users where name = '${name}'`;
    return query(sql, []);
}
