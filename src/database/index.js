const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}./../config/database.json`)[env];

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
          timestamps: false
        },
    });
}

const modelDefiners = [
	require('./model/role.model'),
	require('./model/game-group.model'),
  require('./model/faq.model'),
  require('./model/setting.model')
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}


sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = sequelize;