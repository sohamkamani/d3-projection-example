d3
  .json('custom.topo.json')
  .then((topology) => {
    const geojson = topojson.feature(topology, topology.objects['custom.geo'])
    const svg = d3.select('body').append('svg').attr('id', 'map')
    const projection = d3.geoAlbers()
    const path = d3.geoPath().projection(projection)
    const { height, width } = document.getElementById('map').getBoundingClientRect()
    projection.rotate(-75).fitExtent([ [ 0, 0 ], [ width, height ] ], geojson)

    svg
      .selectAll('path')
      .data(geojson.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', 'lightgray')
      .attr('stroke', 'white')
  })
  .catch((err) => console.error('error fetching topojson:', err))
