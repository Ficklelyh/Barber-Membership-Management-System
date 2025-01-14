const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 8080;

// 创建数据库连接
const db = new sqlite3.Database('./user.db', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('-----Hair');
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));








// 定义获取用户列表的接口
app.get('/api/getUserList', (req, res) => {
    const sql = 'SELECT * FROM user'; 
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send({ message: 'Error executing query', error: err });
            return;
        }
        res.send({ message: rows });
    });
});


// 定义获取VIP用户列表的接口
app.get('/api/getVipUserList', (req, res) => {
    const sql = 'SELECT * FROM vip'; 
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send({ message: 'Error executing query', error: err });
            return;
        }
        res.send({ message: rows });
    });
});

// 定义登录接口
app.post('/api/login', (req, res) => {
    const {name, password } = req.body;  
    if (!name || !password) {
        return res.status(400).send({ message: 'name and password are required' });
    }
    const sql = 'SELECT * FROM user WHERE name = ? AND password = ?'; 
    db.get(sql, [name, password], (err, row) => {
        if (err) {
            res.status(500).send({ message: 'Error executing query', error: err });
            return;
        }
        if (row) {
            res.send({ message: 'Login successful', user: { id: row.id, name: row.name } });
        } else {
            res.status(401).send({ message: 'Invalid name or password' });
        }
    });
});

// 定义注册接口
app.post('/api/register', (req, res) => {
    const { name, password } = req.body;  // 假设前端通过POST请求发送用户名和密码
    if (!name || !password) {
        return res.status(400).send({ message: 'name and password are required' });
    }

    // 检查用户名是否已存在
    const checkSql = 'SELECT * FROM user WHERE name = ?';
    db.get(checkSql, [name], (err, row) => {
        if (err) {
            return res.status(500).send({ message: '500', error: err });
        }
        if (row) {
            return res.status(409).send({ message: '409' });
        }

        // 用户名不存在，插入新用户
        const insertSql = 'INSERT INTO user (name, password) VALUES (?, ?)';
        db.run(insertSql, [name, password], function(err) {
            if (err) {
                return res.status(500).send({ message: '500', error: err });
            }
            res.send({ message: 'Registration successful', userId: this.lastID });
        });
    });
});




// 定义添加 VIP 数据的接口
app.post('/api/vip_add', (req, res) => {
    const { name, start, end, note } = req.body;

    // 检查必要字段
    if (!name || !start || !end) {
        return res.status(400).send({ message: 'name, start, and end are required' });
    }

    // 插入新 VIP 数据
    const insertSql = 'INSERT INTO vip (name, start, end, note) VALUES (?, ?, ?, ?)';
    db.run(insertSql, [name, start, end, note], function(err) {
        if (err) {
            return res.status(500).send({ message: '500', error: err });
        }
        res.send({ message: 'ret=ok,msg=[vip_add_success]', vipId: this.lastID });
    });
});


// 定义更新 VIP 数据的接口
app.post('/api/vip_update', (req, res) => {
    const { id, name, start, end, note } = req.body;

    // 检查必要字段
    if (!id) {
        return res.status(400).send({ message: 'ID is required' });
    }

    // 更新指定 ID 的 VIP 数据
    const updateSql = 'UPDATE vip SET name = ?, start = ?, end = ?, note = ? WHERE id = ?';
    db.run(updateSql, [name, start, end, note, id], function(err) {
        if (err) {
            return res.status(500).send({ message: '500', error: err });
        }
        if (this.changes === 0) {
            return res.status(404).send({ message: '404' });
        }
        res.send({ message: 'ret=ok,msg=[vip_updated_success]', updatedId: id });
    });
});


// 定义删除 VIP 数据的接口
app.post('/api/vip_delete', (req, res) => {
    const { id } = req.body;

    // 检查必要字段
    if (!id) {
        return res.status(400).send({ message: 'ID is required' });
    }

    // 删除指定 ID 的 VIP 数据
    const deleteSql = 'DELETE FROM vip WHERE id = ?';
    db.run(deleteSql, [id], function(err) {
        if (err) {
            return res.status(500).send({ message: '500', error: err });
        }
        if (this.changes === 0) {
            return res.status(404).send({ message: '404' });
        }
        res.send({ message: 'ret=ok,msg=[vip_deleted_success]', deletedId: id });
    });
});



// 关闭数据库连接
app.on('close', () => {
    db.close(() => {
        console.log('Closed the SQLite database connection.');
    });
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});