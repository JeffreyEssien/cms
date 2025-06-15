import type { NextApiRequest, NextApiResponse } from 'next'
import { getDb } from '../../utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const db = await getDb()
    const usersCollection = db.collection('users')
    const inquiriesCollection = db.collection('inquiries')

    // Get total users count
    const totalUsers = await usersCollection.countDocuments()

    // Get recent users (last 5)
    const recentUsers = await usersCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray()

    // Get total inquiries count
    const totalInquiries = await inquiriesCollection.countDocuments()

    // Get recent inquiries with all fields
    const recentInquiries = await inquiriesCollection
      .find({})
      .sort({ _id: -1 })
      .limit(5)
      .toArray()

    // Get stats for the dashboard
    const stats = [
      { name: 'Total Pages', value: '12,345', change: '+12%' },
      { name: 'Total Users', value: totalUsers.toString(), change: '+3%' },
      { name: 'Page Views', value: '324,891', change: '+18%' },
      { name: 'Bounce Rate', value: '2.1%', change: '-5%' },
    ]

    // Get recent activity
    const recentActivity = [
      { action: 'New page created', page: 'About Us', time: '2 minutes ago' },
      { action: 'User registered', page: recentUsers[0]?.email || 'No recent users', time: '5 minutes ago' },
      { action: 'Page updated', page: 'Home', time: '1 hour ago' },
      { action: 'Comment posted', page: 'Blog Post #1', time: '2 hours ago' },
    ]

    const dashboardData = {
      stats,
      recentActivity,
      users: {
        total: totalUsers,
        recent: recentUsers
      },
      inquiries: {
        total: totalInquiries,
        recent: recentInquiries
      }
    }

    res.status(200).json({ success: true, data: dashboardData })
  } catch (error) {
    console.error('Dashboard data fetch error:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch dashboard data' })
  }
} 