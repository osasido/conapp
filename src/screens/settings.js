import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Button } from 'native-base';
import { theme } from '../themes/theme';
export default class CardListExample extends Component {
  render() {
    return (
      <Container>
       
        <Content>
          <Card style={{backgroundColor:theme.color.greyLighter}}>
            <CardItem>
              <Icon active name="logo-android" />
              <Text>App version</Text>
              <Right>
                <Text>1.
                0</Text>
              </Right>
             </CardItem>
             <CardItem>
              <Icon color={theme.color.darkBlue} active name="log-out" />
              <Text>Log-out </Text>
              <Right>
                <Button style={{backgroundColor:theme.color.darkBlue}} onPress={()=>this.props.navigation.navigate('Splash')} rounded><Text>ok</Text></Button>
              </Right>
             </CardItem>
           </Card>
           
        </Content>
      </Container>
    );
  }
}