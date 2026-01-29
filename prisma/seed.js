/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('Prisma keys:', Object.keys(prisma));
    console.log('Prisma dmmf:', prisma._dmmf && prisma._dmmf.datamodel ? prisma._dmmf.datamodel.models.map(m => m.name) : 'no dmmf');
    const password = await hash('admin123', 12)
    const admin = await prisma.adminUser.upsert({
        where: { email: 'admin@reziko.com' },
        update: {},
        create: {
            email: 'admin@reziko.com',
            password,
        },
    })
    console.log({ admin })

    const products = [
        {
            name: 'Reziko Health Monitor',
            price: 199.99,
            type: 'Device',
            description: 'Advanced health monitoring device for home use.',
        },
        {
            name: 'Immunity Booster Pack',
            price: 29.99,
            type: 'Supplements',
            description: 'Daily supplements to boost your immune system.',
        },
        {
            name: 'Digital Thermometer',
            price: 15.50,
            type: 'Device',
            description: 'Accurate digital thermometer with instant reading.',
        }
    ]

    for (const p of products) {
        const product = await prisma.product.create({
            data: p
        })
        console.log(`Created product with id: ${product.id}`)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
