'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface GitHubStats {
  totalContributions: number
  weeks: ContributionDay[][]
}

// Generate mock data for visualization (in production, fetch from GitHub API)
function generateMockData(): GitHubStats {
  const weeks: ContributionDay[][] = []
  const today = new Date()
  let totalContributions = 0

  for (let week = 0; week < 52; week++) {
    const days: ContributionDay[] = []
    for (let day = 0; day < 7; day++) {
      const date = new Date(today)
      date.setDate(date.getDate() - ((51 - week) * 7 + (6 - day)))
      
      // Generate random contribution count with some patterns
      const isWeekday = day > 0 && day < 6
      const baseChance = isWeekday ? 0.7 : 0.3
      const hasContribution = Math.random() < baseChance
      
      let count = 0
      let level: 0 | 1 | 2 | 3 | 4 = 0
      
      if (hasContribution) {
        count = Math.floor(Math.random() * 15) + 1
        if (count > 10) level = 4
        else if (count > 7) level = 3
        else if (count > 3) level = 2
        else level = 1
        totalContributions += count
      }

      days.push({
        date: date.toISOString().split('T')[0],
        count,
        level,
      })
    }
    weeks.push(days)
  }

  return { totalContributions, weeks }
}

const levelColors = {
  0: 'bg-gray-100 dark:bg-gray-800',
  1: 'bg-green-200 dark:bg-green-900',
  2: 'bg-green-400 dark:bg-green-700',
  3: 'bg-green-500 dark:bg-green-500',
  4: 'bg-green-600 dark:bg-green-400',
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function GitHubContributions({ username = 'emmanuel-inambao' }: { username?: string }) {
  const [data, setData] = useState<GitHubStats | null>(null)
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)

  useEffect(() => {
    // In production, you would fetch from GitHub API
    // For now, using mock data
    const mockData = generateMockData()
    setData(mockData)
  }, [])

  if (!data) {
    return (
      <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl h-40" />
    )
  }

  // Calculate month labels positions
  const getMonthLabels = () => {
    const labels: { month: string; index: number }[] = []
    let currentMonth = -1

    data.weeks.forEach((week, weekIndex) => {
      const date = new Date(week[0].date)
      const month = date.getMonth()
      if (month !== currentMonth) {
        currentMonth = month
        labels.push({ month: months[month], index: weekIndex })
      }
    })

    return labels
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  GitHub Activity
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  @{username}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.totalContributions.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                contributions this year
              </div>
            </div>
          </div>

          {/* Contribution graph */}
          <div className="overflow-x-auto">
            <div className="min-w-[750px]">
              {/* Month labels */}
              <div className="flex mb-2 pl-8">
                {getMonthLabels().map(({ month, index }) => (
                  <div
                    key={`${month}-${index}`}
                    className="text-xs text-gray-500 dark:text-gray-500"
                    style={{ marginLeft: index === 0 ? 0 : `${(index - getMonthLabels()[getMonthLabels().indexOf({ month, index }) - 1]?.index || 0) * 14 - 20}px` }}
                  >
                    {month}
                  </div>
                ))}
              </div>

              {/* Graph */}
              <div className="flex">
                {/* Day labels */}
                <div className="flex flex-col gap-[3px] mr-2 text-xs text-gray-500 dark:text-gray-500">
                  {days.map((day, i) => (
                    <div key={day} className="h-[11px] flex items-center">
                      {i % 2 === 1 && <span>{day}</span>}
                    </div>
                  ))}
                </div>

                {/* Contribution cells */}
                <div className="flex gap-[3px]">
                  {data.weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                      {week.map((day, dayIndex) => (
                        <motion.div
                          key={day.date}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                          onMouseEnter={() => setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-[11px] h-[11px] rounded-sm ${levelColors[day.level]} cursor-pointer transition-transform hover:scale-125`}
                          title={`${day.count} contributions on ${day.date}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tooltip */}
          {hoveredDay && (
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              <strong>{hoveredDay.count} contributions</strong> on {hoveredDay.date}
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500 dark:text-gray-500">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-[11px] h-[11px] rounded-sm ${levelColors[level as 0 | 1 | 2 | 3 | 4]}`}
              />
            ))}
            <span>More</span>
          </div>

          {/* View on GitHub link */}
          <div className="mt-4 text-center">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View full profile on GitHub →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
