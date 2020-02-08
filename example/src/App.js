import React, { Component } from 'react'

import { Button, ProjectCard } from 'swigg'

export default class App extends Component {
  render () {
    return (
      <div>
        <Button />
        <ProjectCard title="Party City" bgOverlay="linear-gradient(45deg, blue, purple)" />
        <ProjectCard title="Another Component" bgOverlay="grey" />
        <ProjectCard title="This lib is sick" bgOverlay="salmon" />
        <ProjectCard title="Pretty dope" bgOverlay="lightgreen" />
      </div>
    )
  }
}
