import db from "./models/index.js";
import dbConfig from "./config/db.config.js";
function dbSetup() {
  /* 执行初始化代码 */
  const ROLES = ["user", "admin"];
  ROLES.forEach((roleName) => {
    const role = new db.Role({ name: roleName });
    role.save((err) => {
      if (err) {
        console.log("角色添加失败");
      }
    });
  });
}

/* 连接数据库 */
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => {
    console.log("数据库连接成功");
    dbSetup();
  })
  .catch(() => {
    console.log("数据库连接失败");
    process.exit();
  });
