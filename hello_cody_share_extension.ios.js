import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'

import {
  Button,
  Text,
  TextInput,
  View,
  Picker,
  TouchableOpacity
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
          'Batman': 3
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

  selectTag(tagId) {
    console.log('selected tag', tagId);
    this.setState({
      selectedTag: tagId
    });
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
    console.log(Object.entries(this.state.tags), 'butthole');
    let pickerItems = Object.entries(this.state.tags).map(([tag, tagId]) => (<Picker.Item label={ tag } value={ tagId } key={ tagId }/>));
    return (
      <Modal backdrop={false}
      style={{ backgroundColor: 'transparent' }} position="center" isOpen={this.state.isOpen} onClosed={this.onClose}>
        <View style={{ alignItems: 'center', justifyContent:'center', flex: 1 }}>
          <View style={{ borderColor: 'grey', borderRadius: 10, borderWidth: 1, backgroundColor: 'white', height: 200, width: 300, overflow: 'hidden' }}>
            <View style={{ backgroundColor: 'grey', height: 50, padding: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text style={{ width: 50, textAlign: 'left' }}onPress={ this.closing.bind(this) }>Cancel</Text>
              <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Hello Cody</Text>
              <Text style={{ width: 50, textAlign: 'right' }} onPress={ this.closing.bind(this) }>Post</Text>
            </View>
            <View>
              <TouchableOpacity onPress={this.closing.bind(this)}>
                <Text>Close</Text>
                <Text>type: { this.state.type }</Text>
                <Text>value: { this.state.value }</Text>
                <Picker selectedValue={ this.state.tags } onValueChange={ this.selectTag.bind(this) }>
                  { pickerItems }
                </Picker>
                <Text>poop</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default HelloCodyShareExtension;
