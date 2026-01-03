// root/server/seed.js
const sequelize = require('./config/connection');
const { User, Blog, Comment } = require('./models');

async function seed() {
    try {
        await sequelize.sync({ force: true });

        // --- USERS (keep individualHooks so password hashing runs) ---
        const userData = [
            { name: 'Sally Sprinkles', username: 'SallySprinkles', password: 'password123' },
            { name: 'Brian Griffin', username: 'BrianGriffin', password: 'password345' },
        ];

        const users = await User.bulkCreate(userData, {
            individualHooks: true,
            validate: true,
        });

        // --- BLOGS ---
        const blogData = [
            { title: 'Blog Title', content: 'A lot of very important content', user_id: users[0].id },
            { title: 'Blog Title 2', content: 'More important content to read', user_id: users[0].id },
        ];

        await Blog.bulkCreate(blogData, { validate: true });

        // --- COMMENTS ---
        const commentData = [
            { comment: 'This is a comment', blog_id: 1, user_id: users[1].id },
            { comment: 'This is another comment', blog_id: 1, user_id: users[1].id },
            { comment: 'This is another another comment', blog_id: 1, user_id: users[1].id },
            { comment: 'This is another another comment', blog_id: 2, user_id: users[0].id },
        ];

        await Comment.bulkCreate(commentData, { validate: true });

        console.log('✅ Seed complete');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err);
        process.exit(1);
    }
}

seed();
