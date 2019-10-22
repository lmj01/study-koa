
let query = require('./mysql');

let users = 
`
create table if not exists users (
    id INT NOT NULL AUTO_INCREMENT,
    nickname VARCHAR(40) NOT NULL COMMENT '用户名',
    email VARCHAR(40) NOT NULL COMMENT '邮件',
    password VARCHAR(40) NOT NULL COMMENT '密码',
    uuid VARCHAR(60) NOT NULL COMMENT 'uuid',
    time_create TIMESTAMP COMMENT '创建时间',
    time_update TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY(id)
);
`;

query(users, []);

exports.user_insert = function(value) {
    let sql = 'insert into users set nickname=?,email=?,password=?,uuid=?,time_create=?,time_update=?;';
    return query(sql, value);
}

exports.user_remove = function(email) {
    let sql = `delete from users where email = '${email}'`;
    return query(sql, []);
}

exports.user_find = function(email) {
    let sql = `select * from users where email = '${email}'`;
    return query(sql, []);
}
