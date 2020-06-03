import React, { Component } from 'react'
import { ProjectCard, AutoGrid, MasonryGrid, MainNav, Button } from 'swigg'

export default class App extends Component {
  render () {
    const someFunc = () => {
      alert('Hi, this is a callback')
    }

    return (
      <React.Fragment>
        <MainNav bg="#f8f8f8" fontColor="slateblue" breakPoint="900px" isSticky={true} logo={{ url: 'https://www.raymondware.com/images/footer-logo.png', alt: "raymond ware logo" }}>
          <ul>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </MainNav>
        <AutoGrid bg="#212121" minWidth="250px" spacing="45px" padding="45px">
          <ProjectCard maxWidth="250px" title="Party City" bgOverlay="linear-gradient(45deg, steelblue, darkorchid)" />
          <ProjectCard maxWidth="250px" title="here is the title" bgOverlay="linear-gradient(45deg, steelblue, darkorchid)" />
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
          <Button bgOverlay="#f06060">Send Email</Button>
          <Button>Send Email</Button>
          <Button bgOverlay="teal">Send Email</Button>
          <Button>Send Email</Button>
          <Button bgOverlay="steelblue">Send Email</Button>
        </AutoGrid>

        <MasonryGrid bg="#fcfcfc" padding="45px" spacing="25px" colSize="350px" items={[
          {
            clickCallback: someFunc,
            image: "https://images.unsplash.com/photo-1586184059726-49de3553308a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          },{
            image: "https://images.unsplash.com/photo-1586055976087-8d80c1c69acd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          },{
            image: "https://images.unsplash.com/photo-1586143191955-92c311d64c01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          },{
            image: "https://images.unsplash.com/photo-1586051972750-e5d57dcea12f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          },{
            image: "https://images.unsplash.com/photo-1558981420-c532902e58b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          },{
            image: "https://images.unsplash.com/photo-1586166401060-89a3e535b8a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          },{
            image: "https://images.unsplash.com/photo-1586022045076-aee0a185180b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          },{
            clickCallback: someFunc,
            image: "https://images.unsplash.com/photo-1586115176276-3f7fe651ccf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          },{
            image: "https://images.unsplash.com/photo-1586155632969-f703b4b8da9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          }
        ]} />
      </React.Fragment>
    )
  }
}
