import React, { Component } from 'react'
import Modal from 'react-native-modalbox'

import {
  Text,
  View,
  TouchableOpacity,
  ListView
} from 'react-native'

class SelectTagView extends Component {

  constructor(props, context) {
    super(props, context);
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
  }

  handleTagSelected(selectedTag) {
    console.log("handleTagSelected", selectedTag);
    this.props.handleTagSelected(selectedTag);
    this.props.nav.pop();
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

  render() {
    console.log("!!!!!!!!!!!", Object.keys(this.props.tags));
    return (
      <Modal backdrop={false}
      style={{ backgroundColor: 'transparent' }} position="center" isOpen={this.props.isOpen} onClosed={this.props.onClose}>
        <View style={{ alignItems: 'center', justifyContent:'center', flex: 1 }}>
          <View style={{ borderColor: 'grey', borderRadius: 10, borderWidth: 1, backgroundColor: 'white', height: 200, width: 300, overflow: 'hidden' }}>
            <View style={{ backgroundColor: 'grey', height: 50, padding: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text style={{ width: 50, textAlign: 'left' }} onPress={ () => this.props.nav.pop() }>Back</Text>
            </View>
            <ListView style={{  }}
                      removeClippedSubviews = {false}
                      dataSource={ this.dataSource.cloneWithRows(Object.keys(this.props.tags)) } 
                      renderRow={ this.renderRow.bind(this) }
                      renderSeparator={ this.renderSeparator.bind(this) }
             />
          </View>
        </View>
      </Modal>
    )
  }
}

export default SelectTagView;
