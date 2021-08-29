import React from 'react'
import {Row, Col, Image} from 'react-bootstrap'
const WaitingLoader = () => {
    return (
            <Row className="justify-content-md-center">
                  <Col md={4} >
                    <Image src="/images/waiting_image.gif" alt="image" fluid rounded />
                  </Col>
    </Row>

    )
}

export default WaitingLoader
