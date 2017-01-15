import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'
import ShareView from './share_view'

import {
  Text,
  View,
  TouchableOpacity,
  Navigator,
  ListView
} from 'react-native'

class HelloCodyShareExtension extends Component {
  constructor(props, context) {
    super(props, context)

    this.dataSource = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.nav = null;
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
    this.setState({
      isOpen: false
    });
  }

  render() {
    return (
      <Navigator renderScene={(route, nav) => this.renderScene(route, nav)} />
    );
  }

  renderScene(route, nav) {
    this.nav = nav;
    route = route || {id: "Share"};
    switch (route.id) {
      case "Share":
        return this.renderShareView(nav);
      case "SelectTag":
        return this.renderSelectTag(nav);
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
                 closing={this.closing.bind(this)} />
    )
  }

  handleTagSelected(selectedTag) {
    console.log("handleTagSelected", selectedTag);
    this.setState({selectedTag});
    this.nav.pop();
  }

  renderRow(rowData, sectionId, rowId) {
    console.log("rendering", rowData);
    return (
      <TouchableOpacity onPress={ () => this.handleTagSelected(rowData) }>
        <View style={{ height: 25, backgroundColor: 'blue', flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}>
          <Text style={{ textAlign: 'center' }}>{rowData}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionId, rowId, adjacentRowHighlighted) {
    let key = `${sectionId}-${rowId}`;
    let height = adjacentRowHighlighted ? 4 : 1;
    let backgroundColor = adjacentRowHighlighted ? '#3B5998' : '#CCCCCC';
    return (
      <View key={key} style={{ height, backgroundColor }} />
    ); 
  }

  renderSelectTag(nav) {
    console.log("!!!!!!!!!!!", Object.keys(this.state.tags));
    return (
      <Modal backdrop={false}
      style={{ backgroundColor: 'transparent' }} position="center" isOpen={this.state.isOpen} onClosed={this.onClose}>
        <View style={{ alignItems: 'center', justifyContent:'center', flex: 1 }}>
          <View style={{ borderColor: 'grey', borderRadius: 10, borderWidth: 1, backgroundColor: 'white', height: 200, width: 300, overflow: 'hidden' }}>
            <View style={{ backgroundColor: 'grey', height: 50, padding: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text style={{ width: 50, textAlign: 'left' }} onPress={ () => nav.pop() }>Back</Text>
            </View>
            <ListView style={{  }}
                      removeClippedSubviews = {false}
                      dataSource={ this.dataSource.cloneWithRows(Object.keys(this.state.tags)) } 
                      renderRow={ this.renderRow.bind(this) }
                      renderSeparator={ this.renderSeparator.bind(this) }
             />
          </View>
        </View>
      </Modal>
    )
  }
}

export default HelloCodyShareExtension;
