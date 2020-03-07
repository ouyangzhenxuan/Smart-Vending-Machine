import React from 'react';
import  MainLayout from '../components/Layout/MainLayout'
import MapContainer from 'components/Maps/maps'
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardSubtitle,
  CardBody,
  CardText,
} from 'reactstrap';
import Page from 'components/Page';



class MapPage extends React.Component {

  render() {
    return (
      <MainLayout breakpoint={this.props.breakpoint}> 
      <Page>
          <MapContainer></MapContainer>
        </Page>
      </MainLayout>
    );
  }
}

export default MapPage;
