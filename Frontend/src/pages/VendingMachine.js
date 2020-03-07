import React from 'react';
import  MainLayout from '../components/Layout/MainLayout'
import { Bar, Line,Pie } from 'react-chartjs-2';
import {revenue,pie_sale} from 'data/chartdata';
import userImage from 'assets/img/products/2.jpeg';
import { NumberWidget } from 'components/Widget';
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  CardTitle,
  CardHeader,
  CardImg,
  CardSubtitle,
  CardBody,
  CardText,
  Table
} from 'reactstrap';
import Page from 'components/Page';
import Avatar from '../components/Avatar';



class VendingMachine extends React.Component {

  render() {
    return (
      <MainLayout breakpoint={this.props.breakpoint}> 
      <Page
        className="VendingMachine"
        title="Vending Machine">
      <Row>
        <Col lg={6} md={6} sm={6} xs={6}>
        <Row>
          <Card>
            <CardImg top src={userImage} height = '400'/>
            <CardBody>
              <CardTitle>Card with image</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
            </CardBody>
          </Card>
        </Row>

        <Row style = {{marginTop:20}}>
          <Col lg={4} >
            <NumberWidget
              title="Total Vending Machines"
              number="9800"
              color="secondary"
              progress={{
                value: 100,
                label: 'Active',
              }}
            />
          </Col>

          <Col lg={4}>
            <NumberWidget
              title="Monthly Net Sales"
              subtitle="This month"
              number="1M"
              color="secondary"
              progress={{
                value: 80,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={4} >
            <NumberWidget
              title="Monthly Purchases"
              subtitle="This month"
              number="50k"
              color="secondary"
              progress={{
                value: 92,
                label: 'Last month',
              }}
            />
          </Col >
          </Row>
          </Col>
         
        <Col lg={6} md={6} sm={6} xs={6}>
        <Card className="mb-3">
            <CardHeader>Responsive</CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
          </Col>
          </Row>
          <Row >
              <Col lg={6} md={6} sm={6} xs={6}>
          <Card>
                <CardHeader>
                    Total Revenue{' '}
                    <small className="text-muted text-capitalize">Recent 7 Days</small>
                </CardHeader>
                <CardBody>
                    <Line data={revenue.weekly_revenue}/>
                </CardBody>
                </Card>          
          </Col>

          <Col lg={6} md={6} sm={6} xs={6}> 
            <Card>
            <CardHeader>Product Sales{' '}
                    <small className="text-muted text-capitalize">Recent 7 Days</small></CardHeader>
            <CardBody>
              <Pie data={pie_sale} />
            </CardBody>
          </Card>
            </Col>
            
          </Row>
        </Page>
      </MainLayout>
    );
  }
}

export default VendingMachine;