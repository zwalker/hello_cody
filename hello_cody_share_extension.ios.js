import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'

import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native'

class HelloCodyShareExtension extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isOpen: true,
      type: '',
      value: ''
    }
  }

  async componentDidMount() {
    try {
      const { type, value } = await ShareExtension.data()
      this.setState({
        type,
        value
      })
    } catch(e) {
      console.log('errrr', e)
    }
  }

  onClose() {
    ShareExtension.close()
  }

  closing = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    return (
      <Modal backdrop={false}
      style={{ backgroundColor: 'transparent' }} position="center" isOpen={this.state.isOpen} onClosed={this.onClose}>
        <View style={{ alignItems: 'center', justifyContent:'center', flex: 1 }}>
          <View style={{ borderColor: 'grey', borderRadius: 10, borderWidth: 1, backgroundColor: 'white', height: 200, width: 300, overflow: 'hidden' }}>
            <View style={{ backgroundColor: 'grey', height: 50, padding: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text style={{ width: 50, textAlign: 'left' }}onPress={ this.closing }>Cancel</Text>
              <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Hello Cody</Text>
              <Text style={{ width: 50, textAlign: 'right' }} onPress={ this.closing }>Post</Text>
            </View>
            <View>
              <TouchableOpacity onPress={this.closing}>
                <Text>Close</Text>
                <Text>type: { this.state.type }</Text>
                <Text>value: { this.state.value }</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default HelloCodyShareExtension;
