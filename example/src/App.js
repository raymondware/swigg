import React, { Component } from 'react'

import { Button, ProjectCard } from 'swigg'

export default class App extends Component {
  render () {
    return (
      <div style={{ padding: "25px", display: "grid", gridGap: "25px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <ProjectCard title="Party City" bgOverlay="linear-gradient(45deg, steelblue, darkorchid)" />
        <ProjectCard title="Another Component" bgOverlay="grey" />
        <ProjectCard title="This lib is sick" bgOverlay="darkkhaki" />
        <ProjectCard title="Pretty dope" bgOverlay="aquamarine" />
        <ProjectCard title="Dynamic" bgOverlay="steelblue" bgImage="https://images.unsplash.com/photo-1581078253766-5876a6cabd72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
        <ProjectCard title="Dynamic" link="https://www.google.com" children="This is the description" techList={["party", "people", "tags"]} bgOverlay="tomato" bgImage="https://images.unsplash.com/photo-1581094935665-144e76b36c25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
      </div>
    )
  }
}
