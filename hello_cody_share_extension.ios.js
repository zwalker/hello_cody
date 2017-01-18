import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'
import ShareView from './share_view'
import SelectTagView from './select_tag_view'
import KanbanApi from './kanban_api'

import {
  Navigator,
  AsyncStorage
} from 'react-native'

class HelloCodyShareExtension extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      isOpen: true,
      type: '',
      value: '',
      tags: {},
      selectedTag: null
    }
  }

  fetchTags() {
    return new Promise((resolve, reject) => {
      resolve({
        body: JSON.stringify({
          'Big Bird': 1,
          'Hobbit': 2,
          'Batman': 3,
          'Joe Shmo': 4,
          'Superman': 5,
          'Garbage Man': 6,
          'Mister Rogers': 7,
          'Ms Rogers': 8
        })
      })
    });
  }

  async componentDidMount() {
    AsyncStorage.getItem("lastSelectedTag").then((value) => {
      this.setState({"selectedTag": value});
    }).done();

    try {
      const { type, value } = await ShareExtension.data();
      this.fetchTags()
      .then(response => {
        tags = JSON.parse(response.body);
        this.setState({
          type,
          value,
          tags
        })
      })
      .catch(error => {
        let tags = error;
        this.setState({
          type,
          value,
          tags
        })
      });
    } catch(e) {
      console.log('errrr', e)
    }
  }


  onClose() {
    ShareExtension.close();
  }

  closing() {
    console.log('closing', this.state.selectedTag)
    if(this.state.selectedTag) {
      console.log('storing last selected tag', this.state.selectedTag);
      AsyncStorage.setItem('lastSelectedTag', this.state.selectedTag);
    }
    this.setState({
      isOpen: false
    });
  }

  onPost() {
    console.log('onPost', this.state.value, this.state.selectedTag);
    let newCard = {
      id: Date.now(),
      title: this.state.selectedTag,
      description: this.state.value,
      status: 'todo',
      color: '#c9c9c9',
      tasks: []
    };
    KanbanApi.createCard(newCard);
    this.closing();
  }

  render() {
    return (
      <Navigator renderScene={(route, nav) => this.renderScene(route, nav)} />
    );
  }

  handleTagSelected(selectedTag) {
    console.log("main handleTagSelected", selectedTag);
    this.setState({selectedTag});
  }

  renderScene(route, nav) {
    route = route || {id: "Share"};
    switch (route.id) {
      case "Share":
        return this.renderShareView(nav);
      case "SelectTag":
        return (<SelectTagView nav={nav} handleTagSelected={this.handleTagSelected.bind(this)} tags={this.state.tags} isOpen={this.state.isOpen} onClose={this.state.onClose} />);
      default:
        return this.renderShareView(nav);
    }
  }

  renderShareView(nav) {
    return (
      <ShareView nav={nav} 
                 type={this.state.type}
                 value={this.state.value}
                 selectedTag={this.state.selectedTag}
                 tags={this.state.tags}
                 isOpen={this.state.isOpen}
                 onClose={this.onClose.bind(this)}
                 closing={this.closing.bind(this)}
                 onPost={this.onPost.bind(this)} />
    )
  }
}

export default HelloCodyShareExtension;
