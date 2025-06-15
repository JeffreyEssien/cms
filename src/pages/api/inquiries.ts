import type { NextApiRequest, NextApiResponse } from 'next'
import { getDb } from '../../utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {
        fullName,
        email,
        phone,
        company,
        projectTitle,
        description,
        projectType,
        platforms,
        hasExistingDomain,
        domainName,
        hostingPreference,
        designPreference,
        features,
        integrations,
        contentManagement,
        budgetRange,
        timeline,
        targetAudience,
        brandingAssets,
        additionalRequirements,
        referralSource
      } = req.body

      if (!fullName || !email || !phone || !projectTitle || !description || !projectType || !budgetRange || !timeline) {
        return res.status(400).json({ success: false, error: 'Required fields are missing' })
      }

      const db = await getDb()
      const inquiriesCollection = db.collection('inquiries')

      const inquiry = {
        fullName,
        email,
        phone,
        company,
        projectTitle,
        description,
        projectType,
        platforms,
        hasExistingDomain,
        domainName,
        hostingPreference,
        designPreference,
        features,
        integrations,
        contentManagement,
        budgetRange,
        timeline,
        targetAudience,
        brandingAssets,
        additionalRequirements,
        referralSource,
        status: 'pending',
        createdAt: new Date().toISOString()
      }

      await inquiriesCollection.insertOne(inquiry)

      res.status(201).json({ success: true, data: inquiry })
    } catch (error) {
      console.error('Inquiry submission error:', error)
      res.status(500).json({ success: false, error: 'Failed to submit inquiry' })
    }
  } else if (req.method === 'GET') {
    try {
      const db = await getDb()
      const inquiriesCollection = db.collection('inquiries')

      const inquiries = await inquiriesCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray()

      res.status(200).json({ success: true, data: inquiries })
    } catch (error) {
      console.error('Inquiries fetch error:', error)
      res.status(500).json({ success: false, error: 'Failed to fetch inquiries' })
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 