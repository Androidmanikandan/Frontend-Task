import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import React, { Component } from 'react'
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      validated: false,
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      contcode: '91',
      numone: '',
      numtwo: '',
      lineone: '',
      linetwo: '',
      city: '',
      state: '',
      zipcode: '',
      Country: '',
      qualification: '',
      comment: '',
      iseditable: false,
      tableData: [],
      isView: false,
      msg: '',
      show:false
    }

    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.clearState = this.clearState.bind(this);
    this.getAllUser = this.getAllUser.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.getAllUser();
  }

  getAllUser() {
    axios.get('http://54.202.218.249:9501/api/users').then(res => {
      // console.log(res.data);
      this.setState({
        tableData: res.data, iseditable: false, isView: false
      })
    })
  }

  clearState() {
    this.setState({
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      contcode: '91',
      numone: '',
      numtwo: '',
      lineone: '',
      linetwo: '',
      city: '',
      state: '',
      zipcode: '',
      Country: '',
      qualification: '',
      comment: '',
      iseditable: false,
      isView: false,
      tableData: [],
      msg: '',
      show:false,
    });
  }
  handleDelete(id) {
    axios.delete('http://54.202.218.249:9501/api/users/' + id).then(() => {
      this.clearState();
      this.setState({ msg: 'Delete successful', show:true })
      this.getAllUser();
    }).catch(err => {
      console.log(err);
    });
  }
  handleEdit(id) {
    axios.get('http://54.202.218.249:9501/api/users/' + id)
      .then(response => {
        let ele = response.data;
        let numone = ele.phoneNumber.slice(0, 5);
        let numtwo = ele.phoneNumber.slice(5, 10);
        this.setState({ id: id, firstname: ele.firstName, lastname: ele.lastName, email: ele.email, contcode: '91', numone: numone, numtwo: numtwo, lineone: ele.address1, linetwo: ele.address2, city: ele.city, state: ele.state, zipcode: ele.zipCode, Country: ele.country, qualification: ele.qualification, comment: ele.comments, isView: false, iseditable: true });
      }).catch(err => {
        console.log(err);
      });
  }
  handleView(id) {
    axios.get('http://54.202.218.249:9501/api/users/' + id)
      .then(response => {
        let ele = response.data;
        let numone = ele.phoneNumber.slice(0, 5);
        let numtwo = ele.phoneNumber.slice(5, 10);
        this.setState({ id: id, firstname: ele.firstName, lastname: ele.lastName, email: ele.email, contcode: '91', numone: numone, numtwo: numtwo, lineone: ele.address1, linetwo: ele.address2, city: ele.city, state: ele.state, zipcode: ele.zipCode, Country: ele.country, qualification: ele.qualification, comment: ele.comments, isView: true, iseditable: false});
      }).catch(err => {
        console.log(err);
      });
  }
  handleUpdate(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ validated: true });
    }
    else {
      let { iseditable, id, firstname, lastname, email, contcode, numone, numtwo, lineone, linetwo, city, state, zipcode, Country, qualification, comment } = this.state;
      // PUT detail
      if (iseditable) {
        if (id !== '') {
          let phoneNumber = contcode + numone + numtwo;
          let customerdetail = {
            firstName: firstname, lastName: lastname, email: email, phoneNumber: phoneNumber, address1: lineone, address2: linetwo, city: city, state: state, zipCode: zipcode, country: Country, qualification: qualification, comments: comment,
            isView: false, iseditable: false, validated: false
          };
          axios.put('http://54.202.218.249:9501/api/users/' + id, customerdetail)
            .then(response => {
              this.clearState();
              this.setState({ msg: "Update Successfully", show:true });
              this.getAllUser();
            }).catch(err => {
              console.log(err);
            })
        }

      } // Post detail
      else {
        let phoneNumber = contcode + numone + numtwo;
        let postData = {
          firstName: firstname, lastName: lastname, email: email, phoneNumber: phoneNumber, address1: lineone, address2: linetwo, city: city, state: state, zipCode: zipcode, country: Country, qualification: qualification, comments: comment,
          isView: false, iseditable: false, validated: false
        };
        axios.post('http://54.202.218.249:9501/api/users', postData)
          .then(response => {
            this.clearState();
            this.setState({ msg: "Inserted Successfully", show:true});
            this.getAllUser();
          }).catch(err => {
            console.log(err);
          })
      }
    }
  }
 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    let { validated, firstname, lastname, email, contcode, numone, numtwo, lineone, linetwo, city, state, zipcode, Country, qualification, comment, tableData, isView, show, msg } = this.state;
    return (
      <Container>
        <Row>
          <Col>
          <Toast onClose={() => this.setState({show:false})} show={show} delay={1000} autohide bg='success'>
                <Toast.Body>{msg}</Toast.Body>
            </Toast>
            <div className="register">
              <h1 className="title"><strong>Bio Data</strong>
              </h1>
              <Form noValidate validated={validated} onSubmit={this.handleUpdate}>
                <Form.Group controlId="validationCustom01">
                  <Form.Label className="reg_txt">Name <span>*</span></Form.Label>
                  <div className="controls form-inline">
                    <Form.Control type="text" className="input-name" required placeholder="First" name='firstname' value={firstname} onChange={this.onChange}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please enter a FirstName.
                    </Form.Control.Feedback>
                    <Form.Control type="text" className="input-name" placeholder="Last" name='lastname' value={lastname} onChange={this.onChange}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please enter a LastName.
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                <Form.Group controlId="validationCustomUsername">
                  <Form.Label className="reg_txt">Email  <span>*</span></Form.Label>
                  <Form.Control type="text" className="form-register text" id="" placeholder="E-mail" style={{ marginBottom: '15px' }} required name='email' value={email} onChange={this.onChange}></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter a email.
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="clearfix"></div>

                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Label className="reg_txt">Phone Number  <span>*</span></Form.Label>
                  <Row className='nomMargin'>
                    <Col xs={4}>
                      <Form.Control type="text" className="text input-name1" required name='contcode' value={contcode} onChange={this.onChange}></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Please enter a Contry code.
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={4}>
                      <Form.Control type="text" className="text input-name1" required max={5} name='numone' value={numone} onChange={this.onChange} ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Please enter a Phone Number.
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={4}>
                      <Form.Control type="text" className="text input-name1" required max={5} name='numtwo' value={numtwo} onChange={this.onChange}></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Please enter a Phone Number.
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="reg_txt">Address  <span>*</span></Form.Label>
                  <Form.Control type="text" className="form-register text" id="" placeholder="Line 1" style={{ marginBottom: '15px' }} name='lineone' value={lineone} onChange={this.onChange} required></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter a Address Line 1.
                  </Form.Control.Feedback>
                  <Form.Control type="text" className="form-register text" id="" placeholder="Line 2" style={{ marginBottom: '15px' }}
                    name='linetwo' value={linetwo} onChange={this.onChange} required></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter a Address Line 2.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Row className='nomMargin'>
                    <Col xs={6}>
                      <Form.Control type="text" className="input-name" placeholder="City" name='city' value={city} onChange={this.onChange} required ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Please enter a City.
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={6}>
                      <Form.Control type="text" className="input-name" placeholder="State" name='state' value={state} onChange={this.onChange} required ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Please enter a State.
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={6}>
                      <Form.Control type="text" className="input-name" placeholder="Zip Code" name='zipcode' value={zipcode} onChange={this.onChange} required></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Please enter a ZipCode.
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={6}>
                      <Form.Control type="text" className="input-name" placeholder="Country" name='Country' value={Country} onChange={this.onChange} required></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Please enter a ZipCode.
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Label className="reg_txt">Write Your qualification <span>*</span></Form.Label>
                  <Form.Control type="text" className="form-register text" id="" placeholder="" name='qualification' value={qualification} onChange={this.onChange} required></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter a Qualification.
                  </Form.Control.Feedback>
                  {/* <input type="text" className="form-register text" id="" placeholder="Add your qualification"> <span><img alt="" src="images/plus.png" className="add"></span>  */}
                </Form.Group>
                <Form.Group>
                  <Form.Label className="reg_txt">Comment  <span>*</span></Form.Label>
                  <Form.Control as="textarea" rows={3} className="form-register text" name='comment' value={comment} onChange={this.onChange} required ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter a comment.
                  </Form.Control.Feedback>
                </Form.Group>

                {isView === false ? <Button type="submit" className="btn btn-default submit" style={{ width: "100%", marginTop: '15px' }} >Submit</Button> : null}

              </Form>
            </div>
          </Col>
          <Col>
            <div className='tabt'>
              <Table striped bordered hover>

                <tbody>
                  <tr className="ztxt">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>View</th>
                  </tr>
                  {tableData.map((ele, index) => {
                    return (
                      <tr key={index}>
                        <td>{ele.firstName}</td>
                        <td>{ele.email}</td>
                        <td>{ele.phoneNumber}</td>
                        <td><Button className="ed" onClick={() => this.handleEdit(ele._id)}>Edit</Button></td>
                        <td><Button className="ed" style={{ background: '#f00' }} onClick={() => this.handleDelete(ele._id)}>Delete</Button></td>
                        <td><Button className="ed" style={{ background: '#000' }} onClick={() => this.handleView(ele._id)}>View</Button></td>
                      </tr>
                    )
                  })}

                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
