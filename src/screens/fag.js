import React, { Component } from "react";
import {StatusBar} from 'react-native';
import { Container, Fab,Button, Content, Icon, Accordion, Text, View } from "native-base";
import { theme } from "../themes/theme";
const dataArray = [
  { title: "What is CongApp?", content: "CongApp is an App to help you submit your monthly field service report. Ask your Group Overseer for your Publisher Number or Logon details." },
  { title: "Who can use CongApp?", content: "Any publisher with good spiritual standing in the Christian Congregation. You can confirm from your Service Committee." },
  { title: "Does CongApp requires coding for use?", content: "Nope! Rather, it is easy to use and understand. Internet or Mobile Phone usage and experience is enough to use CongApp." },
  { title: "Any recent Updates?", content: "Field service timer- A timer that assist you to count your hours.Making reports is now Easily accessible and simple.More updates coming soon!"},
];

export default class Faq extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    };
  }
  _renderHeader(item, expanded) {
    
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: theme.color.darkBlue }}>
      <Text style={{ fontWeight: "600" }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }
  _renderContent(item) {
    return (
      <Text
        style={{
          backgroundColor: "#e3f1f1",
          padding: 10,
          fontStyle: "italic",
        }}
      >
        {item.content}
      </Text>
    );
  }
  render() {
    return (
    
           <Container>
             <StatusBar barStyle='light-content' />
     
        <Content padder style={{ backgroundColor: "white" }}>
          <Accordion
            dataArray={dataArray}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
           
          
        
        </Content>
         </Container>
    );
  }
}
<br/>