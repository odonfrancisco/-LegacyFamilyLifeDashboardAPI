export function buildTimeSeriesPipeline({
  match = {},
  groupBy,
  charts, // array of [chartName, config]
  interval,
  startDate,
  endDate,
}) {
  const chartNames = charts.map(([name]) => name)

  const groupFields = charts.reduce((acc, [chartName, props]) => {
    if (props.aggregation) {
      acc[chartName] = props.aggregation
    }
    return acc
  }, {})

  return [
    // 1️⃣ Match
    {
      $match: {
        ...match,
        businessDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },

    // 2️⃣ Time bucket
    {
      $group: {
        _id: {
          $dateTrunc: {
            date: '$businessDate',
            unit: interval,
            startOfWeek: interval === 'week' ? 'Mon' : undefined,
          },
        },
        ...groupFields,
      },
    },

    // 3️⃣ Flatten into rows
    {
      $project: {
        _id: 0,
        date: { $dateToString: { date: '$_id', format: '%Y-%m-%d' } },
        x: '$_id',
        values: chartNames.map(name => ({
          k: name,
          v: `$${name}`,
        })),
      },
    },

    // 4️⃣ Explode chart keys
    { $unwind: '$values' },

    // 5️⃣ Group by chart name → build series
    {
      $group: {
        _id: '$values.k',
        series: {
          $push: {
            x: '$date',
            y: { $ifNull: ['$values.v', 0] },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        series: 1,
      },
    },
  ]
}
