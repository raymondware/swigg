import React, { Component } from 'react'

import { ProjectCard, AutoGrid, MasonryGrid, MainNav, Button } from 'swigg'

export default class App extends Component {
  render () {
    const someFunc = () => {
      alert('Hi, this is a callback')
    }

    return (
      <React.Fragment>
        <MainNav />
        <Button>Click me</Button>
        <AutoGrid bg="#212121" minWidth="250px" spacing="45px" padding="45px">
          <ProjectCard maxWidth="250px" title="Party City" bgOverlay="linear-gradient(45deg, steelblue, darkorchid)">
            <Button />
          </ProjectCard>
          <ProjectCard maxWidth="250px" title="Another Component" bgOverlay="grey" />
          <ProjectCard maxWidth="250px" title="This lib is sick" bgOverlay="darkkhaki" />
          <ProjectCard maxWidth="250px" title="Pretty dope" bgOverlay="aquamarine" />
          <ProjectCard maxWidth="250px" title="Dynamic" bgOverlay="steelblue" bgImage="https://images.unsplash.com/photo-1581078253766-5876a6cabd72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
          <ProjectCard maxWidth="250px" title="Dynamic" link="https://www.google.com" children="This is the description" techList={["party", "people", "tags"]} bgOverlay="tomato" bgImage="https://images.unsplash.com/photo-1581094935665-144e76b36c25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        </AutoGrid>

        <AutoGrid bg="lightgray" minWidth="350px" spacing="45px" padding="45px">
          <ProjectCard animation={true} maxWidth="650px" title="Party City" bgOverlay="linear-gradient(45deg, steelblue, darkorchid)" />
          <ProjectCard animation={true} maxWidth="650px" title="Another Component" bgOverlay="grey" />
          <ProjectCard animation={true} maxWidth="650px" title="This lib is sick" bgOverlay="darkkhaki" />
          <ProjectCard animation={true} maxWidth="650px" title="Pretty dope" bgOverlay="aquamarine" />
          <ProjectCard animation={true} maxWidth="650px" title="Dynamic" bgOverlay="steelblue" bgImage="https://images.unsplash.com/photo-1581078253766-5876a6cabd72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
          <ProjectCard animation={true} maxWidth="650px" title="Dynamic" link="https://www.google.com" children="This is the description" techList={["party", "people", "tags"]} bgOverlay="tomato" bgImage="https://images.unsplash.com/photo-1581094935665-144e76b36c25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        </AutoGrid>

        <AutoGrid minWidth="150px" spacing="45px" padding="45px">
          <ProjectCard maxWidth="650px" title="Party City" bgOverlay="linear-gradient(45deg, steelblue, darkorchid)" />
          <ProjectCard maxWidth="650px" title="Another Component" bgOverlay="grey" />
          <ProjectCard maxWidth="650px" title="This lib is sick" bgOverlay="darkkhaki" />
          <ProjectCard maxWidth="650px" title="Pretty dope" bgOverlay="aquamarine" />
          <ProjectCard maxWidth="650px" title="Dynamic" bgOverlay="steelblue" bgImage="https://images.unsplash.com/photo-1581078253766-5876a6cabd72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
          <ProjectCard maxWidth="650px" title="Dynamic" link="https://www.google.com" children="This is the description" techList={["party", "people", "tags"]} bgOverlay="tomato" bgImage="https://images.unsplash.com/photo-1581094935665-144e76b36c25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        </AutoGrid>

        <MasonryGrid bg="#fcfcfc" padding="45px" spacing="25px" colSize="350px" items={[
          {
            clickCallback: someFunc,
            image: "https://images.unsplash.com/photo-1581078253766-5876a6cabd72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          },{
            image: "https://picsum.photos/200/300"
          },{
            image: "http://loremflickr.com/320/240/"
          },{
            image: "https://picsum.photos/200/300"
          },{
            image: "https://picsum.photos/200/300"
          },{
            image: "http://loremflickr.com/320/240/"
          },{
            image: "http://loremflickr.com/320/240/"
          },{
            clickCallback: someFunc,
            image: "https://images.unsplash.com/photo-1581078253766-5876a6cabd72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          },{
            image: "https://picsum.photos/200/300"
          },{
            image: "http://loremflickr.com/320/240/"
          },{
            image: "https://picsum.photos/200/300"
          },{
            image: "https://picsum.photos/200/300"
          },{
            image: "http://loremflickr.com/320/240/"
          },{
            image: "http://loremflickr.com/320/240/"
          },{
            clickCallback: someFunc,
            image: "https://images.unsplash.com/photo-1581078253766-5876a6cabd72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          },{
            image: "https://picsum.photos/200/300"
          },{
            image: "http://loremflickr.com/320/240/"
          },{
            image: "https://picsum.photos/200/300"
          },{
            image: "https://picsum.photos/200/300"
          },{
            image: "http://loremflickr.com/320/240/"
          },{
            image: "http://loremflickr.com/320/240/"
          },{
            clickCallback: someFunc,
            image: "https://images.unsplash.com/photo-1581078253766-5876a6cabd72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          },{
            image: "https://picsum.photos/200/300"
          },{
            image: "http://loremflickr.com/320/240/"
          },{
            image: "https://picsum.photos/200/300"
          }
        ]} />
      </React.Fragment>
    )
  }
}
