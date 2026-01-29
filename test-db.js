const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to database...');
        const count = await prisma.product.count();
        console.log(`Connection successful! Found ${count} products.`);
    } catch (e) {
        console.error('Connection failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
