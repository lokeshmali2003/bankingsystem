/**
 * Seed Data Script
 * 
 * Populates the database with sample data for development and testing.
 * Run with: npm run seed
 */

import dotenv from 'dotenv'
import { connectDB, disconnectDB } from '../config/database.js'
import User from '../models/User.model.js'
import Account from '../models/Account.model.js'
import Transaction from '../models/Transaction.model.js'
import Loan from '../models/Loan.model.js'
import Admin from '../models/Admin.model.js'

dotenv.config()

const seedData = async () => {
  try {
    await connectDB()

    // Clear existing data (optional - be careful in production!)
    // await User.deleteMany({})
    // await Account.deleteMany({})
    // await Transaction.deleteMany({})
    // await Loan.deleteMany({})

    // Create sample admin
    const admin = await Admin.findOne({ email: 'admin@bankingsystem.com' })
    if (!admin) {
      await Admin.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@bankingsystem.com',
        password: 'Admin123!',
        role: 'admin',
      })
      console.log('✅ Admin user created')
    }

    // Create sample users
    const users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        password: 'Password123!',
        dateOfBirth: new Date('1990-01-15'),
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        isEmailVerified: true,
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '0987654321',
        password: 'Password123!',
        dateOfBirth: new Date('1985-05-20'),
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          country: 'USA',
        },
        isEmailVerified: true,
      },
    ]

    const createdUsers = []
    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email })
      if (!existingUser) {
        const user = await User.create(userData)
        createdUsers.push(user)
        console.log(`✅ User created: ${user.email}`)

        // Create accounts for each user
        const account = await Account.create({
          accountNumber: Account.generateAccountNumber(),
          user: user._id,
          accountType: 'savings',
          balance: 10000,
        })
        console.log(`✅ Account created for ${user.email}: ${account.accountNumber}`)

        // Create sample transactions
        await Transaction.create({
          transactionId: Transaction.generateTransactionId(),
          toAccount: account._id,
          user: user._id,
          transactionType: 'deposit',
          amount: 10000,
          description: 'Initial deposit',
          balanceAfter: 10000,
          status: 'completed',
          processedAt: new Date(),
        })
      }
    }

    console.log('\n✅ Seed data created successfully!')
    console.log('\nSample Login Credentials:')
    console.log('Admin: admin@bankingsystem.com / Admin123!')
    console.log('User: john.doe@example.com / Password123!')
    console.log('User: jane.smith@example.com / Password123!')

  } catch (error) {
    console.error('❌ Error seeding data:', error)
  } finally {
    await disconnectDB()
    process.exit(0)
  }
}

seedData()

