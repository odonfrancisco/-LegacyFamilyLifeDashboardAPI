export function buildTimeSeriesPipeline({
  match,
  interval,
  startDate,
  endDate,
  charts,
  groupBy = null,
}) {
  const bucketExpr = {
    $dateTrunc: {
      date: '$businessDate',
      unit: interval,
      startOfWeek: interval === 'week' ? 'Mon' : undefined,
    },
  }

  const groupFields = charts.reduce((acc, [chartName, props]) => {
    if (props.aggregation) {
      acc[groupBy ? 'value' : chartName] = props.aggregation
    }
    return acc
  }, {})

  const project = !groupBy && {
    _id: 0,
    x: { $dateToString: { date: '$_id', format: '%Y-%m-%d' } },

    ...charts.reduce((acc, [chartName]) => {
      acc[chartName] = 1
      return acc
    }, {}),
  }

  const sort = groupBy ? { x: 1 } : { date: 1 }

  const pipeline = [
    {
      $match: {
        ...match,

        businessDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    groupBy
      ? {
          $group: {
            _id: {
              bucket: bucketExpr,
              entityId: `$${groupBy}`,
            },
            name: {
              $first: groupBy === 'agentId' ? '$agentName' : '$companyName',
            },
            ...groupFields,
          },
        }
      : {
          $group: {
            _id: bucketExpr,
            ...groupFields,
          },
        },
  ]

  if (groupBy) {
    pipeline.push(
      {
        $group: {
          _id: '$_id.entityId',
          entityId: { $first: '$_id.entityId' },
          name: { $first: '$name' },
          series: {
            $push: {
              //   x: '$_id.bucket',
              x: {
                $dateToString: {
                  date: '$_id.bucket',
                  format: '%Y-%m-%d',
                },
              },
              y: '$value',
            },
          },
        },
      },
      {
        $addFields: {
          series: {
            $sortArray: {
              input: '$series',
              sortBy: { x: 1 },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          entityId: 1,
          name: 1,
          series: 1,
        },
      },
    )
  } else {
    pipeline.push(
      {
        $project: project,
      },
      { $sort: sort },
    )
  }

  return pipeline
}
