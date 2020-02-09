import React, { Component } from 'react'

import { ProjectCard, AutoGrid } from 'swigg'

export default class App extends Component {
  render () {
    return (
      <React.Fragment>
        <AutoGrid bg="#212121" minWidth="250px" spacing="45px" padding="45px">
          <ProjectCard maxWidth="250px" title="Party City" bgOverlay="linear-gradient(45deg, steelblue, darkorchid)" />
          <ProjectCard maxWidth="250px" title="Another Component" bgOverlay="grey" />
          <ProjectCard maxWidth="250px" title="This lib is sick" bgOverlay="darkkhaki" />
          <ProjectCard maxWidth="250px" title="Pretty dope" bgOverlay="aquamarine" />
          <ProjectCard maxWidth="250px" title="Dynamic" bgOverlay="steelblue" bgImage="https://images.unsplash.com/photo-1581078253766-5876a6cabd72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
          <ProjectCard maxWidth="250px" title="Dynamic" link="https://www.google.com" children="This is the description" techList={["party", "people", "tags"]} bgOverlay="tomato" bgImage="https://images.unsplash.com/photo-1581094935665-144e76b36c25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        </AutoGrid>

        <AutoGrid bg="center / cover no-repeat url('https://images.unsplash.com/photo-1485978542216-b956ac966ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&dpr=1&auto=format&fit=crop&w=2399&h=594&q=80 1x, https://images.unsplash.com/photo-1485978542216-b956ac966ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&dpr=2&auto=format&fit=crop&w=2399&h=594&q=80 2x')" minWidth="350px" spacing="45px" padding="45px">
          <ProjectCard maxWidth="650px" title="Party City" bgOverlay="linear-gradient(45deg, steelblue, darkorchid)" />
          <ProjectCard maxWidth="650px" title="Another Component" bgOverlay="grey" />
          <ProjectCard maxWidth="650px" title="This lib is sick" bgOverlay="darkkhaki" />
          <ProjectCard maxWidth="650px" title="Pretty dope" bgOverlay="aquamarine" />
          <ProjectCard maxWidth="650px" title="Dynamic" bgOverlay="steelblue" bgImage="https://images.unsplash.com/photo-1581078253766-5876a6cabd72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
          <ProjectCard maxWidth="650px" title="Dynamic" link="https://www.google.com" children="This is the description" techList={["party", "people", "tags"]} bgOverlay="tomato" bgImage="https://images.unsplash.com/photo-1581094935665-144e76b36c25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        </AutoGrid>

        <AutoGrid minWidth="150px" spacing="45px" padding="45px">
          <ProjectCard maxWidth="650px" title="Party City" bgOverlay="linear-gradient(45deg, steelblue, darkorchid)" />
          <ProjectCard maxWidth="650px" title="Another Component" bgOverlay="grey" />
          <ProjectCard maxWidth="650px" title="This lib is sick" bgOverlay="darkkhaki" />
          <ProjectCard maxWidth="650px" title="Pretty dope" bgOverlay="aquamarine" />
          <ProjectCard maxWidth="650px" title="Dynamic" bgOverlay="steelblue" bgImage="https://images.unsplash.com/photo-1581078253766-5876a6cabd72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
          <ProjectCard maxWidth="650px" title="Dynamic" link="https://www.google.com" children="This is the description" techList={["party", "people", "tags"]} bgOverlay="tomato" bgImage="https://images.unsplash.com/photo-1581094935665-144e76b36c25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        </AutoGrid>
      </React.Fragment>
    )
  }
}
