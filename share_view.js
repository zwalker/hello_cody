import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'

import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'

class ShareView extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    console.log(Object.entries(this.props.tags), 'rendering ShareView');
    return (
      <Modal backdrop={false}
      style={{ backgroundColor: 'transparent' }} position="center" isOpen={this.props.isOpen} onClosed={this.props.onClose}>
        <View style={{ alignItems: 'center', justifyContent:'center', flex: 1 }}>
          <View style={{ borderColor: 'grey', borderRadius: 10, borderWidth: 1, backgroundColor: 'white', height: 200, width: 300, overflow: 'hidden' }}>
            <View style={{ backgroundColor: 'grey', height: 50, padding: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text style={{ width: 50, textAlign: 'left' }} onPress={ this.props.closing }>Cancel</Text>
              <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Hello Cody</Text>
              <Text style={{ width: 50, textAlign: 'right' }} onPress={ this.props.closing }>Post</Text>
            </View>
            <View style={{height: 100}} >
              <Text>type: { this.props.type }</Text>
              <Text>value: { this.props.value }</Text>
            </View>
            <View style={{ backgroundColor: 'grey', padding: 10, height: 50, flexDirection: 'row', alignItems: 'center' }} >
              <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={ () => this.props.nav.push({ id: "SelectTag" }) } >
                <Text style={{ fontWeight: 'bold', textAlign: 'left', flex: 1 }}>Tag</Text>
                <Text style={{ textAlign: 'right' }}>{ this.props.selectedTag || Object.keys(this.props.tags)[0] } ></Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default ShareView;
