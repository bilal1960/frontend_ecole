import React, { Component } from "react"
import Disqus from "disqus-react"

export default class extends Component {
  render() {
    const disqusShortname = "gestion-ecole"
    const disqusConfig = {
      url: "http://localhost:5173",
      identifier: "article-id",
      title: "Title of Your Article"
    }

    return (
      <div className="article-container">

        <h1>Avis sur l'école</h1>

        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    )
  }
}